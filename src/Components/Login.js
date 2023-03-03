import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import signup_logo_small from '../Assets/images/v2/signup-logo-small.svg'

import LocalizedStrings from 'react-localization';
import { language } from './Language';
import url from '../CommonComponent/CommonURL';
import linkHeader from '../CommonComponent/Link';
import {isMobile} from 'react-device-detect';

let strings = new LocalizedStrings(language);

class Login extends Component {
    constructor(props) { 
        super(props);
        this.state = {
            email: '',
            password: '',
            emailErrorMessage: '',
            passwordErrorMessage: '',
            serverErrorMessage: '',
            language_id: "",
            user_id: "",
            loading: true,
            error400: false,
            error400message: ''
        }
    }

    componentDidMount() {

        window.scrollTo(0,0);

        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = url.SDK_JS_SRC;
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        if (localStorage.getItem("error400") == 'active') {
            this.setState({
                error400: true,
                error400message: localStorage.getItem('errMessage')
            });

            localStorage.removeItem("error400")
            localStorage.removeItem('errMessage')
        }

        let language_id = localStorage.getItem("language_id");
        let auth = localStorage.getItem("auth");
        let user_id = localStorage.getItem("user_id");
        localStorage.removeItem("questions")

        if(auth)
            window.location.replace(`${url.ORIGIN_URL}/profile/${user_id}`)
        else{
            this.setState({
                language_id: language_id,
                loading: false
            })
        }
    }

    emailChange = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    passwordChange = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    handleSubmit = (e) => {

        e.preventDefault();
        let data = {
            email: this.state.email,
            password: this.state.password
        }

        this.setState({loading: true})

        if( this.state.email === "" ) {
            this.setState({
                loading: false,
                emailErrorMessage: strings.LOGIN_EMAIL_REQUIRED_ERR,
                passwordErrorMessage: '',
                serverErrorMessage: ''
            });
            return;
        }

        var emailValid = this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        if(emailValid) {
            if( this.state.password === "" ) {
                this.setState({
                    loading: false,
                    passwordErrorMessage: strings.LOGIN_PASSWORD_REQUIRED_ERR,
                    emailErrorMessage: '',
                    serverErrorMessage: ''
                });
                return;
            }
            
            fetch(`${url.BASE_URL}/signin`, {
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
                    localStorage.removeItem("profile")
                    localStorage.setItem("auth", data.body.auth)
                    localStorage.setItem("user_id", data.body.user_id)
                    localStorage.setItem("rid", data.body.rid)
                    localStorage.setItem("language_id", data.body.language_id)
                    window.location.replace(`${url.ORIGIN_URL}/profile/${data.body.user_id}`)
                }
                else if(data.status === 400) {
                    this.setState({ 
                        loading: false,
                        serverErrorMessage: data.body.message,
                        passwordErrorMessage: '',
                        emailErrorMessage: '',
                        email: '',
                        password: ''
                    })
                }
                else {
                    this.props.commanHandler("error500");
                }
            });   
        }
        else {
            this.setState({
                loading: false,
                emailErrorMessage: strings.LOGIN_EMAIL_ERR,
                passwordErrorMessage: '',
                serverErrorMessage: ''
            });
            return;
        }    

    }

    render() {

        const { email, password } = this.state;
        const isEnabled = email.length > 0 && password.length > 0;
        let fbBtnWidth = isMobile ? url.FACEBOOKBTNMOBILE : url.FACEBOOKBTNWEB;
        let fbBtnDivWidth = isMobile ? url.FACEBOOKBTNDIVMOBILE : url.FACEBOOKBTNDIVWEB;
        
        strings.setLanguage(this.state.language_id);

        let headContent = linkHeader.map((lin, index) => {
            return (
                <link key={index} rel={lin.rel} hreflang={lin.hreflang} href={url.ORIGIN_URL+lin.href+"login"}/>
            )
        })

        return (
            <div>
                { this.state.loading && <div className="loader"></div> }
                <Helmet>
                    {headContent}
                    <title>{strings.LOGIN_META_TITLE}</title>
                    <meta name="description" content={strings.LOGIN_META_DESCRIPTION} />
                </Helmet>
                <div className="lf-container">
                    <div className="lf-header text-center">
                        <a href="/"><img alt="" src={signup_logo_small} className="logo"/></a>
                        <h2>{strings.LOGIN_TITLE}</h2>
                        <p>{strings.LOGIN_WLCM_BCK_MSG}</p>
                    </div>
                    <div className="sf-buttons lf-buttons">
                        <div>
                            <a href={url.FACEBOOK_LOGIN_URL} style={{width: fbBtnDivWidth, height: "40px", zIndex: 3, position: "absolute", backgroundColor: "transparent"}}></a>
                            <div className="fb-login-button" data-width={fbBtnWidth} data-size="large" data-button-type="continue_with" data-auto-logout-link="false" data-use-continue-as="true"></div>
                        </div>
                        {
                            this.state.error400 ? <div style={{ color: "#aaaaaa", padding: "18px 0px 8px" }}>
                                <p style={{ fontSize: "14px" }}>{this.state.error400message}</p>
                            </div> : ""
                        }
                    </div>
                    <div className="sf-wemail lf-wemail">
                        <h3 className="text-center">{strings.LOGIN_WITH_EMAIL_TITLE}</h3>
                        <form onSubmit={ this.handleSubmit } id="login-form">
                            <div className="form-group">
                                <input type="text" className="form-control" name="email" value={this.state.email} onChange={this.emailChange} id="email" placeholder={strings.LOGIN_EMAIL} />
                                { this.state.emailErrorMessage ? <span className="error">{this.state.emailErrorMessage}</span>: "" }
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" name="password" value={this.state.password} onChange={this.passwordChange} id="password" placeholder={strings.LOGIN_PASSWORD} />
                                { this.state.passwordErrorMessage ? <span className="error">{this.state.passwordErrorMessage}</span>: "" }
                            </div>
                            { this.state.serverErrorMessage ? <p className="text-center exists">{this.state.serverErrorMessage}</p>: "" }
                            <div className="form-group submit">
                                <button type="submit" disabled={!isEnabled}>{strings.LOGIN_BTN}</button>
                            </div>
                            <p className="text-center forgot">
                                <a href="/forgotpassword"><strong>{strings.LOGIN_FORGET_BTN}</strong></a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>    
        )
    }
}

export default Login;