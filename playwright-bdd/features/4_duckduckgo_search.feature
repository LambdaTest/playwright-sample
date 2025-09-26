Feature: DuckDuckGo Search

  Scenario: Search for LambdaTest on DuckDuckGo
    Given I open the DuckDuckGo homepage
    Then Look out for "LambdaTest"
    Then I should see results related to "LambdaTest"