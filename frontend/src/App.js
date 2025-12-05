import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { JoblyProvider } from './JoblyContext';
import Routes from './Routes';
import Navigation from './Navigation';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <JoblyProvider>
        <div className="App">
          <Navigation />
          <main>
            <Routes />
          </main>
        </div>
      </JoblyProvider>
    </BrowserRouter>
  );
}

export default App;