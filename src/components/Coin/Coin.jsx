import React, {useEffect, useRef} from 'react';  //for functional component use
import PropTypes from 'prop-types';
import styled from 'styled-components';


const StyledTd = styled.td `
border: 1px solid #e9ebe4;
width: 15vh;
`

const StyledWidget = styled.td `
border: 1px solid #e9ebe4;

height: 20vh;
`

export default function Coin(props) {
    
    const _ref3 = useRef(null);
    const widgetScript3 = document.createElement('script');
    widgetScript3.src = 'https://widgets.coingecko.com/coingecko-coin-ticker-widget.js';
    widgetScript3.async = true;
    const widgetLoad3 = (<coingecko-coin-ticker-widget ref={_ref3} coin-id={props.name} currency="usd" 
    locale="en" width="300" ></coingecko-coin-ticker-widget>);


    const handleClick = (event) => {
        // Prevent the default action of submitting the form
        event.preventDefault();
        props.handleRefresh(props.id);
    }

    let coinBalanceContent = null;

    useEffect(function() {
        _ref3.current.appendChild(widgetScript3);
        //console.log("Ticker Build: " + _ref3 + "and" + _ref3.current + "and" + widgetScript3);
        });


    if (props.showCoinBalanceHeader) {
        coinBalanceContent = <StyledTd>{props.balance}</StyledTd>;
    }


    return (
        <tr>
            <StyledTd>{props.rank}</StyledTd>
            <StyledTd>{props.name}</StyledTd>
            <StyledTd>{props.ticker}</StyledTd>
            {coinBalanceContent}
            <StyledTd>${props.price}</StyledTd>
            <StyledTd>
                <form action="#" method="POST">
                <button className="myButton"
                 onClick={handleClick}>View Details</button>
                </form>
            </StyledTd>
            <StyledWidget>{widgetLoad3}</StyledWidget>
        </tr>
        );
}

Coin.propTypes = {
    id: PropTypes.string.isRequired,
    rank: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    ticker: PropTypes.string.isRequired,
    balance: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired
}