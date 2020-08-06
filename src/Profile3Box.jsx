import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Storage from './services/StorageService'
import TopNavBar from './components/TopNavBar'
import SideBar from './components/SideBar'
import { Link } from 'react-router-dom'

export default function Profile3Box () {
  const settings = useSelector(state => state.retrospective.settings3box)
  const [spaces, setSpace] = useState([])

  useEffect(() => {
    async function fetchRetrospectives () {
      const storage = new Storage()
      const sAvailable = await storage.getRetrospectives(settings.account)
      console.log('spaces')
      console.log(sAvailable)
      setSpace(sAvailable)
    }

    fetchRetrospectives()
  }, [])

  console.log(settings.thread)

  return (
    <div>
      
            <div class='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom'>
              <h1 class='h2'>Dashboard</h1>
              <div class='btn-toolbar mb-2 mb-md-0'>
                <div class='btn-group mr-2'>
                  <button class='btn btn-sm btn-outline-secondary'>
                    Share
                  </button>
                  <button class='btn btn-sm btn-outline-secondary'>
                    Export
                  </button>
                </div>
                <button class='btn btn-sm btn-outline-secondary dropdown-toggle'>
                  <span data-feather='calendar'></span>
                  This week
                </button>
              </div>
            </div>

            <h1 className='landing-heading'>
              Welcome {settings.profile.name}!
            </h1>
            <p className='lead'>{settings.account}</p>
            <p className='lead'>Retrospectives available...</p>
            <ul>
              {spaces.map(item => (
                <li key={item}><Link to={`/game/${item}`}>{item}</Link></li>
              ))}
            </ul>
          
    </div>
  )
}
