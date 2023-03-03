import React, { Component }  from 'react';
import { Link } from 'react-router-dom';
import renderHTML from 'react-render-html';
import LocalizedStrings from 'react-localization';
import { language } from '../Components/Language';

let strings = new LocalizedStrings(language);

function GuideWithGotit(props) {
    strings.setLanguage(localStorage.getItem("language_id"));
    return ( 
        <div className="settings-modal modal fade" id="got_it_popup" role="dialog" data-backdrop="false" aria-hidden="true" >
            <div className="modal-dialog privacy-consent-modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-body">
                        {renderHTML(strings.formatString(strings.GUIDE_WITH_PRIVACY_CONSENT_POPUP,props.partner_name,props.partner_name,props.partner_name,props.partner_name))}
                    </div>
                    <div className="modal-footer">
                        <Link to="/guides" onClick={props.handleGenerateReport} className="settings-btn-green" data-dismiss="modal"><strong>{strings.GUIDE_HOME_PRIVACY_CONSENT_GOTIT_BTN}</strong></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
  
export default GuideWithGotit;