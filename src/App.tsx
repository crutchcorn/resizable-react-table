import React from 'react';
import {Table} from './components/Table';

const App = () => {
    return (
        <Table
            data={[
                [1, 2],
                [3, 4],
                [5, 6],
            ]}
        />
    );

};

export default App;
