import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { connect, keyStores, WalletConnection } from 'near-api-js'

import getConfig from '../config'


export default () => {
    const near = useSelector(state => state.retrospective.near)
    const [userAlias, setUserAlias] = useState('')

    const handleSignIn = async () => {
        const nearConfig = getConfig(process.env.NODE_ENV || 'testnet')

        const near = await connect({
            deps: {
                keyStore: new keyStores.BrowserLocalStorageKeyStore()
            },
            ...nearConfig
        })

        const walletConnection = new WalletConnection(near);

        walletConnection.requestSignIn(
            "example-contract.testnet",     // TODO: We need a contract 
            "DRetros",                      // TODO: Create a constant
        )
    }

    return (
        <div id="loginPage">
            <form className="form-signin">
                <div className="text-center mb-4">
                    <img className="mb-4" src="/images/logo-dretros.svg" alt="" width="72" height="72" />
                    <h1 className="h3 mb-3 font-weight-normal">DRetros</h1>
                    <p>Create Retrospective meetings and get full control of your data. <a href="https://brave.com">Works in latest Brave.</a></p>
                </div>
                <div class='input-group mb-3'>
                    <input
                        type='text'
                        class='form-control'
                        placeholder='user alias'
                        aria-label='user alias'
                        aria-describedby='button-addon2'
                        value={userAlias}
                        onChange={e => setUserAlias(e.target.value)}
                    />
                </div>

                <button
                    className="btn btn-lg btn-primary btn-block"
                    type="button"
                    onClick={handleSignIn.bind(this)}
                >
                    Sign in
                </button>
                <p className="mt-5 mb-3 text-muted text-center">&copy; {new Date().getFullYear()}</p>
            </form>
        </div>
    )
}
