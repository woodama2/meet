import { render } from '@testing-library/react';
import Event from '../components/Event';
import userEvent from '@testing-library/user-event';
import { getEvents } from '../api';

describe('<Event /> component', () => {
  let EventComponent;
  let allEvents;

  beforeAll(async () => {
    allEvents = await getEvents();
  });
  beforeEach(() => {
    EventComponent = render(<Event event={allEvents[0]} />);
  });

  // UNIT TESTS
  test('renders event title', () => {
    expect(
      EventComponent.queryByText(allEvents[0].summary)
    ).toBeInTheDocument();
  });
  test('renders event start time', () => {
    expect(
      EventComponent.queryByText(allEvents[0].created)
    ).toBeInTheDocument();
  });
  test('renders event location', () => {
    expect(
      EventComponent.queryByText(allEvents[0].location)
    ).toBeInTheDocument();
  });
  test('renders event details button with the title (show details)', () => {
    expect(EventComponent.queryByText('Show Details')).toBeInTheDocument();
  });
  test('by default, event details section should be hidden', () => {
    const details = EventComponent.container.querySelector('.details');
    expect(details).not.toBeInTheDocument();
  });
  test('renders event details when user clicks "Show Details" button', async () => {
    const user = userEvent.setup();
    const button = EventComponent.queryByRole('button');
    await user.click(button, 'Show Details');
    const details = EventComponent.container.querySelector('.details');
    expect(details).toBeInTheDocument();
  });
  test('hides event details when user clicks "Hide Details" button', async () => {
    const user = userEvent.setup();
    const button = EventComponent.queryByRole('button');
    // First click to show the details
    await user.click(button, 'Show Details');
    // Second click to hide the details
    await user.click(button, 'Hide Details');
    const details = EventComponent.container.querySelector('.details');
    expect(details).not.toBeInTheDocument();
  });
});
