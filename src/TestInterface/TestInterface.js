import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import $ from 'jquery';
import '../Assets/css/testinterface.css';
import signup_logo_small from '../Assets/images/v2/signup-logo-small.svg';
import LocalizedStrings from 'react-localization';
import { language } from '../Components/Language';
import url from '../CommonComponent/CommonURL';
import linkHeader from '../CommonComponent/Link';
import InterpersonalityReport from './InterpersonalityReport';

let strings = new LocalizedStrings(language);

class TestInterface extends Component {
    constructor(props) { 
        super(props);
        this.state = {
            email: '',
            password: '',
            emailErrorMessage: '',
            passwordErrorMessage: '',
            serverErrorMessage: '',
            language_id: "",
            loading: true,
            activePage: "testinterface",
            test_token: '',
            loginTestInterfaceResponse: '',
            interpersonalReportResponse: '',
            userProfilesReportResponse: '',
            guidesReportResponse: ''
        }
    }

    componentDidMount() {
        let language_id = localStorage.getItem("language_id");
        this.setState({
            language_id: language_id,
            loading: false
        })

    }

    emailChange = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    passwordChange = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    doApiCall = (apiPath, methodType, stateName, bodyData, apiParam=null, callback=null)=>{
        let apiHeaders = {};
        if(apiParam != null){
            apiHeaders = apiParam;
        }
        apiHeaders['Content-Type']= 'application/json';
        apiHeaders['Access-Control-Allow-Origin']= '*';
        apiHeaders['Access-Control-Allow-Credentials']= true;
        apiHeaders['x-api-key']=url.X_API_KEY;
    
        fetch(`${url.BASE_URL}`+apiPath, {
            method: methodType,
            body: JSON.stringify(bodyData),
            headers: apiHeaders,
        }).then(response => response.json().then(data => ({ status: response.status, body: data })))
        .then(data => {
            this.setState({loading: false})
            if(data.status === 200) {
                this.setState({
                    [stateName]: data.body
                },()=>{
                    if(callback != null){
                        callback(data.body)
                    }
                })
            } else if(data.status === 400) {
                this.setState({
                    serverErrorMessage: data.body.message,
                    passwordErrorMessage: '',
                    emailErrorMessage: '',
                    email: '',
                    password: ''
                })
            } else if(data.status === 403) {
                this.props.commanHandler("error500");
            }
            else {
                this.props.commanHandler("error500");
            }
        })
    }

    handleInterpersonalReportResponse = (response) => {
        //Empty the table first
        $("#test-table").empty();

        var buildName1 ="<thead><tr><th colspan=\"6\" style=\"text-align: center;\">Similarity Score: "+response.similarity_score+"%</th></tr></thead>";

        $("#test-table").append(buildName1);                    

        var buildName2 ="<tbody><tr><th scope=\"col\">Theme</th><th scope=\"col\">Comparison</th><th scope=\"col\">User 1 Style</th><th scope=\"col\">User 1 Content</th><th scope=\"col\">User 2 Style</th><th scope=\"col\">User 2 Content</th></tr></thead>";

        $("#test-table").append(buildName2);
        for (let i = 0; i < response.user_1.length; i++) {
            var baseTable ="<tbody><td>"+response.theme[i]+"</td><td>"+response.comparison[i]+"</td><td>"+response.user_1[i]+"</td><td>"+response.user_1_content[i]+"</td><td>"+response.user_2[i]+"</td><td>"+response.user_2_content[i]+"</td></tbody>";
            $("#test-table").append(baseTable);
        }
    }

    handleInterpersonalAPICall = (bodyData) => {
        this.setState({serverErrorMessage: ""})
        $("#test-table").empty();
        let apiParams = {
            "test_token": this.state.test_token
        };
        this.doApiCall("/interpersonalreport", "POST", "interpersonalReportResponse", bodyData, apiParams, this.handleInterpersonalReportResponse);  
    }

