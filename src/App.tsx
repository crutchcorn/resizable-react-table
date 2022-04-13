import React, {useState} from 'react';
import {Home} from "./Home";
import {DragHandler} from "./components/drag-handle";


const App = () => {
    const [width, setWidth] = useState(100);
    const [height, setHeight] = useState(100);

    return (
        <div
            style={{display: 'flex', flexDirection: 'column', flexWrap: 'nowrap'}}
        >
            <div
                style={{display: 'flex', flexWrap: 'nowrap', height: `${height}px`}}
            >
                <div style={{width: `${width}px`}}>
                    <Home/>
                </div>
                <DragHandler direction="x" move={(val) => setWidth((w) => w + val)}/>
                <div>
                    <Home/>
                </div>
            </div>
            <DragHandler direction="y" move={(val) => setHeight((w) => w + val)}/>
            <Home/>
        </div>
    );
};

export default App;
