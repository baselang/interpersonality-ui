import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import renderHTML from 'react-render-html';
import guide_profile_placeholder from '../Assets/images/guide/guide-profile-placeholder.png';
import guide_with_desc1_eng from '../Assets/images/guide/photo-who-want-1-eng.png';
import guide_with_desc2_eng from '../Assets/images/guide/photo-who-want-2-eng.png';
import guide_with_desc1_spanish from '../Assets/images/guide/photo-who-want-1-spanish.png';
import guide_with_desc2_spanish from '../Assets/images/guide/photo-who-want-2-spanish.png';
import CommonProfileHeader from '../CommonComponent/CommonProfileHeader';
import Sidenav from '../CommonComponent/Sidenav';
import LocalizedStrings from 'react-localization';
import { language } from './Language';
import url from '../CommonComponent/CommonURL';
import linkHeader from '../CommonComponent/Link';
import $ from 'jquery';
import jQuery from 'jquery';
import Twemoji from 'react-twemoji';
import {isWindows} from 'react-device-detect';
import GuideWithGotit from '../FunctionalComponent/GuideWithGotit';
import country from '../CommonComponent/Country';

let strings = new LocalizedStrings(language);

class GuideWith extends Component {
    constructor() {
        super();
        this.state = {
            language_id: '',
            loading: false,
            auth: '',
            link: '',
            partner_name: '',
            partner_picture_url: '',
            partner_user_id: '',
            partnerLinkMessage: '',
            generateReportMessage: '',
            refundPurchaseMessage: '',
            isRefresh: true,
            status:'',
            is_privacy_consent:true
        }
    }

    componentDidMount() {
        let language_id = localStorage.getItem("language_id");
        let auth = localStorage.getItem("auth");
        this.setState({
            language_id: language_id,
            auth: auth
        })
        this.props.setLoading();
    }

    componentDidUpdate() {
        jQuery('body').removeClass("page-profile sales-compatibility");
        jQuery('body').removeClass("page-profile page-guides sales-couples")
        jQuery("body").addClass("page-guides gray-background");
    }

    handleLink = (e) => {
        this.setState({
            link: e.target.value
        })
        if(e.target.value===""){
            this.setState({
                link: e.target.value,
                isRefresh:true,
                partnerLinkMessage:"",
                status:null,
                partner_name: "",
                partner_picture_url: "",
                partner_user_id: ""
            })  
        }
    }

    doApiCall = (apiPath, methodType, bodyData=null, stateName, apiParam=null, callback=null)=>{
        this.setState({loading: true})
        ;
        if(this.state.auth) {
            let apiHeaders = {};
            if(apiParam != null){
                apiHeaders = apiParam;
            }
            let body
            if(bodyData != null) {
                body = JSON.stringify(bodyData)
            }
             apiHeaders['Content-Type']= 'application/json';
             apiHeaders['Access-Control-Allow-Origin']= '*';
             apiHeaders['Access-Control-Allow-Credentials']= true;
             apiHeaders['x-api-key']=url.X_API_KEY;
             apiHeaders['Authorization']= this.state.auth;
            
            fetch(`${url.BASE_URL}`+apiPath, {
                method: methodType,
                body: body,
                headers: apiHeaders,
            }).then(response => response.json().then(data => ({ status: response.status, body: data })))
            .then(data => {
                ;
                this.setState({loading: false})
                this.setState({isRefresh: false})

                if(data.status === 200) {
                    this.setState({
                        [stateName]: data.body,
                        status:data.status
                    },()=>{
                        if(callback != null){
                            callback(data.body)
                        }
                    })
                } else if(data.status === 400) {
                    this.setState({ 
                        [stateName]: data.body,
                        status:data.status
                    },()=>{
                        if(callback != null){
                            callback(data.body)
                        }
                    })
                } else {
                    this.props.commanHandler("error500");
                }
            })
        } else {
            this.props.commanHandler("error500");
        }
    }

