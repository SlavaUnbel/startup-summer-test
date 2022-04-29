import React from 'react';
import { Repos } from '../../types/repos';
import { User } from '../../types/user';
import GithubProfile from '../GithubProfile';
import Loader from '../Loader';
import StartScreen from '../StartScreen';

interface Props {
  searchExecuted: boolean;
  loading: boolean;
  notFound: boolean;
  user: User;
  repos: Repos[];
}

const Layout: React.FC<Props> = ({ searchExecuted, loading, notFound, user, repos }) => {
  if (loading) {
    return (
      <div className="layout">
        <Loader />
      </div>
    );
  }
  return (
    <div className="layout">
      {searchExecuted ? (
        <GithubProfile notFound={notFound} user={user} repos={repos} />
      ) : (
        <StartScreen />
      )}
    </div>
  );
};

export default Layout;
