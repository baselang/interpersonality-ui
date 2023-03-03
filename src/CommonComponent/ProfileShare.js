import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import cta_fb_icon from '../Assets/images/cta-fb-icon.svg';
import cta_fb_icon_hover from '../Assets/images/cta-fb-icon-hover.svg';
import cta_fbme_icon from '../Assets/images/cta-fbme-icon.svg';
import cta_fbme_icon_hover from '../Assets/images/cta-fbme-icon-hover.svg';

import LocalizedStrings from 'react-localization';
import { language } from '../Components/Language';

let strings = new LocalizedStrings(language);

class ProfileShare extends Component {
    constructor() {
        super();
        this.state = {
          language_id: "",
          user_profile_pic: "",
          copyMessage: false
        };
    }

    componentDidMount() {
        let language_id = localStorage.getItem("language_id")
        let user_profile_pic = localStorage.getItem("user_profile_pic")
        this.setState({
            language_id: language_id,
            user_profile_pic: user_profile_pic
        })
    }

    handleText = () => {
        this.setState({
            copyMessage: true
        })
    }
    
    render() {

        strings.setLanguage(this.state.language_id);

        const whatsappText = encodeURI(`https://api.whatsapp.com/send?text=`+window.location.href)
        const facebookText = encodeURI(`https://www.facebook.com/sharer/sharer.php?u=`+window.location.href)
        const twitterText = "https://twitter.com/intent/tweet?text=" + window.location.href
 
    return (
            <div>
                <div className="share-profile-bar has-photo">
                    <div className="inner">
                        <div className="share-profile-title">
                            { this.state.user_profile_pic !== "null" && <img alt="" src={this.state.user_profile_pic+"#" + new Date().getTime() } />}
                            <span>{strings.SHARE_PROFILE}</span>
                        </div>
                        <div className="pc--cta-actions">
                            <CopyToClipboard text={window.location.href} onCopy={this.handleText}><span className="copy" text={window.location.href}>{this.state.copyMessage ? strings.COPIED_LINK : strings.COPY_LINK }</span></CopyToClipboard> 
                            <ul key="ps-u-1" className="menu">
                                <li key="ps-u-1-l-1"><a href={ facebookText } target="#"><img src={ cta_fb_icon } alt="" /><img src={ cta_fb_icon_hover } alt="" /></a></li>
                                <li key="ps-u-1-l-2"><a href={ twitterText }  target="_blank"><i className="fa fa-twitter"></i></a></li>
                                <li key="ps-u-1-l-3"><a href={ whatsappText } target="_blank"><i className="fa fa-whatsapp"></i></a></li>
                                <li key="ps-u-1-l-4"><a href="https://m.me/" target="_blank"><img src={ cta_fbme_icon } alt="" /><img src={ cta_fbme_icon_hover } alt="" /></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProfileShare;
