import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import jQuery from 'jquery';
import $ from 'jquery';
import renderHTML from 'react-render-html';
import guide_profile_placeholder from '../Assets/images/guide/guide-profile-placeholder.png';
import compatibility_guide from '../Assets/images/illustrations/compatibility-guide.svg';
import couples_guide from '../Assets/images/illustrations/couples-guide.svg';
import url from '../CommonComponent/CommonURL';
import CommonProfileHeader from '../CommonComponent/CommonProfileHeader';
import Sidenav from '../CommonComponent/Sidenav';
import linkHeader from '../CommonComponent/Link';
import LocalizedStrings from 'react-localization';
import { language } from './Language';
import country from '../CommonComponent/Country';
import GuideSalesRomantic from './GuideSalesRomantic';
import GuideSalesCouples from '../Components/GuideSalesCouples';
import GuideWith from './GuideWith';
import RomanticCapability from './RomanticCapability';
import CouplesGuide from './CouplesGuide';
import GuideGotit from '../FunctionalComponent/GuideGotit';
import GuidesConsent from './GuidesConsent';

let strings = new LocalizedStrings(language);

class Guides extends Component {
    constructor() {
        super()
        this.state = {
            language_id: '',
            user_id: '',
            auth: '',
            loading: true,
            products: [],
            activePage: "guide",
            product_id:'',
            unselected_product_id: '',
            checkoutResponse:'',
            chargebeeResponse: '',
            is_cancelled: '',
            guidesResponse: '',
            guidesRedirect: '',
            user_partner_id: '',
            is_guide: '',
            couplesActive: '',
            paymentFailedResponse: '',
            updateConsentResponse: '',
            chargebeeSuccessFlag:false,/* just to check whether the transation is happened or not*/
            chargebeeCloseFlag:false,
            guides_report: [],
            select_partner_name:"",
            update_user_privacy_consent: 1
        }
    }

    openModal =  () => {
        this.setState({isOpen: true})
    }

    setGuideActive =()=>{
        this.setState({
            activePage: 'guide'
        });
        this.doApiCall("/getproducts", "GET", "products");
    }

    redirectToGuideWithPage=()=>{
        this.setState({
            activePage: 'guidewith',
            unselected_product_id: this.state.chargebeeResponse.user_product_id, 
            is_cancelled: this.state.chargebeeResponse.is_cancelled,
            is_guide: this.state.product_id
        });
    }
    
