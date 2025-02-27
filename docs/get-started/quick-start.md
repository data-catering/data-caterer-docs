---
title: "Quick start"
description: "Quick start for Data Catering data generation and testing tool that can automatically discover, generate and validate for files, databases, HTTP APIs and messaging systems."
image: "https://data.catering/diagrams/logo/data_catering_logo.svg"
---

# Run Data Caterer

## Get Token

To run a trial of Data Caterer, you will need a username and token. Get one by following the below instructions.

1. Join the Data Catering [Slack](https://join.slack.com/t/data-catering/shared_invite/zt-2664ylbpi-w3n7lWAO~PHeOG9Ujpm~~w)
2. In any channel, type `/token` (the message will only be seen by you)
3. Take note of your given `user-id` and `token` values (your token value will not be shown again as it is not stored anywhere)

## Quick start

<div class="grid cards" markdown>

-   :material-language-java: :simple-scala: __[Java/Scala]__

    ---

    Instructions for using Java/Scala API via Docker

-   :simple-yaml: __[YAML]__

    ---

    Instructions for using YAML via Docker

-   :material-docker: __[UI App - Docker]__

    ---

    Instructions for Docker download

-   :material-apple: __[UI App - Mac]__

    ---

    Instructions for Mac download

-   :material-microsoft-windows: __[UI App - Windows]__

    ---

    Instructions for Windows download

-   :material-linux: __[UI App - Linux]__

    ---

    Instructions for Linux download

</div>

  [Java/Scala]: #javascala-api
  [YAML]: #yaml
  [UI App - Docker]: #docker
  [UI App - Mac]: #mac
  [UI App - Linux]: #linux
  [UI App - Windows]: #windows

### Java/Scala API

```shell
git clone git@github.com:data-catering/data-caterer-example.git
cd data-caterer-example && ./run.sh
#check results under docker/sample/report/index.html folder
```

### YAML

```shell
git clone git@github.com:data-catering/data-caterer-example.git
cd data-caterer-example && ./run.sh
#check results under docker/sample/report/index.html folder
#check example YAML files under:
# - docker/data/custom/plan
# - docker/data/custom/task
# - docker/data/custom/validation
```

### Docker

1. Docker
   ```shell
   docker run -d -i -p 9898:9898 -e DEPLOY_MODE=standalone --name datacaterer datacatering/data-caterer:0.15.2
   ```
2. [Open localhost:9898](http://localhost:9898)
3. Login with the user and token given from [here](#get-token)

### Mac

1. In any Slack channel, type `/download-mac` (the message will only be seen by you) and download from the link provided
2. Drag Data Caterer to your Applications folder adn double-click to run
3. If your browser doesn't open, go to [http://localhost:9898](http://localhost:9898) in your preferred browser
4. Login with the user and token given from [here](#get-token)

### Windows

1. In any Slack channel, type `/download-windows` (the message will only be seen by you) and download from the link provided
2. Click on 'More info' then at the bottom, click 'Run anyway'
3. Go to '/Program Files/DataCaterer' folder and run DataCaterer application
4. If your browser doesn't open, go to [http://localhost:9898](http://localhost:9898) in your preferred browser
5. Login with the user and token given from [here](#get-token)

### Linux

1. In any Slack channel, type `/download-linux` (the message will only be seen by you) and download from the link provided
2. If your browser doesn't open, go to [http://localhost:9898](http://localhost:9898) in your preferred browser
3. Login with the user and token given from [here](#get-token)

#### Report

Check the report generated under `docker/data/custom/report/index.html`.

[**Sample report can also be seen here**](../sample/report/html/index.html).

## Gradual start

If you prefer a step-by-step approach to learning the capabilities of Data Caterer, there are a number of guides that
take you through the various data sources and approaches that can be taken when using the tool.

- [**Check out the starter guide here**](../docs/guide/scenario/first-data-generation.md) that will take your through
step by step
- You can also check the other guides [**here**](../docs/guide/index.md) to see the other possibilities of
what Data Caterer can achieve for you.
