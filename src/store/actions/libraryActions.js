import axios from '../../axios';

export const fetchSongsPending = () => {
  return {
    type: 'FETCH_SONGS_PENDING'
  };
};

export const fetchSongsSuccess = songs => {
  return {
    type: 'FETCH_SONGS_SUCCESS',
    songs
  };
};

export const fetchSongsError = () => {
  return {
    type: 'FETCH_SONGS_ERROR'
  };
};

export const fetchSongs = accessToken => {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
  return async dispatch => {
    dispatch(fetchSongsPending());

    function onSuccess(songs) {
      dispatch(fetchSongsSuccess(songs));
      return songs;
    }
    function onError(error) {
      dispatch(fetchSongsError());
      return error;
    }
    try {
      const response = await axios.get('/me/tracks?limit=50');
      return onSuccess(response.data);
    } catch (error) {
      return onError(error);
    }
  };
};