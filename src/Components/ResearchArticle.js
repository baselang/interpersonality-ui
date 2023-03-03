import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import jQuery from 'jquery';
import $ from 'jquery';
import LocalizedStrings from 'react-localization';
import { language } from './Language';
import linkHeader from '../CommonComponent/Link';
import url from '../CommonComponent/CommonURL';
import CommonHeader from '../CommonComponent/CommonHeader';
import CommonFooter from '../CommonComponent/CommonFooter';
import Search from '../CommonComponent/Search';
import renderHTML from 'react-render-html';
import '../Assets/css/style_manual.css';
import {isMobile} from 'react-device-detect';
import research_bar1 from '../Assets/images/v2/research_bar1.png';
import research_bar2 from '../Assets/images/v2/research_bar2.png';
import research_bar3 from '../Assets/images/v2/research_bar3.png';
import research_bar4 from '../Assets/images/v2/research_bar4.png';
import research_bar5 from '../Assets/images/v2/research_bar5.png';
import research_bar6 from '../Assets/images/v2/research_bar6.png';
import research_bar7 from '../Assets/images/v2/research_bar7.png';
import research_bar8 from '../Assets/images/v2/research_bar8.png';
import research_bar9 from '../Assets/images/v2/research_bar9.png';
import research_bar10 from '../Assets/images/v2/research_bar10.png';
import research_bar11 from '../Assets/images/v2/research_bar11.png';
import research_bar12 from '../Assets/images/v2/research_bar12.png';
import research_bar13 from '../Assets/images/v2/research_bar13.png';
import research_bar14 from '../Assets/images/v2/research_bar14.png';
import research_pdf from '../Assets/pdf/The-development-of-the-Interpersonality-model.pdf';

let strings = new LocalizedStrings(language);

class ResearchArticle extends Component {
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

    getLanguageCode=(lang)=>{
        this.props.getlanguage(lang);
    }

