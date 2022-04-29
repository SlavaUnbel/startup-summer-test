import React from 'react';
import { Repos } from '../../types/repos';
import { User } from '../../types/user';

interface Props {
  notFound: boolean;
  user: User;
  repos: Repos[];
}

const GithubProfile: React.FC<Props> = ({ notFound, user, repos }) => {
  const userIcon = `${process.env.PUBLIC_URL}/assets/user.svg`;

  if (notFound) {
    return (
      <React.Fragment>
        <img className="user-icon" src={userIcon} alt="" />

        <p className="no-user-text">User not found</p>
      </React.Fragment>
    );
  }
  return <div className="github-profile"></div>;
};

export default GithubProfile;
