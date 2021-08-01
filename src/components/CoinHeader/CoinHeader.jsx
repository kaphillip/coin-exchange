import React, { Component } from 'react'
import logo from '../../../src/logo.svg';


export default class CoinHeader extends Component {
    render() {
        return (
            <div>
                <header className="App-header">
                    <img src={logo} alt="React logo" className="App-logo" />
                    <h1 className="App-title">
                      COIN EXCHANGE
                    </h1>
                </header>
            </div>
        )
    }
}
