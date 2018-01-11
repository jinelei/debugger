import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {isJSON} from '../utils/json';
import {formatJson} from "../utils/json";
import './DisplayBox.less';
import trim,{trimEnter} from "../utils/trim";

export default class DisplayBox extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let html = {__html: isJSON(this.props.resp) ? trimEnter(trim(formatJson(this.props.resp))) : this.props.resp};
        return (
            <div
                className={this.props.req ? "display-container-base display-container-request" : "display-container-base display-container-response"}>
                {this.props.req == null ? null :
                    <div className="display-box-request">
                        <div>
                            {this.props.date}
                        </div>
                        <div>
                            {isJSON(this.props.req) ? trim(formatJson(this.props.req)) : this.props.req}
                        </div>
                    </div>
                }
                {this.props.resp == null ? null :
                    <div className="display-box-response">
                        <div>
                            {this.props.date}
                        </div>
                        <div dangerouslySetInnerHTML={html} ></div>
                    </div>
                }
            </div>
        );
    }
}

DisplayBox.propTypes = {
    date: PropTypes.string.isRequired,
    req: PropTypes.string,
    resp: PropTypes.string,
};
