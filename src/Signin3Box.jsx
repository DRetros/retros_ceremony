import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import Box from "3box";

import { addSettings3Box } from './redux/actions'

export default function Signin3Box() {
  const dispatch = useDispatch();

  const getThreeBox = async address => {
    const profile = await Box.getProfile(address);
    return profile;
  };

  async function getAddressFromMetaMask() {
    if (typeof window.ethereum == "undefined") {
      console.log('needToAWeb3Browser')
    } else {
      window.ethereum.autoRefreshOnNetworkChange = false; //silences warning about no autofresh on network change
      const accounts = await window.ethereum.enable();
      return accounts
    }
  }

  const handleSignIn = async () => {
    const accounts = await getAddressFromMetaMask();
    if (accounts) {
      const threeBoxProfile = await getThreeBox(accounts[0]);
      console.log(threeBoxProfile)
      const box = await Box.openBox(accounts[0], window.ethereum);
      console.log(box)
      const space = await box.openSpace('DRetros');
      console.log(space)

      const thread = await space.joinThread("application_list", {
        firstModerator: accounts[0],
        members: false
      });
      console.log(thread)

      dispatch(addSettings3Box({
        account: accounts[0],
        profile: threeBoxProfile,
        box: box,
        space: space,
        thread: thread,
    }))
    }
  }

  return (
    <div className="panel-landing" id="section-1">
      <h1 className="landing-heading">Hello HFS!</h1>
      <p className="lead">
        <button
          className="btn btn-primary btn-lg"
          id="signin-button"
          onClick={handleSignIn.bind(this)}
        >
          Sign In with 3Box
          </button>
      </p>
    </div>
  );

}
