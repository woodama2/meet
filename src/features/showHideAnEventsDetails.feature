Feature: Show/Hide Event Details
  Scenario: An event element is collapsed by default.
    Given the user is on the events page
    When the events are displayed
    Then each event element should be collapsed by default.

  Scenario: User can expand an event to see details.
    Given the user is on the events page
    And the events elements are collapsed by default
    When the user clicks on an event element
    Then the event details should expand to show more information.

  Scenario: User can collapse an event to hide details.
    Given the user has expanded an event to see details
    When the user clicks on the expanded event element
    Then the event details should collapse to hide the information.