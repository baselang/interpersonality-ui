import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import logo from '../Assets/images/logo.svg';
import commander from '../Assets/images/commander.png';
import arrow_right_white from '../Assets/images/arrow-right-white.svg';
import facebook_messenger from '../Assets/images/facebook-messenger.svg';
import logo_sm_gray from '../Assets/images/logo-sm-gray.svg';
import url from './CommonURL';
import LocalizedStrings from 'react-localization';
import { language } from '../Components/Language';
import $ from 'jquery';
import Twemoji from 'react-twemoji';
import {isWindows} from 'react-device-detect';
import country from '../CommonComponent/Country';

let strings = new LocalizedStrings(language);

const default_language_id  = Object.keys(country.language_id_code_mapping).find(k=>country.language_id_code_mapping[k]==country.default_language);

class CommonProfileHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_open:true,
            active: 'profile',
            user_id: '',
            auth: '',
            loading: false,
            language_id: default_language_id,
            rid: '',
            notifications: [],
            notificationList:[],
            template: '',
            count: '',
            notificationShow: false,
            flag: '',
            mystery_status: '',
            mystery_friend_join_counter: '',
            is_mystery_visited: '',
            time: {

            }, 
            seconds: '',
            access_type: '',
            prevScrollpos: '',
            user_profile_pic: '',
            copyMessage: false,
            firstname:localStorage.getItem("firstname")
        }
        this.timer = 0;
    }

    componentDidUpdate(){
        let _this=this;
        $("#notification-bg-popup").unbind().bind('click', function(e) {
            _this.handleNotifications()
        })
        $('#cardnumber').click(function(){
            localStorage.setItem("Settings", "Billing")
        });
        $(document).ready( function() {
            function bottom_menusss() {
                var top_space = $('#profile-header').outerHeight();

                if( $('div.freinddd_listttt').length ) {
                    top_space = 160.8;
                }

                $('div.left_side_barr div.bottom_menusss').sticky({
                    topSpacing: top_space + 10,
                    bottomSpacing: 200
                });
            }

            if( $('div.left_side_barr div.bottom_menusss').length ) {
                bottom_menusss();
            }
        })   
    }


    componentDidMount() {
        window.scrollTo(0, 0)
        localStorage.setItem("flag", 0)
        let user_id = localStorage.getItem("user_id")
        let auth = localStorage.getItem("auth")
        let language_id = localStorage.getItem("language_id") === null ? default_language_id  : localStorage.getItem("language_id")
        let rid = localStorage.getItem("rid")
        let user_profile_pic = localStorage.getItem('user_profile_pic')
        
        this.setState({
            user_id: user_id,
            auth: auth,
            language_id: language_id,
            rid: rid,
            user_profile_pic: user_profile_pic,
            active: this.props.active
        })
        
        setTimeout(() => {
            this.setState({
                firstname:localStorage.getItem("firstname"),
                language_id : localStorage.getItem("language_id") === null ? default_language_id  : localStorage.getItem("language_id")
            })
        }, 2000);

        if(auth) {
            fetch(`${url.BASE_URL}/mysterybutton`, {
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
                if(data.status === 200) {
                    localStorage.setItem("mystery_status", data.body.mystery_status)
                    this.setState({
                        seconds: data.body.mystery_start_time,
                        mystery_status: data.body.mystery_status,
                        is_mystery_visited: data.body.is_mystery_visited
                    })
                    if(this.props.required_mystery_status != undefined) {
                        this.props.handleMystery(data.body.mystery_status)
                    }
                }
                else {
                    this.props.commanHandler("error500");
                }
            })
            fetch(`${url.BASE_URL}/getactivenotificationscount`, {
                method: "GET",
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
                if(data.status === 200) {
                    this.setState({
                        count: data.body.active_notification_count === "0" ? this.setState({notificationShow: true,loading:false}) : data.body.active_notification_count
                    })
                }
                else {
                    this.props.commanHandler("error500");
                }
            })
        }
        
    }

    componentWillReceiveProps(prevProp, nextProp){
        
        if(prevProp.active) {
            this.setState({
                active: prevProp.active
            });
        }

        if(prevProp.mystery_start_time) {
            if(this.state.mystery_start_time != prevProp.mystery_start_time) {
                this.setState({
                    mystery_status: prevProp.mystery_status,
                    seconds: prevProp.mystery_start_time
                })
            }
        }
        else if(prevProp.user_profile_pic == null || prevProp.user_profile_pic) {
            if(prevProp.user_profile_pic !== undefined) {
                if(this.state.user_profile_pic != prevProp.user_profile_pic) {
                    this.setState({
                        user_profile_pic: prevProp.user_profile_pic
                    })
                }
            }
        }
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
        }
    }

    handleNotifications = () => {

        let flag = localStorage.getItem("flag")

        if(this.state.is_open){
            let str = '<div id="notification-bg-popup" class="dropdown-backdrop fade"></div>';
            $(str).appendTo('body');
            $('div.dropdown-backdrop').addClass('show');
            $('div.dropdown').addClass('show');
            $("#notification-popup").addClass("show")
            $("#notification-popup").addClass("notificationpopup")
            this.setState({
                is_open:false
            })
        }else{
            $('div.dropdown').removeClass('show');
            $('div.dropdown-backdrop').removeClass('show').remove();

            $("#notification-popup").removeClass("show")
            $("#notification-popup").removeClass("notificationpopup")
            this.setState({
                is_open:true
            })
        }
        if((flag === "0" && this.state.count !== undefined)) {
            this.setState({loading: true})
            fetch(`${url.BASE_URL}/getactivenotifications`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                    "x-api-key": url.X_API_KEY,
                    "user_id": this.state.user_id,
                    "Authorization": this.state.auth,
                    "language_id": this.state.language_id,
                    "rid": this.state.rid
                }
            }).then(response => response.json().then(data => ({ status: response.status, body: data })))
            .then(data => {
                localStorage.setItem("flag", 1)
                if(data.status === 200) { 
                    let notificationList = {
                        1 : "<li key=\"cph-u-4-l-1\"><span class=\"notification-icon\">🙊</span>"+strings.NOTIFICATION_TEMPLATE_1+"</li>",
                        // 2 : "<li key=\"cph-u-4-l-2\"><span class=\"notification-icon\"><img class=\"img_pix\" alt=\"\" src=\"profile_image\" width=\"48\"></span>"+strings.NOTIFICATION_TEMPLATE_2+"</li>",
                        3 : "<li key=\"cph-u-4-l-3\"><span class=\"notification-icon\">💳</span>"+strings.NOTIFICATION_TEMPLATE_3+"</li>",
                        4 : "<li key=\"cph-u-4-l-4\"><span class=\"notification-icon\">🎉</span>"+strings.NOTIFICATION_TEMPLATE_4+"</li>",
                        5 : "<li key=\"cph-u-4-l-5\"><span class=\"notification-icon\">😎</span>"+strings.NOTIFICATION_TEMPLATE_5+"</li>",
                        6 : "<li key=\"cph-u-4-l-6\"><span class=\"notification-icon\">⏰</span>"+strings.NOTIFICATION_TEMPLATE_6+"</li>",
                        // 7 : "<li key=\"cph-u-4-l-7\"><span class=\"notification-icon\">👀</span>"+strings.NOTIFICATION_TEMPLATE_7+"</li>",
                    }
                    for(let i=0; i<data.body.length; i++) {
                        let template = notificationList[(data.body[i]).notification_type]
                        Object.keys((data.body[i]).notification_json).forEach(element => { 
                            let oldData = data.body[i].notification_json[element];
                            // if((data.body[i]).notification_type==2){
                            //     if(oldData==1){
                            //         oldData="her"
                            //     }else if(oldData==0){
                            //         oldData="his"
                            //     }
                            // }
                            let value1 = element
                            let value2 = oldData
                            // if(element == 'profile_image' && (data.body[i]).notification_json.profile_image == null )
                            //     value2 = logo_sm_gray
                            let mydata = template.split(value1).join(value2)
                            template = mydata
                        })
                        let arr = [template]
                        this.setState({
                            notifications: this.state.notifications.concat(arr),
                            notificationShow: false,
                            loading: false,
                            notificationList:notificationList
                        })                        
                    }
                }
                else {
                    this.props.commanHandler("error500");
                }
            })
        }
        else {
            this.setState({
                notificationShow: true
            }) 
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

    activateTab = (name) => {
        this.setState({
          active: name
        })
        if(name == 'profile') {
            localStorage.setItem("profile", Object.keys(url.PROFILE_LEFT_NAV)[1])
        }
        localStorage.setItem("Settings", "Basic Info")
    }

    toggleClick = (toogle) => {
        $("body").addClass("template");
        $("body").removeClass("templete open-sidenav");
        if(toogle == 'show') {
            $('#mobile-menu').toggleClass('show');
        } else if(toogle == 'hide') {
            $('#mobile-menu').removeClass('show');
        }
    }

    render() {
        this.startTimer();
        strings.setLanguage(this.state.language_id);

        const whatsappText = encodeURI(`https://api.whatsapp.com/send?text=${window.location.origin}${country.language_id_code_mapping[parseInt(this.state.language_id)] !== country.default_language ? country.lang_codes.map(data => `/${data}`) : ""}/home/${this.state.user_id}`)
        const facebookText = encodeURI(`https://www.facebook.com/sharer/sharer.php?u=${window.location.origin}${country.language_id_code_mapping[parseInt(this.state.language_id)] !== country.default_language ? country.lang_codes.map(data => `/${data}`) : ""}/home/${this.state.user_id}`)
        const twitterText = "https://twitter.com/intent/tweet?text=" + window.location.origin + `${country.language_id_code_mapping[parseInt(this.state.language_id)] !== country.default_language ? country.lang_codes.map(data => `/${data}`) : ""}`+"/home/" + this.state.user_id

       const profileHeader = this.props.someElseProfileLoggedOut ? 
       <header id="profile-header" className="menu-center">
            <div className="container-fluid">
                <div className="profile-header__logo">
                    <a href="/" className="">
                        <img src={ logo } alt="logo" />
                    </a>
                    <strong className="">{strings.INTERPERSONALITY}</strong>
                </div>
                <button type="button" onClick={() => this.toggleClick('show')} className="toggle-menu d-lg-none">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <div className="profile-header__menu d-none d-lg-block">
                    <ul key="cph-u-1" className="menu">
                        <li key="cph-u-1-l-1"><a href="/research">{strings.HEADER_RESEARCH}</a></li>
                        <li key="cph-u-1-l-2"><a href="/our-model">{strings.HEADER_OURMODEL }</a></li>
                        <li key="cph-u-1-l-3"><a href="/login">{strings.HEADER_LOGIN}</a></li>
                        <li key="cph-u-1-l-4" className="">
                            <div className="language-dropdown">
                                <select value={this.state.language_id} onChange={this.props.handleLanguageChange} name="lang">
                                    {country.language_id_name_mapping && country.language_id_name_mapping.map((data, index) =>{
                                        return (
                                            <option key={index} value={data.id}>{data.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="profile-header__actions d-none d-lg-block">
                    <ul key="cph-u-2" className="menu">
                        <li key="cph-u-2-l-1" className="menu-item-button"><a href="/test" ><strong>{strings.HEADER_TEST}</strong></a></li>
                    </ul>
                </div>
            </div>
            {this.props.isRender &&
            <div className="view_frnd_profilee">
                <p className="d-none d-md-flex"><strong>{strings.HEADER_TAKE_OUR_TEST}</strong> <a href="/test" className="view_frnd_profilee-btn"><strong>{strings.HEADER_TEST}</strong> <img src={ arrow_right_white } alt="arrow_right_white" /></a></p>
                <p className="d-md-none"><a href="/test"><strong>{strings.HEADER_TAKE_OUR_TEST}</strong> <img src={ arrow_right_white } alt="arrow_right_white" /></a></p>
            </div>
            }
        </header>
        :
        <div>
            <header id="profile-header"> 
                <div className="container-fluid">
                    <div className="profile-header__logo">
                        <a href="/home" className="">
                            <img src={ logo } alt="logo" />
                        </a>
                    </div>
                    <button type="button" className="profile-header__toggler d-md-none">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    <div className="profile-header__menu d-none d-md-block">
                        <ul key="cph-u-3" className="menu">
                            <li key="cph-u-3-l-1" className={this.state.active === 'profile' ? "current-menu-item": ""}>
                                <a onClick={() => this.activateTab('profile')} href={`${url.ORIGIN_URL}/profile/${this.state.user_id}`} >{ 
                                (this.state.user_profile_pic !== null && this.state.user_profile_pic !== undefined && this.state.user_profile_pic !== "null") && <img src={this.state.user_profile_pic+"#" + new Date().getTime()} alt="pro_small_1" className="rounded-circle" />}{this.state.firstname?this.state.firstname:localStorage.getItem("firstname")}</a>
                            </li>
                            {/* <li key="cph-u-3-l-2" className={this.props.active === "friends" || this.state.active === 'friends' ? "current-menu-item": ""}>
                                <a onClick={() => this.activateTab('friends')} href="/friends">{strings.HEADER_FRNDS} <span className="sr-only">(current)</span></a>
                            </li> */}
                            <li key="cph-u-3-l-3" className={this.state.active === 'relationships' ? "current-menu-item": ""}>
                                <a onClick={() => this.activateTab('relationships')} href="/guides">{strings.HEADER_RELATIONSHIPS}</a>
                            </li>
                        </ul>
                    </div>
                    <div className="profile-header__actions">
                        {this.state.is_mystery_visited === 0 && this.state.mystery_status === 2 &&
                            <a href="/extendedprofile" className="button-mystery button-header-ep">
                                <span className="button-mystery__icon">🔑</span>
                                <span className="button-mystery__title d-none d-sm-inline">{strings[url.PROFILE_LEFT_NAV[Object.keys(url.PROFILE_LEFT_NAV)[7]]]}</span>
                            </a>
                        }
                        {this.state.mystery_status === 1 &&
                            <a href="/extendedprofile" className={this.props.mystery_status ? "button-mystery button-header-ep" : "button-mystery button-header-ep-unlocked"}>
                                <span className="button-mystery__icon">🔑</span>
                                <span className="button-mystery__title d-none d-sm-inline">{strings[url.PROFILE_LEFT_NAV[Object.keys(url.PROFILE_LEFT_NAV)[7]]]}</span>
                                <span className="button-mystery__number">{this.state.time.h}:{this.state.time.m}</span>
                            </a>
                        }
                        <div className="dropdown" id="dropdown-notifications" onClick={this.handleNotifications}>
                            <button className="dropdown-toggle dropdown-toggle-notifications" type="button"  data-offset="40,42">
                                <span className="badge">{localStorage.getItem('flag') === "0" ? this.state.count : localStorage.getItem('flag') === "0" }</span>
                            </button>
                            <div id="notification-popup" className="dropdown-menu dropdown-menu-right dropdown-menu-notifications">
                                { this.state.loading && <div className="loader2"></div> }
                                <div className="dropdown-menu__header">
                                    <p><strong>{strings.NOTIFICATION_POPUP_TITLE}</strong></p>
                                    <a href="/notifications"  className="pull-right"><strong>{strings.NOTIFICATION_SEEALLBTN}</strong></a>
                                </div>
                                <div className="dropdown-menu__body">
                                    { this.state.notificationShow ?
                                        <p className="text-center no-notifications"><span>🙃</span>{strings.NOTIFICATION_ZERO_MSG}</p>
                                        :
                                        <ul key="cph-u-4" className="">
                                            {   this.state.notifications && this.state.notifications.map(data => {
                                                    return ReactHtmlParser(data)
                                                }) 
                                            }
                                        </ul>
                                    }
                                </div>
                            </div>
                        </div>
                                <a href="/settings" id="settings" onClick={() => this.activateTab('settings')} className={this.state.active === 'settings' ? "button-settings d-none d-md-block active": "button-settings d-none d-md-block"}>{""}</a>
                    </div>
                </div>
                {/* {this.props.is_connected === "true" && this.props.access_type === "is_login_public" &&
                <div className="freinddd_listttt">
                    <div className="freinddd_listttt-inner">
                        {
                            this.props.userFacebookFriends && this.props.userFacebookFriends.map((data) => {
                                return (
                                    <a href={`${url.ORIGIN_URL}/profile/${data.friend_userid}`} className={data.class} id={data.friend_userid} key={ data.friend_userid }><img src={ data.friend_picture_url ? data.friend_picture_url : commander } alt="img"/><strong>{ data.friend_name }</strong></a>
                                )
                            })
                        }
                        <a href="#invite-friends" data-toggle="modal" className="invite_moree"><strong>{strings.FRIENDS_INVITE_BTN}</strong></a>  
                    </div>  
                </div>
                } */}
                {/* {this.props.someElseProfileLoggedIn &&
                <div className="view_frnd_profilee">
                    <p className="d-none d-md-flex"><strong>{strings.EXTENDED_PROFILE_SOMEONE_ELSE_HEADER_1 }</strong><a href="/friends" className="view_frnd_profilee-btn view_friends"><strong>{strings.EXTENDED_PROFILE_SOMEONE_BTN}</strong> <img src={ arrow_right_white } alt="arrow_right_white" /></a></p>
                    <p className="d-md-none"><a  href="/friends"><strong>{strings.EXTENDED_PROFILE_SOMEONE_ELSE_HEADER_2 }</strong> <img src={ arrow_right_white } alt="arrow_right_white" /></a></p>
                </div>
                } */}
            </header> 
            { this.state.copyMessage &&
                <div className="settings-alert"><i className="fa fa-check-circle"></i><strong>{strings.FRIENDS_COPIED_LINK}</strong></div> 
            }
            <div className="settings-modal modal fade" id="invite-friends" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <p className="text-center">{strings.FRIENDS_INVITE_POPUP_TITLE}</p>
                            <div className="inner">
                                <div className="copyyy_linkk">
                                    <CopyToClipboard text={`${window.location.origin}${country.language_id_code_mapping[parseInt(this.state.language_id)] !== country.default_language ? country.lang_codes.map(data => `/${data}`) : ""}/home/${this.state.user_id}`} onCopy={this.handleText}><span>{`${window.location.origin}${country.language_id_code_mapping[parseInt(this.state.language_id)] !== country.default_language ? country.lang_codes.map(data => `/${data}`) : ""}/home/${this.state.user_id}`}</span></CopyToClipboard>
                                    <CopyToClipboard text={`${window.location.origin}${country.language_id_code_mapping[parseInt(this.state.language_id)] !== country.default_language ? country.lang_codes.map(data => `/${data}`) : ""}/home/${this.state.user_id}`} onCopy={this.handleText}><span className="btn-copyyy_linkk"></span></CopyToClipboard>
                                </div>
                                <ul key="cph-u-5" className="ep--share">
                                    <li><a href={ facebookText }  target='#' className="facebook"><i className="fa fa-facebook-square" aria-hidden="true"></i>{""}</a></li>
                                    <li><a href={ twitterText }  target='_blank' className="twitter"><i className="fa fa-twitter" aria-hidden="true"></i>{""}</a></li>
                                    <li><a href={ whatsappText } target="_blank" className="whatsapp"><i className="fa fa-whatsapp" aria-hidden="true"></i>{""}</a></li>
                                    <li><a href="https://m.me/" target="_blank" className="messenger"><img src={ facebook_messenger } alt="facebook_messenger" /></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        if(isWindows) {
            return (
                <Twemoji options={{ className: 'emoji', folder: 'svg', ext: '.svg' }} >
                    {profileHeader}
                </Twemoji>
            )
        } else {    
            return profileHeader
        }
    }
}
export default CommonProfileHeader;