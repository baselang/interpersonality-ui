import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import jQuery from 'jquery';
import $ from 'jquery';

import '../Assets/css/font-awesome.min.css';
import '../Assets/css/style.css';

import '../Assets/js/clipboard.min.js';
import '../Assets/js/jquery.sticky.min.js';
import '../Assets/js/jquery.validate.min.js';
import '../Assets/js/main.js';

import logo from '../Assets/images/logo.svg';
import yellow_girl from '../Assets/images/illustrations/yellow-girl.svg';
import model from '../Assets/images/illustrations/model.svg';
import girl_with_phone from '../Assets/images/illustrations/girl-with-phone.svg';

import LocalizedStrings from 'react-localization';
import { language } from './Language';
import url from '../CommonComponent/CommonURL';
import Error500 from './Error500';
import linkHeader from '../CommonComponent/Link';
import CommonFooter from '../CommonComponent/CommonFooter';
import CommonHeader from '../CommonComponent/CommonHeader';
import Twemoji from 'react-twemoji';
import {isWindows} from 'react-device-detect';
import renderHTML from 'react-render-html';
import arrow from '../Assets/images/v2/arrow-right-blue.svg';

let strings = new LocalizedStrings(language);

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            language_id: '',
            auth: '',
            user_id: '',
            loading: true,
            question: []
        }
    }

    // get languageId from Header and Footer dropdown and pass as props in routes
    getLanguageCode=(lang)=>{
        this.props.getlanguage(lang);
    }

    componentDidMount() {
        window.scrollTo(0, 0)

        let language_id = localStorage.getItem("language_id")
        let auth = localStorage.getItem("auth")
        let user_id = localStorage.getItem("user_id")
        let test_status = localStorage.getItem("test_status")
        localStorage.removeItem("questionSelected")
       
        if(auth) {
             if(test_status === "not_completed") {
                window.location.replace(`${url.ORIGIN_URL}/test`)
            } else if(this.props.user_id) {
                window.location.replace(`${url.ORIGIN_URL}/profile/${this.props.user_id}`)
            } else {
                localStorage.setItem("active", "profile")
                localStorage.setItem("profile", Object.keys(url.PROFILE_LEFT_NAV)[1])
                window.location.replace(`${url.ORIGIN_URL}/profile/${user_id}`)
            }
        }
        else if(this.props.user_id) {
            window.location.replace(`${url.ORIGIN_URL}/profile/${this.props.user_id}`)
        }
        else {
            fetch(`${url.BASE_URL}/getquestions`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                    "x-api-key": url.X_API_KEY,
                    "language_id": language_id,
                    "last_qid": this.state.last_qid
                },
            }).then(response => response.json().then(data => ({ status: response.status, body: data })))
                .then(data => {
                    this.setState({
                        loading: false
                    })
                    localStorage.setItem("questions", JSON.stringify(data.body.questions))
                    if (data.status === 200) {
                        this.setState({
                            question: data.body.questions[0].question,
                            language_id: language_id ? language_id : data.body.language_id
                        })
                    }
                    else {
                        this.props.commanHandler("error500");
                    }
                })
            jQuery("body").removeClass("modal-open template template-homepage no-footer-border");
            jQuery("body").addClass("template template-homepage no-footer-border");
        } 
        
    }

    componentDidUpdate() {
        let _this=this;
        jQuery("body").addClass("template template-homepage no-footer-border")
        
        $(document).ready(function () {
            
            function server_error() {
                $('div#server-error').click( function(e) {
                    if( !$(e.target).hasClass('server-error-inner') && $(e.target).parents('.server-error-inner').length == 0 ) {
                        $('div#server-error').hide();
                        _this.props.commanHandler("updateErrorToFalse");
                    }
                });
            }

            if( $('div#server-error').length ) {
                server_error();
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

    // get answer from question and redirect to test page
    selecteCheckbox = (event, qid) => {
        let getValues = event.target.value
        $(document).ready(function () {
            $(`input[name="ques_oneeee-1"][value=${getValues}]`).attr("checked","checked")
        })
        const hqone = [{
            "qid": qid,
            "response": event.target.value
        }]
        localStorage.setItem("questionSelected", JSON.stringify(hqone))
        this.props.commanHandler("redirectToTest");
    }

    render() {
        strings.setLanguage(this.state.language_id);

        let headContent = linkHeader.map((lin, index) => {
            return (
                <link key={index} rel={lin.rel} hreflang={lin.hreflang} href={url.ORIGIN_URL+lin.href}/>
            )
        })

        let home = <div>
            { this.state.loading && <div className="loader"></div> }
            <Helmet>
                {headContent}
                <title>{strings.HOME_META_TITLE}</title>
                <meta name="description" content={strings.HOME_META_DESCRIPTION} />
            </Helmet>
            <CommonHeader language_id = {this.state.language_id} getLanguageCode ={this.getLanguageCode}/>
            <section className="tp-welcome">
                <div className="container">
                    <img src={logo} className="logo" />
                    <div className="row">
                        <div className="col-lg-8">
                            {renderHTML(strings.HOME_TITLE)}
                        </div>
                        <div className="col-lg-4 d-none d-lg-block">
                            <img src={yellow_girl} alt="" />
                        </div>
                    </div>
                </div>
            </section>
            <section className="tp-home-test">
                <div className="container">
                    <div className="heading">
                        <a href="/test">
                            {renderHTML(strings.HOME_HEADING)}
                        </a>
                    </div>
                    <div className="tp-test-field">
                        <p className="text-center"><strong>{this.state.question}</strong></p>
                        <div className="field-yesno">
                            <div className="field-yesno__label field-yesno__checkbox_no">{strings.HOME_DISAGREE}</div>
                            <div className="field-yesno__checkbox field-yesno__checkbox_no">
                                <label>
                                    <input type="radio" name="question-1"  onClick={(e) => this.selecteCheckbox(e, 1)} value="-3" />
                                    <span></span>
                                </label>
                            </div>
                            <div className="field-yesno__checkbox field-yesno__checkbox_no">
                                <label>
                                    <input type="radio" name="question-1" onClick={(e) => this.selecteCheckbox(e, 1)} value="-2" />
                                    <span></span>
                                </label>
                            </div>
                            <div className="field-yesno__checkbox field-yesno__checkbox_no">
                                <label>
                                    <input type="radio" name="question-1" onClick={(e) => this.selecteCheckbox(e, 1)} value="-1" />
                                    <span></span>
                                </label>
                            </div>
                            <div className="field-yesno__checkbox">
                                <label>
                                    <input type="radio" name="question-1" onClick={(e) => this.selecteCheckbox(e, 1)} value="0" />
                                    <span></span>
                                </label>
                            </div>
                            <div className="field-yesno__checkbox field-yesno__checkbox_yes">
                                <label>
                                    <input type="radio" name="question-1" onClick={(e) => this.selecteCheckbox(e, 1)} value="1" />
                                    <span></span>
                                </label>
                            </div>
                            <div className="field-yesno__checkbox field-yesno__checkbox_yes">
                                <label>
                                    <input type="radio" name="question-1" onClick={(e) => this.selecteCheckbox(e, 1)} value="2" />
                                    <span></span>
                                </label>
                            </div>
                            <div className="field-yesno__checkbox field-yesno__checkbox_yes">
                                <label>
                                    <input type="radio" name="question-1" onClick={(e) => this.selecteCheckbox(e, 1)} value="3" />
                                    <span></span>
                                </label>
                            </div>
                            <div className="field-yesno__label field-yesno__checkbox_yes">{strings.HOME_AGREE}</div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="tp-features">
                <div className="container">
                    {renderHTML(strings.HOME_DESC)}
                </div>
            </section>
            <section className="tp-intro the-science">
                <div className="container">
                    <div className="tp-intro-heading"><span className="icon">🔬</span>{strings.HOME_SCIENCE}</div>
                    <div className="row no-gutters">
                        <div className="col-md-6">
                        {renderHTML(strings.formatString(strings.HOME_SCIENCE_CONTENT,arrow))}
                        </div>
                        <div className="col-md-6">
                            <div className="the-science-highlight">
                                <span className="icon"><img src={model} alt="" /></span>
                                {renderHTML(strings.HOME_AI_CONTENT)}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="tp-cta tp-cta-big">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-5 text-center">
                            <div className="tp-cta-photo">
                                <img src={girl_with_phone} alt="" />
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="tp-cta-text">
                                {renderHTML(strings.HOME_FOOTER_CONTENT)}
                                <a href="/test" className="btn btn-primary btn-xl btn-icon"><span>{strings.HOME_STARTBTN}</span></a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <CommonFooter language_id={this.state.language_id} getLanguageCode ={this.getLanguageCode}/>
            {this.props.error500 && 
            <Error500 />
            }
        </div>
        if(isWindows) {
            return (
                <Twemoji options={{ className: 'emoji', folder: 'svg', ext: '.svg' }} >
                    {home}
                </Twemoji>
            )
        } else {    
            return home
        }
    }
}

export default Home;