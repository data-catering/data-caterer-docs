import {
    createAccordionItem,
    createButton,
    createButtonGroup,
    createToast,
    executePlan,
    syntaxHighlight
} from "../shared.js";

const planList = document.getElementById("plan-list");
let numPlans = 0;

getExistingPlans();

function getExistingPlans() {
    Promise.resolve({"plans":[{"configuration":{"alert":{"slackChannels":"","slackToken":""},"flag":{"enableUniqueCheck":"false","enableGeneratePlanAndTasks":"false","enableDeleteGeneratedRecords":"false","enableCount":"true","enableFailOnError":"true","enableGenerateData":"true","enableGenerateValidations":"false","enableRecordTracking":"false"},"folder":{"generatedReportsFolderPath":"","recordTrackingForValidationFolderPath":"","generatedPlanAndTasksFolderPath":"","taskFolderPath":"","recordTrackingFolderPath":"","validationFolderPath":"","planFilePath":""},"generation":{"numRecordsPerBatch":"100000","numRecordsPerStep":"-1"},"metadata":{"numRecordsForAnalysis":"10000","numRecordsFromDataSource":"10000","oneOfDistinctCountVsCountThreshold":"0.2","oneOfMinCount":"1000"},"validation":{"enableDeleteRecordTrackingFiles":"true"}},"dataSources":[{"count":{"records":1000},"fields":[{"name":"name","options":{"expression":"#{Name.name}"},"type":"string"},{"name":"age","options":{"max":"100"},"type":"integer"}],"name":"my-json","taskName":"json-task","validations":[{"options":{"column":"name","contains":"a"},"type":"column"},{"nested":{"validations":[{"options":{"aggCol":"name","aggType":"count","greaterThan":"0"},"type":"column"}]},"options":{"groupByColumns":"name"},"type":"groupBy"}]},{"count":{"records":1000},"fields":[{"name":"name","type":"string"},{"name":"age","type":"integer"}],"name":"my-csv","taskName":"csv-task","validations":[]}],"foreignKeys":[{"links":[{"columns":"name,age","taskName":"csv-task"}],"source":{"columns":"name,age","taskName":"json-task"}}],"id":"2f33f549-cf77-4dd1-95c7-60e0ff020343","name":"json-records"},{"configuration":{"alert":{"slackChannels":"","slackToken":"","triggerOn":"all"},"flag":{"enableAlerts":"true","enableUniqueCheck":"false","enableGeneratePlanAndTasks":"false","enableSaveReports":"true","enableDeleteGeneratedRecords":"false","enableCount":"true","enableFailOnError":"true","enableGenerateData":"true","enableGenerateValidations":"false","enableRecordTracking":"false","enableValidation":"true","enableSinkMetadata":"false"},"folder":{"generatedReportsFolderPath":"","recordTrackingForValidationFolderPath":"","generatedPlanAndTasksFolderPath":"","taskFolderPath":"","recordTrackingFolderPath":"","validationFolderPath":"","planFilePath":""},"generation":{"numRecordsPerBatch":"100000","numRecordsPerStep":"-1"},"metadata":{"oneOfDistinctCountVsCountThreshold":"0.2","numGeneratedSamples":"10","numRecordsForAnalysis":"10000","numRecordsFromDataSource":"10000","oneOfMinCount":"1000"},"validation":{"enableDeleteRecordTrackingFiles":"true","numSampleErrorRecords":"5"}},"dataSources":[{"count":{"records":1000},"fields":[{"name":"asf","type":"string"}],"name":"my-data-source-1","taskName":"task-1","validations":[]}],"foreignKeys":[],"id":"d3b11f3e-38e6-4bbc-aa10-4eafcd8408ea","name":"my-plan"}]})
        .then(respJson => {
            let plans = respJson.plans;
            for (let plan of plans) {
                numPlans += 1;
                let accordionItem = createAccordionItem(numPlans, plan.name, "", syntaxHighlight(plan));

                let editButton = createButton(`plan-edit-${numPlans}`, "Plan edit", "btn btn-primary", "Edit");
                let executeButton = createButton(`plan-execute-${numPlans}`, "Plan execute", "btn btn-primary", "Execute");
                let deleteButton = createButton(`plan-delete-${numPlans}`, "Plan delete", "btn btn-danger", "Delete");

                editButton.addEventListener("click", function() {
                    location.href = `https://data.catering/sample/ui/index.html?plan-name=${plan.name}`;
                });
                executeButton.addEventListener("click", function () {
                    let runId = crypto.randomUUID();
                    plan.id = runId;
                    executePlan(plan, plan.name, runId);
                });
                deleteButton.addEventListener("click", async function () {
                    createToast(plan.name, `Plan ${plan.name} deleted!`);
                    planList.removeChild(accordionItem);
                });

                let buttonGroup = createButtonGroup(editButton, executeButton, deleteButton);
                let header = accordionItem.querySelector(".accordion-header");
                let divContainer = document.createElement("div");
                divContainer.setAttribute("class", "d-flex align-items-center");
                divContainer.append(header.firstChild, buttonGroup);
                header.replaceChildren(divContainer);
                planList.append(accordionItem);
            }
        });
}
