import React, { useRef, useState } from 'react';
import { useGithubEndpoints } from '../../hooks/useGithubApi';
import { Repos } from '../../types/repos';
import { User } from '../../types/user';

interface Props {
  executeSearch: (executed: boolean) => void;
  setLoading: (loading: boolean) => void;
  setNotFound: (notFound: boolean) => void;
  setUser: (user: User) => void;
  setRepos: (repos: Repos[]) => void;
}

const Header: React.FC<Props> = ({ executeSearch, setLoading, setNotFound, setUser, setRepos }) => {
  const [searchValue, setSearchValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const callApi = useGithubEndpoints(searchValue, setLoading, setUser, setRepos, setNotFound);

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
    callApi();
  };

  return (
    <div className="header">
      <a href="https://github.com/" target="_blank" rel="noreferrer">
        <img className="logo" src={githubIcon} alt="" />
      </a>

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
