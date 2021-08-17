import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import './AccountBalance.css';
import styled from 'styled-components';
//ignoring use of .css files, now using styled-components

const Section = styled.section `
    border: 2px solid red;
    font-size: 2rem;
    padding: 1.5rem 0 1.5rem 5 rem;
`

export default class AccountBalance extends Component {

    balanceClick = (event) => {
        // Prevent the default action of submitting the form
        event.preventDefault();
        this.props.toggleBalance(this.props.showBalance);
    }

    render() {
        //to switch to show balance from hide balance, the showBalance in App.js must be false 
        const buttonText = this.props.showBalance ? 'Hide Balance' : 'Show Balance';
        let content = null;

        if (this.props.showBalance) {
            //to ensure correct jsx, make sure you use a react fragment
            content = <>{this.props.amount}</>;
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
                <button onClick={this.balanceClick}>{buttonText}</button>
                </form>
            </Section>
            </>
        );
        //Other solution -- <button onClick={this.props.toggleBalance}>{buttonText}</button>
    }
}
//<Section className="account-balance">

AccountBalance.propTypes = {
  amount: PropTypes.number.isRequired
  ,showBalance: PropTypes.bool.isRequired
}