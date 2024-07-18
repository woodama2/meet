# meet

## Project Overview
The objective of this project is to build a serverless, progressive web application (PWA) with React using a test-driven development (TDD) technique.  The application uses the Google Calendar API to fetch upcoming events.

## Table of Contents

- [Project Overview](#project-overview)
- [User Stories](#user-stories)
- [Serverless Functions](#serverless-functions)

## User Stories

### Feature 1: As a **user**, I should be able to **filter events by city**, so that **I can see a list of events taking place in that city.**

#### Scenario 1: When user hasn't searched for a city, show upcoming events from all cities.
- **Given** user hasn't searched for any city;
- **When** the user opens the app;
- **Then** the user should see a list of upcoming events.

#### Scenario 2: User should see a list of suggestions when they search for a city.
- **Given** the main page is open;
- **When** user starts typing in the city textbox;
- **Then** the user should receive a list of cities (suggestions) that match what they've typed.

#### Scenario 3: User can select a city from the suggested list.
- **Given** user was typing "Berlin" in the city textbox *AND* the list of suggested cities is showing;
- **When** the user selects a city (e.g., "Berlin, Germany") from the list;
- **Then** their city should be changed to that city (i.e., "Berlin, Germany") *AND* the user should receive a list of upcoming events in that city.

### Feature 2: As a **user**, I should be able to **toggle the visibility of event details**, so that **I can choose to see more information about an event when needed and hide it to keep my view uncluttered when it's not needed.**

#### Scenario 1: An event element is collapsed by default.
- **Given** the user is on the events page;
- **When** the events are displayed;
- **Then** each event element should be collapsed by default.

#### Scenario 2: User can expand an event to see details.
- **Given** the user is on the events page and the event elements are collapsed by default;
- **When** the user clicks on an event element;
- **Then** the event details should expand to show more information.

#### Scenario 3: User can collapse an event to hide details.
- **Given** the user has expanded an event to see details;
- **When** the user clicks on the expanded event element;
- **Then** the event details should collapse to hide the information.

### Feature 3: As a **user**, I should be able to **specify the number of events I want to see at a time**, so that **I can control the amount of information I view and avoid being overwhelmed.**

#### Scenario 1: When user hasn't specified a number, 32 events are shown by default.
- **Given** the user is on the events page and the user has not specified a number of events to display;
- **When** the events are displayed;
- **Then** 32 events should be shown by default.

#### Scenario 2: User can change the number of events displayed.
- **Given** the user is on the events page;
- **When** the user specifies a number of events to display;
- **Then** the events list should update to show the specified number of events.

### Feature 4: As a **user**, I should be able to **use the app when offline**, so that **I can access my event information when without an internet connection.**

#### Scenario 1: Show cached data when there's no internet connection.
- **Given** the user has previously access the app with an internet connection and the app has cached data;
- **When** the user opens the app without an internet connection;
- **Then** the app should display the cached data.

#### Scenario 2: Show error when user changes search settings (city, number of events).
- **Given** the user is using the app without an internet connection;
- **When** the user attempts to change the searchg settings such as city or number of events;
- **Then** the app should display an error message indicating that the action cannot be completed without an internet connection.

### Feature 5: As a **user**, I should be able to **add a shortcut for the app to my home screen**, so that **I can quickly access the app with a single tap.**

#### Scenario 1: User can install the meet app as a shortcut on their device home screen.
- **Given** the user is accessing the meet app on their mobile device;
- **When** the user selects the option to add a shortcut to the home screen;
- **Then** the meet app should be installed as a shortcut on the device's home screen.

### Feature 6: As a **user**, I should be able to **see charts visualizing event details**, so that **I can easily understand and analyze event data at a glance.**

#### Scenario 1: Show a chart with the number of upcoming events in each city.
- **Given** the user is on the events dashboard;
- **When** the user views the chart displaying upcoming events by city;
- **Then** the chart should visually represent the number of upcoming events in each city.

## Serverless Functions
1. getAuthURL
```sh
GET - https://tm3roex2o4.execute-api.us-east-2.amazonaws.com/dev/api/get-auth-url
```
2. getAccessToken
```sh
GET - https://tm3roex2o4.execute-api.us-east-2.amazonaws.com/dev/api/token/{code}
```
3. getCalendarEvents
```sh
GET - https://tm3roex2o4.execute-api.us-east-2.amazonaws.com/dev/api/get-events/{access_token}
```