//import React from 'react';
import React, {useState, useEffect} from 'react'; //no longer have to type "React." + useEffect
import './App.css';
import AccountBalance from './components/AccountBalance/AccountBalance';
import CoinList from './components/CoinList/CoinList';
import CoinHeader from './components/CoinHeader/CoinHeader';
import axios from 'axios';

 // const COIN_COUNT = 10;
  const formatPrice = price => parseFloat(Number(price).toFixed(2));

  function App (props) {
   //No longer needed
   /* state = {
      balance: 11000,
      toggleBalanceDisplay: true,
      coinData: [],
      coinMarkCapCount: 10
    }*/

    //Below are React hooks to replace above
    const [balance, setBalance] = useState(11000);
    const [toggleBalanceDisplay, setShowBalance] = useState(true);
    const [coinData, setCoinData] = useState([]);
    const [coinMarkCapCount, setCoinMarkCapCount] = useState(15);

//Will need to "actively" call componentDidMount for it to work in a functional environ vs class environ
    //call logic in useEffect; use componentDidMount for async call
    const componentDidMount = async () => {
      const rowCount = coinMarkCapCount;
      console.log(rowCount);
      const response = await axios.get('https://api.coinpaprika.com/v1/coins');
      const coinIds = response.data.slice(0, rowCount).map(coin => coin.id);
      const tickerUrl = 'https://api.coinpaprika.com/v1/tickers/';
      const promises = coinIds.map(id => axios.get(tickerUrl + id));
      const coinData = await Promise.all(promises);
      const coinPriceData = coinData.map(function(response) {
        const coin = response.data;
        return {
          key: coin.id, 
          id: coin.id,
          name: coin.name,
          ticker: coin.symbol,
          rank: coin.rank,
          balance: 0,
          price: formatPrice(coin.quotes.USD.price)
        };
      })
      //retrieve the prices here
      //old version// this.setState({ coinData: coinPriceData });
      setCoinData(coinPriceData);
    }

    useEffect(function() {
      //we only want to call this and load data, IF AND ONLY IF, we need the data
      if (coinData.length === 0) {
        componentDidMount();
      } 
      /* Not going to use this portion of logic
      else { // component did update }*/
    });

    /*be careful with below, you must reference the entire state "oldState" when changing a value
    otherwise you will overwrite the entire state with the new single value*/
    //setState(oldState => ({...oldState, balance: 11200}));

 const handleRefresh = async (valueChangeId) => {
    console.log(valueChangeId);
    const tickerUrl = `https://api.coinpaprika.com/v1/tickers/${valueChangeId}`;
    const response = await axios.get(tickerUrl);
    const newPrice = formatPrice(response.data.quotes.USD.price);
    console.log(newPrice);

    const newCoinData = /*this.state.*/coinData.map( function( values ) {
      let newValues = { ...values }; //shallow copy
      if ( valueChangeId === values.id) {
        newValues.price = newPrice;
        console.log(newValues.price);
      }
      return newValues;
    });
    console.log(newCoinData);
    //this.setState({coinData: newCoinData});
    setCoinData(newCoinData);
  }

   const toggleBalance = () => {
      //Replace old logic with better logic + React hook logic
      /*
      let newBalanceDisplay = this.state.toggleBalanceDisplay.valueOf();
      if ( newBalanceDisplay === true) { newBalanceDisplay = false; }
      else { newBalanceDisplay = true; }
      this.setState({toggleBalanceDisplay: newBalanceDisplay});*/
      setShowBalance(oldValue => !oldValue);
    }


//Removing this.state. below since we have access to the functions in this module
      return (
        <div className="App">
          <CoinHeader />
          <div>
            <AccountBalance amount={balance} 
                            showBalance={toggleBalanceDisplay}
                            toggleBalance={toggleBalance}/>
            <CoinList coinData={coinData} 
                      handleRefresh={handleRefresh} 
                      showCoinBalanceHeader={toggleBalanceDisplay}/>
          </div>
        </div>
      );
  }

export default App;
