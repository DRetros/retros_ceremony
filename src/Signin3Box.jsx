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
      const space = await box.openSpace('dretros');
      console.log("Last login saved")
      let lastLoginSaved = await space.public.get("lastLogin")
      console.log(lastLoginSaved)
      let date = new Date()
      console.log("Adding last login")
      let lastLogin = ("00" + date.getDate()).slice(-2) + "/" + ("00" + (date.getMonth() + 1)).slice(-2) + "/" +date.getFullYear() + " " +("00" + date.getHours()).slice(-2) + ":" +("00" + date.getMinutes()).slice(-2) + ":" +("00" + date.getSeconds()).slice(-2)
      console.log(lastLogin)
      space.public.set("lastLogin", lastLogin)

      //await space.public.remove('retrospectives');

      dispatch(addSettings3Box({
        account: accounts[0],
        profile: threeBoxProfile,
        box: box,
        space: space,
    }))
    }
  }

  return (
    <div id="loginPage">
      <form class="form-signin">
      <div class="text-center mb-4">
        <img class="mb-4" src="/images/logo-dretros.svg" alt="" width="72" height="72" />
        <h1 class="h3 mb-3 font-weight-normal">DRetros</h1>
        <p>Create Retrospective meetings and get full control of your data. <a href="https://brave.com">Works in latest Brave.</a></p>
      </div>

      <button class="btn btn-lg btn-primary btn-block" type="button" onClick={handleSignIn.bind(this)}>Sign in</button>
      <p class="mt-5 mb-3 text-muted text-center">&copy; 2020</p>
    </form>
    </div>
  );

}
