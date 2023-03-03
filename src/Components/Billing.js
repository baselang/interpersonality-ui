import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import url from '../CommonComponent/CommonURL';

import LocalizedStrings from 'react-localization';
import { language } from './Language';
import linkHeader from '../CommonComponent/Link';
import renderHTML from 'react-render-html';
import $ from 'jquery';

let strings = new LocalizedStrings(language);

class Billing extends Component {
    constructor() {
        super();
        this.state = {
            access_url: '',
            language_id: '',
            billing_history: [],
            auth: '',
            loading: true
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)

        let auth = localStorage.getItem("auth")
        let language_id = localStorage.getItem("language_id")

        this.setState({
            auth: auth,
            language_id: language_id
        })

        if(auth){
        fetch(`${url.BASE_URL}/getsettingsbilling`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
                "x-api-key": url.X_API_KEY,
                "Authorization": auth
            },
        }).then(response => response.json().then(data => ({ status: response.status, body: data })))
        .then(data => {
            this.setState({loading: false})
            if(data.status === 200) {
                localStorage.setItem("Settings", "Billing");
                this.setState({
                    billing_history: data.body.billing_history,
                    access_url: data.body.hosted_page.url
                })
            }
            else {
                this.props.commanHandler("error500");
            }
        })}else{
            this.props.commanHandler("redirectToHome");
        }
    }

    handleInvoice = (invoice_id, status) => {
        if(this.state.auth){
        fetch(`${url.BASE_URL}/getinvoiceurl`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
                "x-api-key": url.X_API_KEY,
                "Authorization": this.state.auth,
                "invoice_id": invoice_id,
                "invoice_status": status
            },
        }).then(response => response.json().then(data => ({ status: response.status, body: data })))
        .then(data => {
            if(data.status === 200) {
                localStorage.setItem("Settings", "Billing");
                window.open(data.body.invoice_url)
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
			sessionStorage.setItem('from_settings','p1')
		});
    }
    render() {

        strings.setLanguage(this.state.language_id);

        let headContent = linkHeader.map((lin, index) => {
            return (
                <link key={index} rel={lin.rel} hreflang={lin.hreflang} href={url.ORIGIN_URL+lin.href+"settings"}/>
            )
        })

        let billing_history = this.state.billing_history && this.state.billing_history.map(data => {
            var date = new Date(data.date*1000);
            return (
                <div className="billing-payment" key={data.invoice_id}>
                    <div className="billing-payment__title">
                        <strong>{data.product_name}</strong>
                        <span>{data.amount}</span>
                    </div>
                    <div className="billing-payment__meta">
                        <span>{data.status === "Paid" ? strings.SETTINGS_BILLING_PAID : strings.SETTINGS_BILLING_REFUNDED } {date.toLocaleString('default', { month: 'long' }) + " " + date.getDate() + ", " + date.getFullYear()}</span>
                        <Link to="#" onClick={()=> this.handleInvoice(data.invoice_id, data.status)} className="billing-payment__receipt"><strong>{strings.SETTINGS_BILLING_RECEIPT}</strong></Link>
                    </div>
                </div>
            )    
        })

        return (
            <div>
                { this.state.loading && <div className="loader"></div> }
                <Helmet>
                    { headContent }
                </Helmet>
                <div className="right_side_barr setting_righbarr">
                    <div className="settings-info">
                        <div className="billing-container">
                            <div className="billing__section">
                                {renderHTML(strings.SETTINGS_BILLING)}
                            </div>
                            <div className="billing__section">
                                {renderHTML(strings.SETTINGS_BILLING_PAYMENT_METHODS_TITLE)}
                                <iframe style={{ width: "350px", height: "600px", overflow: "hidden"}} frameborder="0"  scrolling="no"  src={`${this.state.access_url}`}></iframe>
                            </div>
                            <div className="billing__section billing__section-history">
                                {renderHTML(strings.SETTINGS_BILLING_HISTORY)}
                                { billing_history }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Billing;