    handleReport = (response, error=null) => {
        this.setState({loading: true})
        if(this.state.is_privacy_consent){
            this.props.handleGuidesPageRedirection(response.user_partner_id, this.props.is_guide)
        }else{
            this.props.setGuideActive();
        }
    }

    handleGenerateReport = () => {
        this.setState({loading: true})
        let apiParams = {
            "purchase_id": this.props.unselected_product_id,
            "partner_user_id": this.state.partner_user_id
        };

        this.doApiCall("/generateuserpartner", "POST", "" , "generateReportMessage", apiParams, this.handleReport);
         
    }

    handleRefund = (response, error=null) => {
        if(response != null){
            if(this.state.status == 200 && response.message) {
                this.openPopUP("modal-refund-successful", "show");
            } else {
                alert(response.message)
            }
        }
    }

    hanldeGotIt = () => {
        this.openPopUP("modal-refund-successful", "hide");
        this.props.handleBack("guideWithPaymentSuccessBack");
    }
    
    openPopUP = (eleId, action) =>{

       if(action == 'show'){
            $('#'+eleId).addClass('show')
            $('#'+eleId).css({
                "display": "block"
            });
            $("body").addClass('modal-open')
       }else{
            $('#'+eleId).removeClass('show')
            $('#'+eleId).css({
                "display": "none"
            });
            $("body").removeClass('modal-open')
       }
    }
    
    handleRefundPurchase = () => {
        this.setState({loading: true})
        this.openPopUP('modal-cancel-order', 'hide')
        let apiParams = {
            "product_id": this.props.unselected_product_id
        };

        this.doApiCall("/cancelsubscription", "POST", "" , "refundPurchaseMessage", apiParams, this.handleRefund);
    }

