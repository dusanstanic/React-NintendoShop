import * as actionTypes from "../actions/gameDisplay";

const initialState = {
  games: [],
  selectedGames: [],
  selectedPgRatings: [],
  selectedGenres: [],
  selectedGamesByPgRating: [],
  selectedGamesByGenre: [],
};

const reducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.SET_GAMES:
      return { ...state, games: action.games };
    case actionTypes.SET_SELECTED_GAMES:
      return { ...state, selectedGames: action.selectedGames };
    case actionTypes.SET_SELECTED_PGRATINGS:
      return { ...state, selectedPgRatings: action.selectedPgRatings };
    case actionTypes.SET_SELECTED_GENRES:
      return { ...state, selectedGenres: action.selectedGenres };
    case actionTypes.SET_SELECTED_GAMES_BY_PGRATING:
      return {
        ...state,
        selectedGamesByPgRating: action.selectedGamesByPgRating,
      };
    case actionTypes.SET_SELECTED_GAMES_BY_GENRE:
      return {
        ...state,
        selectedGamesByGenre: action.selectedGamesByGenre,
      };
    default:
      return state;
  }
};

export default reducer;
