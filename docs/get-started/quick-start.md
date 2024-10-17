---
title: "Quick start"
description: "Quick start for Data Catering data generation and testing tool that can automatically discover, generate and validate for files, databases, HTTP APIs and messaging systems."
image: "https://data.catering/diagrams/logo/data_catering_logo.svg"
---

# Run Data Caterer

## Quick start

<div class="grid cards" markdown>

-   :material-docker: __[Docker]__

    ---

    Instructions for Docker download

-   :material-language-java: :simple-scala: __[Java/Scala]__

    ---

    Instructions for using Java/Scala API via Docker

-   :simple-yaml: __[YAML]__

    ---

    Instructions for using YAML via Docker

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

  [Docker]: #docker
  [Java/Scala]: #javascala-api
  [YAML]: #yaml
  [UI App - Mac]: #mac
  [UI App - Windows]: #windows
  [UI App - Linux]: #linux

### Docker

1. Docker
   ```shell
   docker run -d -i -p 9898:9898 -e DEPLOY_MODE=standalone --name datacaterer datacatering/data-caterer:0.12.1
   ```
2. [Open localhost:9898](http://localhost:9898)

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
```

### Mac

1. [Mac download](https://nightly.link/data-catering/data-caterer/workflows/build/main/data-caterer-mac.zip)
2. Extract zip file
3. Double-click 'DataCaterer-1.0.0.dmg'
4. Drag Data Caterer into 'Applications' folder
5. Go to 'Applications' folder, right click Data Caterer, click 'Open' and then 'Open Anyway'
6. If your browser doesn't open, go to [http://localhost:9898](http://localhost:9898) in your preferred browser

### Windows

1. [Windows download](https://nightly.link/data-catering/data-caterer/workflows/build/main/data-caterer-windows.zip)
2. After downloaded, go to 'Downloads' folder and 'Extract All' from data-caterer-windows
3. Double-click 'DataCaterer-1.0.0' to install Data Caterer
4. Click on 'More info' then at the bottom, click 'Run anyway'
5. Go to '/Program Files/DataCaterer' folder and run DataCaterer application
6. If your browser doesn't open, go to [http://localhost:9898](http://localhost:9898) in your preferred browser

### Linux

1. [Linux download](https://nightly.link/data-catering/data-caterer/workflows/build/main/data-caterer-linux.zip)
2. If your browser doesn't open, go to [http://localhost:9898](http://localhost:9898) in your preferred browser

#### Report

Check the report generated under `docker/data/custom/report/index.html`.

[**Sample report can also be seen here**](../sample/report/html/index.html).

## Slow start

### Guided tour

[**Check out the starter guide here**](../setup/guide/scenario/first-data-generation.md) that will take your through
step by step. You can also check the other guides [**here**](../setup/guide/index.md) to see the other possibilities of
what Data Caterer can achieve for you.
