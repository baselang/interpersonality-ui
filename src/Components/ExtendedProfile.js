import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Helmet } from 'react-helmet';

import url from '../CommonComponent/CommonURL';

import extended_profile_locked_girl_male from '../Assets/images/illustrations/extended-profile-locked-girl-male.svg';
import extended_profile_locked_girl from '../Assets/images/illustrations/extended-profile-locked-girl.svg';
import extended_profile_locked_male from '../Assets/images/illustrations/extended-profile-locked-male.svg';
import facebook_messenger from '../Assets/images/facebook-messenger.svg';

import LocalizedStrings from 'react-localization';
import { language } from './Language';
import country from '../CommonComponent/Country';
import linkHeader from '../CommonComponent/Link';

import CommonProfileHeader from '../CommonComponent/CommonProfileHeader';
import CommonProfileLeft from '../CommonComponent/CommonProfileLeft';
import Sidenav from '../CommonComponent/Sidenav';
import Twemoji from 'react-twemoji';
import {isWindows} from 'react-device-detect';
import renderHTML from 'react-render-html';

let strings = new LocalizedStrings(language);

class ExtendedProfile extends Component {
    constructor() {
        super();
        this.state = {
            user_id: "",
            loading: true,
            language_id: '',
            auth: '',
            rid: '',
            count: '',
            notificationShow: false,
            flag: '',
            mystery_status: '',
            mystery_friend_join_counter: '',
            mystery_start_time: '',
            time: {
            }, 
            seconds: '',
            copyText: '',
            copyMessage: false,
            extended_report_content: [],
            sections_count: [],
            gender: ''
        }
        this.timer = 0;
    }

