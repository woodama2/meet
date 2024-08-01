Feature: Specify number of events
  Scenario: When user hasn’t specified a number, 32 events are shown by default.
    Given the user is on the events page
    And the user has not specified a number of events to display
    When the events are displayed
    Then 32 events should be shown by default.

  Scenario: User can change the number of events displayed.
    Given the user is on the events page
    When the user specifies a number of events to display
    Then the events list should update to show the specified number of events.
