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

```shell
git clone git@github.com:data-catering/data-caterer-example.git
```

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

#### Field Metadata

We could stop here and generate random data for the accounts table. But wouldn't it be more useful if we produced data
that is closer to the structure of the data that would come in production? We can do this by defining various metadata
that add guidelines that the data generator will understand when generating data.

##### account_id

`account_id` follows a particular pattern that where it starts with `ACC` and has 8 digits after it.
This can be defined via a regex like below. Alongside, we also mention that it is the primary key to prompt ensure that
unique values are generated.

=== "Java"

    ```java
    field().name("account_id").regex("ACC[0-9]{8}").unique(true),
    ```

=== "Scala"

    ```scala
    field.name("account_id").regex("ACC[0-9]{8}").unique(true),
    ```

##### balance

`balance` the numbers shouldn't be too large, so we can define a min and max for the generated numbers to be between
`1` and `1000`.

=== "Java"

    ```java
    field().name("balance").type(new DecimalType(5, 2)).min(1).max(1000),
    ```

=== "Scala"

    ```scala
    field.name("balance").`type`(new DecimalType(5, 2)).min(1).max(1000),
    ```

##### name

`name` is a string that also follows a certain pattern, so we could also define a regex but here we will choose to
leverage the DataFaker library and create an `expression` to generate real looking name. All possible faker expressions
can be found [**here**](../../../../sample/datafaker/expressions.txt)

=== "Java"

    ```java
    field().name("name").expression("#{Name.name}"),
    ```

=== "Scala"

    ```scala
    field.name("name").expression("#{Name.name}"),
    ```

##### open_time

`open_time` is a timestamp that we want to have a value greater than a specific date. We can define a min date by using
`java.sql.Date` like below.

=== "Java"

    ```java
    field().name("open_time").type(TimestampType.instance()).min(java.sql.Date.valueOf("2022-01-01")),
    ```

=== "Scala"

    ```scala
    field.name("open_time").`type`(TimestampType).min(java.sql.Date.valueOf("2022-01-01")),
    ```

##### status

`status` is a field that can only obtain one of four values, `open, closed, suspended or pending`.

=== "Java"

    ```java
    field().name("status").oneOf("open", "closed", "suspended", "pending")
    ```

=== "Scala"

    ```scala
    field.name("status").oneOf("open", "closed", "suspended", "pending")
    ```

##### created_by

`created_by` is a field that is based on the `status` field where it follows the logic: `if status is open or closed, then
it is created_by eod else created_by event`. This can be achieved by defining a SQL expression like below.

=== "Java"

    ```java
    field().name("created_by").sql("CASE WHEN status IN ('open', 'closed') THEN 'eod' ELSE 'event' END"),
    ```

=== "Scala"

    ```scala
    field.name("created_by").sql("CASE WHEN status IN ('open', 'closed') THEN 'eod' ELSE 'event' END"),
    ```

Putting it all the fields together, our class should now look like this.

=== "Java"

    ```java
    var accountTask = json("customer_accounts", "/opt/app/data/customer/account_json")
            .schema(
                    field().name("account_id").regex("ACC[0-9]{8}").unique(true),
                    field().name("balance").type(new DecimalType(5, 2)).min(1).max(1000),
                    field().name("created_by").sql("CASE WHEN status IN ('open', 'closed') THEN 'eod' ELSE 'event' END"),
                    field().name("open_time").type(TimestampType.instance()).min(java.sql.Date.valueOf("2022-01-01")),
                    field().name("status").oneOf("open", "closed", "suspended", "pending"),
                    field().name("customer_details")
                        .schema(
                            field().name("name").sql("tmp_name"),
                            field().name("age").type(IntegerType.instance()).min(18).max(90),
                            field().name("city").expression("#{Address.city}")
                        ),
                    field().name("tmp_name").expression("#{Name.name}").omit(true)
            );
    ```

