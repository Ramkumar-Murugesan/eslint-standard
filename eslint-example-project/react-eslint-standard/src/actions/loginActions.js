import axios from 'axios';
import {
  BaseUrl
} from '../_constants/baseurl';


export function userLogin(email, pwd) {
  return dispatch => {
    axios({
      method: 'post',
      url: BaseUrl.RestUrl + 'user/login',
      data: {
        email: email,
        password: pwd
      }
    })
      .then(response => {
        var newData = response;
        dispatch({
          type: "CREATE_STUDENT_SUCCESS",
          createStudentRegistration: newData
        });
        var data = response.data.result.token;
        var user = response.data.result.user;
        var user_type =  response.data.result.user.user_type
        //var user_id = response.data.result.user._id
        if (user_type == "USER") {
          dispatch({ type: "USER_LOGIN", data, user });
        }
        else if (user_type == "TRAINER") {
          dispatch({ type: "TRAINER_LOGIN", data, user });
        }
        else if (user_type == "BUSINESS_ADMIN") {
          dispatch({ type: "BUSINESS_ADMIN_LOGIN", data, user });
        }
        else
          dispatch({ type: "ADMIN_LOGIN", data, user });
      }).catch(error => {
      });
  }
}

export function getTrainers(token) {
  return dispatch => {
    axios({
      method: 'get',
      url: BaseUrl.RestUrl + 'user/getall_user',
      headers: {
        'Content-Type': "application/json",
        'Authorization': "JWT " + token
      }
    })
      .then(response => {
        var data = response;
        dispatch({
          type: "ALL_TRAINERS",
          data,
        });
      }).catch(error => {
      });
  }
}