import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import renderHTML from 'react-render-html';
import cta_fb_icon from '../Assets/images/cta-fb-icon.svg';
import cta_fb_icon_hover from '../Assets/images/cta-fb-icon-hover.svg';
import cta_fbme_icon from '../Assets/images/cta-fbme-icon.svg';
import cta_fbme_icon_hover from '../Assets/images/cta-fbme-icon-hover.svg';

import LocalizedStrings from 'react-localization';
import { language } from '../Components/Language';
import country from './Country';

let strings = new LocalizedStrings(language);

class ProfileShareCTA extends Component {
    constructor() {
        super();
        this.state = {
          language_id: "",
          user_id: "",
          copyMessage: false,
        };
    }

    componentDidMount() {
        let language_id = localStorage.getItem("language_id")
        let user_id = localStorage.getItem("user_id")

        this.setState({
            language_id: language_id,
            user_id: user_id
        })
    }

    handleText = () => {
        this.setState({
            copyMessage: true
        })
    }

    render() {

        strings.setLanguage(this.state.language_id);

        const whatsappText = encodeURI(`https://api.whatsapp.com/send?text=${window.location.origin}${country.language_id_code_mapping[parseInt(this.state.language_id)] !== country.default_language ? country.lang_codes.map(data => `/${data}`) : ""}/home/${this.state.user_id}`)
        const facebookText = encodeURI(`https://www.facebook.com/sharer/sharer.php?u=${window.location.origin}${country.language_id_code_mapping[parseInt(this.state.language_id)] !== country.default_language ? country.lang_codes.map(data => `/${data}`) : ""}/home/${this.state.user_id}`)
        const twitterText = "https://twitter.com/intent/tweet?text=" + window.location.origin + `${country.language_id_code_mapping[parseInt(this.state.language_id)] !== country.default_language ? country.lang_codes.map(data => `/${data}`) : ""}`+"/home/" + this.state.user_id

        return (
            <div>
                <div className={this.props.background=="false"?"pc--cta1 pc--ctav2 text-center":"pc--cta pc--ctav2 text-center"}>
                    {renderHTML(this.props.Content)}
                    <div className="pc--cta-actions d-sm-flex align-items-center justify-content-center">
                        <CopyToClipboard text={`${window.location.origin}${country.language_id_code_mapping[parseInt(this.state.language_id)] !== country.default_language ? country.lang_codes.map(data => `/${data}`) : ""}/home/${this.state.user_id}`} onCopy={this.handleText}><span className="copy" text={`${window.location.origin}${country.language_id_code_mapping[parseInt(this.state.language_id)] !== country.default_language ? country.lang_codes.map(data => `/${data}`) : ""}/home/${this.state.user_id}`}>{this.state.copyMessage ? strings.COPIED_LINK : strings.COPY_LINK}</span></CopyToClipboard>
                        <ul key="pscta-u-1" className="menu">
                            <li key="pscta-u-1-l-1"><a href={ facebookText } target="#"><img src={ cta_fb_icon } alt="" /><img src={ cta_fb_icon_hover } alt="" /></a></li>
                            <li key="pscta-u-1-l-2"><a href={ twitterText }  target="_blank"><i className="fa fa-twitter"></i></a></li>
                            <li key="pscta-u-1-l-3"><a href={ whatsappText } target="_blank"><i className="fa fa-whatsapp"></i></a></li>
                            <li key="pscta-u-1-l-4"><a href="https://m.me/" target="_blank"><img src={ cta_fbme_icon } alt="" /><img src={ cta_fbme_icon_hover } alt="" /></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProfileShareCTA;
