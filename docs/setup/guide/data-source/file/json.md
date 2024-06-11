---
title: "JSON Test Data Management"
description: "Example of JSON test data management tool that can automatically discover, generate and validate."
image: "https://data.catering/diagrams/logo/data_catering_logo.svg"
---

# JSON

Creating a data generator for JSON. You will have the ability to generate and validate JSON files via Docker.

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

- Java: `src/main/java/io/github/datacatering/plan/MyJSONJavaPlan.java`
- Scala: `src/main/scala/io/github/datacatering/plan/MyJSONPlan.scala`

Make sure your class extends `PlanRun`.

=== "Java"

    ```java
    import io.github.datacatering.datacaterer.java.api.PlanRun;
    
    public class MyJSONJavaPlan extends PlanRun {
    }
    ```

=== "Scala"

    ```scala
    import io.github.datacatering.datacaterer.api.PlanRun
    
    class MyJSONPlan extends PlanRun {
    }
    ```

This class defines where we need to define all of our configurations for generating data. There are helper variables and
methods defined to make it simple and easy to use.

#### Connection Configuration

Within our class, we can start by defining the connection properties to read/write from/to JSON.

=== "Java"

    ```java
    var accountTask = json(
        "customer_accounts",                    //name
        "/opt/app/data/customer/account_json",  //path
        Map.of()                                //additional options
    );
    ```
    
    Additional options can be found [**here**](https://spark.apache.org/docs/latest/sql-data-sources-json.html#data-source-option).

=== "Scala"

    ```scala
    val accountTask = json(
      "customer_accounts",                    //name         
      "/opt/app/data/customer/account_json",  //path
      Map()                                   //additional options
    )
    ```
    
    Additional options can be found [**here**](https://spark.apache.org/docs/latest/sql-data-sources-json.html#data-source-option).

#### Schema

Depending on how you want to define the schema, follow the below:

- [Manual schema guide](../../scenario/data-generation.md#schema)
- Automatically detect schema from the data source, you can simply enable `configuration.enableGeneratePlanAndTasks(true)`
- [Automatically detect schema from a metadata source](../../index.md#metadata)

Let's create a task for generating data as `accounts` and then generate data for `transactions`, which will be related 
to the accounts generated.

=== "Java"

    ```java
    var accountTask = json("customer_accounts", "/opt/app/data/customer/account_json")
            .schema(
                field().name("account_id"),
                field().name("balance").type(new DecimalType(5, 2)),
                field().name("created_by"),
                field().name("open_time").type(TimestampType.instance()),
                field().name("status"),
                field().name("customer_details")
                    .schema(
                        field().name("name"),
                        field().name("age").type(IntegerType.instance()),
                        field().name("city")
                    )
            );
    ```

=== "Scala"

    ```scala
    val accountTask = json("customer_accounts", "/opt/app/data/customer/account_json")
      .schema(
        field.name("account_id"),
        field.name("balance").`type`(new DecimalType(5, 2)),
        field.name("created_by"),
        field.name("open_time").`type`(TimestampType),
        field.name("status"),
        field.name("customer_details")
          .schema(
            field.name("name"),
            field.name("age").`type`(IntegerType),
            field.name("city")
          )
      )
    ```

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
#input class MyJSONJavaPlan or MyJSONPlan
#after completing, let's pick an account and check the transactions for that account
account=$(head -1 docker/sample/customer/account_json/part-00000-* | sed -nr 's/.*account_id":"(.+)","balance.*/\1/p')
echo "Head account record:"
head -1 docker/sample/customer/account_json/part-00000-*
echo $account
echo "Transaction records:"
cat docker/sample/customer/transaction_json/part-0000* | grep $account
```

It should look something like this.

```shell
Head account record:
{"account_id":"ACC00047541","balance":445.62,"created_by":"event","open_time":"2024-03-13T00:31:38.836Z","status":"suspended","customer_details":{"name":"Joey Gaylord","age":44,"city":"Lake Jose"}}
ACC00047541
Transaction records:
{"account_id":"ACC00047541","full_name":"Joey Gaylord","amount":31.485424217447527,"time":"2023-11-07T04:50:20.875Z","date":"2023-11-07"}
{"account_id":"ACC00047541","full_name":"Joey Gaylord","amount":79.22177964401857,"time":"2024-02-01T15:15:38.289Z","date":"2024-02-01"}
{"account_id":"ACC00047541","full_name":"Joey Gaylord","amount":56.06230355456882,"time":"2024-02-29T21:42:42.473Z","date":"2024-02-29"}
```

Congratulations! You have now made a data generator that has simulated a real world data scenario. You can check the
`JsonJavaPlan.java` or `JsonPlan.scala` files as well to check that your plan is the same.

### Validation

If you want to validate data from a JSON source, 
[follow the validation documentation found here to help guide you](../../../validation.md).
