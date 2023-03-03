import React, { Component } from 'react';

import logo from '../Assets/images/logo.svg'; 
import $ from 'jquery';
import jQuery from 'jquery';

import LocalizedStrings from 'react-localization';
import { language } from '../Components/Language';
import country from '../CommonComponent/Country';
import url from '../CommonComponent/CommonURL';

let strings = new LocalizedStrings(language);

const default_language_id  = Object.keys(country.language_id_code_mapping).find(k=>country.language_id_code_mapping[k]==country.default_language);

class Sidenav extends Component {
    constructor() {
        super();
        this.state = {
            active: 'profile',
            language_id: '',
            user_id: '',
            firstname:''
        }
    }
    
    componentDidMount() {
        let language_id = localStorage.getItem("language_id") === null ? default_language_id  : localStorage.getItem("language_id");
        let user_id = localStorage.getItem("user_id");
        let active = this.props.active

        this.setState({
            language_id: language_id,
            user_id: user_id,
            active: active,
            firstname:localStorage.getItem("firstname")
        })

        setTimeout(() => {
            this.setState({
                firstname:localStorage.getItem("firstname"),
                language_id : localStorage.getItem("language_id") === null ? default_language_id  : localStorage.getItem("language_id")
            })
        }, 2000);

        $(".navbar-toggler").click(function(){
            $(".main").toggleClass("nav_fix");
            $(".mobile_nav").toggleClass("mob_fix");
            
          });
          
          $(".friend_section").click(function(){
            $(".main").removeClass("nav_fix");
            $(".mobile_nav").removeClass("mob_fix");
          });
          
        (function($) {
            $(document).ready( function() {
              var lastScrollTop = 0;
        
              $('div.freinddd_listttt a').on('click', function(e) {
                  e.preventDefault();
              });
        
              $(window).scroll( function() {
                  if( $('div.test-progress').length ) {
                      var posTop = $(window).scrollTop();
                      
                      if( posTop  > 150 && posTop < lastScrollTop ) {
                          $('.test-header').addClass('sticky');
                      } else {
                          $('.test-header').removeClass('sticky');
                      }
        
                      lastScrollTop = posTop;
                  }
              });
        
              function sidenav_init() {
                  var $content = $( '#profile-content' ),
                      $button = $( 'button.profile-header__toggler' ),
                      isOpen = false;
                      $('body').removeClass('open-sidenav');
                    $('#main.profile-main').css('height', 'auto');
                    $('#profile-sidenav').css('min-height', '100%');
        
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
                          $('#main.profile-main').css('height', 'auto');
                          $('#profile-sidenav').css('min-height', '100%');
                      } else {
                          $('body').addClass('open-sidenav');
                          var h = $(window).height();
                          $('#main.profile-main').css('height', h-40);
                          $('#profile-sidenav').css('min-height', h);
                      }
                      isOpen = !isOpen;
                  }
              }
        
              sidenav_init();
            });
        })(jQuery);
    }
    

    static getDerivedStateFromProps(props, state){
        if(props.active != state.active){
            return{
                active:props.active
            }
        }else{
            return null;
        }
        
    }
    activateTab = (name) => {
        this.setState({
            active: name
        })
        localStorage.setItem("Settings", "Basic Info")
    }
    
    setProfile = () => {
        localStorage.setItem("profile", Object.keys(url.PROFILE_LEFT_NAV)[1])
    }
  
    handleSettings = () => {
        localStorage.setItem("profile", Object.keys(url.PROFILE_LEFT_NAV)[1])
        localStorage.setItem("Settings", "Basic Info")
    }

    toggleCancelClick = () => {
        $('#mobile-menu').removeClass('show');
    }

    render() {

        strings.setLanguage(this.state.language_id);

        const aside = this.props.someElseProfileLoggedOut ?
            <div id="mobile-menu">
                <div className="inner">
                    <div className="d-flex align-items-center justify-content-between mobile-menu-header">
                        <a href="/" className="logo">
                            <img alt="" src={ logo } />
                        </a>
                        <button type="button" onClick={this.toggleCancelClick} className="toggle-menu active">
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                    <ul key="sn-u-1" className="menu">
                        <li key="sn-u-1-l-1"><a href="/research">{ strings.HEADER_RESEARCH }</a></li>
                        <li key="sn-u-1-l-2"><a href="/our-model">{ strings.HEADER_OURMODEL }</a></li>
                        <li key="sn-u-1-l-3"><a href="/login">{ strings.HEADER_LOGIN }</a></li>
                        <li key="sn-u-1-l-4">
                            <div className="lang-dropdown">
                                <select value={this.state.language_id} onChange={this.props.handleLanguageChange} name="" className={localStorage.getItem('language_id')==default_language_id  ? '' : 'language_dropdown'}>
                                {country.language_id_name_mapping && country.language_id_name_mapping.map(data =>{
                                    return (
                                        <option key={data.id} value={data.id}>{data.name}</option>
                                    )
                                })}
                                </select>
                            </div>
                        </li>
                    </ul>
                    <a href="/test" className="btn btn-primary btn-icon"><span>{ strings.HEADER_TEST }</span></a>
                </div>
            </div>
            :
            <aside id="profile-sidenav">
                <div className="profile-sidenav__inner">
                    <ul key="sn-u-2" className="menu menu-top">
                        <li key="sn-u-2-l-1" className={this.state.active === 'profile' ? "current-menu-item": ""}>
                            <a id="profile" onClick={() => this.activateTab('profile')} onClick={this.setProfile} href={`/${this.state.user_id}`} >
                            { localStorage.getItem('user_profile_pic') !== "null" && localStorage.getItem('user_profile_pic') !== null && <img src={localStorage.getItem('user_profile_pic')+"#" + new Date().getTime()}alt="pro_small_1" className="rounded-circle" />}{this.state.firstname?this.state.firstname:localStorage.getItem("firstname")}</a>
                        </li>
                        {/* <li key="sn-u-2-l-2" className={ this.props.active === 'friends' || this.state.active === 'friends' ? "current-menu-item": ""}>
                            <a id="friends" onClick={() => this.activateTab('friends')} onClick={this.setProfile} href="/friends">{strings.HEADER_FRNDS}<span className="sr-only">(current)</span></a>
                        </li> */}
                        <li key="sn-u-2-l-3" className={this.state.active === 'relationships' ? "current-menu-item": ""}>
                            <a id="relationships" onClick={() => this.activateTab('relationships')} onClick={this.setProfile} href="/guides">{strings.HEADER_RELATIONSHIPS}</a>
                        </li>
                        <li key="sn-u-2-l-4" className={this.state.active === 'settings' ? "current-menu-item": ""}>
                            <a id="settings" onClick={() => this.activateTab('settings')} href="/settings" onClick={this.handleSettings}>{strings.HEADER_SETTINGS.charAt(0).toUpperCase() + strings.HEADER_SETTINGS.slice(1).toLowerCase()}</a>
                        </li>
                    </ul>
                    <ul key="sn-u-3" className="menu menu-bottom">
                        <li key="sn-u-3-l-1"><a href="/home" onClick={this.setProfile}>{strings.HEADER_HOMEPAGE}</a></li>
                        <li key="sn-u-3-l-2"><a href="/research" onClick={this.setProfile}>{strings.HEADER_RESEARCH}</a></li>
	                    <li key="sn-u-3-l-3"><a href="/our-model">{strings.HEADER_OURMODEL}</a></li>
                    </ul>
                </div>
            </aside>

        return (
            aside
        )
    }
}

export default Sidenav;
