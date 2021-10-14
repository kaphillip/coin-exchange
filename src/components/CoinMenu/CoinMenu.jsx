//import React, { Component } from 'react'  //for class component use
import React, {useState} from 'react';  //for functional component use
import PropTypes from 'prop-types';
import styled from 'styled-components';


const Section = styled.section `
    font-size: 1rem;
    color:rgb(1, 15, 59);
    padding: 1.5rem 0 1.5rem 5 rem;
    display: inline-block;
`

const Section2 = styled.section `
    font-size: 1.55rem;
    font-family: "Arial", Gadget, sans-serif;
    font-weight: 700;
    color:rgb(1, 15, 59);
    padding: 1.5rem 0 1.5rem 5 rem;
    outline: 4px double rgba(28,110,164,0.26);
    outline-offset: 4px;
    box-sizing: initial;
    margin-left: 40rem;
    margin-right: 40rem;
    padding: 1rem;
`

//This will be updated with a specific coin, but default will be BTC
export default function CoinMenu(props){

    const helicopterClick = (event) => {
        event.preventDefault();
        props.increaseBalance();
    }

    const buyClick = (event) => {
        event.preventDefault();
        props.handleBuy(transactionAmount);
    }

    const sellClick = (event) => {
        event.preventDefault();
        props.handleSell(transactionAmount);
    }

    const [transactionAmount, setTransactionAmount] = useState(0);

    //Dynamically update the value based on user input
    const updateTransactionAmount = (event) => {
        setTransactionAmount(event.target.value);
    }


    return (
        <> 
        <br></br>
        <Section>
            <form action="#" method="POST">
                <label>Deploy Economic Stimulus  </label>
                <button className="myButton"
                onClick={helicopterClick}>BRRRRR</button>
            </form>
            <br></br><br></br>
            <Section2>
                <form action="#" method="POST">
                    <label>{props.coinMenuName} - {props.coinMenuTicker}</label>
                </form>
                <br></br>
                <form action="#" method="POST">
                <label className="quickLabel">$</label>
                    <input type="number" name="transactionAmount" 
                    value={transactionAmount} className="numericAmount"
                    onChange={updateTransactionAmount.bind()}></input>
                </form>
                <form action="#" method="POST">
                    <button className="myButton"
                    onClick={buyClick}>Buy</button>
                    <button className="myButton"
                    onClick={sellClick}>Sell</button>
                </form>
            </Section2>
        </Section>
        </>
    );
}

CoinMenu.propTypes = {
  transactionAmount: PropTypes.number
  ,coinMenuTickerId: PropTypes.string
  ,coinMenuTicker: PropTypes.string
}