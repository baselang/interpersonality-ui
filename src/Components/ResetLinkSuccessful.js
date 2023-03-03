import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import signup_logo_small from '../Assets/images/v2/signup-logo-small.svg'
import url from '../CommonComponent/CommonURL';
import LocalizedStrings from 'react-localization';
import { language } from './Language';
import linkHeader from '../CommonComponent/Link';
import renderHTML from 'react-render-html';

let strings = new LocalizedStrings(language);

class ResetLinkSuccessful extends Component {
    constructor() {
        super();
        this.state = {
            language_id: ''
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)

        let language_id = localStorage.getItem("language_id")

        this.setState({
            language_id: language_id
        })
    }


    render() {

        strings.setLanguage(this.state.language_id);

        let headContent = linkHeader.map((lin, index) => {
            return (
                <link key={index} rel={lin.rel} hreflang={lin.hreflang} href={url.ORIGIN_URL + lin.href + "resetlinksuccessful"} />
            )
        })
        
        return (
            <div className="">
                <Helmet>
                    {headContent}
                </Helmet>
                <div className="lf-container has-brand">
                    <div className="lf-brand">
                        <a href="/">
                            <img src={ signup_logo_small } alt="" />
                        </a>
                    </div>
                    <div className="lf-pwsent text-center">
                        <i className="fa fa-paper-plane" aria-hidden="true"></i>
                        {renderHTML(strings.FORGET_PASSWORD_RESET_MSG)}
                    </div>
                </div>
            </div>
        )
    }
}

export default ResetLinkSuccessful;