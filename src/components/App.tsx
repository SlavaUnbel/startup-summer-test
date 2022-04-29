import React, { useEffect, useState } from 'react';
import './App.scss';
import Header from './Header';
import Layout from './Layout';

const App: React.FC = () => {
  const [searchExecuted, setSearchExecuted] = useState(false);

  useEffect(() => () => setSearchExecuted(false), []);

  return (
    <div className="app">
      <Header executeSearch={setSearchExecuted} />

      <Layout searchExecuted={searchExecuted} />
    </div>
  );
};

export default App;
