import React from 'react';
import './App.scss';
import Header from './Header';
import Layout from './Layout';

const App: React.FC = () => {
  return (
    <div className="app">
      <Header />

      <Layout />
    </div>
  );
};

export default App;
