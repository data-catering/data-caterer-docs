---
title: "Quick start"
description: "Quick start for Data Catering data generation and testing tool that can automatically discover, generate and validate for files, databases, HTTP APIs and messaging systems."
image: "https://data.catering/diagrams/logo/data_catering_logo.svg"
---

# Run Data Caterer

## Quick start

1. [Mac download](https://nightly.link/data-catering/data-caterer/workflows/build/main/data-caterer-mac.zip)
2. [Windows download](https://nightly.link/data-catering/data-caterer/workflows/build/main/data-caterer-windows.zip)
    1. After downloaded, go to 'Downloads' folder and 'Extract All' from data-caterer-windows
    2. Double-click 'DataCaterer-1.0.0' to install Data Caterer
    3. Click on 'More info' then at the bottom, click 'Run anyway'
    4. Go to '/Program Files/DataCaterer' folder and run DataCaterer application
    5. If your browser doesn't open, go to [http://localhost:9898](http://localhost:9898) in your preferred browser
3. [Linux download](https://nightly.link/data-catering/data-caterer/workflows/build/main/data-caterer-linux.zip)
4. Docker
   ```shell
   docker run -d -i -p 9898:9898 -e DEPLOY_MODE=standalone --name datacaterer datacatering/data-caterer-basic:0.9.2
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

## Guided tour

Check out the starter guide [**here**](../setup/guide/scenario/first-data-generation.md) that will take your through
step by step. You can also check the other guides [**here**](../setup/guide/index.md) to see the other possibilities of
what Data Caterer can achieve for you.
