//import React, { Component } from 'react'  //for class component use
import React from 'react';  //for functional component use
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Section = styled.section `
    border: 2px solid red;
    font-size: 2rem;
    padding: 1.5rem 0 1.5rem 5 rem;
`

export default function AccountBalance(props){

    const balanceClick = (event) => {
        // Prevent the default action of submitting the form
        event.preventDefault();
        props.toggleBalance();
    }

    //to switch to show balance from hide balance, the showBalance in App.js must be false 
    const buttonText = props.showBalance ? 'Hide Balance' : 'Show Balance';
    let content = null;

    if (props.showBalance) {
        //to ensure correct jsx, make sure you use a react fragment
        content = <>{props.amount}</>;
    }
    //original -- Balance: ${this.props.ammount}
    return (
        <>
        <h2>
            ACCOUNT BALANCE
        </h2>
        <Section>
            Balance: ${content}
            <form action="#" method="POST">
            <button onClick={balanceClick}>{buttonText}</button>
            </form>
        </Section>
        </>
    );
}

AccountBalance.propTypes = {
  amount: PropTypes.number.isRequired
  ,showBalance: PropTypes.bool.isRequired
}