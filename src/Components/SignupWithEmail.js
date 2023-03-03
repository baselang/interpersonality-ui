import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import renderHTML from 'react-render-html';
import signup_logo_small from '../Assets/images/v2/signup-logo-small.svg';
import $ from 'jquery';
import LocalizedStrings from 'react-localization';
import { language } from './Language';
import url from '../CommonComponent/CommonURL';
import linkHeader from '../CommonComponent/Link';
import {isMobile} from 'react-device-detect';

let strings = new LocalizedStrings(language);

class SignupWithEmail extends Component {
    constructor() {
        super();
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            rid: '',
            errorFirstname: '',
            errorLastname: '',
            errorEmail: '',
            errorPassword:'',
            errorServer: '',
            language_id: "",
            user_id: "",
            loading: true,
            referral_code: '',
            isEnabled: false,
            error400: false,
            error400message: ''
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)

        let auth = localStorage.getItem("auth");
        let user_id = localStorage.getItem("user_id");
        let language_id = localStorage.getItem("language_id");
        let rid = localStorage.getItem("rid");
        let referral_code = localStorage.getItem("referral_code");
        
        if (localStorage.getItem("error400") == 'active') {
            this.setState({
                error400: true,
                error400message: localStorage.getItem('errMessage')
            });

            localStorage.removeItem("error400")
            localStorage.removeItem('errMessage')
        }

        if(auth) {
            window.location.replace(`${url.ORIGIN_URL}/profile/${user_id}`)
        } else if(rid) {
            this.setState({
                rid: rid,
                language_id: language_id,
                referral_code: referral_code
            })  
        }
        else{
            window.location.replace("/test")
        }

