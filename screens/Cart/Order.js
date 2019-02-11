import React, { Component } from "react";
import {
    StyleSheet,
    WebView ,
    View,
    TouchableOpacity,
    Dimensions,
    ImageBackground,
    AsyncStorage,
    Image,
    TouchableHighlight,
    FlatList,
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
    Subtitle,
} from 'native-base';
import {createDrawerNavigator,DrawerItems, SafeAreaView,createStackNavigator,NavigationActions } from 'react-navigation';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import { Tile } from "react-native-elements";
import Global from "../../constants/Global";
import { CartRemoveItem } from "../../constants/OrderListPrepare";
const {width,height} = Dimensions.get('window');

export default class Order extends Component {
    constructor(props){
        super(props);
        this.state = {
            renderCoponentFlag: false,
            LodingModal: false,
            cartData:[],
            path:'http://gomarket.ourgts.com/public/'
        }
    }
    componentDidMount() {
        setTimeout(() => {this.setState({renderCoponentFlag: true})}, 0);
        this._start();
        this.setState({path:Global.Image_URL});

    }

    _start =async()=>{
        data =await AsyncStorage.getItem('CartList');
        data = JSON.parse(data);
        this.setState({cartData:data});
        console.log("Cart Order : ",data);
    }
    /**"Quantity": 1,
     "flag": true,
     "info": null,
     "map": 47,
     "mapcid": 3,
     "pic": "all_product_pics/personal_care/Veet Aloe Vera & Vitamin E Hair Removal Cream.jpg",
     "pid": 34,
     "price": 113,
     "size": 100,
     "stock": 1,
     "title": "Veet Aloe Vera & Vitamin E Hair Removal Cream",
     "unit": "gram", */

    _renderCartItem =({item})=>{
        return(
            // <TouchableOpacity onPress={()=>{this.props.navigation.navigate("ChnageOrder")}}>
            // <View  style={{justifyContent:'center',width:60,paddingHorizontal:10,paddingVertical:4,borderColor:"#040504"}}>
            //      <Image style={{height:50,width:50,resizeMode: 'contain'}} source={{uri:this.state.path+item.pic}}/>
            //      <Subtitle style={{color:'#000000',fontSize:10}}>{item.title}</Subtitle>   
            //  </View>
            //  </TouchableOpacity>
            <View style={{padding:0,height:115,width:100}}>
                
            <View style={{height:100,width:90,padding:5,flexDirection:'row'}}>
               <ImageBackground style={{height:100,width:90}} source={{uri:this.state.path+item.pic}}>
                   <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                   <View style={{borderRadius:4,width:20,backgroundColor:'#ffffff',alignSelf:'flex-end',borderWidth:0.1,borderColor:'#000000'}}>
                   <TouchableHighlight onPress={()=>{CartRemoveItem(item);}}>
                      <Text style={{fontWeight:'900',fontSize:14,alignSelf:'center',color:'#ce0000'}}>X</Text>
                   </TouchableHighlight>
                   </View>
                   <View style={{borderRadius:4,width:20,backgroundColor:'#ffffff',alignSelf:'flex-end',borderWidth:0.1,borderColor:'#000000'}}>
                       <Text style={{alignSelf:'center'}}>{item.Quantity}</Text>
                   </View>
                   </View>
                 </ImageBackground>
                
                  
               </View> 
                <TouchableHighlight onPress={()=>{this.props.navigation.navigate("ChnageOrder",{item:item});console.log(item)}}>
               <View style={{flexDirection:'row',paddingRight:2,}}>
                     <Title style={{color:'#000000',fontSize:12}}>{item.title}</Title>
                 </View>
                 </TouchableHighlight>
          </View>
            
           );
    }

    render() {
        const {renderCoponentFlag} = this.state;
        if(renderCoponentFlag){
            return(
                <Container>
                    <Content>
                    
                       <Card>
                            
                                <Header>
                                    <Title style={{color:'#ffffff'}}> Available Item Into the cart</Title>
                                </Header>
                           
                            <CardItem>
                                   <Body>
                                       <FlatList
                                       data={this.state.cartData}
                                       renderItem={this._renderCartItem}
                                       horizontal
                                       />
                                    </Body>
                            </CardItem>
                            <CardItem footer>
                                    <Left>

                                    </Left>
                            </CardItem>
                       </Card>
                        {/* <Button bordered dark onPress={()=>{
                            this.props.navigation.navigate('ComparePriceStack',{});
                        }}>
                            <Text>Cmpare price stack</Text>
                        </Button> */}
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