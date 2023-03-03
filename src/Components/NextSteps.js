import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import guide_profile_photo from '../Assets/images/guide/mark_profile.png';
import LocalizedStrings from 'react-localization';
import { language } from './Language';
import url from '../CommonComponent/CommonURL';
import renderHTML from 'react-render-html';

let strings = new LocalizedStrings(language);

class NextSteps extends Component {
	constructor() {
		super();
		this.state = {
			language_id: ''
		}
	}

	componentWillMount() {
		let language_id = localStorage.getItem("language_id")
		this.setState({language_id: language_id})
	}

    render() {
		
		strings.setLanguage(this.state.language_id);

        return (
            <div>
                <div className="right_side_barr">
					<div className="profile-content">
						<div className="contetnttt_moduleee profile-content__text pc--content">
							<div className="pc--heading">
								<h1><span>{String.fromCodePoint(url.COUPLES_GUIDE_LEFT_NAV_EMOJIS[5])}</span>{strings[url.COUPLES_GUIDE_LEFT_NAV[Object.keys(url.COUPLES_GUIDE_LEFT_NAV)[5]]]}</h1>
							</div>
							{renderHTML(strings.GUIDES_COUPLE_REPORT_WHAT_NEXT_P1)}
								{this.props.is_coaching == true ?
									<p>{strings.GUIDES_COUPLE_REPORT_WHAT_NEXT_P2}	
									<a href="#" onClick={() => this.props.couplesActiveTab(Object.keys(url.COUPLES_GUIDE_LEFT_NAV)[6])}>
									 {strings.GUIDES_COUPLE_REPORT_WHAT_NEXT_P3}
									</a>
										{strings.GUIDES_COUPLE_REPORT_WHAT_NEXT_P4}
									</p>
									:
									""
								}
								{renderHTML (strings.GUIDES_COUPLE_REPORT_WHAT_NEXT_P5)}
								{renderHTML (strings.GUIDES_COUPLE_REPORT_WHAT_NEXT_P6)}
								<p>
									{strings.GUIDES_COUPLE_REPORT_WHAT_NEXT_P7}
								    <a href={`${`/guides/${this.props.user_partner_id}`}`} target="_blank">
								    {strings.GUIDES_COUPLE_REPORT_WHAT_NEXT_P8}
								    </a>
									{strings.GUIDES_COUPLE_REPORT_WHAT_NEXT_P9}
								</p>
								{renderHTML (strings.GUIDES_COUPLE_REPORT_WHAT_NEXT_P10)}
								{renderHTML (strings.GUIDES_COUPLE_REPORT_WHAT_NEXT_P11)}
								{
								this.props.is_coaching == true ? 
									<p>{strings.GUIDES_COUPLE_REPORT_WHAT_NEXT_P12}
									<a href='#' onClick={() => this.props.couplesActiveTab(Object.keys(url.COUPLES_GUIDE_LEFT_NAV)[6])}>{strings.GUIDES_COUPLE_REPORT_WHAT_NEXT_P13}</a>
									{strings.GUIDES_COUPLE_REPORT_WHAT_NEXT_P14}
									</p>
									:
									""
								}
								
							    {renderHTML (strings.GUIDES_COUPLE_REPORT_WHAT_NEXT_P15)}
							{this.props.is_coaching == true ?
								<div className="profile-content__nav">
									<Link to="#" onClick={() => this.props.couplesActiveTab(Object.keys(url.COUPLES_GUIDE_LEFT_NAV)[6])}>
										<span className="profile-content__nav-icon"><img className="next_step_mark" src={ guide_profile_photo } alt = "" /></span>
										<span>{strings.GUIDES_REPORT_NEXTSECTION}</span>
										<span className="profile-content__nav-title">{strings[url.COUPLES_GUIDE_LEFT_NAV[Object.keys(url.COUPLES_GUIDE_LEFT_NAV)[6]]]}</span>
									</Link>
								</div>	
								:
								""
							}
						</div>
					</div>
				</div>
            </div>
        )
    }
}

export default NextSteps;
