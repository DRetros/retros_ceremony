import React from 'react'
import { Link } from 'react-router-dom'

function Sidebar () {
  return (
    <nav className='col-md-2 d-none d-md-block bg-light sidebar'>
      <div className='sidebar-sticky'>
        <ul className='nav flex-column'>
          <li className='nav-link active'>
            <Link to={'/'}>Retrospectives</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Sidebar
