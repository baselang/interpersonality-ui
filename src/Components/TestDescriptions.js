import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import $ from 'jquery';
import logo from '../Assets/images/logo.svg';
import country from '../CommonComponent/Country';

import LocalizedStrings from 'react-localization';
import { language } from './Language';
import url from '../CommonComponent/CommonURL';
import linkHeader from '../CommonComponent/Link';
import Twemoji from 'react-twemoji';
import {isWindows} from 'react-device-detect';
import renderHTML from 'react-render-html';

let strings = new LocalizedStrings(language);

class TestDescriptions extends Component {
    constructor() {
        super();
        this.state = {
            todos: [],
            currentPage: 1,
            todosPerPage: 20,
            upperPageBound: 3,
            lowerPageBound: 0,
            loading: true,
            isShow: true,
            gender: "gender",
            age: "age",
            rid: "",
            finalCode: [],
            isRedirect: false,
            language_id: "",
            isChecked: false,
            is_customized_checked: true,
            is_ads_checked: true,
            is_email_checked: true,
            is_customized:1,
            is_ads:1,
            is_email:1,
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)

        let language_id  = localStorage.getItem("language_id")
        let rid = localStorage.getItem("rid")
        let personality = localStorage.getItem("personality")
        let user_id = localStorage.getItem("user_id")

        if(rid) {
            this.setState({
                rid: rid,
                language_id: language_id
            })
        }else {
            window.location.replace("/test")
        }

        if(personality) {
            window.location.replace(`${url.ORIGIN_URL}/profile/${user_id}`) 
        }
        else {
            fetch(`${url.BASE_URL}/getdescriptions`,{
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                    "x-api-key": url.X_API_KEY,
                    "language_id": language_id
                },
            }).then(response => response.json().then(data => ({ status: response.status, body: data })))
            .then(data => {
                this.setState({
                    loading: false
                })
                if(data.status === 200) {
                    this.setState({
                        todos: data.body,
                        checkbox_btn: true
                    })
                }
                else {
                    this.props.commanHandler("error500");
                }    
            })
            window.scrollTo(0, 0)
        }
    }

    componentDidUpdate() {
        $(document).ready(function () {
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

                        scrollPosition = cursorPosition;
                    });
                }

                scrollDetection();
            }

            header_sticky();
        });    
    }

    getCheckbox = (event, qid) => {

        window.scrollBy({
            top: 240,
            left: 0,
            behavior: 'smooth'
          });

        const answer = event.target.value;
        const qone = {
            "qid": qid,
            "response": answer,
            "rid": this.state.rid,
            "description": true
        }

        var fqid = null;
        var isAvailable = false;

        if(this.state.finalCode.length === 0) {
            this.state.finalCode.push(qone)    
        }
        else {
            qid =  qone.qid;
            var finalCodeLength = this.state.finalCode.length;
            for(var i = 0; i < finalCodeLength; i++) {
                fqid = this.state.finalCode[i].qid
                if(fqid === qid) {
                    this.state.finalCode[i] = qone
                    isAvailable = true;
                    break;
                }
            }
            if(isAvailable === false) {
                this.state.finalCode.push(qone)
            }
        }
    }


    btnNextClick = () => {

        if((this.state.currentPage +1) > this.state.upperPageBound ){
            this.setState({upperPageBound: this.state.upperPageBound + this.state.pageBound});
            this.setState({lowerPageBound: this.state.lowerPageBound + this.state.pageBound});
        }
        let listid = this.state.currentPage + 1;
        this.setState({ 
            currentPage : listid,
            isShow: false
        });
    }

    handleLanguageChange = (e) => {
        e.preventDefault();

        let language_id = e.target.value;
        localStorage.setItem("language_id", e.target.value)
        
        this.setState(({
            language_id: language_id
        }))

        this.props.getlanguage(language_id);
    }

    handleLogo = () => {
        if (this.state.auth && this.state.test_status === "not_completed") {
            window.location.replace(`${url.ORIGIN_URL}/test`)
        }
        else {
            window.location.replace(`${url.ORIGIN_URL}/`)
        }
    }

    selectLanguage = (language_id) => {
        localStorage.setItem("language_id", language_id)
        this.setState({
            language_id: language_id
        })
        this.props.getlanguage(language_id)
    }

    handleWebsite = () => {
        this.setState({
            is_customized: 1,
            is_email: 1,
            is_ads: 1,  
            is_customized_checked: true,
            is_ads_checked: true,
            is_email_checked: true,
            isChecked: !this.state.isChecked,
        });
    }

    handleAdjus = () => {
        this.setState({
          isChecked: !this.state.isChecked,
        });
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
    }

    handleSubmit = (event) => {
        event.preventDefault();

        let tncData = {
            is_customized: this.state.is_customized,
            is_email: this.state.is_email,
            is_ads: this.state.is_ads
        }
        
        this.state.finalCode.push(tncData)

        if(this.state.is_customized_checked === true) {
            fetch(`${url.BASE_URL}/postanswers`,{
                method: "Post",
                body: JSON.stringify(this.state.finalCode),
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                    "x-api-key": url.X_API_KEY,
                    "language_id": this.state.language_id,
                    "rid": this.state.rid
                },
            }).then(response => response.json().then(data => ({ status: response.status, body: data })))
            .then(data => {
                if(data.status === 200) {
                    this.state.finalCode = []
                    this.btnNextClick();
                    window.location.replace(`${url.ORIGIN_URL}/signup`)
                }
                else {
                    this.props.commanHandler("error500");
                }
            })
        }
    }

    render() {

        strings.setLanguage(this.state.language_id);

        const { todos, currentPage, todosPerPage } = this.state;
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);
        const renderTodos = currentTodos.map(data => {
            return (
                <div key={data.id}>
                    <div id="ques_oneeee-1" className="ques_oneeee">
                        <div className="ques_tectt">
                            { data.description_title }
                        </div>
                        <div className="ques_descrr">
                            { data.description_text }
                        </div>
                        <div className="field-yesno">
                            <div className="field-yesno__label field-yesno__checkbox_no">{strings.TEST_DESC_DISAGREE}</div>
                            <div className="field-yesno__checkbox field-yesno__checkbox_no">
                                <label>
                                    <input type="radio" name={data.id} value="-3" onClick={ (e) => this.getCheckbox(e, data.id)} />
                                    <span></span>
                                </label>
                            </div>
                            <div className="field-yesno__checkbox field-yesno__checkbox_no">
                                <label>
                                    <input type="radio" name={data.id} value="-2" onClick={ (e) => this.getCheckbox(e, data.id)} />
                                    <span></span>
                                </label>
                            </div>
                            <div className="field-yesno__checkbox field-yesno__checkbox_no">
                                <label>
                                    <input type="radio" name={data.id} value="-1" onClick={ (e) => this.getCheckbox(e, data.id)} />
                                    <span></span>
                                </label>
                            </div>
                            <div className="field-yesno__checkbox">
                                <label>
                                    <input type="radio" name={data.id} value="0" onClick={ (e) => this.getCheckbox(e, data.id)} />
                                    <span></span>
                                </label>
                            </div>
                            <div className="field-yesno__checkbox field-yesno__checkbox_yes">
                                <label>
                                    <input type="radio" name={data.id} value="1" onClick={ (e) => this.getCheckbox(e, data.id)} />
                                    <span></span>
                                </label>
                            </div>
                            <div className="field-yesno__checkbox field-yesno__checkbox_yes">
                                <label>
                                    <input type="radio" name={data.id} value="2" onClick={ (e) => this.getCheckbox(e, data.id)} />
                                    <span></span>
                                </label>
                            </div>
                            <div className="field-yesno__checkbox field-yesno__checkbox_yes">
                                <label>
                                    <input type="radio" name={data.id} value="3" onClick={ (e) => this.getCheckbox(e, data.id)} />
                                    <span></span>
                                </label>
                            </div>
                            <div className="field-yesno__label field-yesno__checkbox_yes">{strings.TEST_DESC_AGREE}</div>
                        </div>
                    </div>
                </div>
            )
        })

        let headContent = linkHeader.map((lin, index) => {
            return (
                <link key={index} rel={lin.rel} hreflang={lin.hreflang} href={url.ORIGIN_URL + lin.href + "testdescriptions"} />
            )
        })

        let testDescriptions = <div>
            { this.state.loading && <div className="loader"></div> }
            <Helmet>
                {headContent}
            </Helmet>
            <div id="mobile-menu">
                <div className="inner">
                    <div className="d-flex align-items-center justify-content-between mobile-menu-header">
                        <Link to="#" className="logo" onClick={this.handleLogo}>
                            <img alt="" src={ logo } />
                        </Link>
                        <button type="button" className="toggle-menu active">
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                    <ul key="td-u-1" className="menu">
                        {country.language_id_name_mapping.map(language => {
                            return (
                                <li key="td-u-1-l-1" key={language.id}><Link to="#" onClick={() => this.selectLanguage(language.id)}>{language.name}</Link></li>
                            )
                        })  
                        }
                    </ul>
                </div>
            </div>
            <header className="test-header has-progress sticky">
                <div className="d-flex align-items-center justify-content-between">
                    <div className="test-header-logo">
                        <Link to="#" className="logo" onClick={this.handleLogo}>
                            <img alt="" src={ logo } />
                            <strong>{ strings.INTERPERSONALITY }</strong>
                        </Link>
                    </div>
                    <div className="d-flex justify-content-end test-header-actions">
                        <div className="language-dropdown">
                            <select name="lang" value={this.state.language_id} onChange={this.handleLanguageChange}>
                                {country.language_id_name_mapping && country.language_id_name_mapping.map((data, index) =>{
                                    return (
                                        <option key={index} value={data.id}>{data.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <button type="button" className="toggle-menu d-none">
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>
                <div className="test-progress">
                    <p className="test-progress__number">90%</p>
                    <div className="progress">
                        <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{ width: "90%"}}></div>
                    </div>
                </div>
            </header>
            <div className="tdq-heading">
                <div className="container text-center">
                    {renderHTML(strings.TEST_DESC_NOTE)}
                </div>
            </div>
            <div className="questionsss_mainnnn">
                <div className="ques_start">
                    <form onSubmit={ this.handleSubmit } id="test-form" className="test-form">
                        { renderTodos }
                        <div className="tdq-privacy">
                            {renderHTML(strings.TEST_DESC_PRIVACY)}
                            <ul key="td-u-2" className="tdq-privacy-fields">
                                <li key="td-u-2-l-1">
                                    <label>
                                        <input type="radio" checked={ !this.state.isChecked } onChange={ this.handleWebsite } />
                                        <span>{strings.TEST_DESC_PRIVACY_OPTION_1}</span>
                                    </label>
                                </li>
                                <li key="td-u-2-l-2">
                                    <label>
                                        <input type="radio" checked={ this.state.isChecked } onChange={ this.handleAdjus } />
                                        <span>{strings.TEST_DESC_PRIVACY_OPTION_2}</span>
                                    </label>
                                    {this.state.isChecked &&
                                    <ul key="td-u-3" className="tdq-privacy-options">
                                        <li key="td-u-3-l-1">
                                            <label>
                                                <input type="checkbox" name="is_customized" value={this.state.is_customized} onChange={this.handleCustomized } checked ={this.state.is_customized_checked} />
                                                <span>{strings.TEST_DESC_PRIVACY_OPTION_2_1}</span>
                                            </label>
                                            { this.state.is_customized === 0 && <p className="note">{strings.TEST_DESC_PRIVACY_OPTION_1_ERR}</p>}
                                        </li>
                                        <li key="td-u-3-l-2">
                                            <label>
                                                <input type="checkbox" name="is_email" value={this.state.is_email} onChange={ this.handleEmail } checked ={this.state.is_email_checked} />
                                                <span>{strings.TEST_DESC_PRIVACY_OPTION_2_2} </span>
                                            </label>
                                        </li>
                                        <li key="td-u-3-l-3">
                                            <label>
                                                <input type="checkbox" name="is_ads" value={this.state.is_ads} onChange={ this.handleAds } checked ={this.state.is_ads_checked} />
                                                <span>{strings.TEST_DESC_PRIVACY_OPTION_2_3}</span>
                                            </label>
                                        </li>
                                    </ul>
                                    }
                                </li>
                            </ul>
                        </div>
                        <div className="btn_nexttt continuee_btnn">
                            <button type="submit" className="btn btn-primary next_teat_btn" disabled={this.state.is_customized === 1 ? "" : "disabled"}>{strings.TEST_DESC_CONTINUEBTN}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        if(isWindows) {
            return (
                <Twemoji options={{ className: 'emoji', folder: 'svg', ext: '.svg' }} >
                    {testDescriptions}
                </Twemoji>
            )
        } else {    
            return testDescriptions
        }
    }
}

export default TestDescriptions;