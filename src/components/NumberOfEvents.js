import { useState } from 'react';

const NumberOfEvents = () => {
  const [eventNumber, setEventNumber] = useState(32);
  const handleInputChange = (event) => {
    const value = event.target.value;
    setEventNumber(value);
  };

  return (
    <div id="number-of-events">
      <input
        type="text"
        value={eventNumber}
        className="event-number"
        onChange={handleInputChange}
      />
    </div>
  );
};

export default NumberOfEvents;
