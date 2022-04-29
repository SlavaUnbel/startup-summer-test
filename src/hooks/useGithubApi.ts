import axios from 'axios';
import { Repos } from '../types/repos';
import { User } from '../types/user';
const BASE_API = 'https://api.github.com/users/';

export const useGithubEndpoints = (
  username: string,
  setLoading: (loading: boolean) => void,
  setUser: (user: User) => void,
  setRepos: (repos: Repos[]) => void,
  setNotFound: (notFound: boolean) => void
) => {
  const userEndpoint = `${BASE_API}${username}`;
  const reposEndpoint = `${userEndpoint}/repos`;

  const callApi = async () => {
    setLoading(true);
    setNotFound(false);

    try {
      const { data: user } = await axios(userEndpoint);
      const { data: repos } = await axios(reposEndpoint);
      setUser(user);
      setRepos(repos);
    } catch ({ response: { status } }) {
      if (status === 404) {
        setNotFound(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return callApi;
};
