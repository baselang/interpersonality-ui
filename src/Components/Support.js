import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import jQuery from 'jquery';

import profile_ep_top_photo_mb from "../Assets/images/v2/profile-ep-top-photo-mb.png";


import LocalizedStrings from 'react-localization';
import url from '../CommonComponent/CommonURL';
import linkHeader from '../CommonComponent/Link';
import CommonHeader from '../CommonComponent/CommonHeader';
import CommonFooter from '../CommonComponent/CommonFooter';
import { language } from './Language';

let strings = new LocalizedStrings(language);

class Support extends Component {
    constructor() {
        super();
        this.state = {
            language_id: ''
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)

        let language_id = localStorage.getItem("language_id")
        this.setState({
            language_id: language_id
        });
        jQuery("body").addClass("template template-support")
    }

    getLanguageCode=(lang)=>{
      this.props.getlanguage(lang);
  }

    render() {

        strings.setLanguage(this.state.language_id);

        let headContent = linkHeader.map((lin, index) => {
            return (
                <link key={index} rel={lin.rel} hreflang={lin.hreflang} href={url.ORIGIN_URL + lin.href + "support"} />
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
                </Helmet>
                <CommonHeader getLanguageCode ={this.getLanguageCode}/>
                <main id="generic-content">
                  <div className="container">
                    <div className="entry-title text-center">
                      <img alt="" src={profile_ep_top_photo_mb} className="" />
                      <h1>{ strings.SUPPORT_TITLE }</h1>
                      <p>
                        { strings.if_you_need_help ? strings.if_you_need_help : language.english.if_you_need_help }{" "}
                        <a href="mailto:support@interpersonality.com">
                          support@interpersonality.com
                        </a>
                      </p>
                    </div>
                  </div>    
                </main>
                <CommonFooter getLanguageCode ={this.getLanguageCode} />
              </div>
            );
        }
    }
}

export default Support;
