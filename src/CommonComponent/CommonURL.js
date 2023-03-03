import country from '../CommonComponent/Country';
let language_id  = localStorage.getItem("language_id");
let X_API_KEY =  "d7r9Ha5GIV9vLRGRSbC5J42CG8GGgNwG6bSwFjTj";
let BASE_URL =  "https://api.interpersonality.com/test";
let FACEBOOK_APP_ID = 804872946853993;
let FACEBOOK_API_SCOPE = "public_profile,email";
let ORIGIN_URL = window.location.origin;
let Email = "support@interpersonality.com";

const url = {  
    Email: Email,
    ORIGIN_URL: ORIGIN_URL,
    X_API_KEY: X_API_KEY,
    BASE_URL: BASE_URL,
    FACEBOOK_APP_ID: FACEBOOK_APP_ID,
    FACEBOOK_LOGIN_URL: `https://www.facebook.com/dialog/oauth?client_id=${FACEBOOK_APP_ID}&redirect_uri=${ORIGIN_URL}/facebookloginintermediate/&scope=${FACEBOOK_API_SCOPE}`,
    FACEBOOK_SIGNUP_URL: `https://www.facebook.com/dialog/oauth?client_id=${FACEBOOK_APP_ID}&redirect_uri=${ORIGIN_URL}/facebooksignupintermediate/&scope=${FACEBOOK_API_SCOPE}`,
    FACEBOOK_PROFILE_SETTING_LOGIN_URL: `https://www.facebook.com/dialog/oauth?client_id=${FACEBOOK_APP_ID}&redirect_uri=${ORIGIN_URL}/profilesettingsfacebookintermediate/&scope=${FACEBOOK_API_SCOPE}`,
    FACEBOOK_FRIENDS_LOGIN_URL: `https://www.facebook.com/dialog/oauth?client_id=${FACEBOOK_APP_ID}&redirect_uri=${ORIGIN_URL}/profilefacebooksignupintermediate/&scope=${FACEBOOK_API_SCOPE}`,
    SDK_JS_SRC: `https://connect.facebook.net/${country.facebook_sdk_language_id_mapping[parseInt(language_id)]}/sdk.js#xfbml=1&version=v4.0&appId=${FACEBOOK_APP_ID}`,
    CALENDLY_DATA_URL:`https://calendly.com/connor-interpersonality/coaching`,
    CALENDLY_SRC:`https://assets.calendly.com/assets/external/widget.js`,
    PROFILE_LEFT_NAV:{0: "PROFILE_LEFT_0", 1: "PROFILE_LEFT_1", 2: "PROFILE_LEFT_2", 3: "PROFILE_LEFT_3", 4: "PROFILE_LEFT_4", 5: "PROFILE_LEFT_5", 6: "PROFILE_LEFT_6", 7: "PROFILE_LEFT_7"},
    COUPLES_GUIDE_LEFT_NAV:{0: "GUIDES_REPORT_MENU_1", 1: "GUIDES_REPORT_MENU_2", 2: "GUIDES_REPORT_MENU_3", 3: "GUIDES_REPORT_MENU_4", 4: "GUIDES_REPORT_MENU_5", 5: "GUIDES_REPORT_MENU_6", 6: "GUIDES_REPORT_MENU_7"},
    COUPLES_GUIDE_LEFT_NAV_EMOJIS:{0: "0x1F465", 1: "0x1F9CF", 2: "0x1F970", 3: "0x1F3E1", 4: "0x1F4AB", 5: "0x1F9ED"},
    ROMANTIC_COMPATABILITY_GUIDE_LEFT_NAV:{0: "GUIDES_REPORT_MENU_1", 1: "GUIDES_REPORT_MENU_2", 2: "GUIDES_REPORT_MENU_5", 3: "GUIDES_REPORT_MENU_3", 4: "GUIDES_REPORT_MENU_4"},
    ROMANTIC_COMPATABILITY_GUIDE_LEFT_NAV_EMOJIS:{0: "0x1F465", 1: "0x1F9CF", 2: "0x1F4AB", 3: "0x1F970", 4: "0x1F64B"},
    emoji_config: {1: "🏔", 2: "☀️",3: "🎨", 4: "🧗",5: "📋", 6: "🛫",7: "🔬", 8: "🥰",9: "🧽", 10: "🛣",11: "💬", 12: "📚",13: "😑",14: "🧸",15: "🌦"},
    FACEBOOKBTNMOBILE: '100%',
    FACEBOOKBTNWEB: 1500,
    FACEBOOKBTNDIVWEB:"400px",
    FACEBOOKBTNDIVMOBILE:"300px"
}

export default url;