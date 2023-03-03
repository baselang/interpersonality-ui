// import React, { Component } from 'react';
// import { Helmet } from 'react-helmet';
// import { CopyToClipboard } from 'react-copy-to-clipboard';
// import commander from '../Assets/images/commander.png';
// import facebook_messenger from '../Assets/images/facebook-messenger.svg';
// import renderHTML from 'react-render-html';
// import url from '../CommonComponent/CommonURL';
// import CommonProfileHeader from '../CommonComponent/CommonProfileHeader';
// import Sidenav from '../CommonComponent/Sidenav';
// import LocalizedStrings from 'react-localization';
// import { language } from './Language';
// import linkHeader from '../CommonComponent/Link';
// import country from '../CommonComponent/Country';
// import $ from 'jquery';
// import {isMobile} from 'react-device-detect';

// let strings = new LocalizedStrings(language);


// class Friends extends Component {
//     constructor() {
//         super();
//         this.state = {
//             user_id: '',
//             auth: '',
//             language_id: '',
//             rid: '',
//             token: '',
//             is_connected: '',
//             loading: true,
//             data: [],
//             is_visited_friends: '',
//             userFacebookFriends: [],
//             start: 0,
//             copyMessage: false,
//             error400:false,
//             error400message : ''
//         }
//     }

//     componentDidMount() {
//         window.scrollTo(0, 0)
//         let auth = localStorage.getItem("auth");
//         let user_id = localStorage.getItem("user_id");
//         let language_id = localStorage.getItem("language_id");
//         let rid = localStorage.getItem("rid");
//         let test_status = localStorage.getItem("test_status");

//         this.setState({
//             auth: auth,
//             user_id: user_id,
//             language_id: language_id,
//             rid: rid
//         })
//         if(localStorage.getItem("error400") == 'active'){
//             this.setState({
//               error400:true,
//               error400message: localStorage.getItem('errMessage')
//               });           
//             localStorage.removeItem("error400") 
//             localStorage.removeItem('errMessage') 
//            }

//         if(auth) {
//             if(test_status === "not_completed") {
//                 window.location.replace(`${url.ORIGIN_URL}/test`)
//             } else {
//                 fetch(`${url.BASE_URL}/getuserfriendslist`, {
//                     method: "GET",
//                     headers: {
//                         "Content-Type": "application/json",
//                         "Access-Control-Allow-Origin": "*",
//                         "Access-Control-Allow-Credentials": true,
//                         "x-api-key": url.X_API_KEY,
//                         "user_id": user_id,
//                         "Authorization": auth
//                     }
//                 }).then(response => response.json().then(data => ({ status: response.status, body: data })))
//                 .then(data => {
//                     this.setState({loading: false})
//                     if( data.status === 200 ) {
//                         if(data.body.picture_url) {
//                             localStorage.setItem("user_profile_pic", data.body.picture_url)
//                             this.setState({
//                                 token: data.body.auth,
//                                 is_connected: data.body.is_connected,
//                                 data: data.body.friends_list,
//                                 userFacebookFriends: data.body.friends_list,
//                                 is_visited_friends: data.body.is_visited_friends
//                             })
//                         }
//                         else {
//                             this.setState({
//                                 token: data.body.auth,
//                                 is_connected: data.body.is_connected,
//                                 data: data.body.friends_list,
//                                 userFacebookFriends: data.body.friends_list,
//                                 is_visited_friends: data.body.is_visited_friends
//                             })
//                         }
//                     }
//                     else {
//                         this.props.commanHandler("error500");
//                     }
//                 })
//             }    
//         } else {
//             this.props.commanHandler("redirectToHome");
//         }

//         (function(d, s, id) {
//             var js, fjs = d.getElementsByTagName(s)[0];
//             if (d.getElementById(id)) return;
//             js = d.createElement(s); js.id = id;
//             js.src = url.SDK_JS_SRC;
//             fjs.parentNode.insertBefore(js, fjs);
//         }(document, 'script', 'facebook-jssdk'));
//     }

//     componentDidUpdate() {
//         $('#navigateToFriends').click(function(){
//             window.location.reload();
//         });
//         $('#navigateTOPrivacy').click(function(){
//             localStorage.setItem("Settings", "Privacy")
//         });
//     }

