import React, { useEffect } from 'react';
import './App.scss';
import Header from './Header';
import Layout from './Layout';
import { useAppDispatch } from '../redux/store';
import { setSearchExecuted } from '../redux/reducers/mainReducer';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(
    () => () => {
      dispatch(setSearchExecuted(false));
    },
    [dispatch]
  );

  return (
    <div className="app">
      <Header />

      <Layout />
    </div>
  );
};

export default App;
