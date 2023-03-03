import React, { Component } from 'react';
import renderHTML from 'react-render-html';
import sis_photo_placeholder from '../Assets/images/v2/sis-photo-placeholder.svg';
import arrow_right_white from '../Assets/images/arrow-right-white.svg';
import logo_small from '../Assets/images/v2/logo-small.svg';

import LocalizedStrings from 'react-localization';
import { language } from './Language';

let strings = new LocalizedStrings(language);
class FriendsLogoutInterpersonal extends Component {
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
        return (
            <div>
                <div className="right_side_barr margin_mobile_low">
					<div className="profile-content">
						<div className="sis-content">
							<div className="container p-0 sis-guest-header">
							<h1 className="text-center">{renderHTML(strings.formatString(strings.INTERPERSONAL_LOGGEDOUT_TITLE,this.props.someElseProfileFirstname))} </h1>				
								<div className="sis-photo">
									<img src={ sis_photo_placeholder } alt="" />
									<img src={this.props.someElseLogoutUserProfile !== null ? this.props.someElseLogoutUserProfile : sis_photo_placeholder} alt="" />
								</div>
								<div className="sis-guest-text text-center">
									{renderHTML(strings.formatString(strings.INTERPERSONAL_LOGGEDOUT_CONTENT_1,this.props.someElseProfileFirstname,this.props.someElseProfileName))}
									<a href="/test" className="sis-btn-test"><span>{strings.INTERPERSONAL_LOGGEDOUT_TEST}</span><img src={ arrow_right_white } alt="" /></a>
								</div>
							</div>
							<div className="sis-guest-highlight">
								<div className="sis-gh-header text-center">
									<img src={ logo_small } alt="" />
									{renderHTML(strings.INTERPERSONAL_LOGGEDOUT_CONTENT_2)}
								</div>
								<p className="text-center" >
									<a href="/test" className="sis-btn-test"><span>{strings.INTERPERSONAL_LOGGEDOUT_TEST}</span><img src={ arrow_right_white } alt="" /></a>
									<a href="/" className="sis-btn-more"><strong>{renderHTML(strings.INTERPERSONAL_LOGGEDOUT_CONTENT_3)}</strong></a>
								</p>
							</div>
						</div>
					</div>
				</div>
            </div>
        )
    }
}

export default FriendsLogoutInterpersonal;

