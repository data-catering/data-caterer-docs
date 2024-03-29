---
title: "Delete generated data from data sources"
description: "How to generate data and clean it up after using it via Data Caterer. Includes deleting data with foreign keys/relationships or data pushed to other data sources from consuming generated data via a service or job."
image: "https://data.catering/diagrams/logo/data_catering_logo.svg"
---

# Delete Generated Data

!!! example "Info"

    Deleting generated data is a paid feature. Try the free trial [here](../get-started/docker.md).

As you generate and validate data, you may want to clean up the data that has been generated. This helps you:

1. Keep your test environments clean
2. Reduce chance of existing data interacting with your validations
3. Creates a simple workflow for developers and testers to follow

## Foreign Keys/Relationships

You can either define a foreign key for data generation (i.e. create same account numbers across accounts and transactions table)
or for data deletion (i.e. account numbers generated in Postgres are consumed by a job and pushed into a Parquet file, you 
can delete the Postgres and Parquet data via the account numbers generated).

### Generate

In scenarios where you have defined foreign keys for multiple data sources, when data is generated, Data Caterer will ensure
that the values generated in one data source, will be the same in the other. When you want to delete the data, data will
be deleted in reverse order of how the data was inserted. This ensures that for data sources, such as Postgres, no errors
will occur whilst deleting data.

``` mermaid
graph LR
  subgraph plan ["Plan/Scenario"]
    postgresAccount["Generate Postgres accounts"]
    postgresTransaction["Generate Postgres transactions"]
  end
  
  dataCaterer["Data Caterer"]
  
  subgraph postgres ["Postgres"]
    subgraph postgresAccTable ["Accounts table"]
      accountA["ACC12345,2024-01-01"]
      accountB["ACC98765,2024-01-23"]
      accountC["..."]
    end
    subgraph postgresTxnTable ["Transactions table"]
      accountATxn["ACC12345,10.23"]
      accountBTxn["ACC98765,93.51"]
      accountCTxn["ACC98765,5.72"]
      accountDTxn["..."]
    end
  end
  
  postgresAccount --> dataCaterer
  postgresTransaction --> dataCaterer
  dataCaterer --> postgresAccTable
  dataCaterer --> postgresTxnTable
```

### Delete

``` mermaid
graph LR
  subgraph plan ["Plan/Scenario"]
    postgresAccount["Generate Postgres accounts"]
  end
  
  dataCaterer["Data Caterer"]
  
  subgraph postgresAccTable ["Postgres accounts table"]
    accountA["ACC12345,2024-01-01"]
    accountB["ACC98765,2024-01-23"]
    accountC["..."]
  end
  
  consumerJob["Consumer"]
  
  subgraph parquetAcc ["Parquet accounts file"]
    accountParquetA["ACC12345,2024-01-01"]
    accountParquetB["ACC98765,2024-01-23"]
    accountParquetC["..."]
  end
  
  postgresAccount --> dataCaterer
  dataCaterer --> postgresAccTable
  postgresAccTable <-- consumerJob
  consumerJob --> parquetAcc
```
