import React, { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import {
  fetchUsersAndRepos,
  setSearchExecuted,
  setSearchValue
} from '../../redux/reducers/mainReducer';
import { mainSelector } from '../../redux/selectors/mainSelector';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const { searchValue } = useAppSelector(mainSelector);
  const inputRef = useRef<HTMLInputElement>(null);

  const githubIcon = `${process.env.PUBLIC_URL}/assets/github.svg`;
  const searchInputIcon = `${process.env.PUBLIC_URL}/assets/search-icon.svg`;

  const handleFocusSearch = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSearchChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchValue(evt.target.value));
  };

  const handleSubmitSearch = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(setSearchExecuted(true));
    dispatch(fetchUsersAndRepos());
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
