import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import createAction from '../../actions/event';
import UserAction from '../../actions/student';
import AssetAction from '../../actions/assets';
import BusinessAction from '../../actions/business'
import SubCategoryAction from '../../actions/subCategory'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import '../../asset/css/plugins.min.css';
import '../../asset/css/style.themed.css';
import '../../asset/css/preload.css';
import '../../asset/css/style.light-blue-500.min.css';
import '../../asset/css/ng2-select.css';
import './event.css';
import mock from '../../asset/img/Cool-Break-Dance.jpg';
import { Footer } from '../footer';
import { HomeHeader } from '../homeHeader';
import { SubHeader } from '../subheader';
import AdminMenu from '../adminPage/adminMenu';
import { CardBlock } from '../cardblock';
import { PanelBlock } from '../panelblock';
import { FeedBack } from '../feedback';
import { Activity } from '../activity';
import { Carousals } from '../carousal';
import category from '../../actions/category';
import AlertContainer from 'react-alert';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';



class EventComponent extends React.Component {



    constructor(props) {
        super(props)
        this.state = {
            assetid: '',
            asset_name: '',
            host: '',
            description: '',
            host_id: '',
            status: '',
            event_date: '',
            event_type: '',
            title: '',
            category_id: '',
            category_name: '',
            location: '',
            subCategory: '',
            subCategory_id: '',
            userList: [],
            assetList: [],
            categoryList: [],
            subCategoryList: [],
            business_id: '',
            business_name: '',
            businessData: '',
            admin_check: false,
            businessAdmin_check: false,
            trainer_check: false
        }
        this.changeTitle = this.changeTitle.bind(this);
        this.changeDescription = this.changeDescription.bind(this);
        this.changeEventDate = this.changeEventDate.bind(this);
        this.changeEventType = this.changeEventType.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
        this.changeAssertId = this.changeAssertId.bind(this);
        this.handleCategorySelect = this.handleCategorySelect.bind(this);
        this.changeLocation = this.changeLocation.bind(this);
        this.changeHost = this.changeHost.bind(this);
        this.eventRegister = this.eventRegister.bind(this);
        this.selectedUser = this.selectedUser.bind(this);
        this.selectedAsset = this.selectedAsset.bind(this);
        this.selectSubCategory = this.selectSubCategory.bind(this);
        this.handleCallback = this.handleCallback.bind(this);
        this.handleBusinessSelect = this.handleBusinessSelect.bind(this);
    }

    componentWillMount() {
        this.props.UserAction.getUser();
        this.props.AssetAction.getAssets();
        this.props.category.getCategory();
        this.props.SubCategoryAction.getSubcategory();
        this.props.BusinessAction.getBusiness();
    }

