import * as React from "react";
import _ from 'lodash';
import {Redirect} from "react-router";
import emojiMap from './EmojiMap';

const Papa = require("papaparse/papaparse.min.js");

class DataUploader extends React.Component {
    constructor() {
        super();
        this.state = {
            csvfile: undefined
        };
        this.updateData = this.updateData.bind(this);
    }

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    };

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/results'/>
        }
    };

    handleChange = event => {
        this.setState({
            csvfile: event.target.files[0]
        });
    };

    renderIconMapping = () => {
        return _.map(emojiMap, (key, value) => <tr>
            <td>{key}</td>
            <td>{value}</td>
        </tr>);
    };

    importCSV = () => {
        const {csvfile} = this.state;
        try {
            Papa.parse(csvfile, {
                complete: this.updateData,
                header: true
            });
        } catch (e) {
            //
        }

    };

    updateData(result) {
        let data = result.data;
        // TODO error check
        if (true) {
            this.props.updateData(data);
            this.setRedirect();
        } else {
        }
    }

    render() {
        console.log(this.state.csvfile);
        return (
            <>
                {this.renderRedirect()}
                <div className="container">
                    <div className="row">
                        <div className="col-sm">
                            <div className="uploadContainer">
                                <p className="lead">
                                    Please upload a .csv file with the following fields
                                </p>
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th scope="col">company</th>
                                        <th scope="col">date</th>
                                        <th scope="col">event</th>

                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>Twitter</td>
                                        <td>2/18/2019</td>
                                        <td>applied</td>

                                    </tr>
                                    <tr>
                                        <td>Twitter</td>
                                        <td>2/25/2019</td>
                                        <td>phone screen request</td>

                                    </tr>
                                    <tr>
                                        <td>...</td>
                                        <td>...</td>
                                        <td>...</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="uploadContainer">
                                <p className="lead">
                                    The following event values will be rendered with icons
                                </p>
                                <table className="table table-sm">
                                    <thead>
                                    <tr>
                                        <th scope="col">event</th>
                                        <th scope="col">icon</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.renderIconMapping()}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="col-sm">
                            <div className="uploadContainer text-left">
                                <h5>Import CSV</h5>
                                <input
                                    className="btn btn-light" type="file"
                                    ref={input => {
                                        this.filesInput = input;
                                    }}
                                    name="file"
                                    placeholder={null}
                                    onChange={this.handleChange}
                                />
                                <button className="btn btn-success uploadBtn" onClick={this.importCSV}> Upload now!
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </>
        );
    }
}

export default DataUploader;