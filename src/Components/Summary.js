import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import renderHTML from 'react-render-html';

import ProfileShareCTA from '../CommonComponent/ProfileShareCTA';
import LocalizedStrings from 'react-localization';
import { language } from './Language';
import url from '../CommonComponent/CommonURL';

let strings = new LocalizedStrings(language);

class Summary extends Component {
    constructor(props) {
        super(props);
        this.state = {
			language_id: '',
			gender: ''
        }
    }

    componentDidMount() {
		let language_id = localStorage.getItem("language_id")
		let gender = localStorage.getItem("gender")
        this.setState({
			language_id: language_id,
			gender: gender
        })
	}

    render() {

		strings.setLanguage(this.state.language_id);

		let share_module_report_content = this.props.share_module_report_content;

		let ctaContent = '';
			if(share_module_report_content != undefined && share_module_report_content.length>0){
			ctaContent = share_module_report_content.find((itmInner) => {
				return (itmInner.Section == 0 ) ? itmInner : "";
			});
		}

		let Share_CTA = (ctaContent != '' && ctaContent != undefined ) ? <ProfileShareCTA Content = {ctaContent.Content}/>:"";
		let dynamicDivArray = [];
		let report_length =  ( this.props.user_report_data != undefined && this.props.user_report_data[0] != undefined )? this.props.user_report_data[0].length : 0;
		if( report_length > 0){
			this.props.user_report_data[0].map((story, index)=>{
				let image = story.illustration_image ? `<img alt="" src=${story.illustration_image} className = "aligncenter" />` : "";
				if(report_length-1 == index && Share_CTA != '') {
					dynamicDivArray.push(Share_CTA);
				}
				dynamicDivArray.push(renderHTML(image+story.Content));
			});
		}
        
        return (
            <div>
                <div className="right_side_barr margin_mobile_low">
					<div className="profile-content">
						<div className="contetnttt_moduleee profile-content__text pc--content">
							<div className="profile-content__heading pc--heading">
								<h1><span>⏳</span>{strings[url.PROFILE_LEFT_NAV[Object.keys(url.PROFILE_LEFT_NAV)[0]]]}</h1>
							</div>
							{[(dynamicDivArray)]}
							<div className="profile-content__nav">
								<Link to="#" onClick={() => this.props.activateTab(Object.keys(url.PROFILE_LEFT_NAV)[1])}>
									<span className="profile-content__nav-icon">🙋</span>
									<span>{strings.NEXT_SECTION}</span>
									<span className="profile-content__nav-title">{strings[url.PROFILE_LEFT_NAV[Object.keys(url.PROFILE_LEFT_NAV)[1]]] }</span>
								</Link>
							</div>
						</div>
					</div>
				</div>
            </div>
        )
    }
}

export default Summary;
