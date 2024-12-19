---
title: "Automated test data management tool"
description: "An open-source automated test data management tool that can automatically discover, generate and validate for
files, databases, HTTP APIs and messaging systems. Synthetically generate production-like data, verify via data quality rules
and delete data after finishing."
image: "https://data.catering/diagrams/logo/data_catering_logo.svg"
---

<h1 align="center" style="padding-top: 25px;"><b>Automated Test Data Management</b></h1>
<h3 align="center" style="padding-bottom: 25px">Create simple managed flows for testing your jobs or applications</h3>

<picture class="center-content">
<source media="(min-width: 650px)" srcset="diagrams/index/high_level_flow-run-config-basic-flow-basic-flow.svg">
<img src="diagrams/index/high_level_flow-run-config-basic-flow-basic-flow-vertical.svg"
alt="Data Caterer generate, validate and clean data testing flow">
</picture>

## Why use Data Caterer

- **Catch bugs before production**: Bring stability to your data pipelines
- **Speed up your development cycles**: Fast feedback during testing
- **Single tool for all data sources**: No custom scripts needed
- **No production data or connection required**: Secure first approach, fully metadata driven
- **Easy to use for testers and developers**: Use either UI, Java, Scala or YAML
- **Simulate complex data flows**: Maintain relationships across data sources

## Main features

- :material-connection: [Connect to any data source](docs/connection.md)
- :material-auto-fix: [Auto generate production-like data from data connections or metadata sources](docs/guide/scenario/auto-generate-connection.md)
- :material-relation-many-to-one: [Relationships across data sources](docs/generator/foreign-key.md)
- :material-test-tube: [Validate based on data generated](docs/validation.md)
- :material-delete-sweep: [Clean up generated and downstream data](docs/delete-data.md)

<span class="center-content">
[Try now](get-started/quick-start.md){ .md-button .md-button--primary .button-spaced }
[Demo](sample/ui/index.html){ .md-button .md-button--primary .button-spaced }
</span>

## What it is

<div class="grid cards" markdown>

-   :material-tools: __Test data management tool__

    ---

    Generate synthetic production-like data to be consumed and validated. Clean up the data after using to keep your 
    environments clean.

-   :material-connection: __Designed for any data source__

    ---

    We aim to support pushing data to any data source, in any format, batch or real-time.

-   :material-code-tags-check: __Low/no code solution__

    ---

    Use the tool via either UI, Java, Scala or YAML.

-   :material-run-fast: __Developer productivity tool__

    ---

    If you are a new developer or seasoned veteran, cut down on your feedback loop when developing with data.

</div>

## What it is not

<div class="grid cards" markdown>

-   :material-brain: __Metadata storage/platform__

    ---

    You could store and use metadata within the data generation/validation tasks but is not the recommended approach.
    Rather, this metadata should be gathered from existing services who handle metadata on behalf of Data Caterer.

-   :fontawesome-solid-handshake: __Data contract__

    ---

    The focus of Data Caterer is on the data generation and testing, which can include details about how the data looks
    like and how it behaves. But it does not encompass all the additional metadata that comes with a data contract such
    as SLAs, security, etc.

</div>

## Who can use it

| Type      | Interface                                              | User                                 |
|-----------|--------------------------------------------------------|--------------------------------------|
| No Code   | [UI](get-started/quick-start.md#windows)               | QA, Testers, Data Scientist, Analyst |
| Low Code  | [YAML](get-started/quick-start.md#yaml)                | DevOps, Kubernetes Fans              |
| High Code | [Java/Scala](get-started/quick-start.md#javascala-api) | Software Developers, Data Engineers  |

<span class="center-content">
[Try now](get-started/quick-start.md){ .md-button .md-button--primary .button-spaced }
[Demo](sample/ui/index.html){ .md-button .md-button--primary .button-spaced }
</span>
