import React, { useEffect, useState } from 'react';
import { Repos } from '../types/repos';
import { User } from '../types/user';
import './App.scss';
import Header from './Header';
import Layout from './Layout';

const App: React.FC = () => {
  const [searchExecuted, setSearchExecuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [user, setUser] = useState<User>({} as User);
  const [repos, setRepos] = useState<Repos[]>([]);

  useEffect(() => () => setSearchExecuted(false), []);

  return (
    <div className="app">
      <Header
        executeSearch={setSearchExecuted}
        setLoading={setIsLoading}
        setNotFound={setNotFound}
        setUser={setUser}
        setRepos={setRepos}
      />

      <Layout
        searchExecuted={searchExecuted}
        loading={isLoading}
        notFound={notFound}
        user={user}
        repos={repos}
      />
    </div>
  );
};

export default App;
