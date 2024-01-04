---
description: "Define data validations based on validations defined in external sources"
---

# External Source Validations

Use validations that are defined in external sources such as Great Expectations or OpenMetadata. This allows you to
generate data for your upstream data sources and validate your pipelines based on the same rules that would be applied 
in production.

![Example flow with validations from external source](../../diagrams/high_level_flow-external-source-validation.svg)

!!! example "Info"

    Retrieving data validations from an external source is a paid feature. Try the free trial [here](../../get-started/docker.md).

## Supported Sources

| Source                                                                                            | Support                                   |
|---------------------------------------------------------------------------------------------------|-------------------------------------------|
| [OpenMetadata](https://docs.open-metadata.org/v1.2.x/connectors/ingestion/workflows/data-quality) | :white_check_mark:                        |
| [Great Expectations](https://greatexpectations.io/)                                               | :white_check_mark:                        |
| [DBT Constraints](https://docs.getdbt.com/reference/resource-properties/constraints)              | :octicons-x-circle-fill-12:{ .red-cross } |
| [SodaCL](https://docs.soda.io/soda-cl/soda-cl-overview.html)                                      | :octicons-x-circle-fill-12:{ .red-cross } |
| [MonteCarlo](https://docs.getmontecarlo.com/docs/monitors-as-code)                                | :octicons-x-circle-fill-12:{ .red-cross } |

## OpenMetadata

Use data quality rules defined from OpenMetadata to execute over dataset.

=== "Java"

    ```java
    var jsonTask = json("my_json", "/opt/app/data/json")
        .validations(metadataSource().openMetadata(
            "http://host.docker.internal:8585/api",
            Constants.OPEN_METADATA_AUTH_TYPE_OPEN_METADATA(),
            Map.of(
                    Constants.OPEN_METADATA_JWT_TOKEN(), "abc123",
                    Constants.OPEN_METADATA_TABLE_FQN(), "sample_data.ecommerce_db.shopify.raw_customer"
            )
        ));

    var conf = configuration().enableGenerateValidations(true);
    ```

=== "Scala"

    ```scala
    val jsonTask = json("my_json", "/opt/app/data/json")
      .validations(metadataSource.openMetadata(
        "http://host.docker.internal:8585/api",
        OPEN_METADATA_AUTH_TYPE_OPEN_METADATA,
        Map(
          OPEN_METADATA_JWT_TOKEN -> "abc123", //find under settings/bots/ingestion-bot/token
          OPEN_METADATA_TABLE_FQN -> "sample_data.ecommerce_db.shopify.raw_customer"
        )
      ))

    val conf = configuration.enableGenerateValidations(true)
    ```

## Great Expectations

Use data quality rules defined from OpenMetadata to execute over dataset.

=== "Java"

    ```java
    var jsonTask = json("my_json", "/opt/app/data/json")
        .validations(metadataSource().greatExpectations("great-expectations/taxi-expectations.json");

    var conf = configuration().enableGenerateValidations(true);
    ```

=== "Scala"

    ```scala
    val jsonTask = json("my_json", "/opt/app/data/json")
      .validations(metadataSource.greatExpectations("great-expectations/taxi-expectations.json")

    val conf = configuration.enableGenerateValidations(true)
    ```
