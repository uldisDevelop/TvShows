import { ajax, abortAjaxByKey } from '../../utils/index'
import produce from 'immer'

//types
export const SET_SEARCH_VALUE = 'shows/setSearchValue'
export const CLEAR = 'shows/clear'

export const FETCH_TV_SHOWS_REQUEST = 'shows/fetchTvShowsRequest'
export const FETCH_TV_SHOWS_SUCCESS = 'shows/fetchTvShowsSuccess'
export const FETCH_TV_SHOWS_ERROR = 'shows/fetchTvShowsError'

export const FETCH_SHOW_REQUEST = 'shows/fetchShowRequest'
export const FETCH_SHOW_SUCCESS = 'shows/fetchShowSuccess'
export const FETCH_SHOW_ERROR = 'shows/fetchShowError'

export const FETCH_SEASONS_REQUEST = 'shows/fetchSeasonsRequest'
export const FETCH_SEASONS_SUCCESS = 'shows/fetchSeasonsSuccess'
export const FETCH_SEASONS_ERROR = 'shows/fetchSeasonsError'

export const FETCH_EPISODES_REQUEST = 'shows/fetchEpisodesRequest'
export const FETCH_EPISODES_SUCCESS = 'shows/fetchEpisodesSuccess'
export const FETCH_EPISODES_ERROR = 'shows/fetchEpisodesError'

export const CLEAR_DETAILS = 'shows/clearDetails'

export const SET_SELECTED_TV_SHOW = 'shows/setActiveItem'

//inital state
const initialState = {
  search: '',
  searchTypingActive: false,
  items: [],
  loading: false,
  activeShowId: null,
  seasons: [],
  seasonsLoading: false,
  show: null,
  showLoading: false
}

//reducer
export default (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {

    case SET_SEARCH_VALUE:
      draft.search = action.value;
      draft.searchTypingActive = true;
      draft.activeShowId = null;
      break;

    case FETCH_TV_SHOWS_REQUEST:
      draft.loading = true;
      draft.searchTypingActive = false;
      break;
    case FETCH_TV_SHOWS_SUCCESS:
      draft.loading = false;
      draft.items = action.items;
      break;
    case FETCH_TV_SHOWS_ERROR:
      draft.loading = false;
      draft.items = [];
      break;

    case FETCH_SHOW_REQUEST:
      draft.showLoading = true;
      break;
    case FETCH_SHOW_SUCCESS:
      draft.showLoading = false;
      draft.show = action.show;
      break;
    case FETCH_SHOW_ERROR:
      draft.showLoading = false;
      draft.show = null;
      break;

    case FETCH_SEASONS_REQUEST:
      draft.seasonsLoading = true;
      break;
    case FETCH_SEASONS_SUCCESS:
      draft.seasonsLoading = false;
      draft.seasons = action.seasons;
      break;
    case FETCH_SEASONS_ERROR:
      draft.seasonsLoading = false;
      draft.seasons = [];
      break;

    case FETCH_EPISODES_REQUEST:
      draft.seasons.find(season => season.id === action.seasonId).loading = true;
      break;
    case FETCH_EPISODES_SUCCESS:
      const season = draft.seasons.find(season => season.id === action.seasonId);
      season.loading = false;
      season.episodes = action.episodes;
      break;
    case FETCH_EPISODES_ERROR:
      draft.seasons.find(season => season.id === action.seasonId).loading = false;
      break;

    case CLEAR:
      draft.search = '';
      draft.searchTypingActive = false;
      draft.items = [];
      draft.loading = false;
      draft.activeShowId = null;
      break;

    case SET_SELECTED_TV_SHOW:
      draft.activeShowId = action.id;
      break;

    case CLEAR_DETAILS:
      draft.seasons = [];
      draft.show = null;
      draft.seasonsLoading = false;
      break;


    default:
      return draft;
  }
});

//actions
export const fetchTvShowsRequest = () => ({ type: FETCH_TV_SHOWS_REQUEST })
export const fetchTvShowsSuccess = ({ items }) => ({ type: FETCH_TV_SHOWS_SUCCESS, items })
export const fetchTvShowsError = () => ({ type: FETCH_TV_SHOWS_ERROR })

export const fetchShowRequest = () => ({ type: FETCH_SHOW_REQUEST })
export const fetchShowSuccess = ({ show }) => ({ type: FETCH_SHOW_SUCCESS, show })
export const fetchShowError = () => ({ type: FETCH_SHOW_ERROR })

export const fetchSeasonsRequest = () => ({ type: FETCH_SEASONS_REQUEST })
export const fetchSeasonsSuccess = ({ seasons }) => ({ type: FETCH_SEASONS_SUCCESS, seasons })
export const fetchSeasonsError = () => ({ type: FETCH_SEASONS_ERROR })

export const fetchEpisodesRequest = (seasonId) => ({ type: FETCH_EPISODES_REQUEST, seasonId })
export const fetchEpisodesSuccess = ({ episodes, seasonId }) => ({ type: FETCH_EPISODES_SUCCESS, episodes, seasonId })
export const fetchEpisodesError = (seasonId) => ({ type: FETCH_EPISODES_ERROR, seasonId })

export const clear = () => ({ type: CLEAR })
export const setActiveItem = (id) => ({ type: SET_SELECTED_TV_SHOW, id })
export const clearDetails = () => ({ type: CLEAR_DETAILS })

export const setSearchValue = (value) => {
  return (dispatch) => {

    if (value === '') {
      abortAjaxByKey('fetchTvShows');
      dispatch(clear())
    }
    else {
      dispatch({ type: SET_SEARCH_VALUE, value })
    }

  }
}

export const fetchTvShows = () => {
  return async (dispatch, getState) => {

    const searchStr = getState().shows.search;

    if (searchStr === '') {
      return;
    }

    dispatch(fetchTvShowsRequest())

    ajax({
      url: `http://api.tvmaze.com/search/shows?q=${encodeURIComponent(searchStr)}`,
      allowMultipleRequests: false,
      key: 'fetchTvShows',
      onSuccess(items) {
        dispatch(fetchTvShowsSuccess({ items }))
      },
      onError() {
        dispatch(fetchTvShowsError())
      }
    });
  }
}

export const fetchShow = (id) => {
  return async (dispatch) => {

    dispatch(fetchShowRequest())

    ajax({
      url: `http://api.tvmaze.com/shows/${id}`,
      allowMultipleRequests: false,
      key: 'fetchShow',
      onSuccess(show) {
        dispatch(fetchShowSuccess({ show }))
      },
      onError() {
        dispatch(fetchShowError())
      }
    });
  }
}

export const fetchSeasons = (id) => {
  return async (dispatch) => {

    dispatch(fetchSeasonsRequest())

    ajax({
      url: `http://api.tvmaze.com/shows/${id}/seasons`,
      allowMultipleRequests: false,
      key: 'fetchSeasons',
      onSuccess(seasons) {
        dispatch(fetchSeasonsSuccess({ seasons }))
      },
      onError() {
        dispatch(fetchSeasonsError())
      }
    });
  }
}

export const fetchEpisodes = (seasonId) => {
  return async (dispatch) => {

    dispatch(fetchEpisodesRequest(seasonId))

    ajax({
      url: ` http://api.tvmaze.com/seasons/${seasonId}/episodes`,
      allowMultipleRequests: false,
      key: 'fetchSeasons',
      onSuccess(episodes) {
        dispatch(fetchEpisodesSuccess({ episodes, seasonId }))
      },
      onError() {
        dispatch(fetchEpisodesError(seasonId))
      }
    });
  }
}



