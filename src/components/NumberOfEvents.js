import { useState } from 'react';

const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {
  const [eventNumber, setEventNumber] = useState(32);
  const handleInputChange = (event) => {
    const value = event.target.value;

    // Alerts
    if (isNaN(value)) {
      setErrorAlert('value is not a number');
    } else if (value > 50) {
      setErrorAlert('maximum value is 50');
    } else if (value <= 0) {
      setErrorAlert('minimum value is 1');
    } else {
      setErrorAlert('');
      setCurrentNOE(value);
    }

    setEventNumber(value);
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
