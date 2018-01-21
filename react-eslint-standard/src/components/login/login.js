import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import DatePicker from 'material-ui/DatePicker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Select from 'react-select';
import '../../asset/css/plugins.min.css';
import '../../asset/css/style.themed.css';
import '../../asset/css/preload.css';
import { Footer } from '../footer';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import { orange500, blue500 } from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import { BaseUrl } from '../../_constants/baseurl';
import * as Actions from '../../actions/loginActions';
const style = {
  margin: 4,
  mariginRight: 20
};

const styles = {
  errorStyle: {
    color: orange500,
  },
  underlineStyle: {
    borderColor: orange500,
  },
  floatingLabelStyle: {
    color: orange500,
  },
  floatingLabelFocusStyle: {
    color: blue500,
  },
};

class Login extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      value: 1,
      mail: '',
      pwd: '',
      mailValid: '',
      passwordValid: '',
      loginValid: false,


    }
    this.handleMailChange = this.handleMailChange.bind(this);
    this.handlePwdChange = this.handlePwdChange.bind(this);
    this.login = this.login.bind(this);
    this.facebookbutton = this.facebookbutton.bind(this);
    this.twitterbutton = this.twitterbutton.bind(this);
    this.googlebutton = this.googlebutton.bind(this);
    this.loginValid = this.loginValid.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    
  }

  componentWillMount() {
    console.log('the--------------------', this.props)


  }

  handleMailChange(event) {

    this.setState({
      mail: event.target.value,
      mailValid: ""
    })

  }

  handlePwdChange(event) {
    this.setState({ pwd: event.target.value,
    passwordValid :'' })
  }

  loginValid(data) {

    console.log("data login ", data.data.message)
    if (data.data.message === 'You are not a user') {
      this.setState({ loginValid: true })
    }


  }

  login() {
    if (this.state.mail == '') {
      this.setState({ mailValid: "Please Enter Email. " });
    } else if (!this.validateEmail(this.state.mail)) {
      this.setState({ mailValid: "Please Enter correct Email. " });
    } else {
      this.setState({ mailValid: '' });
    }
    if (this.state.pwd == '') {
      this.setState({ passwordValid: "Please Enter Password. " });
    
    } else {
      this.setState({ passwordValid: '' });
    }
  
    if ((this.state.pwd) && (this.validateEmail(this.state.mail))) {
      this.props.actions.userLogin(this.state.mail, this.state.pwd, this.loginValid);
      console.log("this.priops", this.props)
    }
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
 password_validate(password) {
    return /[A-Z]/.test(password) && /[0-9]/.test(password) && !/[aeiou]/.test(password) && /^[@#][A-Za-z0-9]{7,13}$/.test(password);
}

  componentWillReceiveProps(nextProps) {
    console.log("next props login", nextProps)
    if (nextProps.roleofuser !== undefined) {
      if (nextProps.roleofuser.user.user_type == "ADMIN") {
        localStorage.setItem("user_type", nextProps.roleofuser.user.user_type)
        localStorage.setItem('token', nextProps.roleofuser.data);
        localStorage.setItem("user_id", nextProps.roleofuser.user.user_id)
        browserHistory.push('/Dashboard');
      } else if (nextProps.roleofuser.user.user_type == "BUSINESS_ADMIN") {
        localStorage.setItem("user_type", nextProps.roleofuser.user.user_type)
        localStorage.setItem('token', nextProps.roleofuser.data);
        localStorage.setItem("user_id", nextProps.roleofuser.user.user_id)
        browserHistory.push('/BusinessDashboard');
      } else if (nextProps.roleofuser.user.user_type == "TRAINER") {
        localStorage.setItem("user_type", nextProps.roleofuser.user.user_type)
        localStorage.setItem('token', nextProps.roleofuser.data);
        localStorage.setItem("user_id", nextProps.roleofuser.user.user_id)
        browserHistory.push('/TrainerDashboard');
      } else if (nextProps.roleofuser.user.user_type == "USER") {
        localStorage.setItem("user_type", nextProps.roleofuser.user.user_type)

        localStorage.setItem('token', nextProps.roleofuser.data);
        localStorage.setItem("user_id", nextProps.roleofuser.user.user_id)
        browserHistory.push('/StudentDashboard');
      }


    }


  }

  facebookbutton() {

    window.open(BaseUrl.socialurl + 'facebook', 'popup', 'width=600,height=600,scrollbars=no,resizable=no'); return false;

  }
  twitterbutton() {

    window.open(BaseUrl.socialurl + 'twitter', 'popup', 'width=600,height=600,scrollbars=no,resizable=no'); return false;

  }
  googlebutton() {

    console.log('the goole account is coming ')

    window.open(BaseUrl.socialurl + 'google', 'popup', 'width=600,height=600,scrollbars=no,resizable=no'); return false;
    browserHistory.push('/Dashboard');

  }



  render() {

    const { open } = this.state;


    return (
      <MuiThemeProvider>
        <div className="bg-full-page ms-hero-bg-dark ms-hero-img-airplane back-fixed" >
          <div className="mw-500 absolute-center">
            <div className="card color-dark shadow-6dp animated fadeIn animation-delay-7" style={{
              border: ' 1px solid white'
            }}>
              <div className="ms-hero-bg-primary ms-hero-img-mountain">
                <h2 className="text-center no-m pt-4 pb-4 color-white index-1">Sign in</h2>
              </div>
              <ul className="nav nav-tabs nav-tabs-full nav-tabs-2 nav-tabs-transparent indicator-primary" role="tablist">
                {/* <li role="presentation" className="active"><a aria-controls="ms-login-tab" role="tab" data-toggle="tab" className="withoutripple"><i className="zmdi zmdi-account"></i> Login</a></li> */}
                {/* <li role="presentation" className="active"><a href="#ms-recovery-tab" aria-controls="ms-recovery-tab" role="tab" data-toggle="tab" className="withoutripple"><i className="zmdi zmdi-key"></i> Recovery</a></li> */}
              </ul>
              <div className="card-block">
                <div className="tab-content">
                  <div className="tab-pane fade active in" id="ms-login-tab">
                    <fieldset>
                      <div className="form-group label-floating">
                        <div className="input-group">
                          <span className="input-group-addon"><i className="zmdi zmdi-account"></i></span>
                          <label className="control-label">Email</label>
                          <input type="text" id="ms-form-user" className="form-control" name="mail" onChange={this.handleMailChange} value={this.state.mail} />
                          <span style={{ color: "red" }}>{this.state.mailValid}</span>

                        </div>
                      </div>

                      <div className="form-group label-floating">
                        <div className="input-group">
                          <span className="input-group-addon"><i className="zmdi zmdi-lock"></i></span>
                          <label className="control-label">Password</label>
                          <input type="password" id="ms-form-pass" className="form-control" name="pws" onChange={this.handlePwdChange} />
                          <span style={{ color: "red",fontFamily:"open sans-serif" }}>{this.state.passwordValid}</span>
                           
                        </div>
                      </div>

                      <div className="row ">
                        <div className="col-xs-2">
                        </div>
                        <div className="col-xs-3">
                          <RaisedButton label="Login" onClick={this.login} primary={true} style={style} />
                        </div>
                        <div className="col-xs-3">
                          <RaisedButton label="Cancel" secondary={true} href='/' style={{ marginLeft: '50px', marginTop: '3px' }} />
                        </div>
                      </div>
                    </fieldset>

                    <div className="text-center" >
                      {/* <p>or</p>
                      <a href="javascript:void(0)" target="popup" className="wave-effect-light btn btn-raised btn-facebook" onClick={this.facebookbutton} href={BaseUrl.socialurl + 'facebook'} ><i className="zmdi zmdi-facebook"></i> </a>
                      <a href="javascript:void(0)" target="popup" className="wave-effect-light btn btn-raised btn-twitter" onClick={this.twitterbutton} href={BaseUrl.socialurl + 'twitter'}><i className="zmdi zmdi-twitter"></i> </a>
                      <a href="javascript:void(0)" target="popup" className="wave-effect-light btn btn-raised btn-google" onClick={this.googlebutton} href={BaseUrl.socialurl + 'google'} ><i className="zmdi zmdi-google"></i> </a> */}
                    </div>
                  </div>

                  {/* <div role="tabpanel" className="tab-pane fade" id="ms-recovery-tab">
                    <fieldset>
                      <div className="form-group label-floating">
                        <div className="input-group">
                          <span className="input-group-addon"><i className="zmdi zmdi-account"></i></span>
                          <label className="control-label">Username</label>
                          <input type="text" id="ms-form-user" className="form-control login-form-control" />
                        </div>
                      </div>

                      <div className="form-group label-floating">
                        <div className="input-group">
                          <span className="input-group-addon"><i className="zmdi zmdi-email"></i></span>
                          <label className="control-label">Email</label>
                          <input type="email" id="ms-form-email" className="form-control login-form-control" />
                        </div>
                      </div>

                      <button className="btn btn-raised btn-block btn-primary">Send Password</button>
                    </fieldset>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div >
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state) {
  console.log(' in component--------------------', state)
  return {
    roleofuser: state.login.userlogin,
    userLoginResponse: state.login.userLoginResponse,
    trainerLoginResponse: state.login.trainerLoginResponse,
    adminLoginResponse: state.login.adminLoginResponse,
    businessadminLoginResponse: state.login.businessadminLoginResponse,
    loginValidation: state.login.loginStudentResponse

  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
