import {
    addNewDataTypeAttribute,
    camelize,
    createIconWithConnectionTooltip,
    createManualContainer,
    createNewField,
    createSelect,
    createToast,
    findNextLevelNodesByClass,
    getDataConnectionsAndAddToSelect,
    wait
} from "./shared.js";
import {dataSourcePropertiesMap, dataTypeOptionsMap} from "./configuration-data.js";

export let numFields = 0;

export function incFields() {
    numFields++;
}

function addMetadataConnectionOverrideOptions(metadataConnectionSelect, overrideOptionsContainer, index) {
    metadataConnectionSelect.addEventListener("change", (event) => {
        let metadataSourceName = event.target.value;
        Promise.resolve({"groupType":"metadata","name":"my-marquez","options":{"namespace":"accounts","url":"http://localhost:5001"},"type":"marquez"})
            .then(respJson => {
                if (respJson) {
                    //remove previous properties
                    overrideOptionsContainer.replaceChildren();
                    let metadataSourceType = respJson.type;
                    let metadataSourceProperties = dataSourcePropertiesMap.get(metadataSourceType).properties;

                    for (const [key, value] of Object.entries(metadataSourceProperties)) {
                        if (value["override"] && value["override"] === "true") {
                            //add properties that can be overridden
                            addNewDataTypeAttribute(key, value, `connection-config-${index}-${key}`, "metadata-source-property", overrideOptionsContainer);
                        }
                    }
                }
            });
    });
}

// allow users to get schema information from a metadata source such as openmetadata or marquez
export async function createAutoSchema(index) {
    let baseContainer = document.createElement("div");
    baseContainer.setAttribute("id", `data-source-auto-schema-container-${index}`);
    baseContainer.setAttribute("class", "card card-body data-source-auto-schema-container");
    baseContainer.style.display = "inherit";
    let autoSchemaHeader = document.createElement("h5");
    autoSchemaHeader.innerText = "Auto Schema";
    let baseTaskDiv = document.createElement("div");
    baseTaskDiv.setAttribute("class", "row m-2 g-2 align-items-center");

    let metadataConnectionSelect = createSelect(`metadata-connection-${index}`, "Metadata source", "selectpicker form-control input-field metadata-connection-name", "Select metadata source...");
    let dataConnectionCol = document.createElement("div");
    dataConnectionCol.setAttribute("class", "col");
    dataConnectionCol.append(metadataConnectionSelect);

    let iconDiv = createIconWithConnectionTooltip(metadataConnectionSelect);
    let iconCol = document.createElement("div");
    iconCol.setAttribute("class", "col-md-auto");
    iconCol.append(iconDiv);
    baseTaskDiv.append(dataConnectionCol, iconCol);

    // get connection list, filter only metadata sources
    let metadataConnection = await getDataConnectionsAndAddToSelect(metadataConnectionSelect, baseTaskDiv, "metadata");
    // provide opportunity to override non-connection options for metadata source (i.e. namespace, dataset)
    let overrideOptionsContainer = document.createElement("div");
    // when the metadata source connection is selected, populate override options container with options with "override: true"
    addMetadataConnectionOverrideOptions(metadataConnectionSelect, overrideOptionsContainer, index);

    baseContainer.append(autoSchemaHeader, metadataConnection, overrideOptionsContainer);
    return baseContainer;
}

async function createGenerationFields(dataSourceFields, manualSchema) {
    let allCollapsedAccordionButton = $(document).find(".accordion-button.collapsed");
    allCollapsedAccordionButton.click();
    for (const field of dataSourceFields.optFields) {
        numFields += 1;
        let newField = await createNewField(numFields, "generation");
        $(manualSchema).find(".accordion").first().append(newField);
        $(newField).find("[id^=field-name]").val(field.name)[0].dispatchEvent(new Event("input"));
        $(newField).find("select[class~=field-type]").selectpicker("val", field.type)[0].dispatchEvent(new Event("change"));

        if (field.options) {
            for (const [optKey, optVal] of Object.entries(field.options)) {
                let baseOptions = Object.create(dataTypeOptionsMap.get(field.type)[optKey]);
                baseOptions["default"] = optVal;
                let mainContainer = $(newField).find(".accordion-body")[0];
                addNewDataTypeAttribute(optKey, baseOptions, `data-field-container-${numFields}-${optKey}`, "data-source-field", mainContainer);
                document.getElementById(`data-field-container-${numFields}-${optKey}`).dispatchEvent(new Event("input"));
            }
        }
        // there are nested fields
        if (field.nested && field.nested.optFields) {
            let newFieldBox = $(newField).find(".card");
            await createGenerationFields(field.nested, newFieldBox);
        }
    }
    let collapseShow = $(document).find(".accordion-button.collapse.show");
    collapseShow.click();
}

