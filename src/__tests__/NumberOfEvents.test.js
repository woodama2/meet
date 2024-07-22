import { render } from '@testing-library/react';
import { getEvents } from '../api';
import NumberOfEvents from '../components/NumberOfEvents';
import userEvent from '@testing-library/user-event';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsComponent;
  beforeEach(() => {
    NumberOfEventsComponent = render(<NumberOfEvents />);
  });

  //UNIT TESTS

  test('renders text input', () => {
    const eventNumberTextBox = NumberOfEventsComponent.queryByRole('textbox');
    expect(eventNumberTextBox).toBeInTheDocument();
    expect(eventNumberTextBox).toHaveClass('event-number');
  });
  test('default value of the input field is 32', () => {
    expect(NumberOfEventsComponent.queryByRole('textbox')).toHaveValue('32');
  });
  test('update textbox value when user types a new number', async () => {
    const NumberOfEvents = NumberOfEventsComponent.queryByRole('textbox');
    const user = userEvent.setup();
    await user.type(NumberOfEvents, '{backspace}{backspace}10');
    expect(NumberOfEvents).toHaveValue('10');
  });
  test('does not allow non-numeric input', async () => {
    const NumberOfEvents = NumberOfEventsComponent.queryByRole('textbox');
    const user = userEvent.setup();
    await user.type(NumberOfEvents, 'abc!@#');
    expect(NumberOfEvents).toHaveValue('32');
  });
});
