import React, { Component } from 'react';
import url from '../CommonComponent/CommonURL';


class FacebookSignupIntermediate extends Component {
    constructor() {
        super();
        this.state = {
            loading: true
        }
    }

    componentDidMount() {

        window.scrollTo(0, 0);
        let language_id = localStorage.getItem("language_id");
        let referral_code = localStorage.getItem("referral_code");
        let rid = localStorage.getItem("rid");
        const queryString = require('query-string');
        // const parsed = queryString.parse(this.props.location.search);
        let parsed = queryString.parse(this.props.facebookqueryStringProps);
        if(language_id == this.props.defaultLang)
            parsed = queryString.parse(this.props.location.search);
        
        let data = {
            rid: rid
        }

        if (parsed.code && rid != null) {
            fetch(`${url.BASE_URL}/facebooksignup`, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                    "x-api-key": url.X_API_KEY,
                    "language_id": language_id,
                    "code": parsed.code,
                    "referral_code": referral_code
                }
            }).then(response => response.json().then(data => ({ status: response.status, body: data })))
            .then(data => {
                if(data.body.is_account_already_exist === true) {
                    localStorage.removeItem("profile")
                    localStorage.setItem("auth", data.body.auth)
                    localStorage.setItem("firstname", data.body.firstname)
                    localStorage.setItem("rid", data.body.rid)
                    localStorage.setItem("old_rid", data.body.old_rid)
                    localStorage.setItem("user_id", data.body.user_id)
                    localStorage.setItem("old_user_id", data.body.old_user_id)
                    localStorage.setItem("language_id", data.body.language_id);
                    if(localStorage.getItem('redirectedFromSignup') === "true")
                        localStorage.removeItem('redirectedFromSignup');
                    window.location.replace(`${url.ORIGIN_URL}/facebookaccountexist`)
                }else if(data.status === 200) {
                    
                    localStorage.removeItem("profile")
                    localStorage.setItem("auth", data.body.auth)
                    localStorage.setItem("firstname", data.body.firstname)
                    localStorage.setItem("rid", data.body.rid)
                    localStorage.setItem("user_id", data.body.user_id)
                    localStorage.setItem("language_id", data.body.language_id)
                    localStorage.removeItem("old_rid")
                    localStorage.removeItem("old_user_id")
                    if(localStorage.getItem('redirectedFromSignup') === "true")
                        localStorage.removeItem('redirectedFromSignup');
                    window.location.replace(`${url.ORIGIN_URL}/profile/${data.body.user_id}`)
                }else if (data.status === 400) {
                   
                    localStorage.setItem("error400", "active")
                    localStorage.setItem ("errMessage",data.body.message);
                    if(localStorage.getItem('redirectedFromSignup') === "true"){
                        this.props.commanHandler("redirectToSignupWithEmail");
                        localStorage.removeItem('redirectedFromSignup');
                    }
                    else
                        this.props.commanHandler("redirectToSignup")
                }
                else {
                    if(localStorage.getItem('redirectedFromSignup') === "true")	
                        localStorage.removeItem('redirectedFromSignup');
                    this.props.commanHandler("error500");
                }
            })
        } else{
            this.props.commanHandler("redirectToSignup") 
        }  
    }
    
    render() {
        return (
            <div>
                {this.state.loading ? <div className="loader"></div> : ""}
            </div>
        )
    }
}
export default FacebookSignupIntermediate;