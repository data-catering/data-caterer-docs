
/*
have a list of scenarios that users can view
data generation scenarios:
- financial accounts and transactions
- e-commerce site orders
- customer on-boarding (application, status)

data validation scenarios:
- field validation
- relationship validation
- upstream validation

data cleanup scenario:
- delete generated data
- delete downstream data
 */

async function createFinancialAccountAndTransactions() {
    let accountTable = document.getElementById("data-generation-table-1");
    let accountTableBody = accountTable.getElementsByTagName("tbody")[0];
    let transactionTable = document.getElementById("data-generation-table-2");
    let transactionTableBody = transactionTable.getElementsByTagName("tbody")[0];
    let count = 1;
    let max = 20;
    let accountStatuses = ["Open", "Pending", "Suspended", "Closed"];

    while (count <= max) {
        let randomWait = Math.floor(Math.random() * 1000 + 500);
        await wait(randomWait);
        let newAccountRow = document.createElement("tr");
        let newAccountId = `ACC${String(count).padStart(4, "0")}`;
        let newAccountStatus = accountStatuses[Math.floor(Math.random() * accountStatuses.length)];
        let startDate = new Date(2020, 1, 1).getTime();
        let newAccountDate = new Date(startDate + Math.random() * (new Date().getTime() - startDate)).toISOString().split('T')[0];
        let currentColour = getNextColour(count);

        newAccountRow.append(tableData(newAccountId));
        newAccountRow.append(tableData(newAccountStatus));
        newAccountRow.append(tableData(newAccountDate));
        newAccountRow.setAttribute("style", `background-color: ${currentColour};`);
        accountTableBody.append(newAccountRow);
        newAccountRow.scrollIntoView({behavior: "smooth"});
        await wait(200);

        let numNewTxns = Math.random() * 3;
        for (let i = 0; i < numNewTxns; i++) {
            let newTxnRow = document.createElement("tr");
            let newTxnAmount = Math.round(Math.random() * 20000) / 100;
            newTxnRow.append(tableData(newAccountId));
            newTxnRow.append(tableData(newTxnAmount));
            newTxnRow.setAttribute("style", `background-color: ${currentColour};`);
            transactionTableBody.append(newTxnRow);
            newTxnRow.scrollIntoView({behavior: "smooth"});
        }

        count += 1;
    }
}

function tableData(value) {
    let element = document.createElement("td");
    element.innerText = value;
    return element;
}

function getNextColour(index) {
    // change hue from 0 to 360 by steps of 31, saturation=45%, lightness=75%
    let hue = index * 39 % 360;
    let saturation = 30;
    let lightness = 85;
    return `hsl(${hue} ${saturation}% ${lightness}%)`;
}

export const wait = function (ms = 1500) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
};

await createFinancialAccountAndTransactions();
