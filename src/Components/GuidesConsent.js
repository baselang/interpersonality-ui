import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LocalizedStrings from 'react-localization';
import { language } from '../Components/Language';
import renderHTML from 'react-render-html';


let strings = new LocalizedStrings(language);

class GuidesConsent extends Component {
    constructor() {
        super()
        this.state = {
            language_id: ''
        }
    }    
    componentDidMount() {
        let language_id = localStorage.getItem("language_id");
        this.setState({language_id: language_id})
    }
    render() {

        strings.setLanguage(this.state.language_id);

        return (
            <div>
                <section className="pc--content profile-content__text">
                    <div className="container Guide-consent-container">
                        <div className="row" >
                            {renderHTML(strings.GUIDE_HOME_PRIVACY_CONSENT_DESC)}
                            <div className="inner-row">
                                <Link to="#" className="settings-btn-green agree_btn" onClick={ () => this.props.updateConsent(1)}><strong>{strings.GUIDE_HOME_PRIVACY_CONSENT_UPDATE_BTN}</strong></Link>
                                <p><a href={`/profile/${localStorage.getItem("user_id")}`} className="modal-btn-link disagree_btn">{renderHTML(strings.GUIDE_HOME_PRIVACY_CONSENT_NOT_NOW_BTN)}</a></p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default GuidesConsent;
