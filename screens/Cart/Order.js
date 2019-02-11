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
import { CartRemoveItem, CartPrepare } from "../../constants/OrderListPrepare";
const {width,height} = Dimensions.get('window');

export default class Order extends Component {
    constructor(props){
        super(props);
        this.state = {
            renderCoponentFlag: false,
            LodingModal: false,
            data:[],
            path:'http://gomarket.ourgts.com/public/'
        }
    }
    componentDidMount() {
         this._start();
        this.setState({path:Global.Image_URL});
      //  setTimeout(() => {this.setState({renderCoponentFlag: true})}, 0);
      

    }



    // componentWillUnmount () {
    //     this.refreshEvent.remove();
    //   console.log("Udtae call");
    //   }

    _start =async()=>{
     
        data =await AsyncStorage.getItem('CartList');
        data = JSON.parse(data);
     this.setState({data:data});
       // console.log("Cart Order : ",data);
      // let array =data;
  //  console.log(array);

 // let index=0;
    // array.forEach(element =>
    // {  
    //     element["checked"]=true;
    //     element["index"]=index++;
       
    //     const {data} = this.state;
        
    //     data.push(
        
    //         element
    //     );
    
    //     this.setState({ 
    //         data
    //     });
        
    // });
     this.setState({renderCoponentFlag: true});
   
    }
/**rray [
[16:12:25]   Object {
[16:12:25]     "Quantity": 2,
[16:12:25]     "checked": true,
[16:12:25]     "flag": true,
[16:12:25]     "index": 0,
[16:12:25]     "info": null,
[16:12:25]     "map": 279,
[16:12:25]     "mapcid": 2,
[16:12:25]     "pic": "all_product_pics/daily_use/tata salt.jpg",
[16:12:25]     "pid": 244,
[16:12:25]     "price": 60,
[16:12:25]     "size": 1,
[16:12:25]     "stock": 1,
[16:12:25]     "title": "Tata Salt ",
[16:12:25]     "unit": "Kg",
[16:12:25]   }, */
    
_addQuantity=(index) =>{
    const data = this.state.data;
    let array=[];
    data.forEach(element =>{
        if(element.map == index){
            element.Quantity++; 
            CartPrepare(element,element.Quantity++);
        }

        array.push(element);
    })
    this.setState({data:array});
    console.log(data)
}

 
_subQuantity=(index) =>{

    const data = this.state.data;
    let array=[];
    data.forEach(element =>{
        if(element.map == index){
           
            CartPrepare(element,element.Quantity > 1? element.Quantity-1 :element.Quantity);
        }

        array.push(element);
    })
    this.setState({data:array});
    console.log(data)
  
}

_toggleCheckbox =(index) =>{
  //  console.log("Index value ",index);
    const {data} = this.state;

   data[parseInt(index)].checked = !data[index].checked;
    
  //  console.log(data);
 // CartPrepare(this.state.selectedProduct,this.state.selectedQunt);

    this.setState({
        data
    });
    CartPrepare(data[parseInt(index)],data[parseInt(index)].quntity);this._start();
   // console.log(data);
}
    

    _renderCartItem =({item})=>{
        console.log(item);
        return(
            // <TouchableOpacity onPress={()=>{this.props.navigation.navigate("ChnageOrder")}}>
            // <View  style={{justifyContent:'center',width:60,paddingHorizontal:10,paddingVertical:4,borderColor:"#040504"}}>
            //      <Image style={{height:50,width:50,resizeMode: 'contain'}} source={{uri:this.state.path+item.pic}}/>
            //      <Subtitle style={{color:'#000000',fontSize:10}}>{item.title}</Subtitle>   
            //  </View>
            //  </TouchableOpacity>
            <Card>
                <CardItem>
                <Left><ImageBackground style={{height:100,width:90}} source={{uri:this.state.path+item.pic}}>
                   <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                   <View style={{borderRadius:4,width:20,backgroundColor:'#ffffff',alignSelf:'flex-end',borderWidth:0.1,borderColor:'#000000'}}>
                   <TouchableHighlight onPress={()=>{CartRemoveItem(item);this._start();}}>
                      <Text style={{fontWeight:'900',fontSize:14,alignSelf:'center',color:'#ce0000'}}>X</Text>
                   </TouchableHighlight>
                   </View>
                   <View style={{borderRadius:4,width:20,backgroundColor:'#ffffff',alignSelf:'flex-end',borderWidth:0.1,borderColor:'#000000'}}>
                       <Text style={{alignSelf:'center'}}>{item.Quantity}</Text>
                   </View>
                   </View>
                 </ImageBackground></Left>
                 <Right>
                    <View style={{flexDirection:'row',paddingRight:2,}}>
                          <Title style={{color:'#000000',fontSize:15}}>{item.title}</Title>
                      </View>
                       <View style={{flexDirection:'row',height:30}}>          
                                    <Button style={{height:30,width:25,alignItems:'center'}}  onPress={()=>{this._subQuantity(item.map); /**this.setState({item:{Quantity:qunt}})*/}}>
                                        <Text style={{color:'#ffffff',textAlign:'center',alignSelf:'center', fontSize:'900',fontSize:15}}>-</Text>
                                    </Button>
                                    <View style={{borderWidth:1,width:50,alignItems:'center'}}>
                                        <Title style={{color:'#000000'}}>{item.Quantity}</Title>
                                    </View>                        
                                    <Button style={{height:30,width:25,alignItems:'center'}}  onPress={()=>{this._addQuantity(item.map); /** this.setState({item:{Quantity:qunt}})*/}}>
                                    <Text style={{color:'#ffffff',textAlign:'center',alignSelf:'center', fontSize:'900',fontSize:15}}>+</Text>
                                     </Button>                          
                                </View>

                 </Right>
                 </CardItem>
            </Card>
        //     <View style={{padding:0,height:115,width:100}}>
                
        //     <View style={{height:100,width:90,padding:5,flexDirection:'row'}}>
               
                
                  
        //        </View> 
        //         <TouchableHighlight onPress={()=>{this.props.navigation.navigate("ChnageOrder",{item:[item]});console.log(item)}}>
        //       
        //          </TouchableHighlight>
        //   </View>
            
           );
    }

    render() {
        const {renderCoponentFlag} = this.state;
        if(renderCoponentFlag){
            return(
                <Container>
                    <Content>
                    
                       <Card >
                            
                                <CardItem style={{backgroundColor:'#221793'}} header>
                                    <Title style={{color:'#ffffff'}}> Available Item Into the cart</Title>
                                </CardItem>
                           
                            <CardItem>
                                   
                                       <FlatList
                                       data={this.state.data}
                                       renderItem={this._renderCartItem}
                                    
                                       />
                                    
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
                    <View style={{height:50,backgroundColor:'#d6a22a',flexDirection:'row',justifyContent:'space-around'}}>
                        <Button block ><Text>Checkout</Text></Button>
                    
                    
                        <Button onPress={()=>{this.props.navigation.navigate('Home');}} block><Text>Continu Shopping</Text></Button>
                    </View>
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