import { useState } from 'react';


function App() {
  const colors = ['black', 'cyan', 'violet', 'green', 'yellow'];
  const [index, setIndex] = useState(0);

  function handleClick() {
    setIndex((prevIndex) => (prevIndex + 1) % colors.length);
  }

  return (
    <div className="positioning" style={{ backgroundColor: colors[index] }}>
      <button className="changebutton" onClick={handleClick}>
        Change Background
      </button>
    </div>
  );
}

export default App;
