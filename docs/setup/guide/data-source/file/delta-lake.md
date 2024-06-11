---
title: "Delta Lake Test Data Management"
description: "Example of Delta Lake test data management tool that can automatically discover, generate and validate."
image: "https://data.catering/diagrams/logo/data_catering_logo.svg"
---

# Delta Lake

Creating a data generator for Delta Lake. You will have the ability to generate and validate Delta Lake files.

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

- Java: `src/main/java/io/github/datacatering/plan/MyDeltaLakeJavaPlan.java`
- Scala: `src/main/scala/io/github/datacatering/plan/MyDeltaLakePlan.scala`

Make sure your class extends `PlanRun`.

=== "Java"

    ```java
    import io.github.datacatering.datacaterer.java.api.PlanRun;
    
    public class MyDeltaLakeJavaPlan extends PlanRun {
    }
    ```

=== "Scala"

    ```scala
    import io.github.datacatering.datacaterer.api.PlanRun
    
    class MyDeltaLakePlan extends PlanRun {
    }
    ```

This class defines where we need to define all of our configurations for generating data. There are helper variables and
methods defined to make it simple and easy to use.

#### Connection Configuration

Within our class, we can start by defining the connection properties to read/write from/to Delta Lake.

=== "Java"

    ```java
    var accountTask = delta(
            "customer_accounts",            //name
            "/opt/app/data/customer/delta", //path
            Map.of()                        //additional options
    );
    ```
    
    Additional options can be found [**here**](https://docs.delta.io/latest/delta-batch.html#).

=== "Scala"

    ```scala
    val accountTask = delta(
      "customer_accounts",            //name
      "/opt/app/data/customer/delta", //path
      Map()                           //additional options
    )
    ```
    
    Additional options can be found [**here**](https://docs.delta.io/latest/delta-batch.html#).

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
#input class MyDeltaLakeJavaPlan or MyDeltaLakePlan
```

Congratulations! You have now made a data generator that has simulated a real world data scenario. You can check the
`DeltaLakeJavaPlan.java` or `DeltaLakePlan.scala` files as well to check that your plan is the same.

### Validation

If you want to validate data from an Delta Lake source, 
[follow the validation documentation found here to help guide you](../../../validation.md).
