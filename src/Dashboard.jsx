import React, { useState, useEffect } from 'react'
import Big from 'big.js';
import RetrospectiveCard from './components/RetrospectiveCard'

import Profile3Box from './Profile3Box'

const SUGGESTED_DONATION = '0';
const BOATLOAD_OF_GAS = Big(3).times(10 ** 13).toFixed();

export default function Dasboard ({ contract, currentUser }) {
  const [newDRetroName, setNewDRetroName] = useState('')
  const [spaces, setSpaces] = useState([])

  useEffect(() => {
    // TODO: don't just fetch once; subscribe!
    contract.getMessages().then(setSpaces);
  }, []);

  function handleOnCreate() {
    contract.addMessage(
      { text: newDRetroName },
      BOATLOAD_OF_GAS,
      Big('0').times(10 ** 24).toFixed()
    ).then(() => {
      contract.getMessages().then(messages => {
        setSpaces(messages);
        setNewDRetroName('');
      });
    });
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
                onClick={handleOnCreate}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>

      <h1 className='landing-heading'>Welcome {currentUser.accountId}!</h1>
      <p className='lead'>{currentUser.accountId}</p>
      <p className='lead'>Retrospectives available...</p>
      <div className='container'>
        <div className='row'>
          {spaces.map(item => (
            <div
              className='col-4'
              style={{ padding: '10px' }}
              key={item['name']}
            >
              <RetrospectiveCard retrospective={item}></RetrospectiveCard>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
