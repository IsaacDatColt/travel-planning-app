import React from 'react';
import { AuthProvider } from './AuthContext';
import Routes from './routes';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Routes /> {/* Include Routes here */}
        </header>
      </div>
    </AuthProvider>
  );
}

export default App;
