import React, {useState} from 'react';
import {Home} from "./Home";
import {DragHandler} from "./components/drag-handle";

const App = () => {
  const [width, setWidth] = useState(100);

  // Callback ref
  const homeRef = (props: {width: number} | null) => {
    // Comment these out for different behavior
    if (!props) return;
    setWidth(props.width);
  };

  return (
      <div style={{ display: 'flex', flexWrap: 'nowrap' }}>
        <div style={{ width: `${width}px` }}>
          <Home ref={homeRef} />
        </div>
        <DragHandler moveX={(val) => setWidth((w) => w + val)} />
        <div>
          <Home />
        </div>
      </div>
  );
};

export default App;