    handleFilteredReportResponse = (response) => {

        for(var i = 0; i < response.current_report_content.length; i++) {
            var obj = response.current_report_content[i];
            if (obj.Illustration === 1) {
                obj.Content = "Illustration: " + obj.Content;
            }
        }

        for(let i = 0; i < response.extended_report_content.length; i++) {
            var obj = response.extended_report_content[i];
            if (obj.Illustration === 1) {
                obj.Content = "Illustration: " + obj.Content;
            }
        }

        var sectionMap = new Map();
        var sectionNameMap = new Map();
        var storyMap = new Map();
        var contentMap = new Map();
        var storyId = new Map();
        var sectionRowSpan = new Map();

        sectionNameMap.set("0", "Summary");
        sectionNameMap.set("1", "Introduction");
        sectionNameMap.set("2", "Romantic Relationships");
        sectionNameMap.set("3", "Career Path");
        sectionNameMap.set("4", "Lifestyle");
        sectionNameMap.set("5", "At Work");
        
        response.current_report_content.forEach(testFunction);
        var styleCodeValue = ""
        var contentValue = ""

        function testFunction(value, index, array) {              
            styleCodeValue = storyMap.get(value.Section+"_"+value.Story);
            contentValue = contentMap.get(value.Section+"_"+value.Story);
            if(styleCodeValue === undefined)
                styleCodeValue = ""

            if(contentValue === undefined)
                contentValue = ""
                styleCodeValue = styleCodeValue + value.Number + ", ";
                contentValue = contentValue + value.Content + "  ";
                sectionMap.set(value.Section+"_"+value.Story, value.Story); 
                storyMap.set(value.Section+"_"+value.Story,styleCodeValue);
                contentMap.set(value.Section+"_"+value.Story,contentValue); 
                storyId.set(value.Story,"StoryUniqueId");
        }
        var sectionNameMapKeys = sectionNameMap.keys();
        for(var sectionNameElement of sectionNameMapKeys){
            var count = 0;
            var storyIdKeys = Array.from( storyId.keys() )
            storyIdKeys.sort()
            for(var storyElement of storyIdKeys){
                if(sectionMap.get(sectionNameElement+"_"+storyElement) !== undefined){
                    count = count + 1;
                    sectionRowSpan.set(sectionNameElement,count)
                }                
            }
        }
        //Empty the table first
        $("#test-table1_r").empty();

        var buildName0 ="<thead><tr><th colspan=\"4\" scope=\"col\"><h3>Main Report Content</h3></th></tr></thead>";
        var buildName ="<thead><tr><th scope=\"col\">Section</th><th scope=\"col\">Story</th><th scope=\"col\">Style Code</th><th scope=\"col\">Style Content</th></tr></thead>";
        var sectionNameMapKeys = sectionNameMap.keys();
        var sectionNameValue = "";
        var rowSpanValue = "";
        var storyValue = "";
        var styleCodeValue = "";
        var baseTable = "";
        var baseTable1 = "";

        for(var sectionNameElement of sectionNameMapKeys){
            var count = 0;
            sectionNameValue = sectionNameMap.get(sectionNameElement);
            var storyIdKeys = Array.from( storyId.keys() )
            storyIdKeys.sort()
            for(var storyElement of storyIdKeys){
                if(sectionMap.get(sectionNameElement+"_"+storyElement) !== undefined){
                    count = count + 1;
                    storyValue = storyElement;
                    rowSpanValue = sectionRowSpan.get(sectionNameElement);
                    styleCodeValue = storyMap.get(sectionNameElement+"_"+storyElement);
                    let content = contentMap.get(sectionNameElement+"_"+storyElement);
            
            
                    if(count === 1){

                        baseTable1 = baseTable1 + "<tr><td rowspan="+rowSpanValue+">"+sectionNameValue+"</td><td>"+storyValue+"</td><td>"+styleCodeValue.substring(0, styleCodeValue.length - 2)+"</td><td>"+content.substring(0, content.length - 2)+"</td></tr>";
                    }else{
                        baseTable1 = baseTable1 + "<tr><td>"+storyValue+"</td><td>"+styleCodeValue.substring(0, styleCodeValue.length - 2)+"</td><td>"+content.substring(0, content.length - 2)+"</td></tr>";    
                    }
                }   
                baseTable = baseTable1;
            }
            baseTable = baseTable1;                    
        } 

        document.getElementById("test-table1_r").style.display="inherit";
        $("#test-table1_r").append(buildName0 + buildName + baseTable);

        if ((response.extended_report_content).length > 0) {

            var sectionMap = new Map();
            var sectionNameMap = new Map();
            var storyMap = new Map();
            var contentMap = new Map();
            var storyId = new Map();
            var sectionRowSpan = new Map();

            sectionNameMap.set("0", "Summary");
            sectionNameMap.set("1", "Introduction");
            sectionNameMap.set("2", "Romantic Relationships");
            sectionNameMap.set("3", "Career Path");
            sectionNameMap.set("4", "Lifestyle");
            sectionNameMap.set("5", "At Work");
            response.extended_report_content.forEach(testFunction_r1);
            var styleCodeValue_r1 = ""
            var contentValue_r1 = ""

            function testFunction_r1(value, index, array) {

                styleCodeValue_r1 = storyMap.get(value.Section + "_" + value.Story);
                contentValue_r1 = contentMap.get(value.Section + "_" + value.Story);

                if (styleCodeValue_r1 === undefined)
                    styleCodeValue_r1 = ""

                if (contentValue_r1 === undefined)
                    contentValue_r1 = ""

                styleCodeValue_r1 = styleCodeValue_r1 + value.Number + ", ";
                contentValue_r1 = contentValue_r1 + value.Content + "  ";

                sectionMap.set(value.Section + "_" + value.Story, value.Story);
                storyMap.set(value.Section + "_" + value.Story, styleCodeValue_r1);
                contentMap.set(value.Section + "_" + value.Story, contentValue_r1);
                storyId.set(value.Story, "StoryUniqueId");
            }


            var sectionNameMapKeys_r1 = sectionNameMap.keys();

            for (var sectionNameElement_r1 of sectionNameMapKeys_r1) {
                var count = 0;                       
                var storyIdKeys = Array.from(storyId.keys())
                storyIdKeys.sort()
                for (var storyElement of storyIdKeys) {
                    if (sectionMap.get(sectionNameElement_r1 + "_" + storyElement) !== undefined) {
                        count = count + 1;
                        sectionRowSpan.set(sectionNameElement_r1, count)
                    }
                }
            }

            //Empty the table first
            $("#test-table1_r1").empty();

            var buildName0 ="<thead><tr><th colspan=\"4\" scope=\"col\"><h3>Extended Report Content</h3></th></tr></thead>";
            var buildName_r1 = "<thead><tr><th scope=\"col\">Section</th><th scope=\"col\">Story</th><th scope=\"col\">Style Code</th><th scope=\"col\">Style Content</th></tr></thead>";
            var sectionNameMapKeys_r1 = sectionNameMap.keys();
            var sectionNameValue_r1 = "";
            var rowSpanValue_r1 = "";
            var storyValue_r1 = "";
            var styleCodeValue_r1 = "";
            var baseTable_r1 = "";
            for (var sectionNameElement_r1 of sectionNameMapKeys_r1) {
                var count = 0;
                sectionNameValue_r1 = sectionNameMap.get(sectionNameElement_r1);
                var storyIdKeys = Array.from(storyId.keys())
                storyIdKeys.sort()
                for (var storyElement of storyIdKeys) {
                    if (sectionMap.get(sectionNameElement_r1 + "_" + storyElement) !== undefined) {
                        count = count + 1;
                        storyValue_r1 = storyElement;
                        rowSpanValue_r1 = sectionRowSpan.get(sectionNameElement_r1);
                        styleCodeValue_r1 = storyMap.get(sectionNameElement_r1 + "_" + storyElement);
                        let content = contentMap.get(sectionNameElement_r1 + "_" + storyElement);

                        if (count === 1) {
                            baseTable_r1 = baseTable_r1 + "<tr><td rowspan=" + rowSpanValue_r1 + ">" + sectionNameValue_r1 + "</td><td>" + storyValue_r1 + "</td><td>" + styleCodeValue_r1.substring(0, styleCodeValue_r1.length - 2) + "</td><td>" + content.substring(0, content.length - 2) + "</td></tr>";
                        } else {
                            baseTable_r1 = baseTable_r1 + "<tr><td>" + storyValue_r1 + "</td><td>" + styleCodeValue_r1.substring(0, styleCodeValue_r1.length - 2) + "</td><td>" + content.substring(0, content.length - 2) + "</td></tr>";
                        }
                    }
                    baseTable_r1 = baseTable_r1;
                }
                baseTable_r1 = baseTable_r1;
            }
            document.getElementById("test-table1_r1").style.display="inherit";
            $("#test-table1_r1").append( buildName0 + buildName_r1 + baseTable_r1);

        }    

        if ((response.share_module_report_content).length > 0 ) {
            var sectionMap = new Map();
            var sectionNameMap = new Map();
            var storyMap = new Map();
            var contentMap = new Map();
            var storyId = new Map();
            var sectionRowSpan = new Map();

            sectionNameMap.set("0", "Summary");
            sectionNameMap.set("1", "Introduction");
            sectionNameMap.set("2", "Romantic Relationships");
            sectionNameMap.set("3", "Career Path");
            sectionNameMap.set("4", "Lifestyle");
            sectionNameMap.set("5", "At Work");


            response.share_module_report_content.forEach(testFunction22);
            var styleCodeValue = ""
            var contentValue = ""
            function testFunction22(value, index, array) {              
                styleCodeValue = storyMap.get(value.Section+"_"+value.Story);
                contentValue = contentMap.get(value.Section+"_"+value.Story);
                if(styleCodeValue === undefined)
                    styleCodeValue = ""

                if(contentValue === undefined)
                    contentValue = ""
                styleCodeValue = styleCodeValue + value.Number + ", ";
                contentValue = contentValue + value.Content + "  "; 
                sectionMap.set(value.Section+"_"+value.Story, value.Story); 
                storyMap.set(value.Section+"_"+value.Story,styleCodeValue);
                contentMap.set(value.Section+"_"+value.Story,contentValue); 
                storyId.set(value.Story,"StoryUniqueId");
            }

            var sectionNameMapKeys = sectionNameMap.keys();
            for(var sectionNameElement of sectionNameMapKeys){
                var count = 0;                        
                var storyIdKeys = Array.from( storyId.keys() )
                storyIdKeys.sort()
                for(var storyElement of storyIdKeys){
                    if(sectionMap.get(sectionNameElement+"_"+storyElement) !== undefined){
                        count = count + 1;
                        sectionRowSpan.set(sectionNameElement,count)
                    }                
                }
            }  
            //Empty the table first
            $("#test-table1_r22").empty();

            var buildName0 ="<thead><tr><th colspan=\"4\" scope=\"col\"><h3>Share CTA Module</h3></th></tr></thead>";
            var buildName ="<thead><tr><th scope=\"col\">Section</th><th scope=\"col\">Style Content</th></tr></thead>";
            var sectionNameMapKeys = sectionNameMap.keys();
            var sectionNameValue = "";
            var rowSpanValue = "";
            var storyValue = "";
            var styleCodeValue = "";
            var baseTable = "";
            var baseTable1 = "";
            for(var sectionNameElement of sectionNameMapKeys){
                var count = 0;
                sectionNameValue = sectionNameMap.get(sectionNameElement);
            
                var storyIdKeys = Array.from( storyId.keys() )
                storyIdKeys.sort()
                for(var storyElement of storyIdKeys){
                    if(sectionMap.get(sectionNameElement+"_"+storyElement) !== undefined){
                        count = count + 1;
                        storyValue = storyElement;
                        rowSpanValue = sectionRowSpan.get(sectionNameElement);
                        styleCodeValue = storyMap.get(sectionNameElement+"_"+storyElement);
                        let content = contentMap.get(sectionNameElement+"_"+storyElement);

                        if(count === 1){
                            baseTable1 = baseTable1 + "<tr><td rowspan="+rowSpanValue+">"+sectionNameValue+"</td><td>"+content.substring(0, content.length - 2)+"</td></tr>";
                        }else{
                            baseTable1 = baseTable1 + "<tr><td>"+content.substring(0, content.length - 2)+"</td></tr>";    
                        }
                    }   
                    baseTable = baseTable1;
                }
                baseTable = baseTable1;                    
            } 
            $("#test-table1_r22").append(buildName0 + buildName + baseTable);  
            document.getElementById("test-table1_r22").style.display="inherit";
        }
    }

