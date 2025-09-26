Feature: Login and purchase product on LambdaTest ECommerce Playground

  Background: Navigate to LambdaTest ECommerce Playground Login Page
      Given I navigate to LambdaTest ECommerce Playground Login Page

  Scenario: Login to LambdaTest ECommerce Playground
      When I enter username "testing123@testing.com"
      When I enter password "Himanshu1!"
      And I click on the login button
      Then the user should be logged into the LambdaTest ECommerce Playground

  Scenario: Add product to the shopping cart
    Then I click on the Shop by Category menu
    Then I navigate to phone & tablets item
    Then I click on the "iPod Nano" product
    Then I add "iPod Nano" product to the cart