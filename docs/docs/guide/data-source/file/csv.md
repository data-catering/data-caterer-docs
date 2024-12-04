---
title: "CSV Test Data Management"
description: "Example of CSV test data management tool that can automatically discover, generate and validate."
image: "https://data.catering/diagrams/logo/data_catering_logo.svg"
---

# CSV

Creating a data generator for CSV. You will have the ability to generate and validate CSV files via Docker.

## Requirements

- 10 minutes
- Git
- Gradle
- Docker

## Get Started

First, we will clone the data-caterer-example repo which will already have the base project setup required.

=== "Java"

    ```shell
    git clone git@github.com:data-catering/data-caterer-example.git
    ```

=== "Scala"

    ```shell
    git clone git@github.com:data-catering/data-caterer-example.git
    ```

=== "YAML"

    ```shell
    git clone git@github.com:data-catering/data-caterer-example.git
    ```

=== "UI"

    [Run Data Caterer UI via the 'Quick Start' found here.](../../../../get-started/quick-start.md)

### Plan Setup

Create a new Java or Scala class.

- Java: `src/main/java/io/github/datacatering/plan/MyCSVJavaPlan.java`
- Scala: `src/main/scala/io/github/datacatering/plan/MyCSVPlan.scala`

Make sure your class extends `PlanRun`.

=== "Java"

    ```java
    import io.github.datacatering.datacaterer.java.api.PlanRun;
    
    public class MyCSVJavaPlan extends PlanRun {
    }
    ```

=== "Scala"

    ```scala
    import io.github.datacatering.datacaterer.api.PlanRun
    
    class MyCSVPlan extends PlanRun {
    }
    ```

This class defines where we need to define all of our configurations for generating data. There are helper variables and
methods defined to make it simple and easy to use.

#### Connection Configuration

Within our class, we can start by defining the connection properties to read/write from/to CSV.

=== "Java"

    ```java
    var accountTask = csv(
        "customer_accounts",              //name
        "/opt/app/data/customer/account", //path
        Map.of("header", "true")          //additional options
    );
    ```
    
    Additional options such as including a header row, etc can be found [**here**](https://spark.apache.org/docs/latest/sql-data-sources-csv.html#data-source-option).

=== "Scala"

    ```scala
    val accountTask = csv(
      "customer_accounts",              //name         
      "/opt/app/data/customer/account", //path
      Map("header" -> "true")           //additional options
    )
    ```
    
    Additional options such as including a header row, etc can be found [**here**](https://spark.apache.org/docs/latest/sql-data-sources-csv.html#data-source-option).

#### Schema

Depending on how you want to define the schema, follow the below:

- [Manual schema guide](../../scenario/data-generation.md#schema)
- Automatically detect schema from the data source, you can simply enable `configuration.enableGeneratePlanAndTasks(true)`
- [Automatically detect schema from a metadata source](../../index.md#metadata)

#### Additional Configurations

At the end of data generation, a report gets generated that summarises the actions it performed. We can control the
output folder of that report via configurations. We will also enable the unique check to ensure any unique fields will
have unique values generated.

=== "Java"

    ```java
    var config = configuration()
            .generatedReportsFolderPath("/opt/app/data/report")
            .enableUniqueCheck(true);

    execute(myPlan, config, accountTask, transactionTask);
    ```

=== "Scala"

    ```scala
    val config = configuration
      .generatedReportsFolderPath("/opt/app/data/report")
      .enableUniqueCheck(true)

    execute(myPlan, config, accountTask, transactionTask)
    ```

### Run

Now we can run via the script `./run.sh` that is in the top level directory of the `data-caterer-example` to run the class we just
created.

```shell
./run.sh
#input class MyCSVJavaPlan or MyCSVPlan
#after completing, let's pick an account and check the transactions for that account
account=$(tail -1 docker/sample/customer/account/part-00000* | awk -F "," '{print $1 "," $4}')
echo $account
cat docker/sample/customer/transaction/part-00000* | grep $account
```

It should look something like this.

```shell
ACC29117767,Willodean Sauer
ACC29117767,Willodean Sauer,84.99145871948083,2023-05-14T09:55:51.439Z,2023-05-14
ACC29117767,Willodean Sauer,58.89345733567232,2022-11-22T07:38:20.143Z,2022-11-22
```

Congratulations! You have now made a data generator that has simulated a real world data scenario. You can check the
`CSVJavaPlan.java` or `CSVPlan.scala` files as well to check that your plan is the same.

### Validation

If you want to validate data from a CSV source, 
[follow the validation documentation found here to help guide you](../../../validation.md).
