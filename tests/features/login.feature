Feature: Login Functionality

@debugLOGIN
Scenario: Successful login with registered user
Given a user at the applications start screen
When the user enters the prefix and the phone number
|prefix| +93    |
|number|701111112|
#And confirms the verification code "xxxxx"
#Then the user is successfully logged into the application





#Scenario: Failed login with incorrect verification code
#Given a user at the application's start screen (verify start screen and click 'get started' button)
#When the user enters the phone number "xxxxxxxx" (enter phone and click 'continue' button)
#And inputs the wrong verification code "xxxxx" (enter code and click 'continue' button)
#Then the user should receive a login error

#Scenario: Failed login with incorrect phone number
#Given a user at the application's start screen
#When the user enters an incorrect phone number "xxxxxxxx"
#And confirms the verification code "xxxxx"
#Then the user should receive a login error


