import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Storage from './services/StorageService'
import TopNavBar from './components/TopNavBar'
import SideBar from './components/SideBar'
import { Link } from 'react-router-dom'
import RetrospectiveCard from './components/RetrospectiveCard'

export default function Profile3Box () {
  const settings = useSelector(state => state.retrospective.settings3box)
  const [spaces, setSpace] = useState([])
  const [newDRetroName, setNewDRetroName] = useState('')

  useEffect(() => {
    async function fetchRetrospectives () {
      const storage = new Storage()
      let retros = await storage.getRetrospectives(settings.space)
      setSpace(retros)
    }

    fetchRetrospectives()
  }, [])

  const onClickHandler = async () => {
    if (newDRetroName != '') {
      let date = new Date();
      let newDRetro = {
        name: newDRetroName,
        owner: settings.account,
        created: ("00" + date.getDate()).slice(-2) + "/" + ("00" + (date.getMonth() + 1)).slice(-2) + "/" +date.getFullYear(),
        data: {},
        url: `${newDRetroName}`,
        participants: [settings.alias]
      }
      const storage = new Storage()
      let newDRetros = await storage.createRetrospective(
        settings.space,
        newDRetro
      )
      setSpace(newDRetros)
      setNewDRetroName('')
    }
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
              onChange={e => setNewDRetroName(e.target.value)}
            />

            <div class='input-group-append'>
              <button
                class='btn btn-primary'
                type='button'
                onClick={onClickHandler}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>

      <h1 className='landing-heading'>Welcome {settings.alias}!</h1>
      <p className='lead'>{settings.account}</p>
      <p className='lead'>Retrospectives available...</p>
      <div className='container'>
        <div className='row'>
          {spaces.map(item => (
            <div className='col-4' style={{ padding: '10px' }} key={item['name']} >
              <RetrospectiveCard retrospective={item}></RetrospectiveCard>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
