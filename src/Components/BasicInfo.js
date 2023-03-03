    import React, { Component } from 'react';
    import { Link } from 'react-router-dom';
    import { Helmet } from 'react-helmet';
    import * as $ from 'jquery';
    import jQuery from 'jquery';
    import commander from '../Assets/images/commander.png';
    import url from '../CommonComponent/CommonURL';
    import LocalizedStrings from 'react-localization';
    import { language } from './Language';
    import country from '../CommonComponent/Country';
    import linkHeader from '../CommonComponent/Link';
    import renderHTML from 'react-render-html';
    import {isMobile} from 'react-device-detect';

    let strings = new LocalizedStrings(language);

    class BasicInfo extends Component {
        constructor() {
            super();
            this.state = {
                firstname: '',
                lastname: '',
                emails: [],
                add_email: '',
                primary_email: '',
                make_primary_email: '',
                profile_picture: '',
                password: '',
                language_id: '',
                loading: true,
                auth: '',
                rid: '',
                user_id: '',
                file: null,
                staticImg: true,
                dynamicImg: false,
                type: '',
                success: false,
                is_connected: '',
                is_password:'',
                newpassword: '',
                languageValue: '',
                errorNewPassword: '',
                delete_flag: '',
                error400: false,
                error400message: '',
                displaytext:'hide_block',
                emailError:'',
                is_disabled: true,
                btn_disabled: false,
                username: '',
                fname: false,
                fnamerror: '',
                validpass: true,
                emailError404:'',
                lname: false,
                lnameerror:''
            }
        }

        componentDidMount() {
            let _this=this;
            strings.setLanguage(localStorage.getItem("language_id"));
            (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s); js.id = id;
                js.src = url.SDK_JS_SRC;
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
                
            let auth = localStorage.getItem("auth");
            let user_id = localStorage.getItem("user_id");
            let language_id = localStorage.getItem("language_id");
            let rid = localStorage.getItem("rid");
            
            this.setState({
                language_id: language_id,
                rid: rid,
                user_id: user_id,
                auth: auth,
                emailError: strings.SIGNUP_FORM_EMAIL_ERR
            })
            if (localStorage.getItem("error400") == 'active') {
                this.setState({
                    error400: true,
                    error400message: localStorage.getItem('errMessage')
                });

                localStorage.removeItem("error400")
                localStorage.removeItem('errMessage')
            }
            if(auth) {
                fetch(`${url.BASE_URL}/getuserbasicinfo`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Credentials": true,
                        "x-api-key": url.X_API_KEY,
                        "user_id": user_id,
                        "language_id": language_id,
                        "Authorization": auth,
                        "rid": rid
                    },
                }).then(response => response.json().then(data => ({ status: response.status, body: data })))
                .then(data => {
                    window.scrollTo(0, 0)
                    this.setState({loading: false})
                    if(localStorage.getItem("success") === "success") {
                        this.setState({ success: true })
                        setTimeout(() => {
                            this.setState({
                                success: false
                            })
                        }, 2000,localStorage.removeItem("success"));
                        
                    }
                    this.props.handleUserProfilePic(data.body.picture_url)
                    if(data.status === 200) {
                        localStorage.setItem('user_profile_pic', data.body.picture_url)
                        localStorage.setItem("firstname", data.body.firstname)
                        if(localStorage.getItem("language_id")!=data.body.language_id){
                            this.props.commanHandler("updateLanguageId",data.body.language_id)
                        }
                        localStorage.setItem("language_id", data.body.language_id)
                        this.setState({
                            firstname: data.body.firstname,
                            username: data.body.firstname,
                            lastname: data.body.lastname,
                            emails: data.body.emails,
                            primary_email: data.body.primary_email,
                            language_id: data.body.language_id,
                            languageValue: data.body.language_id,
                            profile_picture: data.body.picture_url,
                            is_connected: data.body.is_connected,
                            is_password:data.body.is_password,
                            delete_flag: data.body.delete_flag
                        })
                    }
                    else {
                        this.props.commanHandler("error500");
                    }
                })
            } else {
                this.props.commanHandler("redirectToHome");
            }

            $(document).on( 'keyup', 'input', function(e) {
                let current_id=e.currentTarget.id;
                let current_name=e.currentTarget.name;
                let allEmail =  $('input[id="email_one"]').serializeArray();
                let emailArr = [];
                let emailValid=true;
                let span_no=[];
                if(current_id=="email_one" ){
                    let emailValid = e.currentTarget.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{1,})$/i);
                    if(!emailValid) {
                        $('#_404').css('display','none');
                        $('#'+current_name).css('display','block');
                    }else {
                        $('#'+current_name).css('display','none');
                    }
                    if(e.currentTarget.value==""){
                        $('#'+current_name).css('display','none');
                    }
                }
                _this.state.emails.forEach((data, index) => {
                    if(data.email!=undefined)
                        emailArr.push(data.email)
                })
                allEmail.forEach((val,key)=>{
                    if(val.value !=''){
                        emailArr.push(val.value)
                    }
                })
                for(let i=0; i<emailArr.length; i++){
                    emailValid = emailArr[i].match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{1,})$/i);
                    if(!emailValid) {
                        span_no.push(i);
                    }
                }
                
                if(span_no.length>0){
                        _this.setState({
                            btn_disabled: true
                        }); 
                }else{
                    if(_this.state.validpass == false || _this.state.fname == true || _this.state.lname == true)
                    {_this.setState({
                        btn_disabled: true
                    });}
                    else
                   { _this.setState({
                        btn_disabled: false
                    });}
                }
            });
        }

        redirectToSettingPrivacy(){
            localStorage.setItem("Settings", "Privacy")
        }
        BlankFeildHandler(e){
            if(e.target.name == "lastname"){
                 if (e.target.value.trim() == ''){
                    this.setState({
                        lname: true,
                        btn_disabled: true,
                        lnameerror :strings.SIGNUP_FORM_REQUIRED_L_NAME_ERR
                    })
                    
                }
                else {
                    this.setState({
                        lname: false,
                        btn_disabled: false,
                        lnameerror :""
                    })
                }
                if(this.state.lname == true){
                    this.setState({
                        btn_disabled: true,
                        lnameerror :strings.SIGNUP_FORM_REQUIRED_L_NAME_ERR
                    })
                    
                }
                 if(this.state.fname == true || this.state.lname == true ||this.state.validpass == false){
                        this.setState({
                            btn_disabled: true
                        })
                    }
                 
                 else{
                     this.setState({
                         btn_disabled: false
                     })
                 }
            }
            else if (e.target.value.trim() == '' ){
                this.setState({
                    fname: true,
                    fnamerror: strings.SIGNUP_FORM_REQUIRED_F_NAME_ERR,
                    btn_disabled:true
                })
            }
             else if (e.target.value == ''){
                  this.setState({
                      fname: true,
                      fnamerror: strings.SIGNUP_FORM_REQUIRED_F_NAME_ERR,
                      btn_disabled:true
                  })
              }
              else {
                  if(this.state.validpass == true){
                    if(this.state.lname == true) {
                        this.setState({
                            fname:false,
                            btn_disabled: true,
                          
                        })
                    }
                    else{
                        this.setState({
                            fname:false,
                            btn_disabled: false,
                          
                        })
                    }     
                  }
                  else if (this.state.validpass == false || this.state.lname == true){
                      this.setState({
                          fname:false,
                          btn_disabled: true,
                          
                      })
                  }
              }
        }

        handleChange = (e) => {
            this.setState({
                [e.target.name]: e.target.value
            })
            if(e.target.name == "add_email") {
                this.setState({
                    [e.target.name]: e.target.value
                })
            }    
            if(e.target.name == "lastname"){
                this.BlankFeildHandler(e)
            }
            if(e.target.name == "firstname"){
                this.BlankFeildHandler(e)
            }
            
            if(e.target.name == "password"){
                this.setState({
                    [e.target.name]: e.target.value
                })
                let passwordValid = $('#password').val().match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*.,/';?<>(){}[|+_-]{6,}$/)
                if (e.target.value.trim() == ''){
                    this.setState({
                        loading: false,
                        errorPassword: strings.SIGNUP_FORM_PASSWORD_ERR,
                        btn_disabled: true,
                        validpass : false
                      });
                }
                if(!passwordValid) {
                    this.setState({
                        loading: false,
                        errorPassword: strings.SIGNUP_FORM_PASSWORD_ERR,
                        btn_disabled: true,
                        validpass : false
                    });
                }
                else{        
                 if(this.state.fname == true || this.state.lname == true) {
                        this.setState({
                        errorPassword: "",
                        btn_disabled: true,
                        validpass : true
                      });
                     }
                     else if(this.state.fname ==false || this.state.lname == false ){
                        this.setState({
                            errorPassword: "",
                            btn_disabled: false,
                            validpass : true
                          });
                     }
                }
             if( $('#password').val() != undefined ){
                if( $('#password').val().replace(/\s/g).length == 0){
                    if(e.target.name == "firstname"){
                        if(e.target.value !=''){
                            this.setState({
                                errorPassword:'',
                                btn_disabled: false
                            });
                        }
                       if(e.target.value.trim() != ''){
                                this.setState({
                                    errorPassword:'',
                                    btn_disabled: false,
                                });
                        }
                    }
                    else {
                        if(this.state.fname == true) {
                            this.setState({
                            errorPassword: "",
                            btn_disabled: true,
                            validpass : true
                          });
                         }
                         else if(this.state.fname ==false ){
                            this.setState({
                                errorPassword: "",
                                btn_disabled: false,
                                validpass : true
                              });
                         }
                           else{
                            this.setState({
                            errorPassword:'',
                            btn_disabled: false
                        });}
                    } 
                }
                
                
          }
         }
        }
        deletePhoto = (e) => {
            e.preventDefault();
            this.setState({loading: true})
            if(this.state.auth) {
                fetch(`${url.BASE_URL}/deletepicture`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Credentials": true,
                        "x-api-key": url.X_API_KEY,
                        "user_id": this.state.user_id,
                        "Authorization": this.state.auth,
                        "rid": this.state.rid
                    }
                }).then(response => response.json().then(data => ({ status: response.status, body: data })))
                .then(data => {
                    if(data.status === 200) {
                        window.scrollTo(0, 0)
                        localStorage.setItem("Settings", "Basic Info");
                        localStorage.setItem("success", "success")
                        this.setState({
                            success: true,
                        })
                        window.location.reload();
                    }
                    else {
                        this.props.commanHandler("error500");
                    }
                })
            }else{
                this.props.commanHandler("redirectToHome");
            }
        }

        imageChange = (e) => {
            
            this.setState({loading: true})
            var validExtensions = ['jpg','png','jpeg'];
            var fileName = e.target.files[0].name;
            var fileNameExt = fileName.substr(fileName.lastIndexOf('.') + 1);
            fileNameExt = fileNameExt.toLowerCase();
            if ($.inArray(fileNameExt, validExtensions) == -1) {
                this.setState({
                    staticImg: true,
                    displaytext:'show_block',
                    imgErrorMessage:strings.SETTINGS_BASIC_INFO_UPLOAD_ERROR,
                    loading: false
                });
            }
            else if (e.target.files && e.target.files[0]) 
            {
                var base64 = new FileReader();
                base64.readAsDataURL(e.target.files[0]);
                base64.onload = () => {
                    this.setState({
                        type: fileNameExt,
                        displaytext:'hide_block',
                        imgErrorMessage:''
                    })

                    let data = {
                        picture_data: base64.result
                    }
                    if(this.state.auth) {
                    fetch(`${url.BASE_URL}/uploadpicture`, {
                        method: "PUT",
                        body: JSON.stringify(data),
                        headers: {
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Credentials": true,
                            "x-api-key": url.X_API_KEY,
                            "user_id": this.state.user_id,
                            "Authorization": this.state.auth,
                            "rid": this.state.rid
                        }
                    }).then(response => response.json().then(data => ({ status: response.status, body: data })))
                    .then(data => {
                        
                        if(data.status === 200) {
                            window.scrollTo(0, 0)
                            this.setState({
                                profile_picture: data.body.profile_picture,
                                success: true,
                            })
                            localStorage.setItem("Settings", "Basic Info");
                            localStorage.setItem("success", "success")
                            window.location.reload();
                        }else if(data.status === 400){
                            this.setState({
                                staticImg: true,
                                displaytext:'show_block',
                                imgErrorMessage:data.body.message, 
                                loading: false
                            });
                        }
                        else {
                            this.props.commanHandler("error500");
                        }
                    })}else{
                        this.props.commanHandler("redirectToHome");
                    }
                }
                this.setState({
                    file: URL.createObjectURL(e.target.files[0]),
                    staticImg: false,
                    dynamicImg: true
                })
            }
        }

        deleteEmail = (e) => {
            this.setState({loading: true})
            let email = e
            var data = {
                email: email
            }

            if(this.state.auth){
            fetch(`${url.BASE_URL}/deleteemail`, {
                method: "DELETE",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                    "x-api-key": url.X_API_KEY,
                    "user_id": this.state.user_id,
                    "Authorization": this.state.auth,
                    "rid": this.state.rid
                }
            }).then(response => response.json().then(data => ({ status: response.status, body: data })))
            .then(data => {
                if(data.status === 200) {
                    localStorage.setItem("Settings", "Basic Info");
                    localStorage.setItem("success", "success")
                    window.scrollTo(0, 0)
                    this.setState({
                        success: true,
                    })
                    window.location.reload();
                }
                else {
                    this.props.commanHandler("error500");
                }
            })}else{
                this.props.commanHandler("redirectToHome");
            }
        }

        primaryEmail = (e) => {
            this.setState({loading: true})
            let email = e
            var data = {
                email: email
            }

            if(this.state.auth){
            fetch(`${url.BASE_URL}/updateprimaryemail`, {
                method: "PUT",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                    "x-api-key": url.X_API_KEY,
                    "user_id": this.state.user_id,
                    "Authorization": this.state.auth,
                    "rid": this.state.rid
                }
            }).then(response => response.json().then(data => ({ status: response.status, body: data })))
            .then(data => {
                if(data.status === 200) {
                    localStorage.setItem("Settings", "Basic Info");
                    localStorage.setItem("success", "success")
                    window.scrollTo(0, 0)
                    this.setState({
                        success: true,
                    })
                    window.location.reload();
                }
                else {
                    this.props.commanHandler("error500");
                }
            })}else{
                this.props.commanHandler("redirectToHome");
            }
        }

        handleSubmit = (e) => {
            e.preventDefault();
            let count=0
            let allEmail =  $('input[id="email_one"]').serializeArray();
            let emailArr = [];
            this.state.emails.forEach((data, index) => {
                if(data.email!=undefined)
                    emailArr.push(data.email)
            })
            if(allEmail.length==1 && allEmail[0].value==""){
                emailArr=''
            }else{
                allEmail.forEach((val,key)=>{
                    if(val.value !=''){
                        emailArr.push(val.value)
                        count=count+1;
                    }
                })
                if(count==0){
                    emailArr=''
                }
            }
            var data = {
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                primary_email: this.state.primary_email,
                emails: emailArr,
                password: this.state.password,
                language_id: this.state.languageValue
            }
            this.setState({loading: true})
            if(this.state.auth){
            fetch(`${url.BASE_URL}/updateuserbasicinfo`, {
                method: "PUT",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                    "x-api-key": url.X_API_KEY,
                    "user_id": this.state.user_id,
                    "Authorization": this.state.auth,
                    "rid": this.state.rid
                }
            }).then(response => response.json().then(data => ({ status: response.status, body: data })))
            .then(data => {
                if(data.status === 200) {
                    localStorage.setItem("Settings", "Basic Info");
                    localStorage.setItem("language_id", data.body.language_id)
                    localStorage.setItem("success", "success")
                    this.setState({emailError:''})
                    $('#_404').css('display','none');
                    window.location.reload();
                }else if(data.status === 400) {
                    this.setState({emailError404: data.body.message, loading:false})
                    $('#_404').css('display','block');
                }else {
                    this.props.commanHandler("error500");
                }
            })}else{
                this.props.commanHandler("redirectToHome");
            }
        }

        newpassword = (e) => {
            this.setState({
                [e.target.name]: e.target.value
            })
            let newpasswordValid = $('#newpassword').val().match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*.,/';?<>(){}[|+_-]{6,}$/);
            if(!newpasswordValid) {
                this.setState({
                    loading: false,
                    is_disabled: true,
                    errorNewPassword: strings.SETTINGS_BASIC_INFO_SETTINGS_PASSWORD_ERR
                });
            }else{
                this.setState({
                    errorNewPassword: "",
                    is_disabled: false
                });
            }
        }

        handleImage = () => {
            jQuery('#my-photo').click()
        }

        handlePassword = (e) => {
            e.preventDefault();
            let data = {
                newpassword: this.state.newpassword
            }
            let newpassword = this.state.newpassword.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*.,/';?<>(){}[|+_-]{6,}$/);
            if(newpassword) {
                if(this.state.auth){
                fetch(`${url.BASE_URL}/changepassword`, {
                    method: "PUT",
                    body: JSON.stringify(data),
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Credentials": true,
                        "x-api-key": url.X_API_KEY,
                        "user_id": this.state.user_id,
                        "Authorization": this.state.auth,
                        "rid": this.state.rid
                    }
                }).then(response => response.json().then(data => ({ status: response.status, body: data })))
                .then(data => {
                    if(data.status === 200) {
                        this.setState({
                            success: true,
                        })
                        this.disconnectFacebook();
                    }
                    else {
                        this.props.commanHandler("error500");
                    }
                })}else{
                    this.props.commanHandler("redirectToHome");
                }
            }    
            else {
                this.setState({
                    errorNewPassword: strings.SETTINGS_BASIC_INFO_SETTINGS_PASSWORD_ERR,
                    newpassword: ''
                });
            }  
        }

        disconnectFacebook = () =>{
            localStorage.setItem("Settings", "Basic Info");
            if(this.state.is_password){
                this.setState({loading:true})
            }else{
                this.setState({loading:false})
            }
            fetch(`${url.BASE_URL}/facebookdisconnect`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                    "x-api-key": url.X_API_KEY,
                    "user_id": this.state.user_id,
                    "Authorization": this.state.auth,
                    "rid": this.state.rid
                }
            }).then(response => response.json().then(data => ({ status: response.status, body: data })))
            .then(data => {
                if(data.status === 200) {
                    localStorage.setItem("Settings", "Basic Info");
                    window.scrollTo(0, 0)
                    window.location.reload();
                }
                else {
                    this.setState({loading:false})
                    this.props.commanHandler("error500");
                }
            })
        }


        render() {

            strings.setLanguage(this.state.language_id);

            let fbBtnWidth = isMobile ? url.FACEBOOKBTNMOBILE : url.FACEBOOKBTNWEB;
            let fbBtnDivWidth = isMobile ? url.FACEBOOKBTNDIVMOBILE : url.FACEBOOKBTNDIVWEB;
            let headContent = linkHeader.map((lin, index) => {
                return (
                    <link key={index} rel={lin.rel} hreflang={lin.hreflang} href={url.ORIGIN_URL+lin.href+"settings"}/>
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
                            {this.state.success &&
                            <div className="settings-alert">
                                <i className="fa fa-check-circle"></i>
                                <strong>{ strings.SETTINGS_SAVEDBTN}</strong>
                            </div>
                            }
                            <div className="settings-info__header text-center">
                                <div className="dropdown dropdown-email-opt dropdown-photo-opt">
                                    <input type="file" id="my-photo" name="files" accept="image/*" onChange={this.imageChange} className="d-none" />
                                    <a href="#" className="dropdown-toggle" type="button" data-toggle="dropdown" data-offset="-11,0">
                                    { this.state.staticImg &&
                                        <img src={ this.state.profile_picture ? this.state.profile_picture+"#" + new Date().getTime() : commander } alt="staticImg" />   
                                    }
                                    { this.state.dynamicImg &&  
                                        <img src={this.state.file+"#" + new Date().getTime()} alt="dynamicImg" />
                                    }    
                                    </a>
                                    { (this.state.displaytext == 'show_block' ? <span className="error">{this.state.imgErrorMessage}</span>:'')}
                                    
                                    <div className="dropdown-menu dropdown-menu-right">
                                        <Link className="dropdown-item" to="#" onClick={this.handleImage}>
                                            {renderHTML(strings.SETTINGS_BASIC_INFO_UPLOAD_OPTION_1)}
                                            <input type="file" id="file" ref="fileUploader" style={{display: "none"}} />
                                        </Link>
                                        {this.state.delete_flag == 1 &&
                                        <Link className="dropdown-item" to="#" onClick={this.deletePhoto}>
                                            {renderHTML(strings.SETTINGS_BASIC_INFO_UPLOAD_OPTION_2)}
                                        </Link>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="settings-info__form">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group form-group-name row">
                                        <label className="col-sm-4 col-form-label">{strings.SETTINGS_BASIC_INFO_F_NAME}</label>
                                        <div className="col-sm-8">
                                            <input type="text" name="firstname" value={this.state.firstname} onChange={this.handleChange} className="form-control" id="firstname" />
                                           {
                                               this.state.fname ? <span className="email-exist-err">{this.state.fnamerror}</span>:""
                                           }
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-4 col-form-label">{strings.SETTINGS_BASIC_INFO_L_NAME}</label>
                                        <div className="col-sm-8">
                                            <input type="text" name="lastname" value={this.state.lastname} onChange={this.handleChange} className="form-control" id="lastname" />
                                            {
                                                this.state.lname ? <span className="email-exist-err">{this.state.lnameerror}</span>: ""
                                            }
                                        </div>
                                    </div>
                                    {this.state.is_connected ?
                                        <div className="form-group form-group-email row">
                                            <label className="col-sm-4 col-form-label">{strings.SETTINGS_BASIC_INFO_P_EMAIL}</label>
                                            <div className="col-sm-8">
                                                <div className="dropdown dropdown-email-opt primary">
                                                    <input type="email" name="primary_email" value={this.state.primary_email} onChange={this.handleChange} readOnly="readonly" className="form-control" id="primary_email" />
                                                </div>
                                                {this.state.emails.map((data, index) => {
                                                    return (
                                                        <div className="dropdown dropdown-email-opt" key={index}>
                                                            <input type="email" className="form-control" name="make_primary_email" value={data.email} onChange={this.handleChange} readOnly="readonly" />
                                                            <button className="dropdown-toggle" type="button" data-toggle="dropdown" data-offset="28,12">
                                                                <span></span><span></span><span></span>
                                                            </button>
                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                <a className="dropdown-item delete-email" href="#" onClick={() => this.deleteEmail(data.email)}>
                                                                    {renderHTML(strings.SETTINGS_BASIC_INFO_P_EMAIL_POPUP_OPTION_1)}
                                                                </a>
                                                                <a className="dropdown-item" href="#" onClick={() => this.primaryEmail(data.email)}>
                                                                    {renderHTML(strings.SETTINGS_BASIC_INFO_P_EMAIL_POPUP_OPTION_2)}
                                                                </a>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                                <div className="dropdown dropdown-email-opt cloneable">
                                                <input type="text" name="add_email" id="email_one" value={this.state.add_email} onChange={this.handleChange} className="form-control cloneable" placeholder={strings.SETTINGS_BASIC_INFO_SEC_EMAIL_PLACEHOLDER} />
                                                <span className="email-err-dynamic" id="add_email">{this.state.emailError}</span>
                                                <span className="email-err-dynamic" id="_404">{this.state.emailError404}</span>
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        <div className="form-group form-group-email row">
                                            <label className="col-sm-4 col-form-label">{strings.SETTINGS_BASIC_INFO_P_EMAIL} {renderHTML(strings.SETTINGS_BASIC_INFO_P_EMAIL_PLACEHOLDER)}</label>
                                            <div className="col-sm-8">
                                                <div className="dropdown dropdown-email-opt primary">
                                                    <input type="email" name="primary_email" value={this.state.primary_email} onChange={this.handleChange} readOnly="readonly" className="form-control" id="primary_email" />
                                                </div>
                                               {this.state.emails.map((data, index) => {
                                                    return (
                                                        <div className="dropdown dropdown-email-opt" key={index}>
                                                            <input type="email" className="form-control" name="make_primary_email" value={data.email} onChange={this.handleChange} readOnly="readonly" />
                                                            <button className="dropdown-toggle" type="button" data-toggle="dropdown" data-offset="28,12">
                                                                <span></span><span></span><span></span>
                                                            </button>
                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                <a className="dropdown-item delete-email" href="#" onClick={() => this.deleteEmail(data.email)}>
                                                                    {renderHTML(strings.SETTINGS_BASIC_INFO_P_EMAIL_POPUP_OPTION_1)}
                                                                </a>
                                                                <a className="dropdown-item" href="#" onClick={() => this.primaryEmail(data.email)}>
                                                                    {renderHTML(strings.SETTINGS_BASIC_INFO_P_EMAIL_POPUP_OPTION_2)}
                                                                </a>
                                                            </div>
                                                        </div>
                                                        )
                                                    })}
                                                    <div className="dropdown dropdown-email-opt cloneable" >
                                                    <input type="text" name="add_email" id="email_one" value={this.state.add_email} onChange={this.handleChange} className="form-control cloneable" placeholder={strings.SETTINGS_BASIC_INFO_SEC_EMAIL_PLACEHOLDER} />
                                                    <span className="email-err-dynamic" id="add_email">{this.state.emailError}</span>
                                                    <span className="email-err-dynamic" id="_404">{this.state.emailError404}</span>
                                                    </div>
                                            </div>
                                        </div>
                                    }
                                    {!this.state.is_connected &&
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label">{strings.SETTINGS_BASIC_INFO_PASSWORD}</label>
                                            <div className="col-sm-8">
                                                <input type="password" name="password" value={this.state.password} onChange={this.handleChange} id="password" className="form-control" placeholder={strings.SETTINGS_BASIC_INFO_PASSWORD_PLACEHOLDER} />
                                                { this.state.errorPassword ? <span className="email-exist-err">{this.state.errorPassword}</span> : "" }
                                            </div>
                                        </div>
                                    }
                                    <div className="form-group row">
                                        <label className="col-sm-4 col-form-label">{strings.SETTINGS_BASIC_INFO_LANGUAGE}</label>
                                        <div className="col-sm-8">
                                            <div className="select-field-wrap">
                                                <select value={this.state.languageValue} onChange={(e) => this.setState({ languageValue: e.target.value })} className="form-control" id="language_select">
                                                    {country.language_id_name_mapping && country.language_id_name_mapping.map(data => {
                                                        return (
                                                            <option key={data.id} value={data.id}>{data.name}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-4 col-form-label">{ this.state.is_connected ? strings.SETTINGS_BASIC_INFO_FB : strings.SETTINGS_BASIC_INFO_TO_CONNECT_FB}</label>
                                        <div className="col-sm-8">
                                            {this.state.is_connected ?
                                                <div>
                                                    <a href="#" className="settings-connectfb-btn">
                                                        <img src={this.state.profile_picture ? this.state.profile_picture : commander} key={this.state.profile_picture ? this.state.profile_picture : commander} alt="" />
                                                        <i className="fa fa-facebook-square" aria-hidden="true"></i><strong>{strings.formatString(strings.SETTINGS_BASIC_INFO_CONNECTED_FB, this.state.username)}</strong>
                                                    </a><a href="#disconnectfb" className="settings-disconnectfb-btn" data-toggle="modal"><strong>{strings.SETTINGS_BASIC_INFO_DISCONNECT_FB}</strong></a>
                                                </div>
                                                :
                                                <div>
                                                    <a href={url.FACEBOOK_PROFILE_SETTING_LOGIN_URL} style={{ width: fbBtnDivWidth, height: "40px", zIndex: 3, position: "absolute", backgroundColor: "transparent" }}></a>
                                                    <div className="fb-login-button" data-width={fbBtnWidth} data-size="large" data-button-type="continue_with" data-auto-logout-link="false" data-use-continue-as="true"></div>
                                                    {
                                                        this.state.error400 ? <div style={{ color: "#aaaaaa", padding: "18px 0px 8px" }}>
                                                            <p style={{ fontSize: "14px" }}>{this.state.error400message}</p>
                                                        </div> : ""
                                                    }
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <div className="form-group-submit">
                                        <button type="submit" disabled={this.state.btn_disabled} className="settings-btn-green"><strong>{strings.SETTINGS_SAVEBTN}</strong></button>
                                    </div>
                                </form>
                            </div> 
                        </div>
                    </div>
                    <div className="settings-modal modal fade" id="disconnectfb" role="dialog">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-body" onClick={this.redirectToSettingPrivacy}>
                                    <i className="fa fa-exclamation-triangle"></i>
                                    {renderHTML(strings.SETTINGS_BASIC_INFO_DISCONNECT_FB_DESC)}
                                </div>
                                <div className="modal-footer">
                                    <a href="#" className="settings-btn-green" data-dismiss="modal"><strong>{ strings.SETTINGS_NEVERMIND}</strong></a>
                                    {this.state.is_password ?
                                    <a href="#" onClick={this.disconnectFacebook} className="modal-btn-link" data-toggle="modal"><strong>{ strings.SETTINGS_BASIC_INFO_FB_DIS_ACCEPT}</strong></a>
                                    :
                                    <a href="#setpassword" className="modal-btn-link" data-toggle="modal"><strong>{ strings.SETTINGS_BASIC_INFO_FB_DIS_ACCEPT}</strong></a>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="settings-modal modal fade" id="setpassword" role="dialog">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-body">
                                    {renderHTML(strings.SETTINGS_BASIC_INFO_ADD_PASSWORD_DESC)}
                                    <form onSubmit={this.handlePassword}>
                                        <div className="form-group">
                                            <input type="password" name="newpassword" value={this.state.newpassword} onChange={this.newpassword} id="newpassword" placeholder={strings.SETTINGS_BASIC_INFO_ADD_PASSWORD_PLACEHOLDER} className="form-control" />
                                            { this.state.errorNewPassword ? <span className="error">{this.state.errorNewPassword}</span> : "" }
                                        </div>
                                        <button type="submit" disabled={this.state.is_disabled} className="settings-btn-green"><strong>{ strings.SETTINGS_BASIC_INFO_SAVEBTN}</strong></button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    export default BasicInfo;
