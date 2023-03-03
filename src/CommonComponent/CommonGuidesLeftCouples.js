import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import jQuery from 'jquery';
import renderHTML from 'react-render-html';
import guide_profile_photo from '../Assets/images/guide/mark_profile.png';
import guide_profile_placeholder from '../Assets/images/guide/guide-profile-placeholder.png';
import CouplesIntroduction from '../Components/CouplesIntroduction';
import Conflict from '../Components/Conflict';
import EmotionalLife from '../Components/EmotionalLife';
import CouplesLifestyle from '../Components/CouplesLifestyle';
import DreamsAndGoals from '../Components/DreamsAndGoals';
import NextSteps from '../Components/NextSteps';
import CouplesCoaching from '../Components/CouplesCoaching';
import Twemoji from 'react-twemoji';
import { isWindows } from 'react-device-detect';
import country from '../CommonComponent/Country';
import LocalizedStrings from 'react-localization';
import { language } from '../Components/Language';
import url from '../CommonComponent/CommonURL';

let strings = new LocalizedStrings(language);

class CommonGuidesLeftCouples extends Component {
    constructor() {
        super();
        this.state = {
            couplesActive: Object.keys(url.COUPLES_GUIDE_LEFT_NAV)[0],
            language_id: ''
        }
    }

    componentDidMount() {
        let language_id = localStorage.getItem("language_id");
        let browser_url = window.location.href;
        let user_partner_id = browser_url.split(country.guides)[1] ? browser_url.split(country.guides)[1].split("?")[0] : "";
        if(user_partner_id) {
            this.setState({
                language_id: language_id,
                couplesActive: Object.keys(url.COUPLES_GUIDE_LEFT_NAV)[1]
            });
            window.history.replaceState(0,"","/guides")
        }else {
            this.setState({
                language_id: language_id,
                couplesActive: this.props.couplesActive ? this.props.couplesActive : Object.keys(url.COUPLES_GUIDE_LEFT_NAV)[0]
            });
        }
        this.props.setLoading();
        (function ($) {
            $(document).ready(function () {
                // used to open left side navbar on mobile view -- start
                $('.onclickk_opeennn_all').click(function (e) {
                    $(this).hide();
                    $('.leftt_all_iconss').show().css('top', '0');
                    $('.left_menusssss').show().css('bottom', '30px');

                    e.preventDefault();
                });
                $('.leftt_all_iconss').click(function (e) {
                    $(this).hide().css('top', '100%');
                    $('.left_menusssss').hide().css('bottom', '-100%');
                    $('.onclickk_opeennn_all').show();
                    e.preventDefault();
                });
                // used to open left side navbar on mobile view -- ends

                //  used to stick side left nav while scrolling right content -- start
                function bottom_menusss() {
                    var top_space = $('#profile-header').outerHeight();

                    if ($('div.freinddd_listttt').length) {
                        top_space = 160.8;
                    }

                    $('div.left_side_barr div.bottom_menusss').sticky({
                        topSpacing: top_space + 10,
                        bottomSpacing: 200
                    });
                }
                if ($('div.left_side_barr div.bottom_menusss').length) {
                    bottom_menusss();
                }
                //  used to stick side left nav while scrolling right content -- ends
            });
        })(jQuery);
    }

    couplesActiveTab = (name) => {
        window.scrollTo(0, 0)
        this.setState({
            couplesActive: name
        })
    }

    couplesMenuRendering = (couplesStartIndex,couplesEndIndex) => {
        for(let i=couplesStartIndex; i<=couplesEndIndex; i++) {
            if( this.state.couplesActive === Object.keys(url.COUPLES_GUIDE_LEFT_NAV)[i]) {
                if(i==6) {
                    return ( <Link to="#"><img alt="" src={ guide_profile_photo } className="next_step_mark" /><span>{strings[url.COUPLES_GUIDE_LEFT_NAV[Object.keys(url.COUPLES_GUIDE_LEFT_NAV)[i]]]}</span></Link>)
                } else {
                    return ( <Link to="#"><span role="img" aria-label="" >{String.fromCodePoint(url.COUPLES_GUIDE_LEFT_NAV_EMOJIS[i])}</span><span>{strings[url.COUPLES_GUIDE_LEFT_NAV[Object.keys(url.COUPLES_GUIDE_LEFT_NAV)[i]]]}</span></Link>)
                }
            }
        }
    }

