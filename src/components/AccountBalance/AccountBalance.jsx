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
    render() {
        return (
            <>
            <h2>
                ACCOUNT BALANCE
            </h2>
            <Section>
                ${this.props.amount}
            </Section>
            </>
        );
    }
}
//<Section className="account-balance">

AccountBalance.propTypes = {
    amount: PropTypes.number.isRequired
}