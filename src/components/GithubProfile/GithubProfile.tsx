import React from 'react';
import { Repos } from '../../types/repos';
import { User } from '../../types/user';
import millify from 'millify';
import Repositories from './Repositories';

interface Props {
  notFound: boolean;
  user: User;
  repos: Repos[];
}

const GithubProfile: React.FC<Props> = ({ notFound, user, repos }) => {
  const userIcon = `${process.env.PUBLIC_URL}/assets/user.svg`;
  const manyPeopleIcon = `${process.env.PUBLIC_URL}/assets/many-people.svg`;
  const oneManIcon = `${process.env.PUBLIC_URL}/assets/one-man.svg`;
  const noReposIcon = `${process.env.PUBLIC_URL}/assets/no-repos.svg`;
  const { avatar_url: avatarImg, name, login, html_url: userLink, following, followers } = user;

  if (notFound) {
    return (
      <React.Fragment>
        <img className="user-icon" src={userIcon} alt="" />

        <p className="no-user-text">User not found</p>
      </React.Fragment>
    );
  }

  return (
    <div className="github-profile">
      <div className="user-info">
        <img className="avatar-img" src={avatarImg} alt="" />
        <div>
          <h1 className="user-name">{name ?? 'No name provided'}</h1>

          <a className="user-link" href={userLink} target="_blank" rel="noreferrer">
            {login}
          </a>

          <div className="people">
            <div className="people-section">
              <img className="people-icon" src={manyPeopleIcon} alt="" />

              <p className="people-text">{millify(followers)} followers</p>
            </div>

            <div className="people-section">
              <img className="people-icon" src={oneManIcon} alt="" />

              <p className="people-text">{millify(following)} following</p>
            </div>
          </div>
        </div>
      </div>
      <div className={repos.length > 0 ? 'user-repos' : 'empty-repos'}>
        {repos.length > 0 ? (
          <React.Fragment>
            <h1 className="repos-heading">Repositories ({repos.length})</h1>

            <Repositories repos={repos} />
          </React.Fragment>
        ) : (
          <div className="no-repos">
            <img className="no-repos-icon" src={noReposIcon} alt="" />

            <p className="no-repos-text">Repository list is empty</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GithubProfile;
