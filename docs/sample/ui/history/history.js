import {createAccordionItem, createToast} from "../shared.js";

let historyContainer = document.getElementById("history-container");
const tableHeaders = [{
    field: "status",
    title: "Status",
    sortable: true,
}, {
    field: "id",
    title: "Run ID",
    sortable: true,
}, {
    field: "createdTs",
    title: "Created Time",
    sortable: true,
}, {
    field: "timeTaken",
    title: "Time Taken (s)",
    sortable: true,
}, {
    field: "generationSummary",
    title: "Data Generated",
}, {
    field: "validationSummary",
    title: "Data Validated",
}, {
    field: "failedReason",
    title: "Fail Reason",
}, {
    field: "reportLink",
    title: "Report",
}];

Promise.resolve({"planExecutionByPlan":[{"executions":[{"id":"1cbd6ab2-a59e-4e60-b345-ee9e703a9198","runs":[{"createdTs":"2024-03-15T17:53:12+08:00","failedReason":"","generationSummary":[[""]],"id":"1cbd6ab2-a59e-4e60-b345-ee9e703a9198","name":"json-records","reportLink":"","runBy":"admin","status":"started","timeTaken":"0","updatedBy":"admin","updatedTs":"2024-03-15T17:53:12+08:00","validationSummary":[[""]]},{"createdTs":"2024-03-15T17:53:12+08:00","failedReason":"","generationSummary":[[""]],"id":"1cbd6ab2-a59e-4e60-b345-ee9e703a9198","name":"json-records","reportLink":"","runBy":"admin","status":"parsed_plan","timeTaken":"0","updatedBy":"admin","updatedTs":"2024-03-15T17:53:12+08:00","validationSummary":[[""]]},{"createdTs":"2024-03-15T17:53:12+08:00","failedReason":"","generationSummary":[[""]],"id":"1cbd6ab2-a59e-4e60-b345-ee9e703a9198","name":"json-records","reportLink":"","runBy":"admin","status":"finished","timeTaken":"10","updatedBy":"admin","updatedTs":"2024-03-15T17:53:23+08:00","validationSummary":[]}]},{"id":"7b59a8db-75f4-40de-8d80-8daab0b47b58","runs":[{"createdTs":"2024-03-15T19:46:14+08:00","failedReason":"","generationSummary":[[""]],"id":"7b59a8db-75f4-40de-8d80-8daab0b47b58","name":"json-records","reportLink":"","runBy":"admin","status":"started","timeTaken":"0","updatedBy":"admin","updatedTs":"2024-03-15T19:46:14+08:00","validationSummary":[[""]]},{"createdTs":"2024-03-15T19:46:14+08:00","failedReason":"","generationSummary":[[""]],"id":"7b59a8db-75f4-40de-8d80-8daab0b47b58","name":"json-records","reportLink":"","runBy":"admin","status":"parsed_plan","timeTaken":"0","updatedBy":"admin","updatedTs":"2024-03-15T19:46:14+08:00","validationSummary":[[""]]},{"createdTs":"2024-03-15T19:46:14+08:00","failedReason":"","generationSummary":[["my-json","json","✅","1000"],["my-csv","csv","✅","1000"]],"id":"7b59a8db-75f4-40de-8d80-8daab0b47b58","name":"json-records","reportLink":"/Applications/data-caterer/report","runBy":"admin","status":"finished","timeTaken":"27","updatedBy":"admin","updatedTs":"2024-03-15T19:46:41+08:00","validationSummary":[]}]},{"id":"ef223a97-3057-4f8e-bfa5-09545365de29","runs":[{"createdTs":"2024-03-15T16:28:44+08:00","failedReason":"","generationSummary":[[""]],"id":"ef223a97-3057-4f8e-bfa5-09545365de29","name":"json-records","reportLink":"","runBy":"admin","status":"started","timeTaken":"0","updatedBy":"admin","updatedTs":"2024-03-15T16:28:44+08:00","validationSummary":[[""]]},{"createdTs":"2024-03-15T16:28:44+08:00","failedReason":"","generationSummary":[[""]],"id":"ef223a97-3057-4f8e-bfa5-09545365de29","name":"json-records","reportLink":"","runBy":"admin","status":"parsed_plan","timeTaken":"0","updatedBy":"admin","updatedTs":"2024-03-15T16:28:44+08:00","validationSummary":[[""]]},{"createdTs":"2024-03-15T16:28:44+08:00","failedReason":"","generationSummary":[["my-json","json","✅","1000"],["my-csv","csv","✅","1000"]],"id":"ef223a97-3057-4f8e-bfa5-09545365de29","name":"json-records","reportLink":"","runBy":"admin","status":"finished","timeTaken":"19","updatedBy":"admin","updatedTs":"2024-03-15T16:29:09+08:00","validationSummary":[]}]},{"id":"6369c193-fdd8-42a2-b607-46db82f33628","runs":[{"createdTs":"2024-03-18T13:27:51+08:00","failedReason":"","generationSummary":[[""]],"id":"6369c193-fdd8-42a2-b607-46db82f33628","name":"json-records","reportLink":"","runBy":"admin","status":"started","timeTaken":"0","updatedBy":"admin","updatedTs":"2024-03-18T13:27:51+08:00","validationSummary":[[""]]},{"createdTs":"2024-03-18T13:27:51+08:00","failedReason":"","generationSummary":[[""]],"id":"6369c193-fdd8-42a2-b607-46db82f33628","name":"json-records","reportLink":"","runBy":"admin","status":"parsed_plan","timeTaken":"0","updatedBy":"admin","updatedTs":"2024-03-18T13:27:51+08:00","validationSummary":[[""]]},{"createdTs":"2024-03-18T13:27:51+08:00","failedReason":"","generationSummary":[["my-json","json","✅","1000"],["my-csv","csv","✅","1000"]],"id":"6369c193-fdd8-42a2-b607-46db82f33628","name":"json-records","reportLink":"/Applications/data-caterer/report/6369c193-fdd8-42a2-b607-46db82f33628","runBy":"admin","status":"finished","timeTaken":"39","updatedBy":"admin","updatedTs":"2024-03-18T13:28:31+08:00","validationSummary":[["default_validation","Validation of data sources after generating data","❌","1/2 (50.00%)"]]}]},{"id":"1fa3d94d-8213-48a0-8f91-1396667b6ece","runs":[{"createdTs":"2024-03-18T13:29:50+08:00","failedReason":"","generationSummary":[[""]],"id":"1fa3d94d-8213-48a0-8f91-1396667b6ece","name":"json-records","reportLink":"","runBy":"admin","status":"started","timeTaken":"0","updatedBy":"admin","updatedTs":"2024-03-18T13:29:50+08:00","validationSummary":[[""]]},{"createdTs":"2024-03-18T13:29:50+08:00","failedReason":"","generationSummary":[[""]],"id":"1fa3d94d-8213-48a0-8f91-1396667b6ece","name":"json-records","reportLink":"","runBy":"admin","status":"parsed_plan","timeTaken":"0","updatedBy":"admin","updatedTs":"2024-03-18T13:29:50+08:00","validationSummary":[[""]]},{"createdTs":"2024-03-18T13:29:50+08:00","failedReason":"","generationSummary":[["my-json","json","✅","1000"],["my-csv","csv","✅","1000"]],"id":"1fa3d94d-8213-48a0-8f91-1396667b6ece","name":"json-records","reportLink":"/Applications/data-caterer/report/1fa3d94d-8213-48a0-8f91-1396667b6ece","runBy":"admin","status":"finished","timeTaken":"36","updatedBy":"admin","updatedTs":"2024-03-18T13:30:27+08:00","validationSummary":[["default_validation","Validation of data sources after generating data","❌","1/2 (50.00%)"]]}]},{"id":"b9113d08-d8cc-4f6d-bd56-c4791a2efb95","runs":[{"createdTs":"2024-03-18T13:23:29+08:00","failedReason":"","generationSummary":[[""]],"id":"b9113d08-d8cc-4f6d-bd56-c4791a2efb95","name":"json-records","reportLink":"","runBy":"admin","status":"started","timeTaken":"0","updatedBy":"admin","updatedTs":"2024-03-18T13:23:29+08:00","validationSummary":[[""]]},{"createdTs":"2024-03-18T13:23:29+08:00","failedReason":"","generationSummary":[[""]],"id":"b9113d08-d8cc-4f6d-bd56-c4791a2efb95","name":"json-records","reportLink":"","runBy":"admin","status":"parsed_plan","timeTaken":"0","updatedBy":"admin","updatedTs":"2024-03-18T13:23:29+08:00","validationSummary":[[""]]},{"createdTs":"2024-03-18T13:23:29+08:00","failedReason":"","generationSummary":[["my-json","json","✅","1000"],["my-csv","csv","✅","1000"]],"id":"b9113d08-d8cc-4f6d-bd56-c4791a2efb95","name":"json-records","reportLink":"/Applications/data-caterer/report/b9113d08-d8cc-4f6d-bd56-c4791a2efb95","runBy":"admin","status":"finished","timeTaken":"38","updatedBy":"admin","updatedTs":"2024-03-18T13:24:08+08:00","validationSummary":[["default_validation","Validation of data sources after generating data","❌","1/2 (50.00%)"]]}]},{"id":"9f4fca0d-34d4-4178-9441-878f62734cc3","runs":[{"createdTs":"2024-03-18T13:25:26+08:00","failedReason":"","generationSummary":[[""]],"id":"9f4fca0d-34d4-4178-9441-878f62734cc3","name":"json-records","reportLink":"","runBy":"admin","status":"started","timeTaken":"0","updatedBy":"admin","updatedTs":"2024-03-18T13:25:26+08:00","validationSummary":[[""]]},{"createdTs":"2024-03-18T13:25:26+08:00","failedReason":"","generationSummary":[[""]],"id":"9f4fca0d-34d4-4178-9441-878f62734cc3","name":"json-records","reportLink":"","runBy":"admin","status":"parsed_plan","timeTaken":"0","updatedBy":"admin","updatedTs":"2024-03-18T13:25:26+08:00","validationSummary":[[""]]},{"createdTs":"2024-03-18T13:25:26+08:00","failedReason":"","generationSummary":[["my-json","json","✅","1000"],["my-csv","csv","✅","1000"]],"id":"9f4fca0d-34d4-4178-9441-878f62734cc3","name":"json-records","reportLink":"/Applications/data-caterer/report/9f4fca0d-34d4-4178-9441-878f62734cc3","runBy":"admin","status":"finished","timeTaken":"39","updatedBy":"admin","updatedTs":"2024-03-18T13:26:05+08:00","validationSummary":[["default_validation","Validation of data sources after generating data","❌","1/2 (50.00%)"]]}]},{"id":"1107ce23-b875-431b-a6a9-2a2ad015d1b2","runs":[{"createdTs":"2024-03-15T16:34:14+08:00","failedReason":"","generationSummary":[[""]],"id":"1107ce23-b875-431b-a6a9-2a2ad015d1b2","name":"json-records","reportLink":"","runBy":"admin","status":"started","timeTaken":"0","updatedBy":"admin","updatedTs":"2024-03-15T16:34:14+08:00","validationSummary":[[""]]},{"createdTs":"2024-03-15T16:34:14+08:00","failedReason":"","generationSummary":[[""]],"id":"1107ce23-b875-431b-a6a9-2a2ad015d1b2","name":"json-records","reportLink":"","runBy":"admin","status":"parsed_plan","timeTaken":"0","updatedBy":"admin","updatedTs":"2024-03-15T16:34:14+08:00","validationSummary":[[""]]},{"createdTs":"2024-03-15T16:34:14+08:00","failedReason":"","generationSummary":[["my-json","json","✅","1000"],["my-csv","csv","✅","1000"]],"id":"1107ce23-b875-431b-a6a9-2a2ad015d1b2","name":"json-records","reportLink":"","runBy":"admin","status":"finished","timeTaken":"11","updatedBy":"admin","updatedTs":"2024-03-15T16:34:25+08:00","validationSummary":[]}]},{"id":"11e721d2-4276-4cfd-9230-02b29bbf0147","runs":[{"createdTs":"2024-03-18T09:28:17+08:00","failedReason":"","generationSummary":[[""]],"id":"11e721d2-4276-4cfd-9230-02b29bbf0147","name":"json-records","reportLink":"","runBy":"admin","status":"started","timeTaken":"0","updatedBy":"admin","updatedTs":"2024-03-18T09:28:17+08:00","validationSummary":[[""]]},{"createdTs":"2024-03-18T09:28:17+08:00","failedReason":"","generationSummary":[[""]],"id":"11e721d2-4276-4cfd-9230-02b29bbf0147","name":"json-records","reportLink":"","runBy":"admin","status":"parsed_plan","timeTaken":"0","updatedBy":"admin","updatedTs":"2024-03-18T09:28:17+08:00","validationSummary":[[""]]},{"createdTs":"2024-03-18T09:28:17+08:00","failedReason":"","generationSummary":[["my-json","json","✅","1000"],["my-csv","csv","✅","1000"]],"id":"11e721d2-4276-4cfd-9230-02b29bbf0147","name":"json-records","reportLink":"/Applications/data-caterer/report/11e721d2-4276-4cfd-9230-02b29bbf0147","runBy":"admin","status":"finished","timeTaken":"34","updatedBy":"admin","updatedTs":"2024-03-18T09:28:51+08:00","validationSummary":[["default_validation","Validation of data sources after generating data","❌","1/2 (50.00%)"]]}]},{"id":"68e4e125-e209-4ecd-9355-b9bb73f96519","runs":[{"createdTs":"2024-03-15T17:45:26+08:00","failedReason":"","generationSummary":[[""]],"id":"68e4e125-e209-4ecd-9355-b9bb73f96519","name":"json-records","reportLink":"","runBy":"admin","status":"started","timeTaken":"0","updatedBy":"admin","updatedTs":"2024-03-15T17:45:26+08:00","validationSummary":[[""]]},{"createdTs":"2024-03-15T17:45:26+08:00","failedReason":"","generationSummary":[[""]],"id":"68e4e125-e209-4ecd-9355-b9bb73f96519","name":"json-records","reportLink":"","runBy":"admin","status":"parsed_plan","timeTaken":"0","updatedBy":"admin","updatedTs":"2024-03-15T17:45:26+08:00","validationSummary":[[""]]},{"createdTs":"2024-03-15T17:45:26+08:00","failedReason":"","generationSummary":[[""]],"id":"68e4e125-e209-4ecd-9355-b9bb73f96519","name":"json-records","reportLink":"","runBy":"admin","status":"finished","timeTaken":"1","updatedBy":"admin","updatedTs":"2024-03-15T17:45:28+08:00","validationSummary":[]}]},{"id":"398275df-74c4-4c4c-8c60-70421dcdecf9","runs":[{"createdTs":"2024-03-15T17:19:36+08:00","failedReason":"","generationSummary":[[""]],"id":"398275df-74c4-4c4c-8c60-70421dcdecf9","name":"json-records","reportLink":"","runBy":"admin","status":"started","timeTaken":"0","updatedBy":"admin","updatedTs":"2024-03-15T17:19:36+08:00","validationSummary":[[""]]},{"createdTs":"2024-03-15T17:19:36+08:00","failedReason":"","generationSummary":[[""]],"id":"398275df-74c4-4c4c-8c60-70421dcdecf9","name":"json-records","reportLink":"","runBy":"admin","status":"parsed_plan","timeTaken":"0","updatedBy":"admin","updatedTs":"2024-03-15T17:19:36+08:00","validationSummary":[[""]]},{"createdTs":"2024-03-15T17:19:36+08:00","failedReason":"","generationSummary":[["my-json","json","✅","1000"],["my-csv","csv","✅","1000"]],"id":"398275df-74c4-4c4c-8c60-70421dcdecf9","name":"json-records","reportLink":"","runBy":"admin","status":"finished","timeTaken":"25","updatedBy":"admin","updatedTs":"2024-03-15T17:20:01+08:00","validationSummary":[]}]},{"id":"19248a05-97b3-452f-a7b2-dc918eab35f8","runs":[{"createdTs":"2024-03-15T17:21:37+08:00","failedReason":"","generationSummary":[[""]],"id":"19248a05-97b3-452f-a7b2-dc918eab35f8","name":"json-records","reportLink":"","runBy":"admin","status":"started","timeTaken":"0","updatedBy":"admin","updatedTs":"2024-03-15T17:21:37+08:00","validationSummary":[[""]]},{"createdTs":"2024-03-15T17:21:37+08:00","failedReason":"","generationSummary":[[""]],"id":"19248a05-97b3-452f-a7b2-dc918eab35f8","name":"json-records","reportLink":"","runBy":"admin","status":"parsed_plan","timeTaken":"0","updatedBy":"admin","updatedTs":"2024-03-15T17:21:37+08:00","validationSummary":[[""]]}]},{"id":"164e5c61-12e1-49ac-91b9-b0f07d30192c","runs":[{"createdTs":"2024-03-15T17:35:25+08:00","failedReason":"","generationSummary":[[""]],"id":"164e5c61-12e1-49ac-91b9-b0f07d30192c","name":"json-records","reportLink":"","runBy":"admin","status":"started","timeTaken":"0","updatedBy":"admin","updatedTs":"2024-03-15T17:35:25+08:00","validationSummary":[[""]]},{"createdTs":"2024-03-15T17:35:25+08:00","failedReason":"","generationSummary":[[""]],"id":"164e5c61-12e1-49ac-91b9-b0f07d30192c","name":"json-records","reportLink":"","runBy":"admin","status":"parsed_plan","timeTaken":"0","updatedBy":"admin","updatedTs":"2024-03-15T17:35:25+08:00","validationSummary":[[""]]},{"createdTs":"2024-03-15T17:35:25+08:00","failedReason":"","generationSummary":[[""]],"id":"164e5c61-12e1-49ac-91b9-b0f07d30192c","name":"json-records","reportLink":"","runBy":"admin","status":"finished","timeTaken":"9","updatedBy":"admin","updatedTs":"2024-03-15T17:35:35+08:00","validationSummary":[]}]},{"id":"adbb058f-2886-4eb3-8220-65812d7ec277","runs":[{"createdTs":"2024-03-18T09:10:20+08:00","failedReason":"","generationSummary":[[""]],"id":"adbb058f-2886-4eb3-8220-65812d7ec277","name":"json-records","reportLink":"","runBy":"admin","status":"started","timeTaken":"0","updatedBy":"admin","updatedTs":"2024-03-18T09:10:20+08:00","validationSummary":[[""]]},{"createdTs":"2024-03-18T09:10:20+08:00","failedReason":"","generationSummary":[[""]],"id":"adbb058f-2886-4eb3-8220-65812d7ec277","name":"json-records","reportLink":"","runBy":"admin","status":"parsed_plan","timeTaken":"0","updatedBy":"admin","updatedTs":"2024-03-18T09:10:20+08:00","validationSummary":[[""]]},{"createdTs":"2024-03-18T09:10:20+08:00","failedReason":"","generationSummary":[["my-json","json","✅","1000"],["my-csv","csv","✅","1000"]],"id":"adbb058f-2886-4eb3-8220-65812d7ec277","name":"json-records","reportLink":"/Applications/data-caterer/report/adbb058f-2886-4eb3-8220-65812d7ec277","runBy":"admin","status":"finished","timeTaken":"34","updatedBy":"admin","updatedTs":"2024-03-18T09:10:55+08:00","validationSummary":[["default_validation","Validation of data sources after generating data","❌","1/2 (50.00%)"]]}]},{"id":"993ed716-2219-41db-92ef-e7fbeaa0ca25","runs":[{"createdTs":"2024-03-15T17:23:53+08:00","failedReason":"","generationSummary":[[""]],"id":"993ed716-2219-41db-92ef-e7fbeaa0ca25","name":"json-records","reportLink":"","runBy":"admin","status":"started","timeTaken":"0","updatedBy":"admin","updatedTs":"2024-03-15T17:23:53+08:00","validationSummary":[[""]]},{"createdTs":"2024-03-15T17:23:53+08:00","failedReason":"","generationSummary":[[""]],"id":"993ed716-2219-41db-92ef-e7fbeaa0ca25","name":"json-records","reportLink":"","runBy":"admin","status":"parsed_plan","timeTaken":"0","updatedBy":"admin","updatedTs":"2024-03-15T17:26:32+08:00","validationSummary":[[""]]}]},{"id":"646aca16-1b1d-4fed-9d9d-7f227be559d3","runs":[{"createdTs":"2024-03-17T15:26:21+08:00","failedReason":"","generationSummary":[[""]],"id":"646aca16-1b1d-4fed-9d9d-7f227be559d3","name":"json-records","reportLink":"","runBy":"admin","status":"started","timeTaken":"0","updatedBy":"admin","updatedTs":"2024-03-17T15:26:21+08:00","validationSummary":[[""]]},{"createdTs":"2024-03-17T15:26:21+08:00","failedReason":"","generationSummary":[[""]],"id":"646aca16-1b1d-4fed-9d9d-7f227be559d3","name":"json-records","reportLink":"","runBy":"admin","status":"parsed_plan","timeTaken":"0","updatedBy":"admin","updatedTs":"2024-03-17T15:26:22+08:00","validationSummary":[[""]]},{"createdTs":"2024-03-17T15:26:21+08:00","failedReason":"","generationSummary":[["my-json","json","✅","1000"],["my-csv","csv","✅","1000"]],"id":"646aca16-1b1d-4fed-9d9d-7f227be559d3","name":"json-records","reportLink":"/Applications/data-caterer/report","runBy":"admin","status":"finished","timeTaken":"25","updatedBy":"admin","updatedTs":"2024-03-17T15:26:47+08:00","validationSummary":[]}]},{"id":"f30e19d0-85ef-4cb1-a52e-431b7d3c5271","runs":[{"createdTs":"2024-03-15T17:16:39+08:00","failedReason":"","generationSummary":[[""]],"id":"f30e19d0-85ef-4cb1-a52e-431b7d3c5271","name":"json-records","reportLink":"","runBy":"admin","status":"started","timeTaken":"0","updatedBy":"admin","updatedTs":"2024-03-15T17:16:39+08:00","validationSummary":[[""]]},{"createdTs":"2024-03-15T17:16:39+08:00","failedReason":"","generationSummary":[[""]],"id":"f30e19d0-85ef-4cb1-a52e-431b7d3c5271","name":"json-records","reportLink":"","runBy":"admin","status":"parsed_plan","timeTaken":"0","updatedBy":"admin","updatedTs":"2024-03-15T17:16:39+08:00","validationSummary":[[""]]},{"createdTs":"2024-03-15T17:16:39+08:00","failedReason":"","generationSummary":[["my-json","json","✅","1000"],["my-csv","csv","✅","1000"]],"id":"f30e19d0-85ef-4cb1-a52e-431b7d3c5271","name":"json-records","reportLink":"","runBy":"admin","status":"finished","timeTaken":"26","updatedBy":"admin","updatedTs":"2024-03-15T17:17:05+08:00","validationSummary":[]}]},{"id":"ecef80fd-c987-408b-8e4c-d3f9799c8128","runs":[{"createdTs":"2024-03-15T17:31:40+08:00","failedReason":"","generationSummary":[[""]],"id":"ecef80fd-c987-408b-8e4c-d3f9799c8128","name":"json-records","reportLink":"","runBy":"admin","status":"started","timeTaken":"0","updatedBy":"admin","updatedTs":"2024-03-15T17:31:40+08:00","validationSummary":[[""]]},{"createdTs":"2024-03-15T17:31:40+08:00","failedReason":"","generationSummary":[[""]],"id":"ecef80fd-c987-408b-8e4c-d3f9799c8128","name":"json-records","reportLink":"","runBy":"admin","status":"parsed_plan","timeTaken":"0","updatedBy":"admin","updatedTs":"2024-03-15T17:31:51+08:00","validationSummary":[[""]]},{"createdTs":"2024-03-15T17:31:40+08:00","failedReason":"transpose requires all collections have the same size","generationSummary":[[""]],"id":"ecef80fd-c987-408b-8e4c-d3f9799c8128","name":"json-records","reportLink":"","runBy":"admin","status":"failed","timeTaken":"0","updatedBy":"admin","updatedTs":"2024-03-15T17:32:09+08:00","validationSummary":[[""]]}]},{"id":"2f33f549-cf77-4dd1-95c7-60e0ff020343","runs":[{"createdTs":"2024-03-18T13:33:10+08:00","failedReason":"","generationSummary":[[""]],"id":"2f33f549-cf77-4dd1-95c7-60e0ff020343","name":"json-records","reportLink":"","runBy":"admin","status":"started","timeTaken":"0","updatedBy":"admin","updatedTs":"2024-03-18T13:33:10+08:00","validationSummary":[[""]]},{"createdTs":"2024-03-18T13:33:10+08:00","failedReason":"","generationSummary":[[""]],"id":"2f33f549-cf77-4dd1-95c7-60e0ff020343","name":"json-records","reportLink":"","runBy":"admin","status":"parsed_plan","timeTaken":"0","updatedBy":"admin","updatedTs":"2024-03-18T13:33:10+08:00","validationSummary":[[""]]},{"createdTs":"2024-03-18T13:33:10+08:00","failedReason":"","generationSummary":[["my-json","json","✅","1000"],["my-csv","csv","✅","1000"]],"id":"2f33f549-cf77-4dd1-95c7-60e0ff020343","name":"json-records","reportLink":"/Applications/data-caterer/report/2f33f549-cf77-4dd1-95c7-60e0ff020343","runBy":"admin","status":"finished","timeTaken":"35","updatedBy":"admin","updatedTs":"2024-03-18T13:33:45+08:00","validationSummary":[["default_validation","Validation of data sources after generating data","❌","1/2 (50.00%)"]]}]},{"id":"95d15958-be78-4a72-abfe-5f17c02b3334","runs":[{"createdTs":"2024-03-15T17:23:01+08:00","failedReason":"","generationSummary":[[""]],"id":"95d15958-be78-4a72-abfe-5f17c02b3334","name":"json-records","reportLink":"","runBy":"admin","status":"started","timeTaken":"0","updatedBy":"admin","updatedTs":"2024-03-15T17:23:01+08:00","validationSummary":[[""]]},{"createdTs":"2024-03-15T17:23:01+08:00","failedReason":"","generationSummary":[[""]],"id":"95d15958-be78-4a72-abfe-5f17c02b3334","name":"json-records","reportLink":"","runBy":"admin","status":"parsed_plan","timeTaken":"0","updatedBy":"admin","updatedTs":"2024-03-15T17:23:02+08:00","validationSummary":[[""]]}]},{"id":"eebabc1f-9fe9-453d-9733-2191eaecf864","runs":[{"createdTs":"2024-03-15T16:33:35+08:00","failedReason":"","generationSummary":[[""]],"id":"eebabc1f-9fe9-453d-9733-2191eaecf864","name":"json-records","reportLink":"","runBy":"admin","status":"started","timeTaken":"0","updatedBy":"admin","updatedTs":"2024-03-15T16:33:35+08:00","validationSummary":[[""]]},{"createdTs":"2024-03-15T16:33:35+08:00","failedReason":"","generationSummary":[[""]],"id":"eebabc1f-9fe9-453d-9733-2191eaecf864","name":"json-records","reportLink":"","runBy":"admin","status":"parsed_plan","timeTaken":"0","updatedBy":"admin","updatedTs":"2024-03-15T16:33:35+08:00","validationSummary":[[""]]},{"createdTs":"2024-03-15T16:33:35+08:00","failedReason":"","generationSummary":[["my-json","json","✅","1000"],["my-csv","csv","✅","1000"]],"id":"eebabc1f-9fe9-453d-9733-2191eaecf864","name":"json-records","reportLink":"","runBy":"admin","status":"finished","timeTaken":"24","updatedBy":"admin","updatedTs":"2024-03-15T16:33:59+08:00","validationSummary":[]}]},{"id":"53a11168-ede3-40c2-912c-379b3fb42270","runs":[{"createdTs":"2024-03-17T15:31:02+08:00","failedReason":"","generationSummary":[[""]],"id":"53a11168-ede3-40c2-912c-379b3fb42270","name":"json-records","reportLink":"","runBy":"admin","status":"started","timeTaken":"0","updatedBy":"admin","updatedTs":"2024-03-17T15:31:02+08:00","validationSummary":[[""]]}]},{"id":"61a59ace-1be1-408b-ba84-504e5efe4d77","runs":[{"createdTs":"2024-03-18T13:32:38+08:00","failedReason":"","generationSummary":[[""]],"id":"61a59ace-1be1-408b-ba84-504e5efe4d77","name":"json-records","reportLink":"","runBy":"admin","status":"started","timeTaken":"0","updatedBy":"admin","updatedTs":"2024-03-18T13:32:38+08:00","validationSummary":[[""]]},{"createdTs":"2024-03-18T13:32:38+08:00","failedReason":"","generationSummary":[[""]],"id":"61a59ace-1be1-408b-ba84-504e5efe4d77","name":"json-records","reportLink":"","runBy":"admin","status":"parsed_plan","timeTaken":"0","updatedBy":"admin","updatedTs":"2024-03-18T13:32:38+08:00","validationSummary":[[""]]},{"createdTs":"2024-03-18T13:32:38+08:00","failedReason":"Cannot call methods on a stopped SparkContext. This stopped SparkContext was created at:  org.apache.spark.sql.SparkSession$Builder.getOrCreate(SparkSession.scala:1093) io.github.datacatering.datacaterer.core.util.SparkProvider.getSparkSession(SparkProvider.scala:11) io.github.datacatering.datacaterer.core.plan.PlanProcessor$.executePlanWithConfig(PlanProcessor.scala:51) io.github.datacatering.datacaterer.core.plan.PlanProcessor$.executePlan(PlanProcessor.scala:42)","generationSummary":[[""]],"id":"61a59ace-1be1-408b-ba84-504e5efe4d77","name":"json-records","reportLink":"","runBy":"admin","status":"failed","timeTaken":"19","updatedBy":"admin","updatedTs":"2024-03-18T13:32:57+08:00","validationSummary":[[""]]}]},{"id":"07ed001d-736d-4e17-ad8f-353764afa92a","runs":[{"createdTs":"2024-03-15T19:42:25+08:00","failedReason":"","generationSummary":[[""]],"id":"07ed001d-736d-4e17-ad8f-353764afa92a","name":"json-records","reportLink":"","runBy":"admin","status":"started","timeTaken":"0","updatedBy":"admin","updatedTs":"2024-03-15T19:42:25+08:00","validationSummary":[[""]]},{"createdTs":"2024-03-15T19:42:25+08:00","failedReason":"","generationSummary":[[""]],"id":"07ed001d-736d-4e17-ad8f-353764afa92a","name":"json-records","reportLink":"","runBy":"admin","status":"parsed_plan","timeTaken":"0","updatedBy":"admin","updatedTs":"2024-03-15T19:42:25+08:00","validationSummary":[[""]]},{"createdTs":"2024-03-15T19:42:25+08:00","failedReason":"","generationSummary":[[""]],"id":"07ed001d-736d-4e17-ad8f-353764afa92a","name":"json-records","reportLink":"/Applications/data-caterer/report","runBy":"admin","status":"finished","timeTaken":"23","updatedBy":"admin","updatedTs":"2024-03-15T19:42:48+08:00","validationSummary":[]}]}],"name":"json-records"}]})
    .then(body => {
        let planHistories = Object.values(body.planExecutionByPlan);
        for (const planHistory of planHistories) {
            const planName = planHistory.name;
            const planHistoryById = planHistory.executions;
            const planRunsByIdTableId = planName + "-runs-table";

            let planRunsByIdTable = document.createElement("table");
            planRunsByIdTable.setAttribute("id", planRunsByIdTableId + "-element");
            planRunsByIdTable.setAttribute("data-toggle", "table");
            planRunsByIdTable.setAttribute("data-sort-name", "createdTs");
            planRunsByIdTable.setAttribute("data-sort-order", "desc");
            const planHistoryByIdValues = Object.values(planHistoryById);
            const lastUpdatePerId = [];

            for (const runUpdatesById of planHistoryByIdValues) {
                let runUpdates = runUpdatesById.runs;
                let latestRunUpdate = runUpdates[runUpdates.length - 1];
                console.log(runUpdates);
                latestRunUpdate["createdTs"] = latestRunUpdate["createdTs"].replace("T", " ").replace(/\+.*/, "");
                latestRunUpdate["updatedTs"] = latestRunUpdate["updatedTs"].replace("T", " ").replace(/\+.*/, "");
                let reportHref = `http://localhost:9898/report/${latestRunUpdate["id"]}/index.html`;
                latestRunUpdate["reportLink"] = latestRunUpdate["reportLink"] === "" ? "" : `<a href=${reportHref} target="_blank" rel="noopener noreferrer">Report</a>`;
                let generationSummary = Array.from(latestRunUpdate["generationSummary"])
                    .filter(g => g.length > 3 && g[0] !== "")
                    .map(g => `${g[0]} -> ${g[3]}`)
                    .join("<br>");
                latestRunUpdate["generationSummary"] = generationSummary.length > 0 ? generationSummary : "";
                let validationSummary = Array.from(latestRunUpdate["validationSummary"])
                    .filter(v => v.length > 3 && v[0] !== "")
                    .map(v => v[3])
                    .join("<br>");
                latestRunUpdate["validationSummary"] = validationSummary.length > 0 ? validationSummary : "";
                console.log(latestRunUpdate);
                lastUpdatePerId.push(latestRunUpdate);
            }

            let planHistoryContainer = createAccordionItem(planName, planName, "", planRunsByIdTable);
            historyContainer.append(planHistoryContainer);
            $(planRunsByIdTable).bootstrapTable({
                sortStable: true,
                columns: tableHeaders,
                data: Object.values(lastUpdatePerId),
                rowStyle: function (row, index) {
                    if (row["status"] === "failed") {
                        return { classes: "table-danger" }
                    } else if (row["status"] === "finished") {
                        return { classes: "table-success" }
                    } else {
                        return { classes: "table-warning" }
                    }
                }
            });
        }
    });

