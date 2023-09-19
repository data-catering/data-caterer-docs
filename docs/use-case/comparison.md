# Comparison to similar tools

| Tool                                                                                                            | Description                                                                              | Features                                                                                                                                                                               | Pros                                                                                                          | Cons                                                                                                                        |
|-----------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------|
| [DBLDatagen](https://github.com/databrickslabs/dbldatagen)                                                      | Python based data generation tool                                                        | - Scalable and predictable data generation across data scenarios<br>- Plugin third-party libraries<br>- Generate from existing data<br>- Generate based on combination of other fields | - Open source<br>- Good documentation<br>- Customisable and scalable<br>- Generate from existing data/schemas | - Limited support if issues<br>- Code required<br>- No clean up<br>- No validation                                          |
| [DataCebo Synthetic Data Vault](https://docs.sdv.dev/sdv/)                                                      | Python based data generation tool with focus on ML generation, evaluating generated data | - Create synthetic data using machine learning<br>- Evaluate and visualize synthetic data<br>- Preprocess, anonymize and define constraints                                            |                                                                                                               |                                                                                                                             |
| [Tonic](https://www.tonic.ai/)                                                                                  | Platform solution for generating data                                                    | - Integration with many data sources<br>- UI with RBAC<br>- Quality and security checks<br>- Auditing and alerting<br>- Dashboards and reporting                                       |                                                                                                               |                                                                                                                             |
| [Datafaker](https://www.datafaker.net/documentation/getting-started/)                                           | Realistic data generation library                                                        | - Generate realistic data<br>- Push to CSV/JSON format<br>- Create your own data providers<br>- Performant                                                                             | - Simple, easy to use<br>- Extensible<br>- Open source<br>- Realistic values                                  | - Have to code for and manage data source connections<br>- No data clean up<br>- No validation<br>- No foreign keys support |
| [Gatling](https://gatling.io/)                                                                                  | HTTP API load testing tool                                                               | - Load testing<br>- Validating data and responses<br>- Scenario testing<br>- Reporting<br>- Extensive API support<br>- Integration with CI/CD tools                                    | - Widely used<br>- Clear documentation<br>- Extensive testing/validation support<br>- Customisable scenarios  | - Only supports HTTP, JMS and JDBC<br>- No data clean up<br>- Data feeders not based off metadata                           |
| [Tricentis - Data integrity](https://www.tricentis.com/products/data-integrity)                                 | Testing tool that focuses on data integrity                                              | - Data testing<br>- Pre-screening data<br>- Reconciliation, profiling and report testing<br>- Support SQL DB, noSQL DB, files, API                                                     |                                                                                                               |                                                                                                                             |
| [Broadcom - Test data manager](https://www.broadcom.com/products/software/continuous-testing/test-data-manager) | Test data provisioning tool with PII detection and reusable datasets                     | - Identify sensitive data<br>- Generate synthetic data<br>- Store and reuse existing data<br>- Create virtual copies of data                                                           |                                                                                                               |                                                                                                                             |