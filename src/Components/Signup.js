import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import signup_logo_small from '../Assets/images/v2/signup-logo-small.svg';
import LocalizedStrings from 'react-localization';
import { language } from './Language';
import url from '../CommonComponent/CommonURL';
import linkHeader from '../CommonComponent/Link';
import renderHTML from 'react-render-html';
import {isMobile} from 'react-device-detect';
import '../Assets/css/style_manual.css'

let strings = new LocalizedStrings(language);

class Signup extends Component {
    constructor() {
        super();
        this.state = {
            rid: '',
            language_id: "",
            code: undefined,
            user_id: "",
            isRedirect: false,
            loading: true,
            error400: false,
            error400message: ''
        }
    }

    componentDidMount() {

        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = url.SDK_JS_SRC;
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    
        window.scrollTo(0, 0)
        let auth = localStorage.getItem("auth");
        let user_id = localStorage.getItem("user_id");
        let language_id = localStorage.getItem("language_id");
        let rid = localStorage.getItem("rid");
        localStorage.removeItem("questions")

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
        }else if(rid) {
            fetch(`${url.BASE_URL}/checktermsandcondition`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                    "x-api-key": url.X_API_KEY,
                    "language_id": language_id,
                    "rid": rid
                },
            }).then(response => response.json().then(data => ({ status: response.status, body: data })))
            .then(data => {
                if(data.body.terms_and_conditon === "accepted") {
                    this.setState({
                        rid: rid,
                        language_id: language_id,
                    })  
                }else if(data.body.terms_and_conditon === "not_accepted") {
                    window.location.replace(`${url.ORIGIN_URL}/test`)
                }  
            });
        }
        else {
            window.location.replace(`${url.ORIGIN_URL}`)
        }

        setTimeout(() => {
            this.setState({
                loading: false
            })
        },2000)
    
    }

   
    
    render() {

        strings.setLanguage(this.state.language_id);

        let fbBtnWidth = isMobile ? url.FACEBOOKBTNMOBILE : url.FACEBOOKBTNWEB;
        let fbBtnDivWidth = isMobile ? url.FACEBOOKBTNDIVMOBILE : url.FACEBOOKBTNDIVWEB;
        let headContent = linkHeader.map((lin, index) => {
            return (
                <link key={index} rel={lin.rel} hreflang={lin.hreflang} href={url.ORIGIN_URL + lin.href + "signup"} />
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
                        <a href="/" className="logo" >
                        <img alt="" src={ signup_logo_small } className="logo"  />
                        </a>
                        { renderHTML(strings.SIGNUP_TITLE) }
                    </div>
                    <div className="sf-buttons">
                        <div className="fb-btn-class">
                            <a id="facebookemailsignup" href={url.FACEBOOK_SIGNUP_URL} style={{width: fbBtnDivWidth, height: "40px", zIndex: 3, position: "absolute", backgroundColor: "transparent"}}>{""}</a>
                            <div className="fb-login-button" data-width={fbBtnWidth} data-size="large" data-button-type="continue_with" data-auto-logout-link="false" data-use-continue-as="true"></div>
                        </div>
                        {
                            this.state.error400 ? <div style={{ color: "#aaaaaa", padding: "18px 0px 8px" }}>
                                <p style={{ fontSize: "14px" }}>{this.state.error400message}</p>
                            </div> : ""
                        }
                        <a href="/signupwithemail" className="sf-btn-email signup_signupwithemail_btn" >{strings.SIGNUP_EMAIL}</a>
                    </div>
                </div>
            </div>
        )
    }
}
export default Signup;