    componentDidMount(){
        window.scrollTo(0, 0)

        localStorage.setItem("flag", 0)

        let auth = localStorage.getItem("auth");
        let user_id = localStorage.getItem("user_id");
        let rid = localStorage.getItem("rid");
        let language_id = localStorage.getItem("language_id");
        let gender = localStorage.getItem("gender");
        localStorage.setItem("profile", Object.keys(url.PROFILE_LEFT_NAV)[7])
        let test_status = localStorage.getItem("test_status");
        

        this.setState({
            auth: auth,
            user_id: user_id,
            rid: rid,
            language_id: language_id,
            gender: gender
        })
        
        if(auth) {
            if(test_status == "not_completed") {
                window.location.replace(`${url.ORIGIN_URL}/test`)
            } else {
                fetch(`${url.BASE_URL}/mystery`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Credentials": true,
                        "x-api-key": url.X_API_KEY,
                        "user_id": user_id,
                        "Authorization": auth,
                        "language_id": language_id,
                        "rid": rid
                    }
                }).then(response => response.json().then(data => ({ status: response.status, body: data })))
                .then(data => {
                    this.setState({loading: false})
                    if(data.status === 200) {
                        if(data.body.mystery_status === 3) {
                            this.props.history.push(`/profile/${user_id}`)
                        }
                        this.setState({
                            seconds: data.body.mystery_start_time,
                            mystery_status: data.body.mystery_status,
                            mystery_friend_join_counter: data.body.mystery_friend_join_counter,
                            mystery_start_time: data.body.mystery_start_time,
                            extended_report_content: data.body.extended_report_content,
                            sections_count: data.body.sections_count
                        })
                    }
                    else {
                        this.props.commanHandler("error500");
                    }
                })
            }      
        } else {
            this.props.commanHandler("redirectToHome");
        }  
    }

    handleText = () => {
        
        this.setState({
            copyMessage: true
        })

        setTimeout(() => {
            this.setState({
                copyMessage: false})
        }, 2000)

    }

    secondsToTime = (secs) => {
        let hours = Math.floor(secs / (60 * 60));
        hours = hours.toString().length === 1 ? "0" + hours : hours;
    
        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);
        minutes = minutes.toString().length === 1 ? "0" + minutes : minutes;
    
        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);
        seconds = seconds.toString().length === 1 ? "0" + seconds : seconds;
    
        let obj = {
          "h": hours,
          "m": minutes,
          "s": seconds
        };
        return obj;
    }

    startTimer = () => {
        if (this.timer == 0 && this.state.seconds > 0) {
          this.timer = setInterval(this.countDown, 1000);
        }
    }

    countDown = () => {
        let seconds = this.state.seconds - 1;
        this.setState({
          time: this.secondsToTime(seconds),
          seconds: seconds,
        });
        if (seconds == 0) {    
            clearInterval(this.timer);
            window.location.reload();
            localStorage.setItem("profile", Object.keys(url.PROFILE_LEFT_NAV)[1])
            window.location.replace(`${url.ORIGIN_URL}/extendedprofile`)
        }
    }

    render() {

        this.startTimer();

        strings.setLanguage(this.state.language_id);

        const whatsappText = encodeURI(`https://api.whatsapp.com/send?text=${window.location.origin}${country.language_id_code_mapping[parseInt(this.state.language_id)] !== country.default_language ? country.lang_codes.map(data => `/${data}`) : ""}/home/${this.state.user_id}`)
        const facebookText = encodeURI(`https://www.facebook.com/sharer/sharer.php?u=${window.location.origin}${country.language_id_code_mapping[parseInt(this.state.language_id)] !== country.default_language ? country.lang_codes.map(data => `/${data}`) : ""}/home/${this.state.user_id}`)
        const twitterText = "https://twitter.com/intent/tweet?text=" + window.location.origin + `${country.language_id_code_mapping[parseInt(this.state.language_id)] !== country.default_language ? country.lang_codes.map(data => `/${data}`) : ""}`+"/home/" + this.state.user_id
 
        let headContent = linkHeader.map((lin, index) => {
            return (
                <link key={index} rel={lin.rel} hreflang={lin.hreflang} href={url.ORIGIN_URL+lin.href+"extendedprofile"}/>
            )
        })

        let Sections = this.state.sections_count && this.state.sections_count.map(section => {
            if(section.Section == 2) {
                return (
                    <div>
                        <div className="ep--item">
                            <span className="ep--item-icon">❤️</span>
                            {renderHTML(strings.formatString(strings.EXTENDED_PROFILE_SEC_1, section.count, section.count == 1 ? strings.EXTENDED_PROFILE_THING_KEY : strings.EXTENDED_PROFILE_THINGS_KEY ))}
                        </div>
                    </div>
                )
            } else if(section.Section == 3) {
                return (
                    <div>
                        <div className="ep--item">
                            <span className="ep--item-icon">🔮</span>
                            {renderHTML(strings.formatString(strings.EXTENDED_PROFILE_SEC_2, section.count, section.count == 1 ? strings.EXTENDED_PROFILE_THING_KEY : strings.EXTENDED_PROFILE_THINGS_KEY ))}
                        </div>
                    </div>
                )
            } else if(section.Section == 4) {
                return (
                    <div>
                        <div className="ep--item">
                            <span className="ep--item-icon">😁</span>
                            {renderHTML(strings.formatString(strings.EXTENDED_PROFILE_SEC_3, section.count, section.count == 1 ? strings.EXTENDED_PROFILE_THING_KEY : strings.EXTENDED_PROFILE_THINGS_KEY ))}
                        </div>
                    </div>
                )
            }  else if(section.Section == 5) {
                return (
                    <div>
                        <div className="ep--item">
                            <span className="ep--item-icon">💼</span>
                            {renderHTML(strings.formatString(strings.EXTENDED_PROFILE_SEC_4, section.count, section.count == 1 ? strings.EXTENDED_PROFILE_PIECE_KEY : strings.EXTENDED_PROFILE_PIECES_KEY ))}
                        </div>
                    </div>
                )
            }
        })

        let extendedprofile = this.state.mystery_status === 2 ?
        <div className="page-profile">
            { this.state.loading && <div className="loader"></div> }
            <Helmet>
                { headContent }
            </Helmet>
            <Sidenav active = 'profile' />
            <main className="main profile-main mystery-unlocked-page" id="main">
                <CommonProfileHeader active = 'profile' {...this.props}/>
                <div id="profile-content" className="main_onclick_lefthide">
                    <div className="module_mainnnnnn_one">
                        <CommonProfileLeft extended_report_content = {this.state.extended_report_content}  mysterystatus = {this.state.mystery_status} access_type ="is_login_private" user_profile_pic = {localStorage.getItem("user_profile_pic")} {...this.props}/>
                    </div>
                </div>
            </main> 
        </div>
        :
        <div className="page-profile">
            { this.state.loading && <div className="loader"></div> }
            <Helmet>
                { headContent }
            </Helmet>
            <Sidenav active = 'profile' />
            <main className="main profile-main" id="main">
                <CommonProfileHeader mystery_status = {this.state.mystery_status} mystery_start_time = {this.state.mystery_start_time}  {...this.props}/>
                <div id="profile-content" className="main_onclick_lefthide">
                    { this.state.copyMessage &&
                        <div className="settings-alert"><i className="fa fa-check-circle"></i><strong>{strings.COPIED_LINK}</strong></div> 
                    }
                    <div className="module_mainnnnnn_one">
                        <div className="ep--header">
                            <img alt="" src={ extended_profile_locked_girl } className="d-none d-lg-block left" />
                            <img alt="" src={ extended_profile_locked_male } className="d-none d-lg-block right" />
                            <img alt="" src={ extended_profile_locked_girl_male } className="d-block d-lg-none" />
                            <div className="ep--header-text text-center">
                                <h1>{strings.EXTENDED_PROFILE_TITLE}</h1>
                                <p className="ep--header-time"><strong>{this.state.time.h}:{this.state.time.m}:{this.state.time.s}</strong></p>
                                <p className="ep--header-joined"><strong>{strings.formatString(strings.EXTENDED_PROFILE_DESC_1, this.state.mystery_friend_join_counter, 2)}</strong></p>
                            </div>
                            <div className="ep--header-box text-center">
                                {renderHTML(strings.EXTENDED_PROFILE_DESC_2)}
                                <div className="copyyy_linkk">
                                    <CopyToClipboard text={`${window.location.origin}${country.language_id_code_mapping[parseInt(this.state.language_id)] !== country.default_language ? country.lang_codes.map(data => `/${data}`) : ""}/home/${this.state.user_id}`} onCopy={this.handleText}><span>{`${window.location.origin}${country.language_id_code_mapping[parseInt(this.state.language_id)] !== country.default_language ? country.lang_codes.map(data => `/${data}`) : ""}/home/${this.state.user_id}`}</span></CopyToClipboard>
                                    <CopyToClipboard text={`${window.location.origin}${country.language_id_code_mapping[parseInt(this.state.language_id)] !== country.default_language ? country.lang_codes.map(data => `/${data}`) : ""}/home/${this.state.user_id}`} onCopy={this.handleText}><span className="btn-copyyy_linkk"></span></CopyToClipboard>
                                </div>
                                <ul key="ep-u-1" className="ep--share">
                                     <li key="ep-u-1-l-1"><a href={ facebookText } target='#'  className="facebook"><i className="fa fa-facebook-square" aria-hidden="true"></i></a></li>
                                    <li key="ep-u-1-l-2"><a href={ twitterText }  target='_blank'  className="twitter"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
                                    <li key="ep-u-1-l-3"><a href={ whatsappText } target="_blank" className="whatsapp"><i className="fa fa-whatsapp" aria-hidden="true"></i></a></li>
                                    <li key="ep-u-1-l-4"><a href="https://m.me/" target="_blank" className="messenger"><img src={ facebook_messenger } alt="facebook_messenger" /></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="ep--items">
                            <h3 className="text-center">{strings.EXTENDED_PROFILE_TITLE_1}</h3>
                            <div className="container p-0">
                                {Sections}
                            </div>
                        </div>
                        <div className="ep--invite">
                            <div className="container p-0">
                                <h3 className="text-center">{strings.EXTENDED_PROFILE_TITLE_2}</h3>
                                    <div className="copyyy_linkk">
                                        <CopyToClipboard text={`${window.location.origin}${country.language_id_code_mapping[parseInt(this.state.language_id)] !== country.default_language ? country.lang_codes.map(data => `/${data}`) : ""}/home/${this.state.user_id}`} onCopy={this.handleText}><span>{`${window.location.origin}${country.language_id_code_mapping[parseInt(this.state.language_id)] !== country.default_language ? country.lang_codes.map(data => `/${data}`) : ""}/home/${this.state.user_id}`}</span></CopyToClipboard>
                                        <CopyToClipboard text={`${window.location.origin}${country.language_id_code_mapping[parseInt(this.state.language_id)] !== country.default_language ? country.lang_codes.map(data => `/${data}`) : ""}/home/${this.state.user_id}`} onCopy={this.handleText}><span className="btn-copyyy_linkk"></span></CopyToClipboard>
                                    </div>
                                <ul key="ep-u-2" className="ep--share">
                                    <li key="ep-u-2-l-1"><a href={ facebookText }  target='#' className="facebook"><i className="fa fa-facebook-square" aria-hidden="true"></i></a></li>
                                    <li key="ep-u-2-l-2"><a href={ twitterText }  target='_blank' className="twitter"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
                                    <li key="ep-u-2-l-3"><a href={ whatsappText } target="_blank" className="whatsapp"><i className="fa fa-whatsapp" aria-hidden="true"></i></a></li>
                                    <li key="ep-u-2-l-4"><a href="https://m.me/" target="_blank" className="messenger"><img src={ facebook_messenger } alt="facebook_messenger" /></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="ep--next text-center">
                            <a href="/guides"><strong>{strings.EXTENDED_PROFILE_TITLE_3}</strong></a>
                        </div>
                    </div>
                </div>
            </main>  
        </div>
        if(isWindows) {
            return (
                <Twemoji options={{ className: 'emoji', folder: 'svg', ext: '.svg' }} >
                    {extendedprofile}
                </Twemoji>
            )
        } else {    
            return extendedprofile
        }
    }
}

export default ExtendedProfile;