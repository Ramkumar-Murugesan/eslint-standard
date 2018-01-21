import React from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import createAction from '../../actions/category';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import '../../asset/css/plugins.min.css';
import '../../asset/css/style.themed.css';
import '../../asset/css/preload.css';
import '../../asset/css/style.light-blue-500.min.css';
import '../../asset/css/ng2-select.css';
import { Footer } from '../footer';
import { HomeHeader } from '../homeHeader';
import AdminMenu from '../adminPage/adminMenu';

import { CardBlock } from '../cardblock';
import { PanelBlock } from '../panelblock';
import { FeedBack } from '../feedback';
import { Activity } from '../activity';
import { Carousals } from '../carousal';
import { SubHeader } from '../subheader';
import FlatButton from 'material-ui/FlatButton'
import AlertContainer from 'react-alert';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import BusinessAction from '../../actions/business'
import studentRegister from '../../actions/student';
import * as Actions from '../../actions/loginActions';

const style = {
    margin: 12,
};


class Category extends React.Component {



    constructor(props) {
        super(props)
        this.state = {
            name: '',
            description: '',
            image: '',
            business_id: '',
            business_name: '',
            sub_category: '',
            business: [],
            admin_check: false,
            businessAdmin_check:false,
            trainer_check:false

        }
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.saveCategory = this.saveCategory.bind(this);
        this.handleImageUpload = this.handleImageUpload.bind(this);
        this.handleBusinessSelect = this.handleBusinessSelect.bind(this);
        this.subCategory = this.subCategory.bind(this);
        this.handleCallback = this.handleCallback.bind(this);
    }

    componentWillMount() {
        console.log('this.props', this.props)
        this.props.BusinessAction.getBusiness();
        this.props.studentRegister.getUser();
      
    }

    componentWillReceiveProps(nextProps) {
        console.log('nextprops valuecreate Category ', nextProps)

        if (nextProps.getBusiness !== undefined) {
            let login = localStorage.getItem('loginStudent');
            var userID = localStorage.getItem("user_id");
            var userType = localStorage.getItem("user_type");
            console.log("user Type is create category",userType)

            if (nextProps.allUser !== undefined) {
                var user = nextProps.allUser.result;
                var business = nextProps.getBusiness;
                var businessList = []
                for (var i = 0; i < user.length; i++) {
                    for (var j = 0; j < business.length; j++) {
                        console.log("user type os check the if ",user[i].user_type)
                        if (userType == "BUSINESS_ADMIN") {
                            if (user[i]._id == userID) {
                                if (user[i].business_id === business[j]._id) {
                                    businessList.push(business[j])
                                    this.setState({ business: businessList })
                                    this.setState({business_name:business[j].name})
                                    this.setState({business_id:business[j]._id})
                                    this.setState({businessAdmin_check :true})
                                    this.setState({admin_check :false})
                                     var name=business[j].name;
                                     var businessID = business[j]._id;
                                     localStorage.setItem("BusinessAdmin_ID",businessID)
                                     localStorage.setItem("Business_name",name)
                                     console.log("bUSINESS ADMIN IS >>>>>>>>>>>>>>>")
                                    
                                }
                            }
                        }    else {
                            if(userType == "ADMIN"){
                           
                            console.log("ADMIN IS >>>>>>>>>>>>>>>")
                            this.setState({business : business})
                            this.setState({admin_check :true})
                            this.setState({businessAdmin_check :false})
                            }

                        }
                    }
                }
            }
        }
    }
        subCategory(event) {
            console.log('the value', event)
            this.setState({ sub_category: event.target.textContent })
        }

        handleNameChange(e) {
            this.setState({ name: e.target.value });
        }

        handleDescriptionChange = (e) => {
            this.setState({
                description: e.target.value
            });
        };

        handleImageUpload(e) {
            const image = e.target.files[0];
            this.setState({ image: image });
        }

