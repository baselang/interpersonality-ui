import React, { Component } from 'react';
import LocalizedStrings from 'react-localization';
import url from '../CommonComponent/CommonURL';
import { language } from '../Components/Language';

let strings = new LocalizedStrings(language);

class Search extends Component {
    constructor() {
        super();
        this.state = {
            language_id: '',
            keyword: ''
        }
    }

    componentDidMount() {
        let language_id = localStorage.getItem("language_id")
        this.setState({
            language_id: language_id
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem("keyword", this.state.keyword);
        window.location.replace(`${url.ORIGIN_URL}/research`)
    }

    handleResearch = () => {
        localStorage.removeItem("keyword");
    }

    render() {

        strings.setLanguage(this.state.language_id);

        return (
            <div>
                <section className="research-search">
                    <div className="container d-flex align-items-center">
                        <form onSubmit={ this.handleSubmit } className="d-flex align-items-center">
                            <input type="text" name="keyword" value={ this.state.keyword } onChange={ this.handleChange } className="form-control" placeholder={ strings.RESEARCH_SEARCH_PLACEHOLDER } />
                            <button type="submit" className="btn btn-primary"><span>{ strings.RESEARCH_SEARCHBTN }</span><i className="fa fa-search" aria-hidden="true"></i></button>
                        </form>
                        <a href="/research" onClick={this.handleResearch} className="d-none d-md-inline-block">{ strings.RESEARCH_VIEW_RESEARCH }</a>
                    </div>
                </section>
            </div>
        )
    }
}

export default Search;
