import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import jQuery from 'jquery';
import renderHTML from 'react-render-html';
import LocalizedStrings from 'react-localization';
import { language } from './Language';
import linkHeader from '../CommonComponent/Link';
import url from '../CommonComponent/CommonURL';
import CommonHeader from '../CommonComponent/CommonHeader';
import CommonFooter from '../CommonComponent/CommonFooter';
import Search from '../CommonComponent/Search';

let strings = new LocalizedStrings(language);

class Research extends Component {
    constructor() {
        super();
        this.state = {
            language_id: '',
            showKeyword: ''
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        let language_id = localStorage.getItem("language_id")
        let showKeyword = localStorage.getItem("keyword")
        this.setState({
            language_id: language_id,
            showKeyword: showKeyword
        });
        jQuery("body").addClass("template template-research template-researchfooter")
    }

    handleArticle = () => {
        localStorage.removeItem("keyword");
    }

    getLanguageCode=(lang)=>{
        this.props.getlanguage(lang);
    }

    componentDidUpdate() {
        let showKeyword = localStorage.getItem("keyword")
        if(showKeyword) {
            localStorage.removeItem("keyword");
        }
    }

    render() {

        strings.setLanguage(this.state.language_id);

        let headContent = linkHeader.map((lin, index) => {
            return (
                <link key={index} rel={lin.rel} hreflang={lin.hreflang} href={url.ORIGIN_URL+lin.href+"research"}/>
            )
        })

        let test_status = localStorage.getItem("test_status");
        if(test_status == "not_completed") {
            window.location.replace(`${url.ORIGIN_URL}/test`)
        } else {
            return (
                <div>
                    <Helmet>
                        {headContent}
                        <title>{strings.RESEARCH_INDEX_META_TITLE}</title>
                        <meta name="description" content={strings.RESEARCH_INDEX_META_DESCRIPTION} />
                    </Helmet>
                    <CommonHeader  getLanguageCode ={this.getLanguageCode}/>
                    <Search />
                    <section className="research-content">
                        <div className="container d-lg-flex">
                            <div className="research-sidebar order-lg-last">
                                <div className="widget">
                                    {renderHTML(strings.RESEARCH_COLLABORATIONS)}
                                </div>
                            </div>
                            <div className="research-primary order-lg-first">
                                { this.state.showKeyword ? <h2 className="research-heading">{ strings.RESEARCH_SEARCH_RESULT } "{this.state.showKeyword }"</h2> : <h2 className="research-heading">{ strings.RESEARCH_KEY_PAPERS }</h2> }
                                <div className="research-item">
                                    <h4><a href="/data-driven-personality-model" onClick={ this.handleArticle }>{ strings.RESEARCH_TITLE }</a></h4>
                                    <div className="research-item-meta">
                                        <p>{ strings.RESEARCH_WRITTEN_BY } <u>{strings.MARK_NAME}</u></p>
                                    </div>
                                    <p>{strings.RESEARCH_DESC} <a href="/data-driven-personality-model" onClick={ this.handleArticle }>{ strings.RESEARCH_KEEP_READING }</a></p>
                                </div>
                            </div>
                        </div>
                    </section>
                    <CommonFooter getLanguageCode ={this.getLanguageCode}/>
                </div>
            )
        }
    }
}

export default Research;
