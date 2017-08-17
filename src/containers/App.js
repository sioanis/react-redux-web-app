import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { selectPlayers, fetchPlayersIfNeeded, invalidatePlayers } from '../actions'
import Players from '../components/Players'

class App extends Component {
  static propTypes = {
    selectedPlayers: PropTypes.string.isRequired,
    players: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { dispatch, selectedPlayers } = this.props
    dispatch(fetchPlayersIfNeeded(selectedPlayers))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedPlayers !== this.props.selectedPlayers) {
      const { dispatch, selectedPlayers } = nextProps
      dispatch(fetchPlayersIfNeeded(selectedPlayers))
    }
  }

  handleChange = nextPlayers => {
    this.props.dispatch(selectPlayers(nextPlayers))
  }

  handleRefreshClick = e => {
    e.preventDefault()

    const { dispatch, selectedPlayers } = this.props
    dispatch(invalidatePlayers(selectedPlayers))
    dispatch(fetchPlayersIfNeeded(selectedPlayers))
  }

  render() {
    const { players, isFetching, lastUpdated } = this.props
    const isEmpty = players.length === 0
    return (
      <div>
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
          {!isFetching &&
            <button onClick={this.handleRefreshClick}>
              Refresh
            </button>
          }
        </p>
        {isEmpty
          ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <Players players={players} />
            </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { selectedPlayers, playersByPlayers } = state
  const {
    isFetching,
    lastUpdated,
    items: players
  } = playersByPlayers[selectedPlayers] || {
    isFetching: true,
    items: []
  }

  return {
    selectedPlayers,
    players,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(App)
