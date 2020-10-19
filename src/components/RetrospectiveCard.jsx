import React from 'react'
import { Link } from 'react-router-dom'

function RetrospectiveCard ({ retrospective }) {
  return (
    <div
      className='rounded mb-3'
      style={{ background: 'white', boxShadow: '2px 2px lightgrey' }}
    >
      <div style={{ padding: '10px', borderBottom: '1px solid #999999' }}>
        <div
          className='d-flex'
          style={{ color: '#999999', fontSize: '.8em' }}
        >
          <span style={{ flex: 1 }}>Project:</span> <i class='far fa-eye'></i>{' '}
          <i class='fas fa-pencil-alt'></i> <i class='far fa-trash-alt'></i>
        </div>
        <Link to={`/game/${retrospective['url']}`}>
          <i class='far fa-edit'></i> {`${retrospective['name']}`}
        </Link>
      </div>
      <div style={{ padding: '10px', fontSize: '.8em' }}>
        <div>
          <span style={{ color: '#999999' }}>Status:</span> Not Started{' '}
          <i class='fas fa-circle'></i>
        </div>
        <div>
          <span style={{ color: '#999999' }}>Participants:</span>{' '}
          <ul>
            <li>Bruce Wayne</li>
            <li>Barbara Gordon</li>
            <li>D Grayson</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default RetrospectiveCard
