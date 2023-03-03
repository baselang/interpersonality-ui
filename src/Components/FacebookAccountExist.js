import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import renderHTML from 'react-render-html';
import signup_logo_small from '../Assets/images/v2/signup-logo-small.svg';

import LocalizedStrings from 'react-localization';
import { language } from './Language';
import url from '../CommonComponent/CommonURL';

let strings = new LocalizedStrings(language);

class FacebookAccountExist extends Component {
    constructor() {
        super();
        this.state = {
            language_id: '',
            auth: '',
            firstname: '',
            rid: '',
            old_rid: '',
            user_id: '',
            old_user_id: '',
            isRedirect: ''
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        window.addEventListener( "pageshow", function ( event ) {
            var historyTraversal = event.persisted || ( typeof window.performance != "undefined" && window.performance.navigation.type === 2 );
            if ( historyTraversal ) {
              window.location.reload();
            }
        });
        let language_id = localStorage.getItem("language_id")
        let auth = localStorage.getItem("auth")
        let firstname = localStorage.getItem("firstname")
        let rid = localStorage.getItem("rid")
        let old_rid = localStorage.getItem("old_rid")
        let user_id = localStorage.getItem("user_id")
        let old_user_id = localStorage.getItem("old_user_id")

        this.setState({
            language_id: language_id,
            auth: auth,
            firstname: firstname,
            rid: rid,
            old_rid: old_rid,
            user_id: user_id,
            old_user_id: old_user_id
        })

        if(localStorage.getItem("keep_result_old_or_new")) {
            this.setState({loading:true})
            window.location.replace(`${url.ORIGIN_URL}/profile/${user_id}`)
        }

    }

    handleResult = (e) => {
        var data = {
            option: e.target.id
        }
        this.setState({loading: true})
        if(this.state.auth) {
        fetch(`${url.BASE_URL}/updatepostanswers`, {
            body: JSON.stringify(data),
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
                "Authorization": this.state.auth,
                "x-api-key": url.X_API_KEY,
                "rid": this.state.rid,
                "old_rid": this.state.old_rid,
                "user_id": this.state.user_id,
                "old_user_id": this.state.old_user_id
            },
        }).then(response => response.json().then(data => ({ status: response.status, body: data })))
        .then(data => {
            
            localStorage.setItem('auth', data.body.auth);
            localStorage.setItem('user_id', data.body.user_id);
            localStorage.setItem('language_id', data.body.language_id);
            localStorage.setItem('rid', data.body.rid);
            localStorage.removeItem('old_user_id');
            localStorage.removeItem('old_rid')

            let language_id = localStorage.getItem('language_id')
            let auth = localStorage.getItem('auth')
            let user_id = localStorage.getItem('user_id')
            let rid = localStorage.getItem('rid')

            if(data.status === 200 ) {
                this.setState({
                    language_id: language_id,
                    auth: auth,
                    user_id: user_id,
                    rid: rid
                })
                localStorage.setItem('keep_result_old_or_new',true)
                window.location.replace(`${url.ORIGIN_URL}/profile/${data.body.user_id}`)
            }
            else {
                localStorage.setItem('keep_result_old_or_new',false)
                this.props.commanHandler("error500");
            }
        }) } else{
            this.props.commanHandler("redirectToHome");
        }
    }
    
    render() {

        strings.setLanguage(this.state.language_id);
        return (
            <div>
                { this.state.loading && <div className="loader"></div> }
                <div className="sf-container">
                    <div className="sf-redid text-center">
                        <img alt="" src={ signup_logo_small } className="logo" />
                        {renderHTML(strings.formatString(strings.FB_ACCOUNT_EXISTS,this.state.firstname))}
                    </div>
                    <div className="sf-redid-buttons fb_acc_exist_btns">
                        <Link to="#" id="old" onClick={this.handleResult}>{strings.FB_KEEP_OLD_RESULTS}</Link>
                        <Link to="#" id="new" onClick={this.handleResult}>{strings.FB_USE_NEW_RESULTS}</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default FacebookAccountExist;
