//import React, { Component } from 'react'  //for class component use
import React, {useEffect, useRef} from 'react';  //for functional component use
import PropTypes from 'prop-types';
import Coin from '../Coin/Coin';
import CoinMenu from '../CoinMenu/CoinMenu';
//import axios from 'axios';

export default function CoinList(props) {
  let coinBalanceHeader = null;

  //1st Widget Load
  const _ref1 = useRef(null);
  const widgetScript1 = document.createElement('script');
  widgetScript1.src = 'https://widgets.coingecko.com/coingecko-coin-price-chart-widget.js';
  widgetScript1.async = true;
  const widgetLoad1 = (<coingecko-coin-price-chart-widget ref={_ref1} coin-id={props.coinMenuName} currency="usd" 
  height="237" width="700" locale="en"></coingecko-coin-price-chart-widget>);


  //2nd Widget Load
  const _ref2 = useRef(null);
  const widgetScript2 = document.createElement('script');
  widgetScript2.src = 'https://widgets.coingecko.com/coingecko-coin-converter-widget.js';
  widgetScript2.async = true;
  const widgetLoad2 = (<coingecko-coin-converter-widget ref={_ref2} coin-id={props.coinMenuName} currency="usd" 
  background-color="#ffffff" font-color="#4c4c4c" width="300" height="300" locale="en"></coingecko-coin-converter-widget>);


  useEffect(function() {
  _ref1.current.appendChild(widgetScript1);
  _ref2.current.appendChild(widgetScript2);
  //console.log("Ticker Build: " + _ref2 + "and" + _ref2.current + "and" + widgetScript2);
  });
  

  if (props.showCoinBalanceHeader) {
      coinBalanceHeader = <th>Balance</th>;
  }
    
  return (
    <div>
    <CoinMenu increaseBalance={props.increaseBalance}
    handleBuy={props.handleBuy}
    handleSell={props.handleSell}
    coinMenuTickerId={props.coinMenuTickerId}
    coinMenuTicker={props.coinMenuTicker}
    coinMenuName={props.coinMenuName}
    handleRefresh={props.handleRefresh}/>
        <br></br>    <br></br>
    <div className="coin-menu-widgets">
      {widgetLoad1}{widgetLoad2}
    </div>
    <br></br>
      <table className="coin-table">
      <thead>
        <tr>
          <th>Rank</th>
          <th>Name</th>
          <th>Ticker</th>
          {coinBalanceHeader}
          <th>Price</th>
          <th>Actions</th>
          <th>Quick Stats</th>
        </tr>
      </thead>
      <tbody>
        {
          props.coinData.map( ({id, rank, name, ticker, balance, price}) =>
          <Coin key={id} //should be key={key}
                id={id}
                handleRefresh={props.handleRefresh} 
                showCoinBalanceHeader={props.showCoinBalanceHeader}
                rank={rank}
                name={name} 
                ticker={ticker} 
                balance={balance}
                price={price} 
                UpdateWidget={props.UpdateWidget}/>
          )
        }
      </tbody>
    </table>
    </div>
  )
}
CoinList.propTypes = {
    showCoinBalanceHeader: PropTypes.bool.isRequired
  }
