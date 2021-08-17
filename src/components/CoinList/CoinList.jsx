import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Coin from '../Coin/Coin';

/*changing this.state.coinData to this.props.coinData since the state is being
propogated down from the parent in App.js
*/

export default class CoinList extends Component {
    render() {
        let coinBalanceHeader = null;

        if (this.props.showCoinBalanceHeader) {
            //to ensure correct jsx, make sure you use a react fragment
            coinBalanceHeader = <th>Balance</th>;
        }

        //Better Solution - ignore logic above and use this below instead
          //{this.props.toggleBalance ? <th>Balance</th> : null}
        return (
            <table className="coin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Ticker</th>
                {coinBalanceHeader}
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                this.props.coinData.map( ({name, ticker, balance, price}) =>
                <Coin key={ticker} 
                      handleRefresh={this.props.handleRefresh} 
                      showCoinBalanceHeader={this.props.showCoinBalanceHeader}
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
}
CoinList.propTypes = {
    showCoinBalanceHeader: PropTypes.bool.isRequired
  }
//uplifting the state with handleRefresh