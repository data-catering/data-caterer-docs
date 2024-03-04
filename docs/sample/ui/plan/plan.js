import {createAccordionItem, createButton, createButtonGroup, createToast} from "../shared.js";

const planList = document.getElementById("plan-list");
let numPlans = 0;

getExistingPlans();

function getExistingPlans() {
    Promise.resolve({"plans": [{"configuration":{"alert":{"slackChannels":"","slackToken":"","triggerOn":"all"},"flag":{"enableAlerts":"true","enableUniqueCheck":"false","enableGeneratePlanAndTasks":"false","enableSaveReports":"true","enableDeleteGeneratedRecords":"false","enableCount":"true","enableFailOnError":"true","enableGenerateData":"true","enableGenerateValidations":"false","enableRecordTracking":"false","enableValidation":"true","enableSinkMetadata":"false"},"folder":{"generatedReportsFolderPath":"","recordTrackingForValidationFolderPath":"","generatedPlanAndTasksFolderPath":"","taskFolderPath":"","recordTrackingFolderPath":"","validationFolderPath":"","planFilePath":""},"generation":{"numRecordsPerBatch":"100000","numRecordsPerStep":"-1"},"metadata":{"oneOfDistinctCountVsCountThreshold":"0.2","numGeneratedSamples":"10","numRecordsForAnalysis":"10000","numRecordsFromDataSource":"10000","oneOfMinCount":"1000"},"validation":{"enableDeleteRecordTrackingFiles":"true","numSampleErrorRecords":"5"}},"dataSources":[{"count":{},"fields":[],"name":"my-cassandra","taskName":"task-1","validations":[{"nested":{"validations":[{"options":{"aggCol":"count","aggType":"min","notEqual":"123"},"type":"column"},{"options":{"aggCol":"amount","aggType":"max","equalOrGreaterThan":"321"},"type":"column"}]},"options":{"groupByColumns":"asd"},"type":"groupBy"},{"nested":{"validations":[{"options":{"column":"rtyh"},"type":"column"},{"nested":{"validations":[{"options":{"column":"bserg","unique":"sadas"},"type":"column"}]},"options":{"upstreamTaskName":"erh3"},"type":"upstream"}]},"options":{"joinType":"inner","upstreamTaskName":"fghd"},"type":"upstream"}]}],"foreignKeys":[],"id":"d6abad98-71ff-469c-9d0d-277d5f8af71e","name":"my-plan"},{"configuration":{"alert":{"slackChannels":"","slackToken":"","triggerOn":"all"},"flag":{"enableAlerts":"true","enableUniqueCheck":"false","enableGeneratePlanAndTasks":"false","enableSaveReports":"true","enableDeleteGeneratedRecords":"false","enableCount":"true","enableFailOnError":"true","enableGenerateData":"true","enableGenerateValidations":"false","enableRecordTracking":"false","enableValidation":"true","enableSinkMetadata":"false"},"folder":{"generatedReportsFolderPath":"","recordTrackingForValidationFolderPath":"","generatedPlanAndTasksFolderPath":"","taskFolderPath":"","recordTrackingFolderPath":"","validationFolderPath":"","planFilePath":""},"generation":{"numRecordsPerBatch":"100000","numRecordsPerStep":"-1"},"metadata":{"oneOfDistinctCountVsCountThreshold":"0.2","numGeneratedSamples":"10","numRecordsForAnalysis":"10000","numRecordsFromDataSource":"10000","oneOfMinCount":"1000"},"validation":{"enableDeleteRecordTrackingFiles":"true","numSampleErrorRecords":"5"}},"dataSources":[{"count":{},"fields":[],"name":"my-cassandra","taskName":"task-1","validations":[{"options":{"column":"account","notNull":""},"type":"column"}]}],"foreignKeys":[],"id":"b350d790-a780-4719-bd4e-53c9f66d42f7","name":"my-validation-plan"}]})
        .then(respJson => {
            let plans = respJson.plans;
            for (let plan of plans) {
                numPlans += 1;
                let accordionItem = createAccordionItem(numPlans, plan.name, JSON.stringify(plan));

                let editButton = createButton(`plan-edit-${numPlans}`, "Plan edit", "btn btn-primary", "Edit");
                let executeButton = createButton(`plan-execute-${numPlans}`, "Plan execute", "btn btn-primary", "Execute");
                let deleteButton = createButton(`plan-delete-${numPlans}`, "Plan delete", "btn btn-danger", "Delete");

                editButton.addEventListener("click", function() {
                    location.href = `../index.html?plan-name=${plan.name}`;
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
