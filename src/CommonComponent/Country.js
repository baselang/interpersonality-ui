
const country = {

  language_id_code_mapping: {
    165: "en",
    245: "es",
  },

  language_id_metatag_mapping: {
    165: "en_US",
    245: "es_ES",
  },
  browser_language_id_metatag_mapping: {
    en_US: 165,
    es: 245,
    es_ES: 245
  },

  facebook_sdk_language_id_mapping: {
    165: "en_GB",
    245: "es_LA",
  },
  
  default_metatag: "en_US",

  language_id_name_mapping: [
    { id: "165", name: "English"},
    { id: "245", name: "Español" },
  ],

  lang_codes: ["es"],

  home: "home/",
  profile: "profile/",
  profileone:"profileone/",
  profiletwo:"profiletwo/",
  profilethree:"profilethree/",
  resetpassword: "resetpassword/",
  guides: "guides/",
  facebookloginintermediate: "facebookloginintermediate",
  facebooksignupintermediate: "facebooksignupintermediate",
  profilesettingsfacebookintermediate: "profilesettingsfacebookintermediate",
  profilefacebooksignupintermediate: "profilefacebooksignupintermediate",

  default_language: "en",
  intermediate_code: "165",
  language_parameter: "/:lang",
};

export default country;