=== "Scala"

    ```scala
    val accountTask = json("customer_accounts", "/opt/app/data/customer/account_json")
      .schema(
        field.name("account_id").regex("ACC[0-9]{8}").unique(true),
        field.name("balance").`type`(new DecimalType(5, 2)).min(1).max(1000),
        field.name("created_by").sql("CASE WHEN status IN ('open', 'closed') THEN 'eod' ELSE 'event' END"),
        field.name("open_time").`type`(TimestampType).min(java.sql.Date.valueOf("2022-01-01")),
        field.name("status").oneOf("open", "closed", "suspended", "pending"),
        field.name("customer_details")
          .schema(
            field.name("name").sql("tmp_name"),
            field.name("age").`type`(IntegerType).min(18).max(90),
            field.name("city").expression("#{Address.city}")
          ),
        field.name("tmp_name").expression("#{Name.name}").omit(true)
      )
    ```

#### Join With Another JSON

Now that we have generated some accounts, let's also try to generate a set of transactions for those accounts in JSON
format as well. The transactions could be in any other format, but to keep this simple, we will continue using JSON.

We can define our schema the same way along with any additional metadata.

=== "Java"

    ```java
    var transactionTask = json("customer_transactions", "/opt/app/data/customer/transaction_json")
            .schema(
                    field().name("account_id"),
                    field().name("full_name"),
                    field().name("amount").type(DoubleType.instance()).min(1).max(100),
                    field().name("time").type(TimestampType.instance()).min(java.sql.Date.valueOf("2022-01-01")),
                    field().name("date").type(DateType.instance()).sql("DATE(time)")
            );
    ```

=== "Scala"

    ```scala
    val transactionTask = json("customer_transactions", "/opt/app/data/customer/transaction_json")
      .schema(
        field.name("account_id"),
        field.name("full_name"),
        field.name("amount").`type`(DoubleType).min(1).max(100),
        field.name("time").`type`(TimestampType).min(java.sql.Date.valueOf("2022-01-01")),
        field.name("date").`type`(DateType).sql("DATE(time)")
      )
    ```

##### Records Per Column

Usually, for a given `account_id, full_name`, there should be multiple records for it as we want to simulate a customer
having multiple transactions. We can achieve this through defining the number of records to generate in the `count`
function.

=== "Java"

    ```java
    var transactionTask = json("customer_transactions", "/opt/app/data/customer/transaction_json")
            .schema(
                    ...
            )
            .count(count().recordsPerColumn(5, "account_id", "full_name"));
    ```

=== "Scala"

    ```scala
    val transactionTask = json("customer_transactions", "/opt/app/data/customer/transaction_json")
      .schema(
        ...
      )
      .count(count.recordsPerColumn(5, "account_id", "full_name"))
    ```

##### Random Records Per Column

Above, you will notice that we are generating 5 records per `account_id, full_name`. This is okay but still not quite
reflective of the real world. Sometimes, people have accounts with no transactions in them, or they could have many. We
can accommodate for this via defining a random number of records per column.

=== "Java"

    ```java
    var transactionTask = json("customer_transactions", "/opt/app/data/customer/transaction_json")
            .schema(
                    ...
            )
            .count(count().recordsPerColumnGenerator(generator().min(0).max(5), "account_id", "full_name"));
    ```

=== "Scala"

    ```scala
    val transactionTask = json("customer_transactions", "/opt/app/data/customer/transaction_json")
      .schema(
        ...
      )
      .count(count.recordsPerColumnGenerator(generator.min(0).max(5), "account_id", "full_name"))
    ```

Here we set the minimum number of records per column to be 0 and the maximum to 5.


#### Foreign Key Relationships

In this scenario, we want to match the `account_id` in `account` to match the same column values in `transaction`. We
also want to match `customer_details.name` in `account` to `full_name` in `transaction`. This can be done via plan configuration like
below. Notice that `tmp_name` is omitted from the final output and is used as an intermediate result for processing.

=== "Java"

    ```java
    var myPlan = plan().addForeignKeyRelationship(
            accountTask, List.of("account_id", "tmp_name"), //the task and columns we want linked
            List.of(Map.entry(transactionTask, List.of("account_id", "full_name"))) //list of other tasks and their respective column names we want matched
    );
    ```

=== "Scala"

    ```scala
    val myPlan = plan.addForeignKeyRelationship(
      accountTask, List("account_id", "tmp_name"),  //the task and columns we want linked
      List(transactionTask -> List("account_id", "full_name"))  //list of other tasks and their respective column names we want matched
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
