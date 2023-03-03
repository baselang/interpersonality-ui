import React, { Component } from 'react';

import CommonProfileHeader from '../CommonComponent/CommonProfileHeader';
import ProfileSettingsLeft from './ProfileSettingsLeft';
import Sidenav from '../CommonComponent/Sidenav';
import url from '../CommonComponent/CommonURL';
import Twemoji from 'react-twemoji';
import {isWindows} from 'react-device-detect';

class Settings extends Component {
    constructor() {
        super();
        this.state = {
            user_profile_pic: ''
        }
    }
    componentDidMount() {

        let language_id = localStorage.getItem("language_id")
        this.setState({
            language_id: language_id
        })
        let auth = localStorage.getItem('auth');
        if(!auth){
            this.props.commanHandler("redirectToHome");
        }
        
    }
    handleUserProfilePic = (user_profile_pic) => {
        this.setState({user_profile_pic: user_profile_pic})
    }
    render() {
        let test_status = localStorage.getItem("test_status");
        let settings = <div>
            <Sidenav active = "settings" />
            <main className="main profile-main settings-page" id="main">
                <CommonProfileHeader active = "settings" {...this.props} user_profile_pic={this.state.user_profile_pic}/>
                <ProfileSettingsLeft {...this.props} handleUserProfilePic = {this.handleUserProfilePic} />
            </main>
        </div>
        if(test_status == "not_completed") {
            window.location.replace(`${url.ORIGIN_URL}/test`)
        } else {
            if(isWindows) {
                return (
                    <Twemoji options={{ className: 'emoji', folder: 'svg', ext: '.svg' }} >
                        {settings}
                    </Twemoji>
                )
            } else {    
                return settings
            }
        }
    }
}

export default Settings;