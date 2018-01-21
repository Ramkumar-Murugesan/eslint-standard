import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import '../../asset/css/plugins.min.css';
import '../../asset/css/style.themed.css';
import '../../asset/css/preload.css';
import '../../asset/css/style.light-blue-500.min.css';
import '../../asset/css/ng2-select.css';
import { Footer } from '../footer';
import { HomeHeader } from '../homeHeader';
import { SubHeader } from '../subheader';
import { StudentMenu } from '../../components/student/studentMenu';
import { CardBlock } from '../cardblock';
import { PanelBlock } from '../panelblock';
import { FeedBack } from '../feedback';
import { Activity } from '../activity';
import { Carousals } from '../carousal';
import RaisedButton from 'material-ui/RaisedButton';
import * as Actions from '../../actions/loginActions';
import axios from 'axios';
import AdminMenu from '../adminPage/adminMenu';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Iframe from 'react-iframe'
import Vimeo from 'react-vimeo'
import { Player } from 'video-react';
import YouTube from 'react-youtube';

var ageCategory = [
  { value: "Age 5 above", label: "Age 5 above" },
  { value: "Age 5 below", label: "Age 5 below" },

]
const opts = {
  height: '390',
  width: '640',
  playerVars: { // https://developers.google.com/youtube/player_parameters
    autoplay: 1
  }
};
class StudentDashboard extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      trainers: '',
      age: "",
      video: 0,
      videoId: "175295641",
      videoIdone: "175295641",
      playerSource: 'https://www.youtube.com/watch?v=UxTbh4IL4c0',
      playerSource1: "https://www.youtube.com/watch?v=IZ4aLNNVlSA",
      userData:{}
    }
    this.handleAgeChange = this.handleAgeChange.bind(this);
    this._onReady = this._onReady.bind(this);
  }

  _onReady(event) {
    // access to player in all event handlers via event.target
    //event.target.pauseVideo();
  }
  handleAgeChange(event) {
    this.setState({ age: event.value })
  
  }
  componentWillMount() {
    if(this.props.loginStudentResponse !== undefined){
    console.log("----all pprops-----",this.props.loginStudentResponse.result.user)
    this.setState({userData :this.props.loginStudentResponse.result.user})
    var ageCategory= this.props.loginStudentResponse.result.user.age;
    var userId= this.props.loginStudentResponse.result.user._id
    console.log("user id",ageCategory)
    var userID = localStorage.setItem("user_id", userId)
    var level;
    if(ageCategory <5){
      this.setState({ video: 1 })
      console.log("age 5 below>>>>>>>>>>>>>")
    }
    if(ageCategory >5){
      this.setState({ video: 2})
     
      console.log("age 5 aboove>>>>>>>>>>>>>>>>>>>>>>>>>>")
      
    }
  }
    
  }

  componentWillReceiveProps(nextProps) {
    console.log("-----------poppop--------",nextProps);
  }

  createTrainer() {
    browserHistory.push('/CreateTrainer')
  }

  studentModule() {
    browserHistory.push('/student')
  }

  render() {
    console.log("age ", this.state.age)
    return (
      <div>
        <HomeHeader />

        <StudentMenu />
        <MuiThemeProvider>
          <Card>
            <center>
              <CardTitle title="" />

              <CardText>
                <div >
                 < h2> Welcome - {this.state.userData.firstName} , Your videos are</h2>
                 <span>  </span>


                </div>
                {this.state.video == 1 ?
                  <YouTube
                    videoId="tskJQtiOx_s" 
                    opts={opts}
                    onReady={this._onReady}
                  />
                  : ""

                }
                 {this.state.video == 0 ?
                  <YouTube
                    videoId="7hpjS_XAsss" 
                    opts={opts}
                    onReady={this._onReady}
                  />
                  : ""

                }
                {this.state.video == 2 ?
                  <YouTube
                    videoId="L6ET7_-kwNg"
                    opts={opts}
                    onReady={this._onReady}/>
                    : 
                    ''
                    }
              
      

              </CardText>
            </center>
          </Card>
        </MuiThemeProvider>
            <Footer />

      </div>
          );
  }
}
function mapStateToProps(state) {
  console.log("I am herebbe people ",state)
  return {
  
           // allTrainers: state.login.allTrainers,
           loginStudentResponse: state.login.loginStudentResponse
  };
}

function mapDispatchToProps(dispatch) {
  return {
            actions: bindActionCreators(Actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentDashboard);
