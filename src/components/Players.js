import React from 'react'
import { PropTypes } from 'prop-types'
import SearchTable from 'reactable-search'

const check = value => value || 'unknown'

const Players = ({players}) => {
  return (
    <SearchTable
      searchPrompt="Type to search"
      rows={players.slice(0, 30).map(player => {
        const { first_name, last_name, league, age, position } = player;
        return {
          expanded: false,
          cells: {
            first_name : check(first_name),
            last_name : check(last_name),
            league : check(league)
          },
          children: [{ age: 'Age: '+ check(age) },
          { position: 'Position: '+ check(position) }]
        }
      })}
    />
  )
}

Players.propTypes = {
  players: PropTypes.array.isRequired
}

export default Players
