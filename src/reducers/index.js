import { combineReducers } from 'redux'
import {
  SELECT_PLAYERS, INVALIDATE_PLAYERS,
  REQUEST_PLAYERS, RECEIVE_PLAYERS
} from '../actions'

const selectedPlayers = (state = 'reactjs', action) => {
  switch (action.type) {
    case SELECT_PLAYERS:
      return action.Players
    default:
      return state
  }
}

const players = (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) => {
  switch (action.type) {
    case INVALIDATE_PLAYERS:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_PLAYERS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_PLAYERS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.players,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

const playersByPlayers = (state = { }, action) => {
  switch (action.type) {
    case INVALIDATE_PLAYERS:
    case RECEIVE_PLAYERS:
    case REQUEST_PLAYERS:
      return {
        ...state,
        [action.Players]: players(state[action.Players], action)
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  playersByPlayers,
  selectedPlayers
})

export default rootReducer
