import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Storage from './services/StorageService'
import TopNavBar from './components/TopNavBar'
import SideBar from './components/SideBar'
import { Link } from 'react-router-dom'

export default function Profile3Box () {
  const settings = useSelector(state => state.retrospective.settings3box) 
  const [spaces, setSpace] = useState([])
  const [newDRetroName, setNewDRetroName] = useState('')

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

  const onClickHandler = async () => {
    const storage = new Storage()
    const nSpace = await storage.createRetrospective(settings.box, newDRetroName)
    let newSpaces = [...spaces, nSpace['_name']]
    setSpace(newSpaces)
  }

  return (
    <div>
      <div class='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom'>
        <h1 class='h2'>Dashboard</h1>
        <div class='btn-toolbar mb-2 mb-md-0'>
          <div class='input-group mb-3'>
            <input
              type='text'
              class='form-control'
              placeholder='New DRetro Name'
              aria-label='New DRetro Name'
              aria-describedby='button-addon2'
              value={newDRetroName}
              onChange={e => setNewDRetroName(e.target.value)}/>
              
            <div class='input-group-append'>
              <button
                class='btn btn-primary'
                type='button'
                onClick={onClickHandler}>
                  Create
              </button>
            </div>
          </div>
        </div>            
      </div>

      <h1 className='landing-heading'>
        Welcome {settings.profile.name}!
      </h1>
      <p className='lead'>{settings.account}</p>
      <p className='lead'>Retrospectives available...</p>
      <ul>
        {spaces.map(item => (
          <li key={item}><Link to={`/game/${item}`}>{`${item}`.replace('dretros-','')}</Link></li>
        ))}
      </ul>
    </div>
  )
}