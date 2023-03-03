import React, { Component } from 'react';
import renderHTML from 'react-render-html';

import LocalizedStrings from 'react-localization';
import { language } from './Language';
import url from '../CommonComponent/CommonURL';

let strings = new LocalizedStrings(language);

class ExtendedProfileIntroduction extends Component {
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

		let section = [];
		let dynamicDivArray = [];
		let user_report = this.props.extended_report_content;
		if(user_report != undefined && user_report.length > 0) {
			user_report.map((key,val)=>{
				if(section[key.Section] == undefined ) {
					section[key.Section]=[];
					section[key.Section].push( key)
				}else{
				  let currentIndex = section[key.Section].length;
					section[key.Section][currentIndex]=key;
				}
			  })
			  if(section.length >0){
				section.map((keyId,valId)=>{
				  section[valId].slice().sort((a, b) => a.section - b.section)
				});
			  }

			  section && section.map((innerSection, index)=>{
				  innerSection.map((section, index)=>{
					section.Content = section.Content.replace('<ul>','<ul className="content_ul">');
					section.Content = section.Content.replace('<ol>','<ol className="content_ol">');
					  const image = section.illustration_image ? `<img src=${section.illustration_image} alt="" className = "aligncenter" />` : "";
					  if(section.Section == 1) {
						  let introduction = `<h2><span>🙋</span>${strings[url.PROFILE_LEFT_NAV[Object.keys(url.PROFILE_LEFT_NAV)[1]]]}</h2>`;
						  if(index == 0) {
							  dynamicDivArray = dynamicDivArray+introduction
						  }
						  dynamicDivArray = dynamicDivArray+image+section.Content
					  } else if(section.Section == 2) {
						  let romantic_relationships = `<h2><span>❤️</span>${strings[url.PROFILE_LEFT_NAV[Object.keys(url.PROFILE_LEFT_NAV)[2]]]}</h2>`;
						  if(index == 0) {
							  dynamicDivArray = dynamicDivArray+romantic_relationships
						  }
						  dynamicDivArray = dynamicDivArray+image+section.Content
					  } else if(section.Section == 3) {
						  let carrer_path = `<h2><span>🔮</span>${strings[url.PROFILE_LEFT_NAV[Object.keys(url.PROFILE_LEFT_NAV)[3]]]}</h2>`;
						  if(index == 0) {
							  dynamicDivArray = dynamicDivArray+carrer_path
						  }
						  dynamicDivArray = dynamicDivArray+image+section.Content
					  } else if(section.Section == 4) {
						  let lifestyle = `<h2><span>👨‍👨‍👧‍👦</span>${strings[url.PROFILE_LEFT_NAV[Object.keys(url.PROFILE_LEFT_NAV)[4]]]}</h2>`;
						  if(index == 0) {
							  dynamicDivArray = dynamicDivArray+lifestyle
						  }
						  dynamicDivArray = dynamicDivArray+image+section.Content
					  } else if(section.Section == 5) {
						  let at_work = `<h2><span>💼</span>${strings[url.PROFILE_LEFT_NAV[Object.keys(url.PROFILE_LEFT_NAV)[5]]]}</h2>`;
						  if(index == 0) {
							  dynamicDivArray = dynamicDivArray+at_work
						  }
						  dynamicDivArray = dynamicDivArray+image+section.Content
					  }
				  })
				  
			  })
		}
        
        return (
            <div>
				<div className="right_side_barr">
					<div className="profile-content">
						<div className="contetnttt_moduleee profile-content__text pc--content pc--content-unlocked">
							<div className="pc--heading">
								<h1><span>🔑</span>{strings[url.PROFILE_LEFT_NAV[Object.keys(url.PROFILE_LEFT_NAV)[7]]]}</h1>
							</div>
							{(renderHTML(dynamicDivArray.length > 0 ?  dynamicDivArray : ''))}
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

export default ExtendedProfileIntroduction;