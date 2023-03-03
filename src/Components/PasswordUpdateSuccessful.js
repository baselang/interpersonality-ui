import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

import check_circle from '../Assets/images/check-circle.svg';
import signup_logo_small from '../Assets/images/v2/signup-logo-small.svg';

import LocalizedStrings from 'react-localization';
import { language } from './Language';
import url from '../CommonComponent/CommonURL';
import linkHeader from '../CommonComponent/Link';
import renderHTML from 'react-render-html';

let strings = new LocalizedStrings(language);

class PasswordUpdateSuccessful extends Component {
    constructor() {
        super();
        this.state = {
            auth: '',
            language_id: '',
            user_id: ''
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)

        let user_id = localStorage.getItem('user_id');
        let auth = localStorage.getItem('auth');
        let language_id = localStorage.getItem('language_id');

        this.setState({
            user_id: user_id,
            auth: auth,
            language_id: language_id
        })

        if(auth){
        fetch(`${url.BASE_URL}/getuserdetails`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
                "x-api-key": url.X_API_KEY,
                "user_id": user_id,
                "Authorization": auth
            }
        }).then(response => response.json().then(data => ({ status: response.status, body: data })))
        .then(data => {
            
            if(data.status === 200) {

                localStorage.setItem('auth', data.body.auth);
                localStorage.setItem('user_id', data.body.user_id);
                localStorage.setItem('language_id', data.body.language_id);

                let language_id = localStorage.getItem('language_id')
                let auth = localStorage.getItem('auth')
                let user_id = localStorage.getItem('user_id')

                this.setState({
                    language_id: language_id,
                    auth: auth,
                    user_id: user_id,
                })
                window.location.replace(`${url.ORIGIN_URL}/profile/${data.body.user_id}`)
            }
            else {
                this.props.commanHandler("error500");
            }
        })}else{
            this.props.commanHandler("redirectToHome");
        }
    }

    render() {

        strings.setLanguage(this.state.language_id);

        let headContent = linkHeader.map((lin, index) => {
            return (
                <link key={index} rel={lin.rel} hreflang={lin.hreflang} href={url.ORIGIN_URL + lin.href + "passwordupdatesuccessful"} />
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
                    <div className="lf-pwsuccess text-center">
                        <img src={ check_circle } alt="" />
                        {renderHTML(strings.PASSWORD_SUCCESS_MSG)}
                    </div>
                </div>
            </div>
        )
    }
}

export default PasswordUpdateSuccessful;