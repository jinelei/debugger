import React, {Component} from 'react';
import PropTypes from 'prop-types';
import trim from '../utils/trim';
import './InputBox.less';
import {isJSON} from '../utils/json';
import {formatJson} from "../utils/json";

export default class InputBox extends Component {
    constructor(props){
        super(props);
        this.originVal="";
    }
    handleFormatJSON() {
        this.originVal= this.refs.input.value;
        if (isJSON(this.originVal)){
            this.refs.input.value = trim(formatJson(this.originVal));
        }
    }

    render() {
        return (
            <div className="input-container" style={{width: this.props.width, height: this.props.height}}>
                <textarea ref="input" onChange={() => this.handleFormatJSON()}>
                </textarea>
                <div onClick={() => {
                    this.props.handleSubmit(this.originVal);
                    this.refs.input.value = "";
                    this.originVal="";
                }}>
                    <img src={require("../resources/images/icons/send.png")}/>
                </div>
            </div>
        );
    }
}

InputBox.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    handleSubmit: PropTypes.func.isRequired,
};
