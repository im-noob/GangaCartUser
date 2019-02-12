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

const {width,height} = Dimensions.get('window');

export default class EditProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            renderCoponentFlag: false,
            LodingModal: false,
        }
    }
    componentDidMount() {
        setTimeout(() => {this.setState({renderCoponentFlag: true})}, 0);
    }

    render() {
        const {renderCoponentFlag} = this.state;
        if(renderCoponentFlag){
            return(
                <Container>
                    <Content>
                        <View style={{flex:1}}>
                            <View style={{flex:4,backgroundColor:'#2873f0',height:height*(0.15)}}>
                                <View style={{alignSelf:'center',alignContent:'center',alignItems:'center',marginVertical:10}}>
                                    <Avatar 
                                        onPress={()=>{alert("Change Image")}}
                                        size='large'
                                        source={{
                                            uri:
                                            'https://instagram.fpat1-1.fna.fbcdn.net/vp/dce4af24219a91eddff731d00cae9ed7/5CE9B8C6/t51.2885-19/s150x150/17933956_832093003610694_4703758160064675840_a.jpg?_nc_ht=instagram.fpat1-1.fna.fbcdn.net',
                                        }}
                                        showEditButton
                                        rounded
                                        title="MD"
                                    />
                                </View>
                            </View>
                            <View style={{flex:6,backgroundColor:'#fff'}}>
                                <Card>
                                    <CardItem>
                                        <Item floatingLabel>
                                            <Label style={{color:'#2873f0'}}>Name</Label>
                                            <Input underlineColorAndroid="#2873f0" />
                                        </Item>
                                    </CardItem>
                                    <CardItem>
                                        <Item floatingLabel>
                                            <Label style={{color:'#2873f0'}}>Phone NO</Label>
                                            <Input underlineColorAndroid="#2873f0" />
                                        </Item>
                                    </CardItem>
                                    <CardItem>
                                        <Item floatingLabel>
                                            <Label style={{color:'#2873f0'}}>Email</Label>
                                            <Input underlineColorAndroid="#2873f0" />
                                        </Item>
                                    </CardItem>
                                </Card>
                                
                                <Card>
                                    <Button transparent block >
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
                                                        value="Bihar" 
                                                        editable={false} />
                                                </Item>
                                            </CardItem>
                                            <CardItem>
                                                <Item floatingLabel>
                                                    <Label style={{color:'#2873f0'}}>City</Label>
                                                        <Input 
                                                            underlineColorAndroid="#2873f0" 
                                                            value="Bhagalpur" 
                                                            editable={false} />
                                                </Item>
                                            </CardItem>
                                            <CardItem>
                                                <Item floatingLabel>
                                                    <Label style={{color:'#2873f0'}}>Street</Label>
                                                    <Input 
                                                        underlineColorAndroid="#2873f0" 
                                                        
                                                        />
                                                </Item>
                                            </CardItem>
                                            <CardItem>
                                                <Item floatingLabel>
                                                    <Label style={{color:'#2873f0'}}>Pincode</Label>
                                                    <Input 
                                                        underlineColorAndroid="#2873f0"
                                                        keyboardType='numeric' />
                                                </Item>
                                            </CardItem>
                                            
                                            
                                            
                                            
                                        </Body>
                                    </CardItem>
                                        <Button transparent block >
                                            <Text style={{fontSize:15,fontWeight:'500',color:'#2873f0'}}>SUBMIT</Text>
                                        </Button>
                                </Card>
                                
                            </View>
                        </View>
                    </Content>
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