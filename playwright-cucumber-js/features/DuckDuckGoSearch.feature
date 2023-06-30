Feature: DuckDuckGo Search

  Scenario: Search results should match
    Given Open DuckDuckGo Website
    When Search for LambdaTest
    Then Title should match

