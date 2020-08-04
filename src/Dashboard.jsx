import React from 'react'
import { useSelector } from 'react-redux'

import Signin3Box from './Signin3Box'
import Profile3Box from './Profile3Box'

export default function Dasboard() {
  const settings = useSelector(state => state.retrospective.settings3box)

  return <div>
    {!settings.profile ? (
      <Signin3Box />
    ) : (
        <Profile3Box />
      )}
  </div>
}