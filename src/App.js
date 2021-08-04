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
            name: 'Bitcoin',
            ticker: 'BTC',
            price: 41034.23
          },
          {
            name: 'Ethereum',
            ticker: 'ETH',
            price: 2122.49
          },
          {
            name: 'Monero',
            ticker: 'XMR',
            price: 238.08
          },
          {
            name: 'Cardano',
            ticker: 'ADA',
            price: 1.27
          }
        ]
      }
//adding logic as part of uplifting the state for handleRefresh; binding it to this state
      this.handleRefresh = this.handleRefresh.bind(this);
    }
    handleRefresh(valueChangeTicker) {
      //using the ticker as the query parameter, we will find the proper coin
      const newCoinData = this.state.coinData.map( function({ticker, name, price}) {
        let newPrice = price;
        if ( valueChangeTicker === ticker) {
          const randomPercentage = 0.995 + Math.random() * 0.01;
          newPrice= newPrice * randomPercentage;
        }
        return{
          ticker, //or ticker: ticker
          name,   //or name: name
          price: newPrice //different titles, so required to delineate between the 2
        }
      });

      this.setState({coinData: newCoinData});
    }


    render() {
      return (
        <div className="App">
          <CoinHeader />
          <div>
            <AccountBalance amount={this.state.balance} />
            <CoinList coinData={this.state.coinData} handleRefresh={this.handleRefresh} />
          </div>
        </div>
      );

    }
  }


export default App;