//     handleChange = (e) => {
//         let currentList = [];
//         let newList = [];
//         if (e.target.value !== "") {
//           currentList = this.state.data;
//           newList = currentList.filter(item => {
//             const lc = item.friend_name.toString().toLowerCase();
//             const filter = e.target.value.toLowerCase();
//             return lc.includes(filter);
//           });
//         } else {
//           newList = this.state.data;
//         }
//         this.setState({
//             userFacebookFriends: newList
//         });
//     }

//     handlefriendProfile = () => {
//         localStorage.setItem("profile", Object.keys(url.PROFILE_LEFT_NAV)[6])
//     }

//     handleText = () => {
        
//         this.setState({
//             copyMessage: true
//         })

//         setTimeout(() => {
//             this.setState({
//                 copyMessage: false})
//         }, 2000)

//     }

//     render() {

//         strings.setLanguage(this.state.language_id);

//         let fbBtnWidth = isMobile ? url.FACEBOOKBTNMOBILE : url.FACEBOOKBTNWEB;
//         let fbBtnDivWidth = isMobile ? url.FACEBOOKBTNDIVMOBILE : url.FACEBOOKBTNDIVWEB;
//         const { userFacebookFriends } = this.state;

//         let finalData = <div className="all_friendss">
//             <div id="all_friendss-grid" className="row">       
//                 { 
//                     userFacebookFriends && userFacebookFriends.map(data => {
//                         return(
//                             <div className="col-lg-4 col-md-6 col-sm-6 col-12 paddd_twntyy" key={data.friend_userid}>
//                                 <div className="friend_pro">
//                                     <a onClick={() => this.handlefriendProfile(data.friend_userid)} href={`${url.ORIGIN_URL}/profile/${data.friend_userid}`}>
//                                         <img src={ data.friend_picture_url ? data.friend_picture_url : commander } alt="fri_1" className="rounded" />
//                                         <strong className="friend_name">{data.friend_name}</strong>
//                                     </a>
//                                 </div>
//                             </div>
//                         )
//                     })  
//                 }
//             </div>
//             <div className="lds-spinner">
//                 <span></span>
//                 <span></span>
//                 <span></span>
//                 <span></span>
//                 <span></span>
//                 <span></span>
//                 <span></span>
//                 <span></span>
//                 <span></span>
//                 <span></span>
//                 <span></span>
//                 <span></span>
//             </div>
//         </div>

//         const whatsappText = encodeURI(`https://api.whatsapp.com/send?text=${window.location.origin}${country.language_id_code_mapping[parseInt(this.state.language_id)] !== country.default_language ? country.lang_codes.map(data => `/${data}`) : ""}/home/${this.state.user_id}`)
//         const facebookText = encodeURI(`https://www.facebook.com/sharer/sharer.php?u=${window.location.origin}${country.language_id_code_mapping[parseInt(this.state.language_id)] !== country.default_language ? country.lang_codes.map(data => `/${data}`) : ""}/home/${this.state.user_id}`)
//         const twitterText = "https://twitter.com/intent/tweet?text=" + window.location.origin + `${country.language_id_code_mapping[parseInt(this.state.language_id)] !== country.default_language ? country.lang_codes.map(data => `/${data}`) : ""}`+"/home/" + this.state.user_id

//         let headContent = linkHeader.map((lin, index) => {
//             return (
//                 <link key={index} rel={lin.rel} hreflang={lin.hreflang} href={url.ORIGIN_URL+lin.href+"friends"}/>
//             )
//         })
        
