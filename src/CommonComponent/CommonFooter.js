import React, { Component } from 'react';

import LocalizedStrings from 'react-localization';
import { language } from '../Components/Language';
import country from './Country';
import facebook_circle from "../Assets/images/v2/facebook-circle.svg";
import facebook_circle_hover from "../Assets/images/v2/facebook-circle-hover.svg";
let strings = new LocalizedStrings(language);

class CommonFooter extends Component {
    constructor() {
        super();
        this.state = {
            language_id: '',
            auth: ''
        }
    }

    componentDidMount() {
        let language_id = localStorage.getItem("language_id") ? localStorage.getItem("language_id") : this.props.language_id
        let auth = localStorage.getItem("auth")
        this.setState({
            language_id: language_id,
            auth: auth
        })
    }

    handleLanguageChange = (e) => {
        e.preventDefault();
        window.scrollTo(0, 0);

        let language_id = e.target.value;
        localStorage.setItem("language_id", e.target.value)
        
        this.setState(({
            language_id: language_id
        }))

        this.props.getLanguageCode(language_id);
    }

    commonFooterNavigation = () => {
        localStorage.removeItem("keyword")
        sessionStorage.clear('from_settings')
    }

    supportClick = () => {
        localStorage.removeItem("keyword")
        localStorage.setItem("Settings", "Help")
    }

    render() {
        strings.setLanguage(this.props.language_id ? this.props.language_id : this.state.language_id);
        let default_language_id  = Object.keys(country.language_id_code_mapping).find(k=>country.language_id_code_mapping[k]==country.default_language);
        var supportLink=""
        if(this.state.auth){
            supportLink="/settings";
        }else{
            supportLink="/login";
        }
        return (
            <div>
                <footer id="site-footer">
                    <div className="container">
                        <div className="footer-widgets d-xl-flex">
                            <ul key="f-u-1" className="menu footer-menu d-flex">
                                <li key="f-u-1-l-1"><span>{ strings.FOOTER_RESOUCES }</span>
                                    <ul key="f-u-2" className="sub-menu">
                                        <li key="f-u-2-l-1" className = "privacy"><a href="/privacy" onClick={this.commonFooterNavigation}>{ strings.FOOTER_PRIVACY }</a></li>
                                        <li key="f-u-2-l-2" className = "terms"><a href="/terms" onClick={this.commonFooterNavigation}>{ strings.FOOTER_TERMS }</a></li>
                                        <li key="f-u-2-l-3" className = "support"><a href={supportLink} onClick={this.supportClick}>{ strings.FOOTER_SUPPORT }</a></li>
                                    </ul>
                                </li>
                                <li key="f-u-1-l-2"><span>{ strings.FOOTER_COMPANY }</span>
                                    <ul key="f-u-3" className="sub-menu">
                                        <li key="f-u-3-l-1" className = "our-team"><a href="/our-team" onClick={this.commonFooterNavigation}>{ strings.FOOTER_OUR_TEAM }</a></li>
                                        <li key="f-u-3-l-2" className = "press"><a href="/press" onClick={this.commonFooterNavigation}>{ strings.FOOTER_PRESS }</a></li>
                                        <li key="f-u-3-l-3" className = "contact"><a href="/contact" onClick={this.commonFooterNavigation}>{ strings.FOOTER_CONTACT }</a></li>
                                    </ul>
                                </li>
                                <li key="f-u-1-l-3"><span>{ strings.FOOTER_COLLABROATE }</span>
                                    <ul key="f-u-4" className="sub-menu">
                                        <li key="f-u-4-l-1" className = "collaborateresearch"><a href="/collaborate-on-research" onClick={this.commonFooterNavigation}>{ strings.FOOTER_COLLABROATE_REASEARCH }</a></li>
                                        <li key="f-u-4-l-2" className = "phdreviewprocess"><a href="/peer-review" onClick={this.commonFooterNavigation}>{ strings.FOOTER_PEERREVIEW_PROCESS }</a></li>
                                    </ul>
                                </li>
                                <li key="f-u-1-l-4"><span>{ strings.FOOTER_LEARN }</span>
                                    <ul key="f-u-5" className="sub-menu">
                                        <li key="f-u-5-l-1" className = "researchfooter"><a href="/research" onClick={this.commonFooterNavigation}>{ strings.FOOTER_REASEARCH }</a></li>
                                        <li key="f-u-5-l-2" className = "ourmodelfooter"><a href="/our-model" onClick={this.commonFooterNavigation}>{ strings.FOOTER_OUR_MODEL }</a></li>
                                    </ul>
                                </li>
                            </ul>
                            <ul key="f-u-6" className="socials d-flex align-items-center">
                                <li key="f-u-6-l-1">
                                    <a href="https://www.facebook.com/interpersonalityofficial" target="_blank" className="facebook">
                                        <img src={facebook_circle} alt="" />
                                        <img src={facebook_circle_hover} alt="" className="hover" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="row copyright">
                            { !this.state.auth &&
                            <div className="col-md-6 order-md-last">
                                <ul key="f-u-7" className="menu d-md-flex align-items-md-center justify-content-md-end">
                                    <li key="f-u-7-l-1"><a href="/login" onClick={this.commonFooterNavigation}>{ strings.FOOTER_LOGIN }</a></li>
                                    <li key="f-u-7-l-2">
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
                                </ul>
                            </div>
                            }
                            <div className="col-md-6 order-md-first">
                                <p>{ strings.FOOTER_COPYRIGHT }</p>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        )
    }
}

export default CommonFooter;