    doApiCall = (apiPath, methodType, stateName, apiParam=null, callback=null, is_chocout_popup=null, apibody)=>{
        if(this.state.auth) {
            let apiHeaders = {};
            if(apiParam != null){
                apiHeaders = apiParam;
            }
            let apiBody;
            if(apibody != null){
                apiBody = JSON.stringify(apibody);
            }
            apiHeaders['Content-Type']= 'application/json';
            apiHeaders['Access-Control-Allow-Origin']= '*';
            apiHeaders['Access-Control-Allow-Credentials']= true;
            apiHeaders['x-api-key']=url.X_API_KEY;
            apiHeaders['Authorization']= this.state.auth;
            
            fetch(`${url.BASE_URL}`+apiPath, {
                method: methodType,
                headers: apiHeaders,
                body: apiBody
            }).then(response => response.json().then(data => ({ status: response.status, body: data })))
            .then(data => {
                this.setState({loading: false})
                if(data.status === 200) {
                    if(stateName=="products"){
                        this.setState({
                            update_user_privacy_consent:data.body.user_privacy_consent
                        })
                    }
                    this.setState({
                        [stateName]: data.body
                    },()=>{
                        if(callback != null){
                            callback(data.body)
                        }
                    })
                } else if(data.status === 400) {
                    if(is_chocout_popup === "is_checkout_popup") {
                        $('#modal-payment-failed').modal('toggle')
                    }
                }
                else {
                    this.props.commanHandler("error500");
                }
            })
        } else {
            this.props.commanHandler("redirectToHome");
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        window.onpopstate = this.onBackButtonEvent;
        let test_status = localStorage.getItem("test_status");
        let browser_url = window.location.href;
        let user_partner_id = browser_url.split(country.guides)[1] ? browser_url.split(country.guides)[1].split("?")[0] : "";
        
        if(test_status === "not_completed") {
            window.location.replace(`${url.ORIGIN_URL}/test`)
        } else {
            let language_id = localStorage.getItem("language_id"),
            user_id = localStorage.getItem("user_id"),
            auth = localStorage.getItem("auth");

            this.setState({
                language_id: language_id,
                user_id: user_id,
                auth:auth
            },()=>{
                if(user_partner_id) {
                    this.handleGuidesPageRedirection(user_partner_id, 2)
                }else {
                    this.doApiCall("/getproducts", "GET", "products");
                }
            })
        }    
        
        if(this.props.redirectGuides != null) {
            if(this.props.redirectGuides === "redirectRomanticCapabilitySalesPage") {
                this.handleProductId("1")
            }else if(this.props.redirectGuides === "redirectForCouplesSalesPage") {
                this.handleProductId("2")
            }
        }
    }

    // click on browser back button and back to guide page
    onBackButtonEvent = (event) =>{
        event.preventDefault();
        $(document).ready(function () {
            jQuery('body').removeClass("page-profile sales-compatibility");
            jQuery('body').removeClass("page-profile page-guides sales-couples")
            jQuery("body").addClass("page-guides gray-background");
        });
        if(this.state.activePage ==='guideSale' && this.state.product_id ==='1') {
            this.handleBack("romanticCapabilityBack");
        } else if(this.state.activePage ==='guideSale' && this.state.product_id ==='2') {
            this.handleBack("couplesBack");
        }
        if(this.state.activePage === "romaticcapability" || this.state.activePage === "forcouples" || this.state.activePage==="guidewith"){
            window.location.replace('/guides')
        }
    }

    componentDidUpdate() {

        $('#dropdown-notifications, #dropdown-settings').on('show.bs.dropdown', function(e) {
            if($('.dropdown-backdrop').hasClass('show') === false){
                let str = '<div class="dropdown-backdrop fade"></div>';
                $(str).appendTo('body');
                $('div.dropdown-backdrop').addClass('show');
            }
        });

        $('#dropdown-notifications, #dropdown-settings').on('hide.bs.dropdown', function(e) {
            $('div.dropdown-backdrop').removeClass('show').remove();
        });

        if(this.state.activePage === 'guide' || this.state.activePage === 'guidewith'){
            jQuery("body").addClass("page-guides gray-background");

        } else if(this.state.activePage === 'guideSale'){
            jQuery('body').removeClass('page-guides gray-background');
            if(this.state.product_id == "1") {
                jQuery('body').addClass("page-profile sales-compatibility")
            } else if(this.state.product_id == "2") {
                jQuery('body').addClass("page-profile page-guides sales-couples")
            }
        } 
        
        
        
        $(document).ready(function () {
            
            function header_sticky() {
                if( !$('body').hasClass('sales-couples') && !$('body').hasClass('sales-compatibility') ) {
                    $('#profile-header').sticky({
                        topSpacing: 0,
                        zIndex: 1050
                    });
                }

                $('.test-header.sticky').sticky({
                    topSpacing: 0,
                    zIndex: 1050
                });

                if( $('body').hasClass('template-homepage') ) {
                    $('#site-header').hide();
                } else {
                    $('#site-header').sticky({
                        topSpacing: 0,
                        zIndex: 1050
                    });
                }

                function scrollDetection() {
                    var scrollPosition = 0;

                    $(window).scroll(function () {
                        var header_height = $('#profile-header').outerHeight();

                        if (!header_height && $('.test-header.sticky').length) {
                            header_height = $('.test-header.sticky').outerHeight();
                        } else if (!header_height && $('#site-header').length) {
                            header_height = $('#site-header').outerHeight();
                        }

                        var cursorPosition = $(this).scrollTop();

                        if (cursorPosition > header_height) {
                            if (cursorPosition > scrollPosition) {
                                $('body').removeClass('scroll-up').addClass('scroll-down');
                            } else if (cursorPosition < scrollPosition) {
                                $('body').removeClass('scroll-down').addClass('scroll-up');
                            }
                        } else {
                            $('body').removeClass('scroll-up scroll-down');
                        }
                        if( $('body').hasClass('template-homepage') ) {
                            if( cursorPosition > 400 ) {
                                $('#site-header').show().sticky({
                                    topSpacing: 0,
                                    zIndex: 1050
                                });
                            } else {
                                $('#site-header').unstick().hide();
                            }
                        }
                        scrollPosition = cursorPosition;
                    });
                }

                scrollDetection();
            }

            header_sticky();
        });
    }
    makePaymentHandling = (resp)=>{

        if(this.state.chargebeeCloseFlag){
            this.redirectToGuideWithPage();
        }
    }

    handleCharbeeResponse = (response) => {

        let _this = this;

        if(response.hosted_page) {
            window.Chargebee.init({
                site: response.site,
                iframeOnly:"true"
            })
            
            let hosted_page = response.hosted_page
            let product_id = this.state.product_id
            let user_partner_id = this.state.user_partner_id
            const hosted_page_id = response.hosted_page.id

            var hostedPageId = hosted_page_id
            var cbInstance = window.Chargebee.getInstance();

            cbInstance.openCheckout({
                hostedPage: function() {
                    return new Promise(function(resolve, reject){
                        resolve(hosted_page);
                    });
                },
                success: function(hostedPageId) {
                    
                    _this.setState({chargebeeSuccessFlag:true});
                    let apiParams = {
                        "product_id": product_id,
                        "user_partner_id": user_partner_id
                    };
                    _this.doApiCall("/makeproductpayment", "POST", "chargebeeResponse", apiParams,_this.makePaymentHandling);
                },
                close: function() {
                    _this.setState({chargebeeCloseFlag:true,loading:true});
                    if(_this.state.chargebeeResponse != '' ){
                         _this.redirectToGuideWithPage();  
                    }
                    if(_this.state.chargebeeSuccessFlag === false && _this.state.chargebeeResponse === '' )
                        _this.setState({loading:false});

                    if(_this.state.chargebeeSuccessFlag!=true){
                        _this.setState({activePage:'guideSale',product_id:product_id+''});
                    }
                    if( _this.state.chargebeeResponse == '' )
                        _this.setState({loading:false});
                }
            })  
        } else {
            this.setState({
                activePage: 'guidewith',
                unselected_product_id: response.user_product_id, 
                is_cancelled: response.is_cancelled,
                is_guide: this.state.product_id
            })
        }    
    }

    setLoading = () => {
        this.setState({loading: false});
    }

    handleGetCheckout = (product_id) => {
        this.setState({product_id: product_id, loading: true})
        let apiParams = {
            "product_id": product_id
        };
        this.doApiCall("/getcheckoutpage", "PUT", "checkoutResponse", apiParams, this.handleCharbeeResponse, "is_checkout_popup");
    }

    handleProductId = (product_id) => {
        //  added loading true for salepage content API Loading
        
        this.setState({ activePage:"guideSale", product_id: product_id, loading:true});
    }

    handleBack = (back) => {
        if(back === "guideWithPaymentSuccessBack"){
            this.doApiCall("/getproducts", "GET", "products");
            back = 'guide';
        }else if(back === "couplesBack") {
            this.doApiCall("/getproducts", "GET", "products");
            this.setState({
                couplesActive: Object.keys(url.COUPLES_GUIDE_LEFT_NAV)[0]
            })
            back = 'guide'
        } else if(back === "romanticCapabilityBack") {
            this.doApiCall("/getproducts", "GET", "products");
            this.setState({
                couplesActive: Object.keys(url.COUPLES_GUIDE_LEFT_NAV)[0]
            })
            back = 'guide'
        }
        this.setState({activePage: back})
    }

    handleGuideWith = (unselected_product_id, is_cancelled, key) => {
        this.setState({ activePage:"guidewith", unselected_product_id: unselected_product_id, is_cancelled: is_cancelled, is_guide: key});
    }
    
    handleSalesGetCheckout = (product_id) => {
        // function called from sales page as a props
        this.setState({loading: true, product_id: product_id})
        let apiParams = {
            "product_id": product_id,
            "user_partner_id": this.state.user_partner_id
        };
        this.doApiCall("/getcheckoutpage", "PUT", "checkoutResponse", apiParams, this.handleCharbeeResponse, "is_checkout_popup");
    }

    handleGuidesRedirect = (response) => {
        let section = [];
        let guides_report = response.guides_report;
        guides_report.map((key,val)=>{
          if(section[key.section] === undefined ) {
              section[key.section]=[];
              section[key.section].push( key)
          }else{
            let currentIndex = section[key.section].length;
              section[key.section][currentIndex]=key;
          }
        })

        if(this.state.guidesRedirect == 1) {
            this.setState({
                activePage:"romaticcapability",
                guides_report: section,
                loading: true
            })
        } else {
            this.setState({
                activePage:"forcouples",
                guides_report: section,
                loading: true
            })
        }
    }

    handleGuidesPageRedirection = (user_partner_id, key) => {
        this.setState({
            guidesRedirect: key,
            loading: true
        })
        let apiParams = {
            "user_partner_id": user_partner_id
        };
        this.doApiCall("/getuserpartnerreport", "GET", "guidesResponse", apiParams, this.handleGuidesRedirect);
    }

    // function used to update guidesResponse state data when got successful message from goi it api
    // this been passed in couple coaching page as a props
    updateGuideResponse = () => {
        let response = this.state.guidesResponse;
        response.is_got_it = 1;
        this.setState({guidesResponse:response});
    }

    handlePaymentFailedResponse = (response) => {

        let _this = this;

        window.Chargebee.init({
            site: response.site,
            iframeOnly:"true"
        })
        let hosted_page = response.hosted_page
        let cbInstance = window.Chargebee.getInstance();
        cbInstance.openCheckout({
            hostedPage: function() {
                return new Promise(function(resolve, reject){
                    resolve(hosted_page);
                });
            },
            close: function() {
                _this.setState({activePage: "guide"})
            }
        })
    }

    handlePaymentFailed = () => {
        this.setState({loading: true})
        this.doApiCall("/getsettingsbilling", "POST", "paymentFailedResponse", null, this.handlePaymentFailedResponse);
    }

    handleUpdateConsentResponse = (response) => {
        window.scrollTo(0, 0)
        if(response.message) {
            this.setState({
                update_user_privacy_consent: 1
            })
            this.doApiCall("/getproducts", "GET", "products");
        }else {
            this.props.commanHandler("error500");
        }
    }

    updateConsent = (consentValue) => {
        this.setState({loading: true})
        let data = {
            is_customized: null,
            is_email: null,
            is_ads: null,
            is_privacy_consent: consentValue

        }
        this.doApiCall("/updateconsent", "PUT", "updateConsentResponse", null, this.handleUpdateConsentResponse,null, data);
    }

    setSelectPartnerName = (name) =>{
        this.setState({
            select_partner_name:name
        })
    }

    openPopUP = (eleId, action,name="") =>{
        this.setState({
            select_partner_name:name
        })
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

    render() {

        strings.setLanguage(this.state.language_id);

        let headContent = linkHeader.map((lin, index) => {
            return (
                <link key={index} rel={lin.rel} hreflang={lin.hreflang} href={url.ORIGIN_URL + lin.href + "guides"} />
            )
        })

        let productsData = this.state.products.products_list ? this.state.products.products_list : "" ;
        let purchansed =  Object.keys(productsData).map((key, val)=> productsData[key].user_purchases)
        
        if(this.state.update_user_privacy_consent !== null && this.state.update_user_privacy_consent == 0) {
            localStorage.setItem("profile", Object.keys(url.PROFILE_LEFT_NAV)[1])
        }
        return (
            <reactFragment>   
            <div>
                <div className="settings-modal modal fade" id="modal-payment-failed" role="dialog" onClick={this.handlePaymentFailed}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                {renderHTML(strings.GUIDE_HOME_PAYMENT_FAILD_POPUP)}
                            </div>
                            <div className="modal-footer">
                                <Link to="#" className="settings-btn-green" data-dismiss="modal"><strong>{strings.GUIDE_HOME_OKBTN}</strong></Link>
                            </div>
                        </div>
                    </div>
                </div>  
            { this.state.loading && <div className="loader"></div> }     
            {this.state.activePage === "guide" ?
            <div>
                <Helmet>
                    { headContent }
                </Helmet>
                <Sidenav active = "relationships" />
                <main className="main profile-main" id="main">
                    <CommonProfileHeader active = "relationships" {...this.props}/>
                    { this.state.update_user_privacy_consent !== null && this.state.update_user_privacy_consent == 0 ? 
                    <GuidesConsent updateConsent = {this.updateConsent} />
                    : 
                    <div id="profile-content" className="main_onclick_lefthide">
                        <div className={(purchansed[0] && purchansed[0].length) > 0 || (purchansed[1] && purchansed[1].length) >  0 ? "guides-container" : "guides-container no-purchased" }>
                            <div className="guides-section-welcome text-center">
                                {renderHTML(strings.GUIDE_HOME_TITLE)}
                            </div>
                            {(productsData && Object.keys(productsData).length > 0 ) ? 
                                Object.keys(productsData).map((key, val)=>{
                                    let purchases = productsData[key].user_purchases;
                                    return (
                                        <div className={(purchases.length === 0 ) ? "guide-item link" : "guide-item"} key={key} onClick={()=> (purchases.length === 0 )? this.handleProductId(key) : false  } >
                                            <div className="guide-item-content" key={key} > 
                                            {(purchases.length === 0) && <Link to="#" className="guide-item-link"></Link>}
                                                { (key== 1) ? 
                                                    <>
                                                        <img src={compatibility_guide} alt="" width="130" height="101" />    
                                                        {renderHTML(strings.formatString(strings.GUIDE_HOME_ROMENTIC_TITLE, productsData[key].currency_symbol,productsData[key].amount))}
                                                        {renderHTML(strings.GUIDE_HOME_ROMANTIC_DESC)}
                                                    </>
                                                    :
                                                    <>
                                                        <img src={couples_guide} alt="" width="110" height="103" />
                                                        {renderHTML(strings.formatString(strings.GUIDE_HOME_COUPLE_TITLE, productsData[key].currency_symbol,productsData[key].amount))}
                                                        {renderHTML(strings.GUIDE_HOME_COUPLE_DESC)}
                                                    </>
                                                }
                                                {(purchases.length === 0 )?
                                                    <Link to="#" className="btn-link"><span>{strings.GUIDE_HOME_LEARN_BTN}</span></Link>
                                                :
                                                    <Link to="#" className="btn-link"><span onClick={()=>{this.handleProductId(key)}}>{strings.GUIDE_HOME_LEARN_BTN}</span></Link>
                                                }
                                                { (purchases.length >0)?
                                                    <Link to="#" className="btn btn-primary d-md-none" onClick={()=>this.handleGetCheckout(key)}>{strings.GUIDE_HOME_BUYBTN}</Link>
                                                :
                                                ''
                                                }
                                            </div>
                                            { (purchases.length >0 )
                                            ?
                                            <div className="guide-item-meta d-flex align-items-center justify-content-between">
                                                <ul key="g-u-1" className="menu people">
                                                    { purchases.length > 0 && purchases.map((selectPurchase, val)=>{
                                                        if(selectPurchase.user_partner_id != null){
                                                            return (
                                                                <li key={selectPurchase.user_partner_id}>
                                                                    {selectPurchase.partner_privacy_consent?
                                                                       <Link to="#">
                                                                            <img src={ selectPurchase.picture_url ? selectPurchase.picture_url : guide_profile_placeholder } alt="" onClick={()=>(this.handleGuidesPageRedirection(selectPurchase.user_partner_id, key))} />
                                                                            <span>{ selectPurchase.name }</span>
                                                                        </Link>
                                                                    :
                                                                        <Link to="#" data-toggle="modal"
                                                                        onClick={()=>{this.openPopUP('got_it_popup', 'show',selectPurchase.name)}} data-target="#got_it_popup">
                                                                            <img src={ selectPurchase.picture_url ? selectPurchase.picture_url : guide_profile_placeholder } alt="" />
                                                                            <span>{ selectPurchase.name }</span>    
                                                                        </Link>
                                                                    }
                                                                   
                                                                </li>
                                                            )
                                                        }else{
                                                            return (
                                                                <li key={selectPurchase.user_product_id}>
                                                                    <Link to="#" className="select" onClick={()=>this.handleGuideWith(selectPurchase.user_product_id, selectPurchase.is_cancelled, key)}>
                                                                        <span className="select-dots">
                                                                            <i></i>
                                                                            <i></i>
                                                                            <i></i>
                                                                        </span>
                                                                        <span>{strings.GUIDE_HOME_SELECTBTN}</span>
                                                                    </Link>
                                                                </li>
                                                            ) 
                                                        }
                                                        
                                                    })}

                                                    <li>
                                                        {/* add button  */}
                                                        <Link to="#" className="add" onClick={()=>this.handleGetCheckout(key)}>{strings.GUIDE_HOME_ADDBTN}</Link>
                                                    </li>
                                                </ul>
                                                {/* buy button */}
                                                <Link to="#" className="btn btn-primary d-none d-md-block" onClick={()=>this.handleGetCheckout(key)}>{strings.GUIDE_HOME_BUYBTN}</Link>
                                            </div>
                                            :''
                                            }
                                        </div>
                                    )
                                })
                                :
                                ""
                            }
                        </div>
                    </div>
                    }
                </main>
            </div>
            :
            (this.state.activePage ==='guideSale' && this.state.product_id ==='1')
            ?
            <GuideSalesRomantic product_id={this.state.product_id} loading={this.state.loading} handleBack = {this.handleBack} handleSalesGetCheckout={this.handleSalesGetCheckout} setLoading={this.setLoading } handleProductId={this.handleProductId}  {...this.props}/> 
            :
            (this.state.activePage ==='guideSale' && this.state.product_id ==='2')
            ?
            <GuideSalesCouples product_id={this.state.product_id} loading={this.state.loading} handleBack = {this.handleBack} handleSalesGetCheckout={this.handleSalesGetCheckout} setLoading={this.setLoading}  {...this.props}/> 
            :
            (this.state.activePage ==='guidewith')
            ?
            <GuideWith setGuideActive={this.setGuideActive} unselected_product_id={this.state.unselected_product_id} loading={false} is_cancelled = {this.state.is_cancelled} handleBack = {this.handleBack} is_guide = {this.state.is_guide} handleGuidesPageRedirection = {this.handleGuidesPageRedirection} setLoading={this.setLoading}   {...this.props}/> 
            :
            (this.state.activePage ==='romaticcapability')
            ?
            <RomanticCapability guides_report = {this.state.guides_report} is_coaching={this.state.guidesResponse.is_coaching} is_got_it={this.state.guidesResponse.is_got_it} partner_firstname={this.state.guidesResponse.partner_firstname} partner_picture_url={this.state.guidesResponse.partner_picture_url} picture_url={this.state.guidesResponse.picture_url} product_id={this.state.guidesResponse.product_id} user_partner_id={this.state.guidesResponse.user_partner_id} handleBackButton = {this.handleBack} setLoading={this.setLoading}  {...this.props}/> 
            :
            (this.state.activePage ==='forcouples')
            ?
            <CouplesGuide guides_report = {this.state.guides_report} is_coaching={this.state.guidesResponse.is_coaching} is_got_it={this.state.guidesResponse.is_got_it} partner_firstname={this.state.guidesResponse.partner_firstname} partner_picture_url={this.state.guidesResponse.partner_picture_url} picture_url={this.state.guidesResponse.picture_url} product_id={this.state.guidesResponse.product_id} user_partner_id={this.state.guidesResponse.user_partner_id} couplesActive = {this.state.couplesActive} primary_email = {this.state.guidesResponse.primary_email} user_name = {this.state.guidesResponse.user_name} handleBackButton = {this.handleBack} setLoading={this.setLoading} updateGuideResponse = {this.updateGuideResponse}  {...this.props}/>
            :''
            } 
            <GuideGotit partner_name={this.state.select_partner_name?this.state.select_partner_name.split(" ")[0]:""} openPopUP={this.openPopUP} />
            </div>  
            </reactFragment>
        )
    }
}

export default Guides;