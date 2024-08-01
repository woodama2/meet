import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, waitFor, within } from '@testing-library/react';
import App from '../App';
import Event from '../components/Event';
import { getEvents } from '../api';
import userEvent from '@testing-library/user-event';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, (test) => {
  // Scenario 1
  test('An event element is collapsed by default.', ({ given, when, then }) => {
    let AppComponent;
    given('the user is on the events page', () => {
      AppComponent = render(<App />);
    });

    when('the events are displayed', async () => {
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector('#event-list');
      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBe(32);
      });
    });

    then('each event element should be collapsed by default.', () => {
      const AppDOM = AppComponent.container.firstChild;
      const eventDetails = AppDOM.querySelector('.details');
      expect(eventDetails).not.toBeInTheDocument();
    });
  });

  // Scenario 2
  test('User can expand an event to see details.', ({
    given,
    and,
    when,
    then,
  }) => {
    let AppComponent;
    let button;
    given('the user is on the events page', () => {
      AppComponent = render(<App />);
    });

    and('the events elements are collapsed by default', () => {
      const EventDOM = AppComponent.container.firstChild;
      const details = EventDOM.querySelector('.details');
      expect(details).not.toBeInTheDocument();
    });

    when('the user clicks on an event element', async () => {
      await userEvent.click(button);
    });

    then(
      'the event details should expand to show more information.',
      async () => {
        const AppDOM = AppComponent.container.firstChild;

        await waitFor(() => {
          const eventList = within(AppDOM).queryAllByRole('listitem');
          expect(eventList[0]).toBeTruthy();
        });

        button = AppComponent.queryAllByText('Show Details')[0];
        await userEvent.click(button);

        const EventDOM = AppComponent.container.firstChild;
        const details = EventDOM.querySelector('.details');
        expect(details).toBeInTheDocument();
      }
    );
  });

  // Scenario 3
  test('User can collapse an event to hide details.', ({
    given,
    when,
    then,
  }) => {
    let AppComponent;
    let button;
    given('the user has expanded an event to see details', async () => {
      AppComponent = render(<App />);
      const AppDOM = AppComponent.container.firstChild;

      await waitFor(() => {
        const eventList = within(AppDOM).queryAllByRole('listitem');
        expect(eventList[0]).toBeTruthy();
      });

      button = AppComponent.queryAllByText('Show Details')[0];
      await userEvent.click(button);

      const EventDOM = AppComponent.container.firstChild;
      const details = EventDOM.querySelector('.details');
      expect(details).toBeInTheDocument();
    });

    when('the user clicks on the expanded event element', async () => {
      await userEvent.click(button);
    });

    then('the event details should collapse to hide the information.', () => {
      const EventDOM = AppComponent.container.firstChild;
      const details = EventDOM.querySelector('.details');
      expect(details).not.toBeInTheDocument();
    });
  });
});
