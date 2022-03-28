import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import ChatFeature from './features/Chat';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ChatFeature />} />
      </Routes>
    </div>
  );
}

export default App;
