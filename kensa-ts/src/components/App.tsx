import * as React from 'react';

import Navbar from './Navbar';
import MainContainer from './MainContainer';

function App() {
    return (
        <div>
            {/* Navbar */}
            <Navbar />

            {/* Main Routes Container */}
            <MainContainer />
        </div>
    );
}
export default App;