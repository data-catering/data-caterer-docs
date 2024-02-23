import {createAccordionItem} from "./shared.js";

const planList = document.getElementById("plan-list");
let numPlans = 0;

getExistingPlans();

function getExistingPlans() {
    Promise.resolve({"plans":[{"configuration":{"alert":{"slackChannels":"","slackToken":"","triggerOn":"all"},"flag":{"enableAlerts":"on","enableUniqueCheck":"on","enableGeneratePlanAndTasks":"on","enableSaveReports":"on","enableDeleteGeneratedRecords":"on","enableCount":"on","enableFailOnError":"on","enableGenerateData":"on","enableGenerateValidations":"on","enableRecordTracking":"on","enableValidation":"on","enableSinkMetadata":"on"},"folder":{"generatedReportsFolderPath":"","recordTrackingForValidationFolderPath":"","generatedPlanAndTasksFolderPath":"","taskFolderPath":"","recordTrackingFolderPath":"","validationFolderPath":"","planFilePath":""},"generation":{"numRecordsPerBatch":"100000","numRecordsPerStep":"-1"},"metadata":{"oneOfDistinctCountVsCountThreshold":"0.2","numGeneratedSamples":"10","numRecordsForAnalysis":"10000","numRecordsFromDataSource":"10000","oneOfMinCount":"1000"},"validation":{"enableDeleteRecordTrackingFiles":"on","numSampleErrorRecords":"5"}},"dataSources":[{"count":{},"fields":[],"name":"my-csv","taskName":"task-1","validations":[]}],"foreignKeys":[{"links":[{"columns":"","taskName":"task-1"}],"source":{"columns":"","taskName":"task-1"}}],"id":"14b944e3-a5c9-4019-9fc7-ca8c0fc3d220","name":"my-plan"}]})
        .then(respJson => {
            let plans = respJson.plans;
            for (let plan of plans) {
                numPlans += 1;
                let accordionItem = createAccordionItem(numPlans, plan.name, JSON.stringify(plan));
                planList.append(accordionItem);
            }
        });
}
