import React, { Component } from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components';


const StyledTd = styled.td `
border: 1px solid #e9ebe4;
width: 25vh;
`

export default class CoinMarkCap extends Component {

    render() {
 /*        let mcName = null;
        let mcSymbol = null;
        let mcRank = null;

        if(this.props.buildCoinMarkCap) {
            mcName = <StyledTd>{this.props.name}</StyledTd>;
            mcSymbol = <StyledTd>{this.props.symbol}</StyledTd>;
            mcRank = <StyledTd>#{this.props.rank}</StyledTd>;
        }*/


        return (
            <tr>
              <StyledTd>{this.props.name}</StyledTd>
              <StyledTd>{this.props.symbol}</StyledTd>
              <StyledTd>#{this.props.rank}</StyledTd>
              <StyledTd>${this.props.price}</StyledTd>
            </tr>
          );
    }
}

CoinMarkCap.propTypes = {
    name: PropTypes.string.isRequired,
    symbol: PropTypes.string.isRequired,
    rank: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired
}
