Feature: Stage
  As I user
  I want to be able to launch omega
  So that I can play a game

  Scenario: Creating a stage
    Given I have started the game
    When I view the page
    Then I should see the stage element

  Scenario: Creating a stage with dimensions
    Given I have started the game
    When I view the page
    Then I should see the stage element with the correct dimensions
