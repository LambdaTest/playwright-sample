Feature: Search for iPhone on LambdaTest ECommerce Playground

  Background: Navigate to LambdaTest ECommerce Playground
      Given I navigate to LambdaTest ECommerce Playground

  Scenario: Search for iPhone and validate results
      When I enter "iPhone" in the search box
      And I click on the search button
      Then I should see search results related to "iPhone"
      And the page title should contain "iPhone"