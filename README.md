# Angular Demo App, Data Layer with Ensighten Events
## Proof of Concept

* [AngularJS](https://angularjs.org)
* [Data Layer](https://www.w3.org/2013/12/ceddl-201312.pdf)
* [Ensighten](https://www.ensighten.com/products/tag-management/manage/)

Built with [Spring Boot](https://projects.spring.io/spring-boot/).

#### To build:
1. Update Bootstrap.js in src/main/templates/index.html with your account and space.
2. Execute gradle command `gradle bootRun` from repository root.
3. Open your web browser, navigate to [localhost:8080](http://localhost:8080/), open your web browser console, and interact with the app. Messages confirming interaction events will print to the web browser console.