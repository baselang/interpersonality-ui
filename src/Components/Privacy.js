import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import jQuery from 'jquery';
import renderHTML from 'react-render-html';
import privacy_new from "../Assets/images/v2/privacy_new.svg";
import CommonHeader from '../CommonComponent/CommonHeader';
import CommonFooter from '../CommonComponent/CommonFooter';
import linkHeader from '../CommonComponent/Link';
import url from '../CommonComponent/CommonURL';
import LocalizedStrings from 'react-localization';
import { language } from './Language';
import Twemoji from 'react-twemoji';
import {isWindows} from 'react-device-detect';
import Section from '../CommonComponent/Section';
import '../Assets/css/style_manual.css'
import $ from 'jquery';
import country from '../CommonComponent/Country';
import {isMobile} from 'react-device-detect';

let strings = new LocalizedStrings(language);

class Privacy extends Component {
    constructor() {
        super();
        this.state = {
            language_id: '',
            auth: ''
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        let language_id = localStorage.getItem("language_id")
        let auth = localStorage.getItem("auth")
        this.setState({
            language_id: language_id,
            auth: auth
        });
        jQuery("body").addClass("template template-privacy ")
        if(auth) {
            jQuery("body").addClass("template template-generic")
        } else {
            jQuery("body").addClass("template template-generic no-footer-border")
        }
        
        if(sessionStorage.getItem('from_settings')=="p2" || sessionStorage.getItem('from_settings')=="p1"){
            if(isMobile){
                $(window).scrollTop($('#'+sessionStorage.getItem('from_settings')).offset().top);
            }else{
                $(window).scrollTop($('#'+sessionStorage.getItem('from_settings')).offset().top-100);
            }
            sessionStorage.clear('from_settings')
        }
    }

    getLanguageCode=(lang)=>{
        this.props.getlanguage(lang);
    }

    componentDidUpdate() {
		$('#navigateTOSettingsFirst').contextmenu(function(e){
            localStorage.setItem("Settings", "Privacy")
		});

        $('#navigateTOSettingsFirst').click(function(e){
            localStorage.setItem("Settings", "Privacy")
		});
	}
    
    render() {

        strings.setLanguage(this.state.language_id);

        let headContent = linkHeader.map((lin, index) => {
            return (
                <link key={index} rel={lin.rel} hreflang={lin.hreflang} href={url.ORIGIN_URL+lin.href+"privacy"}/>
            )
        })

        let test_status = localStorage.getItem("test_status");
        let privacy = <div className="template template-privacy no-footer-border">
            <Helmet>
                { headContent }
                <title>{strings.PRIVACY_META_TITLE}</title>
                <meta name="description" content={strings.PRIVACY_META_DESCRIPTION} />
            </Helmet>
            <CommonHeader getLanguageCode ={this.getLanguageCode}/>
            <main id="generic-content">
                <div className="container">
                    <div className="entry-title text-center">
                        <img alt="" src={ privacy_new } width="225" height="107" className="" />
                        <h1>{ strings.PRIVACY_TITLE }</h1>
                    </div>
                    <div className="entry-content">
                    {renderHTML(strings.PRIVACY_DESC)}
                    {renderHTML(strings.PRIVACY_CONTENT)}
                    </div>
                </div>
            </main>
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
                        {privacy}
                    </Twemoji>
                )
            } else {    
                return privacy
            }
        }
    }
}

export default Privacy;