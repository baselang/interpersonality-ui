import React, { Component } from 'react';
import LocalizedStrings from 'react-localization';
import { language } from '../Components/Language';
import url from '../CommonComponent/CommonURL';
import renderHTML from 'react-render-html';
import ProfileShareCTA from '../CommonComponent/ProfileShareCTA';

let strings = new LocalizedStrings(language);

class InterpersonalExtendedProfileExpire extends Component {
    constructor() {
        super();
        this.state = {
            language_id: ''
        }
    }

    componentDidMount() {
        let language_id = localStorage.getItem("language_id")
        this.setState({
            language_id: language_id
        })
    }

    render() {

        strings.setLanguage(this.state.language_id);

        let Share_CTA = <ProfileShareCTA Content = "" background="false"/>;
        let dynamicDivArray = [];
        dynamicDivArray.push(Share_CTA);

        return (
            <div>
                <div className="right_side_barr">
					<div className="profile-content">
						<div className="contetnttt_moduleee profile-content__text pc--content">
							<div className="pc--heading">
								<h1><span>👥</span>{strings[url.PROFILE_LEFT_NAV[Object.keys(url.PROFILE_LEFT_NAV)[6]]]}</h1>
							</div>
							{renderHTML(strings.PROFILE_SELF_INTERPERSONAL_EXPIRE_EXTENDED_PROFILE)}
                            {[(dynamicDivArray)]}
                            {renderHTML(strings.PROFILE_SELF_INTERPERSONAL_EXPIRE_EXTENDED_PROFILE1)}
							<div className="profile-content__nav">
								<a href="/guides">
									<span className="profile-content__nav-icon">🙊</span>
									<span>{strings.NEXT}:</span>
									<span className="profile-content__nav-title">{strings.PROFILE_WHATS_NEXT}</span>
								</a>
							</div>
						</div>
					</div>
				</div>
            </div>
        )
    }
}

export default InterpersonalExtendedProfileExpire;
