import React, { Component } from 'react';
import $ from 'jquery';
import logo from '../Assets/images/logo.svg'; 
import LocalizedStrings from 'react-localization';
import url from '../CommonComponent/CommonURL';
import { language } from '../Components/Language';
import country from './Country';

let strings = new LocalizedStrings(language);

class CommonHeader extends Component {
    constructor() {
        super();
        this.state = {
            language_id: '',
            auth: '',
            user_profile_pic: '',
            firstname: '',
            user_id: ''
        }
    }

    componentDidMount() {
        let language_id = localStorage.getItem("language_id") ? localStorage.getItem("language_id") : this.props.language_id
        let auth = localStorage.getItem("auth")
        let user_profile_pic = localStorage.getItem("user_profile_pic")
        let firstname = localStorage.getItem("firstname")
        let user_id = localStorage.getItem("user_id")
        
        this.setState({
            language_id: language_id,
            auth: auth,
            user_profile_pic: user_profile_pic,
            firstname: firstname,
            user_id: user_id
        })
    }

    componentDidUpdate() {
        $(document).ready(function () {          
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

                        if (!header_height && $('.test-header.sticky').length) {
                            header_height = $('.test-header.sticky').outerHeight();
                        } else if (!header_height && $('#site-header').length) {
                            header_height = $('#site-header').outerHeight();
                        }
                        var cursorPosition = $(this).scrollTop();

                        if (cursorPosition > header_height) {
                            if (cursorPosition > scrollPosition) {
                                $('body').removeClass('scroll-up').addClass('scroll-down');
                            } else if (cursorPosition < scrollPosition) {
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
        });
    }

    handleLanguageChange = (e) => {
        e.preventDefault();

        let language_id = e.target.value;
        localStorage.setItem("language_id", e.target.value)
        this.setState(({
            language_id: language_id
        }))
        this.props.getLanguageCode(language_id);
    }

    handleProfile = () => {
        localStorage.setItem("profile", Object.keys(url.PROFILE_LEFT_NAV)[1])
    }

    toggleClick = (toogle) => {
        if(toogle == 'show') {
            $('#mobile-menu').toggleClass('show');
        } else if(toogle == 'hide') {
            $('#mobile-menu').removeClass('show');
        }
    }

    render() {
        strings.setLanguage(this.props.language_id ? this.props.language_id : this.state.language_id);
        let default_language_id  = Object.keys(country.language_id_code_mapping).find(k=>country.language_id_code_mapping[k]==country.default_language);
        return (
            <div>
                <div id="mobile-menu">
                    <div className="inner">
                        <div className="d-flex align-items-center justify-content-between mobile-menu-header">
                            <a href={this.state.auth ? "/home" : "/"} className="logo">
                                <img alt="" src={logo} />
                            </a>
                            <button type="button" onClick={() => this.toggleClick('hide')}  className="toggle-menu active">
                                <span></span>
                                <span></span>
                                <span></span>
                            </button>
                        </div>
                        <ul key="ch-u-1" className="menu">
                            <li key="ch-u-1-l-1"><a href="/research">{ strings.HEADER_RESEARCH }</a></li>
                            <li key="ch-u-1-l-2"><a href="/our-model">{ strings.HEADER_OURMODEL }</a></li> 
                            {this.state.auth ? 
                            <>
                                <li key="ch-u-1-l-3" className = { this.state.user_profile_pic !== "null" ? "menu-item-profile" : "" }> 
                                    { this.state.user_profile_pic !== "null" ? 
                                    <a href={`${url.ORIGIN_URL}/profile/${this.state.user_id}`} onClick={this.handleProfile}><img src={this.state.user_profile_pic+"#" + new Date().getTime()} alt="" /><span>{this.state.firstname}</span></a>
                                    :
                                    <a href={`${url.ORIGIN_URL}/profile/${this.state.user_id}`} onClick={this.handleProfile}>{this.state.firstname}</a>
                                    }
                                </li>  
                            </>
                            :
                            <>
                                <li key="ch-u-1-l-4"><a href="/login">{ strings.HEADER_LOGIN }</a></li>
                                <li key="ch-u-1-l-5">
                                    <div className="lang-dropdown">
                                        <select value={this.state.language_id} onChange={this.handleLanguageChange} name="" className={localStorage.getItem('language_id')==default_language_id  ? '' : 'language_dropdown'}>
                                        {country.language_id_name_mapping && country.language_id_name_mapping.map(data =>{
                                            return (
                                                <option key={data.id} value={data.id}>{data.name}</option>
                                            )
                                        })}
                                        </select>
                                    </div>
                                </li>
                            </>
                            }
                        </ul>
                        {this.state.auth ? "" : <a href="/test" className="btn btn-primary btn-icon"><span>{ strings.HEADER_TEST }</span></a>}
                    </div>
                </div>
                <header id="site-header">
                    <div className="container-fluid d-flex align-items-center justify-content-between">
                        <a href={this.state.auth ? "/home" : "/"} className="logo">
                            <img alt="" src={ logo } />
                            <strong>{ strings.INTERPERSONALITY }</strong>
                        </a>
                        <ul key="ch-u-2" className="menu d-lg-flex align-items-center d-none">
                            <li key="ch-u-2-l-1" className="research"><a href="/research" >{ strings.HEADER_RESEARCH }</a></li>
                            <li key="ch-u-2-l-2" className="our-model" ><a href="/our-model" >{ strings.HEADER_OURMODEL }</a></li>
                            { 
                            this.state.auth ? ''
                            :
                            <>
                            <li key="ch-u-2-l-3"><a href="/login" >{ strings.HEADER_LOGIN }</a></li>
                            <li key="ch-u-2-l-4">
                                <div className="lang-dropdown">
                                    <select value={this.state.language_id} onChange={this.handleLanguageChange} name="" className={localStorage.getItem('language_id')==default_language_id  ? '' : 'language_dropdown'}>
                                    {country.language_id_name_mapping && country.language_id_name_mapping.map(data =>{
                                        return (
                                            <option key={data.id} value={data.id}>{data.name}</option>
                                        )
                                    })}
                                    </select>
                                </div>
                            </li>
                            </>
                            }
                        </ul>
                        {this.state.auth ? 
                        <div className="user d-none d-lg-block">
                            <a href={`${url.ORIGIN_URL}/profile/${this.state.user_id}`} onClick={this.handleProfile}>
                                { this.state.user_profile_pic !== "null" ? <img src={this.state.user_profile_pic+"#" + new Date().getTime() } alt="" /> : "" }
                                <span>{this.state.firstname }</span>
                            </a>
                        </div>
                        :
                        <a href="/test"  className="btn btn-primary d-none d-lg-block">{ strings.HEADER_TEST }</a>
                        }
                        <button type="button" onClick={() => this.toggleClick('show')} className="toggle-menu d-lg-none">
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </header>
            </div>
        )
    }
}

export default CommonHeader;
