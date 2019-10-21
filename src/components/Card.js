import React from 'react'

function Card ({ card }) {
  return (
    <div className='card my-1' >
      <div className='card-body'>
        <p className='card-text'>
        {card.description}
        </p>
        <a href='#' className='btn btn-primary'>
          Go somewhere
        </a>
      </div>
    </div>
  )
}

export default Card
