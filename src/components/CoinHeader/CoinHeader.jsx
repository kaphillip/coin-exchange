import React, { Component } from 'react'
//import logo from '../../../src/logo.svg';
import bitcoin from '../../../src/bitcoin.png';
import ethereum from '../../../src/ethereum-logo2.png';


export default class CoinHeader extends Component {
    render() {
        return (
            <div>
                <header className="App-header">
                    <img src={bitcoin} alt="bitcoin logo" className="App-logo" />
                    <h1 className="App-title">
                      COIN EXCHANGE
                    </h1>
                    <img src={ethereum} alt="ethereum logo" className="App-logo" />
                </header>
            </div>
        )
    }
}
