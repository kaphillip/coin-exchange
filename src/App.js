import React from 'react';
import './App.css';
import AccountBalance from './components/AccountBalance/AccountBalance';
import CoinList from './components/CoinList/CoinList';
//moving Coin import to CoinList.jsx, and adding CoinList import here
import CoinHeader from './components/CoinHeader/CoinHeader';
//moving Header and coinlogo import to CoinHeader.jsx, 

//when converting from a Function to a Class-based component
//you'll need to update the component header, and wrap the return
//statement within a render()

//function App() {
  class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        balance: 10000,
        coinData: [
          {
            coin: 'Bitcoin',
            ticker: 'BTC',
            price: 41034.23
          },
          {
            coin: 'Ethereum',
            ticker: 'ETH',
            price: 2122.49
          },
          {
            coin: 'Monero',
            ticker: 'XMR',
            price: 238.08
          },
          {
            coin: 'Cardano',
            ticker: 'ADA',
            price: 1.27
          }
        ]
      }

    }
    render() {
      return (
        <div className="App">
          <CoinHeader />
          <div>
            <AccountBalance amount={this.state.balance} />
            <CoinList coinData={this.state.coinData} />
          </div>
        </div>
      );

    }
  }


export default App;
