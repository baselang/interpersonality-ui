import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import jQuery from 'jquery';
import renderHTML from 'react-render-html';
import LocalizedStrings from 'react-localization';
import url from '../CommonComponent/CommonURL';
import linkHeader from '../CommonComponent/Link';
import CommonHeader from '../CommonComponent/CommonHeader';
import CommonFooter from '../CommonComponent/CommonFooter';
import { language } from './Language';
import contact from "../Assets/images/illustrations/contact.svg";
import Section from '../CommonComponent/Section';

let strings = new LocalizedStrings(language);

class Contact extends Component {
    constructor() {
        super();
        this.state = {
            language_id: '',
            auth: ''
        }
    }
    
    componentDidMount(){
      window.scrollTo(0, 0)

      let language_id = localStorage.getItem("language_id")
      let auth = localStorage.getItem("auth")
      this.setState({
          language_id: language_id,
          auth: auth
      });
      jQuery("body").addClass("template template-contact")
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
                <link key={index} rel={lin.rel} hreflang={lin.hreflang} href={url.ORIGIN_URL + lin.href + "contact"} />
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
                  <title>{strings.CONTACT_META_TITLE}</title>
                  <meta name="description" content={strings.CONTACT_META_DESCRIPTION} />
                </Helmet>
                <CommonHeader getLanguageCode ={this.getLanguageCode}/>
                <main id="generic-content">
                  <div className="container">
                    <div className="entry-title text-center">
                      <img src={contact} alt="" width="145" height="107" />
                      <h1>{strings.CONTACT_TITLE}</h1>
                      {renderHTML(strings.CONTACT_DESC1)}
                    </div>
                  </div>
                </main>
                {!this.state.auth &&
                    <Section />
                }
                <CommonFooter getLanguageCode ={this.getLanguageCode}/>
              </div>
            );
        }
    }
}

export default Contact;
