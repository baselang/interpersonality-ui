import React, { Component } from 'react';
import url from '../CommonComponent/CommonURL';
import guide_profile_photo_hundread from '../Assets/images/guide/mark_profile.png';
import renderHTML from 'react-render-html';
import LocalizedStrings from 'react-localization';
import { language } from './Language';

let strings = new LocalizedStrings(language);

class CouplesCoaching extends Component {	
    constructor() {		
		super()        
		this.state={
			language_id: '',
            user_id: '',
			auth: '',
			loading: false,
		}		
	}
	
	componentDidMount() {

		const head = document.querySelector('head');
		const script = document.createElement('script');
		script.setAttribute('src',  `${url.CALENDLY_SRC}`);
		head.appendChild(script);

		let language_id = localStorage.getItem("language_id"),
        user_id = localStorage.getItem("user_id"),
        auth = localStorage.getItem("auth");
        this.setState({
            language_id: language_id,
            user_id: user_id,
			auth:auth
        });
	}

    render() {
		strings.setLanguage(this.state.language_id);
		let user_name = this.props.user_name;
		let email = this.props.primary_email;
		let queryString = `?name=${user_name}&email=${email}`;
		const data_url=`${url.CALENDLY_DATA_URL}${queryString}`;
		return (			
            <div>
				{ this.state.loading && <div className="loader"></div> }
				<div className="right_side_barr">
					<div className="profile-content">
						<div className="contetnttt_moduleee profile-content__text pc--content">
							<div className="guides-coaching-header text-center">
								<img src={guide_profile_photo_hundread} alt="" />
								{renderHTML(strings.GUIDES_COUPLE_REPORT_COACHING_TITLE)}
							</div>
							{renderHTML(strings.GUIDES_COUPLE_REPORT_COACHING_DESC)}
							<div className="calendly-inline-widget embed-block" data-url={data_url}></div>
							{renderHTML(strings.GUIDES_COUPLE_REPORT_COACHING_DESC_1)}
						</div>
					</div>
				</div>
            </div>
        )
    }
}

export default CouplesCoaching;
