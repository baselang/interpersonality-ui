import React, { Component } from 'react';
import error from '../Assets/images/error.png';
import renderHTML from 'react-render-html';
import LocalizedStrings from 'react-localization';
import { language } from './Language';

let strings = new LocalizedStrings(language);

class Error500 extends Component {
    constructor() {
        super();
        this.state = {
            language_id: ''
        }
    }

    componentDidMount() {
        let language_id = localStorage.getItem("language_id")
        this.setState({language_id: language_id });
    }

    render() {
        strings.setLanguage(this.state.language_id);
        return (
            <div>
                <div id="server-error">
                    <div className="server-error-inner">
                        <img alt="" src={ error } className="error" />
                        {renderHTML(strings.ERROR_500_CONTENT)}
                    </div>
                </div>
            </div>
        )
    }
}

export default Error500;
