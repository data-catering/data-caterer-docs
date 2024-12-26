---
title: "Postgres Test Data Management"
description: "Example of Postgres data generation and testing tool that can automatically discover, generate and validate."
image: "https://data.catering/diagrams/logo/data_catering_logo.svg"
---

# Postgres

Creating a data generator for Postgres. You will build a Docker image that will be able to populate data in Postgres
for the tables you configure.

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

If you already have a Postgres instance running, you can skip to [this step](#plan-setup).

### Postgres Setup

Next, let's make sure you have an instance of Postgres up and running in your local environment. This will make it
easy for us to iterate and check our changes.

```shell
cd docker
docker-compose up -d mysql
```

#### Permissions

Let's make a new user that has the required permissions needed to push data into the Postgres tables we want.

???+ tip "SQL Permission Statements"

    ```sql
    GRANT INSERT ON <schema>.<table> TO data_caterer_user;
    ```

Following permissions are required when enabling `configuration.enableGeneratePlanAndTasks(true)` as it will gather
metadata information about tables and fields from the below tables.

???+ tip "SQL Permission Statements"

    ```sql
    GRANT SELECT ON information_schema.columns TO < user >;
    GRANT SELECT ON information_schema.statistics TO < user >;
    GRANT SELECT ON information_schema.key_column_usage TO < user >;
    ```

### Plan Setup

Create a new Java or Scala class.

- Java: `src/main/java/io/github/datacatering/plan/MyPostgresJavaPlan.java`
- Scala: `src/main/scala/io/github/datacatering/plan/MyPostgresPlan.scala`

Make sure your class extends `PlanRun`.

=== "Java"

    ```java
    import io.github.datacatering.datacaterer.java.api.PlanRun;
    
    public class MyPostgresJavaPlan extends PlanRun {
    }
    ```

=== "Scala"

    ```scala
    import io.github.datacatering.datacaterer.api.PlanRun
    
    class MyPostgresPlan extends PlanRun {
    }
    ```

This class defines where we need to define all of our configurations for generating data. There are helper variables and
methods defined to make it simple and easy to use.

#### Connection Configuration

Within our class, we can start by defining the connection properties to connect to Postgres.

=== "Java"

    ```java
    var accountTask = postgres(
        "customer_postgres",                                    //name
        "jdbc:postgresql://host.docker.internal:5432/customer", //url
        "postgres",                                             //username
        "postgres",                                             //password
        Map.of()                                                //optional additional connection options
    )
    ```
    
    Additional options such as SSL configuration, etc can be found [**here**](https://spark.apache.org/docs/latest/sql-data-sources-jdbc.html#data-source-option).

=== "Scala"

    ```scala
    val accountTask = postgres(
        "customer_postgres",                                    //name
        "jdbc:postgresql://host.docker.internal:5432/customer", //url
        "postgres",                                             //username
        "postgres",                                             //password
        Map()                                                   //optional additional connection options
    )
    ```
    
    Additional options such as SSL configuration, etc can be found [**here**](https://spark.apache.org/docs/latest/sql-data-sources-jdbc.html#data-source-option).

=== "YAML"

    In `application.conf`:
    ```
    jdbc {
        customer_postgres {
            url = "jdbc:mysql://jdbc:postgresql://host.docker.internal:5432/customer/customer"
            user = "postgres"
            password = "postgres"
            driver = "org.postgresql.Driver"
        }
    }
    ```

#### Schema

Let's create a task for inserting data into the `account.accounts` and `account.balances` tables as
defined under`docker/data/sql/postgres/customer.cql`. This table should already be setup for you if you followed this
[step](#postgres-setup).

Trimming the connection details to work with the docker-compose Postgres, we have a base Postgres connection to define
the table and schema required. Let's define each field along with their corresponding data type. You will notice that
the `text` fields do not have a data type defined. This is because the default data type is `StringType` which
corresponds to `text` in Postgres.

=== "Java"

    ```java
    {
        var accountTask = postgres("customer_postgres", "jdbc:postgresql://host.docker.internal:5432/customer")
                .table("account", "accounts")
                .fields(
                        field().name("account_number"),
                        field().name("amount").type(DoubleType.instance()),
                        field().name("created_by"),
                        field().name("created_by_fixed_length"),
                        field().name("open_timestamp").type(TimestampType.instance()),
                        field().name("account_status")
                );
    }
    ```

=== "Scala"

    ```scala
    val accountTask = postgres("customer_postgres", "jdbc:postgresql://host.docker.internal:5432/customer")
      .table("account", "accounts")
      .fields(
        field.name("account_number"),
        field.name("amount").`type`(DoubleType),
        field.name("created_by"),
        field.name("created_by_fixed_length"),
        field.name("open_timestamp").`type`(TimestampType),
        field.name("account_status")
      )
    ```

Depending on how you want to define the schema, follow the below:

- [Manual schema guide](../../scenario/data-generation.md#schema)
- Automatically detect schema from the data source, you can simply
  enable `configuration.enableGeneratePlanAndTasks(true)`
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
    ```

=== "Scala"

    ```scala
    val config = configuration
      .generatedReportsFolderPath("/opt/app/data/report")
      .enableUniqueCheck(true)
    ```

#### Execute

To tell Data Caterer that we want to run with the configurations along with the `accountTask`, we have to call `execute`
. So our full plan run will look like this.

=== "Java"

    ```java
    public class MyPostgresJavaPlan extends PlanRun {
        {
            var accountTask = postgres("customer_postgres", "jdbc:postgresql://host.docker.internal:5432/customer")
                    .table("account", "accounts")
                    .fields(
                            field().name("account_number").regex("ACC[0-9]{8}").primaryKey(true),
                            field().name("amount").type(DoubleType.instance()).min(1).max(1000),
                            field().name("created_by").expression("#{Name.name}"),
                            field().name("created_by_fixed_length").sql("CASE WHEN account_status IN ('open', 'closed') THEN 'eod' ELSE 'event' END"),
                            field().name("open_timestamp").type(TimestampType.instance()).min(java.sql.Date.valueOf("2022-01-01")),
                            field().name("account_status").oneOf("open", "closed", "suspended", "pending")
                    );
    
            var config = configuration()
                    .generatedReportsFolderPath("/opt/app/data/report")
                    .enableUniqueCheck(true);
            
            execute(config, accountTask);
        }
    }
    ```

=== "Scala"

    ```scala
    class MyPostgresPlan extends PlanRun {
      val accountTask = postgres("customer_postgres", "jdbc:postgresql://host.docker.internal:5432/customer")
        .table("account", "accounts")
        .fields(
          field.name("account_number").primaryKey(true),
          field.name("amount").`type`(DoubleType).min(1).max(1000),
          field.name("created_by").expression("#{Name.name}"),
          field.name("created_by_fixed_length").sql("CASE WHEN account_status IN ('open', 'closed') THEN 'eod' ELSE 'event' END"),
          field.name("open_timestamp").`type`(TimestampType).min(java.sql.Date.valueOf("2022-01-01")),
          field.name("account_status").oneOf("open", "closed", "suspended", "pending")
        )
    
      val config = configuration
        .generatedReportsFolderPath("/opt/app/data/report")
        .enableUniqueCheck(true)
      
      execute(config, accountTask)
    }
    ```

### Run

Now we can run via the script `./run.sh` that is in the top level directory of the `data-caterer-example` to run the
class we just
created.

```shell
./run.sh
#input class MyPostgresJavaPlan or MyPostgresPlan
#after completing
docker exec docker-postgresserver-1  psql -Upostgres -d customer -c "SELECT COUNT(1) FROM account.accounts; SELECT * FROM account.accounts LIMIT 10;"
```

Your output should look like this.

```shell
 count
-------
   100
(1 row)

 id | account_number | account_status |     created_by      | created_by_fixed_length | customer_id_int | customer_id_smallint | customer_id_bigint | customer_id_decimal | customer_id_real | customer_id_double | open_date |     open_timestamp      | last_opened_time | payload_bytes
----+----------------+----------------+---------------------+-------------------------+-----------------+----------------------+--------------------+---------------------+------------------+--------------------+-----------+-------------------------+------------------+---------------
  1 | 0499572486     | closed         | Stewart Hartmann    | eod                     |             951 |                      |                    |                     |                  |                    |           | 2023-12-02 12:30:37.602 |                  |
  4 | 0777698075     | closed         | Shauna Huels        | eod                     |             225 |                      |                    |                     |                  |                    |           | 2023-08-07 01:25:32.732 |                  |
  2 | 1011209228     | suspended      | Miss Yu Torp        | event                   |             301 |                      |                    |                     |                  |                    |           | 2024-03-07 08:33:03.031 |                  |
  6 | 0759166208     | closed         | Mrs. Alesha Koelpin | eod                     |             778 |                      |                    |                     |                  |                    |           | 2024-04-18 13:23:43.861 |                  |
  5 | 1151247273     | closed         | Eugenio Corkery     | eod                     |             983 |                      |                    |                     |                  |                    |           | 2024-05-03 22:44:22.816 |                  |
  7 | 3909668884     | suspended      | Deandra Ratke       | event                   |             891 |                      |                    |                     |                  |                    |           | 2024-05-01 13:11:05.498 |                  |
  8 | 5396749742     | suspended      | Grant Moen          | event                   |              46 |                      |                    |                     |                  |                    |           | 2024-02-22 14:43:31.294 |                  |
  9 | 4269791821     | suspended      | Kenton Romaguera    | event                   |             735 |                      |                    |                     |                  |                    |           | 2024-05-16 16:40:55.781 |                  |
 10 | 6095315531     | closed         | Crystle Hintz       | eod                     |             279 |                      |                    |                     |                  |                    |           | 2024-02-18 07:40:21.088 |                  |
 11 | 6625684008     | open           | Miss Edelmira Rath  | eod                     |             200 |                      |                    |                     |                  |                    |           | 2024-05-12 17:17:55.86  |                  |
(10 rows)
```

Also check the HTML report, found at `docker/sample/report/index.html`, that gets generated to get an overview of what
was executed.

![Sample report](../../../../sample/report/report_screenshot.png)

### Validation

If you want to validate data from Postgres,
[follow the validation documentation found here to help guide you](../../../validation.md).
