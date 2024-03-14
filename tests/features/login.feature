@login @smoke
Feature: Login Functionality

Scenario: Successful login with registered user
Given a user at the applications start screen
When the user enters the prefix and the phone number
|number|701111112|
And confirms the verification code
|code|123456|
Then the user should be successfully logged into the application
And the user sees all expected elements

Scenario: Failed login with incorrect verification code
Given a user at the applications start screen
When the user enters the prefix and the phone number
|number|701111112|
And confirms the verification code
|code|111111|
Then the user should not be able to proceed beyond the login screen

@debugLOGIN
Scenario: Failed login with incorrect prefix and phone number
Given a user at the applications start screen
When the user enters a Austria prefix and a bad phone number
|number|701111111|
Then the user should not be able to proceed beyond the phone screen



