import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import jQuery from 'jquery';

import CommonProfileHeader from '../CommonComponent/CommonProfileHeader';
import Sidenav from '../CommonComponent/Sidenav';
import CommonGuidesLeftRomanticCapability from '../CommonComponent/CommonGuidesLeftRomanticCapability';

import LocalizedStrings from 'react-localization';
import { language } from './Language';
import url from '../CommonComponent/CommonURL';
import linkHeader from '../CommonComponent/Link';
import Twemoji from 'react-twemoji';
import {isWindows} from 'react-device-detect';

let strings = new LocalizedStrings(language);

class RomanticCapability extends Component {
    constructor() {
        super();
        this.state = {
            language_id: ''
        }
    }

    componentDidMount() {
        let language_id = localStorage.getItem("language_id");
        this.setState({
            language_id: language_id
        });
        jQuery("body").addClass("page-profile page-guides")
    }

    handleBack = (guide) => {
        this.props.handleBackButton(guide)
    }

    render() {

        strings.setLanguage(this.state.language_id);

        let headContent = linkHeader.map((lin, index) => {
            return (
                <link key={index} rel={lin.rel} hreflang={lin.hreflang} href={url.ORIGIN_URL + lin.href + "guides"} />
            )
        })

        let romanticCapability = <div>
            { this.state.loading && <div className="loader"></div> }
            <Helmet>
                { headContent }
            </Helmet>
            <Sidenav active = "relationships" />
            <main className="main profile-main" id="main">
                <CommonProfileHeader active = "relationships" />
                <CommonGuidesLeftRomanticCapability guides_report = {this.props.guides_report} is_coaching={this.props.is_coaching} is_got_it={this.props.is_got_it} partner_firstname={this.props.partner_firstname} partner_picture_url={this.props.partner_picture_url} picture_url={this.props.picture_url} product_id={this.props.product_id} user_partner_id={this.props.user_partner_id} handleBack = {this.handleBack} setLoading={this.props.setLoading} />
            </main>    
        </div>
        if(isWindows) {
            return (
                <Twemoji options={{ className: 'emoji', folder: 'svg', ext: '.svg' }} >
                    {romanticCapability}
                </Twemoji>
            )
        } else {    
            return romanticCapability
        }
    }
}

export default RomanticCapability;