    componentWillReceiveProps(nextProps) {
        console.log('event nextProps', nextProps);
        let businessName = localStorage.getItem('Business_name');
        var userID = localStorage.getItem("user_id");
        var userType = localStorage.getItem("user_type");
        var Bus_ID;

        this.setState({ businessData: businessName })
        if (nextProps.getUser !== undefined) {
            if (nextProps.getBusiness !== undefined) {
                var user = nextProps.getUser.result;
                var business = nextProps.getBusiness;
                var businessList = []
                for (var i = 0; i < user.length; i++) {
                    for (var j = 0; j < business.length; j++) {
                        if (userType == "BUSINESS_ADMIN") {
                            if (user[i]._id == userID) {
                                if (user[i].business_id === business[j]._id) {
                                    businessList.push(business[j])
                                    this.setState({ business: businessList })
                                    this.setState({ business_name: business[j].name })
                                    this.setState({ business_id: business[j]._id })
                                    this.setState({ businessAdmin_check: true })
                                    this.setState({ admin_check: false })
                                    var name = business[j].name;
                                    Bus_ID = business[j]._id;
                                }
                            }
                        } else {
                            if (userType == "ADMIN") {
                                this.setState({ business: business })
                                this.setState({ admin_check: true })
                                this.setState({ businessAdmin_check: false })
                            }

                        }
                    }
                }
            }
        }
        if (nextProps.getCategory !== undefined) {
            var category = nextProps.getCategory.result;
            var filterByCategory = []
            for (var i = 0; i < category.length; i++) {
                var buisnessID = category[i].business_id.business_status;
                if (userType == "ADMIN") {
                    console.log("category in admin id activated")
                    if (buisnessID === true) {
                        filterByCategory.push(category[i])
                        this.setState({ categoryList: filterByCategory })
                    }
                } else if (userType == "BUSINESS_ADMIN") {
                        var adminId = category[i].business_id._id
                        if (adminId == Bus_ID) {
                            console.log("business  admin id active", Bus_ID)
                            filterByCategory.push(category[i])
                            this.setState({ categoryList: filterByCategory })
                        }
                    }
            }
        }
if (nextProps.getUser !== undefined) {
    var user = nextProps.getUser.result;
    for (var i = 0; i < user.length; i++) {
        if (user[i].user_type === "USER") {
            if (this.state.userList.indexOf(user[i]) === -1) {
                this.state.userList.push(user[i]);
            }
        }
    }
}
if (nextProps.getAssets !== undefined) {
    var assets = nextProps.getAssets.result;
    this.setState({ assetList: assets });
}
if (nextProps.getSubCategory !== undefined) {
    var subCategory = nextProps.getSubCategory.result;
    this.setState({ subCategoryList: subCategory })

}

    // if (this.props.location !== undefined) {
    //     console.log("locatioon msg~~~~~~~~>", this.props.location.state.message)
    //     this.setState({ businessData: this.props.location.state.message })
    // }



};

changeAssertId(event, index, value) {
    this.setState({ assetid: value, asset_name: value });
}

handleCategorySelect(data) {

    this.setState({ category_name: data.name, category_id: data._id })
}

changeHost = (event, index, value) => this.setState({ host: value });

changeTitle(e) {
    this.setState({ title: e.target.value });
}

changeEventDate = (event, date) => {
    this.setState({
        event_date: date,
    });
};

changeEventType(e) {
    this.setState({ event_type: e.target.value });
}

changeStatus(e) {
    this.setState({ status: e.target.value });
}

changeDescription(e) {
    this.setState({ description: e.target.value });
}

changeLocation(e) {
    this.setState({ location: e.target.value });
}
selectSubCategory(e) {
    this.setState({ subCategory: e.sub_category_level, subCategory_id: e._id })

}
handleCallback(data) {
    if (data.data !== undefined) {

        if (data.data.code == '200') {
            toast.success("Event created Successfully");
            setTimeout(function () { browserHistory.push('/ListOfEvent') }.bind(this), 3000);
        }
    } else {

        toast.error("Event Failed");
        setTimeout(function () { browserHistory.push('/CreateEvent') }.bind(this), 3000);
    }


}
eventRegister() {
    let businessID = localStorage.getItem("BusinessAdmin_ID")
    var result = {

        "title": this.state.title,
        "location": this.state.location,
        "event_type": this.state.event_type,
        "status": this.state.status,
        "business_id": this.state.business_id,
        "category_id": this.state.category_id,
        "host": this.state.host_id,
        "assetid": this.state.assetid,
        "subCategory_id": this.state.subCategory_id,
        "description": this.state.description,
        "event_date": this.state.event_date,


    }
    this.props.createAction.addEvent(result, this.handleCallback);

}

selectedUser(obj) {
    console.log(obj)

    this.setState({ host: obj.firstName, host_id: obj._id });
}

selectedAsset(obj) {
    this.setState({ assetid: obj._id, asset_name: obj.asset_name });
}
handleBusinessSelect(obj) {
    console.log('busie=ness', obj._id)
    this.setState({ business_id: obj._id, business_name: obj.name })

}

render() {
    return (
        <div>
            <HomeHeader />
            <AdminMenu />
            <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                pauseOnHover
            />
            <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
            <MuiThemeProvider>
                <div className="row">
                    <div className="col-md-6">
                        <img src={mock} alt="" className="img-responsive wow animated zoomIn animation-delay-8 eventImg" />
                    </div>
                    <div className="col-md-6">
                        <Card>
                            <center><CardTitle title="Create Event" />
                                <CardText>
                                    <div className="form-horizontal" >
                                        <fieldset>
                                            <div className="form-group" >
                                                <div className="row">
                                                    <div className='col-md-offset-1'>
                                                        <div className='col-md-3'>
                                                            <TextField
                                                                hintText="Enter Title"
                                                                floatingLabelText="Title"
                                                                onChange={this.changeTitle}
                                                                value={this.state.title}
                                                            />
                                                        </div>
                                                        <div className='col-md-3 textboxAlign'>
                                                            <TextField
                                                                hintText="Enter Location"
                                                                floatingLabelText="Location"
                                                                onChange={this.changeLocation}
                                                                value={this.state.location}
                                                            /><br />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group" >
                                                <div className="row">
                                                    <div className='col-md-offset-1'>
                                                        <div className='col-md-3'>
                                                            <TextField
                                                                hintText="Enter Event Type"
                                                                floatingLabelText="Event Type"
                                                                onChange={this.changeEventType}
                                                                value={this.state.event_type}
                                                            /><br />
                                                        </div>
                                                        <div className='col-md-3 textboxAlign'>
                                                            <TextField
                                                                hintText="Enter Status"
                                                                floatingLabelText="Status"
                                                                onChange={this.changeStatus}
                                                                value={this.state.status}
                                                            /><br />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group" >
                                                <div className="row">
                                                    <div className='col-md-offset-1'>
                                                        <div className='col-md-3'>
                                                            <SelectField
                                                                hintText="Enter Asset"
                                                                value={this.state.asset_name}
                                                            >
                                                                {
                                                                    this.state.assetList.map((obj, index) => {
                                                                        return (<MenuItem key={index} value={obj.asset_name} primaryText={obj.asset_name} onClick={this.selectedAsset.bind(this, obj)} />
                                                                        )
                                                                    })
                                                                }
                                                            </SelectField><br />
                                                        </div>
                                                        <div className='col-md-3 textboxAlign'>
                                                            <SelectField value={this.state.category_name} hintText="Select Category">
                                                                {
                                                                    this.state.categoryList.map((obj, index) => {
                                                                        return (<MenuItem key={index} value={obj.name} primaryText={obj.name} onClick={this.handleCategorySelect.bind(this, obj)} />)
                                                                    })
                                                                }
                                                            </SelectField><br />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group" >
                                                <div className="row">
                                                    <div className='col-md-offset-1'>
                                                        <div className='col-md-3'>
                                                            <SelectField
                                                                hintText="Enter Host"
                                                                value={this.state.host}
                                                            >
                                                                {
                                                                    this.state.userList.map((obj, index) => {
                                                                        return (<MenuItem key={index} value={obj.firstName} primaryText={obj.firstName} onClick={this.selectedUser.bind(this, obj)} />
                                                                        )
                                                                    })
                                                                }
                                                            </SelectField><br />
                                                        </div>
                                                        <div className='col-md-3 textboxAlign'>
                                                            <SelectField
                                                                hintText="Select Sub Category"
                                                                value={this.state.subCategory}
                                                            >
                                                                {
                                                                    this.state.subCategoryList.map((obj, index) => {
                                                                        return (<MenuItem key={index} value={obj.sub_category_level} primaryText={obj.sub_category_level} onClick={this.selectSubCategory.bind(this, obj)} />
                                                                        )
                                                                    })
                                                                }
                                                            </SelectField><br />

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group" >
                                                <div className="row">
                                                    <div className='col-md-offset-1'>
                                                        <div className='col-md-3'>
                                                            <TextField
                                                                hintText="Enter Description"
                                                                multiLine={true}
                                                                rows={1}
                                                                rowsMax={4}
                                                                onChange={this.changeDescription}
                                                                value={this.state.description}
                                                            /><br />
                                                        </div>
                                                        <div className='col-md-3 textboxAlign'>
                                                            <DatePicker hintText="Event Date" mode="landscape" onChange={this.changeEventDate} />
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
                                                                    <MenuItem value={this.state.business_name} primaryText={this.state.business_name} />
                                                                </SelectField>

                                                            </div>
                                                            : ''}
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
                                                            : ""
                                                        }
                                                        {/* <SelectField
                                                            hintText="Business Name"
                                                            value={this.state.businessData}
                                                            disabled={true}
                                                        >
                                                            <MenuItem value={this.state.businessData} primaryText={this.state.businessData} />
                                                        </SelectField><br /> */}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group" >
                                                <div style={{ marginLeft: "25%" }} className="col-md-6">
                                                    <RaisedButton label="Create" primary={true} onClick={this.eventRegister} />
                                                    <RaisedButton label="Cancel" secondary={true} onClick={browserHistory.goBack} style={{ marginLeft: '10px' }} />
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                </CardText>
                            </center>
                        </Card>
                    </div>
                </div>
            </MuiThemeProvider>
            <Footer />

        </div>
    );
}
}

function mapStateToProps(state, props) {
    console.log('his state', state)
    return {
        createEvent: state.createEvent,
        eventResponse: state.event.createSuccess,
        eventError: state.event.createrejected,
        getUser: state.student.getUserSuccess,
        getAssets: state.assets.getAssetSuccess,
        getCategory: state.category.getSuccess,
        getSubCategory: state.subCategory.getSuccess,
        getBusiness: state.business.getSuccess

    };
}

function mapDispatchToProps(dispatch) {
    return {
        createAction: bindActionCreators(createAction, dispatch),
        UserAction: bindActionCreators(UserAction, dispatch),
        AssetAction: bindActionCreators(AssetAction, dispatch),
        category: bindActionCreators(category, dispatch),
        SubCategoryAction: bindActionCreators(SubCategoryAction, dispatch),
        BusinessAction: bindActionCreators(BusinessAction, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventComponent);