import React, { Component } from 'react';
import girl_with_phone from "../Assets/images/v2/girl-with-phone.svg";
import renderHTML from 'react-render-html';
import LocalizedStrings from 'react-localization';
import {language} from '../Components/Language';

let strings = new LocalizedStrings(language);

class Section extends Component {
    constructor() {
        super();
        this.state = {
            language_id: '',
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);

        let language_id = localStorage.getItem("language_id")
        this.setState({
            language_id: language_id
        });
    }

    render() {
        strings.setLanguage(this.state.language_id);
        return (
            <div>
                <section className="tp-cta tp-cta-big">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-md-5 text-center">
                                <div className="tp-cta-photo">
                                    <img src={girl_with_phone} alt="" />
                                </div>
                            </div>
                            <div className="col-md-7">
                                <div className="tp-cta-text">
                                    {renderHTML(strings.COMMAN_TEST_DESC)}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default Section;
