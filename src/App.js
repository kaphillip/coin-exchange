import React, {useState, useEffect} from 'react';
import './App.css';
import AccountBalance from './components/AccountBalance/AccountBalance';
import CoinList from './components/CoinList/CoinList';
import CoinHeader from './components/CoinHeader/CoinHeader';
import axios from 'axios';

const formatPrice = price => parseFloat(Number(price).toFixed(2));

function App (props) {

  const [balance, setBalance] = useState(11000);
  const [toggleBalanceDisplay, setShowBalance] = useState(true);
  const [coinData, setCoinData] = useState([]);
  //Will add coin count toggle in future iteration
  const [coinMarkCapCount, setCoinMarkCapCount] = useState(10);
  const [coinMenuTickerId, setcoinMenuTickerId] = useState("btc-bitcoin");
  const [coinMenuTicker, setcoinMenuTicker] = useState("BTC");
  const [coinMenuName, setcoinMenuName] = useState("Bitcoin");


  /***  Function Notes: Call and get list of tokens by rank, set the coinData state  ***/
  const componentDidMount = async () => {
    const rowCount = coinMarkCapCount;
    console.log(rowCount);
    const tickerUrl = await axios.get('https://api.coinpaprika.com/v1/tickers/');
    const coinList = tickerUrl.data.slice(0, rowCount);
    console.log(coinList);
    const coinPriceData = coinList.map(function( values ) {
      let coin = { ...values }; //shallow copy
      return {
        key: coin.id, 
        id: coin.id,
        name: coin.name,
        ticker: coin.symbol,
        rank: coin.rank,
        balance: 0,
        price: formatPrice(coin.quotes.USD.price)
      };
    });

    setCoinData(coinPriceData);
  }


  /***   Function Notes: Initiate the process of componentDidMount ***/
  useEffect(function() {
    if (coinData.length === 0) {
      componentDidMount();
    } 
  });


  /***  Function Notes: Set focus to target coin and update the listed price  ***/
  const handleRefresh = async (valueChangeId) => {
    console.log(valueChangeId, coinMenuTickerId);
    const tickerUrl = `https://api.coinpaprika.com/v1/tickers/${valueChangeId}`;
    const response = await axios.get(tickerUrl);
    const newPrice = formatPrice(response.data.quotes.USD.price);
    console.log(newPrice);

    const newCoinData = coinData.map( function( values ) {
      let newValues = { ...values }; //shallow copy
      if ( valueChangeId === values.id) {
        newValues.price = newPrice;
        console.log(newValues.price);
        setcoinMenuTicker(newValues.ticker);
        setcoinMenuName(newValues.name);
        console.log(newValues.ticker, newValues.name);
      }
      return newValues;
    });
    console.log(newCoinData);
    setCoinData(newCoinData);
    setcoinMenuTickerId(valueChangeId);
  }


  /***  Function Notes: Show/Hide Fiat/Coin Balance(s)  ***/
   const toggleBalance = () => {
      setShowBalance(oldValue => !oldValue);
    }


  /***  Function Notes: Fiat Printer go BRRRRR  ***/
    const increaseBalance = () => {
      let newBalance = balance;
      newBalance += 1200;
      console.log(newBalance);
      setBalance(newBalance);
    }


  /***  Function Notes: Per target coin, initiate a buy and update fiat/coin balance  ***/
  const handleBuy = (buyAmount) => {
    console.log(coinMenuTickerId, buyAmount);
    let newBalance = formatPrice(balance);
    let fiatBuy = formatPrice(buyAmount);
    const buyCoinData = coinData.map( function( values ) {
      let newValues = {...values};
      if (coinMenuTickerId === values.id) {
        /*insert logic updating token & fiat balance*/ 
        newBalance -= fiatBuy;
        if (newBalance < 0) {
          console.log("Not enough fiat available: " + newBalance);
          newBalance += fiatBuy;
        }
        else {
          newValues.balance = values.balance + (fiatBuy/values.price);
          console.log(newValues.balance);
        }
      }
      return newValues;
    });
    setCoinData(buyCoinData);
    setBalance(newBalance);
  }


  /***  Function Notes: Per target coin, initiate a sell and update fiat/coin balance  ***/
  const handleSell = (sellAmount) => {
    console.log(coinMenuTickerId, sellAmount);
    let newBalance = formatPrice(balance);
    let fiatSell = formatPrice(sellAmount);
    const sellCoinData = coinData.map( function( values ) {
      let newValues = {...values};
      if (coinMenuTickerId === values.id) {
        /*insert logic updating token & fiat balance*/ 
        if ((values.balance - (fiatSell/values.price)) < 0) {
          console.log("Not enough crypto available: " + 
                      (values.balance-(fiatSell/values.price)));
        }
        else {
          newBalance += fiatSell;
          newValues.balance = values.balance - (fiatSell/values.price);
          console.log("newBalance " + newBalance + ", new coin balance " + newValues.balance);
        }
      }
      return newValues;
    });
    setCoinData(sellCoinData);
    setBalance(newBalance);
  }


  return (
    <div className="App">
      <CoinHeader />
      <div>
        <AccountBalance amount={balance} 
                        showBalance={toggleBalanceDisplay}
                        toggleBalance={toggleBalance}/>

        <CoinList coinData={coinData} 
                  handleRefresh={handleRefresh} 
                  showCoinBalanceHeader={toggleBalanceDisplay}
                  increaseBalance={increaseBalance}
                  handleBuy={handleBuy}
                  handleSell={handleSell}
                  coinMenuTickerId={coinMenuTickerId}
                  coinMenuTicker={coinMenuTicker}
                  coinMenuName={coinMenuName}/>
      </div>
    </div>
  );
}

export default App;
