---
title: "Iceberg Test Data Management"
description: "Example of Iceberg test data management tool that can automatically discover, generate and validate."
image: "https://data.catering/diagrams/logo/data_catering_logo.svg"
---

# Iceberg

Creating a data generator for Iceberg. You will have the ability to generate and validate Iceberg tables.

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

- Java: `src/main/java/io/github/datacatering/plan/MyIcebergJavaPlan.java`
- Scala: `src/main/scala/io/github/datacatering/plan/MyIcebergPlan.scala`

Make sure your class extends `PlanRun`.

=== "Java"

    ```java
    import io.github.datacatering.datacaterer.java.api.PlanRun;
    
    public class MyIcebergJavaPlan extends PlanRun {
    }
    ```

=== "Scala"

    ```scala
    import io.github.datacatering.datacaterer.api.PlanRun
    
    class MyIcebergPlan extends PlanRun {
    }
    ```

This class defines where we need to define all of our configurations for generating data. There are helper variables and
methods defined to make it simple and easy to use.

#### Connection Configuration

Within our class, we can start by defining the connection properties to read/write from/to Iceberg.

=== "Java"

    ```java
    var accountTask = iceberg(
            "customer_accounts",              //name
            "account.accounts",               //table name
            "/opt/app/data/customer/iceberg", //warehouse path
            "hadoop",                         //catalog type
            "",                               //catalogUri
            Map.of()                          //additional options
    );
    ```
    
    Additional options can be found [**here**](https://iceberg.apache.org/docs/1.5.0/spark-configuration/#catalog-configuration).

=== "Scala"

    ```scala
    val accountTask = iceberg(
      "customer_accounts",              //name
      "account.accounts",               //table name
      "/opt/app/data/customer/iceberg", //warehouse path
      "hadoop",                         //catalog type
      "",                               //catalogUri
      Map()                             //additional options
    )
    ```
    
    Additional options can be found [**here**](https://iceberg.apache.org/docs/1.5.0/spark-configuration/#catalog-configuration).

#### Schema

Depending on how you want to define the schema, follow the below:

- [Manual schema guide](../../scenario/data-generation.md)
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
#input class MyIcebergJavaPlan or MyIcebergPlan
```

Congratulations! You have now made a data generator that has simulated a real world data scenario. You can check the
`IcebergJavaPlan.java` or `IcebergPlan.scala` files as well to check that your plan is the same.

### Validation

If you want to validate data from an Iceberg source, 
[follow the validation documentation found here to help guide you](../../../validation.md).
