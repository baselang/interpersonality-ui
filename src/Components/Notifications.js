import React, { Component } from 'react';
import url from '../CommonComponent/CommonURL';
import $ from 'jquery';
import ReactHtmlParser from 'react-html-parser';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Helmet } from 'react-helmet';
import renderHTML from 'react-render-html';
import LocalizedStrings from 'react-localization';
import { language } from './Language';
import CommonProfileHeader from '../CommonComponent/CommonProfileHeader';
import Sidenav from '../CommonComponent/Sidenav';
import linkHeader from '../CommonComponent/Link';
import Twemoji from 'react-twemoji';    
import {isWindows} from 'react-device-detect';
import logo_sm_gray from '../Assets/images/logo-sm-gray.svg';

let strings = new LocalizedStrings(language);
class Notifications extends Component {
    constructor() {
        super();
        this.state = {
            user_id: "",
            render: false,
            loading: true,
            language_id: '',
            auth: '',
            rid: '',
            notifications_json:{},
            template: '',
            count: '',
            finalData: '',
            notificationShow: false,
            finalArray: [],
            templateList: [],
            start: 0,
            notificationList:[]
        }
    }

    componentDidUpdate() {
        $('#cardnumber').click(function(){
            localStorage.setItem("Settings", "Billing")
        });
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        
        $('div.dropdown').addClass('show');
        localStorage.setItem("flag", 0)
        strings.setLanguage(this.state.language_id);
        let auth = localStorage.getItem("auth");
        let user_id = localStorage.getItem("user_id");
        let rid = localStorage.getItem("rid");
        let language_id = localStorage.getItem("language_id");
        let test_status = localStorage.getItem("test_status");
        
        this.setState({
            auth: auth,
            user_id: user_id,
            rid: rid,
            language_id: language_id
        })


        if(auth) {
            if(test_status == "not_completed") {
                window.location.replace(`${url.ORIGIN_URL}/test`)
            } else {
                fetch(`${url.BASE_URL}/getnotifications`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Credentials": true,
                        "x-api-key": url.X_API_KEY,
                        "Authorization": auth,
                        "timezone_offset": new Date().getTimezoneOffset()
                    }
                }).then(response => response.json().then(data => ({ status: response.status, body: data })))
                .then(data => {
                    if(data.status === 200) {

                        let notificationList = {
                            1 : "<span class=\"notification-item__photo\">🙊</span><div class=\"notification-item__text\">"+strings.NOTIFICATION_TEMPLATE_1+"</div>",
                            // 2 : "<span class=\"notification-item__photo\"><img alt=\"\" class=\"img_pix\" src=\"profile_image\"/></span><div class=\"notification-item__text\">"+strings.NOTIFICATION_TEMPLATE_2+"</div>",
                            3 : "<span class=\"notification-item__photo\">💳</span><div class=\"notification-item__text\">"+strings.NOTIFICATION_TEMPLATE_3+"</div>",
                            4 : "<span class=\"notification-item__photo\">🎉</span><div class=\"notification-item__text\">"+strings.NOTIFICATION_TEMPLATE_4+"</div>",
                            5 : "<span class=\"notification-item__photo\">😎</span><div class=\"notification-item__text\">"+strings.NOTIFICATION_TEMPLATE_5+"</div>",
                            6 : "<span class=\"notification-item__photo\">⏰</span><div class=\"notification-item__text\">"+strings.NOTIFICATION_TEMPLATE_6+"</div>",
                            // 7 : "<span class=\"notification-item__photo\">👀</span><div class=\"notification-item__text\"><p>"+strings.NOTIFICATION_TEMPLATE_7+"</div>",
                        }
                        for(let j=0; j<data.body.length; j++) {
                            let mykeys = Object.keys(data.body[j])
                            let ar = []
                            let myarray = []
                            for(let i=0; i<data.body[j][mykeys[0]].length; i++) {
                                ar.concat([""])
                            }
                            var date = mykeys[0]
                            this.state.notifications_json [mykeys[0]] = ar
                            
                            for(let i=0; i<data.body[j][mykeys[0]].length; i++ ){
                                let template = notificationList[(data.body[j][mykeys[0]][i]).notification_type]
                                Object.keys(data.body[j][mykeys[0]][i].notification_json).forEach(element => {                        
                                        let oldData = (data.body[j][mykeys[0]][i]).notification_json[element];
                                        // if((data.body[j][mykeys[0]][i]).notification_type==2){
                                        //     if(oldData==1){
                                        //         oldData="her"
                                        //     }else if(oldData==0){
                                        //         oldData="his"
                                        //     }
                                        // }
                                        let value1 = element
                                        let value2 = oldData
                                        // if(element == 'profile_image' && data.body[j][mykeys[0]][i].notification_json.profile_image == null )
                                        //     value2 = logo_sm_gray
                                        let mydata = template.split(value1).join(value2)
                                        template = mydata
                                    })
                                    date = mykeys[i]
                                    if(i===0) {
                                        template = "<span class=\"notification-item__date\">"+ date +"</span>" + template
                                    } else {
                                        template = "<span class=\"notification-item__date\"></span>" + template
                                    }

                                    template = "<div class=\"notification-item\">" + template + "</div>"

                                    let arr = [template]
                                    myarray.push(template)
                                    this.state.notifications_json[mykeys[0]][i] = template
                                    this.state.finalData += template
                            }
                                this.setState({
                                    finalArray: this.state.finalArray.concat(myarray),
                                    notificationList:notificationList
                                })
                        }
                                this.displayList()
                    }
                    else {
                        this.props.commanHandler("error500");
                    }
                })
            }    
        } else {
            this.props.commanHandler("redirectToHome");
        }  
    }

    displayList = () => {
        this.setState({ templateList: this.state.templateList.concat(this.state.finalArray.slice(this.state.start, this.state.start + 30)) })
        this.setState({ start: this.state.start + 30});
        this.setState({loading: false})
    }

    render() {
        
        strings.setLanguage(this.state.language_id);
        
        let headContent = linkHeader.map((lin, index) => {
            return (
                <link key={index} rel={lin.rel} hreflang={lin.hreflang} href={url.ORIGIN_URL+lin.href+"notifications"}/>
            )
        })

        let notifications = <div>
            { this.state.loading && <div className="loader"></div> }
            <Helmet>
                { headContent }
            </Helmet>
            <Sidenav />
            <main className="main profile-main" id="main">
                <CommonProfileHeader {...this.props}/>
                <div id="profile-content" className="main_onclick_lefthide">
                    <div className="notificationss">
                        <div className="not_banner">
                            <div className="not_banner-inner">
                                {renderHTML(strings.NOTIFICATION_TITLE)}
                            </div>
                        </div>
                        <div className="alll_notficationsss">
                            <InfiniteScroll
                                dataLength={this.state.templateList.length}
                                next={this.displayList}
                                hasMore={true}
                                >
                                { 
                                    this.state.templateList.map(data => {
                                        return ReactHtmlParser(data)
                                    })  
                                }
                            </InfiniteScroll>
                        </div>
                    </div>
                </div>
            </main>
        </div>
        if(isWindows) {
            return (
                <Twemoji options={{ className: 'emoji', folder: 'svg', ext: '.svg' }} >
                    {notifications}
                </Twemoji>
            )
        } else {    
            return notifications
        }
    }
}

export default Notifications;