    render() {
        strings.setLanguage(this.state.language_id);

        let leftCouples = [];
        for (let i=0; i<=5; i++) {
            leftCouples.push(<li key={"cglc-u-1-l-"+[i]} onClick={() => this.couplesActiveTab(Object.keys(url.COUPLES_GUIDE_LEFT_NAV)[i])}><Link to="#" className={this.state.couplesActive === Object.keys(url.COUPLES_GUIDE_LEFT_NAV)[i] ? "active" : ""}>{String.fromCodePoint(url.COUPLES_GUIDE_LEFT_NAV_EMOJIS[i])}<span>{strings[url.COUPLES_GUIDE_LEFT_NAV[Object.keys(url.COUPLES_GUIDE_LEFT_NAV)[i]]]}</span></Link></li>);
        }

        let couplesGuideLeftMenu = <React.Fragment>
            <ul key="cglc-u-1">
                {leftCouples}
            </ul>
            {this.props.is_coaching && 
            <ul key="cglc-u-2">
                <li key="cglc-u-2-l-1" onClick={() => this.couplesActiveTab(Object.keys(url.COUPLES_GUIDE_LEFT_NAV)[6])}><Link to="#" className={this.state.couplesActive === Object.keys(url.COUPLES_GUIDE_LEFT_NAV)[6] ? "active": ""}><img src={ guide_profile_photo } className="next_step_mark" /><span>{strings[url.COUPLES_GUIDE_LEFT_NAV[Object.keys(url.COUPLES_GUIDE_LEFT_NAV)[6]]]}</span></Link></li>
            </ul>
            }
            <Link to="#" className="button-back" onClick={() => this.props.handleBack("couplesBack")}><span>{strings.GUIDES_REPORT_BACKBTN}</span></Link>
        </React.Fragment>

        let couplesGuidesLeft = <div>
            <div id="profile-content" className="main_onclick_lefthide">
                <div className="module_mainnnnnn_one">
                    <div className="mobile_leftt_meuu">
                        <div className="onclickk_opeennn_all">
                            {
                                this.couplesMenuRendering(0,6)
                            }
                        </div>
                        <div className="leftt_all_iconss">
                            <div className="left_menusssss">
                                {couplesGuideLeftMenu}
                            </div>
                        </div>
                    </div>
                    <div className="left_side_barr">
                        <div className="leftt_mainn">
                            <div className="uppr_top_left text-center">
                                <div className="photo-couples">
                                    <img src={this.props.picture_url ? this.props.picture_url : guide_profile_placeholder} alt="img" />
                                    <img src={this.props.partner_picture_url ? this.props.partner_picture_url : guide_profile_placeholder} alt="img" />
                                </div>
                                <p>{renderHTML(strings.formatString(strings.GUIDES_COUPLE_REPORT_TITLE, this.props.partner_firstname))}</p>
                            </div>
                            <div className="bottom_menusss">
                                {couplesGuideLeftMenu}
                            </div>
                        </div>
                    </div>
                    {
                        this.state.couplesActive === Object.keys(url.COUPLES_GUIDE_LEFT_NAV)[0] &&
                        <CouplesIntroduction guides_report={this.props.guides_report} couplesActiveTab={this.couplesActiveTab} />
                    }
                    {
                        this.state.couplesActive === Object.keys(url.COUPLES_GUIDE_LEFT_NAV)[1] &&
                        <Conflict guides_report={this.props.guides_report} couplesActiveTab={this.couplesActiveTab} />
                    }
                    {
                        this.state.couplesActive === Object.keys(url.COUPLES_GUIDE_LEFT_NAV)[2] &&
                        <EmotionalLife guides_report={this.props.guides_report} couplesActiveTab={this.couplesActiveTab} />
                    }
                    {
                        this.state.couplesActive === Object.keys(url.COUPLES_GUIDE_LEFT_NAV)[3] &&
                        <CouplesLifestyle guides_report={this.props.guides_report} couplesActiveTab={this.couplesActiveTab} />
                    }
                    {
                        this.state.couplesActive === Object.keys(url.COUPLES_GUIDE_LEFT_NAV)[4] &&
                        <DreamsAndGoals guides_report={this.props.guides_report} couplesActiveTab={this.couplesActiveTab} is_coaching={this.props.is_coaching} />
                    }
                    {
                        this.state.couplesActive === Object.keys(url.COUPLES_GUIDE_LEFT_NAV)[5] &&
                        <NextSteps guides_report={this.props.guides_report} user_partner_id={this.props.user_partner_id} couplesActiveTab = {this.couplesActiveTab} is_coaching={this.props.is_coaching} />
                    }
                    {
                        this.state.couplesActive === Object.keys(url.COUPLES_GUIDE_LEFT_NAV)[6] &&
                        <CouplesCoaching is_got_it={this.props.is_got_it} user_partner_id={this.props.user_partner_id} primary_email = {this.props.primary_email} user_name = {this.props.user_name} couplesActiveTab = {this.couplesActiveTab} updateGuideResponse={this.props.updateGuideResponse}/> 
                    }
                </div>
            </div>
        </div>
        if (isWindows) {
            return (
                <Twemoji options={{ className: 'emoji', folder: 'svg', ext: '.svg' }} >
                    {couplesGuidesLeft}
                </Twemoji>
            )
        } else {
            return couplesGuidesLeft
        }
    }
}

export default CommonGuidesLeftCouples;