    handleFilteredAPICall = (bodyData) => {
        this.setState({serverErrorMessage: ""})
        $("#test-table1_r").empty();
        $("#test-table1_r1").empty();
        $("#test-table1_r22").empty();
        let apiParams = {
            "test_token": this.state.test_token
        };
        this.doApiCall("/generateuserprofilereport", "POST", "userProfilesReportResponse", bodyData, apiParams, this.handleFilteredReportResponse);
    }

    handleGuidesReportResponse = (response) => {
        // //Empty the table first
        $("#guides-table").empty();
        var table_headings = "<tbody><tr><th scope=\"col\">Section No.</th><th scope=\"col\">Theme No.</th><th scope=\"col\">Theme Name</th><th scope=\"col\">User 1 Style Code</th><th scope=\"col\">User 2 Style Code</th><th scope=\"col\">Preframe</th><th scope=\"col\">User 1 Text</th><th scope=\"col\">User 2 Text</th><th scope=\"col\">Outro</th></tr></thead>";
        $("#guides-table").append(table_headings);

        let getsectionCount = response.guides_report;
        var section_temp = -100;
        for (let i = 0; i < response.guides_report.length; i++) {
            if (response.guides_report[i].section !== section_temp) {
                var numsection = getsectionCount.reduce(function (n, getsectionCount) {
                    return n + (getsectionCount.section === response.guides_report[i].section);
                }, 0);
                if (response.guides_report[i].section === 0) {
                    var baseTable = "<tbody><td rowspan=" + numsection + ">" + response.guides_report[i].section + "</td><td>" + response.guides_report[i].theme_id + "</td><td>N/A</td><td>"
                        + response.guides_report[i].user_1_style + "</td><td>" + response.guides_report[i].user_2_style + "</td><td>N/A</td><td>" + response.guides_report[i].content + "</td><td>N/A</td><td>N/A</td></tbody>";
                } else {
                    var baseTable = "<tbody><td rowspan=" + numsection + ">" + response.guides_report[i].section + "</td><td>" + response.guides_report[i].theme_id + "</td><td>" + response.guides_report[i].theme_name + "</td>" +
                        "<td>" + response.guides_report[i].user_1_style + "</td><td>" + response.guides_report[i].user_2_style + "</td><td>" + response.guides_report[i].preframe_style + "</td><td>" + response.guides_report[i].style_comparison_self_user +
                        "</td><td>" + response.guides_report[i].style_comparison_other_user + "</td><td>" + response.guides_report[i].outro_text_style + "</td></tbody>";
                }
                section_temp = response.guides_report[i].section;
            } else {
                if (response.guides_report[i].section === 0) {
                    var baseTable = "<tbody><td style='border-top: 5px solid #343a40;'></td><td>" + response.guides_report[i].theme_id + "</td><td>N/A</td><td>"
                        + response.guides_report[i].user_1_style + "</td><td>" + response.guides_report[i].user_2_style + "</td><td>N/A</td><td>" + response.guides_report[i].content + "</td><td>N/A</td><td>N/A</td></tbody>";
                } else {
                    var baseTable = "<tbody><td style='border-bottom: 0px;'></td><td>" + response.guides_report[i].theme_id + "</td><td>" + response.guides_report[i].theme_name + "</td>" +
                        "<td>" + response.guides_report[i].user_1_style + "</td><td>" + response.guides_report[i].user_2_style + "</td><td>" + response.guides_report[i].preframe_style + "</td><td>" + response.guides_report[i].style_comparison_self_user +
                        "</td><td>" + response.guides_report[i].style_comparison_other_user + "</td><td>" + response.guides_report[i].outro_text_style + "</td></tbody>";
                }
                section_temp = response.guides_report[i].section;
            }
            
            $("#guides-table").append(baseTable);
        }
    }

