import React from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import { userActions } from '../Actions/userActions ';
import { NotificationContainer } from 'react-notifications';
import { history } from '../Helpers/history ';
class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            loading: false,
            submitted: false,
            fields: {},
            errors: {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (!fields["username"]) {
            formIsValid = false;
            errors["username"] = "Cannot be empty";
        }

        if (!fields["password"]) {
            formIsValid = false;
            errors["password"] = "Cannot be empty";
        }

        //Email

        if (typeof fields["username"] !== "undefined" && this.state.fields.username !=='') {
            let lastAtPos = fields["username"].lastIndexOf('@');
            let lastDotPos = fields["username"].lastIndexOf('.');

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["username"].indexOf('@@') === -1 && lastDotPos > 2 && (fields["username"].length - lastDotPos) > 2)) {
                formIsValid = false;
                errors["usernameEmail"] = "Email is not valid";
            }
        }

        
        this.setState({ errors: errors });
        return formIsValid;
    }

    handleChange(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields });
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        this.setState({ submitted: true });
        if (this.handleValidation()) {
            this.setState({loading: true });
            const { username, password } = this.state;
            const { dispatch } = this.props;
            if (username && password) {
                dispatch(userActions.login(username, password)).then(data => {
                    debugger
                    if (data === 'true') {
                        history.push('/Dashboard', { logginedUser: this.state.username });
                    }
                    this.setState({ loading: false, username: '', password: '', submitted: false, fields : {}});
                });
            }
        } else {
            this.setState({ loading: false });
        }
       
        e.preventDefault();
    }

    render() {
        const { username, password, submitted, loading } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Login</h2>
                <form name="form" role="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + ((submitted && !username) || (submitted && this.state.errors.usernameEmail)? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange.bind(this, "username")}/>
                        {submitted && !username &&
                            <div className="help-block">Username is required</div>
                        }
                        {submitted && this.state.errors.usernameEmail &&
                            <div className="help-block">Email is not valid</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange.bind(this, "password")} />
                        {submitted && !password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        {loading ? <Loader type="Puff" color="#00BFFF" height="50" width="50" /> : <button className="btn btn-primary">Login</button>}
                    </div>
                </form>
                <NotificationContainer />
            </div>
        );
    }
}
export default connect(

)(LoginComponent);