        handleBusinessSelect(obj) {
            console.log('busie=ness', obj._id)
            this.setState({ business_id: obj._id, business_name: obj.name })

        }
        handleCallback(data) {
            console.log('the data', data)
            if (data.data !== undefined) {
                if (data.data.code == '200') {
                    toast.success("Category created Successfully");
                    setTimeout(function name() { browserHistory.push("/ListCategory") }.bind(this), 4000)

                }
            } else {
                toast.error("Category created failed");
                setTimeout(function name() { browserHistory.push("/CreateCategory") }.bind(this), 4000)

            }


        }

        saveCategory() {
            var result = {
                "name": this.state.name,
                "description": this.state.description,
                "business_id": this.state.business_id
            }
            this.props.createAction.createCategory(result, this.handleCallback);

        }


        render() {
            return (
                <div>
                    <HomeHeader />
                    <AdminMenu />
                    <ToastContainer
                        position="top-center"
                        autoClose={2000}
                        hideProgressBar={true}
                        newestOnTop={false}
                        closeOnClick
                        pauseOnHover
                    />
                    <MuiThemeProvider>
                        <Card>
                            <center>
                                <CardTitle title="Create Category" />
                                <CardText>
                                    <div className="form-horizontal" >
                                        <fieldset>
                                            <div className="form-group" >
                                                <div className="row">
                                                    <div className='col-md-offset-4'>
                                                        <div className='col-md-3'>
                                                            <TextField
                                                                hintText="Enter Name Of Category"
                                                                floatingLabelText="Category"
                                                                onChange={this.handleNameChange}
                                                                value={this.state.name}
                                                            />
                                                        </div>
                                                        <div className='col-md-3' style={{ paddingLeft: "55px" }}>
                                                            <TextField
                                                                hintText="Enter Description"
                                                                floatingLabelText="Description"
                                                                onChange={this.handleDescriptionChange}
                                                                value={this.state.description}
                                                            /><br />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group" >
                                                <div className="row">
                                                    <div className='col-md-offset-4'>                                                        
                                                    {this.state.businessAdmin_check === true ? 
                                                        <div className='col-md-3'>
                                                            <SelectField
                                                                value={this.state.business_name}
                                                                disabled  
                                                            >
                                                                <MenuItem value={this.state.business_name}  primaryText={this.state.business_name}  />
                                                            </SelectField>
                                                            
                                                        </div>
                                                        :''}
                                                        {this.state.admin_check === true ? 
                                                        <div className='col-md-3'>
                                                        <SelectField
                                                            value={this.state.business_name}
                                                            hintText="Select Business ID"
                                                        >
                                                            {this.state.business.map((obj, i) => {
                                                                return (<MenuItem value={obj.name} key={i} primaryText={obj.name} onClick={this.handleBusinessSelect.bind(this, obj)} />)
                                                            })}
                                                        </SelectField>
                                                    </div>
                                                    :""
                                                    }
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group" >
                                                <div style={{ marginLeft: "23%" }} className="col-md-6">
                                                    <RaisedButton label="Create" onClick={this.saveCategory} primary={true} style={style} />
                                                    <RaisedButton label="Cancel" onClick={browserHistory.goBack} secondary={true} style={style} />
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                </CardText>
                            </center>

                        </Card>
                    </MuiThemeProvider>

                    <Footer />

                </div>
            );
        }
    }

function mapStateToProps(state, props) {
    console.log('state', state)
    return {
        createCategory: state.createCategory,
        errorCategory: state.category.createRejected,
        getResponse: state.category.createSuccess,
        getBusiness: state.business.getSuccess,
        allUser: state.student.getUserSuccess,
        allTrainers: state.login.allTrainers

    };
}

function mapDispatchToProps(dispatch) {
    return {
        createAction: bindActionCreators(createAction, dispatch),
        BusinessAction: bindActionCreators(BusinessAction, dispatch),
        studentRegister: bindActionCreators(studentRegister, dispatch),
        actions: bindActionCreators(Actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);