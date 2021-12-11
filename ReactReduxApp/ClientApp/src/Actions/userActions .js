import { userConstants } from '../Constants/userConstants';
import { userService } from '../Service/userService ';
import { alertActions } from './alertActions';
import 'react-notifications/lib/notifications.css';
import { NotificationManager } from 'react-notifications';

export const userActions = {
    login
};

function login(username, password) {
    var Username = username;
    return dispatch => new Promise(function (resolve, reject) {
        // Function is expected to return a promise
        userService.login(username, password).then(data => {
            dispatch(success(data));
            var succesfullylogined = Username + " " + 'Loggined Successfully';
            var unsuccesfullylogined = Username + " " + 'Not an authenticated User';
            if (data === 'true') NotificationManager.success('Success message', succesfullylogined);
            else
            NotificationManager.error('Error message', unsuccesfullylogined);

            resolve(data);
        },
            error => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
                resolve(error);

            }
        );
    });
    function success(data) { return { type: userConstants.LOGIN_REQUEST, data } }
    function failure(data) { return { type: userConstants.LOGIN_FAILURE, data } }
}