        setTimeout(() => {
            this.setState({
                loading: false
            })
        },2000);

        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = url.SDK_JS_SRC;
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
        
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        var emailValid = $('#email').val().match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{1,})$/i);
        var passwordValid = $('#password').val().match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*.,/';?<>(){}[|+_-]{6,}$/)
        if(!emailValid) {
            this.setState({
                loading: false,
                errorEmail: strings.SIGNUP_FORM_EMAIL_ERR,
                isEnabled:false
            });
            if(!passwordValid) {
                this.setState({
                    loading: false,
                    errorPassword: strings.SIGNUP_FORM_PASSWORD_ERR   
                });
            }else{
                this.setState({
                    errorPassword: ""        
                });
            }
        }else{
            this.setState({
                errorEmail: ""
            });
            if(!passwordValid) {
                this.setState({
                    loading: false,
                    errorPassword: strings.SIGNUP_FORM_PASSWORD_ERR,
                    isEnabled: false
                });
            }else{
                this.setState({
                    errorPassword: "",
                    isEnabled: true
                });
            }
        }    
        
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if( (this.state.rid && this.state.rid != null) && ( this.state.language_id && this.state.language_id != null ))
        {

            let data = {
                rid: this.state.rid,
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                email: this.state.email,
                password: this.state.password
            }

            this.setState({loading: true})

            if(this.state.firstname === "") {
                this.setState({
                    loading: false,
                    errorFirstname: strings.SIGNUP_FORM_REQUIRED_F_NAME_ERR,
                    errorLastname: '',
                    errorEmail: '',
                    errorPassword: ''
                });
                return;
            }

            if(this.state.lastname === "") {
                this.setState({
                    loading: false,
                    errorLastname: strings.SIGNUP_FORM_REQUIRED_L_NAME_ERR,
                    errorFirstname: '',
                    errorEmail: '',
                    errorPassword: ''
                });
                return;
            }
            if(this.state.email === "") {
                this.setState({
                    loading: false,
                    errorEmail: strings.SIGNUP_FORM_REQUIRED_EMAIL_ERR,
                    errorFirstname: '',
                    errorLastname: '',
                    errorPassword: ''
                });
                return;
            }
            var emailValid = this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{1,})$/i);
            if(!emailValid) {
                this.setState({
                    loading: false,
                    errorEmail: strings.SIGNUP_FORM_EMAIL_ERR,
                    errorFirstname: '',
                    errorLastname: '',
                    errorPassword: ''
                });
                return;
            }    

            if(this.state.password === "")  {
                this.setState({
                    loading: false,
                    errorPassword: strings.SIGNUP_FORM_REQUIRED_PASSWORD_ERR,
                    errorEmail: '',
                    errorFirstname: '',
                    errorLastname: '',
                });
                return;
            }
            var passwordValid = this.state.password.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*.,/';?<>(){}[|+_-]{6,}$/)
            if(passwordValid) {
                fetch(`${url.BASE_URL}/signup`, {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Credentials": true,
                        "x-api-key": url.X_API_KEY,
                        "language_id": this.state.language_id,
                        "referral_code": this.state.referral_code

                    },
                }).then(response => response.json().then(data => ({ status: response.status, body: data })))
                .then(data => {
                    if(data.status === 200) {
                        localStorage.removeItem("profile")
                        localStorage.setItem("auth", data.body.auth)
                        localStorage.setItem("user_id", data.body.user_id)
                        localStorage.setItem("language_id", data.body.language_id)
                        this.setState({
                            user_id: data.body.user_id,
                        })
                        window.location.replace(`${url.ORIGIN_URL}/profile/${data.body.user_id}`)
                    }
                    else if(data.status === 400) {
                        this.setState({
                            loading: false,
                            errorServer: data.body.message,
                            errorPassword: "",
                            errorEmail: '',
                            errorFirstname: '',
                            errorLastname: '',
                            firstname: '',
                            lastname: '',
                            email: '',
                            password: '',
                            message: ''
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
                    errorPassword: strings.SIGNUP_FORM_PASSWORD_ERR,
                    errorEmail: '',
                    errorFirstname: '',
                    errorLastname: '',
                });
                return;
            }
        }else{
            this.props.commanHandler("error500");
        }   
    }


    render() {
        let fbBtnWidth = isMobile ? url.FACEBOOKBTNMOBILE : url.FACEBOOKBTNWEB;
        let fbBtnDivWidth = isMobile ? url.FACEBOOKBTNDIVMOBILE : url.FACEBOOKBTNDIVWEB;  
        strings.setLanguage(this.state.language_id);
        
        let headContent = linkHeader.map((lin, index) => {
            return (
                <link key={index} rel={lin.rel} hreflang={lin.hreflang} href={url.ORIGIN_URL + lin.href + "signupwithemail"} />
            )
        })

        return (
            <div>
                { this.state.loading && <div className="loader"></div> }
                <Helmet>
                    {headContent}
                    <title>{strings.SIGNUP_META_TITLE}</title>
                </Helmet>
                <div className="sf-container">
                    <div className="sf-header text-center">
                        <a href="/" className="logo">
                        <img alt="" src={ signup_logo_small } className="logo" />
                        </a>
                        {renderHTML(strings.SIGNUP_FORM_TITLE)}
                    </div>
                    <div className="sf-buttons">
                        <div>
                            <a id="facebookemailsignup" onClick={()=>{localStorage.setItem("redirectedFromSignup",true)}} href={url.FACEBOOK_SIGNUP_URL} style={{width: fbBtnDivWidth, height: "40px", zIndex: 3, position: "absolute", backgroundColor: "transparent"}}></a>
                            <div className="fb-login-button" data-width={fbBtnWidth} data-size="large" data-button-type="continue_with" data-auto-logout-link="false" data-use-continue-as="true"></div>
                        </div>
                        {
                            this.state.error400 ? <div style={{ color: "#aaaaaa", padding: "18px 0px 8px" }}>
                                <p style={{ fontSize: "14px" }}>{this.state.error400message}</p>
                            </div> : ""
                        }
                    </div>
                    <div className="sf-wemail">
                        <h3 className="text-center">{strings.SIGNUP_FORM_HEADING}</h3>
                        <form onSubmit={this.handleSubmit} id="signup-form">
                            <div className="form-group">
                                <input type="text" className="form-control" name="firstname" value={this.state.firstname} onChange={this.handleChange} id="firstname" placeholder={strings.SIGNUP_FORM_F_NAME} />
                                { this.state.errorFirstname ? <span className="error">{this.state.errorFirstname}</span> : "" }
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" name="lastname" value={this.state.lastname} onChange={this.handleChange} id="lastname" placeholder={strings.SIGNUP_FORM_L_NAME} />
                                { this.state.errorLastname ? <span className="error">{this.state.errorLastname}</span> : "" }
                            </div>
                            <div className="form-group">
                                <input type="email" className="form-control" name="email" value={this.state.email} onChange={this.handleChange} id="email" placeholder={strings.SIGNUP_FORM_EMAIL} />
                                { this.state.errorEmail ? <span className="error">{this.state.errorEmail}</span> : "" }
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" name="password" value={this.state.password} onChange={this.handleChange}  id="password" placeholder={strings.SIGNUP_FORM_PASSWORD} />
                                { this.state.errorPassword ? <span className="error">{this.state.errorPassword}</span> : "" }
                            </div>
                            { this.state.errorServer ? <p className="text-center exists">{this.state.errorServer} <a href="/login">{strings.SIGNUP_FORM_LOGIN_QUS}</a></p> : "" }
                            <div className="form-group submit">
                                <button type="submit" className="btn btn-primary" disabled={!this.state.isEnabled}>{strings.SIGNUP_FORM_BTN}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignupWithEmail;