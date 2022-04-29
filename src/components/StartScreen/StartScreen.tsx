import React from 'react';

const StartScreen: React.FC = () => {
  const searchInputIcon = `${process.env.PUBLIC_URL}/assets/search-icon.svg`;

  return (
    <React.Fragment>
      <img className="layout-search-icon" src={searchInputIcon} alt="" />

      <p className="start-text">
        Start with searching <br /> a GitHub user
      </p>
    </React.Fragment>
  );
};

export default StartScreen;
