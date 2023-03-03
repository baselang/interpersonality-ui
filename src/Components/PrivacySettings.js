import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import $ from 'jquery';
import jQuery from 'jquery';
import logo_red from '../Assets/images/v2/logo-red.png';
import url from '../CommonComponent/CommonURL';
import LocalizedStrings from 'react-localization';
import { language } from './Language';
import linkHeader from '../CommonComponent/Link';
import renderHTML from 'react-render-html';

let strings = new LocalizedStrings(language);

class PrivacySettings extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            language_id: '',
            auth: '',
            user_id: '',            
            privacy_settings_status:0,
            loading: true,
            success: false,
            isChecked: '',
            is_customized_checked: '',
            is_ads_checked: '',
            is_email_checked: '',
            is_customized: '',
            is_ads: '',
            is_email: '',
            is_privacy_consent:'',
            is_privacy_consent_checked:''
        }
    }

    componentDidMount() {

        let auth = localStorage.getItem("auth");
        let language_id = localStorage.getItem("language_id");
        let rid = localStorage.getItem("rid");
        let user_id = localStorage.getItem("user_id");

        this.setState({
            language_id: language_id,
            rid: rid,
            auth: auth,
            user_id: user_id
        })

        if(auth){
        fetch(`${url.BASE_URL}/getprivacysettings`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
                "x-api-key": url.X_API_KEY,
                "language_id": language_id,
                "rid": rid,
                "Authorization": auth
            },
        }).then(response => response.json().then(data => ({ status: response.status, body: data })))
        .then(data => {
            window.scrollTo(0, 0);
            this.setState({ loading: false });
            if (localStorage.getItem("succeess") === "succeess") {
              this.setState({ success: true });
              setTimeout(
                () => {
                  this.setState({
                    success: false,
                  });
                },
                2000,
                localStorage.removeItem("succeess")
              );
            }
            if(data.status === 200) {
                localStorage.setItem("Settings", "Privacy");
                if (data.body.is_customized === 1 && data.body.is_email === 1 && data.body.is_ads === 1) {
                    this.setState({
                        isChecked: true,
                        is_customized_checked: true,
                        is_email_checked: true,
                        is_ads_checked: true
                    })
                } else {
                    this.setState({
                        isChecked: false,
                        is_customized_checked: data.body.is_customized === 1 ? true : false,
                        is_email_checked: data.body.is_email === 1 ? true : false,
                        is_ads_checked: data.body.is_ads === 1 ? true : false,                        
                    })
                }
                this.setState({
                  is_customized: data.body.is_customized,
                  is_email: data.body.is_email,
                  is_ads: data.body.is_ads,
                  privacy_settings_status:data.body.privacy_settings_status,
                  is_privacy_consent_checked: data.body.is_privacy_consent === 1 ? true : false,
                  is_privacy_consent:data.body.is_privacy_consent
                });
               
               
            }
            else {
                this.props.commanHandler("error500");
            }
        })}else{
            this.props.commanHandler("redirectToHome");
        }

        (function() {
			$(document).ready( function() {
				$('.tdq-privacy-fields input[name="tdq-privacy"]').on('change', function(e) {
					var value = $(this).val();

					if( value === 'adjust' ) {
						$(this).parents('li').find('input[type="checkbox"]').prop('checked', true);
						$(this).parents('li').find('.note').addClass('d-none');
					}

					$('.tdq-privacy-fields .tdq-privacy-options').addClass('d-none');
					$(this).parents('li').find('.tdq-privacy-options').removeClass('d-none');

				});
				$('.tdq-privacy-fields input[name="is_customized"]').on('click', function(e) {
					var value = $(this).val();
                    if( $(this).is(':checked') ) {
                        $(this).parents('li').find('.note').addClass('d-none');					
                    } else {
                        $(this).parents('li').find('.note').removeClass('d-none');
                    }
				});
				$('#update-consent .btn-delete-account').on('click', function(e) {
					$('#update-consent').modal('toggle');

					setTimeout( function() {
						$('#delete-account').modal('toggle');
					}, 400);

					e.preventDefault();
				});
			});
		})(jQuery);
    }


    toggleChange = (event) => {
        this.setState({
            privacy_settings_status:parseInt(event.target.value)
        })
    }


    deleteAccount = () => {
        if(this.state.auth){
            this.setState({ loading: true });
            fetch(`${url.BASE_URL}/deleteaccount`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                    "x-api-key": url.X_API_KEY,
                    "rid": this.state.rid,
                    "Authorization": this.state.auth,
                    "language_id": this.state.language_id
                },
            }).then(response => response.json().then(data => ({ status: response.status, body: data })))
            .then(data => {
                if(data.status === 200) {                    
                    localStorage.clear();
                    return this.props.history.push("/");                }
                else {
                    this.props.commanHandler("error500");
                }
            })
        }else{
            return this.props.history.push("/");
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        var data = {
            privacy_settings_status: this.state.privacy_settings_status
        };

        this.setState({loading: true})
        if(this.state.auth){
        fetch(`${url.BASE_URL}/updateprivacysettings`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
                "x-api-key": url.X_API_KEY,
                "language_id": this.state.language_id,
                "rid": this.state.rid,
                "Authorization": this.state.auth
            },
        }).then(response => response.json().then(data => ({ status: response.status, body: data })))
        .then(data => {
            if(data.status === 200) {
                localStorage.setItem("Settings", "Privacy");
                localStorage.setItem("succeess", "succeess");
                window.location.reload();
            }
            else {
                this.props.commanHandler("error500");
            }
        })}else{
            this.props.commanHandler("redirectToHome");
        }
    }

    handlePrivacyConsentTrue = () =>{
        this.setState({
            is_privacy_consent_checked:true,
            is_privacy_consent:true
        })
    }

    handlePrivacyConsentFalse = () =>{
        this.setState({
            is_privacy_consent_checked:false,
            is_privacy_consent:false
        })
    }

    handleWebsite = () => {
        
       $("input[name='is_customized']").val(1);
        this.setState({
            is_customized: 1,
            is_email: 1,
            is_ads: 1,  
            is_customized_checked: true,
            is_ads_checked: true,
            is_email_checked: true,
            isChecked: !this.state.isChecked,
        });
        this.clickOnConcent();
    }

    handleAdjus = () => {
        
        this.setState({
          isChecked: !this.state.isChecked,
        });
        this.clickOnConcent();
    }

    handleCustomized = (e) => {
       
        this.setState({is_customized_checked: !this.state.is_customized_checked })

        if (this.state.is_customized_checked){
            this.setState({
                is_customized: 0,
            });
        }
        else{
            this.setState({
                is_customized: 1,
            });
        }
        var a = $("input[name='is_customized']").val()
        if(a==="1"){
            $('#update-consent .btn-delete-account').show();
            $('#update-consent .settings-btn-green').hide();
        }else{      
            $('#update-consent .btn-delete-account').hide();
            $('#update-consent .settings-btn-green').show();        
        }
    }

    handleEmail = (e) => {
       
        this.setState({is_email_checked: !this.state.is_email_checked })

        if (this.state.is_email_checked){
            this.setState({
                is_email: 0,
            });
        }
        else{
            this.setState({
                is_email: 1,
            });
        }
        this.clickOnConcent();
    }

    handleAds = (e) => {
       
        this.setState({is_ads_checked: !this.state.is_ads_checked })

        if (this.state.is_ads_checked){
            this.setState({
                is_ads: 0,
            });
        }
        else{
            this.setState({
                is_ads: 1,
            });
        }
        this.clickOnConcent();

    }

    clickOnConcent=()=>{
        var a= $("input[name='is_customized']").val()
        if(a==="0"){
            $('#update-consent .btn-delete-account').show();
            $('#update-consent .settings-btn-green').hide();
        }else{      
            $('#update-consent .btn-delete-account').hide();
            $('#update-consent .settings-btn-green').show();        
        }
    }

    handlePrivacySubmit = (event) => {
        event.preventDefault();
        
        let data = {
            is_customized: this.state.is_customized,
            is_email: this.state.is_email,
            is_ads: this.state.is_ads,
            is_privacy_consent:this.state.is_privacy_consent
        }
        this.setState({loading: true})
        if(this.state.auth){
        fetch(`${url.BASE_URL}/updateconsent`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
                "x-api-key": url.X_API_KEY,
                "Authorization": this.state.auth
            },
        }).then(response => response.json().then(data => ({ status: response.status, body: data })))
        .then(data => {
            if(data.status === 200) {
                localStorage.setItem("Settings", "Privacy");
                localStorage.setItem("succeess", "succeess");
                window.location.reload();
            }
            else {
                this.props.commanHandler("error500");
            }
        })}else{
            this.props.commanHandler("redirectToHome");
        }
    }

    componentDidUpdate(){
        $('#pvc').on('click', function() {
			sessionStorage.setItem('from_settings','p2')
		});

        $(document).ready( function() {
            function header_sticky() {
                $('#profile-header').sticky({
                topSpacing: 0,
                zIndex: 1050
                });
        
                $('.test-header.sticky').sticky({
                topSpacing: 0,
                zIndex: 1050
                });
        
                $('#site-header').sticky({
                topSpacing: 0,
                zIndex: 1050
                });
        
                function scrollDetection() {
                var scrollPosition = 0;
            
                $(window).scroll(function () {
                    var header_height = $('#profile-header').outerHeight();
        
                    if( !header_height && $('.test-header.sticky').length ) {
                    header_height = $('.test-header.sticky').outerHeight();
                    } else if( !header_height && $('#site-header').length ) {
                    header_height = $('#site-header').outerHeight();
                    }
        
                    var cursorPosition = $(this).scrollTop();
                    
                    if( cursorPosition > header_height ) {
                    if( cursorPosition > scrollPosition ) {
                        $('body').removeClass('scroll-up').addClass('scroll-down');
                    } else if ( cursorPosition < scrollPosition ) {
                        $('body').removeClass('scroll-down').addClass('scroll-up');
                    }
                    } else {
                    $('body').removeClass('scroll-up scroll-down');
                    }
                    
                    scrollPosition = cursorPosition;
                });
                }
        
                scrollDetection();
            }
        
            header_sticky();
        })
    }

    render() {

        strings.setLanguage(this.state.language_id);

        let headContent = linkHeader.map((lin, index) => {
            return (
                <link key={index} rel={lin.rel} hreflang={lin.hreflang} href={url.ORIGIN_URL+lin.href+"settings"}/>
            )
        })

        let mailTo  = "mailto:mydata@interpersonality.com"
        let mail = "mydata@interpersonality.com"

        return (
            <div>
                { this.state.loading && <div className="loader"></div> }
                <Helmet>
                    { headContent }
                </Helmet>
                <div className="right_side_barr setting_righbarr">
                    <div className="settings-info">
                        {this.state.success &&
                        <div className="settings-alert">
                            <i className="fa fa-check-circle"></i>
                            <strong>{strings.SETTINGS_SAVEDBTN}</strong>
                        </div>
                        }
                        <div className="privacy-container">
                            <form onSubmit={ this.handleSubmit }>
                                <div className="privacy__header">
                                    {renderHTML(strings.SETTINGS_PRIVACY_TITLE)}
                                </div>
                                <div className="privacy__field">
                                    {renderHTML(strings.SETTINGS_PRIVACY_LINK)}
                                    <div className="checkbox">
                                        <label><input type="checkbox" name="privatecheckbox" value="0" onChange={this.toggleChange} checked checked={this.state.privacy_settings_status ===0 } /><i className="fa fa-check"></i></label>
                                    </div>
                                </div>
                                {/* <div className="privacy__field">
                                    {renderHTML(strings.SETTINGS_PRIVACY_FRIENDS_LINK)}
                                    <div className="checkbox">
                                        <label><input type="checkbox" name="friendscheckbox" value="1" onChange={this.toggleChange} checked={this.state.privacy_settings_status===1 }  /><i className="fa fa-check"></i></label>
                                    </div>
                                </div> */}
                                <div className="privacy__field privacy__field-last">
                                    {renderHTML(strings.SETTINGS_PRIVACY_PUBLIC_LINK)}
                                    <div className="checkbox">
                                        <label><input type="checkbox" value="2" name="publiccheckbox" onChange={this.toggleChange} checked={ this.state.privacy_settings_status===2 }/><i className="fa fa-check"></i></label>
                                    </div>
                                </div>
                                <button type="submit" className="settings-btn-green">{strings.SETTINGS_SAVEBTN}</button>
                                <div className="privacy__field privacy__field-delete">
                                    {renderHTML(strings.formatString(strings.SETTINGS_PRIVACY_DELETE_ACCOUNT_TITLE))}
                                    <Link to="javascript:void(0);" className="btn-delete-account" data-toggle="modal" data-target="#delete-account"><strong>{strings.SETTINGS_PRIVACY_DELETE_BTN}</strong></Link>
                                </div>
                                <div className="privacy__field privacy__field-export">
                                    {renderHTML(strings.formatString(strings.SETTINGS_PRIVACY_DOWNLOAD_DATA, mailTo, mail))}
                                </div>
                                <div className="privacy__field privacy__field-update-consent">
								    {renderHTML(strings.SETTINGS_PRIVACY_CONSENT_TITLE)}
							    </div>
                            </form>   
                        </div>
                    </div>
                </div>
                <div className="settings-modal modal fade" id="update-consent" role="dialog">
                    <div className="modal-dialog privacy-consent-modal-dialog" role="document">
                        <div className="modal-content">
                            <form onSubmit={ this.handlePrivacySubmit } >
                                <div className="modal-body">
                                    <div className="tdq-privacy">
                                        {renderHTML(strings.SETTINGS_PRIVACY_CONSENT_DEC)}
                                        <ul key="pst-u-1" className="tdq-privacy-fields">
                                            <li key="pst-u-1-l-1">
                                                <label>
                                                    <input type="radio" checked={ this.state.isChecked ? "true": "" } onChange={ this.handleWebsite } />
                                                    <span>{strings.SETTINGS_PRIVACY_CONSENT_DEC_OPTION_1}</span>
                                                </label>
                                            </li>
                                            <li key="pst-u-1-l-2">
                                                <label>
                                                    <input type="radio" checked={!this.state.isChecked } onChange={ this.handleAdjus } />
                                                    <span>{strings.SETTINGS_PRIVACY_CONSENT_DEC_OPTION_2}</span>
                                                </label>
                                                {!this.state.isChecked &&
                                                <ul key="pst-u-2" className="tdq-privacy-options">
                                                    <li key="pst-u-2-l-1">
                                                        <label>
                                                            <input type="checkbox" name="is_customized" value={this.state.is_customized} onChange={this.handleCustomized } checked ={this.state.is_customized === 1 ? true : false } />
                                                            <span>{strings.SETTINGS_PRIVACY_CONSENT_DEC_OPTION_2_1}</span>
                                                        </label>
                                                        { this.state.is_customized === 0 && <p className="note">{strings.SETTINGS_PRIVACY_CONSENT_OPTION_1_ERROR}</p>}
                                                    </li>
                                                    <li key="pst-u-2-l-2">
                                                        <label>
                                                            <input type="checkbox" name="is_email" value={this.state.is_email} onChange={ this.handleEmail } checked ={this.state.is_email === 1 ? true : false } />
                                                            <span>{strings.SETTINGS_PRIVACY_CONSENT_DEC_OPTION_2_2} </span>
                                                        </label>
                                                    </li>
                                                    <li key="pst-u-2-l-3">
                                                        <label>
                                                            <input type="checkbox" name="is_ads" value={this.state.is_ads} onChange={ this.handleAds } checked ={this.state.is_ads === 1 ? true : false } />
                                                            <span>{strings.SETTINGS_PRIVACY_CONSENT_DEC_OPTION_2_3}</span>
                                                        </label>
                                                    </li>
                                                </ul>
                                                }
                                            </li>
                                        </ul>
                                        <br/>
                                        <hr/>
                                        <br/>
                                        <ul key="pst-u-3" className="tdq-privacy-fields">
                                            <li key="pst-u-3-l-1">
                                                <label>
                                                    <input type="radio" checked={ this.state.is_privacy_consent_checked ? "true": "" } onChange={ this.handlePrivacyConsentTrue } />
                                                    <span>{strings.SETTINGS_PRIVACY_CONSENT_DEC_OPTION_3}</span>
                                                </label>
                                            </li>
                                            <li key="pst-u-3-l-2">
                                                <label>
                                                    <input type="radio" checked={!this.state.is_privacy_consent_checked } onChange={ this.handlePrivacyConsentFalse } />
                                                    <span>{strings.SETTINGS_PRIVACY_CONSENT_DEC_OPTION_4}</span>
                                                </label>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="settings-btn-green"><strong>{strings.SETTINGS_SAVEBTN}</strong></button>
                                    <a href="#" className="btn-delete-account"><strong>{strings.SETTINGS_PRIVACY_DELETE_BTN}</strong></a>                           
                                </div>
                            </form>    
                        </div>
                    </div>
                </div>
                <div className="settings-modal modal fade" id="delete-account" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <img src={ logo_red } className="logo" alt = ""/>
                                {renderHTML(strings.SETTINGS_PRIVACY_ACCOUNT_POPUP)}
                            </div>
                            <div className="modal-footer">
                                <Link to="#" className="settings-btn-green" data-dismiss="modal"><strong>{strings.SETTINGS_NEVERMIND}</strong></Link>
                                <Link to="#" onClick={this.deleteAccount} className="modal-btn-link"><strong>{strings.SETTINGS_PRIVACY_DELETE_ACCOUNT_POPUP_BTN}</strong></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PrivacySettings;