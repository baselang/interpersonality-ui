import React, { Component } from 'react';
import LocalizedStrings from 'react-localization';
import { Helmet } from 'react-helmet';

import signup_logo_small from '../Assets/images/v2/signup-logo-small.svg';

import { language } from './Language';
import url from '../CommonComponent/CommonURL';
import linkHeader from '../CommonComponent/Link';

let strings = new LocalizedStrings(language);

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            language_id: '',
            emailErrorMessage: '',
            serverErrorMessage: '',
            serverErrorMessage_one: ''
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)

        let language_id = localStorage.getItem("language_id");
        let auth = localStorage.getItem("auth")
        let user_id = localStorage.getItem("user_id")

        if(auth) {
            window.location.replace(`${url.ORIGIN_URL}/profile/${user_id}`)
        } 
        else {
            this.setState({
                language_id: language_id,
            })  
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        
        let data = {
            email: this.state.email
        }

        this.setState({loading: true})

        if(this.state.email === "") {
            this.setState({
                loading: false,
                emailErrorMessage: strings.FORGET_PASSWORD_EMAIL_REQUIRED_ERR,
                serverErrorMessage: ''
            });
            return;
        }

        var emailValid = this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        if(emailValid) {
            fetch(`${url.BASE_URL}/sendresetlink`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                    "x-api-key": url.X_API_KEY,
                    "language_id": this.state.language_id
                },
            }).then(response => response.json().then(data => ({ status: response.status, body: data })))
            .then(data => {
                if(data.status === 200) {
                    window.location.replace(`${url.ORIGIN_URL}/resetlinksuccessful`)
                } else if(data.status === 400) {
                    this.setState({
                        loading: false,
                        serverErrorMessage: data.body.message,
                        emailErrorMessage: '',
                        email: ''
                    });
                }
                else {
                    this.props.commanHandler("error500");
                }
            });
        }
        else {
            this.setState({
                loading: false,
                emailErrorMessage : strings.FORGET_PASSWORD_EMAIL_ERR,
                serverErrorMessage: ''
            });
            return;
        }
    }
    
    render() {
        const isEnabled = this.state.email.length > 0;

        strings.setLanguage(this.state.language_id);

        let headContent = linkHeader.map((lin, index) => {
            return (
                <link key={index} rel={lin.rel} hreflang={lin.hreflang} href={url.ORIGIN_URL + lin.href + "forgotpassword"} />
            )
        })

        return (
            <div className="">
                { this.state.loading && <div className="loader"></div> }
                <Helmet>
                    {headContent}
                </Helmet>
                <div className="lf-container has-brand">
                    { this.props.forgotPassMessage ?
                        <div className="lf-brand">
                            <a href="/">
                                <img src={ signup_logo_small } alt="" />
                            </a>
                        </div>
                        :
                        <div className="lf-brand">
                            <a  href="/">
                                <img src={ signup_logo_small } alt="" />
                            </a>
                            <a href="/login" className="back" >{strings.FORGET_PASSWORD_BTN}</a>
                        </div>
                    }
                    <div className="sf-wemail lf-wemail">
                        <h2 className="text-center">{ this.props.forgotPassMessage ? this.props.forgotPassMessage : strings.FORGET_PASSWORD_RESET_TITLE}</h2>
                        <form onSubmit={this.handleSubmit} id="password-form">
                            <div className="form-group">
                                <input type="text" name="email" value={this.state.email} onChange={this.handleChange} className="form-control" id="email" placeholder={strings.FORGET_PASSWORD_EMAIL} />
                            </div>
                            { this.state.emailErrorMessage ? <p className="text-center exists">{this.state.emailErrorMessage}</p> : "" }
                            { this.state.serverErrorMessage ? <p className="text-center exists">{this.state.serverErrorMessage}</p> : "" }
                            { this.props.forgotPassMessage ? 
                                <div className="form-group submit">
                                    <button type="submit" disabled={!isEnabled}>{strings.FORGET_PASSWORD_RESEND_LINK}</button>
                                </div>
                                :
                                <div className="form-group submit">
                                    <button type="submit" disabled={!isEnabled}>{strings.FORGET_PASSWORD_SEND_LINK_MSG}</button>
                                </div>
                            }
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default ForgotPassword;