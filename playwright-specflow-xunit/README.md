# Testing Playwright Parallel with XUnit and SpecFlow in C# on LambdaTest

## Setup

* Clone the repo and run `cd SpecFlowPlaywrightXunit`
* Set env variable `LT_USERNAME={your_lt_username}` and `LT_ACCESS_KEY={your_lt_key}`
* Run `dotnet build`

## Running your tests
* Run `dotnet test`

## Testing frameworks and libraries
* SpecFlow is used as a BDD framework and XUnit is used for test runner.
* Dotnet 6.0 is configured but different versions of .Net can be used

## Notes
* There are 2 different feature files and each feature files includes 2 test cases, for chrome and microsoft edge.
* When the tests are run with command `dotnet test` XUnit runner default behaviour is to run the different features parallel but it runs the scenarios in the same feature sequentially.
* If you would like to disable parallel execution, you can set `[assembly: CollectionBehavior(DisableTestParallelization = true)]` or it can also be configurable in the `xunit.runner.json` file.
* Parallel execution maximum count can be configurable from `xunit.runner.json` with variable maxParallelThreads.
* XUnit does not support parallel execution in the same feature. Here is the documentation https://docs.specflow.org/projects/specflow/en/latest/Execution/Parallel-Execution.html
* For running scenarios parallel, it seems only supported runner for .net is SpecFlow+
