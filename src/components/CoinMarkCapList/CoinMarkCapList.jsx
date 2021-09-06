import React, { Component } from 'react'
//import PropTypes from 'prop-types';
import CoinMarkCap from '../CoinMarkCap/CoinMarkCap';

/*changing this.state.coinData to this.props.coinData since the state is being
propogated down from the parent in App.js
*/

export default class CoinMarkCapList extends Component {

    render() {

        return (
            <table className="coin-markcap-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Ticker</th>
                <th>Rank</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {
                this.props.coinMarkCapData.map( ({name, symbol, rank, price}) =>
                <CoinMarkCap key={symbol} 
                      name={name}
                      symbol={symbol}
                      rank={rank}
                      price={price}
                      buildCoinMarkCap={this.props.buildCoinMarkCap} 
                      coinMarkCapCount={this.props.coinMarkCapCount}/>
                )
              }
            </tbody>
          </table>
        )
    }
}


/*
            <tbody>
              {
                this.props.coinMarkCapData.map( ({name, symbol, rank}) =>
                <CoinMarkCap key={symbol} 
                      name={name}
                      symbol={symbol}
                      rank={rank}
                      buildCoinMarkCap={this.props.buildCoinMarkCap} />
                )
              }
            </tbody>
*/

/*
            <tbody>
              {
                this.renderCoinMarkCapTableData()
              }
            </tbody>
*/