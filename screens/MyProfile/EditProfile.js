import React, { Component } from "react";
import {
    StyleSheet,
    WebView ,
    View,
    TouchableOpacity,
    Dimensions,
    AsyncStorage,
    ToastAndroid,
    NetInfo,
    Modal,
    ScrollView
} from "react-native";
import { 
    Container,
    Spinner,
    Button,
    Text,
    Content,
    Header,
    Left,
    Right,
    Title,
    Body,
    Input,
    Card,
    CardItem,
    List,
    ListItem,
    Form,
    Picker,
    Item,
    Textarea,
    Label,
    Thumbnail,
} from 'native-base';
import {createDrawerNavigator,DrawerItems, SafeAreaView,createStackNavigator,NavigationActions } from 'react-navigation';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import { Avatar } from 'react-native-elements';
import KeyboardShift from "../../components/KeyboardShift";

const {width,height} = Dimensions.get('window');

export default class EditProfile extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            renderCoponentFlag: false,
            LodingModal: false,
            profile_name:'',
            profile_phonheno:'',
            profile_email:'',
            submitProfileBasic:false,

            shipping_state:'Bihar',
            shipping_city:'Bhagalpur',
            shipping_street:'',
            shipping_pincode:'',
            submitShippingDetails:'',
        }
    }
    componentDidMount() {
        setTimeout(() => {this.setState({renderCoponentFlag: true})}, 0);
        this.setProfile();
    }
    setProfile = async () =>{
        const profileData = JSON.parse(await AsyncStorage.getItem('userProfileData'));

        console.log(profileData);

        this.setState({
            profile_name: profileData.cname,
            profile_email: '',
            profile_phonheno: '',

            shipping_state: profileData.state,
            shipping_city: profileData.city,
            shipping_street: profileData.address,
            shipping_pincode: profileData.cpin+"",
        });
        console.log(this.state.profile_name,this.state.profile_email,this.state.profile_phonheno,this.state.shipping_state,this.state.shipping_city,this.state.shipping_street,this.state.shipping_pincode);
    }
    render_setBasicProfile = async (argument) => {
        var connectionInfoLocal = '';
        var KEY = await AsyncStorage.getItem('userToken_S');
        NetInfo.getConnectionInfo().then((connectionInfo) => {
            console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
            // connectionInfo.type = 'none';//force local loding
            if(connectionInfo.type == 'none'){
                console.log('no internet ');
                ToastAndroid.showWithGravityAndOffset(
                    'Oops! No Internet Connection',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50,
                );
                return;
            }else{
                console.log('yes internet '); 
                this.setState({
                    submitProfileBasic:true,
                });
                fetch(Global.API_URL+'render_setBasicProfile_MU', {
                    method: 'POST',
                    headers: {
                            'Accept': 'application/json',
                            'Authorization':'Bearer '+KEY,
                        },
                        body: JSON.stringify({ 
                            profile_name:this.state.profile_name,
                            profile_phonheno:this.state.profile_phonheno,
                            profile_email:this.state.profile_email,
                         })
                    }).then((response) => response.json())
                    .then((responseJson) => {
                        var itemsToSet = responseJson.data;
                        console.log('resp:',itemsToSet);
                        if(responseJson.received == 'yes'){
                        this.setState({
                            submitProfileBasic:false,
                        });
                        }else{
                            ToastAndroid.showWithGravityAndOffset(
                                'Internal Server Error',
                                ToastAndroid.LONG,
                                ToastAndroid.BOTTOM,
                                25,
                                50,
                            );
                        }
                }).catch((error) => {
                    ToastAndroid.showWithGravityAndOffset(
                        'Network Failed!!! Retrying...',
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        25,
                        50,
                    );
                    console.log('on error fetching:'+error);
                    this.render_setBasicProfile();
                });
            }
        });
        console.log(connectionInfoLocal);
    }
    render_setShippingAddress = async (argument) => {
        var connectionInfoLocal = '';
        var KEY = await AsyncStorage.getItem('userToken_S');
        NetInfo.getConnectionInfo().then((connectionInfo) => {
            console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
            // connectionInfo.type = 'none';//force local loding
            if(connectionInfo.type == 'none'){
                console.log('no internet ');
                ToastAndroid.showWithGravityAndOffset(
                    'Oops! No Internet Connection',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50,
                );
                return;
            }else{
                console.log('yes internet '); 
                this.setState({
                    submitShippingDetails:true,
                });
                fetch(Global.API_URL+'render_setShippingAddress_MU', {
                    method: 'POST',
                    headers: {
                            'Accept': 'application/json',
                            'Authorization':'Bearer '+KEY,
                        },
                        body: JSON.stringify({  })
                    }).then((response) => response.json())
                    .then((responseJson) => {
                        var itemsToSet = responseJson.data;
                        console.log('resp:',itemsToSet);
                        if(responseJson.received == 'yes'){
                        this.setState({
                            submitShippingDetails:false,
                        });
                        }else{
                            ToastAndroid.showWithGravityAndOffset(
                                'Internal Server Error',
                                ToastAndroid.LONG,
                                ToastAndroid.BOTTOM,
                                25,
                                50,
                            );
                        }
                }).catch((error) => {
                    ToastAndroid.showWithGravityAndOffset(
                        'Network Failed!!! Retrying...',
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        25,
                        50,
                    );
                    console.log('on error fetching:'+error);
                    this.render_setShippingAddress();
                });
            }
        });
        console.log(connectionInfoLocal);
    }
    render() {
        
        const {renderCoponentFlag} = this.state;
        if(renderCoponentFlag){
            return(
                <Container>
                    
                        <KeyboardShift>
                            {()=>(
                                <Content>
                                    <View style={{flex:1}}>
                                        <View style={{flex:4,backgroundColor:'#2873f0',height:height*(0.15)}}>
                                            <View style={{alignSelf:'center',alignContent:'center',alignItems:'center',marginVertical:10}}>
                                                <Avatar 
                                                    onPress={()=>{console.log("change Picture")}}
                                                    size='large'
                                                    source={{
                                                        uri:
                                                        'https://instagram.fpat1-1.fna.fbcdn.net/vp/dce4af24219a91eddff731d00cae9ed7/5CE9B8C6/t51.2885-19/s150x150/17933956_832093003610694_4703758160064675840_a.jpg?_nc_ht=instagram.fpat1-1.fna.fbcdn.net',
                                                    }}
                                                    showEditButton
                                                    rounded
                                                    title={this.state.profile_name.substr(0,2)}
                                                />
                                            </View>
                                        </View>
                                        <View style={{flex:6,backgroundColor:'#fff'}}>
                                            <Card>
                                                <CardItem>
                                                    <Item floatingLabel>
                                                        <Label style={{color:'#2873f0'}}>Name</Label>
                                                        <Input underlineColorAndroid="#2873f0" 
                                                            onChangeText={(text) => this.setState({profile_name:text})}
                                                            value={this.state.profile_name}
                                                        />
                                                    </Item>
                                                </CardItem>
                                                <CardItem>
                                                    <Item floatingLabel>
                                                        <Label style={{color:'#2873f0'}}>Phone NO</Label>
                                                        <Input underlineColorAndroid="#2873f0" 
                                                            value={this.state.profile_phonheno}
                                                            onChangeText={(text) => this.setState({profile_phonheno:text})}
                                                            keyboardType='numeric' 
                                                        />
                                                    </Item>
                                                </CardItem>
                                                <CardItem>
                                                    <Item floatingLabel>
                                                        <Label style={{color:'#2873f0'}}>Email</Label>
                                                        <Input underlineColorAndroid="#2873f0" 
                                                            onChangeText={(text) => this.setState({profile_email:text})}
                                                            value={this.state.profile_email}
                                                            keyboardType='email-address' 
                                                        />
                                                    </Item>
                                                </CardItem>
                                            </Card>
                                            
                                            <Card>
                                                <Button transparent block onPress={()=>{
                                                    console.log("Chnage Basic Details");
                                                    console.log(this.state.profile_name,this.state.profile_phonheno,this.state.profile_email)
                                                    this.render_setBasicProfile();
                                                }}>
                                                    <Text style={{fontSize:15,fontWeight:'500',color:'#2873f0'}}>SUBMIT</Text>
                                                </Button>
                                            </Card>
                                            
                                            <Card>
                                                <CardItem header>
                                                    <Text>Shipping Address</Text>
                                                </CardItem>
                                                <CardItem>
                                                    <Body>
                                                        <CardItem>
                                                            <Item floatingLabel>
                                                                <Label style={{color:'#2873f0'}}>State</Label>
                                                                <Input 
                                                                    underlineColorAndroid="#2873f0" 
                                                                    value={this.state.shipping_state}
                                                                    editable={false} 
                                                                    onChangeText={(text) => this.setState({shipping_state:text})}
                                                                    />
                                                            </Item>
                                                        </CardItem>
                                                        <CardItem>
                                                            <Item floatingLabel>
                                                                <Label style={{color:'#2873f0'}}>Name</Label>
                                                                    <Input 
                                                                        underlineColorAndroid="#2873f0" 
                                                                        value={this.state.shipping_city} 
                                                                        editable={false} 
                                                                        onChangeText={(text) => this.setState({shipping_city:text})}
                                                                        />
                                                            </Item>
                                                        </CardItem>
                                                        <CardItem>
                                                            <Item floatingLabel>
                                                                <Label style={{color:'#2873f0'}}>Street</Label>
                                                                <Input 
                                                                    underlineColorAndroid="#2873f0" 
                                                                    onChangeText={(text) => this.setState({shipping_street:text})}
                                                                    value={this.state.shipping_street}
                                                                    />
                                                            </Item>
                                                        </CardItem>
                                                        <CardItem>
                                                            <Item floatingLabel>
                                                                <Label style={{color:'#2873f0'}}>Pincode</Label>
                                                                <Input 
                                                                    underlineColorAndroid="#2873f0"
                                                                    keyboardType='numeric' 
                                                                    onChangeText={(text) => this.setState({shipping_pincode:text})}
                                                                    value={this.state.shipping_pincode}
                                                                    />
                                                            </Item>
                                                        </CardItem>
                                                        
                                                        
                                                        
                                                        
                                                    </Body>
                                                </CardItem>
                                                    <Button transparent block onPress={()=>{
                                                        console.log("Change Shipping Address");
                                                        console.log(this.state.shipping_city,this.state.shipping_state,this.state.shipping_street,this.state.shipping_pincode);
                                                        this.render_setShippingAddress();
                                                    }}>
                                                        <Text style={{fontSize:15,fontWeight:'500',color:'#2873f0'}}>SUBMIT</Text>
                                                    </Button>
                                            </Card>
                                            
                                        </View>
                                    </View>
                                </Content>
                            )}
                        </KeyboardShift>
                </Container>
            );
        }else{
            return (
            <AdvLoder/>
            );
        }
    }
}


class AdvLoder extends Component{
    render(){
        const {width,height} = Dimensions.get('window');
        return(
            <View style={{ flex: 1, width:width, justifyContent: 'center', alignItems: 'center',backgroundColor:'#fff'}}> 
                <Spinner color='#2874f0' size='large' style={{height:40}} />
            </View>
        )
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