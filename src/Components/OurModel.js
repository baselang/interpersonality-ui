import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import jQuery from 'jquery';
import Twemoji from 'react-twemoji';
import {isWindows} from 'react-device-detect';
import our_model_top from '../Assets/images/v2/our_model_top.svg';
import renderHTML from 'react-render-html';
import linkHeader from '../CommonComponent/Link';
import url from '../CommonComponent/CommonURL';
import CommonHeader from '../CommonComponent/CommonHeader';
import CommonFooter from '../CommonComponent/CommonFooter';
import LocalizedStrings from 'react-localization';
import { language } from './Language';
import $ from 'jquery';
import Section from '../CommonComponent/Section';
import '../Assets/css/style_manual.css'

let strings = new LocalizedStrings(language);

class OurModel extends Component {
    constructor() {
        super();
        this.state = {
            language_id: '',
            auth: '',
            user_id: ''
        }
    }

    componentDidUpdate(){
        $(document).ready(function () {
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
    
            function scroll_nav() {
                $('div.scroll-nav').sticky({
                    topSpacing: 170,
                    bottomSpacing: 1010,
                    wrapperClassName: 'scroll-nav-sticky-wrapper'
                });
    
                $('.tom-content div.left_menusssss a, div.scroll-nav a').on('click', function(e) {
                    var target = $(this).attr('href');
                    var checkURL = target.match(/#([^\/]+)$/i);
                    if( checkURL[0] ) {
                        var go_position = $(target).offset().top - 100;
                        $('html,body').animate({
                            scrollTop: go_position
                        }, 400);
                    }
                    
                    e.preventDefault();
                });
    
                $(window).on('activate.bs.scrollspy', function(e, obj) {
                    var current_heading = $('div.scroll-nav a[href="' +obj.relatedTarget+ '"]').html();
                    
                    $('div.onclickk_opeennn_all').html( '<a href="#">' + current_heading + '</a>' );
                    $('div.left_menusssss a').removeClass('active');
                    $('div.left_menusssss a[href="' +obj.relatedTarget+ '"]').addClass('active');
                });
    
                $('body').scrollspy({
                    target: 'div.scroll-nav' ,
                    offset: 180
                });
            }
    
            if( $('div.scroll-nav').length ) {
                scroll_nav();
            }

            jQuery("body").addClass("template template-our-model template-ourmodelfooter")
        });
    }

    componentDidMount() {
        
        window.scrollTo(0, 0);
        let language_id = localStorage.getItem("language_id")
        let auth = localStorage.getItem("auth")
        let user_id = localStorage.getItem("user_id")
        this.setState({
            language_id: language_id,
            auth: auth,
            user_id: user_id
        }); 
        if(auth) {
            jQuery("body").addClass("template template-generic")
        } else {
            jQuery("body").addClass("template template-generic no-footer-border")
        }
    }

    getLanguageCode=(lang)=>{
        this.props.getlanguage(lang);
    }


    render() {
        strings.setLanguage(this.state.language_id);
        let headContent = linkHeader.map((lin, index) => {
            return (
                <link key={index} rel={lin.rel} hreflang={lin.hreflang} href={url.ORIGIN_URL + lin.href + "our-model"} />
            )
        })
        let goToTest=''
        if(this.state.auth) {
            localStorage.setItem("profile", Object.keys(url.PROFILE_LEFT_NAV)[1])
            goToTest=`${url.ORIGIN_URL}/profile/${this.state.user_id}`
        } else {
            goToTest='/test'
        }
        let test_status = localStorage.getItem("test_status");
        let ourModel = <div>
            <Helmet>
                {headContent}
                <title>{strings.OUR_MODEL_META_TITLE}</title>
                <meta name="description" content={strings.OUR_MODEL_META_DESCRIPTION} />
            </Helmet>
            <CommonHeader getLanguageCode ={this.getLanguageCode} />
            <section className="tom-header">
                <div className="container text-center">
                    <img alt="" src={ our_model_top } className="" width="212" height="114" />
                    <h1>{strings.OUR_MODEL_TITLE}</h1>
                    <p>{strings.OUR_MODEL_SUBTITLE}</p>
                </div>
            </section>
            <section className="tom-content">
                <div className="mobile_leftt_meuu">
                    <div className="onclickk_opeennn_all">
                        <a href="#">🔑<span>{strings.OUR_MODEL_SIDE_NAV_1}</span></a>
                    </div>
                    <div className="leftt_all_iconss">
                        <div className="left_menusssss">
                            <ul key="om-u-1">
                                <li key='om-u-1-l-1'><a href={"#"+strings.OUR_MODEL_SIDE_NAV_1_ID} className="active">🔑<span>{strings.OUR_MODEL_SIDE_NAV_1}</span></a></li>
                                <li key='om-u-1-l-2'><a href={"#"+strings.OUR_MODEL_SIDE_NAV_2_ID}>🗺<span>{strings.OUR_MODEL_SIDE_NAV_2}</span></a></li>
                                <li key='om-u-1-l-3'> <a className="ourmodel_menu_textwrap" href={"#"+strings.OUR_MODEL_SIDE_NAV_3_ID}>🏆<span>{strings.OUR_MODEL_SIDE_NAV_3}</span></a></li>
                                <li key='om-u-1-l-4'><a href={"#"+strings.OUR_MODEL_SIDE_NAV_4_ID}>🤓<span>{strings.OUR_MODEL_SIDE_NAV_4}</span></a></li>
                                <li key='om-u-1-l-5'><a href={"#"+strings.OUR_MODEL_SIDE_NAV_5_ID}>🙄<span>{strings.OUR_MODEL_SIDE_NAV_5}</span></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div id="scroll-nav" className="scroll-nav d-none d-lg-block">
                        <ul key='om-u-2' className="menu ">
                            <li key='om-u-2-l-1'><a href={"#"+strings.OUR_MODEL_SIDE_NAV_1_ID} className="nav-link"><span className="icon">🔑</span>{strings.OUR_MODEL_SIDE_NAV_1}</a></li>
                            <li key='om-u-2-l-2'><a href={"#"+strings.OUR_MODEL_SIDE_NAV_2_ID} className="nav-link"><span className="icon">🗺</span>{strings.OUR_MODEL_SIDE_NAV_2}</a></li>
                            <li key='om-u-2-l-3'><a href={"#"+strings.OUR_MODEL_SIDE_NAV_3_ID} className="nav-link"><span className="icon">🏆</span>{strings.OUR_MODEL_SIDE_NAV_3}</a></li>
                            <li key='om-u-2-l-4'><a href={"#"+strings.OUR_MODEL_SIDE_NAV_4_ID} className="nav-link"><span className="icon">🤓</span>{strings.OUR_MODEL_SIDE_NAV_4}</a></li>
                            <li key='om-u-2-l-5'><a href={"#"+strings.OUR_MODEL_SIDE_NAV_5_ID} className="nav-link"><span className="icon">🙄</span>{strings.OUR_MODEL_SIDE_NAV_5}</a></li>
                        </ul>
                    </div>
                    <div id="our-model-entry-content" className="entry-content">
                        <h2 id={strings.OUR_MODEL_SIDE_NAV_1_ID}>🔑 {strings.OUR_MODEL_SIDE_NAV_1}</h2>
                        {renderHTML(strings.formatString(strings.OUR_MODEL_SIDE_NAV_1_DESC,goToTest))}

                        <h2 id={strings.OUR_MODEL_SIDE_NAV_2_ID}>🗺 {strings.OUR_MODEL_SIDE_NAV_2}</h2>
                        {renderHTML(strings.OUR_MODEL_SIDE_NAV_2_DESC)}

                        <h2 id={strings.OUR_MODEL_SIDE_NAV_3_ID}>🏆 {strings.OUR_MODEL_SIDE_NAV_3}</h2>
                        {renderHTML(strings.OUR_MODEL_SIDE_NAV_3_DESC)}

                        <h2 id={strings.OUR_MODEL_SIDE_NAV_4_ID}>🤓 {strings.OUR_MODEL_SIDE_NAV_4}</h2>
                        {renderHTML(strings.OUR_MODEL_SIDE_NAV_4_DESC)}
                        
                        <h2 id={strings.OUR_MODEL_SIDE_NAV_5_ID}>🙄 {strings.OUR_MODEL_SIDE_NAV_5}</h2>
                        {renderHTML(strings.OUR_MODEL_SIDE_NAV_5_DESC)}
                    </div>
                </div>
            </section>
            {!this.state.auth &&
                <Section />    
            }
            <CommonFooter getLanguageCode ={this.getLanguageCode}/>
        </div>
        if(test_status == "not_completed") {
            window.location.replace(`${url.ORIGIN_URL}/test`)
        } else {
            if(isWindows) {
                return (
                    <Twemoji options={{ className: 'emoji', folder: 'svg', ext: '.svg' }} >
                        {ourModel}
                    </Twemoji>
                )
            } else {    
                return ourModel
            }
        }
    }
}

export default OurModel