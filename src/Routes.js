import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import country from './CommonComponent/Country';
import url from './CommonComponent/CommonURL';
import Home from './Components/Home';
import HomePage from './Components/HomePage';
import Privacy from './Components/Privacy';
import Research from './Components/Research';
import ResearchArticle from './Components/ResearchArticle';
import Terms from './Components/Terms';
import Contact from './Components/Contact';
import Support from './Components/Support';
import OurModel from './Components/OurModel';
import OurTeam from "./Components/OurTeam";
import Press from "./Components/Press";
import CollaborateResearch from "./Components/CollaborateResearch";
import PhdReviewProcess from "./Components/PhdReviewProcess";
import Test from './Components/Test';
import Login from './Components/Login';
import TestDescriptions from './Components/TestDescriptions';
import Signup from './Components/Signup'
import SignupWithEmail from "./Components/SignupWithEmail";
import FacebookSignupIntermediate from "./Components/FacebookSignupIntermediate";
import FacebookLoginIntermediate from "./Components/FacebookLoginIntermediate";
import PasswordUpdateSuccessful from "./Components/PasswordUpdateSuccessful";
import FacebookAccountExist from "./Components/FacebookAccountExist";
import ResetLinkSuccessful from "./Components/ResetLinkSuccessful";
import ForgotPassword from "./Components/ForgotPassword";
import ResetPassword from "./Components/ResetPassword";
import Profile from './Components/Profile';
import Settings from './Components/Settings';
import Notifications from './Components/Notifications';
import ExtendedProfile from './Components/ExtendedProfile';
// import Friends from './Components/Friends';
import Guides from './Components/Guides';
import ProfileSettingsFacebookIntermediate from './Components/ProfileSettingsFacebookIntermediate';
// import FriendsFacebookLoginIntermediate from './Components/FriendsFacebookLoginIntermediate'; 
import TestInterface from './TestInterface/TestInterface';

  // GOING TO USE IN ROUTE COMPONENT --- 01/07/2020
  
class Routes extends Component {
    constructor() {
        super();
        this.state = {
            language_id: '',
            country_one: country,
            forgotPassMessage: '',
            forgotRedirect: false,
            facebookqueryStringProps:'',
            product_id: '',
            error500:false,
            manualRedirection: false,
            redirectGuides: '',
            
        }
    }

