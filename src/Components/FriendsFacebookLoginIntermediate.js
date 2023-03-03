import React, { Component } from 'react';
import url from '../CommonComponent/CommonURL';


class FriendsFacebookLoginIntermediate extends Component {
    constructor() {
        super();
        this.state = {
            rid: '',
            language_id: "",
            code: undefined,
            user_id: "",
            loading: true
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)

        let auth = localStorage.getItem("auth");
        let user_id = localStorage.getItem("user_id");
        let language_id = localStorage.getItem("language_id");
        let rid = localStorage.getItem("rid");
        const queryString = require('query-string');

        let parsed = queryString.parse(this.props.facebookqueryStringProps);
        if(language_id == this.props.defaultLang)
            parsed = queryString.parse(this.props.location.search);

        this.setState({
            rid: rid,
            language_id: language_id,
            code: parsed.code
        })

        if (parsed.code) {
            fetch(`${url.BASE_URL}/connectfacebook`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                    "x-api-key": url.X_API_KEY,
                    "language_id": language_id,
                    "code": parsed.code,
                    "Authorization" : auth,
                    "user_id" : user_id
                }
            }).then(response => response.json().then(data => ({ status: response.status, body: data })))
            .then(data => {
                if(data.status === 200) {
                    localStorage.setItem("auth", data.body.auth)
                    localStorage.setItem("user_id", data.body.user_id)
                    // window.location.replace(`${url.ORIGIN_URL}/friends`)
                }
                else if (data.status === 400) {
                    localStorage.setItem("error400", "active")
                    localStorage.setItem ("errMessage",data.body.message);
                   this.props.commanHandler("redirectToFriends")
                }
                else {
                    this.props.commanHandler("error500");
                }
            })
        }  
        else {
            this.props.commanHandler("redirectToFriends")
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
export default FriendsFacebookLoginIntermediate;