Feature: Bing Search

  Scenario: Search results should match
    Given Open Bing Website
    When Search for LambdaTest
    Then Title should match

