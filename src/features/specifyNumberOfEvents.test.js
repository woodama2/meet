import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, (test) => {
  // Scenario 1
  test('When user hasn’t specified a number, 32 events are shown by default.', ({
    given,
    and,
    when,
    then,
  }) => {
    let AppComponent;
    let eventList;
    given('the user is on the events page', () => {
      AppComponent = render(<App />);
    });

    and('the user has not specified a number of events to display', () => {});

    when('the events are displayed', async () => {
      const AppDOM = AppComponent.container.firstChild;
      await waitFor(() => {
        eventList = within(AppDOM).queryAllByRole('listitem');
        expect(eventList[0]).toBeTruthy();
      });
    });

    then(/^(\d+) events should be shown by default.$/, (arg0) => {
      expect(eventList.length).toEqual(32);
    });
  });
  // Scenario 2
  test('User can change the number of events displayed.', ({
    given,
    when,
    then,
  }) => {
    let AppComponent;
    let eventList;
    given('the user is on the events page', () => {
      AppComponent = render(<App />);
    });

    when('the user specifies a number of events to display', async () => {
      const user = userEvent.setup();
      const AppDOM = AppComponent.container.firstChild;
      const NumberOfEvents = AppDOM.querySelector('#number-of-events-input');
      await user.type(NumberOfEvents, '{backspace}{backspace}10');
    });

    then(
      'the events list should update to show the specified number of events.',
      () => {
        const AppDOM = AppComponent.container.firstChild;
        const eventList = within(AppDOM).queryAllByRole('listitem');
        expect(eventList.length).toEqual(10);
      }
    );
  });
});
