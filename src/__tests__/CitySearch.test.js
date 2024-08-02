import { render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CitySearch from '../components/CitySearch';
import App from '../App';
import { extractLocations, getEvents } from '../api';

describe('<CitySearch /> component', () => {
  let CitySearchComponent;
  const setInfoAlert = jest.fn();
  const setCurrentCity = jest.fn();

  beforeEach(() => {
    CitySearchComponent = render(
      <CitySearch
        allLocations={[]}
        setCurrentCity={setCurrentCity}
        setInfoAlert={setInfoAlert}
      />
    );
  });
  test('renders text input', () => {
    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    expect(cityTextBox).toBeInTheDocument();
    expect(cityTextBox).toHaveClass('city');
  });
  test('suggestions list is hidden by default', () => {
    const suggestionList = CitySearchComponent.queryByRole('list');
    expect(suggestionList).not.toBeInTheDocument();
  });
  test('renders a list of suggestions when city textbox gains focus', async () => {
    const user = userEvent.setup();
    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    await user.click(cityTextBox);
    const suggestionList = CitySearchComponent.queryByRole('list');
    expect(suggestionList).toBeInTheDocument();
    expect(suggestionList).toHaveClass('suggestions');
  });
  test('updates list of suggestions correctly when user types in city textbox', async () => {
    const user = userEvent.setup();
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    CitySearchComponent.rerender(
      <CitySearch
        allLocations={allLocations}
        setCurrentCity={setCurrentCity}
        setInfoAlert={setInfoAlert}
      />
    );

    // user types "Berlin" in city textbox
    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    await user.type(cityTextBox, 'Berlin');

    // filter allLocations to locations matching "Berlin"
    const suggestions = allLocations
      ? allLocations.filter((location) => {
          return (
            location.toUpperCase().indexOf(cityTextBox.value.toUpperCase()) > -1
          );
        })
      : [];

    // get all <li> elements inside the suggestion list
    await waitFor(() => {
      const suggestionListItems =
        CitySearchComponent.queryAllByRole('listitem');
      expect(suggestionListItems).toHaveLength(suggestions.length + 1);
      for (let i = 0; i < suggestions.length; i += 1) {
        expect(suggestionListItems[i].textContent).toBe(suggestions[i]);
      }
    });
  });

  test('renders the suggestion text in the textbox upon clicking on the suggestion', async () => {
    const user = userEvent.setup();
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    CitySearchComponent.rerender(
      <CitySearch
        allLocations={allLocations}
        setCurrentCity={() => {}}
        setInfoAlert={setInfoAlert}
      />
    );

    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    await user.type(cityTextBox, 'Berlin');

    // the suggestion's textContent look like this: "Berlin, Germany"
    const BerlinGermanySuggestion =
      CitySearchComponent.queryAllByRole('listitem')[0];

    await user.click(BerlinGermanySuggestion);

    expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
  });
  test('calls handleInputChanged and sets filteredLocations when typing in city textbox', async () => {
    const user = userEvent.setup();
    const allLocations = ['Berlin', 'New York', 'San Francisco'];
    CitySearchComponent.rerender(
      <CitySearch
        allLocations={allLocations}
        setCurrentCity={setCurrentCity}
        setInfoAlert={setInfoAlert}
      />
    );

    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    await user.type(cityTextBox, 'York');

    const suggestions = allLocations.filter((location) =>
      location.toUpperCase().includes('YORK')
    );

    await waitFor(() => {
      const suggestionListItems =
        CitySearchComponent.queryAllByRole('listitem');
      expect(suggestionListItems).toHaveLength(suggestions.length + 1);
      suggestions.forEach((suggestion, index) => {
        expect(suggestionListItems[index].textContent).toBe(suggestion);
      });
    });
  });
  test('updates query state when user types in city textbox', async () => {
    const user = userEvent.setup();
    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    const testValue = 'New York';

    await user.type(cityTextBox, testValue);

    expect(cityTextBox).toHaveValue(testValue);
  });
});

describe('<CitySearch /> integration', () => {
  test('renders suggestions list when the app is rendered.', async () => {
    const user = userEvent.setup();
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;

    const CitySearchDOM = AppDOM.querySelector('#city-search');
    const cityTextBox = within(CitySearchDOM).queryByRole('textbox');
    await user.click(cityTextBox);

    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);

    // "await waitFor()" is optional because the UI update is related to a userEvent interaction
    await waitFor(() => {
      const suggestionListItems =
        within(CitySearchDOM).queryAllByRole('listitem');
      expect(suggestionListItems.length).toBe(allLocations.length + 1);
    });
  });
});