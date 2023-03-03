import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import logo_sm_gray from '../Assets/images/logo-sm-gray.svg';
import Summary from '../Components/Summary';
import Introduction from '../Components/Introduction';
import CareerPath from '../Components/CareerPath';
import RomanticRelationships from '../Components/RomanticRelationships';
import Lifestyle from '../Components/Lifestyle';
import Atwork from '../Components/Atwork';
import Interpersonal from '../Components/Interpersonal';
import InterpersonalExtendedProfileExpire from '../Components/InterpersonalExtendedProfileExpire';
import ExtendedProfileIntroduction from '../Components/ExtendedProfileIntroduction';
import FriendsInterpersonal from '../Components/FriendsInterpersonal';
import FriendsLogoutInterpersonal from '../Components/FriendsLogoutInterpersonal';

import country from '../CommonComponent/Country';
import url from './CommonURL';
import LocalizedStrings from 'react-localization';
import { language } from '../Components/Language';
import Twemoji from 'react-twemoji';
import {isWindows} from 'react-device-detect';
import renderHTML from 'react-render-html';

let strings = new LocalizedStrings(language);

class CommonProfileLeft extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: Object.keys(url.PROFILE_LEFT_NAV)[1],
            language_id: '',
            rid: '',
            user_id: '',
            auth: '',
            loading: false,
            gender: ''
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)

        let user_id = localStorage.getItem("user_id")
        let auth = localStorage.getItem("auth")
        let language_id = localStorage.getItem("language_id")
        let rid = localStorage.getItem("rid")
        let active = localStorage.getItem("profile")
        let gender = localStorage.getItem("gender")
        let  browser_url = window.location.href
        let  userid = browser_url.split(country.profile)[1] ? browser_url.split(country.profile)[1].split("?")[0] : ""

        this.setState({
            user_id: userid ? userid : user_id,
            auth: auth,
            language_id: language_id,
            rid: rid,
            active: active,
            gender: gender
        })
        
        $(document).ready( function() {
            $('.onclickk_opeennn_all').click( function(e) {
                $(this).hide();
                $('.leftt_all_iconss').show().css( 'top', '0' );
                $('.left_menusssss').show().css( 'bottom', '30px' );
                
                e.preventDefault();
            });
    
            $('.leftt_all_iconss').click( function(e) {
                $(this).hide().css( 'top', '100%' );
                $('.left_menusssss').hide().css( 'bottom', '-100%' );
                $('.onclickk_opeennn_all').show();
                e.preventDefault();
            });
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
            
            function header_sticky() {
                if( !$('body').hasClass('sales-couples') && !$('body').hasClass('sales-compatibility') ) {	
                    $('#profile-header').sticky({	
                        topSpacing: 0,	
                        zIndex: 1050	
                    });	
                }
    
                $('.test-header.sticky').sticky({
                    topSpacing: 0,
                    zIndex: 1050
                });
    
                if( $('body').hasClass('template-homepage') ) {	
                    $('#site-header').hide();	
                } else {	
                    $('#site-header').sticky({	
                        topSpacing: 0,	
                        zIndex: 1050	
                    });	
                }
    
                function scrollDetection() {
                    var scrollPosition = 0;
        
                    $(window).scroll(function () {
                        var header_height = $('#profile-header').outerHeight();
    
                        if( !header_height && $('.test-header.sticky').length ) {
                            header_height = $('.test-header.sticky').outerHeight();
                        } else if( !header_height && $('#site-header').length ) {
                            header_height = $('#site-header').outerHeight();
                        }
    
                        var cursorPosition = $(this).scrollTop();
                        
                        if( cursorPosition > header_height ) {
                            if( cursorPosition > scrollPosition ) {
                                $('body').removeClass('scroll-up').addClass('scroll-down');
                            } else if ( cursorPosition < scrollPosition ) {
                                $('body').removeClass('scroll-down').addClass('scroll-up');
                            }
                        } else {
                            $('body').removeClass('scroll-up scroll-down');
                        }
                        if( $('body').hasClass('template-homepage') ) {	
                            if( cursorPosition > 400 ) {	
                                $('#site-header').show().sticky({	
                                    topSpacing: 0,	
                                    zIndex: 1050	
                                });	
                            } else {	
                                $('#site-header').unstick().hide();	
                            }	
                        }
                        scrollPosition = cursorPosition;
                    });
                }
    
                scrollDetection();
            }
    
            header_sticky();

            function sidenav_init() {
                var $content = $( '#profile-content' ),
                    $button = $( 'button.profile-header__toggler' ),
                    last_position = null,
                    isOpen = false;
    
                initEvents();
    
                function initEvents() {
                    $button.on('click', function(e) {
                        e.preventDefault();
                        toggleMenu();
                    });
    
                    $content.on('click', function(e) {
                        if( isOpen && e.target !== $button ) {
                            toggleMenu();
                        }
                    });
                }
    
                function toggleMenu() {
                    if( isOpen ) {
                        $('body').removeClass('open-sidenav');
                        $('#main.profile-main, body').css('height', 'auto');
                        $('#profile-sidenav').css('min-height', '100%');
    
                        if( last_position ) {
                            $(window).scrollTop(last_position);
                        }
                    } else {
                        var h = window.innerHeight || $(window).height();
                        last_position = $(window).scrollTop();
                        
                        $('#profile-content').css('top', '-' + last_position + 'px');
                        $('body').addClass('open-sidenav');
                        $('#main.profile-main, body').css('height', h-40);
                        $('#profile-sidenav').css('min-height', h);
                    }
    
                    isOpen = !isOpen;
                }
            }
    
            sidenav_init();
        });
    }

    activateTab = (name) => {
        window.scrollTo(0, 0)
        localStorage.setItem("profile", name)
        this.setState({
            active: name
        })
        if(!this.props.user_report_data && name != Object.keys(url.PROFILE_LEFT_NAV)[7]) {
            window.location.replace(`${url.ORIGIN_URL}/profile/${this.state.user_id}`)
        }
    }

    handleExtendedProfile = () => {
        
        localStorage.setItem("profile", Object.keys(url.PROFILE_LEFT_NAV)[7])
        let mystery_stat = localStorage.getItem('mystery_status');
        this.setState({loading: true})
        if(mystery_stat==='0')
        {
            fetch(`${url.BASE_URL}/mystery`, {
                method: "PUT",
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
                if(data.status === 200) {
                    window.location.replace(`${url.ORIGIN_URL}/extendedprofile`)
                }
                else {
                    this.props.commanHandler("error500");
                }
            }) 
        }
        else {
            window.location.replace(`${url.ORIGIN_URL}/extendedprofile`)
        }
        
    }

    menuRendering=(startIndex,endIndex)=>{
        let profileMenuEmojiItems = ['⏳','🙋','❤️','🔮','😁','💼','👥','🔑'];
        for(let i=startIndex; i<=endIndex;i++){
            if( this.state.active === Object.keys(url.PROFILE_LEFT_NAV)[i])
            return ( <Link to="#">{profileMenuEmojiItems[i]}<span>{ strings[url.PROFILE_LEFT_NAV[Object.keys(url.PROFILE_LEFT_NAV)[i]]]}</span></Link>)
        }
    }
  

    render() {
        
        strings.setLanguage(this.state.language_id);
        
        let profileLeft = <div>
                { this.state.loading && <div className="loader"></div> }
                <div id="profile-content" className="main_onclick_lefthide">
                    <div className="module_mainnnnnn_one">
                        <div className="mobile_leftt_meuu">
                            <div className="onclickk_opeennn_all" style={{border:"0px"}}>
                                {
                                    this.menuRendering(0,7)
                                }
                            </div>
                            <div className="leftt_all_iconss">
                                <div className="left_menusssss">
                                    <ul key="cpl-u-1">
                                        {this.props.access_type === "is_login_public" || this.props.access_type === "is_logged_out_public" ? <li key="cpl-u-1-l-1" onClick={() => this.activateTab(Object.keys(url.PROFILE_LEFT_NAV)[0])}><Link to="#" className={this.state.active === Object.keys(url.PROFILE_LEFT_NAV)[0] ? "active": ""}>⏳<span>{strings[url.PROFILE_LEFT_NAV[Object.keys(url.PROFILE_LEFT_NAV)[0]]]}</span></Link></li> : ""}
                                        <li key="cpl-u-1-l-2" onClick={() => this.activateTab(Object.keys(url.PROFILE_LEFT_NAV)[1])}><Link to="#" className={this.state.active === Object.keys(url.PROFILE_LEFT_NAV)[1] ? "active": ""}>🙋<span>{strings[url.PROFILE_LEFT_NAV[Object.keys(url.PROFILE_LEFT_NAV)[1]]]}</span></Link></li>
                                        <li key="cpl-u-1-l-3" onClick={() => this.activateTab(Object.keys(url.PROFILE_LEFT_NAV)[2])}><Link to="#" className={this.state.active === Object.keys(url.PROFILE_LEFT_NAV)[2] ? "active": ""}>❤️<span>{strings[url.PROFILE_LEFT_NAV[Object.keys(url.PROFILE_LEFT_NAV)[2]]]}</span></Link></li>
                                        <li key="cpl-u-1-l-4" onClick={() => this.activateTab(Object.keys(url.PROFILE_LEFT_NAV)[3])}><Link to="#" className={this.state.active === Object.keys(url.PROFILE_LEFT_NAV)[3] ? "active": ""}>🔮<span>{strings[url.PROFILE_LEFT_NAV[Object.keys(url.PROFILE_LEFT_NAV)[3]]]}</span></Link></li>
                                        <li key="cpl-u-1-l-5" onClick={() => this.activateTab(Object.keys(url.PROFILE_LEFT_NAV)[4])}><Link to="#" className={this.state.active === Object.keys(url.PROFILE_LEFT_NAV)[4] ? "active": ""}>😁<span>{strings[url.PROFILE_LEFT_NAV[Object.keys(url.PROFILE_LEFT_NAV)[4]]]}</span></Link></li>
                                        <li key="cpl-u-1-l-6" onClick={() => this.activateTab(Object.keys(url.PROFILE_LEFT_NAV)[5])}><Link to="#" className={this.state.active === Object.keys(url.PROFILE_LEFT_NAV)[5] ? "active": ""}>💼<span>{strings[url.PROFILE_LEFT_NAV[Object.keys(url.PROFILE_LEFT_NAV)[5]]]}</span></Link></li>
                                        {this.props.access_type === "is_login_private" || this.props.access_type === "is_login_public" || this.props.access_type === "is_logged_out_public" ? <li key="cpl-u-1-l-7" onClick={() => this.activateTab(Object.keys(url.PROFILE_LEFT_NAV)[6])}><Link to="#" className={this.state.active === Object.keys(url.PROFILE_LEFT_NAV)[6] ? "active": ""}>👥<span>{strings[url.PROFILE_LEFT_NAV[Object.keys(url.PROFILE_LEFT_NAV)[6]]]}</span></Link></li> : ""}
                                        {(this.props.mysterystatus != null ) && (this.props.access_type == "is_login_private" && this.props.mysterystatus != 3) ? <li key="cpl-u-1-l-8" onClick={() => this.activateTab(Object.keys(url.PROFILE_LEFT_NAV)[7])}><a className={this.state.active === Object.keys(url.PROFILE_LEFT_NAV)[7] ? "active": ""} onClick={this.handleExtendedProfile} href="/extendedprofile">🔑<span>{strings[url.PROFILE_LEFT_NAV[Object.keys(url.PROFILE_LEFT_NAV)[7]]]}</span></a></li>: ""}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="left_side_barr">
                            <div className="leftt_mainn">
                                { this.props.access_type === "is_login_private" &&
                                    <div>
                                        {localStorage.getItem("user_profile_pic") !== "null" ? 
                                            <div className="uppr_top_left text-center">
                                                <img src={localStorage.getItem("user_profile_pic")+"#" + new Date().getTime()} alt="pro_small_1"/>
                                                <p>{renderHTML(strings.formatString(strings.PROFILE_KEY_YOUR))}</p>
                                            </div>
                                        :  
                                            <div className="uppr_top_left text-center">
                                                <div className="profile-nophoto">
                                                    <img src={ logo_sm_gray } alt="logo_sm_gray"  />
                                                </div>
                                                <p>{renderHTML(strings.formatString(strings.PROFILE_KEY_YOUR))}</p>
                                            </div>  
                                        }
                                    </div>     
                                }    
                                { this.props.access_type === "is_login_public" &&  
                                    <div>
                                        {this.props.someElseUserProfile !== null ? 
                                            <div className="uppr_top_left text-center">
                                                <img className="user_profile_pic" src={this.props.someElseUserProfile} alt="pro_big"/>
                                                <p>{renderHTML(strings.formatString(strings.PROFILE_TITLE,this.props.someElseProfileFirstname))}</p>
                                            </div> 
                                        :  
                                        <div className="uppr_top_left text-center">
                                            <div className="profile-nophoto">
                                                <img src={ logo_sm_gray } alt="logo_sm_gray"  />
                                            </div>
                                            <p>{renderHTML(strings.formatString(strings.PROFILE_TITLE,this.props.someElseProfileFirstname))}</p>
                                        </div>
                                        }  
                                    </div> 
                                }
                                {this.props.access_type === "is_logged_out_public" &&
                                    <div> 
                                        {this.props.someElseLogoutUserProfile !== null ?
                                        <div className="uppr_top_left text-center">
                                            <img className="user_profile_pic" src={this.props.someElseLogoutUserProfile} alt="pro_big"/>
                                            <p>{renderHTML(strings.formatString(strings.PROFILE_TITLE,this.props.someElseProfileFirstname))}</p>                                            
                                        </div> 
                                        :
                                        <div className="uppr_top_left text-center">
                                            <div className="profile-nophoto">
                                                <img src={ logo_sm_gray } alt="logo_sm_gray"  />
                                            </div>
                                            <p>{renderHTML(strings.formatString(strings.PROFILE_TITLE,this.props.someElseProfileFirstname))}</p>
                                        </div>
                                        }
                                    </div> 
                                }
                                <div className="bottom_menusss">
                                    <ul key="cpl-u-2">
                                        {this.props.access_type === "is_login_public" || this.props.access_type === "is_logged_out_public" ? <li key="cpl-u-2-l-1" onClick={() => this.activateTab(Object.keys(url.PROFILE_LEFT_NAV)[0])}><Link to="#" className={this.state.active === Object.keys(url.PROFILE_LEFT_NAV)[0] ? "active": ""}>⏳<span>{strings[url.PROFILE_LEFT_NAV[Object.keys(url.PROFILE_LEFT_NAV)[0]]]}</span></Link></li> : ""}
                                        <li key="cpl-u-2-l-2" onClick={() => this.activateTab(Object.keys(url.PROFILE_LEFT_NAV)[1])}><Link to="#" className={this.state.active === Object.keys(url.PROFILE_LEFT_NAV)[1] ? "active": ""}>🙋<span>{strings[url.PROFILE_LEFT_NAV[Object.keys(url.PROFILE_LEFT_NAV)[1]]]}</span></Link></li>
                                        <li key="cpl-u-2-l-3" onClick={() => this.activateTab(Object.keys(url.PROFILE_LEFT_NAV)[2])}><Link to="#" className={this.state.active === Object.keys(url.PROFILE_LEFT_NAV)[2] ? "active": ""}>❤️<span>{strings[url.PROFILE_LEFT_NAV[Object.keys(url.PROFILE_LEFT_NAV)[2]]]}</span></Link></li>
                                        <li key="cpl-u-2-l-4" onClick={() => this.activateTab(Object.keys(url.PROFILE_LEFT_NAV)[3])}><Link to="#" className={this.state.active === Object.keys(url.PROFILE_LEFT_NAV)[3] ? "active": ""}>🔮<span>{strings[url.PROFILE_LEFT_NAV[Object.keys(url.PROFILE_LEFT_NAV)[3]]]}</span></Link></li>
                                        <li key="cpl-u-2-l-5" onClick={() => this.activateTab(Object.keys(url.PROFILE_LEFT_NAV)[4])}><Link to="#" className={this.state.active === Object.keys(url.PROFILE_LEFT_NAV)[4] ? "active": ""}>😁<span>{strings[url.PROFILE_LEFT_NAV[Object.keys(url.PROFILE_LEFT_NAV)[4]]]}</span></Link></li>
                                        <li key="cpl-u-2-l-6" onClick={() => this.activateTab(Object.keys(url.PROFILE_LEFT_NAV)[5])}><Link to="#" className={this.state.active === Object.keys(url.PROFILE_LEFT_NAV)[5] ? "active": ""}>💼<span>{strings[url.PROFILE_LEFT_NAV[Object.keys(url.PROFILE_LEFT_NAV)[5]]]}</span></Link></li>
                                        {this.props.access_type === "is_login_private" && <li key="cpl-u-2-l-7" onClick={() => this.activateTab(Object.keys(url.PROFILE_LEFT_NAV)[6])}><Link to="#" className={this.state.active === Object.keys(url.PROFILE_LEFT_NAV)[6] ? "active": ""}>👥<span>{strings[url.PROFILE_LEFT_NAV[Object.keys(url.PROFILE_LEFT_NAV)[6]]]}</span></Link></li>}
                                        {(this.props.mysterystatus != null ) && (this.props.access_type == "is_login_private" && this.props.mysterystatus != 3) ? <li key="cpl-u-2-l-8" onClick={() => this.activateTab(Object.keys(url.PROFILE_LEFT_NAV)[7])}><a className={this.state.active === Object.keys(url.PROFILE_LEFT_NAV)[7] ? "active": ""} onClick={this.handleExtendedProfile} href="/extendedprofile">🔑<span>{strings[url.PROFILE_LEFT_NAV[Object.keys(url.PROFILE_LEFT_NAV)[7]]]}</span></a></li>: ""}
                                    </ul>
                                    {this.props.access_type === "is_login_public" || this.props.access_type === "is_logged_out_public" ?
                                    <div className="similarityscore">
                                        <Link to="#" onClick={() => this.activateTab(Object.keys(url.PROFILE_LEFT_NAV)[6])} className={this.state.active === Object.keys(url.PROFILE_LEFT_NAV)[6] ? "active": ""}>👥<span>{strings[url.PROFILE_LEFT_NAV[Object.keys(url.PROFILE_LEFT_NAV)[6]]]}</span></Link>
                                    </div>

                                    : ""

                                    }
                                </div>
                            </div>
                        </div>
                        {
                            this.state.active === Object.keys(url.PROFILE_LEFT_NAV)[0] &&
                            <Summary activateTab = {this.activateTab} personality_before={this.props.personality_before} personality={this.props.personality} firstname={this.props.firstname} someElseProfileFirstname={this.props.someElseProfileFirstname} mystery_status={this.state.mystery_status} gender={this.props.gender} {...this.props}/> 
                        } 
                        {
                            this.state.active === Object.keys(url.PROFILE_LEFT_NAV)[1] &&
                            <Introduction activateTab = {this.activateTab} personality_before={this.props.personality_before} personality={this.props.personality} firstname={this.props.firstname} someElseProfileFirstname={this.props.someElseProfileFirstname} mystery_status={this.state.mystery_status} access_type={this.props.access_type} gender={this.props.gender} {...this.props} /> 
                        }  
                        {
                            this.state.active === Object.keys(url.PROFILE_LEFT_NAV)[2] &&
                            <RomanticRelationships activateTab = {this.activateTab} access_type={this.props.access_type} {...this.props}/> 
                        } 
                        {
                            this.state.active === Object.keys(url.PROFILE_LEFT_NAV)[3] &&
                            <CareerPath activateTab = {this.activateTab} access_type={this.props.access_type} personality={this.props.personality} {...this.props} /> 
                        } 
                        {
                            this.state.active === Object.keys(url.PROFILE_LEFT_NAV)[4] &&
                            <Lifestyle activateTab = {this.activateTab} access_type={this.props.access_type}{...this.props} /> 
                        } 
                        {
                            this.state.active === Object.keys(url.PROFILE_LEFT_NAV)[5] &&
                            <Atwork activateTab = {this.activateTab} access_type={this.props.access_type} {...this.props}/> 
                        } 
                        {
                            (this.state.active === Object.keys(url.PROFILE_LEFT_NAV)[6] && this.props.access_type === "is_login_private" && localStorage.getItem("mystery_status") !== '3') &&
                            <Interpersonal activateTab = {this.activateTab} access_type = {this.props.access_type} firstname={this.props.firstname} {...this.props}/> 
                        }
                        {
                            (this.state.active === Object.keys(url.PROFILE_LEFT_NAV)[6] && this.props.access_type === "is_login_private" && localStorage.getItem("mystery_status") == '3') &&
                            <InterpersonalExtendedProfileExpire /> 
                        }
                        {
                            this.state.active === Object.keys(url.PROFILE_LEFT_NAV)[7] && localStorage.getItem("mystery_status") === '2' &&
                            <ExtendedProfileIntroduction personality_before={this.props.personality_before} personality={this.props.personality} firstname={this.props.firstname} someElseProfileFirstname={this.props.someElseProfileFirstname} mystery_status={this.state.mystery_status} gender={this.props.gender} {...this.props}/> 
                        } 
                        {
                            this.state.active === Object.keys(url.PROFILE_LEFT_NAV)[6] && this.props.access_type === "is_login_public" &&
                            <FriendsInterpersonal someElseProfileFirstname = {this.props.someElseProfileFirstname} someElseProfileName={this.state.someElseProfileName} someElseUserProfile = {this.props.someElseUserProfile} {...this.props} />
                        } 
                        {
                            this.state.active === Object.keys(url.PROFILE_LEFT_NAV)[6] && this.props.access_type === "is_logged_out_public" &&
                            <FriendsLogoutInterpersonal someElseProfileFirstname = {this.props.someElseProfileFirstname} someElseProfileName={this.state.someElseProfileName} someElseLogoutUserProfile = {this.props.someElseLogoutUserProfile} {...this.props} />
                        } 
                    </div>
                </div>   
        </div>
        if(isWindows) {
            return (
                <Twemoji options={{ className: 'emoji', folder: 'svg', ext: '.svg' }} >
                    {profileLeft}
                </Twemoji>
            )
        } else {    
            return profileLeft
        }
    }
}

export default CommonProfileLeft;