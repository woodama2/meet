import { useState } from 'react';

const NumberOfEvents = ({ setCurrentNOE }) => {
  const [eventNumber, setEventNumber] = useState(32);
  const handleInputChange = (event) => {
    const value = event.target.value;
    setEventNumber(value);
    setCurrentNOE(value);
  };

  return (
    <div id="number-of-events">
      <label htmlFor="number-of-events-input">Number of Events:</label>
      <input
        type="text"
        id="number-of-events-input"
        value={eventNumber}
        className="event-number"
        onChange={handleInputChange}
      />
    </div>
  );
};

export default NumberOfEvents;
