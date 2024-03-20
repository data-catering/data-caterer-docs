---
title: "Quick start"
description: "Quick start for Data Catering data generation and testing tool that can automatically discover, generate and validate for files, databases, HTTP APIs and messaging systems."
image: "https://data.catering/diagrams/logo/data_catering_logo.svg"
---

# Run Data Caterer

## Quick start

1. [Mac download](https://nightly.link/data-catering/data-caterer/workflows/build/main/data-caterer-mac.zip)
2. [Windows download](https://nightly.link/data-catering/data-caterer/workflows/build/main/data-caterer-windows.zip)
3. Docker
   ```shell
   docker run -d -i -p 9898:9898 -e DEPLOY_MODE=standalone --name datacaterer datacatering/data-caterer:0.7.0
   ```
   [Open localhost:9898](http://localhost:9898).

### Run Scala/Java examples

```shell
git clone git@github.com:data-catering/data-caterer-example.git
cd data-caterer-example && ./run.sh
#check results under docker/sample/report/index.html folder
```

### Report

Check the report generated under `docker/data/custom/report/index.html`.

Sample report can also be seen [**here**](../sample/report/html/index.html)

## Paid Version Trial

30 day trial of the paid version can be accessed via these steps:

1. Join the [Slack Data Catering Slack group here](https://join.slack.com/t/data-catering/shared_invite/zt-2664ylbpi-w3n7lWAO~PHeOG9Ujpm~~w)
2. Get an API_KEY by using slash command `/token` in the Slack group (will only be visible to you)
3. 
        git clone git@github.com:data-catering/data-caterer-example.git
        cd data-caterer-example && export DATA_CATERING_API_KEY=<insert api key>
        ./run.sh

If you want to check how long your trial has left, you can check back in the Slack group or type `/token` again.

## Guided tour

Check out the starter guide [**here**](../setup/guide/scenario/first-data-generation.md) that will take your through
step by step. You can also check the other guides [**here**](../setup/guide/index.md) to see the other possibilities of
what Data Caterer can achieve for you.
