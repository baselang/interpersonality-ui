import React, { Component } from 'react';
import renderHTML from 'react-render-html';
import sis_photo_placeholder from '../Assets/images/v2/sis-photo-placeholder.svg';
import LocalizedStrings from 'react-localization';
import { language } from './Language';
import country from '../CommonComponent/Country';
import url from '../CommonComponent/CommonURL';
import Twemoji from 'react-twemoji';
import {isWindows} from 'react-device-detect';
import $ from 'jquery';

let strings = new LocalizedStrings(language);

class FriendsInterpersonal extends Component {
    constructor() {
        super();
        this.state = {
			language_id: '',
			user_id: '',
			userid: '',
			loading: true,
			interpersonal_report_data: '',
			url_to_share: '',
			similarity_score: ''
        }
	}
	
	componentDidMount() {
		let language_id = localStorage.getItem("language_id")
		let user_id = localStorage.getItem("user_id")
		let auth = localStorage.getItem("auth")
		let browser_url = window.location.href
		let userid = browser_url.split(country.profile)[1];
		
		strings.setLanguage(language_id);
		
		this.setState({
			language_id: language_id,
			user_id: user_id,
			userid: userid
		})

		let data = {
			user_id: userid
		}

		if(auth){
			fetch(`${url.BASE_URL}/interpersonal`, {
			method: "PUT",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Credentials": true,
				"x-api-key": url.X_API_KEY,
				"Authorization": auth,
			}
			}).then(response => response.json().then(data => ({ status: response.status, body: data })))
			.then(data => {
				this.setState({loading: false})
				if( data.status === 200 ) {

					let interpersonal = ''

					for (let i = 0; i < data.body.user_1.length; i++) {
				
						if(i == 3) 
						interpersonal = interpersonal+'</br></br></br>'+`<div className="sis-highlight text-sm-center">
						${strings.formatString(strings.INTERPERSONAL_LOGGEDIN_IMPORTANT,this.props.someElseProfileName,this.props.someElseProfileName)}
						</div>`;
						let theme_order = data.body.theme_order[i]
						interpersonal = interpersonal+ '<div className="sis-heading text-center"><h2><span>'+url.emoji_config[theme_order]+'</span>'+(data.body.theme[i]).toUpperCase()+'</h2></div>'+
						'<h3 className="text-sm-center">'+data.body.comparison[i]+'</h3>'+
						'<div className="row mb-0">'+
							'<div className="col-md-6">'+data.body.user_1_content[i]+'</div>'+
							'<div className="col-md-6">'+data.body.user_2_content[i]+'</div>'+
						'</div>'
					}
					this.setState({
						interpersonal_report_data: interpersonal,
						similarity_score: data.body.similarity_score,
						url_to_share: data.body.url_to_share
					})
				} else {
					this.props.commanHandler("error500");
				}
			})
		}else{
			this.props.commanHandler("redirectToHome");
		}
	}

	componentDidUpdate() {
		var _this = this;
		$('#navigateToGudes').off("click").on('click', function(e) {
			e.preventDefault();
			 _this.props.commanHandler("redirectGuidesPage")
		});
		$('#navigateTOCompatabilitySalesPage').off("click").on('click', function(e) {
			e.preventDefault();
			 _this.props.commanHandler("redirectRomanticCapabilitySalesPage")
		});

		$('#navigateTOCoupleSalesPage').off("click").on('click', function(e) {
			e.preventDefault();
			_this.props.commanHandler("redirectForCouplesSalesPage")
		});
	}

    render() {

		strings.setLanguage(this.state.language_id);
		
		const facebookText = encodeURI(`https://www.facebook.com/sharer/sharer.php?u=${this.state.url_to_share}`)

		let friendsInterpersonal = <div>
			{ this.state.loading && <div className="loader"></div> }
			<div className="right_side_barr margin_mobile_low">
				<div className="profile-content">
					<div className="sis-content">
						<div className="container p-0">
							<h1 className="text-center">{renderHTML(strings.formatString(strings.INTERPERSONAL_LOGGEDIN_TITLE,localStorage.getItem("firstname"),this.props.someElseProfileFirstname, this.state.similarity_score))} </h1>
							<div className="sis-photo">
								<img src={localStorage.getItem("user_profile_pic") !== "null" ? localStorage.getItem("user_profile_pic") : sis_photo_placeholder } className="friends_interpersonal_img" alt="" />
								<img src={this.props.someElseUserProfile !== null ? this.props.someElseUserProfile : sis_photo_placeholder} className="friends_interpersonal_img" alt="" />
							</div>
							<a href={ facebookText } target="#" className="sis-btn-facebook"><i className="fa fa-facebook-square" aria-hidden="true"></i><span>{strings.EXTENDED_PROFILE_SOMEONE_ELSE_SHERETEXT}</span></a>
						</div>
						<div className="container-fluid p-0">
							{renderHTML(this.state.interpersonal_report_data)}
						</div>
						<div className="helpful-notice">
							<div className="helpful-notice-inner">
								{renderHTML(strings.INTERPERSONAL_LOGGEDIN_FOOTER)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		if(isWindows) {
			return (
				<Twemoji options={{ className: 'emoji', folder: 'svg', ext: '.svg' }} >
					{friendsInterpersonal}
				</Twemoji>
			)
		} else {    
			return friendsInterpersonal
		}
    }
}

export default FriendsInterpersonal;
