import React, { Component } from 'react';
import LocalizedStrings from 'react-localization';
import { language } from '../Components/Language';
import url from '../CommonComponent/CommonURL';
import ProfileShareCTA from '../CommonComponent/ProfileShareCTA';
import renderHTML from 'react-render-html';

let strings = new LocalizedStrings(language);

class Interpersonal extends Component {
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
							{renderHTML(strings.formatString(strings.PROFILE_SELF_INTERPERSONAL, this.props.firstname))}
                            {[(dynamicDivArray)]}
							<div className="profile-content__nav">
								<a href="/extendedprofile">
									<span className="profile-content__nav-icon">🔑</span>
									<span>{strings.NEXT_SECTION}</span>
									<span className="profile-content__nav-title">{strings[url.PROFILE_LEFT_NAV[Object.keys(url.PROFILE_LEFT_NAV)[7]]] }</span>
								</a>
							</div>
						</div>
					</div>
				</div>
            </div>
        )
    }
}

export default Interpersonal;
