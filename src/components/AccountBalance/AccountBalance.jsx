import React from 'react';  //for functional component use
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TickerWidget from '../TickerWidget/TickerWidget';

const Section = styled.section `
    border: 2px solid whitesmoke;
    font-size: 1.55rem;
    padding: 2.5rem  2.5rem 5 rem;
    box-shadow: 2px 2px 7px 1px #1C6EA4;
    background-color: #8CBAFF;
    font-family: "Arial", Gadget, sans-serif;
    font-weight: 700;
    padding-top: 1rem;
`

export default function AccountBalance(props){

    const balanceClick = (event) => {
        event.preventDefault();
        props.toggleBalance();
    }
 
    const buttonText = props.showBalance ? 'Hide Balance' : 'Show Balance';
    let content = null;

    if (props.showBalance) {
        //to ensure correct jsx, make sure you use a react fragment
        content = <>{props.amount}</>;
    }

    return (
        <>
        <h1>
            ACCOUNT MENU
        </h1>
        <Section>
            BALANCE: ${content}
            <form action="#" method="POST">
            <button className="myButton" 
            onClick={balanceClick}>{buttonText}</button>
            </form>
            <br></br>
            <TickerWidget />
        </Section>
        <br></br>
        </>
    );
}

AccountBalance.propTypes = {
  amount: PropTypes.number.isRequired
  ,showBalance: PropTypes.bool.isRequired
}