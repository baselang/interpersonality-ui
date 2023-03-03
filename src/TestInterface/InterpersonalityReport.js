import React, { Component } from 'react';
import '../Assets/css/testinterface.css';
import signup_logo_small from '../Assets/images/v2/signup-logo-small.svg';
import '../Assets/css/style.css';
import LocalizedStrings from 'react-localization';
import { language } from '../Components/Language';

let strings = new LocalizedStrings(language);

class InterpersonalityReport extends Component {
    constructor() {
        super();
        this.state = {
            language_id: '',
            languageId: '',
            user_id1: '',
            user_id2: '',
            g_1_user_id: '',
            g_2_user_id: '',
            user_id_r: '',
            user_type_r: '',
            section_r: '',
            guides_section: '',
            guidesTable: true,
            interpersonalTable: false,
            filteredTable: false,
            errorMessage: '',
            loading: ''
        }
    }

    componentDidMount() {
        let language_id = localStorage.getItem("language_id")
        this.setState({
            language_id: language_id
        })
    }

    componentWillReceiveProps(prevProp, nextProp){
       if(this.state.loading != prevProp.loading){
           this.setState({loading:prevProp.loading})
       }else if(this.state.errorMessage !== prevProp.serverErrorMessage) {
            this.setState({errorMessage: prevProp.serverErrorMessage})
       }

    }

    filteredReport = () => {
        this.setState({
            languageId: '',
            user_id1: '',
            user_id2: '',
            user_id_r: '',
            g_1_user_id: '',
            g_2_user_id: '',
            user_type_r: '',
            section_r: '',
            guides_section: '',
            errorMessage: '',
            interpersonalTable: false,
            filteredTable: true,
            guidesTable: false
        })
    }

    interpersonalReport = () => {
        this.setState({
            languageId: '',
            user_id1: '',
            user_id2: '',
            user_id_r: '',
            g_1_user_id: '',
            g_2_user_id: '',
            user_type_r: '',
            section_r: '',
            guides_section: '',
            errorMessage: '',
            interpersonalTable: true,
            filteredTable: false,
            guidesTable: false
        })
    }

    guidesReport = () => {
        this.setState({
            languageId: '',
            user_id1: '',
            user_id2: '',
            user_id_r: '',
            user_type_r: '',
            g_1_user_id: '',
            g_2_user_id: '',
            section_r: '',
            guides_section: '',
            errorMessage: '',
            interpersonalTable: false,
            filteredTable: false,
            guidesTable: true
        })
    }

    handleFilteredSelfUser = (e) => {
        let user_type_r = e.target.value;
        this.setState({
            user_type_r: user_type_r
        })
    }

    handleFilteredSection = (e) => {
        let section_r = e.target.value;
        this.setState({
            section_r: section_r
        })
    }

    handleGuidesSection = (e) => {
        let guides_section = e.target.value;
        this.setState({
            guides_section: guides_section
        })
    }

    handleUserId = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleLanguageChange = (e) => {
        let languageId = e.target.value;
        this.setState({
            languageId: languageId
        })
    }

    handleFilteredReport = (e) => {
        e.preventDefault();

        let report_tab = "INDIVIDUAL_FILTERED_V1"
        let bodyData = {
            user_id: this.state.user_id_r,
            section_id: this.state.section_r,
            self_user: this.state.user_type_r,
            language_id: this.state.languageId,
            report_tab: report_tab
        }
        if(bodyData.user_id == "" || bodyData.section_id == "" || bodyData.self_user == "" || bodyData.language_id == "" || bodyData.report_tab == "") {
            this.setState({
                errorMessage: "Please add all the required information",
                filteredTable: false
            })
        }else {
            this.setState({loading: true, filteredTable: true, errorMessage: ""})
            this.props.handleFilteredAPICall(bodyData)
        }
    }

    handleInterpersonalReport = (e) => {
        e.preventDefault();

        let bodyData = {
            user_id_1: this.state.user_id1,
            user_id_2: this.state.user_id2,
            language_id: this.state.languageId
        }
        if(bodyData.user_id_1 == "" || bodyData.user_id_2 == "" || bodyData.language_id == "") {
            this.setState({
                errorMessage: "Please add all the required information",
                interpersonalTable: false
            })
        }else {
            this.setState({loading: true, interpersonalTable: true, errorMessage: ""})
            this.props.handleInterpersonalAPICall(bodyData)
        }   
    }

    handleGuidesReport = (e) => {
        e.preventDefault();

        let bodyData = {
            user_id_1: this.state.g_1_user_id,
            user_id_2: this.state.g_2_user_id,
            language_id: this.state.languageId,
            report_name: this.state.guides_section
        }
        if(bodyData.user_id_1 == "" || bodyData.user_id_2 == "" || bodyData.language_id == "" || bodyData.report_name == "") {
            this.setState({
                errorMessage: "Please add all the required information",
                guidesTable: false
            })
        }else {
            this.setState({loading: true, guidesTable: true, errorMessage: ""})
            this.props.handleGuidesAPICall(bodyData)
        }   
    }

