---
title: "Using Great Expectations for Test Data Management"
description: "Example of using Great Expectations for data generation and testing in Data Caterer."
image: "https://data.catering/diagrams/logo/data_catering_logo.svg"
---

# Great Expectations Source

!!! example "Info"

    Generating data based on an external metadata source is a paid feature.

Creating a data generator for a JSON file and validating the data based on expectations 
in [Great Expectations](https://github.com/great-expectations/great_expectations).

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

### Great Expectations Setup

A sample expectations file that will be used for this guide can be found 
[**here**](https://github.com/data-catering/data-caterer-example/tree/main/docker/mount/ge/taxi-expectations.json).

If you want to use your own expectations file, simply add it into the `docker/mount/ge` folder path and follow the below
steps.

### Plan Setup

Create a new Java or Scala class.

- Java: `src/main/java/io/github/datacatering/plan/MyAdvancedGreatExpectationsJavaPlanRun.java`
- Scala: `src/main/scala/io/github/datacatering/plan/MyAdvancedGreatExpectationsPlanRun.scala`

Make sure your class extends `PlanRun`.

=== "Java"

    ```java
    import io.github.datacatering.datacaterer.java.api.PlanRun;
    ...
    
    public class MyAdvancedGreatExpectationsJavaPlanRun extends PlanRun {
        {
            var conf = configuration().enableGenerateValidations(true)
                .generatedReportsFolderPath("/opt/app/data/report");
        }
    }
    ```

=== "Scala"

    ```scala
    import io.github.datacatering.datacaterer.api.PlanRun
    ...
    
    class MyAdvancedGreatExpectationsPlanRun extends PlanRun {
      val conf = configuration.enableGenerateValidations(true)
        .generatedReportsFolderPath("/opt/app/data/report")
    }
    ```

We will enable generate validations so that we can read from external sources for validations and save the reports
under a folder we can easily access.

#### Great Expectations

To point to a specific expectations file, we create a metadata source as seen below.

=== "Java"

    ```
    var greatExpectationsSource = metadataSource().greatExpectations("/opt/app/mount/ge/taxi-expectations.json");
    ```

=== "Scala"

    ```
    val greatExpectationsSource = metadataSource.greatExpectations("/opt/app/mount/ge/taxi-expectations.json")
    ```

#### Schema & Validation

To simulate a scenario where we have an existing data source, we will manually create a sample dataset.
  
At the end, we point to our expectations metadata source to use those validations to validate the data.

=== "Java"

    ```java
    var jsonTask = json("my_json", "/opt/app/data/json", Map.of("saveMode", "overwrite"))
            .schema(
                    field().name("vendor_id"),
                    field().name("pickup_datetime").type(TimestampType.instance()),
                    field().name("dropoff_datetime").type(TimestampType.instance()),
                    field().name("passenger_count").type(IntegerType.instance()),
                    field().name("trip_distance").type(DoubleType.instance()),
                    field().name("rate_code_id"),
                    field().name("store_and_fwd_flag"),
                    field().name("pickup_location_id"),
                    field().name("dropoff_location_id"),
                    field().name("payment_type"),
                    field().name("fare_amount").type(DoubleType.instance()),
                    field().name("extra"),
                    field().name("mta_tax").type(DoubleType.instance()),
                    field().name("tip_amount").type(DoubleType.instance()),
                    field().name("tolls_amount").type(DoubleType.instance()),
                    field().name("improvement_surcharge").type(DoubleType.instance()),
                    field().name("total_amount").type(DoubleType.instance()),
                    field().name("congestion_surcharge").type(DoubleType.instance())
            )
            .validations(greatExpectations);
    ```

=== "Scala"

    ```scala
    val jsonTask = json("my_json", "/opt/app/data/taxi_json", Map("saveMode" -> "overwrite"))
      .schema(
        field.name("vendor_id"),
        field.name("pickup_datetime").`type`(TimestampType),
        field.name("dropoff_datetime").`type`(TimestampType),
        field.name("passenger_count").`type`(IntegerType),
        field.name("trip_distance").`type`(DoubleType),
        field.name("rate_code_id"),
        field.name("store_and_fwd_flag"),
        field.name("pickup_location_id"),
        field.name("dropoff_location_id"),
        field.name("payment_type"),
        field.name("fare_amount").`type`(DoubleType),
        field.name("extra"),
        field.name("mta_tax").`type`(DoubleType),
        field.name("tip_amount").`type`(DoubleType),
        field.name("tolls_amount").`type`(DoubleType),
        field.name("improvement_surcharge").`type`(DoubleType),
        field.name("total_amount").`type`(DoubleType),
        field.name("congestion_surcharge").`type`(DoubleType),
      )
      .validations(greatExpectationsSource)
    ```

### Run

Let's try run and see what happens.

```shell
cd ..
./run.sh
#input class MyAdvancedGreatExpectationsJavaPlanRun or MyAdvancedGreatExpectationsPlanRun
#after completing
#open docker/sample/report/index.html
```

It should look something like this.

![Validations HTML report](../../../../diagrams/data-source/great_expectations_validation_report.png)

So we were just able to validate our data source from reading a Great Expectations file. Simple!
This gives us an easy way to integrate with existing data validations, but now we can relate that to
generated data in test environments.
  
But we still may want to add on our own validations outside what is in Great Expectations.

### Custom validation

We found that we should also check that the `trip_distance` has to be less than `500` but was not included in Great
Expectations. No worries, we can simply add it in here alongside the existing expectations.

=== "Java"

    ```java
    var jsonTask = json("my_json", "/opt/app/data/json", Map.of("saveMode", "overwrite"))
            .schema(
                ...
            ))
            .validations(greatExpectations)
            .validations(validation().col("trip_distance").lessThan(500));
    ```

=== "Scala"

    ```scala
    val jsonTask = json("my_json", "/opt/app/data/json", Map("saveMode" -> "overwrite"))
      .schema(
        ...
      ))
      .validations(greatExpectationsSource)
      .validations(validation.col("trip_distance").lessThan(500))
    ```

Let's test it out by running it again

```shell
./run.sh
#input class MyAdvancedGreatExpectationsJavaPlanRun or MyAdvancedGreatExpectationsJavaPlanRun
#open docker/sample/report/index.html
```

![Our custom validation applied alongside Great Expectation validations](../../../../diagrams/data-source/custom_validation_great_expectation.png)

Check out the full example under `AdvancedGreatExpectationsPlanRun` in the example repo.
