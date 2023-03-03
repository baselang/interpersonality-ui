import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import jQuery from 'jquery';
import profile_ep_top_photo_mb from '../Assets/images/v2/our_model_top.svg';
import LocalizedStrings from 'react-localization';
import { language } from './Language';
import linkHeader from '../CommonComponent/Link';
import url from '../CommonComponent/CommonURL';
import CommonHeader from '../CommonComponent/CommonHeader';
import CommonFooter from '../CommonComponent/CommonFooter';
import renderHTML from 'react-render-html';
import Section from '../CommonComponent/Section';

let strings = new LocalizedStrings(language);

class PhdReviewProcess extends Component {
    constructor() {
        super();
        this.state = {
            language_id: '',
            auth: ''
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);

        let language_id = localStorage.getItem("language_id")
        let auth = localStorage.getItem("auth")
        this.setState({
            language_id: language_id,
            auth: auth
        });
        jQuery("body").addClass("template template-phdreviewprocess")
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
                <link key={index} rel={lin.rel} hreflang={lin.hreflang} href={url.ORIGIN_URL+lin.href+"peer-review"}/>
            )
        })

        let test_status = localStorage.getItem("test_status");
        if(test_status == "not_completed") {
            window.location.replace(`${url.ORIGIN_URL}/test`)
        } else {
            return (
                <div>
                    <Helmet>
                        {headContent}
                        <title>{strings.PEER_REVIEW_META_TITLE}</title>
                        <meta name="description" content={strings.PEER_REVIEW_META_DESCRIPTION} />
                    </Helmet>
                    <CommonHeader getLanguageCode ={this.getLanguageCode} />
                    <main id="generic-content">
                        <div className="container">
                            <div className="entry-title text-center">
                                <img src={ profile_ep_top_photo_mb } width="212" height="114" className="" alt="" />
                                <h1>{strings.PEERREVIEW_PROCESS_TITLE}</h1>
                            </div>
                            <div className="entry-content">
                                {renderHTML(strings.PEERREVIEW_PROCESS_DESC)}
                            </div>
                        </div>
                    </main>
                    {!this.state.auth &&
                        <Section />
                    }
                    <CommonFooter getLanguageCode ={this.getLanguageCode} />
                </div>
            )
        }
    }
}

export default PhdReviewProcess;
