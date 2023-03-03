import React, { Component } from 'react';
import url from '../CommonComponent/CommonURL';

class facebookloginintermediate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)

        let language_id = localStorage.getItem("language_id");
        let referral_code = localStorage.getItem("referral_code");

        const queryString = require('query-string');
        let parsed = queryString.parse(this.props.facebookqueryStringProps);
        if(language_id == this.props.defaultLang)
            parsed = queryString.parse(this.props.location.search);
        

        if(parsed.code) {
            fetch(`${url.BASE_URL}/facebooksignin`, {
                method: "GET",
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
                if(data.status === 200) {
                    localStorage.removeItem("profile")
                    localStorage.setItem("auth", data.body.auth)
                    localStorage.setItem("user_id", data.body.user_id)
                    localStorage.setItem("rid", data.body.rid)
                    localStorage.setItem("firstname", data.body.firstname)
                    localStorage.setItem("test_status", data.body.test_status)
                    localStorage.setItem("language_id", data.body.language_id)

                    this.setState({
                        loading: false
                    })

                    if(data.body.test_status === "not_completed") {
                        window.location.replace(`${url.ORIGIN_URL}/test`)
                    }
                    else if(data.body.test_status === "completed") {
                        window.location.replace(`${url.ORIGIN_URL}/profile/${data.body.user_id}`)
                    }
                }else if (data.status === 400) {
                    localStorage.setItem("error400", "active")
                    localStorage.setItem ("errMessage",data.body.message);
                    this.props.commanHandler("redirectToLogin")
                }else {
                    this.props.commanHandler("error500");
                }
            })
        } else {
            this.props.commanHandler("error500");
        }
    }

    render() {
        return (
            <div>
                { this.state.loading ? <div className="loader"></div>: ""}      
            </div>
        )
    }
}

export default facebookloginintermediate;