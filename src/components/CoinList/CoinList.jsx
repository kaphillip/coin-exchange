//import React, { Component } from 'react'  //for class component use
import React from 'react';  //for functional component use
import PropTypes from 'prop-types';
import Coin from '../Coin/Coin';

export default function CoinList(props) {
  let coinBalanceHeader = null;

  if (props.showCoinBalanceHeader) {
      //to ensure correct jsx, make sure you use a react fragment
      coinBalanceHeader = <th>Balance</th>;
  }

  //Better Solution - ignore logic above and use this below instead
    //{this.props.toggleBalance ? <th>Balance</th> : null}
  return (
      <table className="coin-table">
      <thead>
        <tr>
          <th>Rank</th>
          <th>Name</th>
          <th>Ticker</th>
          {coinBalanceHeader}
          <th>Price</th>
          <th>Actions</th>
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
                price={price} />
          )
        }
      </tbody>
    </table>
  )
}
CoinList.propTypes = {
    showCoinBalanceHeader: PropTypes.bool.isRequired
  }
