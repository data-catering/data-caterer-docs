---
title: "Using JSON Schema with Data Caterer"
description: "Example of using JSON Schema for data generation and testing in Data Caterer."
image: "https://data.catering/diagrams/logo/data_catering_logo.svg"
---

# JSON Schema Source

![Data Caterer reading from JSON Schema file for schema metadata](../../../../diagrams/data-source/high_level_flow-run-config-basic-flow-odcs-support.svg)

Creating a data generator for JSON files based on metadata stored in [JSON Schema](https://json-schema.org/) format. JSON Schema provides a powerful way to describe and validate the structure of JSON data, making it an excellent metadata source for generating realistic test data.

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

### JSON Schema Setup

We will be using a JSON Schema file that defines the structure for a financial payment system. You can use your own JSON Schema file by placing it in the appropriate mount folder and following the steps below.

Example JSON Schema structure:

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "properties": {
    "customer_direct_debit_initiation_v11": {
      "type": "object",
      "properties": {
        "group_header": {
          "type": "object",
          "properties": {
            "message_identification": {"type": "string"},
            "creation_date_time": {"type": "string", "format": "date-time"},
            "number_of_transactions": {"type": "integer"},
            "control_sum": {"type": "number"},
            "initiating_party": {
              "type": "object",
              "properties": {
                "name": {"type": "string"}
              }
            }
          }
        },
        "payment_information": {
          "type": "object",
          "properties": {
            "payment_information_identification": {"type": "string"},
            "payment_method": {"type": "string"},
            "batch_booking": {"type": "boolean"},
            "direct_debit_transaction_information": {
              "type": "object",
              "properties": {
                "payment_identification": {
                  "type": "object",
                  "properties": {
                    "end_to_end_identification": {"type": "string"}
                  }
                },
                "instructed_amount": {
                  "type": "object",
                  "properties": {
                    "value": {"type": "number"},
                    "currency": {"type": "string"}
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
```

### Plan Setup

Create a file depending on which interface you want to use.

- Java: `src/main/java/io/github/datacatering/plan/MyJSONSchemaJavaPlan.java`
- Scala: `src/main/scala/io/github/datacatering/plan/MyJSONSchemaPlan.scala`
- YAML: `docker/data/custom/plan/my-json-schema.yaml`

=== "Java"

    ```java
    import io.github.datacatering.datacaterer.java.api.PlanRun;
    
    public class MyJSONSchemaJavaPlan extends PlanRun {
        {
            var conf = configuration().enableGeneratePlanAndTasks(true)
                .generatedReportsFolderPath("/opt/app/data/report");
        }
    }
    ```

=== "Scala"

    ```scala
    import io.github.datacatering.datacaterer.api.PlanRun
    
    class MyJSONSchemaPlan extends PlanRun {
      val conf = configuration.enableGeneratePlanAndTasks(true)
        .generatedReportsFolderPath("/opt/app/data/report")
    }
    ```

=== "YAML"

    In `docker/data/custom/plan/my-json-schema.yaml`:
    ```yaml
    name: "my_json_schema_plan"
    description: "Create JSON data via JSON Schema metadata"
    tasks:
      - name: "json_schema_task"
        dataSourceName: "my_json_schema"
    ```

    In `docker/data/custom/application.conf`:
    ```
    flags {
      enableGeneratePlanAndTasks = true
      enableUniqueCheck = true
    }
    folders {
      generatedReportsFolderPath = "/opt/app/data/report"
    }
    ```

=== "UI"

    1. Click on `Advanced Configuration` towards the bottom of the screen
    1. Click on `Flag` and click on `Generate Plan And Tasks`
    1. Click on `Flag` and click on `Unique Check`
    1. Click on `Folder` and enter `/tmp/data-caterer/report` for `Generated Reports Folder Path`

We will enable generate plan and tasks so that we can read from external sources for metadata and save the reports under a folder we can easily access.

#### Connection Configuration

Within our class, we can start by defining the connection properties to read/write from/to JSON and specify the JSON Schema metadata source.

=== "Java"

    ```java
    var jsonSchemaTask = json(
        "my_json_schema",                           //name
        "/opt/app/data/json-schema-output",         //path
        Map.of("saveMode", "overwrite")             //additional options
    );
    ```

=== "Scala"

    ```scala
    val jsonSchemaTask = json(
      "my_json_schema",                           //name         
      "/opt/app/data/json-schema-output",         //path
      Map("saveMode" -> "overwrite")              //additional options
    )
    ```

=== "YAML"

    In `docker/data/custom/application.conf`:
    ```
    json {
        my_json_schema {
            "saveMode": "overwrite"
        }
    }
    ```

=== "UI"

    1. Click on `Connection` towards the top of the screen
    1. For connection name, set to `my_json_schema`
    1. Click on `Select data source type..` and select `JSON`
    1. Set `Path` as `/tmp/custom/json-schema/output`
    1. Click on `Create`

#### Schema

We can point the schema of a data source to our JSON Schema file. The metadata source will automatically parse the JSON Schema and generate appropriate field definitions.

=== "Java"

    ```java
    var jsonSchemaTask = json("my_json_schema", "/opt/app/data/json-schema-output", Map.of("saveMode", "overwrite"))
            .fields(metadataSource().jsonSchema("/opt/app/mount/json-schema/payment-schema.json"))
            .count(count().records(10));
    ```

=== "Scala"

    ```scala
    val jsonSchemaTask = json("my_json_schema", "/opt/app/data/json-schema-output", Map("saveMode" -> "overwrite"))
      .fields(metadataSource.jsonSchema("/opt/app/mount/json-schema/payment-schema.json"))
      .count(count.records(10))
    ```

=== "YAML"

    In `docker/data/custom/task/file/json/json-schema-task.yaml`:
    ```yaml
    name: "json_schema_task"
    steps:
      - name: "json_data"
        type: "json"
        options:
          path: "/opt/app/data/json-schema-output"
          saveMode: "overwrite"
          metadataSourceType: "jsonSchema"
          jsonSchemaFile: "/opt/app/mount/json-schema/payment-schema.json"
        count:
          records: 10
    ```

=== "UI"

    1. Click on `Connection` tab at the top
    1. Select `JSON Schema` as the data source and enter `my-json-schema-metadata`
    1. Create your JSON Schema file at `/tmp/json-schema/payment-schema.json`
    1. Enter `/tmp/json-schema/payment-schema.json` as the `Schema File`
    1. Click on `Generation` and select the metadata source connection

#### Field Filtering Options

JSON Schema metadata source supports powerful field filtering capabilities to control which fields are included or excluded from data generation:

=== "Java"

    ```java
    var jsonSchemaTask = json("my_json_schema", "/opt/app/data/json-schema-output", Map.of("saveMode", "overwrite"))
            .fields(metadataSource().jsonSchema("/opt/app/mount/json-schema/payment-schema.json"))
            // Include specific fields only
            .includeFields(List.of(
                "customer_direct_debit_initiation_v11.group_header.message_identification",
                "customer_direct_debit_initiation_v11.group_header.creation_date_time",
                "customer_direct_debit_initiation_v11.payment_information.payment_information_identification",
                "customer_direct_debit_initiation_v11.payment_information.direct_debit_transaction_information.instructed_amount.value"
            ))
            // Or exclude specific fields
            // .excludeFields(List.of(
            //     "customer_direct_debit_initiation_v11.group_header.control_sum",
            //     "customer_direct_debit_initiation_v11.payment_information.batch_booking"
            // ))
            // Or include fields matching patterns
            // .includeFieldPatterns(List.of(".*amount.*", ".*identification.*"))
            // Or exclude fields matching patterns  
            // .excludeFieldPatterns(List.of(".*internal.*", ".*debug.*"))
            .count(count().records(10));
    ```

=== "Scala"

    ```scala
    val jsonSchemaTask = json("my_json_schema", "/opt/app/data/json-schema-output", Map("saveMode" -> "overwrite"))
      .fields(metadataSource.jsonSchema("/opt/app/mount/json-schema/payment-schema.json"))
      // Include specific fields only
      .includeFields(
        "customer_direct_debit_initiation_v11.group_header.message_identification",
        "customer_direct_debit_initiation_v11.group_header.creation_date_time",
        "customer_direct_debit_initiation_v11.payment_information.payment_information_identification",
        "customer_direct_debit_initiation_v11.payment_information.direct_debit_transaction_information.instructed_amount.value"
      )
      // Or exclude specific fields
      // .excludeFields(
      //   "customer_direct_debit_initiation_v11.group_header.control_sum",
      //   "customer_direct_debit_initiation_v11.payment_information.batch_booking"
      // )
      // Or include fields matching patterns
      // .includeFieldPatterns(".*amount.*", ".*identification.*")
      // Or exclude fields matching patterns  
      // .excludeFieldPatterns(".*internal.*", ".*debug.*")
      .count(count.records(10))
    ```

=== "YAML"

    In `docker/data/custom/task/file/json/json-schema-task.yaml`:
    ```yaml
    name: "json_schema_task"
    steps:
      - name: "json_data"
        type: "json"
        options:
          path: "/opt/app/data/json-schema-output"
          saveMode: "overwrite"
          metadataSourceType: "jsonSchema"
          jsonSchemaFile: "/opt/app/mount/json-schema/payment-schema.json"
          # Include specific fields only
          includeFields:
            - "customer_direct_debit_initiation_v11.group_header.message_identification"
            - "customer_direct_debit_initiation_v11.group_header.creation_date_time"
            - "customer_direct_debit_initiation_v11.payment_information.payment_information_identification"
          # Or exclude specific fields
          # excludeFields:
          #   - "customer_direct_debit_initiation_v11.group_header.control_sum"
          #   - "customer_direct_debit_initiation_v11.payment_information.batch_booking"
          # Or include fields matching patterns
          # includeFieldPatterns:
          #   - ".*amount.*"
          #   - ".*identification.*"
          # Or exclude fields matching patterns
          # excludeFieldPatterns:
          #   - ".*internal.*"
          #   - ".*debug.*"
        count:
          records: 10
    ```

=== "UI"

    1. In the connection configuration, expand `Advanced Options`
    1. Add `Include Fields` and enter comma-separated field paths
    1. Or add `Exclude Fields` for fields to exclude
    1. Or use `Include Field Patterns` with regex patterns
    1. Or use `Exclude Field Patterns` with regex patterns

The field filtering options provide flexibility to:

- **includeFields**: Only generate data for the specified field paths
- **excludeFields**: Generate data for all fields except the specified ones
- **includeFieldPatterns**: Include fields matching the regex patterns
- **excludeFieldPatterns**: Exclude fields matching the regex patterns

Field paths use dot notation to navigate nested structures (e.g., `parent.child.grandchild`).

#### Additional Configurations

At the end of data generation, a report gets generated that summarises the actions it performed. We can control the output folder of that report via configurations.

=== "Java"

    ```java
    var config = configuration()
            .generatedReportsFolderPath("/opt/app/data/report")
            .enableGeneratePlanAndTasks(true)
            .enableUniqueCheck(true);

    execute(config, jsonSchemaTask);
    ```

=== "Scala"

    ```scala
    val config = configuration
      .generatedReportsFolderPath("/opt/app/data/report")
      .enableGeneratePlanAndTasks(true)
      .enableUniqueCheck(true)

    execute(config, jsonSchemaTask)
    ```

=== "YAML"

    In `docker/data/custom/application.conf`:
    ```
    flags {
      enableGeneratePlanAndTasks = true
      enableUniqueCheck = true
    }
    folders {
      generatedReportsFolderPath = "/opt/app/data/report"
    }
    ```

=== "UI"

    1. Click on `Advanced Configuration` towards the bottom of the screen
    1. Click on `Flag` and click on `Generate Plan And Tasks`
    1. Click on `Flag` and click on `Unique Check`
    1. Click on `Folder` and enter `/tmp/data-caterer/report` for `Generated Reports Folder Path`

### Run

Now we can run via the script `./run.sh` that is in the top level directory of the `data-caterer-example` to run the class we just created.

=== "Java"

    ```shell
    ./run.sh MyJSONSchemaJavaPlan
    head docker/sample/json-schema-output/part-00000-*
    ```

=== "Scala"

    ```shell
    ./run.sh MyJSONSchemaPlan
    head docker/sample/json-schema-output/part-00000-*
    ```

=== "YAML"

    ```shell
    ./run.sh my-json-schema.yaml
    head docker/sample/json-schema-output/part-00000-*
    ```

=== "UI"

    1. Click the button `Execute` at the top
    1. Progress updates will show in the bottom right corner
    1. Click on `History` at the top
    1. Check for your plan name and see the result summary
    1. Click on `Report` on the right side to see more details of what was executed

It should look something like this.

```json
{
    "customer_direct_debit_initiation_v11": {
        "group_header": {
            "message_identification": "MSG001",
            "creation_date_time": "2024-03-15T10:30:45Z",
            "number_of_transactions": 1,
            "control_sum": 100.50,
            "initiating_party": {
                "name": "ACME Corp"
            }
        },
        "payment_information": {
            "payment_information_identification": "PMT001",
            "payment_method": "DD",
            "batch_booking": true,
            "direct_debit_transaction_information": {
                "payment_identification": {
                    "end_to_end_identification": "TXN001"
                },
                "instructed_amount": {
                    "value": 100.50,
                    "currency": "EUR"
                }
            }
        }
    }
}
```

Congratulations! You have now made a data generator that uses JSON Schema as a metadata source to generate realistic test data following your schema specifications.

### Complex Schema Support

JSON Schema metadata source supports various JSON Schema features:

#### Data Types

- **String**: Generates random strings with optional length constraints
- **Number/Integer**: Generates numeric values within specified ranges
- **Boolean**: Generates true/false values
- **Array**: Generates arrays with configurable item types and sizes
- **Object**: Generates nested objects with all defined properties

#### Constraints

- **enum**: Selects from predefined values
- **pattern**: Generates strings matching regex patterns
- **minimum/maximum**: Numeric range constraints
- **minLength/maxLength**: String length constraints
- **format**: Built-in formats like date-time, email, uri, etc.

#### Nested Structures
Complex nested objects and arrays are fully supported, allowing you to generate data that matches sophisticated JSON Schema definitions.

### Validation

If you want to validate data against a JSON Schema, you can use the generated data with validation frameworks or tools that support JSON Schema validation.

The JSON Schema metadata source in Data Caterer focuses on data generation based on the schema structure, ensuring that the generated data conforms to the defined schema constraints and types.

