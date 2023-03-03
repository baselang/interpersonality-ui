import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import jQuery from 'jquery';
import renderHTML from 'react-render-html';
import guide_profile_placeholder from '../Assets/images/guide/guide-profile-placeholder.png'
import RomanticCapabilityIntriduction from '../Components/RomanticCapabilityIntriduction';
import RomanticCapabilityConflict from '../Components/RomanticCapabilityConflict';
import RomanticCapabilityDreamsAndGoals from '../Components/RomanticCapabilityDreamsAndGoals';
import RomanticCapabilityEmotionalLife from '../Components/RomanticCapabilityEmotionalLife';
import RomanticCapabilityLifestyle from '../Components/RomanticCapabilityLifestyle';
import Twemoji from 'react-twemoji';
import {isWindows} from 'react-device-detect';
import LocalizedStrings from 'react-localization';
import { language } from '../Components/Language';
import url from '../CommonComponent/CommonURL';

let strings = new LocalizedStrings(language);

class CommonGuidesLeftRomanticCapability extends Component {
    constructor() {
        super();
        this.state = {
            romanticCapabilityActive: Object.keys(url.ROMANTIC_COMPATABILITY_GUIDE_LEFT_NAV)[0],
            language_id: ''
        }
    }

    componentDidMount() {
        let language_id = localStorage.getItem("language_id");
        this.setState({
            language_id: language_id
        });
        this.props.setLoading();
        (function($) {
            $(document).ready( function() {
                // used to open left side navbar on mobile view -- start
                $('.onclickk_opeennn_all').click( function(e) {
                    $(this).hide();
                    $('.leftt_all_iconss').show().css( 'top', '0' );
                    $('.left_menusssss').show().css( 'bottom', '30px' );
                    
                    e.preventDefault();
                });
                $('.leftt_all_iconss').click( function(e) {
                    $(this).hide().css( 'top', '100%' );
                    $('.left_menusssss').hide().css( 'bottom', '-100%' );
                    $('.onclickk_opeennn_all').show();
                    e.preventDefault();
                });
                // used to open left side navbar on mobile view -- ends
            
                //  used to stick side left nav while scrolling right content -- start
                function bottom_menusss() {
                    var top_space = $('#profile-header').outerHeight();
                    if( $('div.freinddd_listttt').length ) {
                        top_space = 160.8;
                    }
                    $('div.left_side_barr div.bottom_menusss').sticky({
                        topSpacing: top_space + 10,
                        bottomSpacing: 200
                    });
                }
                if( $('div.left_side_barr div.bottom_menusss').length ) {
                    bottom_menusss();
                }
                //  used to stick side left nav while scrolling right content -- ends
            });
        })(jQuery);
    }

    romaticCapabilityActiveTab = (name) => {
        window.scrollTo(0, 0)
        this.setState({
            romanticCapabilityActive: name
        })
    }

    compatibilityMenuRendering = (compatabilityStartIndex,compatabilityEndIndex) => {
        for(let i=compatabilityStartIndex; i<=compatabilityEndIndex; i++) {
            if( this.state.romanticCapabilityActive === Object.keys(url.ROMANTIC_COMPATABILITY_GUIDE_LEFT_NAV)[i])
            return ( <Link to="#">{String.fromCodePoint(url.ROMANTIC_COMPATABILITY_GUIDE_LEFT_NAV_EMOJIS[i])}<span>{strings[url.ROMANTIC_COMPATABILITY_GUIDE_LEFT_NAV[Object.keys(url.ROMANTIC_COMPATABILITY_GUIDE_LEFT_NAV)[i]]]}</span></Link>)
        }
    }

