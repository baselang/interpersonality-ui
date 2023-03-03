import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import signup_logo_small from '../Assets/images/v2/signup-logo-small.svg';
import * as $ from 'jquery';
import LocalizedStrings from 'react-localization';
import { language } from './Language';
import url from '../CommonComponent/CommonURL';
import country from '../CommonComponent/Country';

let strings = new LocalizedStrings(language);

class ResetPassword extends Component {
    constructor() {
        super();
        this.state = {
            newpassword: '',
            repassword: '',
            newpasswordErrorMessage: '',
            repasswordErrorMessage: '',
            serverErrorMessage: '',
            token: '',
            language_id: "",
            loading: true,
            btn_disabled: true
        }
    }
    componentDidMount() {
      
        let browser_url = window.location.href,
            params = browser_url.split(country.resetpassword)[1],
            token = params.split(".")[1];
        let language_id = params.split(".")[0];
        localStorage.setItem('language_id', language_id);

        this.setState({
            language_id: language_id,
            token: token
        })

        fetch(`${url.BASE_URL}/validatelink`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
                "x-api-key": url.X_API_KEY,
                "language_id": language_id,
                "Authorization": token
            },
        }).then(response => response.json().then(data => ({ status: response.status, body: data })))
        .then(data => {
            if( data.status === 200 ){
                this.setState({
                    loading: false
                })     
            }
            else if( data.status === 400 ){
                this.props.handleResetLinkExpireLink(data.body.message);
                this.setState({
                    loading: false
                })
            }
            else {
                this.props.commanHandler("error500");
            }
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        var newPassword = $('#newpassword').val().replace(/^\s*/, "")
        var confirmPassword = $('#confirmpassword').val().replace(/^\s*/, "")
        var newPasswordMatched = $('#newpassword').val().match(/^[a-zA-Z]+$/);
        var confirmPasswordMatched = $('#confirmpassword').val().match(/^[a-zA-Z]+$/);
        var newPasswordValid = $('#newpassword').val().match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*.,/';?<>(){}[|+_-]{6,}$/);
        var confirmPasswordValid = $('#confirmpassword').val().match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*.,/';?<>(){}[|+_-]{6,}$/)
        
        if(newPassword == '' && confirmPassword == '') {
            this.setState({newpasswordErrorMessage: strings.RESET_PASSWORD_PASSWORD_ERR, repasswordErrorMessage: ''})
        }else if(newPasswordMatched && confirmPasswordMatched) {
            if(newPasswordMatched == confirmPasswordMatched) {
                this.setState({newpasswordErrorMessage: strings.RESET_PASSWORD_PASSWORD_ERR, repasswordErrorMessage: ''})
            }
        } else {
            if(newPassword) {
                if(!newPasswordValid) {
                    
                    this.setState({
                        newpasswordErrorMessage: strings.RESET_PASSWORD_PASSWORD_ERR,
                        repasswordErrorMessage: ''
                    });
                } else {
                    if(newPasswordValid) {
                        
                        this.setState({
                            newpasswordErrorMessage: '',
                            repasswordErrorMessage: '',
                            btn_disabled: true
                        });
                    } else {
                        if(newPassword == confirmPassword) {
                            
                            this.setState({btn_disabled: false})
                        }else {
                            
                            this.setState({repasswordErrorMessage: '', btn_disabled: true})
                        }
                    }
                }
            }
            if(confirmPassword) {
                if(newPassword == '') {
                    this.setState({newpasswordErrorMessage: strings.RESET_PASSWORD_PASSWORD_ERR, repasswordErrorMessage: ''})
                } else {
                    if(!confirmPasswordValid) {
                        
                        this.setState({
                            repasswordErrorMessage: strings.RESET_PASSWORD_ERROR,
                            newpasswordErrorMessage: ''
                        });
                    } else {
                        this.setState({
                            repasswordErrorMessage: '',
                        });
                        if(newPassword == confirmPassword) {
                            
                            this.setState({btn_disabled: false})
                        }else {
                            
                            this.setState({repasswordErrorMessage: strings.RESET_PASSWORD_ERROR, newpasswordErrorMessage: '', btn_disabled: true})
                        }
                    }
                }
            } 
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        let data = {
            newpassword: this.state.repassword
        }

        this.setState({ loading: true})

        fetch(`${url.BASE_URL}/changepasswordbyemail`,{
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
                "x-api-key": url.X_API_KEY,
                "language_id": this.state.language_id,
                "Authorization": this.state.token
            },
        }).then(response => response.json().then(data => ({ status: response.status, body: data })))
        .then(data => {

            localStorage.setItem('auth', data.body.auth);
            localStorage.setItem('user_id', data.body.user_id);

            if(data.status === 200) {
                window.location.replace(`${url.ORIGIN_URL}/passwordupdatesuccessful`)
            }
            else {
                this.props.commanHandler("error500");
            }
        })
    }

    render() {

        strings.setLanguage(this.state.language_id);

        return (
            <div className="">
                { this.state.loading && <div className="loader"></div> }    
                <Helmet>
                    <meta name="robots" content="noindex" />
                </Helmet>
                <div className="test_mainnnn">
                    <div className="lf-container has-brand">
                        <div className="lf-brand">
                            <a href="/">
                                <img src={ signup_logo_small } alt="" />
                            </a>
                        </div>
                        <div className="sf-wemail lf-wemail">
                            <div className="lf-new-password-header">
                                <h2 className="text-center">{strings.RESET_PASSWORD_TITLE}</h2>
                                { this.state.newpasswordErrorMessage ? <p className="text-center">{this.state.newpasswordErrorMessage}</p>: "" }
                                { this.state.repasswordErrorMessage ? <p className="text-center">{this.state.repasswordErrorMessage}</p>: "" }
                                { this.state.serverErrorMessage ? <p className="text-center">{this.state.serverErrorMessage}</p>: "" }
                            </div>
                            <form  onSubmit={this.handleSubmit} id="password-form">
                                <div className="form-group">
                                    <input type="password" className="form-control"  name="newpassword" value={this.state.newpassword} onChange={this.handleChange} id="newpassword" placeholder={strings.RESET_PASSWORD_PLACEHOLDER} />
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control" name="repassword" value={this.state.repassword} onChange={this.handleChange} id="confirmpassword" placeholder={strings.RESET_PASSWORD_RE_ENTER_PLACEHOLDER} />
                                </div>
                                <p className="text-center exists"></p>
                                <div className="form-group submit">
                                    <button type="submit" disabled={this.state.btn_disabled}>{strings.RESET_PASSWORD_SAVE_MSG}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>    
        )
    }
}

export default ResetPassword;