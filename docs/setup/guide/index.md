---
title: "Guides"
description: "Guides to create Data Catering jobs. Generate batch and/or event data, validate data, read metadata or any other scenario."
image: "https://data.catering/diagrams/logo/data_catering_logo.svg"
---

# Guides

Below are a list of guides you can follow to create your first Data Catering job for your use case.

## Data Sources

### Databases

<div class="grid cards" markdown>

- __[Cassandra]__ - Generate/validate data for Cassandra
- __[MySQL (Soon to document)]__ - Generate/validate data for MySQL
- __[Postgres (Soon to document)]__ - Generate/validate data for Postgres

</div>
  
  [Cassandra]: data-source/database/cassandra.md
  [MySQL (Soon to document)]: data-source/database/cassandra.md
  [Postgres (Soon to document)]: data-source/database/cassandra.md

### Files

<div class="grid cards" markdown>

- __[CSV]__ - Generate/validate data for CSV
- __[Delta Lake]__ - Generate/validate data for Delta Lake
- __[Iceberg]__ - Generate/validate data for Iceberg tables
- __[JSON]__ - Generate/validate data for JSON
- __[ORC]__ - Generate/validate data for ORC
- __[Parquet]__ - Generate/validate data for Parquet

</div>

  [CSV]: data-source/file/csv.md
  [Delta Lake]: data-source/file/delta-lake.md
  [Iceberg]: data-source/file/iceberg.md
  [JSON]: data-source/file/json.md
  [ORC]: data-source/file/orc.md
  [Parquet]: data-source/file/parquet.md

### HTTP

<div class="grid cards" markdown>

- __[REST API]__ - Generate data for REST APIs

</div>

  [REST API]: data-source/http/http.md

### Messaging

<div class="grid cards" markdown>

- __[Kafka]__ - Generate data for Kafka topics
- __[Solace]__ - Generate data for Solace messages

</div>

  [Kafka]: data-source/messaging/kafka.md
  [Solace]: data-source/messaging/solace.md

### Metadata

<div class="grid cards" markdown>

- __[Great Expectations]__ - Use validations from Great Expectations for testing
- __[Marquez]__ - Generate data based on metadata in Marquez
- __[OpenMetadata]__ - Generate data based on metadata in OpenMetadata

</div>

  [Great Expectations]: data-source/metadata/great-expectations.md
  [Marquez]: data-source/metadata/marquez.md
  [OpenMetadata]: data-source/metadata/open-metadata.md


## Scenarios

<div class="grid cards" markdown>

- __[First Data Generation]__ - If you are new, this is the place to start
- __[Multiple Records Per Column Value]__ - How you can generate multiple records per set of columns
- __[Foreign Keys Across Data Sources]__ - Generate matching values across generated data sets
- __[Data Validations]__ - Run data validations after generating data
- __[Auto Generate From Data Connection]__ - Automatically generating data from just defining data sources
- __[Delete Generated Data]__ - Delete the generated data whilst leaving other data
- __[Generate Batch and Event Data]__ - Generate matching batch and event data

</div>

  [First Data Generation]: scenario/first-data-generation.md
  [Multiple Records Per Column Value]: scenario/records-per-column.md
  [Foreign Keys Across Data Sources]: scenario/batch-and-event.md
  [Data Validations]: scenario/data-validation.md
  [Auto Generate From Data Connection]: scenario/auto-generate-connection.md
  [Delete Generated Data]: scenario/delete-generated-data.md
  [Generate Batch and Event Data]: scenario/batch-and-event.md

## YAML Files

### Base Concept

The execution of the data generator is based on the concept of plans and tasks. A plan represent the set of tasks that
need to be executed,
along with other information that spans across tasks, such as foreign keys between data sources.  
A task represent the component(s) of a data source and its associated metadata so that it understands what the data
should look like
and how many steps (sub data sources) there are (i.e. tables in a database, topics in Kafka). Tasks can define one or
more steps.

### Plan

#### Foreign Keys

[Define foreign keys across data sources in your plan to ensure generated data can match](https://github.com/data-catering/data-caterer-example/blob/main/docker/data/custom/plan/foreign-key-example.yaml)  
[Link to associated task 1](https://github.com/data-catering/data-caterer-example/blob/main/docker/data/custom/task/file/json/json-account-task.yaml)  
[Link to associated task 2](https://github.com/data-catering/data-caterer-example/blob/main/docker/data/custom/task/jdbc/postgres/postgres-account-task.yaml)

### Task

| Data Source Type | Data Source | Sample Task                                                                                                                                  | Notes                                                             |
|------------------|-------------|----------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------|
| Database         | Postgres    | [Sample](https://github.com/data-catering/data-caterer-example/blob/main/docker/data/custom/task/jdbc/postgres/postgres-account-task.yaml)   |                                                                   |
| Database         | MySQL       | [Sample](https://github.com/data-catering/data-caterer-example/blob/main/docker/data/custom/task/jdbc/mysql/mysql-account-task.yaml)         |                                                                   |
| Database         | Cassandra   | [Sample](https://github.com/data-catering/data-caterer-example/blob/main/docker/data/custom/task/cassandra/cassandra-customer-task.yaml)     |                                                                   |
| File             | CSV         | [Sample](https://github.com/data-catering/data-caterer-example/blob/main/docker/data/custom/task/file/csv/csv-transaction-task.yaml)         |                                                                   |
| File             | JSON        | [Sample](https://github.com/data-catering/data-caterer-example/blob/main/docker/data/custom/task/file/json/json-account-task.yaml)           | Contains nested schemas and use of SQL for generated values       |
| File             | Parquet     | [Sample](https://github.com/data-catering/data-caterer-example/blob/main/docker/data/custom/task/file/parquet/parquet-transaction-task.yaml) | Partition by year column                                          |
| Messaging System | Kafka       | [Sample](https://github.com/data-catering/data-caterer-example/blob/main/docker/data/custom/task/kafka/kafka-account-task.yaml)              | Specific base schema to be used, define headers, key, value, etc. |
| Messaging System | Solace      | [Sample](https://github.com/data-catering/data-caterer-example/blob/main/docker/data/custom/task/jms/solace/jms-account-task.yaml)           | JSON formatted message                                            |
| HTTP             | PUT         | [Sample](https://github.com/data-catering/data-caterer-example/blob/main/docker/data/custom/task/http/http-account-task.yaml)                | JSON formatted PUT body                                           |

### Configuration

[Basic configuration](https://github.com/data-catering/data-caterer-example/blob/main/docker/data/custom/application.conf)

## Docker-compose

To see how it runs against different data sources, you can run using `docker-compose` and set `DATA_SOURCE` like below

```shell
./gradlew build
cd docker
DATA_SOURCE=postgres docker-compose up -d datacaterer
```

Can set it to one of the following:

- postgres
- mysql
- cassandra
- solace
- kafka
- http