    render() {
        strings.setLanguage(this.state.language_id);

        let leftCompatability = [];
        for (let i=0; i<=4; i++) {
            leftCompatability.push(<li key={"cglrc-u-1-l-"[i]} onClick={() => this.romaticCapabilityActiveTab(Object.keys(url.ROMANTIC_COMPATABILITY_GUIDE_LEFT_NAV)[i])}><Link to="#" className={this.state.romanticCapabilityActive === Object.keys(url.ROMANTIC_COMPATABILITY_GUIDE_LEFT_NAV)[i] ? "active": ""}>{String.fromCodePoint(url.ROMANTIC_COMPATABILITY_GUIDE_LEFT_NAV_EMOJIS[i])}<span>{strings[url.ROMANTIC_COMPATABILITY_GUIDE_LEFT_NAV[Object.keys(url.ROMANTIC_COMPATABILITY_GUIDE_LEFT_NAV)[i]]]}</span></Link></li>);
        }
        
        let romanticGuidesLeftMenu = <React.Fragment>
            <ul key="cglrc-u-1">
                {leftCompatability}
            </ul>
            <Link to="#" className="button-back" onClick={()=>this.props.handleBack("romanticCapabilityBack")}><span>{strings.GUIDES_REPORT_BACKBTN}</span></Link>
        </React.Fragment>
        
        let romanticCapabilityLeft = <div>
            <div id="profile-content" className="main_onclick_lefthide">
                <div className="module_mainnnnnn_one">
                    <div className="mobile_leftt_meuu">
                        <div className="onclickk_opeennn_all">
                            {
                                this.compatibilityMenuRendering(0,4)
                            }
                        </div>
                        <div className="leftt_all_iconss">
                            <div className="left_menusssss">
                                {romanticGuidesLeftMenu}
                            </div>
                        </div>
                    </div>
                    <div className="left_side_barr">
                        <div className="leftt_mainn">
                            <div className="uppr_top_left text-center">
                                <div className="photo-couples">
                                    <img src={ this.props.picture_url ? this.props.picture_url : guide_profile_placeholder  } alt="img"/>
                                    <img src={ this.props.partner_picture_url ? this.props.partner_picture_url : guide_profile_placeholder } alt="img"/>
                                </div>
                                <p>{renderHTML(strings.formatString(strings.GUIDES_REPORT_TITLE,this.props.partner_firstname))}</p>
                            </div>
                            <div className="bottom_menusss">
                                {romanticGuidesLeftMenu}
                            </div>
                        </div>
                    </div>  
                    {
                        this.state.romanticCapabilityActive === Object.keys(url.ROMANTIC_COMPATABILITY_GUIDE_LEFT_NAV)[0] &&
                        <RomanticCapabilityIntriduction guides_report={this.props.guides_report} romaticCapabilityActiveTab = {this.romaticCapabilityActiveTab} /> 
                    }   
                    {
                        this.state.romanticCapabilityActive === Object.keys(url.ROMANTIC_COMPATABILITY_GUIDE_LEFT_NAV)[1] &&
                        <RomanticCapabilityConflict guides_report={this.props.guides_report} romaticCapabilityActiveTab = {this.romaticCapabilityActiveTab} /> 
                    } 
                    {
                        this.state.romanticCapabilityActive === Object.keys(url.ROMANTIC_COMPATABILITY_GUIDE_LEFT_NAV)[2] &&
                        <RomanticCapabilityDreamsAndGoals guides_report={this.props.guides_report} romaticCapabilityActiveTab = {this.romaticCapabilityActiveTab} /> 
                    } 
                    {
                        this.state.romanticCapabilityActive === Object.keys(url.ROMANTIC_COMPATABILITY_GUIDE_LEFT_NAV)[3] &&
                        <RomanticCapabilityEmotionalLife guides_report={this.props.guides_report} romaticCapabilityActiveTab = {this.romaticCapabilityActiveTab} /> 
                    } 
                    {
                        this.state.romanticCapabilityActive === Object.keys(url.ROMANTIC_COMPATABILITY_GUIDE_LEFT_NAV)[4] &&
                        <RomanticCapabilityLifestyle guides_report={this.props.guides_report} romaticCapabilityActiveTab = {this.romaticCapabilityActiveTab} /> 
                    }
                </div>
            </div>
        </div>
        if(isWindows) {
            return (
                <Twemoji options={{ className: 'emoji', folder: 'svg', ext: '.svg' }} >
                    {romanticCapabilityLeft}
                </Twemoji>
            )
        } else {    
            return romanticCapabilityLeft
        }
    }
}

export default CommonGuidesLeftRomanticCapability;
