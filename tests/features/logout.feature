@smoke
Feature: Logout Functionality

  @logout
  Scenario: Un usuario registrado se deslogea de forma exitosa
    Given a user at the applications start screen
    And the user enters the prefix and the phone number
      | number | 701111112 |
    And confirms the verification code
      | code | 123456 |
    And the user accepts the application permissions
    And the user should be successfully logged into the application
    When the user attempts to log out of their account
    Then the user is successfully logged out
