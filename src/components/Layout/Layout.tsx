import React from 'react';
import GithubProfile from '../GithubProfile';
import Loader from '../Loader';
import StartScreen from '../StartScreen';
import { useAppSelector } from '../../redux/store';
import { mainSelector, userDataSelector } from '../../redux/selectors/mainSelector';

const Layout: React.FC = () => {
  const { searchExecuted } = useAppSelector(mainSelector);
  const { isFetching } = useAppSelector(userDataSelector);

  if (isFetching) {
    return (
      <div className="layout">
        <Loader />
      </div>
    );
  }

  return <div className="layout">{searchExecuted ? <GithubProfile /> : <StartScreen />}</div>;
};

export default Layout;
