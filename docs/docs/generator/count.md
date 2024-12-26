---
title: "Record count"
description: "Data Caterer generate records based on your desired scenario. Large numbers of records for performance testing, different distributions to reflect long-tailed data distributions or production-like data, or multiple records per set of unique field values."
image: "https://data.catering/diagrams/logo/data_catering_logo.svg"
---

# Record Count

There are options related to controlling the number of records generated that can help in generating the scenarios or data required.

## Record Count

Record count is the simplest as you define the total number of records you require for that particular step.
For example, in the below step, it will generate 1000 records for the CSV file  

=== "Java"

    ```java
    csv("transactions", "app/src/test/resources/sample/csv/transactions")
      .count(1000);
    ```

=== "Scala"

    ```scala
    csv("transactions", "app/src/test/resources/sample/csv/transactions")
      .count(1000)
    ```

=== "YAML"

    ```yaml
    name: "csv_file"
    steps:
      - name: "transactions"
        type: "csv"
        options:
          path: "app/src/test/resources/sample/csv/transactions"
        count:
          records: 1000
    ```

## Generated Count

As like most things in Data Caterer, the count can be generated based on some metadata.
For example, if I wanted to generate between 1000 and 2000 records, I could define that by the below configuration:

=== "Java"

    ```java
    csv("transactions", "app/src/test/resources/sample/csv/transactions")
      .count(generator().min(1000).max(2000));
    ```

=== "Scala"

    ```scala
    csv("transactions", "app/src/test/resources/sample/csv/transactions")
      .count(generator.min(1000).max(2000))
    ```

=== "YAML"

    ```yaml
    name: "csv_file"
    steps:
      - name: "transactions"
        type: "csv"
        options:
          path: "app/src/test/resources/sample/csv/transactions"
        count:
          generator:
            type: "random"
            options:
              min: 1000
              max: 2000
    ```

## Per Field Count

When defining a per field count, this allows you to generate records "per set of fields".
This means that for a given set of fields, it will generate a particular amount of records per combination of values 
for those fields.  

One example of this would be when generating transactions relating to a customer, a customer may be defined by fields `account_id, name`.
A number of transactions would be generated per `account_id, name`.  

You can also use a combination of the above two methods to generate the number of records per field.

### Records

When defining a base number of records within the `perField` configuration, it translates to creating `(count.records * count.recordsPerField)` records.  
This is a fixed number of records that will be generated each time, with no variation between runs.

In the example below, we have `count.records = 1000` and `count.recordsPerField = 2`. Which means that `1000 * 2 = 2000` records will be generated
in total.

=== "Java"

    ```java
    csv("transactions", "app/src/test/resources/sample/csv/transactions")
      .count(
        count()
          .records(1000)
          .recordsPerField(2, "account_id", "name")
      );
    ```

=== "Scala"

    ```scala
    csv("transactions", "app/src/test/resources/sample/csv/transactions")
      .count(
        count
          .records(1000)
          .recordsPerField(2, "account_id", "name")
      )
    ```

=== "YAML"

    ```yaml
    name: "csv_file"
    steps:
      - name: "transactions"
        type: "csv"
        options:
          path: "app/src/test/resources/sample/csv/transactions"
        count:
          records: 1000
          perField:
            records: 2
            fieldNames:
              - "account_id"
              - "name"
    ```

### Generated

You can also define a generator for the count per field. This can be used in scenarios where you want a variable number of records
per set of fields.

In the example below, it will generate between `(count.records * count.perFieldGenerator.generator.min) = (1000 * 1) = 1000` and
`(count.records * count.perFieldGenerator.generator.max) = (1000 * 2) = 2000` records.


=== "Java"

    ```java
    csv("transactions", "app/src/test/resources/sample/csv/transactions")
      .count(
        count()
          .records(1000)
          .recordsPerFieldGenerator(generator().min(1).max(2), "account_id", "name")
      );
    ```

=== "Scala"

    ```scala
    csv("transactions", "app/src/test/resources/sample/csv/transactions")
      .count(
        count
          .records(1000)
          .recordsPerFieldGenerator(generator.min(1).max(2), "account_id", "name")
      )
    ```

=== "YAML"

    ```yaml
    name: "csv_file"
    steps:
      - name: "transactions"
        type: "csv"
        options:
          path: "app/src/test/resources/sample/csv/transactions"
        count:
          records: 1000
          perField:
            fieldNames:
              - "account_id"
              - "name"
            generator:
              type: "random"
              options:
                min: 1
                max: 2
    ```

## All Combinations

If you want to generate records for all combinations of values that your fields can obtain, you can set `allCombinations`
to `true`.

For example, if your dataset has fields:
- `account_id`: Some string
- `debit_credit`: Either `D` or `C`
- `status`: Either `open`, `closed` or `suspended`

It can generate a dataset like below where all combinations of `debit_credit` and `status` are covered:

| account_id | debit_credit | status    |
|------------|--------------|-----------|
| ACC123     | D            | open      |
| ACC124     | D            | closed    |
| ACC125     | D            | suspended |
| ACC126     | C            | open      |
| ACC127     | C            | closed    |
| ACC128     | C            | suspended |


=== "Java"

    ```java
    csv("transactions", "app/src/test/resources/sample/csv/transactions")
      .fields(
        field().name("account_id"),
        field().name("debit_creidt").oneOf("D", "C"),
        field().name("status").oneOf("open", "closed", "suspended")
      )
      .allCombinations(true);
    ```

=== "Scala"

    ```scala
    csv("transactions", "app/src/test/resources/sample/csv/transactions")
      schema(
        field.name("account_id"),
        field.name("debit_creidt").oneOf("D", "C"),
        field.name("status").oneOf("open", "closed", "suspended")
      )
      .allCombinations(true)
    ```

=== "YAML"

    ```yaml
    name: "csv_file"
    steps:
      - name: "transactions"
        type: "csv"
        options:
          path: "app/src/test/resources/sample/csv/transactions"
          allCombinations: "true"
        fields:
          - name: "account_id"
          - name: "debit_credit"
            options:
              oneOf:
                - "D"
                - "C"
          - name: "status"
            options:
              oneOf:
                - "open"
                - "closed"
                - "suspended"
    ```
