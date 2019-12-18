import React from 'react';
import {connect} from 'react-redux';


class MartiansConsumers extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props.data); // prints out whatever is inside props
    }

    get
    render() {
        const {name, blog, followers} = this.props.data;

        if (!this.props.data) {
            return (
                <div>
                    No Data
                </div>
            )
        }
        return (
            <div>
                <div>
                    Name: {name}
                </div>
                <br/>
                <div>
                    Blog: {blog}
                </div>
                <br/>
                <div>
                    Github Followers: {followers}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log('asdfasdfasd',state);
    return {
        data: state.data
    };
};

export default connect(
    mapStateToProps,
    null
)(MartiansConsumers);
