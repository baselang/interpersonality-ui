import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import renderHTML from 'react-render-html';

import ProfileShareCTA from '../CommonComponent/ProfileShareCTA';
import ProfileShare from '../CommonComponent/ProfileShare';
import LocalizedStrings from 'react-localization';
import { language } from '../Components/Language';
import url from '../CommonComponent/CommonURL';
import preview_image from '../Assets/images/v2/preview-image.jpg';
import ProgressiveImage from "react-progressive-image-loading";

let strings = new LocalizedStrings(language);

class CareerPath extends Component {
	constructor(props) {
        super(props);
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

		let share_module_report_content = this.props.share_module_report_content;

		let ctaContent = '';
			if(share_module_report_content != undefined && share_module_report_content.length>0){
			ctaContent = share_module_report_content.find((itmInner) => {
				return (itmInner.Section == 3 ) ? itmInner : "";
			});
		}
		
		let Share_CTA = (ctaContent != '' && ctaContent != undefined ) ? <ProfileShareCTA Content = {ctaContent.Content}/>:"";
		let dynamicDivArray = [];
		let report_length = ( this.props.user_report_data != undefined && this.props.user_report_data[3] != undefined )? this.props.user_report_data[3].length : 0;

		if(report_length > 0 ) {
			this.props.user_report_data[3].map((story, index)=>{
				let image = story.illustration_image ? <ProgressiveImage preview={preview_image} src={story.illustration_image} render={(src, style) => <img alt="" src={src} style={style} />} /> :'';

				if(report_length-1 == index && Share_CTA != '')
					dynamicDivArray.push(Share_CTA);
				
				if(image!=''){
					dynamicDivArray.push(image);
				}
				story.Content = story.Content.replace('<ul>','<ul className="content_ul">');
				story.Content = story.Content.replace('<ol>','<ol className="content_ol">');
				dynamicDivArray.push(renderHTML(story.Content));
				
			});
		}
		
        return (
            <div>
                <div className="right_side_barr">
					<div className="profile-content">
						<div className="contetnttt_moduleee profile-content__text pc--content">
							<div className="pc--heading">
								<h1><span>🔮</span>{strings[url.PROFILE_LEFT_NAV[Object.keys(url.PROFILE_LEFT_NAV)[3]]]}</h1>
							</div>
							{[(dynamicDivArray)]}
							<div className="profile-content__nav">
								<Link to="#" onClick={() => this.props.activateTab(Object.keys(url.PROFILE_LEFT_NAV)[4])}>
									<span className="profile-content__nav-icon">😁</span>
									<span>{strings.NEXT_SECTION}</span>
									<span className="profile-content__nav-title">{strings[url.PROFILE_LEFT_NAV[Object.keys(url.PROFILE_LEFT_NAV)[4]]]}</span>
								</Link>
							</div>
						</div>
					</div>
					{ this.props.access_type === "is_login_private" && <ProfileShare /> }
				</div>
            </div>
        )
    }
}

export default CareerPath;