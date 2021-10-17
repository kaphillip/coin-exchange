import React, { Component } from 'react'

export default class TickerWidget extends Component{
    constructor(props) {
        super(props);
        this._ref = React.createRef();
    }

    componentDidMount = async () => {
        const script = document.createElement('script');
        script.src = 'https://www.livecoinwatch.com/static/lcw-widget.js'
        script.async = true;
        //script.innerHTML = JSON.stringify({});
        this._ref.current.appendChild(script);
        console.log("Ticker Widget header: " + this._ref + "and" + this._ref.current + "and" + script);
    }

    render() {
        return (
            <div className="livecoinwatch-widget-5" ref={this._ref}
            lcw-base="USD" lcw-color-tx="#ffffff" lcw-marquee-1="coins" 
            lcw-marquee-2="movers" lcw-marquee-items="10">
            </div>
        );
    }
}

