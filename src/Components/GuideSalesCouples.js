import React, { Component } from 'react';
import couples_guide from '../Assets/images/v2/couples-guide.svg';
import { Helmet } from 'react-helmet';
import LocalizedStrings from 'react-localization';
import { language } from './Language';
import url from '../CommonComponent/CommonURL';
import linkHeader from '../CommonComponent/Link';
import CommonProfileHeader from '../CommonComponent/CommonProfileHeader';
import Sidenav from '../CommonComponent/Sidenav';
import renderHTML from 'react-render-html';
import Twemoji from 'react-twemoji';
import {isWindows} from 'react-device-detect';
import '../Assets/css/style_manual.css'

let strings = new LocalizedStrings(language);

class GuideSalesCouples extends Component {
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

        let guideSalesCouples=
            <div>
                { this.state.loading && <div className="loader"></div> }
                <Helmet>
                    { headContent }
                </Helmet>
                <Sidenav active = "relationships" />
                <main className="main profile-main" id="main">
                    <CommonProfileHeader active = "relationships" />
                    <div id="profile-content" className="main_onclick_lefthide">
                <section id="sap-header">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3">
                                <img src={couples_guide} width="135" height="127" />
                            </div>
                            <div className="col-md-9">
                                {renderHTML(strings.GUIDES_COUPLE_SALES_TOP_HEAD_DESC)}
                            </div>
                        </div>
                    </div>
                </section>

                <div className="container sap-container sap-content" style={{paddingBottom: '75px'}}>
                    {renderHTML(strings.GUIDES_COUPLE_SALES_TOP_DESC)}

                    <div className="heading-fancy-2 text-center">
                        {renderHTML(strings.GUIDES_COUPLE_SALES_THE_REALITY)}
                    </div>
                    {renderHTML(strings.formatString(strings.GUIDES_COUPLE_SALES_THE_REALITY_DESC,String.fromCodePoint("0x1F62A")))}

                    <div className="sap-block-disclaimer">
                        {renderHTML(strings.GUIDES_COUPLE_SALES_DISCLAIMER)}
                    </div>

                    {renderHTML(strings.formatString(strings.GUIDES_COUPLE_SALES_LEARN,String.fromCodePoint("0x1F9EC")))}

                    <div className="sap-block-testimonial">
                        <div className="text">
                            <p className = "textcouple">{strings.GUIDES_COUPLE_SALES_LOVE_QUOTES}</p>
                        </div>
                    </div>

                    {renderHTML(strings.formatString(strings.GUIDES_COUPLE_SALES_RELATIONSHIP,String.fromCodePoint("0x1F914")))}

                    {renderHTML(strings.formatString(strings.GUIDES_COUPLE_SALES_YOURSELF,String.fromCodePoint("0x1F631")))}

                    {renderHTML(strings.formatString(strings.GUIDES_COUPLE_SALES_CHANGE,String.fromCodePoint("0x1F6AB")))}

                    <div className="sap-block-notice">
                        {renderHTML(strings.GUIDES_COUPLE_SALES_MOSTS)}
                    </div>

                    {renderHTML(strings.GUIDES_COUPLE_SALES_NEVER_TRY)}
                    
                </div>

                <section className="sap-features sap-content">
                    <div className="container sap-features-list ">
                        <div className="heading text-center">
                            {renderHTML(strings.formatString(strings.GUIDES_COUPLE_SALES_YOU_WILL_GET,String.fromCodePoint("0x2B50")))}
                        </div>
                        {renderHTML(strings.formatString(strings.GUIDES_COUPLE_SALES_YOU_WILL_GET_DESC,this.state.currency_code, this.state.currency_symbol, this.state.amount))}
                        <div className="sap-button-buy text-center">
                            <a href="#" onClick={()=>{this.props.handleSalesGetCheckout(this.state.product_id)}} className="button-buy guide_sales_btn">{renderHTML(strings.formatString(strings.GUIDES_COUPLE_SALES_GET_GUIDE_BTN,this.state.currency_code, this.state.currency_symbol,this.state.amount))}</a>
                            <p className="note">{strings.GUIDES_COUPLE_SALES_GET_GUIDE_BTN_DESC}</p>
                        </div>
                    </div>

                    <div className="container sap-container sap-features-note text-center">
                        {renderHTML(strings.formatString(strings.GUIDES_COUPLE_SALES_DONT_DECIDE,String.fromCodePoint("0x1F381")))}
                    
                        <div className="sap-block-testimonial">
                            <div className="text">
                                <p className = "textcouple">{strings.GUIDES_COUPLE_SALES_QUOTES}</p>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="container sap-container sap-content sap-findout">
                    {renderHTML(strings.GUIDES_COUPLE_SALES_FIND_OUT)}
                    <div className="sap-button-buy text-center">
                        <a href="#" onClick={()=>{this.props.handleSalesGetCheckout(this.state.product_id)}} className="button-buy guide_sales_btn">{renderHTML(strings.formatString(strings.GUIDES_COUPLE_SALES_GET_GUIDE_BTN,this.state.currency_code, this.state.currency_symbol,this.state.amount))}</a>
                        <div className="note">
                            {renderHTML(strings.GUIDES_COUPLE_SALES_GET_GUIDE_BTN_DESC1)}
                        </div>
                    </div>
                </div>

                <section className="sap-faqs">
                    <div className="container sap-container sap-content">
                        {renderHTML(strings.formatString(strings.GUIDES_COUPLE_SALES_FAQ,String.fromCodePoint("0x1F50D")))}
                        <div className="sap-button-buy text-center">
                            <a href="#" onClick={()=>{this.props.handleSalesGetCheckout(this.state.product_id)}} className="button-buy guide_sales_btn">{renderHTML(strings.formatString(strings.GUIDES_COUPLE_SALES_GET_GUIDE_BTN,this.state.currency_code, this.state.currency_symbol,this.state.amount))}</a>
                            <div className="note">
                                {renderHTML(strings.GUIDES_COUPLE_SALES_GET_GUIDE_BTN_DESC1)}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
                </main>
            </div>
        if(isWindows) {
            return (
                <Twemoji options={{ className: 'emoji', folder: 'svg', ext: '.svg' }} >
                    {guideSalesCouples}
                </Twemoji>
            )
        } else {    
            return guideSalesCouples;
        }   
    }
}

export default GuideSalesCouples;