    handleGuidesAPICall = (bodyData) => {
        this.setState({serverErrorMessage: ""})
        $("#guides-table").empty();
        let apiParams = {
            "test_token": this.state.test_token
        };
        this.doApiCall("/getuserpartnerreport", "POST", "guidesReportResponse", bodyData, apiParams, this.handleGuidesReportResponse);
    }

    handleLoginTestInterfaceResponse = (response) => {
        this.setState({
            test_token: response.test_token,
            activePage: 'interpersonalityReport'
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        let bodyData = {
            login_user_id: this.state.email,
            login_password: this.state.password
        }

        if( this.state.email === "" ) {
            this.setState({
                emailErrorMessage: strings.TESTINTERFACE_EMAIL_REQUIRED_ERR,
                passwordErrorMessage: '',
                serverErrorMessage: ''
            });
        }

        var emailValid = this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        if(emailValid) {
            if( this.state.password === "" ) {
                this.setState({
                    passwordErrorMessage: strings.TESTINTERFACE_PASSWORD_REQUIRED_ERR,
                    emailErrorMessage: '',
                    serverErrorMessage: ''
                });
            }
            this.setState({loading: true})
            this.doApiCall("/logintestinterface", "POST", "loginTestInterfaceResponse", bodyData, null, this.handleLoginTestInterfaceResponse);
        }
        else {
            this.setState({
                emailErrorMessage: strings.TESTINTERFACE_EMAIL_ERR,
                passwordErrorMessage: '',
                serverErrorMessage: ''
            });
        }    

    }

    render() {

        const { email, password } = this.state;
        const isEnabled = email.length > 0 && password.length > 0;

        strings.setLanguage(this.state.language_id);

        let headContent = linkHeader.map((lin, index) => {
            return (
                <link key={index} rel={lin.rel} hreflang={lin.hreflang} href={url.ORIGIN_URL+lin.href+"testinterface"}/>
            )
        })

        return (
            this.state.activePage === "testinterface" ?
            <div>
                { this.state.loading && <div className="loader"></div> }
                <Helmet>
                        {headContent}
                </Helmet>
                <div className="lf-container">
                    <div className="lf-header text-center">
                        <a href="/"><img alt="" src={signup_logo_small} className="logo"/></a>
                        <h2>{strings.TESTINTERFACE_TITLE}</h2>
                    </div>
                    <div className="sf-wemail lf-wemail">
                        <form onSubmit={ this.handleSubmit } id="login-form">
                            <div className="form-group">
                                <input type="text" className="form-control" name="email" value={this.state.email} onChange={this.emailChange} id="email" placeholder={strings.TESTINTERFACE_EMAIL} />
                                { this.state.emailErrorMessage ? <span className="error">{this.state.emailErrorMessage}</span>: "" }
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" name="password" value={this.state.password} onChange={this.passwordChange} id="password" placeholder={strings.TESTINTERFACE_PASSWORD} />
                                { this.state.passwordErrorMessage ? <span className="error">{this.state.passwordErrorMessage}</span>: "" }
                            </div>
                            { this.state.serverErrorMessage ? <p className="text-center exists">{this.state.serverErrorMessage}</p>: "" }
                            <div className="form-group submit">
                                <button type="submit" disabled={!isEnabled}>{strings.TESTINTERFACE_BTN}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>    
            :
            this.state.activePage === "interpersonalityReport" ?
            <InterpersonalityReport handleInterpersonalAPICall = {this.handleInterpersonalAPICall} handleFilteredAPICall = {this.handleFilteredAPICall} handleGuidesAPICall = {this.handleGuidesAPICall} loading={this.state.loading} serverErrorMessage = {this.state.serverErrorMessage} />
            :
            ""
        )
    }
}

export default TestInterface;