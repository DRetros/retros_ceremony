import React from 'react'
import {useSelector} from 'react-redux'

import Column from './Column'

function Game () {
  const columns = useSelector(state => state.retrospective.columns)

  return (
    <div className='d-flex flex-row justify-content-around'>
      {columns.map((column, index) => (
        <Column column={column} key={index}></Column>
      ))}
    </div>
  )
}

export default Game