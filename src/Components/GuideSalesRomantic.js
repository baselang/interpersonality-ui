import React, { Component } from 'react';
import logo from '../Assets/images/logo.svg';
import compatibility_guide from '../Assets/images/v2/compatibility-guide.svg';
import { Helmet } from 'react-helmet';
import LocalizedStrings from 'react-localization';
import { language } from './Language';
import url from '../CommonComponent/CommonURL';
import linkHeader from '../CommonComponent/Link';
import CommonProfileHeader from '../CommonComponent/CommonProfileHeader';
import renderHTML from 'react-render-html';
import Sidenav from '../CommonComponent/Sidenav';
import $ from 'jquery';
import Twemoji from 'react-twemoji';
import {isWindows} from 'react-device-detect';
import { Link } from 'react-router-dom';

let strings = new LocalizedStrings(language);

class GuideSalesRomantic extends Component {
    constructor() {
        super();
        this.state = {
            language_id: '',
            loading: false,
            amount: '',
            currency_symbol: '',
            currency_code: '',
            description: '',
            product_id: '',
            title: ''
        }
    }

    componentDidMount() {
        
        let language_id = localStorage.getItem("language_id");
        let auth = localStorage.getItem("auth");
        
        this.setState({
            language_id: language_id,
            loading: this.props.loading
        })

        if(auth) {
            fetch(`${url.BASE_URL}/productsalesdetails`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                    "x-api-key": url.X_API_KEY,
                    "Authorization": auth,
                    "product_id": this.props.product_id
                },
            }).then(response => response.json().then(data => ({ status: response.status, body: data })))
            .then(data => {
                    this.props.setLoading()
                if(data.status === 200) {
                    this.setState({
                        amount: data.body.amount,
                        currency_symbol: data.body.currency_symbol,
                        currency_code: data.body.currency_code,
                        description: data.body.description,
                        product_id: data.body.product_id,
                        title: data.body.title
                    })
                }
                else {
                    this.props.commanHandler("error500");
                }
            })
        }else{
            this.props.commanHandler("error500");
        }
       
        
    }

    componentDidUpdate(){
        let _this=this;
        $('#coupleGuidNavigation').click(function(){
            _this.props.handleProductId("2");
        });
    }
    

    componentWillReceiveProps(prevProp, nextProp){
        // used when sale page fuction is call from guide page -- basically API calling
       if(this.state.loading != prevProp.loading){
           this.setState({loading:prevProp.loading})
       }
    }

    

    render() {
        strings.setLanguage(this.state.language_id);
        let headContent = linkHeader.map((lin, index) => {
            return (
                <link key={index} rel={lin.rel} hreflang={lin.hreflang} href={url.ORIGIN_URL + lin.href + "guides"} />
            )
        })

        let guideSalesRomantic=
            <div>
                { this.state.loading && <div className="loader"></div> }
                <Helmet>
                    { headContent }
                </Helmet>
                <Sidenav active = "relationships" />
                <main className="main profile-main" id="main">
                    <CommonProfileHeader active = "relationships" {...this.props}/>
                    <div id="profile-content" className="main_onclick_lefthide">
                    <section id="sap-header">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-3">
                                    <img src={compatibility_guide} width="190" height="148" />
                                </div>
                                <div className="col-md-9">
                                    {renderHTML(strings.GUIDES_ROMANTIC_SALES_TOP_HEAD_DESC)}
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="container sap-container sap-content">
                        {renderHTML(strings.formatString(strings.GUIDES_ROMANTIC_SALES_IMAGIN,String.fromCodePoint("0x1F52E")))}
                        <div className="sap-block-testimonial">
                            {renderHTML(strings.GUIDES_ROMANTIC_SALES_IWISH)}
                        </div>
                        <div className="sap-block-highlight">
                            {renderHTML(strings.formatString(strings.GUIDES_ROMANTIC_SALES_TELLYOU,String.fromCodePoint("0x274C")))}
                        </div>
                        {renderHTML(strings.formatString(strings.GUIDES_ROMANTIC_SALES_EVER,String.fromCodePoint("0x1F62A"),String.fromCodePoint("0x1F449")))}

                        <div className="sap-block-textcenter text-center">
                            {renderHTML(strings.GUIDES_ROMANTIC_SALES_DOESNT_NEED)}
                        </div>

                        {renderHTML(strings.formatString(strings.GUIDES_ROMANTIC_SALES_BEING_COMPATIBLE,String.fromCodePoint("0x1F511")))}
                        
                        {renderHTML(strings.formatString(strings.GUIDES_ROMANTIC_SALES_HOW_DO_I,String.fromCodePoint("0x1F914")))}
                    </div>

                    <section className="sap-features sap-content">
                        <div className="container sap-features-list ">
                            <div className="heading text-center">
                                {renderHTML(strings.formatString(strings.GUIDES_ROMANTIC_SALES_WHAT_YOU_GET,String.fromCodePoint("0x2B50")))}
                            </div>
                            {renderHTML(strings.GUIDES_ROMANTIC_SALES_WHAT_YOU_GET_DESC1)}
                            {renderHTML(strings.GUIDES_ROMANTIC_SALES_WHAT_YOU_GET_DESC2)}
                            <div className="divide">
                                <img src={logo} alt="logo" />
                            </div>
                            <div className="bottom-text">
                                {renderHTML(strings.formatString(strings.GUIDES_ROMANTIC_SALES_WHAT_YOU_GET_DESC3,this.state.currency_code, this.state.currency_symbol,this.state.amount))}
                            </div>
                            <div className="sap-button-buy text-center">
                                <a href="#" onClick={()=>{this.props.handleSalesGetCheckout(this.state.product_id)}} className="button-buy">{renderHTML(strings.formatString(strings.GUIDES_ROMANTIC_SALES_GET_GUIDE_BTN,this.state.currency_code, this.state.currency_symbol,this.state.amount))}</a>
                                <p className="note">{strings.GUIDES_ROMANTIC_SALES_GET_GUIDE_BTN_DESC}</p>
                            </div>
                        </div>

                        <div className="container sap-container sap-features-note text-center">
                            {renderHTML(strings.formatString(strings.GUIDES_ROMANTIC_SALES_DONT_DECIDE,String.fromCodePoint("0x1F381")))}
                        </div>
                    </section>

                    <div className="container sap-container sap-content sap-findout">
                        {renderHTML(strings.GUIDES_ROMANTIC_SALES_FIND_OUT)}
                        <div className="sap-button-buy text-center">
                            <a href="#" onClick={()=>{this.props.handleSalesGetCheckout(this.state.product_id)}} className="button-buy">{renderHTML(strings.formatString(strings.GUIDES_ROMANTIC_SALES_GET_GUIDE_BTN,this.state.currency_code, this.state.currency_symbol,this.state.amount))}</a>
                            <p className="note">{strings.GUIDES_ROMANTIC_SALES_GET_GUIDE_BTN_DESC}</p>					
                        </div>
                    </div>

                    <section className="sap-faqs">
                        <div className="container sap-container sap-content">
                            {renderHTML(strings.formatString(strings.GUIDES_ROMANTIC_SALES_FAQ,String.fromCodePoint("0x1F50D")))}
                            <div className="sap-button-buy text-center">
                                <Link to="#" onClick={()=>{this.props.handleSalesGetCheckout(this.state.product_id)}} className="button-buy">{renderHTML(strings.formatString(strings.GUIDES_ROMANTIC_SALES_GET_GUIDE_BTN,this.state.currency_code, this.state.currency_symbol,this.state.amount))}</Link>
                                <p className="note">{strings.GUIDES_ROMANTIC_SALES_GET_GUIDE_BTN_DESC}</p>
                            </div>
                        </div>
                    </section>
                </div>
                </main>
            </div>
        if(isWindows) {
            return (
                <Twemoji options={{ className: 'emoji', folder: 'svg', ext: '.svg' }} >
                    {guideSalesRomantic}
                </Twemoji>
            )
        } else {    
            return guideSalesRomantic;
        }
    }
}

export default GuideSalesRomantic;
