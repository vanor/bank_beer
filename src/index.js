import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import BeersList from './components/BeersList';
import BottomIndicator from './components/BottomIndicator';

class App extends Component{
    constructor(){
        super();
        this.state = {
            error: false,
            hasMore: true,
            isLoading: false,
            pageIndex: 1,
            beers: []
        };
    }

    componentDidMount(){
        this.getBeers(1);
        window.addEventListener("scroll", this.handleScroll, false);
    }

    componentWillUnmount(){
        window.removeEventListener("scroll", this.handleScroll, false);
    }

    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <br/>
                        <h1>All Beers</h1>
                        <hr/><br/>
                        <BeersList beers={this.state.beers} />
                        <BottomIndicator error={this.state.error} isLoading={this.state.isLoading} />
                    </div>
                </div>
            </div>
        )
    }

    getBeers(index){
        this.setState({isLoading: true}, () =>{
            axios.get('https://api.punkapi.com/v2/beers?page='+index+'&per_page=18')
            .then((res) => {
                const nextBeers = res.data;
                this.setState({
                    hasMore: (nextBeers.length === 18),
                    isLoading: false,
                    beers: this.state.beers.concat(nextBeers),
                    pageIndex: this.state.pageIndex + 1,
                });
                console.log(this.state.pageIndex);
            })
            .catch((err) => {
                this.setState({
                    error: true,
                    isLoading: false,
                });
                console.log(err.message);
            });
        });
    }

    handleScroll = () => {
        //To not do the request if there's an error or one request is in process or there are not beers remaining
        if(this.state.error || this.state.isLoading || !this.state.hasMore) return;

        if(window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight){
            this.getBeers(this.state.pageIndex);
        }
    }
};

ReactDOM.render(
    <App />,
    document.getElementById('root')
);