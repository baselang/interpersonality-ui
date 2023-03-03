import $ from 'jquery';
import ClipboardJS from 'jquery';
import jQuery from 'jquery';
import LocalizedStrings from 'react-localization';
import { language } from '../../Components/Language';

let strings = new LocalizedStrings(language);

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
		if(localStorage.getItem("language_id")){
			strings.setLanguage(localStorage.getItem("language_id"));
		}
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
			if( !$('body').hasClass('sales-couples') && !$('body').hasClass('sales-compatibility') ) {
				$('#profile-header').sticky({
					topSpacing: 0,
					zIndex: 1050
				});
			}

			$('.test-header.sticky').sticky({
				topSpacing: 0,
				zIndex: 1050
			});

			if( $('body').hasClass('template-homepage') ) {
				$('#site-header').hide();
			} else {
				$('#site-header').sticky({
					topSpacing: 0,
					zIndex: 1050
				});
			}

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

					if( $('body').hasClass('template-homepage') ) {
						if( cursorPosition > 400 ) {
							$('#site-header').show().sticky({
								topSpacing: 0,
								zIndex: 1050
							});
						} else {
							$('#site-header').unstick().hide();
						}
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
				let allEmail =  $('input[id="email_one"]').serializeArray();
				var wrap = $(this).parent();
				var clone_html = '<div class="dropdown dropdown-email-opt cloneable">' + wrap.html() + '</div>';
				wrap.removeClass('cloneable');
				let span_id=(allEmail.length+1)-1;
				if(e.currentTarget.name=="add_email"){
					$(clone_html.replace('name="add_email"','name='+span_id).split('<span')[0]+'<span class="email-err-dynamic" id="'+span_id+'" >'+strings.SIGNUP_FORM_EMAIL_ERR+'</span></div>').appendTo( $('div.form-group-email .col-sm-8') );
					$('div.dropdown-email-opt.primary button.dropdown-toggle').removeClass('d-none');
				}else{
					$(clone_html.split("name=")[0]+" name="+span_id+' id="email_one" '+clone_html.split("name=")[1].split('id="email_one"')[1].split('<span')[0]+'<span class="email-err-dynamic" id="'+span_id+'" >'+strings.SIGNUP_FORM_EMAIL_ERR+'</span></div>').appendTo( $('div.form-group-email .col-sm-8') );
					$('div.dropdown-email-opt.primary button.dropdown-toggle').removeClass('d-none');
				}
			});

			$(document).on( 'paste', 'div.dropdown-email-opt.cloneable input', function(e) {
				let allEmail =  $('input[id="email_one"]').serializeArray();
				var wrap = $(this).parent();
				var clone_html = '<div class="dropdown dropdown-email-opt cloneable">' + wrap.html() + '</div>';
				wrap.removeClass('cloneable');
				let span_id=(allEmail.length+1)-1;
				if(e.currentTarget.name=="add_email"){
					$(clone_html.replace('name="add_email"','name='+span_id).split('<span')[0]+'<span class="email-err-dynamic" id="'+span_id+'" >'+strings.SIGNUP_FORM_EMAIL_ERR+'</span></div>').appendTo( $('div.form-group-email .col-sm-8') );
					$('div.dropdown-email-opt.primary button.dropdown-toggle').removeClass('d-none');
				}else{
					$(clone_html.split("name=")[0]+"name="+span_id+clone_html.split("name=")[1].slice(3).split('<span')[0]+'<span class="email-err-dynamic" id="'+span_id+'" >'+strings.SIGNUP_FORM_EMAIL_ERR+'</span></div>').appendTo( $('div.form-group-email .col-sm-8') );
					$('div.dropdown-email-opt.primary button.dropdown-toggle').removeClass('d-none');
				}
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

		function freinddd_listttt() {
			$('img.lazyload').lazyload();
		}

		if( $('div.freinddd_listttt').length ) {
			freinddd_listttt();
		}

		function scroll_nav() {
			$('div.scroll-nav').sticky({
				topSpacing: 170,
				bottomSpacing: 1010,
				wrapperClassName: 'scroll-nav-sticky-wrapper'
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