    handlePartnerLink = (response, error=null) => {
        if(response != null){
            this.setState({
                partner_name: response.partner_name,
                partner_picture_url: response.partner_picture_url ? response.partner_picture_url : guide_profile_placeholder,
                partner_user_id: response.partner_user_id,
                is_privacy_consent:response.partner_privacy_consent
            })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.setState({isRefresh: false})

        let bodyData = {
            link: this.state.link
        }

        let apiParams = {
            "purchase_id": this.props.unselected_product_id
        };

        this.doApiCall("/partnerlinksearch", "POST", bodyData , "partnerLinkMessage", apiParams, this.handlePartnerLink);     
    }

    render() {

        const isEnabled = this.state.link.length > 0;

        strings.setLanguage(this.state.language_id);
        let default_language_id  = Object.keys(country.language_id_code_mapping).find(k=>country.language_id_code_mapping[k]==country.default_language);
        let headContent = linkHeader.map((lin, index) => {
            return (
                <link key={index} rel={lin.rel} hreflang={lin.hreflang} href={url.ORIGIN_URL + lin.href + "guides"} />
            )
        })

        let guideWith = <div>
            { this.state.loading && <div className="loader"></div> }
            <Helmet>
                { headContent }
            </Helmet>
            <Sidenav active = "relationships" />
            <main className="main profile-main" id="main">
                <CommonProfileHeader active = "relationships" />
                <div id="profile-content" className="main_onclick_lefthide">
                    <div className="guides-container narrow">
                        <div className="guides-whw-header text-center">
                            {renderHTML(strings.GUIDE_WITH_TITLE)}
                            <form onSubmit={this.handleSubmit} id="guides-whw-form">
                                <input type="text" name="link" value={this.state.link} onChange={this.handleLink} placeholder={strings.GUIDE_WITH_ENTER_LINK_PLACEHOLDER} />
                                { this.state.isRefresh ? 
                                <button type="submit" className={!isEnabled ? "disabled" : ""} disabled={!isEnabled}>{strings.GUIDE_WITH_SUBMITBTN}</button>
                                :
                                <button type="submit" className="reset"><i className="fa fa-refresh" aria-hidden="true"></i></button>
                                }
                            </form>
                            { this.state.partnerLinkMessage.message && this.state.status===400 ? <p className="text-left invalid"><span>😬</span> {this.state.partnerLinkMessage.message}</p>: "" }
                            {(this.state.partner_picture_url && this.state.partner_name) &&
                            <ul key="gw-u-1" className="menu people text-left">
                                <li key="gw-u-1-l-1">
                                {
                                this.state.partnerLinkMessage.message ? 
                                    <div className="row">
                                        <div className="col-sm-5">
                                            <div className="d-flex align-items-center">
                                                <img src={this.state.partner_picture_url} alt="" />
                                                <span>{this.state.partner_name}</span>
                                            </div>
                                        </div>
                                        <div className="col-sm-7 text-sm-right">
                                            <p>{this.state.partnerLinkMessage.message}</p>
                                        </div>
                                    </div>
                                    :
                                    <div className="row">
                                        <div className="col-sm-7">
                                            <div className="d-flex align-items-center">
                                                <img src={this.state.partner_picture_url} alt="" />
                                                <span>{this.state.partner_name}</span>
                                            </div>
                                        </div>
                                        
                                        <div className="col-sm-5 text-sm-right">
                                            {this.state.is_privacy_consent?
                                                <Link to="#" className="btn btn-primary" onClick={this.handleGenerateReport}>{strings.GUIDE_WITH_CONFIRMBTN}</Link>
                                            :
                                                <Link to="javascript:void(0);" className="btn btn-primary" data-toggle="modal" data-target="#got_it_popup">{strings.GUIDE_WITH_CONFIRMBTN}</Link>
                                            }
                                        </div>
                                    </div>      
                                    }
                                </li>
                            </ul>
                            }
                        </div>
                        {this.props.is_cancelled == 1 && 
                            <div className="guides-whw-cancel">
                                {strings.GUIDE_WITH_ACCEIDENTAL_PERCHASE}  <Link to="#" onClick={()=>{this.openPopUP('modal-cancel-order', 'show')}}> {strings.GUIDE_WITH_REFUNDBTN}</Link>
                            </div>
                        }
                        <div className="guides-whw-text">
                            {localStorage.getItem("language_id")==default_language_id?renderHTML(strings.formatString(strings.GUIDE_WITH_PARTNER_LINK_DESC,guide_with_desc1_eng,guide_with_desc2_eng)):renderHTML(strings.formatString(strings.GUIDE_WITH_PARTNER_LINK_DESC,guide_with_desc1_spanish,guide_with_desc2_spanish))}
                        </div>
                        <div className="settings-modal modal fade " id="modal-cancel-order" role="dialog" aria-hidden="true" >
                            <div className="modal-dialog cancel-order-popup" role="document">
                                <div className="modal-content cancel-order-popup">
                                    <div className="modal-body">
                                        {renderHTML(strings.GUIDE_WITH_REFUNDPOPUP)}
                                    </div>
                                    <div className="modal-footer">
                                        <Link to="#" className="settings-btn-green" onClick={this.handleRefundPurchase}><strong>{strings.GUIDE_WITH_REFUNDPOPUPBTN_1}</strong></Link>
                                        <Link to="#" className="modal-btn-link"  onClick={()=>{this.openPopUP('modal-cancel-order', 'hide')}} >
                                        <strong>{strings.GUIDE_WITH_REFUNDPOPUPBTN_2}</strong>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="settings-modal modal fade" id="modal-refund-successful" role="dialog" onClick={this.hanldeGotIt}>
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-body">
                                        {renderHTML(strings.GUIDE_WITH_SUCCESSPOP)}
                                    </div>
                                    <div className="modal-footer">
                                        <Link to="#" className="settings-btn-green" data-dismiss="modal"><strong>{strings.GUIDE_WITH_SUCCESSPOPBTN}</strong></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
               <GuideWithGotit partner_name={this.state.partner_name?this.state.partner_name.split(" ")[0]:""} handleGenerateReport={this.handleGenerateReport} />
            </main>
        </div>
        if(isWindows) {
            return (
                <Twemoji options={{ className: 'emoji', folder: 'svg', ext: '.svg' }} >
                    {guideWith}
                </Twemoji>
            )
        } else {    
            return guideWith
        }
    }
}

export default GuideWith;
