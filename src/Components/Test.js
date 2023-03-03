import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import $ from 'jquery';
import jQuery from 'jquery';
import logo from '../Assets/images/logo.svg';
import ts_header_photo from '../Assets/images/v2/ts-header-photo.svg';
import yellow_girl from '../Assets/images/illustrations/yellow-girl.svg';
import LocalizedStrings from 'react-localization';
import { language } from './Language';
import url from '../CommonComponent/CommonURL';
import country from '../CommonComponent/Country';
import linkHeader from '../CommonComponent/Link';
import Twemoji from 'react-twemoji';
import {isWindows} from 'react-device-detect';
import renderHTML from 'react-render-html';

let strings = new LocalizedStrings(language);

class Test extends Component {
    constructor() {
        super();
        this.state = {
            auth: '',
            firstname: '',
            user_id: '',
            newRid: '',
            test: true,
            traitQuestion: false,
            todos: [],
            currentPage: 1,
            todosPerPage: 20,
            upperPageBound: 3,
            lowerPageBound: 0,
            loading: true,
            isShow: false,
            btnShow: false,
            finalCode: [],
            gender: "gender",
            age: "age",
            rid: "",
            age_one: 0,
            sex: undefined,
            width: 0,
            language_id: "",
            btnDisable: true,
            btnContinue: false,
            last_qid: '',
            errorMessage: false,
            unSelected: [],
            isFirstTime: 0,
            total_user_count: '',
            suffix: '',
            total_questions: '',
            total_responses: '',
            test_status: '',
            terms_conditions: false,
            isChecked: false,
            is_customized_checked: true,
            is_ads_checked: true,
            is_email_checked: true,
            is_customized: 1,
            is_ads: 1,
            is_email: 1,
            is_logo_link: true
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        
        let firstname = localStorage.getItem("firstname")
        let auth = localStorage.getItem("auth")
        let user_id = localStorage.getItem("user_id")
        let newRid = localStorage.getItem("rid")
        let test_status = localStorage.getItem("test_status")
        let language_id = localStorage.getItem("language_id")
        let questions = JSON.parse(localStorage.getItem("questions"));
        let questionSelected =JSON.parse(localStorage.getItem("questionSelected"))

        $(document).ready(function () {
            $('[data-toggle="popover"]').popover();
            $('[data-toggle=popover]').mouseleave(function () {
                $(this).popover('hide');
            });
            if(firstname) {
                jQuery("body").addClass("");
            } else {
                jQuery("body").addClass("test-home");
            }
            return questionSelected ? $(`#ques_oneeee-1 input[name="1"][value=${questionSelected[0].response}]`).attr("checked","checked") : ""
        })

        if(questionSelected) {
            window.scrollBy({
                top: isWindows ? 500 : 1100,
                left: 0,
                behavior: 'smooth'
            });
        }
        
        this.setState({
            finalCode: questionSelected ? questionSelected : [],
            todos: questions ? questions : [],
            isShow: true,
            btnShow: true,
            firstname: firstname,
            auth: auth,
            user_id: user_id,
            newRid: newRid,
            test_status: test_status,
            language_id:language_id
        })

        if (this.state.auth && this.state.test_status === "not_completed") {
            this.state.is_logo_link = true
        }
        else {
            this.state.is_logo_link = false
        }

        if(auth) {
            if(test_status === "not_completed") {
                this.getQuestions(questions, language_id);
            } else {
                this.setState({loading: true})
                window.location.replace(`${url.ORIGIN_URL}/profile/${user_id}`);
            }
        }else {
            if(questions) {
                this.setState({loading: false})
            }
            this.getQuestions(questions, language_id);
        }

    }

    // getquestion when user comes from someoneElse LoggedOut page and user login with facebok.
    getQuestions = (questions, language_id) => {
        if(questions == null || questions == "") {
            fetch(`${url.BASE_URL}/getquestions`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                    "x-api-key": url.X_API_KEY,
                    "language_id": language_id,
                    "last_qid": this.state.last_qid
                },
            }).then(response => response.json().then(data => ({ status: response.status, body: data })))
            .then(data => {
                this.setState({loading: false})
                if (data.status === 200) {
                    this.setState({
                        todos: data.body.questions,
                        language_id: language_id ? language_id : data.body.language_id
                    })
                }
                else {
                    this.props.commanHandler("error500");
                }
            })
        }
    }

    componentDidUpdate() {

        let _this = this;
        let questionSelected = localStorage.getItem("questionSelected") 
        if(questionSelected) {
            localStorage.removeItem("questionSelected")
        }
        $(document).ready(function () {
            if(_this.state.traitQuestion) {
                jQuery("body").removeClass("test-home");
            } 
           
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

    // get languageId and pass props in route
    handleLanguageChange = (e) => {
        e.preventDefault();
        let language_id = e.target.value;
        localStorage.setItem("language_id", e.target.value)
        localStorage.removeItem("questions")        
        this.setState(({
            language_id: language_id
        }))
        this.props.getlanguage(language_id);
    }

    // get age value
    getAge = (event) => {
        $('html,body').animate({
            scrollTop:  $(window).scrollTop()+200
        }, 400);
        this.setState({ age_one: event.target.value })
    }

    // get gender value
    getSex = (event) => {
        $('html,body').animate({
            scrollTop:  $(window).scrollTop()+200
        }, 400);
        this.setState({ sex: event.target.value })
    }

    // get all answer's of questions
    getCheckbox = (event, qid) => {
        

        const answer = event.target.value;
        this.state.unSelected.push(qid)

        if (this.state.isFirstTime == 1) {
            this.setState({
                errorMessage: true
            })
        }

        if (this.state.rid === "") {
            const qone = {
                "qid": qid,
                "response": answer
            }
            var fqid = null;
            var isAvailable = false;

            if (this.state.finalCode.length === 0) {
                this.state.finalCode.push(qone)
            }
            else {

                qid = qone.qid;

                var finalCodeLength = this.state.finalCode.length;
                for (var i = 0; i < finalCodeLength; i++) {
                    fqid = this.state.finalCode[i].qid
                    if (fqid === qid) {
                        this.state.finalCode[i] = qone
                        isAvailable = true;
                        break;
                    }
                }
                if (isAvailable === false) {
                    this.state.finalCode.push(qone)
                }
            }

        } else {
            const qone = {
                "rid": this.state.rid,
                "qid": qid,
                "response": answer
            }

            var fqid = null;
            var isAvailable = false;

            if (this.state.finalCode.length === 0) {
                this.state.finalCode.push(qone)
            }

            else {

                qid = qone.qid;
                var finalCodeLength = this.state.finalCode.length;

                for (var i = 0; i < finalCodeLength; i++) {
                    fqid = this.state.finalCode[i].qid
                    if (fqid === qid) {
                        this.state.finalCode[i] = qone
                        isAvailable = true;
                        break;
                    }
                }
                if (isAvailable === false) {
                    this.state.finalCode.push(qone)
                }
            }
        }

        $('html,body').animate({
            scrollTop:  $(window).scrollTop()+200
        }, 400);
    }

    // get next 20 question on click
    btnNextClick = () => {

        if ((this.state.currentPage + 1) > this.state.upperPageBound) {
            this.setState({ upperPageBound: this.state.upperPageBound + this.state.pageBound });
            this.setState({ lowerPageBound: this.state.lowerPageBound + this.state.pageBound });
        }
        let listid = this.state.currentPage + 1;
        this.setState({
            currentPage: listid,
            isShow: false,
            errorMessage: false,
            isFirstTime: 0
        });
        window.scrollTo(0, 0)
    }

    //checked and unchecked checkbox and get website checkbox value
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

    //checked and unchecked checkbox Adjus value
    handleAdjus = () => {
        this.setState({
            isChecked: !this.state.isChecked,
        });
    }

    //checked and unchecked checkbox and get Customized checkbox value
    handleCustomized = (e) => {

        this.setState({ is_customized_checked: !this.state.is_customized_checked })

        if (this.state.is_customized_checked) {
            this.setState({
                is_customized: 0,
            });
        }
        else {
            this.setState({
                is_customized: 1,
            });
        }

    }

    //checked and unchecked checkbox and get Email checkbox value
    handleEmail = (e) => {

        this.setState({ is_email_checked: !this.state.is_email_checked })

        if (this.state.is_email_checked) {
            this.setState({
                is_email: 0,
            });
        }
        else {
            this.setState({
                is_email: 1,
            });
        }
    }

    //checked and unchecked checkbox and get Ads checkbox value
    handleAds = (e) => {

        this.setState({ is_ads_checked: !this.state.is_ads_checked })

        if (this.state.is_ads_checked) {
            this.setState({
                is_ads: 0,
            });
        }
        else {
            this.setState({
                is_ads: 1,
            });
        }
    }

    // submit all answer's and call postanswer and getdescriptions API
    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({
            isFirstTime: 1
        })

        if (this.state.rid === "") {
            this.state.unSelected = [];

            let selectedQid = []
            this.state.finalCode.map(data => {
                selectedQid.push(data.qid)
            })

            this.setState({
                unSelected: selectedQid,
                errorMessage: true
            })
          
            let allQuestions = [];

            for (let i = 1; i < 21; i++) {
                allQuestions.push(i)
            }

            allQuestions = allQuestions.filter(val => !selectedQid.includes(val));

            if (allQuestions.length > 0) {
                let myId = "#ques_oneeee-"+allQuestions[0];
                var go_position = $(myId).offset().top;

                $('html,body').animate({
                    scrollTop: go_position
                }, 400);      
            }

            if (this.state.finalCode.length !== 20) {
                this.setState({
                    errorMessage: true
                })
                return true;
            }

            if (this.state.age_one == 0) {
                this.setState({
                    errorMessage: true
                })
                return true;
            }

            if (this.state.sex === undefined) {
                this.setState({
                    errorMessage: true
                })
                return true;
            }

            let data = [
                {
                    gender: this.state.sex,
                    age: this.state.age_one
                }
            ].concat(this.state.finalCode)

            this.setState({
                btnDisable: false
            })

            var lastArrayElement = this.state.finalCode[this.state.finalCode.length - 1];
            var last_qid = lastArrayElement.qid;
            this.setState({
                last_qid: last_qid
            })
            
            fetch(`${url.BASE_URL}/postanswers`, {
                method: "Post",
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                    "x-api-key": url.X_API_KEY,
                    "language_id": this.state.language_id,
                    "rid": this.state.rid ? this.state.rid : this.state.newRid,
                    "total_responses": this.state.total_responses,
                    "total_questions": this.state.total_questions,
                    "Authorization": this.state.auth
                },
            }).then(response => response.json().then(data => ({ status: response.status, body: data })))
            .then(data => {
                if (data.status === 200) {
                    this.setState({
                        total_questions: data.body.total_questions,
                        total_responses: data.body.total_responses
                    })
                    if (data.body.last_page === true) {
                        fetch(`${url.BASE_URL}/getdescriptions`, {
                            method: "GET",
                            headers: {
                                'Content-Type': 'application/json',
                                "Access-Control-Allow-Origin": "*",
                                "Access-Control-Allow-Credentials": true,
                                "x-api-key": url.X_API_KEY,
                                "language_id": this.state.language_id
                            },
                        }).then(response => response.json().then(data => ({ status: response.status, body: data })))
                            .then(data => {
                                if (data.status === 200) {
                                    if (data.body.length === 0) {
                                        this.setState({
                                            terms_conditions: true,
                                            btnShow: false
                                        })
                                    }
                                }
                                else {     
                                    this.props.commanHandler("error500");
                                }
                            })
                    }
                    if (data.body.message === "Description") {
                        fetch(`${url.BASE_URL}/getdescriptions`, {
                            method: "GET",
                            headers: {
                                'Content-Type': 'application/json',
                                "Access-Control-Allow-Origin": "*",
                                "Access-Control-Allow-Credentials": true,
                                "x-api-key": url.X_API_KEY,
                                "language_id": this.state.language_id
                            },
                        }).then(response => response.json().then(data => ({ status: response.status, body: data })))
                            .then(data => {
                                if (data.status === 200) {
                                    if (data.body.length === 0) {
                                        window.location.replace(`${url.ORIGIN_URL}/signup`)
                                    }
                                    else {
                                        window.location.replace(`${url.ORIGIN_URL}/testdescriptions`)
                                    }
                                }
                                else {
                                    this.props.commanHandler("error500");
                                }
                            })
                    }
                    else {
                        this.state.finalCode = []
                        this.btnNextClick();
                        localStorage.setItem("rid", data.body.rid)
                        let rid = localStorage.getItem("rid")

                        this.setState({
                            rid: rid,
                            btnDisable: true,
                            traitQuestion: true,
                            errorMessage: false
                        })

                        this.setState(state => {
                            return { width: state.width + 16.67 };
                        });
                    }
                }
                else {
                    this.props.commanHandler("error500");
                }
            })
        }
        else {
            this.state.unSelected = [];
            let selectedQid = []

            this.state.finalCode.map(data => {
                selectedQid.push(data.qid)
            })

            this.setState({
                unSelected: selectedQid,
                errorMessage: true
            })

            let allQuestions = []

            if (selectedQid.length < 20) {
                
                if (selectedQid.length == 0) {
                    var go_position = 80;

                }

                if (selectedQid[0] > 20 && selectedQid[0] < 41) {
                    for (let i = 21; i < 41; i++) {
                        allQuestions.push(i)
                    }
                    allQuestions = allQuestions.filter(val => !selectedQid.includes(val));
                    if (allQuestions.length > 0) {
                        let myId = "#ques_oneeee-" + allQuestions[0];
                        var go_position = $(myId).offset().top;
                    }
                }

                if (selectedQid[0] > 40 && selectedQid[0] < 61) {
                    for (let i = 41; i < 61; i++) {
                        allQuestions.push(i)
                    }
                    allQuestions = allQuestions.filter(val => !selectedQid.includes(val));
                    if (allQuestions.length > 0) {
                        let myId = "#ques_oneeee-" + allQuestions[0];
                        var go_position = $(myId).offset().top;
                    }
                }

                if (selectedQid[0] > 60 && selectedQid[0] < 81) {
                    for (let i = 61; i < 81; i++) {
                        allQuestions.push(i)
                    }
                    allQuestions = allQuestions.filter(val => !selectedQid.includes(val));
                    if (allQuestions.length > 0) {
                        let myId = "#ques_oneeee-" + allQuestions[0];
                        var go_position = $(myId).offset().top;
                    }
                }

                if (selectedQid[0] > 80 && selectedQid[0] < 101) {
                    for (let i = 81; i < 101; i++) {
                        allQuestions.push(i)
                    }
                    allQuestions = allQuestions.filter(val => !selectedQid.includes(val));
                    if (allQuestions.length > 0) {
                        let myId = "#ques_oneeee-" + allQuestions[0];
                        var go_position = $(myId).offset().top;
                    }
                }

                if (selectedQid[0] > 100 && selectedQid[0] < 121) {
                    for (let i = 101; i < 121; i++) {
                        allQuestions.push(i)
                    }
                    allQuestions = allQuestions.filter(val => !selectedQid.includes(val));
                    if (allQuestions.length > 0) {
                        let myId = "#ques_oneeee-" + allQuestions[0];
                        var go_position = $(myId).offset().top;

                    }
                }
                 
                $('html,body').animate({
                    scrollTop: go_position
                }, 400);

            }

            if (this.state.finalCode.length !== 20) {
                return true;
            }

            this.setState({
                btnDisable: false
            })

            var lastArrayElement = this.state.finalCode[this.state.finalCode.length - 1];
            var last_qid = lastArrayElement.qid;

            this.setState({
                last_qid: last_qid
            })

            if (this.state.terms_conditions) {
                let tncData = {
                    is_customized: this.state.is_customized,
                    is_email: this.state.is_email,
                    is_ads: this.state.is_ads
                }
                this.state.finalCode.push(tncData)
                this.setState({loading: true})
            }

            fetch(`${url.BASE_URL}/postanswers`, {
                method: "Post",
                body: JSON.stringify(this.state.finalCode),
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                    "x-api-key": url.X_API_KEY,
                    "language_id": this.state.language_id,
                    "rid": this.state.rid ? this.state.rid : this.state.newRid,
                    "total_responses": this.state.total_responses,
                    "total_questions": this.state.total_questions,
                    "Authorization": this.state.auth
                },
            }).then(response => response.json().then(data => ({ status: response.status, body: data })))
            .then(data => {
                this.setState({
                    total_questions: data.body.total_questions,
                    total_responses: data.body.total_responses
                })
                if (data.status === 200) {
                    if (data.body.last_page === true) {
                        fetch(`${url.BASE_URL}/getdescriptions`, {
                            method: "GET",
                            headers: {
                                'Content-Type': 'application/json',
                                "Access-Control-Allow-Origin": "*",
                                "Access-Control-Allow-Credentials": true,
                                "x-api-key": url.X_API_KEY,
                                "language_id": this.state.language_id
                            },
                        }).then(response => response.json().then(data => ({ status: response.status, body: data })))
                        .then(data => {
                            this.setState({loading: false})
                            if (data.status === 200) {
                                if (data.body.length === 0) {
                                    this.setState({
                                        terms_conditions: true,
                                        btnShow: false
                                    })
                                }
                            }
                            else {
                                this.props.commanHandler("error500");
                            }
                        })
                    }
                    if (data.body.message === "Description") {
                        fetch(`${url.BASE_URL}/getdescriptions`, {
                            method: "GET",
                            headers: {
                                'Content-Type': 'application/json',
                                "Access-Control-Allow-Origin": "*",
                                "Access-Control-Allow-Credentials": true,
                                "x-api-key": url.X_API_KEY,
                                "language_id": this.state.language_id
                            },
                        }).then(response => response.json().then(data => ({ status: response.status, body: data })))
                        .then(data => {
                            if (data.status === 200) {
                                if (data.body.length === 0) {
                                    localStorage.setItem("test_status", "completed")
                                    window.location.replace(`${url.ORIGIN_URL}/signup`)
                                }
                                else {
                                    localStorage.setItem("test_status", "completed")
                                    window.location.replace(`${url.ORIGIN_URL}/testdescriptions`)
                                }
                            }
                            else {
                                this.props.commanHandler("error500");
                            }
                        })
                        
                    }
                    else {
                        this.state.finalCode = []
                        this.btnNextClick();
                        localStorage.setItem("rid", data.body.rid)
                        let rid = localStorage.getItem("rid")

                        this.setState({
                            rid: rid,
                            btnDisable: true,
                            errorMessage: false
                        })

                        this.setState(state => {
                            return { width: state.width + 16.67 };
                        });
                    }
                }
                else {
                    this.props.commanHandler("error500");
                }
            })
        }
    }

    // get languageId and pass as props in route
    selectLanguage = (language_id) => {
        
        localStorage.setItem("language_id", language_id)
        localStorage.removeItem("questions")
        this.setState({
            language_id: language_id
        })
        this.props.getlanguage(language_id)
    }

    // show languages toogle on click in mobile view
    toggleClick = () => {
        $('#mobile-menu').toggleClass('show');
    }

    // hide languages toogle on click in mobile view
    toggleCancelClick = () => {
        $('#mobile-menu').removeClass('show');
    }

    render() {

        strings.setLanguage(this.state.language_id);

        const { todos, currentPage, todosPerPage } = this.state;
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);
        const renderTodos = currentTodos.map(post => {
            return (
                <div key={post.id}>
                    <div id={ "ques_oneeee-"+post.id } className="ques_oneeee">
                        {!this.state.unSelected.includes(post.id) && this.state.errorMessage ? <div id={post.id} className="ques_oneeee__required">{strings.TEST_ERR}</div> : ""}
                        <div className="ques_tectt">
                            {post.question}
                        </div>
                        <div className="field-yesno">
                            <div className="field-yesno__label field-yesno__checkbox_no">{strings.TEST_DISAGREE}</div>
                            <div className="field-yesno__checkbox field-yesno__checkbox_no">
                                <label>
                                    <input type="radio" name={post.id} onClick={(e) => this.getCheckbox(e, post.id)} value="-3" />
                                    <span></span>
                                </label>
                            </div>
                            <div className="field-yesno__checkbox field-yesno__checkbox_no">
                                <label>
                                    <input type="radio" name={post.id} onClick={(e) => this.getCheckbox(e, post.id)} value="-2" />
                                    <span></span>
                                </label>
                            </div>
                            <div className="field-yesno__checkbox field-yesno__checkbox_no">
                                <label>
                                    <input type="radio" name={post.id} onClick={(e) => this.getCheckbox(e, post.id)} value="-1" />
                                    <span></span>
                                </label>
                            </div>
                            <div className="field-yesno__checkbox">
                                <label>
                                    <input type="radio" name={post.id} onClick={(e) => this.getCheckbox(e, post.id)} value="0" />
                                    <span></span>
                                </label>
                            </div>
                            <div className="field-yesno__checkbox field-yesno__checkbox_yes">
                                <label>
                                    <input type="radio" name={post.id} onClick={(e) => this.getCheckbox(e, post.id)} value="1" />
                                    <span></span>
                                </label>
                            </div>
                            <div className="field-yesno__checkbox field-yesno__checkbox_yes">
                                <label>
                                    <input type="radio" name={post.id} onClick={(e) => this.getCheckbox(e, post.id)} value="2" />
                                    <span></span>
                                </label>
                            </div>
                            <div className="field-yesno__checkbox field-yesno__checkbox_yes">
                                <label>
                                    <input type="radio" name={post.id} onClick={(e) => this.getCheckbox(e, post.id)} value="3" />
                                    <span></span>
                                </label>
                            </div>
                            <div className="field-yesno__label field-yesno__checkbox_yes">{strings.TEST_AGREE}</div>
                        </div>
                    </div>
                </div>
            )
        })

        const style = {
            width: this.state.width + '%'
        };

        let headContent = linkHeader.map((lin, index) => {
            return (
                <link key={index} rel={lin.rel} hreflang={lin.hreflang} href={url.ORIGIN_URL + lin.href + "test"} />
            )
        })

        let test = <div>
            {this.state.loading && <div className="loader"></div>}
            <Helmet>
                {headContent}
                <title>{strings.TEST_META_TITLE}</title>
                <meta name="description" content={strings.TEST_META_DESCRIPTION} />
            </Helmet>
            <div id="mobile-menu">
                <div className="inner">
                    <div className="d-flex align-items-center justify-content-between mobile-menu-header">
                        <a {... this.state.is_logo_link ? { href: '/test' } : {href: '/'}} className="logo">
                            <img alt="" src={logo} />
                        </a>
                        <button type="button" onClick={this.toggleCancelClick} className="toggle-menu active">
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                    <ul key="tt-u-1" className="menu">
                        {country.language_id_name_mapping.map(language => {
                            return (
                                <li key="tt-u-1-l-1" key={language.id}><Link to="#" onClick={() => this.selectLanguage(language.id)}>{language.name}</Link></li>
                            )
                        })
                        }
                    </ul>
                </div>
            </div>
            { this.state.traitQuestion ?
                <header className="test-header has-progress sticky">
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="test-header-logo">
                            <a {... this.state.is_logo_link ? { href: '/test' } : {href: '/'}} className="logo" >
                                <img  alt=""src={logo} />
                                <strong>{strings.TEST_INTERPERSONALITY}</strong>
                            </a>
                        </div>
                        <div className="d-flex justify-content-end test-header-actions">
                            <div className="language-dropdown">
                                <select name="lang" value={this.state.language_id} onChange={this.handleLanguageChange}>
                                    {country.language_id_name_mapping && country.language_id_name_mapping.map((data, index) => {
                                        return (
                                            <option key={index} value={data.id}>{data.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <button type="button" onClick={this.toggleClick} className="toggle-menu d-none">
                                <span></span>
                                <span></span>
                                <span></span>
                            </button>
                        </div>
                    </div>
                    <div className="test-progress">
                        <p className="test-progress__number">{Math.round(this.state.width) + '%'}</p>
                        <div className="progress">
                            <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={style}></div>
                        </div>
                    </div>
                </header>
                :
           [ 
                <header className="test-header transparent">
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="test-header-logo">
                            <a {... this.state.is_logo_link ? { href: '/test' } : {href: '/'}} className="logo" >
                                <img alt="" src={logo} />
                                <strong>{strings.TEST_INTERPERSONALITY}</strong>
                            </a>
                        </div>
                        <div className="d-flex justify-content-end test-header-actions">
                            <div className="language-dropdown d-none d-sm-block">
                                <select name="lang" value={this.state.language_id} onChange={this.handleLanguageChange}>
                                    {country.language_id_name_mapping && country.language_id_name_mapping.map((data, index) => {
                                        return (
                                            <option key={index} value={data.id}>{data.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <button type="button" onClick={this.toggleClick} className="toggle-menu d-sm-none">
                                <span></span>
                                <span></span>
                                <span></span>
                            </button>
                        </div>
                    </div>
                </header>,
                <div className="ts-header">
                    {this.state.firstname &&
                     <div className="container text-center p-0 tsh-heading">
                        <img src={ts_header_photo} alt="" />
                        {renderHTML(strings.formatString(strings.TEST_TITLE_AFTER_LOGIN,this.state.firstname))}
                    </div>
                    }
                    {!this.state.firstname &&
                    <div className="test-welcome">
                        <div className="container">
                            <div className="row no-gutters">
                                <div className="col-lg-8">
                                    <a {... this.state.is_logo_link ? { href: '/test' } : {href: '/'}}>
                                        <img alt="" src={logo} className="logo d-none d-md-block" />
                                    </a>
                                    {renderHTML(strings.TEST_TITLE)}
                                </div>
                                <div className="col-lg-4 d-none d-lg-block">
                                    <img src={yellow_girl} alt="" width="247" height="320" />
                                </div>
                            </div>
                        </div>
                    </div>
                    }
                    <div className="ts-features">
                        <div className="row no-gutters">
                            <div className="col-md-4">
                                <span className="tsh-box-icon">🙈</span>
                                {renderHTML(strings.TEST_PARAGRAPH_1)}
                            </div>
                            <div className="col-md-4">
                                <span className="tsh-box-icon">😊</span>
                                {renderHTML(strings.TEST_PARAGRAPH_3)}
                            </div>
                            <div className="col-md-4">
                                <span className="tsh-box-icon">⏱️</span>
                                {renderHTML(strings.TEST_PARAGRAPH_2)}
                            </div>
                        </div>
                    </div>
                </div>
            ]
            }
            <div className="questionsss_mainnnn">
                <div className="ques_start">
                    <form onSubmit={this.handleSubmit} id="test-form" className="test-form">
                        {renderTodos}
                        {this.state.rid === '' ?
                            [ 
                                <div id="ques_oneeee-3" className="ques_oneeee">
                                    {this.state.age_one == 0 && this.state.errorMessage ? <div id="age" className="ques_oneeee__required">{strings.TEST_ERR}</div> : ""}
                                    <div className="ques_tectt">
                                        {strings.TEST_AGE_TITLE}
                                        <button type="button" data-toggle="popover" data-trigger="click" data-placement="bottom" data-offset="100px 0" popover data-content={strings.TEST_TOOLTIPS}><i className="fa fa-question-circle-o" aria-hidden="true"></i></button>
                                    </div>
                                    <div className="test_select">
                                        <select name="age" className="form-control" onChange={(e) => this.getAge(e)}>
                                            <option value="0">{strings.TEST_AGE_TITLE_PLACEH0LDER}</option>
                                            <option value="14">14</option>
                                            <option value="15">15</option>
                                            <option value="16">16</option>
                                            <option value="17">17</option>
                                            <option value="18">18</option>
                                            <option value="19">19</option>
                                            <option value="20">20</option>
                                            <option value="21">21</option>
                                            <option value="22">22</option>
                                            <option value="23">23</option>
                                            <option value="24">24</option>
                                            <option value="25">25</option>
                                            <option value="26">26</option>
                                            <option value="27">27</option>
                                            <option value="28">28</option>
                                            <option value="29">29</option>
                                            <option value="30">30</option>
                                            <option value="31">31</option>
                                            <option value="32">32</option>
                                            <option value="33">33</option>
                                            <option value="34">34</option>
                                            <option value="35">35</option>
                                            <option value="36">36</option>
                                            <option value="37">37</option>
                                            <option value="38">38</option>
                                            <option value="39">39</option>
                                            <option value="40">40</option>
                                            <option value="41">41</option>
                                            <option value="42">42</option>
                                            <option value="43">43</option>
                                            <option value="44">44</option>
                                            <option value="45">45</option>
                                            <option value="46">46</option>
                                            <option value="47">47</option>
                                            <option value="48">48</option>
                                            <option value="49">49</option>
                                            <option value="50">50</option>
                                            <option value="51">51</option>
                                            <option value="52">52</option>
                                            <option value="53">53</option>
                                            <option value="54">54</option>
                                            <option value="55">55</option>
                                            <option value="56">56</option>
                                            <option value="57">57</option>
                                            <option value="58">58</option>
                                            <option value="59">59</option>
                                            <option value="60">60</option>
                                            <option value="61">61</option>
                                            <option value="62">62</option>
                                            <option value="63">63</option>
                                            <option value="64">64</option>
                                            <option value="65">65</option>
                                            <option value="66">66</option>
                                            <option value="67">67</option>
                                            <option value="68">68</option>
                                            <option value="69">69</option>
                                            <option value="70">70</option>
                                            <option value="71">71</option>
                                            <option value="72">72</option>
                                            <option value="73">73</option>
                                            <option value="74">74</option>
                                            <option value="75">75</option>
                                            <option value="76">76</option>
                                            <option value="77">77</option>
                                            <option value="78">78</option>
                                            <option value="79">79</option>
                                            <option value="80">80</option>
                                            <option value="81">81</option>
                                            <option value="82">82</option>
                                            <option value="83">83</option>
                                            <option value="84">84</option>
                                            <option value="85">85</option>
                                            <option value="86">86</option>
                                            <option value="87">87</option>
                                            <option value="88">88</option>
                                            <option value="89">89</option>
                                            <option value="90">90</option>
                                            <option value="91">91</option>
                                            <option value="92">92</option>
                                            <option value="93">93</option>
                                            <option value="94">94</option>
                                            <option value="95">95</option>
                                            <option value="96">96</option>
                                            <option value="97">97</option>
                                            <option value="98">98</option>
                                            <option value="99">99</option>
                                        </select>
                                    </div>
                                </div>,
                                <div id="ques_oneeee-4" className="ques_oneeee">
                                    {this.state.sex === undefined && this.state.errorMessage ? <div id="gender" className="ques_oneeee__required">{strings.TEST_ERR}</div> : ""}
                                    <div className="ques_tectt">
                                        {strings.TEST_GENDER_TITLE}
                                        <button type="button" data-toggle="popover" data-trigger="click" data-placement="bottom" data-offset="100px 0" data-content={strings.TEST_TOOLTIPS}><i className="fa fa-question-circle-o" aria-hidden="true"></i></button>
                                    </div>
                                    <div className="field-gender">
                                        <div className="field-gender__checkbox field-gender__checkbox_male">
                                            <label>
                                                <input type="radio" name="21" value="0" onClick={(e) => this.getSex(e)} />
                                                <span>{strings.TEST_MALE}</span>
                                            </label>
                                        </div>
                                        <div className="field-gender__checkbox field-gender__checkbox_gender">
                                            <label>
                                                <input type="radio" name="21" value="1" onClick={(e) => this.getSex(e)} />
                                                <span>{strings.TEST_FEMALE}</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                        ]
                            :
                            ""
                        }
                        {this.state.terms_conditions &&
                            <div className="tdq-privacy">
                                {renderHTML(strings.TEST_PRIVACY)}
                                <ul key="tt-u-2" className="tdq-privacy-fields">
                                    <li key="tt-u-2-l-1">
                                        <label>
                                            <input type="radio" checked={!this.state.isChecked} onChange={this.handleWebsite} />
                                            <span>{strings.TEST_PRIVACY_OPTION_1}</span>
                                        </label>
                                    </li>
                                    <li key="tt-u-2-l-2">
                                        <label>
                                            <input type="radio" checked={this.state.isChecked} onChange={this.handleAdjus} />
                                            <span>{strings.TEST_PRIVACY_OPTION_2}</span>
                                        </label>
                                        {this.state.isChecked &&
                                            <ul key="tt-u-3" className="tdq-privacy-options">
                                                <li key="tt-u-3-l-1">
                                                    <label>
                                                        <input type="checkbox" name="is_customized" value={this.state.is_customized} onChange={this.handleCustomized} checked={this.state.is_customized_checked} />
                                                        <span>{strings.TEST_PRIVACY_OPTION_2_1}</span>
                                                    </label>
                                                    {this.state.is_customized === 0 && <p className="note">{strings.TEST_PRIVACY_OPTION_1_ERR}</p>}
                                                </li>
                                                <li key="tt-u-3-l-2">
                                                    <label>
                                                        <input type="checkbox" name="is_email" value={this.state.is_email} onChange={this.handleEmail} checked={this.state.is_email_checked} />
                                                        <span>{strings.TEST_PRIVACY_OPTION_2_2} </span>
                                                    </label>
                                                </li>
                                                <li key="tt-u-3-l-3">
                                                    <label>
                                                        <input type="checkbox" name="is_ads" value={this.state.is_ads} onChange={this.handleAds} checked={this.state.is_ads_checked} />
                                                        <span>{strings.TEST_PRIVACY_OPTION_2_3}</span>
                                                    </label>
                                                </li>
                                            </ul>
                                        }
                                    </li>
                                </ul>
                            </div>
                        }
                        {this.state.btnShow ?
                            <div className="btn_nexttt">
                                <button type="submit" className="btn btn-primary next_teat_btn" onClick={this.handleDisable} disabled={this.state.btnDisable ? "" : "disabled"}>{strings.TEST_NEXTBTN}</button>
                            </div>
                            :
                            <div className="btn_nexttt continuee_btnn">
                                <button type="submit" className="btn btn-primary next_teat_btn" disabled={this.state.is_customized === 1 ? "" : "disabled"}>{strings.TEST_CONTINUEBTN}</button>
                            </div>
                        }
                    </form>
                </div>
            </div>
        </div>
        if(isWindows) {
            return (
                <Twemoji options={{ className: 'emoji', folder: 'svg', ext: '.svg' }} >
                    {test}
                </Twemoji>
            )
        } else {    
            return test
        }
    }
}

export default Test;