async function createAutoGenerationSchema(autoFromMetadataSchema, dataSource) {
    $(autoFromMetadataSchema).find(".metadata-connection-name").selectpicker("val", dataSource.fields.optMetadataSource.name)[0].dispatchEvent(new Event("change"));
    // takes some time to get the override options
    await wait(100);
    for (let [key, value] of Object.entries(dataSource.fields.optMetadataSource.overrideOptions)) {
        $(autoFromMetadataSchema).find(`input[aria-label="${key}"]`).val(value);
    }
}

export async function createGenerationElements(dataSource, newDataSource, numDataSources) {
    let dataSourceGenContainer = $(newDataSource).find("#data-source-generation-config-container");
    // check if there is auto schema defined
    // check if there is auto schema from metadata source defined
    if (dataSource.fields && dataSource.fields.optMetadataSource) {
        $(dataSourceGenContainer).find("[id^=auto-from-metadata-source-generation-checkbox]").prop("checked", true);
        let autoFromMetadataSchema = await createAutoSchema(numDataSources);
        $(dataSourceGenContainer).find(".manual").after(autoFromMetadataSchema);

        await createAutoGenerationSchema(autoFromMetadataSchema, dataSource);
    }
    // check if there is manual schema defined
    if (dataSource.fields && dataSource.fields.optFields && dataSource.fields.optFields.length > 0) {
        let manualSchema = createManualContainer(numFields, "generation");
        dataSourceGenContainer[0].insertBefore(manualSchema, dataSourceGenContainer[0].lastElementChild);
        $(dataSourceGenContainer).find("[id^=manual-generation-checkbox]").prop("checked", true);

        await createGenerationFields(dataSource.fields, manualSchema);
    }
}

function getGenerationSchema(dataSourceSchemaContainer) {
    let dataSourceFields = findNextLevelNodesByClass($(dataSourceSchemaContainer), ["data-field-container"]);
    // get name, type and options applied to each field
    return dataSourceFields.map(field => {
        // need to only get first level of data-source-fields, get nested fields later
        let fieldAttributes = findNextLevelNodesByClass($(field), "data-source-field", ["data-field-container"]);

        return fieldAttributes
            .map(attr => attr.getAttribute("aria-label") ? attr : $(attr).find(".data-source-field")[0])
            .reduce((options, attr) => {
                let label = camelize(attr.getAttribute("aria-label"));
                let fieldValue = attr.value;
                if (label === "type" && fieldValue === "struct") {
                    // nested fields can be defined
                    let innerStructSchema = field.querySelector(".data-source-schema-container-struct-schema");
                    options[label] = fieldValue;
                    options["nested"] = {optFields: getGenerationSchema(innerStructSchema)};
                } else if (label === "name" || label === "type") {
                    options[label] = fieldValue;
                } else {
                    let currOpts = (options["options"] || new Map());
                    currOpts.set(label, fieldValue);
                    options["options"] = currOpts;
                }
                return options;
            }, {});
    });
}

export function getGeneration(dataSource, currentDataSource) {
    let dataGenerationInfo = {};
    // check which checkboxes are enabled: auto, auto with external, manual
    let isAutoChecked = $(dataSource).find("[id^=auto-generation-checkbox]").is(":checked");
    let isAutoFromMetadataChecked = $(dataSource).find("[id^=auto-from-metadata-source-generation-checkbox]").is(":checked");
    let isManualChecked = $(dataSource).find("[id^=manual-generation-checkbox]").is(":checked");

    if (isAutoChecked) {
        // need to enable data generation within data source options
        currentDataSource["options"] = {enableDataGeneration: "true"};
    }

    if (isAutoFromMetadataChecked) {
        let dataSourceAutoSchemaContainer = $(dataSource).find("[class~=data-source-auto-schema-container]")[0];
        let metadataConnectionName = $(dataSourceAutoSchemaContainer).find("select[class~=metadata-connection-name]").val();
        let metadataConnectionOptions = $(dataSourceAutoSchemaContainer).find("input[class~=metadata-source-property]").toArray()
            .reduce(function (map, option) {
                if (option.value !== "") {
                    map[option.getAttribute("aria-label")] = option.value;
                }
                return map;
            }, {});
        dataGenerationInfo["optMetadataSource"] = {
            name: metadataConnectionName,
            overrideOptions: metadataConnectionOptions
        };
    }
    // get top level manual fields
    if (isManualChecked) {
        let dataSourceSchemaContainer = $(dataSource).find("[id^=data-source-schema-container]")[0];
        let dataFieldsWithAttributes = getGenerationSchema(dataSourceSchemaContainer);
        dataGenerationInfo["optFields"] = Object.values(dataFieldsWithAttributes);
    }
    currentDataSource["fields"] = dataGenerationInfo;
}