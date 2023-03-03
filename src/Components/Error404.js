import React, { Component } from 'react';
import logo_404_gray from '../Assets/images/v2/404-logo-gray.svg';
import renderHTML from 'react-render-html';
import LocalizedStrings from 'react-localization';
import { language } from './Language';

let strings = new LocalizedStrings(language);

class Error404 extends Component {
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
                <div id="profile-content" className="main_onclick_lefthide">
                    <div className="error_mainnnnn">
                        <div className="error_imagee"><img src={ logo_404_gray } alt="img"/></div>
                        <div className="erorr_contenttt">
                            {renderHTML(strings.ERROR_404_CONTENT)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Error404;