    componentDidMount(){

        var browser_url = window.location.href;
        let fb_login_url = browser_url.split(this.state.country_one.facebookloginintermediate)[1],
         fb_signup_url = browser_url.split(this.state.country_one.facebooksignupintermediate)[1],
         fb_settings_url = browser_url.split(this.state.country_one.profilesettingsfacebookintermediate)[1],
         fb_profile_url = browser_url.split(this.state.country_one.profilefacebooksignupintermediate)[1],
         language_id = localStorage.getItem("language_id"),
         referral_code_one = browser_url.split(this.state.country_one.home)[1],
        defaultLangMapping =  this.state.country_one.language_id_code_mapping,
         defaultLangCode =  this.state.country_one.default_language;

        let defaultLangId = Object.keys(defaultLangMapping).find((element) => {
                        return defaultLangMapping[element] === defaultLangCode;
        });
        if(referral_code_one !== undefined) {
            let referral_code = referral_code_one.split('/')[0] ? referral_code_one.split('/')[0].split("?")[0] : referral_code_one
            localStorage.setItem("referral_code", referral_code)
        }

        if ((fb_login_url !== undefined || fb_signup_url !== undefined || fb_settings_url || fb_profile_url !== undefined)){
            this.setState({
                language_id: this.state.country_one.intermediate_code
            }) 
        }
                
        if(language_id === undefined || language_id === null || language_id === "") {

            fetch(`${url.BASE_URL}/getlanguage`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                    "x-api-key": url.X_API_KEY,
                },
            }).then(response => response.json().then(data => ({ status: response.status, body: data })))
            .then(data => {
                if (data.status === 200) {
                    localStorage.setItem("language_id", data.body.language_id)
                    this.setState({
                        language_id: data.body.language_id.toString()
                    })
                } else {
                    localStorage.setItem("language_id", defaultLangId)
                    this.setState({
                        language_id: defaultLangId 
                    })
                }
            })
        } else {
            this.setState({
                language_id: language_id 
            })
        }
    }

    getlanguage = (lang) => {
        this.setState({language_id: lang });
    }

    handleResetLinkExpireLink = (message) => {
        this.setState({
            forgotPassMessage: message,
            manualRedirection: "/forgotpassword"
        })
    }

    matchUrlComponent=(data,toCheck)=>{
        let resp=false;
        data.reduce((key,val)=>{
            let splitUrl = val.routes.split('/')[1];
            if(val.routes !== "/" && splitUrl === toCheck)
            return (resp = splitUrl);
        });
        return resp;
    }
    commanHandler = (action, extraParam=null) =>{
        if(action === 'error500'){
            localStorage.clear();
            localStorage.setItem("language_id", this.state.language_id)
            this.setState({
                error500:true,
                manualRedirection: "/"
            });
        } else if(action === "redirectGuidesPage" || action === "redirectRomanticCapabilitySalesPage" || action === "redirectForCouplesSalesPage") {
            localStorage.setItem("active", "relationships");
            this.setState({
                redirectGuides: action,
                manualRedirection: "/guides"
            })
        } 
        else if(action === "redirectToHome"){
            localStorage.setItem("language_id", this.state.language_id)
            this.setState({
                error500:false,
                manualRedirection: "/"
            });
        }else if(action === "updateErrorToFalse"){
           window.location.reload()
        }else if(action === "redirectToTest"){
            window.location.href = "/test";
        }
        else if(action === "redirectToSetting"){
          this.setState ({
              manualRedirection : "/settings"
          })
        }
        else if(action === "redirectToLogin"){
            this.setState ({
                manualRedirection : "/login"
            })
        }
        else if(action === "redirectToSignup"){
            this.setState ({
                manualRedirection : "/signup"
            })
        }
        else if(action === "redirectToSignupWithEmail"){
            this.setState ({
                manualRedirection : "/signupwithemail"
            })
        }
        // else if(action === "redirectToFriends"){
        //     this.setState({
        //         manualRedirection: "/friends"
        //     })
        // }
        else if(action === "updateLanguageId"){
            this.setState({
                language_id: extraParam
            })
        }

        
    }

    render() {
        if((this.state.language_id && this.state.language_id!=='' && this.state.language_id !==null)) {

            let langMetaDataMapping = this.state.country_one.language_id_code_mapping;
            let checkDefaultAndUserLang = (langMetaDataMapping[parseInt(this.state.language_id)] === this.state.country_one.default_language) ? true : false,
            selLangParam = langMetaDataMapping[parseInt(this.state.language_id)],
            langParam = this.state.country_one.language_parameter;


            const routes_with_component_config= [
                {routes : "/", component : Home, propName:{  getlanguage : this.getlanguage, commanHandler:this.commanHandler, error500:this.state.error500} },
                {routes : "/home", component : HomePage, propName:{  getlanguage : this.getlanguage, commanHandler:this.commanHandler} },
                {routes:"/profile/:userId", component:Profile, propName:{default_lang_id : this.state.country_one.intermediate_code, getlanguage: this.getlanguage, commanHandler:this.commanHandler} },
                {routes : "/home/:id", component : HomePage, propName:{  getlanguage : this.getlanguage, commanHandler:this.commanHandler} },
                {routes : "/home/:idOne/:idTwo", component : HomePage, propName:{  getlanguage : this.getlanguage, commanHandler:this.commanHandler} },
                {routes : "/privacy", component : Privacy, propName:{  getlanguage : this.getlanguage, commanHandler:this.commanHandler} }, 
                {routes : "/research", component : Research, propName:{  getlanguage : this.getlanguage, commanHandler:this.commanHandler} },
                {routes : "/data-driven-personality-model", component : ResearchArticle, propName:{  getlanguage : this.getlanguage, commanHandler:this.commanHandler} },
                {routes : "/terms", component : Terms, propName:{  getlanguage : this.getlanguage, commanHandler:this.commanHandler} },
                {routes : "/contact", component : Contact, propName:{  getlanguage : this.getlanguage, commanHandler:this.commanHandler} },
                {routes : "/support", component : Support, propName:{  getlanguage : this.getlanguage, commanHandler:this.commanHandler} },
                {routes : "/our-model", component : OurModel, propName:{  getlanguage : this.getlanguage, commanHandler:this.commanHandler} },
                {routes : "/our-team", component : OurTeam, propName:{  getlanguage : this.getlanguage, commanHandler:this.commanHandler} },
                {routes : "/press", component : Press, propName:{  getlanguage : this.getlanguage, commanHandler:this.commanHandler} },
                {routes : "/peer-review", component : PhdReviewProcess, propName:{  getlanguage : this.getlanguage, commanHandler:this.commanHandler} },
                {routes : "/collaborate-on-research", component : CollaborateResearch, propName:{  getlanguage : this.getlanguage, commanHandler:this.commanHandler} },
                {routes : "/test", component :  Test, propName:{  getlanguage : this.getlanguage, commanHandler:this.commanHandler}},
                {routes : "/login", component :  Login, propName:{ commanHandler:this.commanHandler} },
                {routes : "/testdescriptions", component :  TestDescriptions, propName:{  getlanguage : this.getlanguage, commanHandler:this.commanHandler}},
                {routes : "/signup", component :  Signup, propName:{ commanHandler:this.commanHandler}},
                {routes : "/signupwithemail", component :  SignupWithEmail, propName:{ commanHandler:this.commanHandler}},
                {routes : "/passwordupdatesuccessful", component :  PasswordUpdateSuccessful, propName:{ commanHandler:this.commanHandler}},
                {routes : "/facebookaccountexist", component :  FacebookAccountExist, propName:{ commanHandler:this.commanHandler}},
                {routes : "/resetlinksuccessful", component :  ResetLinkSuccessful, propName:{ commanHandler:this.commanHandler}},
                {routes : "/forgotpassword", component :  ForgotPassword, propName:{ commanHandler:this.commanHandler, forgotPassMessage:this.state.forgotPassMessage}},
                {routes : "/settings", component :  Settings, propName:{ commanHandler:this.commanHandler}},
                {routes : "/extendedprofile", component :  ExtendedProfile, propName:{ commanHandler:this.commanHandler}},
                {routes : "/notifications", component :  Notifications, propName:{ commanHandler:this.commanHandler}},
                // {routes : "/friends", component :  Friends, propName:{ commanHandler:this.commanHandler}},
                {routes : "/guides", component :  Guides, propName:{ commanHandler:this.commanHandler, redirectGuides: this.state.redirectGuides}},
                {routes : "/guides/:userpartnerId", component :  Guides, propName:{ commanHandler:this.commanHandler, redirectGuides: this.state.redirectGuides}},
                {routes : "/facebooksignupintermediate", component :  FacebookSignupIntermediate, propName:{facebookqueryStringProps:this.state.facebookqueryStringProps, defaultLang:this.state.country_one.intermediate_code, commanHandler:this.commanHandler}},
                {routes : "/facebookloginintermediate", component :  FacebookLoginIntermediate, propName:{facebookqueryStringProps:this.state.facebookqueryStringProps, defaultLang:this.state.country_one.intermediate_code, commanHandler:this.commanHandler}},
                {routes : "/profilesettingsfacebookintermediate", component :  ProfileSettingsFacebookIntermediate,propName:{facebookqueryStringProps:this.state.facebookqueryStringProps,defaultLang:this.state.country_one.intermediate_code, commanHandler:this.commanHandler}},
                // {routes : "/friendsfacebookloginintermediate", component :  FriendsFacebookLoginIntermediate, propName:{facebookqueryStringProps:this.state.facebookqueryStringProps,defaultLang:this.state.country_one.intermediate_code, commanHandler:this.commanHandler}},
                {routes : "/resetpassword/:token", component :  ResetPassword, propName:{  handleResetLinkExpireLink : this.handleResetLinkExpireLink, commanHandler:this.commanHandler}},
                {routes : "/profile", component :  Profile, propName:{ commanHandler:this.commanHandler}},
                // {routes : "/profilefacebooksignupintermediate", component :  FriendsFacebookLoginIntermediate, propName:{facebookqueryStringProps:this.state.facebookqueryStringProps,defaultLang:this.state.country_one.intermediate_code, commanHandler:this.commanHandler}},
                {routes : "/coaches", component :  TestInterface, propName:{ commanHandler:this.commanHandler}}
                
            ];

            // browser_language_id_metatag_mapping
            let browser_lang_metadata  = this.state.country_one.browser_language_id_metatag_mapping;
            let path = window.location.pathname;
            let pData = path.split('/');
            let checkIsRoute = false;
            let toPath = '';
            if(!checkDefaultAndUserLang ){
                
                if(browser_lang_metadata[pData[1]] === undefined ){
                    checkIsRoute = this.matchUrlComponent(routes_with_component_config, pData[1]);
                    if(checkIsRoute === "facebooksignupintermediate" || checkIsRoute === "facebookloginintermediate" ||checkIsRoute === "profilesettingsfacebookintermediate" || checkIsRoute ==="friendsfacebookloginintermediate" || checkIsRoute ==="profilefacebooksignupintermediate" ){
                        let splitFbPath = window.location.href.split(checkIsRoute);
                        if(splitFbPath[1]){
                           let splitFbPathD = splitFbPath[1].split('/?')
                            this.setState({facebookqueryStringProps:splitFbPathD[1]})

                        }
                    }
                }
            }else if(checkDefaultAndUserLang && browser_lang_metadata[pData[1]] !== undefined ){
                checkIsRoute = this.matchUrlComponent(routes_with_component_config, pData[2]);
                if(checkIsRoute){
                    let splitP = path.split(checkIsRoute);
                    delete splitP[0];
                    toPath = splitP.join(checkIsRoute);
                    toPath = "/"+toPath;
                }
                
            }

            return (
                <div>
                    <BrowserRouter>
                        <Switch>
                        {/* default routes */}
                        {
                        (this.state.manualRedirection)
                            ?
                                (!checkDefaultAndUserLang)
                                    ?
                                    <Redirect to={ "/"+selLangParam+this.state.manualRedirection} from={path}/>
                                    : 
                                    <Redirect to={this.state.manualRedirection} from={path} />
                        
                            :
                                (checkIsRoute)
                                ?
                                    (
                                        (!checkDefaultAndUserLang)
                                            ?
                                            <Redirect to={ "/"+selLangParam+path} from={path}/>
                                            : 
                                            <Redirect to={toPath} from={path} />
                                    ) 
                                :
                                    ''
                        }
                        {
                            routes_with_component_config.map((val,ind)=>{
                                
                                if(val.defaultLang){
                                    return (
                                        <Route path={val.routes } exact={true} 
                                        render={(props) => <val.component {...val.component} {...val.propName} {...props}  />}
                                        />
                                    )

                                }else{
                                    return (
                                        <Route path={(checkDefaultAndUserLang) ? val.routes: langParam +val.routes } exact={true} 
                                        render={(props) => <val.component {...val.component} {...val.propName} {...props}  />}
                                        />
                                    )

                                }
                                
                                
                            })
                        }

                        {/* redirect routes */}
                        {
                            (
                                (checkIsRoute === false  && this.state.forgotRedirect === false) ?
                                    (
                                        ( checkDefaultAndUserLang  )
                                            ?
                                                <Redirect to="/" />
                                            : 
                                            (selLangParam) ?
                                                <Redirect to= {"/"+selLangParam+"/" } />
                                            : 
                                            '' 
                                    )
                                :
                                ''
                            )
                        }
                        
                        </Switch>
                    </BrowserRouter>
                </div>
            )
        } else {
            return null;
        }
    }
}

export default Routes;