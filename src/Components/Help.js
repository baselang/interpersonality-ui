import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

import { language } from "./Language";
import LocalizedStrings from 'react-localization';
import linkHeader from '../CommonComponent/Link';
import url from '../CommonComponent/CommonURL';
import renderHTML from 'react-render-html';

let strings = new LocalizedStrings(language);

class Help extends Component {
    constructor() {
        super();
        this.state = {
            language_id: ''
        }
    }

    componentDidMount() {
        let language_id = localStorage.getItem("language_id")
        this.setState({
            language_id: language_id
        })
    }

    render() {

        strings.setLanguage(this.state.language_id);

        let headContent = linkHeader.map((lin, index) => {
            return (
                <link key={index} rel={lin.rel} hreflang={lin.hreflang} href={url.ORIGIN_URL+lin.href+"settings"}/>
            )
        })

        let mailTo = `mailto:${url.Email}`;
        let mail = url.Email;
        
        return (
            <div>
                <Helmet>
                    { headContent }
                </Helmet>
                <div className="right_side_barr setting_righbarr">
                    <div id="help-container" className="help-container">
                        <div id="help-begin" className="help-step">
                            <div className="help-header help-header-text">
                                {renderHTML(strings.formatString(strings.SETTINGS_HELP_DESC, mailTo, mail))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Help;
