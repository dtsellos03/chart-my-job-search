import * as React from "react";
import Results from "./Results";
import {Redirect} from "react-router";

class Introduction extends React.Component {

    state = {};

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    };

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/upload'/>
        }
    };

    render() {
        return (
            <>
                {this.renderRedirect()}
                <div className="container">
                    <br/>
                    <p className="lead">
                        You can use this site to visualize your job hunt - <a href="" className="link"
                                                                              onClick={this.setRedirect}>upload a
                        CSV</a> with relevant data to see a graph like this
                    </p>
                    <Results data={this.props.data}/>
                </div>
            </>
        );
    }
}

export default Introduction;