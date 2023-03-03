import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { language } from '../Components/Language';
import $ from 'jquery';
import jQuery from 'jquery';
import ClipboardJS from 'jquery';
import LocalizedStrings from 'react-localization';
import CommonProfileHeader from '../CommonComponent/CommonProfileHeader';
import CommonProfileLeft from '../CommonComponent/CommonProfileLeft';
import Sidenav from '../CommonComponent/Sidenav';
import Error404 from '../Components/Error404';
import url from '../CommonComponent/CommonURL';
import country from '../CommonComponent/Country';
import linkHeader from '../CommonComponent/Link';
import Twemoji from 'react-twemoji';
import {isWindows} from 'react-device-detect';

let strings = new LocalizedStrings(language);

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            firstname: "",
            user_id: "",
            personality: "",
            personality_before: "",
            profile: true,
            showMystery: true,
            profileHeader: true,
            someElseProfileFirstname: "",
            someElseProfileName: "",
            someElseProfileLoggedIn: false,
            someElseProfileLoggedOut: false,
            someElseProfileMistry: false,
            isRender: false,
            user_profile_pic: "",
            someElseUserProfile: "",
            someElseLogoutUserProfile: "",
            loading: true,
            language_id: '',
            auth: '',
            rid: '',
            access_type: '',
            isRedirect: false,
            userFacebookFriends: [],
            is_connected: false,
            gender: '',
            active: '',
            mysteryStatus: null,
            user_report_data: [],
            share_module_report_content: [],
            checkloggedInUserProfile:false,
            userProfileRes:''
          }    
    }

    componentDidMount(){
        window.scrollTo(0, 0)
        let url = window.location.href
        let queryString = window.location.href.split('?')[0];
        if(queryString !== url) {
          window.location.href = queryString
        }else {
          localStorage.setItem("flag", 0)
          let auth = localStorage.getItem("auth"),
          user_id = localStorage.getItem("user_id"),
          rid = localStorage.getItem("rid"),
          language_id = localStorage.getItem("language_id"),
          test_status = localStorage.getItem("test_status"),
          browser_url = window.location.href,
          userid = "";
          
            userid = browser_url.split(country.profile)[1] ? browser_url.split(country.profile)[1].split("?")[0] : "";
          
          this.setState({
              auth: auth,
              user_id: user_id,
              rid: rid,
              language_id: language_id
          })

          if(auth) {
            if(test_status === "not_completed") {
                window.location.replace(`${url.ORIGIN_URL}/test`)
            } else {  
              if(userid == user_id) 
                this.setState({ active: 'profile',checkloggedInUserProfile:true});
              this.getUserDetails(null, auth, userid, user_id, this.profileApiResponseHandling )
            }  
          } else {
              this.getUserDetails(language_id, null, userid, user_id, this.profileApiResponseHandling )
          } 
          
          if(auth) {
            if(user_id === userid) 
              jQuery("body").addClass("page-profile")
            else
              jQuery("body").addClass()
          } else {
            jQuery("body").addClass("templete")
          }
        }

      $(".navbar-toggler").click(function(){
        $(".main").toggleClass("nav_fix");
        $(".mobile_nav").toggleClass("mob_fix");
      });
      
      $(".friend_section").click(function(){
        $(".main").removeClass("nav_fix");
        $(".mobile_nav").removeClass("mob_fix");
      });
      
      (function($) {
        $(document).ready( function() {

          $('button.toggle-menu').on('click', function(e) {
            $('#mobile-menu').toggleClass('show');
          });
      
          $('#mobile-menu').on('click', function(e) {
            if( e.target !== $('#mobile-menu div.inner') && $(e.target).parents('div.inner').length == 0 ) {
              $('#mobile-menu').removeClass('show');
            }
          });
      
          // disable links
          $('div.freinddd_listttt a').on('click', function(e) {
            e.preventDefault();
          });
      
          $('#dropdown-notifications, #dropdown-settings').on('show.bs.dropdown', function(e) {
            var str = '<div class="dropdown-backdrop fade"></div>';
            $(str).appendTo('body');
            $('div.dropdown-backdrop').addClass('show');
          });
      
          $('#dropdown-notifications, #dropdown-settings').on('hide.bs.dropdown', function(e) {
            $('div.dropdown-backdrop').removeClass('show').remove();
          });
      
          $('.onclickk_opeennn_all').click( function(e) {
            $(this).hide();
            $('.leftt_all_iconss').show().css( 'top', '0' );
            $('.left_menusssss').show().css( 'bottom', '30px' );
            
            e.preventDefault();
          });
      
          $('.leftt_all_iconss').click( function(e) {
            $(this).hide().css( 'top', '100%' );
            $('.left_menusssss').hide().css( 'bottom', '-100%' );
            $('.onclickk_opeennn_all').show();
            e.preventDefault();
          });
      
          $('.friend_privacy_connect a.got_btn').on('click', function(e) {
            $('.friend_privacy_connect').hide();
            e.preventDefault();
          });
      
          var alert_timeout;
      
          var clipboard_copyyy_linkk = new ClipboardJS('div.copyyy_linkk', {
            text: function(trigger) {
              return $(trigger).find('span').text();
            }
          });
      
          clipboard_copyyy_linkk.on('success', function(e) {
            var $alert = '<div class="settings-alert"><i class="fa fa-check-circle"></i><strong>Copied</strong></div>';
            $($alert).prependTo('#profile-content');
            alert_timeout = setTimeout( function() {
              $('div.settings-alert').remove();
            }, 2000);
      
            e.clearSelection();
          });
      
          var clipboard_messaagee_ooneee = new ClipboardJS('div.messaagee_ooneee', {
            text: function(trigger) {
              return $(trigger).find('div.meassge_textt').text();
            }
          });
      
          clipboard_messaagee_ooneee.on('success', function(e) {
            var $alert = '<div class="settings-alert"><i class="fa fa-check-circle"></i><strong>Copied</strong></div>';
            $($alert).prependTo('#profile-content');
            alert_timeout = setTimeout( function() {
              $('div.settings-alert').remove();
            }, 2000);
      
            e.clearSelection();
          });
      
          var clipboard_copy_btn = new ClipboardJS('div.pc--cta-actions span.copy', {
            text: function(trigger) {
              return $(trigger).attr('data-clipboard-text');
            }
          });
      
          clipboard_copy_btn.on('success', function(e) {
            $(e.trigger).html('Copied');
            e.clearSelection();
          });
      
          function bottom_menusss() {
            var top_space = $('#profile-header').outerHeight();
      
            if( $('div.freinddd_listttt').length ) {
              top_space = 160.8;
            }
      
            $('div.left_side_barr div.bottom_menusss').sticky({
              topSpacing: top_space + 10,
              bottomSpacing: 200
            });
          }
      
          if( $('div.left_side_barr div.bottom_menusss').length ) {
            bottom_menusss();
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
      
                if( !header_height && $('.test-header.sticky').length ) {
                  header_height = $('.test-header.sticky').outerHeight();
                } else if( !header_height && $('#site-header').length ) {
                  header_height = $('#site-header').outerHeight();
                }
      
                var cursorPosition = $(this).scrollTop();
                
                if( cursorPosition > header_height ) {
                  if( cursorPosition > scrollPosition ) {
                    $('body').removeClass('scroll-up').addClass('scroll-down');
                  } else if ( cursorPosition < scrollPosition ) {
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
      
          function sidenav_init() {
            var $content = $( '#profile-content' ),
              $button = $( 'button.profile-header__toggler' ),
              last_position = null,
              isOpen = false;
      
            initEvents();
      
            function initEvents() {
              $button.on('click', function(e) {
                e.preventDefault();
                toggleMenu();
              });
      
              $content.on('click', function(e) {
                if( isOpen && e.target !== $button ) {
                  toggleMenu();
                }
              });
            }
      
            function toggleMenu() {
              if( isOpen ) {
                $('body').removeClass('open-sidenav');
                $('#main.profile-main, body').css('height', 'auto');
                $('#profile-sidenav').css('min-height', '100%');
      
                if( last_position ) {
                  $(window).scrollTop(last_position);
                }
              } else {
                var h = window.innerHeight || $(window).height();
                last_position = $(window).scrollTop();
                
                $('#profile-content').css('top', '-' + last_position + 'px');
                $('body').addClass('open-sidenav');
                $('#main.profile-main, body').css('height', h-40);
                $('#profile-sidenav').css('min-height', h);
              }
      
              isOpen = !isOpen;
            }
          }
      
          sidenav_init();
      
          function server_error() {
            $('div#server-error').click( function(e) {
              if( !$(e.target).hasClass('server-error-inner') && $(e.target).parents('.server-error-inner').length == 0 ) {
                $('div#server-error').hide();
              }
            });
          }
      
          if( $('div#server-error').length ) {
            server_error();
          }
      
          function basic_settings() {
            $(document).on( 'keypress', 'div.dropdown-email-opt.cloneable input', function(e) {
              var wrap = $(this).parent();
              var clone_html = '<div class="dropdown dropdown-email-opt cloneable">' + wrap.html() + '</div>';
      
              wrap.removeClass('cloneable');
              $(clone_html).appendTo( $('div.form-group-email .col-sm-8') );
              $('div.dropdown-email-opt.primary button.dropdown-toggle').removeClass('d-none');
            });
      
            $('div.form-group-email').on('click', 'a.delete-email', function(e) {
              $(this).parents('div.dropdown-email-opt').remove();
              
              if( $('div.form-group-email div.dropdown-email-opt').length == 2 ) {
                $('div.dropdown-email-opt.primary button.dropdown-toggle').addClass('d-none');
              }
      
              e.preventDefault();
            });
      
          }
      
          if( $('div.settings-info').length ) {
            basic_settings();
          }
      
          function all_friendss() {
            var $container = $('#all_friendss-grid').infiniteScroll({
              path: function() {
                return 'friends.json';
              },
              responseType: 'text',
              history: false,
            });
      
            $container.on( 'request.infiniteScroll', function( event, path ) {
              $('div.all_friendss div.lds-spinner').show();
            });
      
            $container.on( 'load.infiniteScroll', function( event, response ) {
              var data = JSON.parse( response );
              
              if( data ) {
                var itemsHTML = '';
                $.each( data, function(i, item) {
                  itemsHTML += '<div class="col-lg-4 col-md-6 col-sm-6 col-12 paddd_twntyy">';
                    itemsHTML += '<div class="friend_pro">';
                      itemsHTML += '<a href="' +item.url+ '">';
                        itemsHTML += '<img alt="" src="' +item.photo+ '" class="rounded">';
                        itemsHTML += '<strong class="friend_name">' +item.name+ '</strong>';
                      itemsHTML += '</a>';
                    itemsHTML += '</div><!-- .friend_pro -->';
                  itemsHTML += '</div>';
                });
              }
      
              var $items = $( itemsHTML );
              $('div.all_friendss div.lds-spinner').hide();
              $container.infiniteScroll( 'appendItems', $items );
            });
          }
      
          if( $('div.all_friendss').length ) {
            all_friendss();
          }
      
          function scroll_nav() {
            $('div.scroll-nav').sticky({
              topSpacing: 170,
              bottomSpacing: 1010,
              wrapperClassName: 'scroll-nav-sticky-wrapper'
            });
      
            $('.tom-content div.left_menusssss a, div.scroll-nav a').on('click', function(e) {
              var target = $(this).attr('href');
              var checkURL = target.match(/#([^\/]+)$/i);
              
              if( checkURL[0] ) {
                          var go_position = $(target).offset().top - 100;
                          $('html,body').animate({
                  scrollTop: go_position
                }, 400);
              }
              
              e.preventDefault();
            });
      
            $(window).on('activate.bs.scrollspy', function(e, obj) {
              var current_heading = $('div.scroll-nav a[href="' +obj.relatedTarget+ '"]').html();
              
              $('div.onclickk_opeennn_all').html( '<a href="#">' + current_heading + '</a>' );
              $('div.left_menusssss a').removeClass('active');
              $('div.left_menusssss a[href="' +obj.relatedTarget+ '"]').addClass('active');
            });
      
            $('body').scrollspy({
              target: 'div.scroll-nav' ,
              offset: 180
            });
          }
          if( $('div.scroll-nav').length ) {
            scroll_nav();
          }
        });
      })(jQuery);
    }

    getUserDetails = (language_id, auth, userid, user_id, callback) => {
      var headerValue = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "x-api-key": url.X_API_KEY,
        "user_id": (this.state.checkloggedInUserProfile) ? user_id:userid,
        'Cache-Control':'no-store',
        'Pragma':'no-cache',
        'Expires':'0'
      }
      if(auth !== null) {
          headerValue['Authorization'] = auth
      } else if(language_id !== null) {
          headerValue['language_id'] = language_id
      }
      fetch(`${url.BASE_URL}/getuserdetails`, {
        method: "GET",
        headers: headerValue
      }).then(response => response.json().then(data => ({ status: response.status, body: data })))
      .then(data => {
        this.setState({loading: false});
        if(data.status == 200) {
            callback(data, userid, user_id);
            if(user_id == userid) {
              this.setState({language_id: data.body.language_id})
              if(localStorage.getItem("language_id")!=data.body.language_id){
                this.props.commanHandler("updateLanguageId",data.body.language_id)
              }
              localStorage.setItem("language_id", data.body.language_id)
            }
        } else if(data.status == 400) {
          this.setState({
            someElseProfileLoggedIn: true
          })
        }  
        else if(data.status == 404) {
          if(auth){
            if(this.state.checkloggedInUserProfile)
              this.setState({active: 'profile'})
            else{
              this.setState({
                someElseProfileLoggedIn: false,
                isRender: false
              })
            }
          }else{
              this.setState({
                someElseProfileLoggedOut: true,
                isRender: false
              })
          }
        } else {
          this.props.commanHandler("error500");
        }
      })
    }

    handleMystery = (status) => {
      this.setState({mysteryStatus: status});
    }

    profileApiResponseHandling=(data,  browseUserId, loggedInUserId)=>{
      if(browseUserId==loggedInUserId){
        localStorage.setItem("profile", Object.keys(url.PROFILE_LEFT_NAV)[1])
      }
      let section = [];
      let user_report = data.body.users_report_data;
        user_report.map((key,val)=>{
          if(section[key.Section] == undefined ) {
              section[key.Section]=[];
              section[key.Section].push( key)
          }else{
            let currentIndex = section[key.Section].length;
              section[key.Section][currentIndex]=key;
          }
        })
        if(section.length >0){
          section.map((keyId,valId)=>{
            section[valId].slice().sort((a, b) => a.Story - b.Story)
          });
        }
      localStorage.setItem("gender", data.body.gender)
      if(this.state.auth) {
        if(this.state.checkloggedInUserProfile){
          localStorage.setItem("firstname", data.body.firstname)
          localStorage.setItem("user_profile_pic", data.body.picture_url)
          localStorage.setItem("personality", data.body.mbti_title)
          localStorage.setItem("profile", localStorage.getItem("profile") ? localStorage.getItem("profile"): Object.keys(url.PROFILE_LEFT_NAV)[1] )
        } 
        else {
          localStorage.setItem("profile", Object.keys(url.PROFILE_LEFT_NAV)[6])
          // fetch(`${url.BASE_URL}/getuserfriendslist`, {
          //   method: "GET",
          //   headers: {
          //       "Content-Type": "application/json",
          //       "Access-Control-Allow-Origin": "*",
          //       "Access-Control-Allow-Credentials": true,
          //       "x-api-key": url.X_API_KEY,
          //       "user_id": loggedInUserId,
          //       "Authorization": this.state.auth,
          //       "friend_id": browseUserId
          //   }
          // }).then(response => response.json().then(data => ({ status: response.status, body: data })))
          // .then(data => {
          //     if( data.status === 200 ) {
          //         this.setState({
          //             token: data.body.auth,
          //             is_connected: data.body.is_connected,
          //             userFacebookFriends: data.body.friends_list,
          //             is_visited_friends: data.body.is_visited_friends,
          //             active: "friends"
          //         })
          //     }
          //     else if(data.status === 400) {
          //           this.setState({
          //             someElseProfileLoggedIn: true
          //           })
          //     } else {
          //       this.props.commanHandler("error500");
          //     }
          // })
        }
      }
       else{
        localStorage.setItem("referral_code", data.body.user_id)
        localStorage.setItem("profile", localStorage.getItem("profile") ? localStorage.getItem("profile"): Object.keys(url.PROFILE_LEFT_NAV)[0] )
      } 
      this.setState({
        user_report_data: section,
        share_module_report_content: data.body.share_module_report_content,
        firstname: (this.state.auth)?(this.state.checkloggedInUserProfile)?data.body.firstname:'':'',
        someElseProfileFirstname: (this.state.checkloggedInUserProfile)?'':this.updateName(data.body.firstname),
        someElseProfileName: (this.state.checkloggedInUserProfile)?'':data.body.firstname,
        someElseUserProfile:  (this.state.auth)?(this.state.checkloggedInUserProfile)?'':data.body.picture_url:false,
        user_profile_pic:   (this.state.auth)?(this.state.checkloggedInUserProfile)?data.body.picture_url:'':'',
        someElseProfileLoggedOut:  (this.state.auth)?false:true,
        profileHeader:  (this.state.auth)?true:false,
        ProfileLoggedOutHeader: (this.state.auth)?false:true,
        showMystery: (this.state.checkloggedInUserProfile)?true:false,
        profile: (this.state.checkloggedInUserProfile)?true:false,
        user_id: browseUserId,
        personality: data.body.mbti_title,
        personality_before: data.body.mbti_title_prefix,
        someElseProfileLoggedIn: (this.state.auth)?(this.state.checkloggedInUserProfile)?false:'':false,
        someElseLogoutUserProfile: (this.state.auth)?'':data.body.picture_url,
        language_id: this.state.language_id,
        access_type: data.body.access_type,
        gender: data.body.gender,
        scrape_image_url: data.body.scrape_image_url,
        isRender: true
      });
    }

    updateName(name){
      let default_language_id  = Object.keys(country.language_id_code_mapping).find(k=>country.language_id_code_mapping[k]==country.default_language);
      let modified_name=""
      if(localStorage.getItem("language_id")==default_language_id  && name!=null){
        if(name.charAt(name.length-1)==="s"){
          modified_name=name+"'"
        } else{
          modified_name=name+"'s"
        }
      }
      else {
        modified_name=name
      }
      return modified_name;
    }

    // Select language from some-else-logged-out mode
    handleLanguageChange = (e) => {
      e.preventDefault();

      let language_id = e.target.value;
      localStorage.setItem("language_id", e.target.value)
      this.setState(({
          language_id: language_id
      }))
      this.props.getlanguage(language_id);
    }

    render() { 
      strings.setLanguage(this.state.language_id); 
      let headContent = linkHeader.map((lin, index) => {
        return (
            <link key={index} rel={lin.rel} hreflang={lin.hreflang} href={url.ORIGIN_URL+lin.href+"profile/"+window.location.href.split(country.profile)[1]}/>
        )
      })
         const profile = <div>
        { this.state.loading && <div className="loader"></div> }
          <Helmet>
            { headContent }
            <title>{(this.state.firstname != '' || this.state.someElseProfileName != '')?strings.formatString(strings.PROFILE_META_TITLE, this.state.firstname?this.state.firstname:this.state.someElseProfileName):strings.INTERPERSONALITY}</title>
            <meta name="description" content={strings.formatString(strings.PROFILE_META_DESCRIPTION,this.state.firstname?this.state.firstname:this.state.someElseProfileName,this.state.firstname?this.state.firstname:this.state.someElseProfileName)} />
          </Helmet> 
        <Sidenav firstname={this.state.firstname} user_profile_pic={this.state.user_profile_pic} someElseUserProfile={this.state.someElseUserProfile} someElseProfileFirstname={this.state.someElseProfileFirstname} someElseProfileLoggedOut={this.state.someElseProfileLoggedOut} active = {this.state.active} handleLanguageChange = {this.handleLanguageChange} />
        <main className="main profile-main" id="main">
          <CommonProfileHeader required_mystery_status = {true} handleMystery = {this.handleMystery} firstname={this.state.firstname} user_profile_pic={this.state.user_profile_pic} someElseUserProfile={this.state.someElseUserProfile} someElseProfileFirstname={this.state.someElseProfileFirstname} someElseProfileLoggedOut={this.state.someElseProfileLoggedOut} isRender={this.state.isRender} someElseProfileLoggedIn = {this.state.someElseProfileLoggedIn} is_connected = {this.state.is_connected} userFacebookFriends = {this.state.userFacebookFriends} access_type = {this.state.access_type} active = {this.state.active}  handleLanguageChange = {this.handleLanguageChange} {...this.props}/>
            { this.state.isRender ?
            <CommonProfileLeft firstname={this.state.firstname} mysterystatus = {this.state.mysteryStatus}  user_profile_pic={this.state.user_profile_pic} personality_before={this.state.personality_before} personality={this.state.personality} someElseProfileFirstname={this.state.someElseProfileFirstname} someElseProfileName = {this.state.someElseProfileName} someElseUserProfile={this.state.someElseUserProfile} someElseLogoutUserProfile = {this.state.someElseLogoutUserProfile} someElseProfileLoggedIn={this.state.someElseProfileLoggedIn} someElseProfileLoggedOut={this.state.someElseProfileLoggedOut} access_type={this.state.access_type} gender = {this.state.gender} {...this.props} user_report_data = { this.state.user_report_data } share_module_report_content = {this.state.share_module_report_content} />
            :
            <Error404 />
            }
        </main>
      </div>
      if(isWindows) {
        return (
            <Twemoji options={{ className: 'emoji', folder: 'svg', ext: '.svg' }} >
                {profile}
            </Twemoji>
        )
      } else {    
          return profile
      }
    }
}

export default Profile;