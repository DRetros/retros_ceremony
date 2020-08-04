import React from 'react'
import { useSelector } from 'react-redux'

export default function Profile3Box() {
    const settings = useSelector(state => state.retrospective.settings3box)

    return <div>Profile {settings.account}</div>
}