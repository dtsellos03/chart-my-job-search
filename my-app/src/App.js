import React from 'react';
import siteLogo from './siteLogo.png';
import './App.css';
import _ from 'lodash';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import UploadCSV from './DataUploader';
import Introduction from './Introduction';
import Results from './Results';
import ReactGA from 'react-ga';
import defaultData from './defaultData.js';

class AppRouter extends React.Component {
    state = {
        actualData: [],
        defaultData: defaultData
    };

    updateData = (newData) => {
        this.setState({actualData: newData})
    };

    render () {
        console.log(this.state);
        const props = this.state;
        return (
            <Router>
                <div className="container">
                    <nav className="navbar" role="navigation" aria-label="main navigation">
                        <div className="navbar-brand">
                            <a className="navbar-item">
                                <img src={siteLogo} width="190" height="70"/>
                            </a>
                        </div>
                    </nav>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item active">
                                    <a className="nav-link" href="#"><Link to="/">Intro</Link></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#"><Link to="/upload">Upload</Link></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#"><Link to="/results">Results</Link></a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
                <div className="App">
                    <div className="container">
                        <Route path="/upload/" render={() => <UploadCSV updateData={this.updateData}  /> } />
                        <Route path="/results/" render={() => <Results data={props.actualData} /> } />
                        <Route exact path="/" render={() => <Introduction data={props.defaultData} /> } />
                    </div>
                </div>
            </Router>
        );
    }
}

export default AppRouter;

