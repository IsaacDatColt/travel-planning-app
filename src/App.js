import React from 'react';
import { AuthProvider } from './components/AuthContext';
import Routes from './router';
import 'bulma/css/bulma.css';

// import logo from './logo.svg';
// import './App.css';


function App() {
  return (
    <AuthProvider>
      <div className="App">
        <header className="App-header">
          <Routes /> {/* Include Routes here */}
        </header>
      </div>
    </AuthProvider>
  );
}

export default App;
