import React, { useRef, useState } from 'react';

interface Props {
  executeSearch: (executed: boolean) => void;
}

const Header: React.FC<Props> = ({ executeSearch }) => {
  const [searchValue, setSearchValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const githubIcon = `${process.env.PUBLIC_URL}/assets/github.svg`;
  const searchInputIcon = `${process.env.PUBLIC_URL}/assets/search-icon.svg`;

  const handleFocusSearch = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSearchChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(evt.target.value);
  };

  const handleSubmitSearch = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    executeSearch(true);
  };

  return (
    <div className="header">
      <img className="logo" src={githubIcon} alt="" />

      <form onSubmit={handleSubmitSearch}>
        <div className="search-input-wrapper" onClick={handleFocusSearch}>
          <img className="search-icon" src={searchInputIcon} alt="" />

          <input
            ref={inputRef}
            type="text"
            placeholder="Enter GitHub username"
            value={searchValue}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
      </form>
    </div>
  );
};

export default Header;
