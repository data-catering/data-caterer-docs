---
title: "Data Catering - Column Name Validations"
description: "Examples of column name level validations for data in files, databases, HTTP APIs or messaging systems via Data Catering."
image: "https://data.catering/diagrams/logo/data_catering_logo.svg"
---

# Column Name Validations

Run validations on the column names to check for column name count of existence of column names.

## Count Equal

Ensure column name count is equal to certain number.

=== "Java"

    ```java
    validation().columnNames().countEqual(3)
    ```

=== "Scala"

    ```scala
    validation.columnNames.countEqual(3)
    ```

## Not Equal

Ensure column name count is between two numbers.

=== "Java"

    ```java
    validation().columnNames().countBetween(10, 12)
    ```

=== "Scala"

    ```scala
    validation.columnNames.countBetween(10, 12)
    ```

## Match Order

Ensure all column names match particular ordering and is complete.

=== "Java"

    ```java
    validation().columnNames().matchOrder("account_id", "amount", "name")
    ```

=== "Scala"

    ```scala
    validation.columnNames.matchOrder("account_id", "amount", "name")
    ```

## Match Set

Ensure column names contains set of expected names. Order is not checked.

=== "Java"

    ```java
    validation().columnNames().matchSet("account_id", "first_name")
    ```

=== "Scala"

    ```scala
    validation.columnNames.matchSet("account_id", "first_name")
    ```
