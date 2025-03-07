---
title: "ORC Test Data Management"
description: "Example of ORC test data management tool that can automatically discover, generate and validate."
image: "https://data.catering/diagrams/logo/data_catering_logo.svg"
---

# ORC

Creating a data generator for ORC. You will have the ability to generate and validate ORC files via Docker.

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

Create a file depending on which interface you want to use.

- Java: `src/main/java/io/github/datacatering/plan/MyORCJavaPlan.java`
- Scala: `src/main/scala/io/github/datacatering/plan/MyORCPlan.scala`
- YAML: `docker/data/custom/plan/my-orc.yaml`

=== "Java"

    ```java
    import io.github.datacatering.datacaterer.java.api.PlanRun;
    
    public class MyORCJavaPlan extends PlanRun {
    }
    ```

=== "Scala"

    ```scala
    import io.github.datacatering.datacaterer.api.PlanRun
    
    class MyORCPlan extends PlanRun {
    }
    ```

=== "YAML"

    In `docker/data/custom/plan/my-orc.yaml`:
    ```yaml
    name: "my_orc_plan"
    description: "Create account data in ORC format"
    tasks:
      - name: "orc_task"
        dataSourceName: "my_orc"
    ```

=== "UI"

    1. Click on `Connection` towards the top of the screen
    1. For connection name, set to `my_orc`
    1. Click on `Select data source type..` and select `ORC`
    1. Set `Path` as `/tmp/custom/orc/accounts`
        1. Optionally, we could set the number of partitions and columns to partition by
    1. Click on `Create`
    1. You should see your connection `my_orc` show under `Existing connections`
    1. Click on `Home` towards the top of the screen
    1. Set plan name to `my_orc_plan`
    1. Set task name to `orc_task`
    1. Click on `Select data source..` and select `my_orc`

This class defines where we need to define all of our configurations for generating data. There are helper variables and
methods defined to make it simple and easy to use.

#### Connection Configuration

Within our class, we can start by defining the connection properties to read/write from/to ORC.

=== "Java"

    ```java
    var accountTask = orc(
        "customer_accounts",                  //name
        "/opt/app/data/customer/account_orc", //path
        Map.of()                              //additional options
    );
    ```
    
    Additional options can be found [**here**](https://spark.apache.org/docs/latest/sql-data-sources-orc.html#data-source-option).

=== "Scala"

    ```scala
    val accountTask = orc(
      "customer_accounts",                  //name         
      "/opt/app/data/customer/account_orc", //path
      Map()                                 //additional options
    )
    ```
    
    Additional options can be found [**here**](https://spark.apache.org/docs/latest/sql-data-sources-orc.html#data-source-option).

=== "YAML"

    In `docker/data/custom/application.conf`:
    ```
    orc {
        my_orc {
            "spark.sql.orc.mergeSchema": "false"
        }
    }
    ```

    Additional options can be found [**here**](https://spark.apache.org/docs/latest/sql-data-sources-orc.html#data-source-option).

=== "UI"

    1. We have already created the connection details in [this step](#plan-setup)

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

=== "YAML"

    In `docker/data/custom/application.conf`:
    ```
    flags {
      enableUniqueCheck = true
    }
    folders {
      generatedReportsFolderPath = "/opt/app/data/report"
    }
    ```

=== "UI"

    1. Click on `Advanced Configuration` towards the bottom of the screen
    1. Click on `Flag` and click on `Unique Check`
    1. Click on `Folder` and enter `/tmp/data-caterer/report` for `Generated Reports Folder Path`

### Run

Now we can run via the script `./run.sh` that is in the top level directory of the `data-caterer-example` to run the class we just
created.

=== "Java"

    ```shell
    ./run.sh MyORCJavaPlan
    ```

=== "Scala"

    ```shell
    ./run.sh MyORCPlan
    ```

=== "YAML"

    ```shell
    ./run.sh my-orc.yaml
    ```

=== "UI"

    1. Click the button `Execute` at the top
    1. Progress updates will show in the bottom right corner
    1. Click on `History` at the top
    1. Check for your plan name and see the result summary
    1. Click on `Report` on the right side to see more details of what was executed

Congratulations! You have now made a data generator that has simulated a real world data scenario. You can check the
`ORCJavaPlan.java` or `ORCPlan.scala` files as well to check that your plan is the same.

### Validation

If you want to validate data from a ORC source, 
[follow the validation documentation found here to help guide you](../../../validation.md).
