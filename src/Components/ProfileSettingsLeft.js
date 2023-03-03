import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import $ from 'jquery';
import BasicInfo from './BasicInfo';
import PrivacySettings from './PrivacySettings';
import Billing from './Billing';
import Help from './Help';
import renderHTML from 'react-render-html';
import url from '../CommonComponent/CommonURL';
import LocalizedStrings from 'react-localization';
import { language } from './Language';
import Twemoji from 'react-twemoji';
import {isWindows} from 'react-device-detect';
import jQuery from 'jquery';
import country from '../CommonComponent/Country';

let strings = new LocalizedStrings(language);

class ProfileSettingsLeft extends Component {
    constructor() {
        super();
        this.state = {
            active: "Basic Info",
            language_id: ''
        }
    }

    componentDidMount() {
        let default_language_id  = Object.keys(country.language_id_code_mapping).find(k=>country.language_id_code_mapping[k]==country.default_language);
        let active = localStorage.getItem("Settings");
        let language_id = localStorage.getItem("language_id") === null ? default_language_id  : localStorage.getItem("language_id");
        this.setState({
            language_id: language_id,
            active: active
        })

        setTimeout(() => {
            this.setState({
                language_id : localStorage.getItem("language_id") === null ? default_language_id  : localStorage.getItem("language_id")
            })
        }, 2000);
    }

    componentDidUpdate() {
        $("#terms_link").click(function(){
            window.location.replace("/terms")
        });
        $("#privacy_link").click(function(){
            window.location.replace("/privacy")
        });
    }

    activateTab = (name) => {
        localStorage.setItem("Settings",name);
        this.setState({
            active: name
        },()=>{
            if(name =="Basic Info"){
                window.location.replace('/settings')
            }
        })
    }

    handleLogout = (event) => {
        event.preventDefault();
        localStorage.clear();
        window.location.replace(`${url.ORIGIN_URL}/`)
    }

    render() {

        strings.setLanguage(this.state.language_id);

        let profileSettingsLeft = <div>
            <div id="profile-content" className="main_onclick_lefthide">
                <div className="module_mainnnnnn_one">
                    <div className="mobile_leftt_meuu">
                        <div className="onclickk_opeennn_all">
                            {
                                this.state.active === 'Basic Info' &&
                                <Link to="#">✍️<span>{ strings.SETTINGS_LEFT_1}</span></Link>
                            }
                            {
                                this.state.active === 'Privacy' &&
                                <Link to="#">🔒<span>{ strings.SETTINGS_LEFT_2}</span></Link>
                            }
                            {
                                this.state.active === 'Billing' &&
                                <Link to="#">💳<span>{ strings.SETTINGS_LEFT_3}</span></Link>
                            }
                            {
                                this.state.active === 'Help' &&
                                <Link to="#">💬<span>{ strings.SETTINGS_LEFT_4}</span></Link>
                            }
                        </div>
                        <div className="leftt_all_iconss">
                            <div className="left_menusssss">
                                <ul key="psl-u-1">
                                    <li key="psl-u-1-l-1"><Link id={ "Basic Info" } onClick={() => this.activateTab("Basic Info")}  to="#" className={this.state.active === "Basic Info" ? "active": ""}>✍️<span>{ strings.SETTINGS_LEFT_1}</span></Link></li>
                                    <li key="psl-u-1-l-2"><Link id={ "Privacy" } onClick={() => this.activateTab("Privacy")}  to="#" className={this.state.active === "Privacy" ? "active": ""}>🔒<span>{ strings.SETTINGS_LEFT_2}</span></Link></li>
                                    <li key="psl-u-1-l-3"><Link id={ "Billing" } onClick={() => this.activateTab("Billing")}  to="#" className={this.state.active === "Billing" ? "active": ""}>💳<span>{ strings.SETTINGS_LEFT_3}</span></Link></li>
                                    <li key="psl-u-1-l-4"><Link id={ "Help" } onClick={() => this.activateTab("Help")}  to="#" className={this.state.active === "Help" ? "active": ""}>💬<span>{ strings.SETTINGS_LEFT_4}</span></Link></li>
                                    <li key="psl-u-1-l-5"><Link to="javascript:void(0);" data-toggle="modal" data-target="#logout">👋<span>{ strings.SETTINGS_LEFT_5}</span></Link></li>
                                </ul>
                                <div className="copyright_bottm">
                                    {renderHTML(strings.SETTINGS_COPYRIGHT)}
                                </div>
                                                            </div>
                        </div>
                    </div>
                    <div className="left_side_barr">
                        <div className="leftt_mainn">
                            <div className="uppr_top_left setting_uppr_topp text-center">
                                <p>{ strings.SETTINGS_TITLE}</p>
                            </div>
                            <div className="bottom_menusss setting_menuss">
                                <ul key="psl-u-2">
                                    <li key="psl-u-2-l-1"><Link id={ "Basic Info" } onClick={() => this.activateTab("Basic Info")}  to="#" className={this.state.active === "Basic Info" ? "active": ""}>✍️<span>{ strings.SETTINGS_LEFT_1}</span></Link></li>
                                    <li key="psl-u-2-l-2"><Link id={ "Privacy" } onClick={() => this.activateTab("Privacy")}  to="#" className={this.state.active === "Privacy" ? "active": ""}>🔒<span>{ strings.SETTINGS_LEFT_2}</span></Link></li>
                                    <li key="psl-u-2-l-3"><Link id={ "Billing" } onClick={() => this.activateTab("Billing")}  to="#" className={this.state.active === "Billing" ? "active": ""}>💳<span>{ strings.SETTINGS_LEFT_3}</span></Link></li>
                                    <li key="psl-u-2-l-4"><Link id={ "Help" } onClick={() => this.activateTab("Help")}  to="#" className={this.state.active === "Help" ? "active": ""}>💬<span>{ strings.SETTINGS_LEFT_4}</span></Link></li>
                                    <li key="psl-u-2-l-5"><Link to="javascript:void(0);" data-toggle="modal" data-target="#logout">👋<span>{ strings.SETTINGS_LEFT_5}</span></Link></li>
                                </ul>
                                <div className="copyright_bottm">
                                    {renderHTML(strings.SETTINGS_COPYRIGHT)}
                                </div>
                            </div>
                        </div>
                    </div>           
                        {
                            this.state.active === "Basic Info" &&
                            <BasicInfo  {...this.props} handleUserProfilePic = {this.props.handleUserProfilePic}/> 
                        }  
                        {
                            this.state.active === "Privacy" &&
                            <PrivacySettings {...this.props}/> 
                        } 
                        {
                            this.state.active === "Billing" &&
                            <Billing {...this.props} /> 
                        }
                        {
                            this.state.active === "Help" &&
                            <Help  {...this.props}/> 
                        }
                </div> 
            </div>  
            <div className="settings-modal modal fade" id="logout" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            {renderHTML(strings.SETTINGS_LOGOUT_POPUP)}
                        </div>
                        <div className="modal-footer">
                            <Link to="#" className="settings-btn-green" onClick={this.handleLogout}><strong>{ strings.SETTINGS_LOGOUT_BTN}</strong></Link>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
        if(isWindows) {
            return (
                <Twemoji options={{ className: 'emoji', folder: 'svg', ext: '.svg' }} >
                    {profileSettingsLeft}
                </Twemoji>
            )
        } else {    
            return profileSettingsLeft
        }
    }
}

export default withRouter(ProfileSettingsLeft);