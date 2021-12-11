import React from 'react';
import { connect } from 'react-redux';
import { history } from '../Helpers/history ';

class HomePage extends React.Component {
    constructor(props) {
        debugger
        super(props);
    }

    navigateToLogin() {
        history.push('/');
}

    render() {
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi {this.props.location.state.logginedUser}</h1>
                <p>Dashboard coming soon!!</p>

                <div className="form-group">
                    <button className="btn btn-primary" onClick={this.navigateToLogin}>Logout</button>
            </div>
            </div>
           
        );
    }
}

const mapStateToProps = state => ({
    data: state
});

const mapDispatchToProps = dispatch => ({
   
});

//export { connectedHomePage as HomePage };
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
