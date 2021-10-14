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
  const [coinMarkCapCount, setCoinMarkCapCount] = useState(5);
  const [coinMenuTickerId, setcoinMenuTickerId] = useState("btc-bitcoin");
  const [coinMenuTicker, setcoinMenuTicker] = useState("BTC");
  const [coinMenuName, setcoinMenuName] = useState("Bitcoin");


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
    //old version// this.setState({ coinData: coinPriceData });
    setCoinData(coinPriceData);
  }


  useEffect(function() {
    //we only want to call this and load data, IF AND ONLY IF, we need the data
    if (coinData.length === 0) {
      componentDidMount();
    } 
  });


 const handleRefresh = async (valueChangeId) => {
    console.log(valueChangeId);
    console.log(coinMenuTickerId);
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


   const toggleBalance = () => {
      setShowBalance(oldValue => !oldValue);
    }


    const increaseBalance = () => {
      let newBalance = balance;
      newBalance += 1200;
      console.log(newBalance);
      setBalance(newBalance);
    }


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
          console.log(newBalance);
          console.log(newValues.balance);
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
