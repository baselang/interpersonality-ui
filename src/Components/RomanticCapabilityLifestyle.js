import React, { Component } from 'react';
import renderHTML from 'react-render-html';

import LocalizedStrings from 'react-localization';
import { language } from './Language';
import url from '../CommonComponent/CommonURL';

let strings = new LocalizedStrings(language);

class RomanticCapabilityLifestyle extends Component {
	constructor() {
		super();
		this.state = {
			language_id: ''
		}
	}

	componentDidMount() {
		let language_id = localStorage.getItem("language_id")
		this.setState({language_id: language_id})
	}

    render() {

		strings.setLanguage(this.state.language_id);

		let dynamicDivArray = [];
		let report_length = this.props.guides_report[4] != undefined ?   this.props.guides_report[4].length : ''

		if(report_length != undefined) {
			this.props.guides_report[4] && this.props.guides_report[4].map((data, index)=>{
				let content =  data.content
				let preframe_style = data.preframe_style ?  `<div className="sis-content"><div className="sis-heading text-center"><h2><span>${url.emoji_config[data.theme_id]}</span>${(data.theme_name).toUpperCase()}</h2></div><h3 className="text-sm-center">${data.preframe_style}</h3><div className="row"><div className="col-md-6"><p>${data.style_comparison_self_user}</p></div><div className="col-md-6"><p>${data.style_comparison_other_user}</p></div></div><p>${data.outro_text_style}</p></div>`: ""
				dynamicDivArray = preframe_style ? (dynamicDivArray + preframe_style) : (dynamicDivArray + content)
				dynamicDivArray = dynamicDivArray.replace('<ul>','<ul className="content_ul">');
				dynamicDivArray = dynamicDivArray.replace('<ol>','<ol className="content_ol">');
			});
		}

        return (
            <div>
                <div className="right_side_barr">
					<div className="profile-content">
						<div className="contetnttt_moduleee profile-content__text pc--content">
							<div className="pc--heading">
								<h1><span>🙋</span>{strings[url.ROMANTIC_COMPATABILITY_GUIDE_LEFT_NAV[Object.keys(url.ROMANTIC_COMPATABILITY_GUIDE_LEFT_NAV)[4]]]}</h1>
							</div>
							{(renderHTML(dynamicDivArray.length > 0 ?  dynamicDivArray : ''))}
						</div>
					</div>
				</div>
            </div>
        )
    }
}

export default RomanticCapabilityLifestyle;