//         return (
//             <div>
//                 { this.state.loading && <div className="loader"></div> }
//                 <Helmet>
//                     { headContent }
//                 </Helmet>
//                 <Sidenav firstname={this.state.firstname} user_profile_pic={this.state.user_profile_pic} someElseUserProfile={this.state.someElseUserProfile} someElseProfileFirstname={this.state.someElseProfileFirstname} someElseProfileLoggedOut={this.state.someElseProfileLoggedOut} active = "friends" />
//                 <main className="main profile-main" id="main">
//                     <CommonProfileHeader active = "friends" {...this.props}/>
//                     { this.state.copyMessage &&
//                         <div className="settings-alert"><i className="fa fa-check-circle"></i><strong>{strings.FRIENDS_COPIED_LINK}</strong></div> 
//                     }
//                     { this.state.is_connected && userFacebookFriends ? 
//                     <section id="profile-content" className="wapper-sect">
//                         { this.state.is_visited_friends === 0 ?
//                         <section className="friend_privacy_connect">
//                             <div className="container text-center">
//                                 {renderHTML(strings.FRIENDS_GOT_IT_TEXT)}
//                             </div>
//                         </section>
//                         :
//                         ""
//                         } 
//                         <section className="friend_section">
//                             <div className="container">
//                                 <hgroup className="hgroup_1 privacy_frnddd text-center">
//                                 {renderHTML(strings.FRIENDS_TITLE)}
//                                 </hgroup>
//                                 <div className="fried_inner">
//                                     <div className="search_section">
//                                         <form>
//                                             <input type="search" className="form-control" onChange={this.handleChange} placeholder={strings.FRIENDS_SEARCH_PLACEHOLDER} />
//                                         </form>
//                                     </div>
//                                     { finalData }
//                                     <div className="friends-invite-test">
//                                         <p>{strings.FRIENDS_INVITE_TITLE}</p>
//                                         <div className="inner">
//                                             <div className="copyyy_linkk">
//                                                 <CopyToClipboard text={`${window.location.origin}${country.language_id_code_mapping[parseInt(this.state.language_id)] !== country.default_language ? country.lang_codes.map(data => `/${data}`) : ""}/home/${this.state.user_id}`} onCopy={this.handleText}><span>{`${window.location.origin}${country.language_id_code_mapping[parseInt(this.state.language_id)] !== country.default_language ? country.lang_codes.map(data => `/${data}`) : ""}/home/${this.state.user_id}`}</span></CopyToClipboard>
//                                                 <CopyToClipboard text={`${window.location.origin}${country.language_id_code_mapping[parseInt(this.state.language_id)] !== country.default_language ? country.lang_codes.map(data => `/${data}`) : ""}/home/${this.state.user_id}`} onCopy={this.handleText}><span className="btn-copyyy_linkk"></span></CopyToClipboard>
//                                             </div>
//                                             <ul key="fr-u-1" className="ep--share">
//                                                 <li key="fr-u-1-l-1"><a href={ facebookText }  target='#' className="facebook"><i className="fa fa-facebook-square" aria-hidden="true"></i></a></li>
//                                                 <li key="fr-u-1-l-2"><a href={ twitterText }  target='_blank' className="twitter"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
//                                                 <li key="fr-u-1-l-3"><a href={ whatsappText } target="_blank" className="whatsapp"><i className="fa fa-whatsapp" aria-hidden="true"></i></a></li>
//                                                 <li key="fr-u-1-l-4"><a href="https://m.me/" target="_blank" className="messenger"><img src={ facebook_messenger } alt="facebook_messenger" /></a></li>
//                                             </ul>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </section>    
//                     </section>
//                     :
//                     <section id="profile-content" className="friend_section">
//                         <div className="container">
//                             <hgroup className="hgroup_1 text-center">
//                             {renderHTML(strings.FRIENDS_TITLE)}
//                             </hgroup>
//                             <div className="friend_connect text-center">
//                                 <p>{strings.FRIENDS_FB_CONNECT_MSG}</p>
//                                     <a href={url.FACEBOOK_FRIENDS_LOGIN_URL} style={{width: fbBtnDivWidth, height: "40px", zIndex: 3, position: "absolute", backgroundColor: "transparent"}}></a>
//                                     <div className="fb-login-button" data-width={fbBtnWidth} data-size="large" data-button-type="continue_with" data-auto-logout-link="false" data-use-continue-as="true"></div>
//                                 <p><small>{strings.FRIENDS_PRIVACY_TEXT}</small></p>
//                                 {
//                                         this.state.error400 ? <div>
//                                             <p style = {{color: "#aaaaaa", fontSize: "14px"}}>{this.state.error400message}</p>
//                                         </div> : ""
//                                     }
//                             </div>
//                         </div>
//                     </section>
//                     }
//                 </main>    
//             </div>
//         )
//     }
// }

// export default Friends;