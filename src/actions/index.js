export const REQUEST_PLAYERS = 'REQUEST_POSTS'
export const RECEIVE_PLAYERS = 'RECEIVE_POSTS'
export const SELECT_PLAYERS = 'SELECT_PLAYERS'
export const INVALIDATE_PLAYERS = 'INVALIDATE_PLAYERS'

export const selectPlayers = Players => ({
  type: SELECT_PLAYERS,
  Players
})

export const invalidatePlayers = Players => ({
  type: INVALIDATE_PLAYERS,
  Players
})

export const requestPosts = Players => ({
  type: REQUEST_PLAYERS,
  Players
})

export const receivePosts = (Players, json) => {
  return {
    type: RECEIVE_PLAYERS,
    Players,
    players: json.players,
    receivedAt: Date.now()
  }
}

const fetchPosts = Players => dispatch => {
  dispatch(requestPosts(Players))
  return fetch(`https://playdraft.herokuapp.com/api/v1/players`)
    .then(response => response.json())
    .then(json => {
      dispatch(receivePosts(Players, json))
    })
}

const shouldFetchPosts = (state, Players) => {
  const players = state.playersByPlayers[Players]
  if (!players) {
    return true
  }
  if (players.isFetching) {
    return false
  }
  return players.didInvalidate
}

export const fetchPlayersIfNeeded = Players => (dispatch, getState) => {
  if (shouldFetchPosts(getState(), Players)) {
    return dispatch(fetchPosts(Players))
  }
}