    render() {
        strings.setLanguage(this.state.language_id);
        return (
            <div>
                { this.state.loading && <div className="loader"></div> }
                <div className="testinterface-container">
                    <div className="testinterface-header text-center">
                        <img alt="" src={ signup_logo_small } className="logo" />
                        <h2>Interpersonality</h2>
                        {this.state.errorMessage && 
                        <div className="alert alert-danger" id="errorMsg" role="alert">
                            {this.state.errorMessage}
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        }
                        <nav>
                            <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                <a onClick={this.filteredReport} className="nav-item nav-link active" id="nav-filtered-tab" data-toggle="tab" href="#nav-filtered" role="tab"
                                aria-controls="nav-filtered" aria-selected="false">Individual Filtered Report</a>
                                <a onClick={this.interpersonalReport} className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab"
                                aria-controls="nav-profile" aria-selected="false">Interpersonal Report</a>
                                <a onclick={this.guidesReport} className="nav-item nav-link" id="nav-CouplesGuide-tab" data-toggle="tab" href="#nav-guides" role="tab"
                                aria-controls="nav-+" aria-selected="false">Guides</a>
                            </div>
                        </nav>
                        <div className="tab-content py-3 px-3 px-sm-0" id="nav-tabContent">
                        <div className="tab-pane fade show active" id="nav-filtered" role="tabpanel" aria-labelledby="nav-filtered-tab">
                                <div className="testinterface">
                                    <form onSubmit={this.handleFilteredReport} id="filtered-form">
                                        <div className="row justify-content-center">
                                            <div className="col"> 
                                                <div className="form-group">
                                                    <input type="text" className="form-control" placeholder="User ID" id="user_id_r" name="user_id_r" value={this.state.user_id_r} onChange={this.handleUserId} />
                                                </div>
                                                <div className="form-group">
                                                    <select className="form-control" value={this.state.user_type_r} onChange={this.handleFilteredSelfUser} id="user_type_r" name="user_type_r">
                                                        <option className="text-muted" style={{display:"none"}} value="">User Type</option>
                                                        <option value="1">Self</option>
                                                        <option value="0">Other</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="form-group">
                                                    <select className="form-control" value={this.state.section_r} onChange={this.handleFilteredSection} id="section_r" name="section_r">
                                                        <option className="text-muted" style={{display:"none"}} value="">Section</option>
                                                        <option value="-1">All</option>
                                                        <option value="0">Summary</option>
                                                        <option value="1">Introduction</option>
                                                        <option value="2">Romantic Relationships</option>
                                                        <option value="3">Career Path</option>
                                                        <option value="4">Lifestyle</option>
                                                        <option value="5">At Work</option>
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <select className="form-control" value={this.state.languageId} onChange={this.handleLanguageChange} id="language_r" name="language_r">
                                                        <option className="text-muted" style={{display:"none"}} value="">Select Language</option>
                                                        <option value="165">English</option>
                                                        <option value="245">Español</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group submit">
                                            <button type="submit">Generate Report!</button>
                                        </div>
                                    </form>
                                </div>
                                {this.state.filteredTable &&
                                <div>
                                    <br/>
                                        <table id="test-table1_r" className="table table-dark table-hover"></table>
                                    <br/>
                                    <table id="test-table1_r1" className="table table-dark table-hover"></table>
                                    <br/>
                                    <table id="test-table1_r22" className="table table-dark table-hover"></table>
                                </div>
                                }
                            </div>
                            <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                                <div className="testinterface">
                                    <form onSubmit={this.handleInterpersonalReport} id="individual-form">
                                        <div className="row justify-content-center">
                                            <div className="col">
                                                <div className="form-group">
                                                    <input type="text" className="form-control" placeholder="User ID 1" id="user_id1" name="user_id1" value={this.state.user_id1} onChange={this.handleUserId} />
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="form-group">
                                                    <input type="text" className="form-control" placeholder="User ID 2" id="user_id2" name="user_id2" value={this.state.user_id2} onChange={this.handleUserId} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <select className="form-control" value={this.state.languageId} onChange={this.handleLanguageChange} id="userreportlanguage" name="language">
                                                <option className="text-muted" style={{display:"none"}} value="">Select Language</option>
                                                <option value="165">English</option>
                                                <option value="245">Español</option>
                                            </select>
                                        </div>
                                        <div className="form-group submit">
                                            <button type="submit">Generate Report!</button>
                                        </div>
                                    </form>
                                </div>
                                {this.state.interpersonalTable &&
                                <table id="test-table" className="table table-dark table-hover">
                                </table>
                                }
                            </div>
                            <div className="tab-pane fade" id="nav-guides" role="tabpanel" aria-labelledby="nav-guides-tab">
                                <div className="testinterface">
                                    <form onSubmit={this.handleGuidesReport} id="guides-form">
                                        <div className="row justify-content-center">
                                            <div className="col">
                                                <div className="form-group">
                                                    <input type="text" className="form-control" placeholder="User ID 1" id="g_1_user_id" name="g_1_user_id" value={this.state.g_1_user_id} onChange={this.handleUserId} />
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="form-group">
                                                    <input type="text" className="form-control" placeholder="User ID 2" id="g_2_user_id" name="g_2_user_id" value={this.state.g_2_user_id} onChange={this.handleUserId} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row justify-content-center">
                                            <div className="col">
                                                <div className="form-group">
                                                    <select className="form-control" value={this.state.languageId} onChange={this.handleLanguageChange} id="language_id" name="language_id">
                                                        <option className="text-muted" style={{display:"none"}} value="">Select Language</option>
                                                        <option value="165">English</option>
                                                        <option value="245">Español</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="form-group">
                                                    <select className="form-control" value={this.state.guides_section} onChange={this.handleGuidesSection}  id="guides_section" name="guides_section">
                                                        <option className="text-muted" style={{display:"none"}} value="">Select Report Type</option>
                                                        <option value="CouplesGuide">Couple’s Guide</option>
                                                        <option value="CompatibilityGuide">Romantic Compatibility Guide</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group submit">
                                            <button id="GuideReport" type="submit">Generate Report!</button>
                                        </div>
                                    </form>
                                </div>
                                {this.state.guidesTable && 
                                <table id="guides-table" className="table table-dark table-hover">
                                </table>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default InterpersonalityReport;
