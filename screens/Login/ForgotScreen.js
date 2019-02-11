import React, { Component } from "react";
import {
    StyleSheet,
    ImageBackground ,
    View,
    Dimensions,
    Image,
    Modal,
    TouchableOpacity,
    Linking,
    NetInfo,
    AsyncStorage,
    ToastAndroid,

} from "react-native";
import { Container, Spinner, Button,Text, Item,Input,CheckBox,Body} from 'native-base';
import {createDrawerNavigator,DrawerItems, SafeAreaView,createStackNavigator,NavigationActions } from 'react-navigation';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import { } from 'react-native-elements'

import Global from '../../constants/Global';
const {height,width} = Dimensions.get('window');
export default class ForgotScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            renderCoponentFlag: false,
            loginModelVisible:false,
            signUpModelVisible:false,
            forgotModelVisible:false,
            submitButtonDisable:false,
            forgot_submitButtonDisable:false,
            email_or_phone:"",
            password:"",

            reg_name:'',
            reg_email:'',
            reg_phone:'',
            reg_password:'',
            reg_confirm:'',
            reg_submitButtonDisable:false,

            reg_name_valid_color:'white',
            reg_email_valid_color:'white',
            reg_phone_valid_color:'white',
            reg_password_valid_color:'white',
            reg_confirm_valid_color:'white',

            reg_name_valid_icon:'check-circle',
            reg_email_valid_icon:'check-circle',
            reg_phone_valid_icon:'check-circle',
            reg_password_valid_icon:'check-circle',
            reg_confirm_valid_icon:'check-circle',

            avilEmail:true,
            avilPhone:true,

            // forgot passwrod
            forgot_email:'',
            forgot_email_edit:true,
            forgot_email_valid_icon:'check-circle',
            forgot_email_valid_color:'white',
            forgot_avilEmail:true,
            OTPEntered:'',
            OTPreal:'0',
            forgot_OTP_edit:true,

            forgot_password_valid_icon:'check-circle',
            forgot_confirm_valid_icon:'check-circle',
            forgot_password_valid_color:'white',
            forgot_confirm_valid_color:'white',
            forgot_sendOTPButtonDisable:false,
            askOTP:false,

        }
    }
    componentDidMount() {
        setTimeout(() => {this.setState({renderCoponentFlag: true})}, 0);
    }
    _openLoginModel = () =>{
        this.setState({
            loginModelVisible:true,
            signUpModelVisible:false,
        })
    }
    _openSignUpModel = () =>{
        this.setState({
            loginModelVisible:false,
            signUpModelVisible:true,
        })
    }


    // handle login 
    _retrieveData = async () => {
        try {
          //await AsyncStorage.setItem('key_login_status_market_g', 'false');

            const value = await AsyncStorage.getItem('key_login_status_market_g');
            if (value !== null) {
                if(value == 'true'){
                    this.setState({
                        login_status: true
                    });
                }
                
            }
        } catch (error) {
            this.setState({
                login_status: false
            });
         }
      }
    _storeData = async (user_email,user_phone,user_name,user_state,user_city,user_landmark,user_address) => {
        try {
          await AsyncStorage.setItem('key_login_status_market_g', 'true');
          await AsyncStorage.setItem('user_email',user_email );
          await AsyncStorage.setItem('user_phone',user_phone );
          await AsyncStorage.setItem('user_name',user_name );
          await AsyncStorage.setItem('user_state',user_state);
          await AsyncStorage.setItem('user_city',user_city );
          await AsyncStorage.setItem('user_landmark',user_landmark );
          await AsyncStorage.setItem('user_address',user_address );


          let email = await AsyncStorage.getItem('user_email');
          let phone = await AsyncStorage.getItem('user_phone');
          let name = await AsyncStorage.getItem('user_name');
          let state = await AsyncStorage.getItem('user_state');
          let city = await AsyncStorage.getItem('user_city');
          let landmark = await AsyncStorage.getItem('user_landmark');
          let address = await AsyncStorage.getItem('user_address');
          console.log("in llogin retriving data ",email,phone,name,state,city,landmark,address);
            console.log("saved in login");
        }catch (error) {
            console.log("Eroor in saving");
        }
    }
    submitLogin = () =>{


        if(this.state.email_or_phone.trim().length == 0 || this.state.password.length == 0 ){
            alert("Enter Email and Password first")
            return;
        }
        


        // now sending request to login
        var connectionInfoLocal = '';
        NetInfo.getConnectionInfo().then((connectionInfo) => {
        console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
        if(connectionInfo.type == 'none'){
            console.log("no internet ");
            
            ToastAndroid.showWithGravityAndOffset(
            'Oops! No Internet Connection',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
            );        
        }else{
            console.log("yes internet ");
            this.setState({submitButtonDisable:true});
            var username = this.state.email_or_phone.toLowerCase();
            var password = this.state.password;
            console.log(username+":"+password);
            fetch(Global.API_URL+'login_S', {
                method: 'POST',
                headers: {
                    
                },
                body: JSON.stringify({
                    email:username,
                    password:password,
                    user_type:'worker',
                    noti_token:Date()+"",
                })
            }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                if(responseJson.error != undefined){
                    if(responseJson.error== "Unauthorised"){
                        this.setState({submitButtonDisable:false});
                        alert("Invalid Email or password");
                        return;
                    }
                    alert("Internal Server error 5004");
                    
                    this.setState({submitButtonDisable:false});
                    return;
                }
                var itemsToSet = responseJson.success.token; 
                var profileData = responseJson.profileData;
                var userID = responseJson.userID;
                console.log("userid",userID);
                console.log(profileData);
                if(responseJson.status == 'valid'){
                    if(itemsToSet.length != 0 ){
                        this._signInAsync(itemsToSet,JSON.stringify(profileData),userID);
                        return;
                    }    
                }else{
                    this.setState({submitButtonDisable:false});
                    alert("Invalid Email or Password");
                }
                
                    console.log("resp:",itemsToSet);
                }).catch((error) => {
                    alert("Internal Server Error 500");
                    console.log("on error featching:"+error);
                    this.setState({submitButtonDisable:false});
            });
        }
        });
        console.log(connectionInfoLocal);
    }
    _signInAsync = async (token,profileData,userID) => {
        userID = userID + "";//converting to string
        console.log("setting token");
        await AsyncStorage.setItem('userToken_S', token);
        console.log("setting user data");
        await AsyncStorage.setItem('userID', userID);

        await AsyncStorage.setItem('userProfileData', profileData);
        console.log("sending to home");
        this.props.navigation.navigate('Home');
        console.log("seneing to app");
    };
    saveNotificationToken = () => {
        console.log("noti");
    }
    

    // handle regiter 
    submitRegister = () =>{
        if(
            this.state.reg_name_valid_color != 'green' ||
            this.state.reg_phone_valid_color != 'green' ||
            this.state.reg_email_valid_color != 'green' ||
            this.state.reg_password_valid_color != 'green' ||
            this.state.reg_confirm_valid_color != 'green' ||
            this.state.avilEmail != true ||
            this.state.avilPhone != true
        ){
            console.log(this.state.reg_name_valid_color,this.state.reg_phone_valid_color,this.state.reg_email_valid_color,
                this.state.reg_password_valid_color,this.state.reg_confirm_valid_color ,this.state.avilEmail,this.state.avilPhone )
            alert("All fields must be filled correctly.");
            return;
        }
        if(
            this.state.reg_name.trim().length == 0 || 
            this.state.reg_email.trim().length == 0 || 
            this.state.reg_password.trim().length == 0 || 
            this.state.reg_confirm.trim().length == 0 || 
            this.state.reg_phone.trim().length == 0  
        ){
            alert("All Fields are required")
            return;
        }
        if(!this.validateEmail(this.state.reg_email.trim())){
            alert("Invalid Email! Try again!!!");
            return;
        }
        if(this.state.reg_password != this.state.reg_confirm){
            alert("Confirm password dont matched with previous one!!");
            return;
        }


        // now sending request to login
        var connectionInfoLocal = '';
        NetInfo.getConnectionInfo().then((connectionInfo) => {
        console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
        if(connectionInfo.type == 'none'){
            console.log("no internet ");
            
            ToastAndroid.showWithGravityAndOffset(
            'Oops! No Internet Connection',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
            );        
        }else{
            console.log("yes internet ");
            this.setState({reg_submitButtonDisable:true});
            var name = this.state.reg_name;
            var email = this.state.reg_email.toLowerCase();
            var password = this.state.reg_password;
            var c_password = this.state.reg_confirm;
            var phone = this.state.reg_phone;
            console.log(name,":",email,":",password,":",c_password,":",phone);
            fetch(Global.API_URL+'register_S', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    'name':name,
                    'email':email,
                    'password':password,
                    'c_password':c_password,
                    'phone':phone,
                    'user_type':'worker',
                     noti_token:Date()+"",

                })
            }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                if(responseJson.error != undefined){
                    alert("Internal Server error 5004");
                    this.setState({reg_submitButtonDisable:false});
                    return;
                }
                var itemsToSet = responseJson.success.token; 
                var profileData = responseJson.profileData;
                var userID = responseJson.userID;
                if(responseJson.reg_done == 'yes'){
                    console.log("now calling to signin and sending to home");
                    this._signInAsync(itemsToSet,JSON.stringify(profileData),userID);
                    this.setState({reg_submitButtonDisable:false});
                    return;
                }else{
                    alert("Invalid Email or Password");
                    this.setState({reg_submitButtonDisable:false});
                }
                }).catch((error) => {
                    alert("Internal Server Error 500");
                    console.log("on error featching:"+error);
                    this.setState({reg_submitButtonDisable:false});
            });
        }
        });
        console.log(connectionInfoLocal);
    }
    validateEmail = (email) => {
        var re =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    validateName = (name)=>{
        return !/[^a-zA-Z ]/.test(name);
    }
    validatephone = (phone) =>{
        return /^[0-9]+$/.test(phone);
    }
    
    REGcheckName =(text)=>{
        // valdating name

        if(text.trim().length != 0){
            if(this.validateName(text) && text.length > 2){
                this.setState({
                    reg_name_valid_color:'green',
                    reg_name_valid_icon:'check-circle'
                });
                console.log("valid name");
            }else{
                this.setState({
                    reg_name_valid_color:'red',
                    reg_name_valid_icon:'close-circle'
                });
            }
        }
    }
    REGcheckEmail = (text) =>{
        // valdating email
        if(text.trim().length != 0 ){
            if(this.validateEmail(text) && text.length > 5){
                this.setState({
                    reg_email_valid_color:'green',
                    reg_email_valid_icon:'check-circle'
                });
                console.log("valid email");
            }else{
                this.setState({
                    reg_email_valid_color:'red',
                    reg_email_valid_icon:'close-circle'
                });
            }
        }
    }
    REGcheckPhone = (text) =>{
        //validation phone
        if(text.trim().length != 0){
            if(this.validatephone(text) && text.length == 10){
                this.setState({
                    reg_phone_valid_color:'green',
                    reg_phone_valid_icon:'check-circle'
                });
                console.log("valid phone");
            }else{
                this.setState({
                    reg_phone_valid_color:'red',
                    reg_phone_valid_icon:'close-circle'
                });
            }
        }
    }
    REGcheckPassword = (text) =>{
        //validating password
        if(text.trim().length != 0){
            if(text.length >= 4){
                this.setState({
                    reg_password_valid_color:'green',
                    reg_password_valid_icon:'check-circle'
                });
                console.log("valid password");
            }else{
                this.setState({
                    reg_password_valid_color:'red',
                    reg_password_valid_icon:'close-circle'
                });
            }
        }
    }
    REGcheckConfirm = (text) =>{
        if(this.state.reg_password == text){
            this.setState({
                reg_confirm_valid_icon:'check-circle',
                reg_confirm_valid_color:'green',
            })
        }else{
            this.setState({
                reg_confirm_valid_icon:'close-circle',
                reg_confirm_valid_color:'red',
            })
        }
    }
    checkAvilEmail = (text) =>{
        // now sending request to login
        console.log("Checking for avil email");

        var connectionInfoLocal = '';
        NetInfo.getConnectionInfo().then((connectionInfo) => {
            console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
            if(connectionInfo.type == 'none'){
                console.log("no internet ");
                
                ToastAndroid.showWithGravityAndOffset(
                'Oops! No Internet Connection',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50,
                );        
            }else{
                console.log("yes internet ");
                fetch(Global.API_URL+'AvilEmail', {
                    method: 'POST',
                    headers: {},
                    body: JSON.stringify({
                        email:text,
                        check:'email',
                    })
                }).then((response) => response.json())
                .then((responseJson) => {
                    var itemsToSet = responseJson.data ;
                    console.log("resp:",itemsToSet);
                    if(itemsToSet.status == true){
                        this.setState({
                            avilEmail:true,
                        })
                    }else{
                        this.setState({
                            avilEmail:false,
                        })
                    }

                }).catch((error) => {
                        alert("Internal Server Error 500");
                        console.log("on error featching:"+error);
                });
            }
        });
    }
    checkAvilPhone = () =>{
        console.log("Checking for avil phone");
        var connectionInfoLocal = '';
        NetInfo.getConnectionInfo().then((connectionInfo) => {
            console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
            if(connectionInfo.type == 'none'){
                console.log("no internet ");
                
                ToastAndroid.showWithGravityAndOffset(
                'Oops! No Internet Connection',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50,
                );        
            }else{
                console.log("yes internet ");
                fetch(Global.API_URL+'AvilPhone', {
                    method: 'POST',
                    headers: {},
                    body: JSON.stringify({
                        phone:this.state.reg_phone,
                        check:'phone',
                    })
                }).then((response) => response.json())
                .then((responseJson) => {
                    var itemsToSet = responseJson.data ;
                    console.log("resp:",itemsToSet);
                    if(itemsToSet.status == true){
                        this.setState({
                            avilPhone:true,
                        })
                    }else{
                        this.setState({
                            avilPhone:false,
                        })
                    }

                }).catch((error) => {
                        alert("Internal Server Error 500");
                        console.log("on error featching:"+error);
                });
            }
        });
    }
    // forgot password attat
    forgotPasswordStart = ()=>{
        this.setState({
            loginModelVisible:false,
            signUpModelVisible:false,
            forgotModelVisible:true,

             // forgot passwrod
             forgot_email:'',
             forgot_email_edit:true,
             forgot_email_valid_icon:'check-circle',
             forgot_email_valid_color:'white',
             forgot_avilEmail:true,
             OTPEntered:'',
             OTPreal:'0',
             forgot_OTP_edit:true,
 
             forgot_password_valid_icon:'check-circle',
             forgot_confirm_valid_icon:'check-circle',
             forgot_password_valid_color:'white',
             forgot_confirm_valid_color:'white',
             forgot_sendOTPButtonDisable:false,
             askOTP:false,
        })
    }
    lastOTPSendSecCount = 0;
    OTP = 0 ;
    sendOTPForgot = () =>{
        if(this.state.reg_email_valid_color == 'red' || this.state.forgot_avilEmail ){
            alert("Invalid Email ");
            return;
        }
        this.setState({
            forgot_email_edit:false,
            forgot_sendOTPButtonDisable:true,
        });
        var NOWSec = Math.floor(Date.now() / 1000);
        // console.log(NOWSec - this.lastOTPSendSecCount);
        if(NOWSec - this.lastOTPSendSecCount >= 60*5 ){
            this.OTP = Math.floor(Math.random() * (+999999 - +100000)) + +100000;
            this.setState({
                OTPreal:this.OTP,
            })
            this.lastOTPSendSecCount = NOWSec;

        }
        if(this.state.forgot_password_valid_color == 'red' || this.state.forgot_confirm_valid_color == 'red'){
            alert("Invalid Password");
            return;
        }
        // now sending request to login
        var connectionInfoLocal = '';
        NetInfo.getConnectionInfo().then((connectionInfo) => {
            console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
            if(connectionInfo.type == 'none'){
                console.log("no internet ");
                
                ToastAndroid.showWithGravityAndOffset(
                'Oops! No Internet Connection',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50,
                );        
            }else{
                console.log("yes internet ");
                this.setState({forgot_sendOTPButtonDisable:true});
                var name = this.state.reg_name;
                var email = this.state.reg_email.toLowerCase();
                var password = this.state.reg_password;
                var c_password = this.state.reg_confirm;
                var phone = this.state.reg_phone;
                console.log(name,":",email,":",password,":",c_password,":",phone);
                fetch(Global.API_URL+'send_OTP_S', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify({
                        'email':email,
                        'OTP':this.state.OTPreal,
                        'user_type':'worker',
                        noti_token:Date()+"",
    
                    })
                }).then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    if(responseJson.error != undefined){
                        alert("Internal Server error 5004");
                        this.setState({forgot_sendOTPButtonDisable:false});
                        return;
                    }
                    if(responseJson.data.sendOTP == 'yes'){
                        this.setState({askOTP:true});
                        ToastAndroid.showWithGravityAndOffset(
                            'OTP Sent! check your Email Folder Too..',
                            ToastAndroid.LONG,
                            ToastAndroid.BOTTOM,
                            25,
                            50,
                            ); 
                            
                        return;
                    }else{
                        alert("Somthing wrong! password Not Changed!!");
                        this.setState({forgot_sendOTPButtonDisable:false});
                    }
                    }).catch((error) => {
                        alert("Internal Server Error 500");
                        console.log("on error featching:"+error);
                        this.setState({forgot_sendOTPButtonDisable:false});
                });
            }
         });
        console.log(this.OTP);
        ToastAndroid.showWithGravityAndOffset(
            'OTP For Testing'+this.OTP,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
            );   
        
    }

    // forgot pass
    forgotcheckEmail = (text) =>{
        // valdating email
        if(text.trim().length != 0 ){
            if(this.validateEmail(text) && text.length > 5){
                this.setState({
                    forgot_email_valid_color:'green',
                    forgot_email_valid_icon:'check-circle'
                });
                console.log("valid email");
            }else{
                this.setState({
                    forgot_email_valid_color:'red',
                    forgot_email_valid_icon:'close-circle'
                });
            }
        }
    }

    forgotcheckAvilEmail = (text) =>{
        // now sending request to login
        console.log("Checking for avil email");

        var connectionInfoLocal = '';
        NetInfo.getConnectionInfo().then((connectionInfo) => {
            console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
            if(connectionInfo.type == 'none'){
                console.log("no internet ");
                
                ToastAndroid.showWithGravityAndOffset(
                'Oops! No Internet Connection',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50,
                );        
            }else{
                console.log("yes internet ");
                fetch(Global.API_URL+'AvilEmail', {
                    method: 'POST',
                    headers: {},
                    body: JSON.stringify({
                        email:text,
                        check:'email',
                    })
                }).then((response) => response.json())
                .then((responseJson) => {
                    var itemsToSet = responseJson.data ;
                    console.log("respforgot_avilEmail:",itemsToSet);
                    if(itemsToSet.status == true){
                        this.setState({
                            forgot_avilEmail:true,
                        })
                    }else{
                        this.setState({
                            forgot_avilEmail:false,
                        })
                    }

                }).catch((error) => {
                        alert("Internal Server Error 500");
                        console.log("on error featching:"+error);
                });
            }
        });
    }
    forgotcheckPassword = (text) =>{
        //validating password
        if(text.trim().length != 0){
            if(text.length >= 4){
                this.setState({
                    forgot_password_valid_color:'green',
                    forgot_password_valid_icon:'check-circle'
                });
                console.log("valid password");
            }else{
                this.setState({
                    forgot_password_valid_color:'red',
                    forgot_password_valid_icon:'close-circle'
                });
            }
        }
    }
    forgotcheckConfirm = (text) =>{
        if(this.state.forgot_password == text){
            this.setState({
                forgot_confirm_valid_icon:'check-circle',
                forgot_confirm_valid_color:'green',
            })
        }else{
            this.setState({
                forgot_confirm_valid_icon:'close-circle',
                forgot_confirm_valid_color:'red',
            })
        }
    }
    submitChangePassword = () =>{
        if(this.state.forgot_password_valid_color == 'red' || this.state.forgot_confirm_valid_color == 'red'){
            alert("Invalid Password");
            return;
        }
        // now sending request to login
        var connectionInfoLocal = '';
        NetInfo.getConnectionInfo().then((connectionInfo) => {
            console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
            if(connectionInfo.type == 'none'){
                console.log("no internet ");
                
                ToastAndroid.showWithGravityAndOffset(
                'Oops! No Internet Connection',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50,
                );        
            }else{
                console.log("yes internet ");
                this.setState({forgot_submitButtonDisable:true});
                var name = this.state.reg_name;
                var email = this.state.reg_email.toLowerCase();
                var password = this.state.reg_password;
                var c_password = this.state.reg_confirm;
                var phone = this.state.reg_phone;
                console.log(name,":",email,":",password,":",c_password,":",phone);
                fetch(Global.API_URL+'change_password_S', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify({
                        'email':email,
                        'password':password,
                        'c_password':c_password,
                        'user_type':'worker',
                        noti_token:Date()+"",
    
                    })
                }).then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    if(responseJson.error != undefined){
                        alert("Internal Server error 5004");
                        this.setState({forgot_submitButtonDisable:false});
                        return;
                    }
                    if(responseJson.data.changed == 'yes'){
                        this.setState({forgotModelVisible:false});
                        ToastAndroid.showWithGravityAndOffset(
                            'Password changed sucessfully',
                            ToastAndroid.LONG,
                            ToastAndroid.BOTTOM,
                            25,
                            50,
                            ); 
                        return;
                    }else{
                        alert("Somthing wrong! password Not Changed!!");
                        this.setState({forgot_submitButtonDisable:false});
                    }
                    }).catch((error) => {
                        alert("Internal Server Error 500");
                        console.log("on error featching:"+error);
                        this.setState({forgot_submitButtonDisable:false});
                });
            }
         });
        

    }
    render() {
        const {renderCoponentFlag} = this.state;
        if(renderCoponentFlag){
            return(
                <Container style={{backgroundColor:'#2268d7'}}>
                        <View style={{flex:1,backgroundColor:'#2162ca'}}>
                                <View style={{marginTop:20,height:height*(0.2),flex:3}}>
                                    <View style={{margin:15,flexDirection:'row',justifyContent: 'space-between',}}>
                                        <View style={{flexDirection:'row'}}>
                                            <Text style={{color:'#fff',fontSize:25,fontWeight:'600',alignSelf:'center'}}>GangaCart</Text>
                                            <Image style={{height:30,width:30,alignSelf:'center',marginHorizontal:5}} source={{uri:'https://facebook.github.io/react-native/docs/assets/favicon.png'}}/>
                                        </View>
                                        <TouchableOpacity style={{alignContent:'flex-end',alignItems:'flex-end',alignSelf:'center'}} onPress={this.forgotPasswordStart} >
                                            <Icon name="close" style={{alignSelf:'flex-end',fontSize:30,color:'#fff'}}/>
                                        </TouchableOpacity>    
                                    </View>
                                    <View style={{flexDirection:'row',justifyContent:'space-around',margin:10,marginHorizontal:20,marginVertical:50,alignSelf:'center'}}>
                                        <Text style={{color:"#fff",width:'80%'}}>Keep your password secure</Text>
                                        <Image
                                            style={{width: '20%', height: 50}}
                                            source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
                                        />
                                    </View>
                                    
                                </View>
                                <View style={{ flex: 7,height: height*(0.8),  width: width,backgroundColor:"#ffffff",flexDirection: 'column', justifyContent: 'center', alignItems: 'center',borderRadius:0.2,borderColor:'#fff'}}>

                                        <View style={{ width: width*(0.85), alignSelf:'center',marginVertical:5}}>
                                            
                                            <Item  regular style={{marginVertical:2,borderRadius:15,paddingHorizontal: 7,}}>
                                                <Input 
                                                    placeholder='Email' 
                                                    onChangeText={(text) => {
                                                        this.forgotcheckEmail(text);
                                                        this.setState({forgot_email:text})
                                                        this.forgotcheckAvilEmail(text);
                                                    }}
                                                    textContentType='emailAddress'
                                                    returnKeyType='next'
                                                    keyboardType='email-address'
                                                    editable = {this.state.forgot_email_edit}

                                                />
                                                <Icon name={this.state.forgot_email_valid_icon} style={{color:this.state.forgot_email_valid_color,fontSize:25}}/>
                                            </Item>
                                            { this.state.forgot_email_valid_color == 'red' && 
                                                <Text style={{color:'red',marginHorizontal:7,fontSize:12}}>*Not a Valid Email Format.</Text>
                                            }
                                            { this.state.forgot_avilEmail && this.state.forgot_email != '' && 
                                                <Text style={{color:'red',marginHorizontal:7,fontSize:12}}>*Unable to Find Your Account.</Text>
                                            }
                                            { this.state.forgot_email_edit && 
                                                <Button dark block style={{marginVertical:4}} 
                                                        onPress={this.sendOTPForgot}
                                                        disabled={this.state.forgot_sendOTPButtonDisable }
                                                >
                                                        <Text>Send OTP</Text>
                                                </Button>
                                            }  
                                            { this.state.askOTP && 
                                                <Item regular style={{marginVertical:2,borderRadius:15,paddingHorizontal: 7,}}>
                                                    <Input 
                                                        placeholder='Enter 6 Digit OTP'
                                                        onChangeText={(text) => {
                                                            this.setState({OTPEntered:text})
                                                            if(text.length == 6 && text != this.state.OTPreal){
                                                                ToastAndroid.showWithGravityAndOffset(
                                                                    'Invalid OTP',
                                                                    ToastAndroid.SHORT,
                                                                    ToastAndroid.TOP,
                                                                    25,
                                                                    50,
                                                                    );    
                                                            }
                                                        }}
                                                        textContentType='password' 
                                                        returnKeyType='next'
                                                        secureTextEntry={true}
                                                        editable = {this.state.forgot_OTP_edit}
                                                    />
                                                </Item>
                                            }
                                            {/* continue password buton after correct OTP */}
                                            { this.state.OTPEntered == this.state.OTPreal && 
                                                <Button dark block style={{marginVertical:4}} onPress={()=>{this.setState({forgot_OTP_edit:false,OTPEntered:'0'})}}>
                                                        <Text>Continue</Text>
                                                </Button>
                                            }  
                                            {/* change password box apper */}
                                            { this.state.forgot_OTP_edit == false && 
                                                <View>
                                                    <Item regular style={{marginVertical:2,borderRadius:15,paddingHorizontal: 7,}}>
                                                        <Input 
                                                            placeholder='Password'
                                                            onChangeText={(text) => {
                                                                this.forgotcheckPassword(text);
                                                                this.setState({forgot_password:text})
                                                            }}
                                                            textContentType='password' 
                                                            returnKeyType='next'
                                                            secureTextEntry={true}
                                                        />
                                                        <Icon name={this.state.forgot_password_valid_icon} style={{color:this.state.forgot_password_valid_color,fontSize:25}}/>
                                                    </Item>  
                                                    { this.state.forgot_password_valid_color == 'red' && 
                                                        <Text style={{color:'red',marginHorizontal:7,fontSize:12}}>*Password Must be at least 4 character Long.</Text>
                                                    }  
                                                    <Item regular style={{marginVertical:2,borderRadius:15,paddingHorizontal: 7,}}>
                                                        <Input 
                                                            placeholder='Confirm password'
                                                            onChangeText={(text) => {
                                                                this.forgotcheckConfirm(text);
                                                                this.setState({forgot_confirm:text})
                                                            }}
                                                            textContentType='password' 
                                                            returnKeyType='go'
                                                            onSubmitEditing={this.submitChangePassword}
                                                            secureTextEntry={true}
                                                        />
                                                        <Icon name={this.state.forgot_confirm_valid_icon} style={{color:this.state.forgot_confirm_valid_color,fontSize:25}}/>
                                                    </Item>
                                                    { this.state.forgot_confirm_valid_color == 'red' && 
                                                         <Text style={{color:'red',marginHorizontal:7,fontSize:12}}>*Confirm password Don't Matched.</Text>
                                                    }     
                                                    {
                                                        this.state.forgot_confirm == this.state.forgot_password && this.state.forgot_confirm_valid_color == 'green'  &&
                                                        <Button primary block style={{marginVertical:4}} 
                                                            onPress={this.submitChangePassword}
                                                            disabled={this.state.forgot_submitButtonDisable}>
                                                                <Text>Change Password</Text>
                                                        </Button>
                                                    }            
                                                    
                                                        
                                                </View>
                                                    
                                            }  
                                            
                                        </View>
                                </View>
                        </View>
                </Container>
            );
        }else{
            return (
                <View style={styles.loder}>
                <Spinner  color='blue'/>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    loder: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});