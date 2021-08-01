import React, { Component } from 'react'
import Coin from '../Coin/Coin';

/*changing this.state.coinData to this.props.coinData since the state is being
propogated down from the parent in App.js
*/

export default class CoinList extends Component {
    render() {
        return (
            <table className="coin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Ticker</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {
                this.props.coinData.map( value =>
                  <Coin key={value.ticker} {...value} />
                )
              }
            </tbody>
          </table>
        )
    }
}
