import React from 'react';
import './App.css';
import AccountBalance from './components/AccountBalance/AccountBalance';
import CoinList from './components/CoinList/CoinList';
import CoinHeader from './components/CoinHeader/CoinHeader';


  class App extends React.Component {
    state = {
      balance: 11000,
      toggleBalanceDisplay: true,
      coinData: [
        {
          name: 'Bitcoin',
          ticker: 'BTC',
          balance: 0.5,
          price: 41034.23
        },
        {
          name: 'Ethereum',
          ticker: 'ETH',
          balance: 32.0,
          price: 2122.49
        },
        {
          name: 'Monero',
          ticker: 'XMR',
          balance: 65.5,
          price: 238.08
        },
        {
          name: 'Cardano',
          ticker: 'ADA',
          balance: 5000.0,
          price: 1.27
        }
      ]
    }

    handleRefresh = (valueChangeTicker) => {
      console.log(valueChangeTicker);
      const newCoinData = this.state.coinData.map( function( values ) {
        let newValues = { ...values };
        if ( valueChangeTicker === values.ticker) {
          const randomPercentage = 0.995 + Math.random() * 0.01;
          newValues.price *= randomPercentage;
        }
        return newValues;
      });

      this.setState({coinData: newCoinData});
    }

    toggleBalance = (valueChangeDisplay) => {
      console.log(valueChangeDisplay);

      let newBalanceDisplay = this.state.toggleBalanceDisplay.valueOf();
      if ( newBalanceDisplay === true) {
        newBalanceDisplay = false;
      }
      else {
        newBalanceDisplay = true;
      }

      console.log(newBalanceDisplay);
      this.setState({toggleBalanceDisplay: newBalanceDisplay});
    }

    render() {
      return (
        <div className="App">
          <CoinHeader />
          <div>
            <AccountBalance amount={this.state.balance} 
                            showBalance={this.state.toggleBalanceDisplay}
                            toggleBalance={this.toggleBalance}/>
            <CoinList coinData={this.state.coinData} 
                      handleRefresh={this.handleRefresh} 
                      showCoinBalanceHeader={this.state.toggleBalanceDisplay}/>
          </div>
        </div>
      );

    }
  }

export default App;
