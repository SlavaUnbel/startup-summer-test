import React from 'react';

interface Props {
  searchExecuted: boolean;
}

const Layout: React.FC<Props> = ({ searchExecuted }) => {
  const searchInputIcon = `${process.env.PUBLIC_URL}/assets/search-icon.svg`;

  if (!searchExecuted) {
    return (
      <div className="layout">
        <img className="search-icon" src={searchInputIcon} alt="" />

        <p className="start-text">
          Start with searching <br /> a GitHub user
        </p>
      </div>
    );
  }

  return <div>Layout</div>;
};

export default Layout;