    componentDidUpdate(){
        if(!isMobile) {
            $(document).ready(function () {
                function scroll_nav() {
                    $(window).scroll(function() {
                        let height = $(window).scrollTop();
                        let topSpace = 100;
                        if(height < 9000) {
                            topSpace = 100;
                        } else if(height < 18000) {
                            topSpace = -300;
                        }else {
                            topSpace = -800;
                        }
                        $('div.research-sidebar').sticky({
                            topSpacing: topSpace,
                            bottomSpacing: 500,
                            wrapperClassName: 'research-sidebar-sticky-wrapper'
                        });
                    });
        
                    $('div.research-sidebar a').on('click', function(e) {
                        var target = $(this).attr('href');
                        var checkURL = target.match(/#([^\/]+)$/i);
                        if(checkURL !== null) {
                            if( checkURL[0] ) {
                                var go_position = $(target).offset().top - 100;
                                $('html,body').animate({
                                    scrollTop: go_position
                                }, 400);
                            }
                            e.preventDefault();
                        }
                    });
        
                    $('body').scrollspy({
                        target: 'div.research-sidebar' ,
                        offset: 180
                    });
                }
        
                if( $('div.research-sidebar').length ) {
                    scroll_nav();
                }
            });
        }
    }
    
    render() {

        strings.setLanguage(this.state.language_id);

        let headContent = linkHeader.map((lin, index) => {
            return (
                <link key={index} rel={lin.rel} hreflang={lin.hreflang} href={url.ORIGIN_URL+lin.href+"data-driven-personality-model"}/>
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
                        <title>{strings.RESEARCH_ARTICLE_META_TITLE}</title>
                        <meta name="description" content={strings.RESEARCH_ARTICLE_META_DESCRIPTION} />
                    </Helmet>
                    <CommonHeader getLanguageCode ={this.getLanguageCode} />
                    <Search />
                    <section className="research-content">
                        <div className="container d-lg-flex">
                            <div className="research-primary">
                                <h1>{ strings.RESEARCH_ARTICLE_TITLE }</h1>
                                <div className="research-item-meta">
                                    <p>{strings.RESEARCH_ARTICLE_WRITTEN_BY} <u>{strings.MARK_NAME}</u></p>                                
                                </div>
                                <div className="research-sidebar d-lg-none">
                                    <div className="widget widget-research-meta">
                                        {renderHTML( strings.formatString(strings.RESEARCH_ARTICLE_PUBLISHED_AND_KEYWORDS,research_pdf))}
                                    </div>
                                    <div className="widget widget-research-toc">
                                    <p><strong>{ strings.RESEARCH_ARTICLE_CONTENTS }</strong></p>
                                        <div className="collapse" id="collapse-research-toc">
                                            <ul className="menu">
                                                <li><a href="#abstract" className="nav-link">{strings.RESEARCH_ARTICLE_ABSTRACT}</a></li>
                                                <li><a href="#acknowledgments" className="nav-link">{strings.RESEARCH_ARTICLE_ACKNOWLEDGEMENTS}</a>
                                                    <ul className="sub-menu" className="nav-link">
                                                        <li><a href="#ipip" className="nav-link">{ strings.RESEARCH_ARTICLE_IPIP }</a></li>
                                                        <li><a href="#costamccrae" className="nav-link">{ strings.RESEARCH_ARTICLE_COSTA_MCCRAE }</a></li>
                                                        <li><a href="#jhonjohson" className="nav-link">{ strings.RESEARCH_ARTICLE_JHON_JOHSON }</a></li>
                                                    </ul>
                                                </li>
                                                <li><a href="#r_1" className="nav-link">{strings.RESEARCH_ARTICLE_RESEARCH_OBJECTIVES}</a>
                                                    <ul className="sub-menu">
                                                        <li><a href="#r_1_1" className="nav-link">{ strings.RESEARCH_ARTICLE_CRITERIA }</a></li>
                                                    </ul>
                                                </li>
                                                <li><a href="#r_2" className="nav-link">{strings.RESEARCH_ARTICLE_LEPM}</a>
                                                    <ul className="sub-menu">
                                                        <li><a href="#r_2_1" className="nav-link">{ strings.RESEARCH_ARTICLE_DMCM }</a></li>
                                                        <li><a href="#r_2_2" className="nav-link">{ strings.RESEARCH_ARTICLE_LIMITED_SCOPE }</a>
                                                            <ul className="sub-menu">
                                                                <li><a href="#r_2_2_1" className="nav-link">{ strings.RESEARCH_ARTICLE_HISTORICAL_PERSPECTIVE }</a></li>
                                                                <li><a href="#r_2_2_2" className="nav-link">{ strings.RESEARCH_ARTICLE_STATISTICAL_PERSPECTIVE }</a></li>
                                                            </ul>
                                                        </li>
                                                        <li><a href="#r_2_3" className="nav-link">{ strings.RESEARCH_ARTICLE_FALSE_DISTINCTIONS }</a></li>
                                                    </ul>
                                                </li>
                                                <li><a href="#r_3" className="nav-link">{strings.RESEARCH_ARTICLE_BIG_FIVE_TEST}</a>
                                                    <ul className="sub-menu">
                                                        <li><a href="#r_3_1" className="nav-link">{ strings.RESEARCH_ARTICLE_ORTHOGONAL_TRAITS }</a></li>
                                                        <li><a href="#r_3_2" className="nav-link">{ strings.RESEARCH_ARTICLE_RESTEST_RELIABILITY }</a></li>
                                                        <li><a href="#r_3_3" className="nav-link">{ strings.RESEARCH_ARTICLE_CROSS_CULTURAL_VALIDITY }</a></li>
                                                        <li><a href="#r_3_4" className="nav-link">{ strings.RESEARCH_ARTICLE_CBFTQ }</a></li>
                                                        <li><a href="#r_3_5" className="nav-link">{ strings.RESEARCH_ARTICLE_TMNPTM }</a></li>
                                                    </ul>
                                                </li>
                                                <li><a href="#r_4" className="nav-link">{strings.RESEARCH_ARTICLE_BUILDING_NEW_MODEL}</a>
                                                    <ul className="sub-menu">
                                                        <li><a href="#r_4_1" className="nav-link">{ strings.RESEARCH_ARTICLE_PERSONALITY_TYPES }</a></li>
                                                        <li><a href="#r_4_2" className="nav-link">{ strings.RESEARCH_ARTICLE_DATA_COLLECTION }</a>
                                                            <ul className="sub-menu">
                                                                <li><a href="#r_4_2_1" className="nav-link">{ strings.RESEARCH_ARTICLE_OUTPUT_DESCRIPTIONS }</a></li>
                                                                <li><a href="#r_4_2_2" className="nav-link">{ strings.RESEARCH_ARTICLE_DEMOGRAPHICS }</a></li>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li><a href="#r_5" className="nav-link">{ strings.RESEARCH_ARTICLE_APPROACH_TODEVELOP }</a>
                                                    <ul className="sub-menu">
                                                        <li><a href="#r_5_1" className="nav-link">{ strings.RESEARCH_ARTICLE_CLASSIFICATION_BASED_ON_FIVE }</a>
                                                            <ul className="sub-menu">
                                                                <li><a href="#r_5_1_1" className="nav-link">{ strings.RESEARCH_ARTICLE_POOR_STATISTICAL }</a></li>
                                                                <li><a href="#r_5_1_2" className="nav-link">{ strings.RESEARCH_ARTICLE_NO_USEFUL_INSIGHT }</a></li>
                                                            </ul>
                                                        </li>
                                                        <li><a href="#r_5_2" className="nav-link">{ strings.RESEARCH_ARTICLE_PARTITIONING_THE_TRAIT_SPACE }</a>
                                                            <ul className="sub-menu">
                                                                <li><a href="#r_5_2_1" className="nav-link">{ strings.RESEARCH_ARTICLE_DISTRIBUTION_OF_PEOPLE }</a></li>
                                                            </ul>
                                                        </li>
                                                        <li><a href="#r_5_3" className="nav-link">{ strings.RESEARCH_ARTICLE_CLASSIFICATION_BASED_ON_OUTPUT }</a>
                                                            <ul className="sub-menu">
                                                                    <li><a href="#r_5_3_1" className="nav-link">{strings.RESEARCH_ARTICLE_THE_CURSE_OF_DIMENSIONALITY}</a>
                                                                    <ul className="sub-menu">
                                                                        <li><a href="#r_5_3_1_1" className="nav-link">{ strings.RESEARCH_ARTICLE_LINIER_REGRESSION }</a></li>
                                                                        <li><a href="#r_5_3_1_2" className="nav-link">{ strings.RESEARCH_ARTICLE_MARS_MODELING }</a></li>
                                                                        <li><a href="#r_5_3_1_3" className="nav-link">{ strings.RESEARCH_ARTICLE_USING_LINEAR_REGRESSION }</a></li>
                                                                    </ul>
                                                                </li>
                                                                <li><a href="#r_5_3_2" className="nav-link">{ strings.RESEARCH_ARTICLE_CLASSIFICATION_BASED_ON_OUTPUT_VALUES }</a></li>
                                                            </ul>
                                                        </li>
                                                        <li><a href="#r_5_4" className="nav-link">{ strings.RESEARCH_ARTICLE_SIMPLE_OR_COMREHENSIVE }</a></li>
                                                        <li><a href="#r_5_5" className="nav-link">{ strings.RESEARCH_ARTICLE_GROUPING_OUTPUT }</a></li>
                                                        <li><a href="#r_5_6" className="nav-link">{ strings.RESEARCH_ARTICLE_THE_FINAL_MODEL }</a>
                                                            <ul className="sub-menu">
                                                                <li><a href="#r_5_6_1" className="nav-link">{ strings.RESEARCH_ARTICLE_THE_THEMES_AND_STYLE }</a>
                                                                    <ul className="sub-menu">
                                                                        <li><a href="#r_5_6_1_1" className="nav-link">{ strings.RESEARCH_ARTICLE_STATISTICAL_CRITERIA_FOR }</a></li>
                                                                        <li><a href="#r_5_6_1_2" className="nav-link">{ strings.RESEARCH_ARTICLE_INFLUENCE_OF_FACTES }</a></li>
                                                                    </ul>
                                                                </li>
                                                                <li><a href="#r_5_6_2" className="nav-link">{ strings.RESEARCH_ARTICLE_SOME_EXAMPLE_THEMES }</a>
                                                                    <ul className="sub-menu">
                                                                        <li><a href="#r_5_6_2_1" className="nav-link">{ strings.RESEARCH_ARTICLE_THE_EXTRAVERSION_THEME }</a></li>
                                                                        <li><a href="#r_5_6_2_2" className="nav-link">{ strings.RESEARCH_ARTICLE_THE_THINKING_STYLE_THEME }</a></li>
                                                                        <li><a href="#r_5_6_2_3" className="nav-link">{ strings.RESEARCH_ARTICLE_THE_LEARNING_THEME }</a></li>
                                                                    </ul>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li><a href="#r_6" className="nav-link">{ strings.RESEARCH_ARTICLE_NUMBER_OF_PERSONALITY }</a></li>
                                                <li><a href="#r_7" className="nav-link">{ strings.RESEARCH_ARTICLE_FUTURE_RESEARCH }</a>
                                                    <ul className="sub-menu">
                                                        <li><a href="#r_7_1" className="nav-link">{ strings.RESEARCH_ARTICLE_CROSS_VALIDATION }</a></li>
                                                        <li><a href="#r_7_2" className="nav-link">{ strings.RESEARCH_ARTICLE_RESEARCH_COMMUNITY }</a></li>
                                                    </ul>
                                                </li>
                                                <li><a href="#footnotes" className="nav-link">{ strings.RESEARCH_ARTICLE_FOOTNOTES }</a></li>
                                            </ul>
                                        </div>
                                        <a href="#collapse-research-toc" className="collapsed" data-toggle="collapse"><span className="show">{strings.RESEARCH_ARTICLE_SHOW_CONTENTS}</span><span className="hide">{strings.RESEARCH_ARTICLE_HIDE_CONTENTS}</span></a>
                                    </div>
                                </div>
                                <div className="research-item-content">
                                    <h2 id="abstract">{ strings.RESEARCH_ARTICLE_ABSTRACT }</h2>
                                    {renderHTML(strings.RESEARCH_ARTICLE_ABSTRACT_CONTENT)}
                                    <h2 id="acknowledgments">{ strings.RESEARCH_ARTICLE_ACKNOWLEDGEMENTS }</h2>
                                    {renderHTML(strings.RESEARCH_ARTICLE_ACKNOWLEDGEMENTS_CONTENT)}
                                    <h3 id="ipip">{ strings.RESEARCH_ARTICLE_IPIP }</h3>
                                    {renderHTML(strings.RESEARCH_ARTICLE_IPIP_CONTENT)}
                                    <h3 id="costamccrae">{ strings.RESEARCH_ARTICLE_COSTA_MCCRAE }</h3>
                                    {renderHTML(strings.RESEARCH_ARTICLE_COSTA_MCCRAE_CONTENT)}
                                    <h3 id="jhonjohson">{ strings.RESEARCH_ARTICLE_JHON_JOHSON }</h3>
                                    {renderHTML(strings.RESEARCH_ARTICLE_JHON_JOHSON_CONTENT)}
                                    <h2 id="r_1">{ strings.RESEARCH_ARTICLE_RESEARCH_OBJECTIVES }</h2>
                                    {renderHTML(strings.RESEARCH_ARTICLE_RESEARCH_OBJECTIVES_CONTENT)}
                                    <h3 id="r_1_1">{ strings.RESEARCH_ARTICLE_CRITERIA }</h3>
                                    {renderHTML(strings.RESEARCH_ARTICLE_CRITERIA_CONTENT)}
                                    <h2 id="r_2">{ strings.RESEARCH_ARTICLE_LEPM }</h2>
                                    {renderHTML(strings.RESEARCH_ARTICLE_LEPM_CONTENT)}
                                    <h3 id="r_2_1">{ strings.RESEARCH_ARTICLE_DMCM }</h3>
                                    {renderHTML(strings.RESEARCH_ARTICLE_DMCM_CONTENT)}
                                    <h3 id="r_2_2">{ strings.RESEARCH_ARTICLE_LIMITED_SCOPE }</h3>
                                    {renderHTML(strings.RESEARCH_ARTICLE_LIMITED_SCOPE_CONTENT)}
                                    <ol><li className="li_style_none"><h3 id="r_2_2_1">{strings.RESEARCH_ARTICLE_HISTORICAL_PERSPECTIVE}</h3></li></ol>
                                    {renderHTML(strings.RESEARCH_ARTICLE_HISTORICAL_PERSPECTIVE_CONTENT)}
                                    <ol><li className="li_style_none"><h3 id="r_2_2_2">{strings.RESEARCH_ARTICLE_STATISTICAL_PERSPECTIVE}</h3></li></ol>
                                    {renderHTML(strings.RESEARCH_ARTICLE_STATISTICAL_PERSPECTIVE_CONTENT)}
                                    <h3 id="r_2_3">{ strings.RESEARCH_ARTICLE_FALSE_DISTINCTIONS }</h3>
                                    {renderHTML(strings.RESEARCH_ARTICLE_FALSE_DISTINCTIONS_CONTENT)}
                                    <h2 id="r_3">{ strings.RESEARCH_ARTICLE_BIG_FIVE_TEST }</h2>
                                    {renderHTML(strings.RESEARCH_ARTICLE_BIG_FIVE_TEST_CONTENT)}
                                    <h3 id="r_3_1">{ strings.RESEARCH_ARTICLE_ORTHOGONAL_TRAITS }</h3>
                                    {renderHTML(strings.RESEARCH_ARTICLE_ORTHOGONAL_TRAITS_CONTENT)}
                                    <h3 id="r_3_2">{ strings.RESEARCH_ARTICLE_RESTEST_RELIABILITY }</h3>
                                    {renderHTML(strings.RESEARCH_ARTICLE_RESTEST_RELIABILITY_CONTENT)}
                                    <h3 id="r_3_3">{ strings.RESEARCH_ARTICLE_CROSS_CULTURAL_VALIDITY }</h3>
                                    {renderHTML(strings.RESEARCH_ARTICLE_CROSS_CULTURAL_VALIDITY_CONTENT)}
                                    <h3 id="r_3_4">{ strings.RESEARCH_ARTICLE_CBFTQ }</h3>
                                    {renderHTML(strings.RESEARCH_ARTICLE_CBFTQ_CONTENT)}
                                    <h3 id="r_3_5">{ strings.RESEARCH_ARTICLE_TMNPTM }</h3>
                                    {renderHTML(strings.RESEARCH_ARTICLE_TMNPTM_CONTENT)}
                                    <h2 id="r_4">{strings.RESEARCH_ARTICLE_BUILDING_NEW_MODEL }</h2>
                                    {renderHTML(strings.RESEARCH_ARTICLE_BUILDING_NEW_MODEL_CONTENT)}
                                    <h3 id="r_4_1">{strings.RESEARCH_ARTICLE_PERSONALITY_TYPES }</h3>
                                    {renderHTML(strings.RESEARCH_ARTICLE_PERSONALITY_TYPES_CONTENT)}
                                    <h3 id="r_4_2">{strings.RESEARCH_ARTICLE_DATA_COLLECTION }</h3>
                                    {renderHTML(strings.RESEARCH_ARTICLE_DATA_COLLECTION_CONTENT)}
                                    <h3 id="r_4_2_1">{strings.RESEARCH_ARTICLE_OUTPUT_DESCRIPTIONS }</h3>
                                    {renderHTML(strings.RESEARCH_ARTICLE_OUTPUT_DESCRIPTIONS_CONTENT)}
                                    <h3 id="r_4_2_2">{strings.RESEARCH_ARTICLE_DEMOGRAPHICS }</h3>
                                    {renderHTML(strings.RESEARCH_ARTICLE_DEMOGRAPHICS_CONTENT)}
                                    <h2 id="r_5">{ strings.RESEARCH_ARTICLE_APPROACH_TODEVELOP }</h2>
                                    {renderHTML(strings.RESEARCH_ARTICLE_APPROACH_TODEVELOP_CONTENT)}
                                    <h3 id="r_5_1">{ strings.RESEARCH_ARTICLE_CLASSIFICATION_BASED_ON_FIVE }</h3>
                                    {renderHTML(strings.RESEARCH_ARTICLE_CLASSIFICATION_BASED_ON_FIVE_CONTENT)}
                                    <h3 id="r_5_1_1">{ strings.RESEARCH_ARTICLE_POOR_STATISTICAL }</h3>
                                    {renderHTML(strings.RESEARCH_ARTICLE_POOR_STATISTICAL_CONTENT)}
                                    <h3 id="r_5_1_2">{ strings.RESEARCH_ARTICLE_NO_USEFUL_INSIGHT }</h3>
                                    {renderHTML(strings.RESEARCH_ARTICLE_NO_USEFUL_INSIGHT_CONTENT)}
                                    <h3 id="r_5_2">{ strings.RESEARCH_ARTICLE_PARTITIONING_THE_TRAIT_SPACE }</h3>
                                    {renderHTML(strings.RESEARCH_ARTICLE_PARTITIONING_THE_TRAIT_SPACE_CONTENT)}
                                    <h3 id="r_5_2_1">{ strings.RESEARCH_ARTICLE_DISTRIBUTION_OF_PEOPLE }</h3>
                                    {renderHTML(strings.RESEARCH_ARTICLE_DISTRIBUTION_OF_PEOPLE_CONTENT)}
                                    <h3 id="r_5_3">{ strings.RESEARCH_ARTICLE_CLASSIFICATION_BASED_ON_OUTPUT }</h3>
                                    {renderHTML(strings.RESEARCH_ARTICLE_CLASSIFICATION_BASED_ON_OUTPUT_CONTENT)}
                                    <h3 id="r_5_3_1">{ strings.RESEARCH_ARTICLE_THE_CURSE_OF_DIMENSIONALITY }</h3>
                                    {renderHTML(strings.RESEARCH_ARTICLE_THE_CURSE_OF_DIMENSIONALITY_CONTENT)}
                                    <h3 id="r_5_3_1_1">{ strings.RESEARCH_ARTICLE_LINIER_REGRESSION }</h3>
                                    {renderHTML(strings.formatString(strings.RESEARCH_ARTICLE_LINIER_REGRESSION_CONTENT,research_bar1,research_bar2,research_bar3,research_bar4,research_bar5,research_bar6,research_bar7,research_bar8,research_bar9,research_bar10,research_bar11))}
                                    <h3 id="r_5_3_1_2">{ strings.RESEARCH_ARTICLE_MARS_MODELING }</h3>
                                    {renderHTML(strings.RESEARCH_ARTICLE_MARS_MODELING_CONTENT)}
                                    <h3 id="r_5_3_1_3">{ strings.RESEARCH_ARTICLE_USING_LINEAR_REGRESSION }</h3>
                                    {renderHTML(strings.RESEARCH_ARTICLE_USING_LINEAR_REGRESSION_CONTENT)}
                                    <h3 id="r_5_3_2">{ strings.RESEARCH_ARTICLE_CLASSIFICATION_BASED_ON_OUTPUT_VALUES }</h3>
                                    {renderHTML(strings.RESEARCH_ARTICLE_CLASSIFICATION_BASED_ON_OUTPUT_VALUES_CONTENT)}
                                    <h3 id="r_5_4">{ strings.RESEARCH_ARTICLE_SIMPLE_OR_COMREHENSIVE }</h3>
                                    {renderHTML(strings.RESEARCH_ARTICLE_SIMPLE_OR_COMREHENSIVE_CONTENT)}
                                    <h3 id="r_5_5">{ strings.RESEARCH_ARTICLE_GROUPING_OUTPUT }</h3>
                                    {renderHTML(strings.formatString(strings.RESEARCH_ARTICLE_GROUPING_OUTPUT_CONTENT, research_bar13, research_bar14))}
                                    <h3 id="r_5_6">{ strings.RESEARCH_ARTICLE_THE_FINAL_MODEL }</h3>
                                    {renderHTML(strings.formatString(strings.RESEARCH_ARTICLE_THE_FINAL_MODEL_CONTENT,research_bar12))}
                                    <h3 id="r_5_6_1">{ strings.RESEARCH_ARTICLE_THE_THEMES_AND_STYLE }</h3>
                                    {renderHTML(strings.RESEARCH_ARTICLE_THE_THEMES_AND_STYLE_CONTENT)}
                                    <h3 id="r_5_6_1_1">{ strings.RESEARCH_ARTICLE_STATISTICAL_CRITERIA_FOR }</h3>
                                    {renderHTML(strings.RESEARCH_ARTICLE_STATISTICAL_CRITERIA_FOR_CONTENT)}
                                    <h3 id="r_5_6_1_2">{ strings.RESEARCH_ARTICLE_INFLUENCE_OF_FACTES }</h3>
                                    {renderHTML(strings.RESEARCH_ARTICLE_INFLUENCE_OF_FACTES_CONTENT)}
                                    <h3 id="r_5_6_2">{ strings.RESEARCH_ARTICLE_SOME_EXAMPLE_THEMES }</h3>
                                    {renderHTML(strings.RESEARCH_ARTICLE_SOME_EXAMPLE_THEMES_CONTENT)}
                                    <h3 id="r_5_6_2_1">{ strings.RESEARCH_ARTICLE_THE_EXTRAVERSION_THEME }</h3>
                                    {renderHTML(strings.RESEARCH_ARTICLE_THE_EXTRAVERSION_THEME_CONTENT)}
                                    <h3 id="r_5_6_2_2">{ strings.RESEARCH_ARTICLE_THE_THINKING_STYLE_THEME }</h3>
                                    {renderHTML(strings.RESEARCH_ARTICLE_THE_THINKING_STYLE_THEME_CONTENT)}
                                    <h3 id="r_5_6_2_3">{ strings.RESEARCH_ARTICLE_THE_LEARNING_THEME }</h3>
                                    {renderHTML(strings.RESEARCH_ARTICLE_THE_LEARNING_THEME_CONTENT)}
                                    <h2 id="r_6">{ strings.RESEARCH_ARTICLE_NUMBER_OF_PERSONALITY }</h2>
                                    {renderHTML(strings.RESEARCH_ARTICLE_NUMBER_OF_PERSONALITY_CONTENT)}
                                    <h2 id="r_7">{ strings.RESEARCH_ARTICLE_FUTURE_RESEARCH }</h2>
                                    <h3 id="r_7_1">{ strings.RESEARCH_ARTICLE_CROSS_VALIDATION }</h3>
                                    {renderHTML(strings.RESEARCH_ARTICLE_CROSS_VALIDATION_CONTENT)}
                                    <h3 id="r_7_2">{ strings.RESEARCH_ARTICLE_RESEARCH_COMMUNITY }</h3>
                                    {renderHTML(strings.RESEARCH_ARTICLE_RESEARCH_COMMUNITY_CONTENT)}
                                    <h2 id="footnotes">{ strings.RESEARCH_ARTICLE_FOOTNOTES }</h2>
                                    {renderHTML(strings.RESEARCH_ARTICLE_FOOTNOTES_CONTENT)}
                                </div>
                            </div>
                            <div id="research-sidebar" className="research-sidebar d-none d-lg-block">
                                <div className="widget widget-research-meta">
                                    {renderHTML(strings.formatString(strings.RESEARCH_ARTICLE_PUBLISHED_AND_KEYWORDS,research_pdf))}
                                </div>
                                <div className="widget widget-research-hrefc">
                                    <p><strong>{strings.RESEARCH_ARTICLE_CONTENTS}</strong></p>
                                    <ul className="menu scroll">
                                        <li><a href="#abstract" className="nav-link">{strings.RESEARCH_ARTICLE_ABSTRACT}</a></li>
                                        <li><a href="#acknowledgments" className="nav-link">{strings.RESEARCH_ARTICLE_ACKNOWLEDGEMENTS}</a>
                                            <ul className="sub-menu" className="nav-link">
                                                <li><a href="#ipip" className="nav-link">{ strings.RESEARCH_ARTICLE_IPIP }</a></li>
                                                <li><a href="#costamccrae" className="nav-link">{ strings.RESEARCH_ARTICLE_COSTA_MCCRAE }</a></li>
                                                <li><a href="#jhonjohson" className="nav-link">{ strings.RESEARCH_ARTICLE_JHON_JOHSON }</a></li>
                                            </ul>
                                        </li>
                                        <li><a href="#r_1" className="nav-link">{strings.RESEARCH_ARTICLE_RESEARCH_OBJECTIVES}</a>
                                            <ul className="sub-menu">
                                                <li><a href="#r_1_1" className="nav-link">{ strings.RESEARCH_ARTICLE_CRITERIA }</a></li>
                                            </ul>
                                        </li>
                                        <li><a href="#r_2" className="nav-link">{strings.RESEARCH_ARTICLE_LEPM}</a>
                                            <ul className="sub-menu">
                                                <li><a href="#r_2_1" className="nav-link">{ strings.RESEARCH_ARTICLE_DMCM }</a></li>
                                                <li><a href="#r_2_2" className="nav-link">{ strings.RESEARCH_ARTICLE_LIMITED_SCOPE }</a>
                                                    <ul className="sub-menu">
                                                        <li><a href="#r_2_2_1" className="nav-link">{ strings.RESEARCH_ARTICLE_HISTORICAL_PERSPECTIVE }</a></li>
                                                        <li><a href="#r_2_2_2" className="nav-link">{ strings.RESEARCH_ARTICLE_STATISTICAL_PERSPECTIVE }</a></li>
                                                    </ul>
                                                </li>
                                                <li><a href="#r_2_3" className="nav-link">{ strings.RESEARCH_ARTICLE_FALSE_DISTINCTIONS }</a></li>
                                            </ul>
                                        </li>
                                        <li><a href="#r_3" className="nav-link">{strings.RESEARCH_ARTICLE_BIG_FIVE_TEST}</a>
                                            <ul className="sub-menu">
                                                <li><a href="#r_3_1" className="nav-link">{ strings.RESEARCH_ARTICLE_ORTHOGONAL_TRAITS }</a></li>
                                                <li><a href="#r_3_2" className="nav-link">{ strings.RESEARCH_ARTICLE_RESTEST_RELIABILITY }</a></li>
                                                <li><a href="#r_3_3" className="nav-link">{ strings.RESEARCH_ARTICLE_CROSS_CULTURAL_VALIDITY }</a></li>
                                                <li><a href="#r_3_4" className="nav-link">{ strings.RESEARCH_ARTICLE_CBFTQ }</a></li>
                                                <li><a href="#r_3_5" className="nav-link">{ strings.RESEARCH_ARTICLE_TMNPTM }</a></li>
                                            </ul>
                                        </li>
                                        <li><a href="#r_4" className="nav-link">{strings.RESEARCH_ARTICLE_BUILDING_NEW_MODEL}</a>
                                            <ul className="sub-menu">
                                                <li><a href="#r_4_1" className="nav-link">{ strings.RESEARCH_ARTICLE_PERSONALITY_TYPES }</a></li>
                                                <li><a href="#r_4_2" className="nav-link">{ strings.RESEARCH_ARTICLE_DATA_COLLECTION }</a>
                                                    <ul className="sub-menu">
                                                        <li><a href="#r_4_2_1" className="nav-link">{ strings.RESEARCH_ARTICLE_OUTPUT_DESCRIPTIONS }</a></li>
                                                        <li><a href="#r_4_2_2" className="nav-link">{ strings.RESEARCH_ARTICLE_DEMOGRAPHICS }</a></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>
                                        <li><a href="#r_5" className="nav-link">{ strings.RESEARCH_ARTICLE_APPROACH_TODEVELOP }</a>
                                            <ul className="sub-menu">
                                                <li><a href="#r_5_1" className="nav-link">{ strings.RESEARCH_ARTICLE_CLASSIFICATION_BASED_ON_FIVE }</a>
                                                    <ul className="sub-menu">
                                                        <li><a href="#r_5_1_1" className="nav-link">{ strings.RESEARCH_ARTICLE_POOR_STATISTICAL }</a></li>
                                                        <li><a href="#r_5_1_2" className="nav-link">{ strings.RESEARCH_ARTICLE_NO_USEFUL_INSIGHT }</a></li>
                                                    </ul>
                                                </li>
                                                <li><a href="#r_5_2" className="nav-link">{ strings.RESEARCH_ARTICLE_PARTITIONING_THE_TRAIT_SPACE }</a>
                                                    <ul className="sub-menu">
                                                        <li><a href="#r_5_2_1" className="nav-link">{ strings.RESEARCH_ARTICLE_DISTRIBUTION_OF_PEOPLE }</a></li>
                                                    </ul>
                                                </li>
                                                <li><a href="#r_5_3" className="nav-link">{ strings.RESEARCH_ARTICLE_CLASSIFICATION_BASED_ON_OUTPUT }</a>
                                                    <ul className="sub-menu">
                                                            <li><a href="#r_5_3_1" className="nav-link">{strings.RESEARCH_ARTICLE_THE_CURSE_OF_DIMENSIONALITY}</a>
                                                            <ul className="sub-menu">
                                                                <li><a href="#r_5_3_1_1" className="nav-link">{ strings.RESEARCH_ARTICLE_LINIER_REGRESSION }</a></li>
                                                                <li><a href="#r_5_3_1_2" className="nav-link">{ strings.RESEARCH_ARTICLE_MARS_MODELING }</a></li>
                                                                <li><a href="#r_5_3_1_3" className="nav-link">{ strings.RESEARCH_ARTICLE_USING_LINEAR_REGRESSION }</a></li>
                                                            </ul>
                                                        </li>
                                                        <li><a href="#r_5_3_2" className="nav-link">{ strings.RESEARCH_ARTICLE_CLASSIFICATION_BASED_ON_OUTPUT_VALUES }</a></li>
                                                    </ul>
                                                </li>
                                                <li><a href="#r_5_4" className="nav-link">{ strings.RESEARCH_ARTICLE_SIMPLE_OR_COMREHENSIVE }</a></li>
                                                <li><a href="#r_5_5" className="nav-link">{ strings.RESEARCH_ARTICLE_GROUPING_OUTPUT }</a></li>
                                                <li><a href="#r_5_6" className="nav-link">{ strings.RESEARCH_ARTICLE_THE_FINAL_MODEL }</a>
                                                    <ul className="sub-menu">
                                                        <li><a href="#r_5_6_1" className="nav-link">{ strings.RESEARCH_ARTICLE_THE_THEMES_AND_STYLE }</a>
                                                            <ul className="sub-menu">
                                                                <li><a href="#r_5_6_1_1" className="nav-link">{ strings.RESEARCH_ARTICLE_STATISTICAL_CRITERIA_FOR }</a></li>
                                                                <li><a href="#r_5_6_1_2" className="nav-link">{ strings.RESEARCH_ARTICLE_INFLUENCE_OF_FACTES }</a></li>
                                                            </ul>
                                                        </li>
                                                        <li><a href="#r_5_6_2" className="nav-link">{ strings.RESEARCH_ARTICLE_SOME_EXAMPLE_THEMES }</a>
                                                            <ul className="sub-menu">
                                                                <li><a href="#r_5_6_2_1" className="nav-link">{ strings.RESEARCH_ARTICLE_THE_EXTRAVERSION_THEME }</a></li>
                                                                <li><a href="#r_5_6_2_2" className="nav-link">{ strings.RESEARCH_ARTICLE_THE_THINKING_STYLE_THEME }</a></li>
                                                                <li><a href="#r_5_6_2_3" className="nav-link">{ strings.RESEARCH_ARTICLE_THE_LEARNING_THEME }</a></li>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>
                                        <li><a href="#r_6" className="nav-link">{ strings.RESEARCH_ARTICLE_NUMBER_OF_PERSONALITY }</a></li>
                                        <li><a href="#r_7" className="nav-link">{ strings.RESEARCH_ARTICLE_FUTURE_RESEARCH }</a>
                                            <ul className="sub-menu">
                                                <li><a href="#r_7_1" className="nav-link">{ strings.RESEARCH_ARTICLE_CROSS_VALIDATION }</a></li>
                                                <li><a href="#r_7_2" className="nav-link">{ strings.RESEARCH_ARTICLE_RESEARCH_COMMUNITY }</a></li>
                                            </ul>
                                        </li>
                                        <li><a href="#footnotes" className="nav-link">{ strings.RESEARCH_ARTICLE_FOOTNOTES }</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>
                    <CommonFooter  getLanguageCode ={this.getLanguageCode}/>
                </div>
            )
        }
    }
}

export default ResearchArticle;
