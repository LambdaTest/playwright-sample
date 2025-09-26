Feature: Data Driven Testing with Playwright BDD

  Background: Navigate to LambdaTest ECommerce Playground HomePage
      Given I navigate to LambdaTest ECommerce Playground HomePage

  Scenario Outline: Search for <product> and validate results
    When I search for "<product>"
    Then I should see search results for "<product>"
    Then The page url should contain "<product>"

  Examples:
    | product        |
    | macbook air    |
    | Samsung galaxy tab     |     
    | palm           |