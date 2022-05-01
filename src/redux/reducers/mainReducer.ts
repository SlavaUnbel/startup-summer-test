import { createAction, createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axios from 'axios';
import { Repos } from '../../types/repos';
import { User } from '../../types/user';
import { RootState } from '../store';

const BASE_API = 'https://api.github.com/users/';

export interface MainState {
  searchExecuted: boolean;
  searchValue: string;
  data: {
    user: User;
    repos: Repos[];
    isFetching: boolean;
    isFetchError: boolean;
    isFetchSuccess: boolean;
  };
}

const initialState: MainState = {
  searchExecuted: false,
  searchValue: '',
  data: {
    user: {
      login: '',
      name: '',
      html_url: '',
      followers: 0,
      following: 0,
      avatar_url: ''
    },
    repos: [],
    isFetching: false,
    isFetchError: false,
    isFetchSuccess: false
  }
};

export const setSearchExecuted = createAction<boolean>('SET_SEARCH_EXECUTED');
export const setSearchValue = createAction<string>('SET_SEARCH_VALUE');
export const setUser = createAction<User>('SET_USER');
export const setRepos = createAction<Repos[]>('SET_REPOS');

export const fetchUsersAndRepos = createAsyncThunk(
  'FETCH_USERS_AND_REPOS',
  async (_, { dispatch, getState }) => {
    const {
      main: { searchValue: username }
    } = getState() as RootState;
    const userEndpoint = `${BASE_API}${username}`;
    const reposEndpoint = `${userEndpoint}/repos`;

    const { data: user } = await axios(userEndpoint);
    const { data: repos } = await axios(reposEndpoint);

    dispatch(setUser(user));
    dispatch(setRepos(repos));
  }
);

export default createReducer(initialState, (builder) => {
  builder
    .addCase(fetchUsersAndRepos.pending, (state) => ({
      ...state,
      data: {
        ...state.data,
        isFetching: true,
        isFetchError: false,
        isFetchSuccess: false
      }
    }))
    .addCase(fetchUsersAndRepos.fulfilled, (state) => ({
      ...state,
      data: {
        ...state.data,
        isFetching: false,
        isFetchError: false,
        isFetchSuccess: true
      }
    }))
    .addCase(fetchUsersAndRepos.rejected, (state) => ({
      ...state,
      data: {
        ...state.data,
        isFetching: false,
        isFetchError: true,
        isFetchSuccess: false
      }
    }))
    .addCase(setSearchExecuted, (state, action) => ({
      ...state,
      searchExecuted: action.payload
    }))
    .addCase(setSearchValue, (state, action) => ({
      ...state,
      searchValue: action.payload
    }))
    .addCase(setUser, (state, action) => ({
      ...state,
      data: {
        ...state.data,
        user: action.payload
      }
    }))
    .addCase(setRepos, (state, action) => ({
      ...state,
      data: {
        ...state.data,
        repos: action.payload
      }
    }));
});
