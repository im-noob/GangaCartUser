import React, { Component } from "react";
import {
    StyleSheet,
    WebView ,
    View,ScrollView,
    TouchableOpacity,
    Dimensions,
    AsyncStorage,
    ToastAndroid,
    NetInfo,
    Modal,
    FlatList,
    ActivityIndicator,
    Image,
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
    Grid,
    CardItem,
    List,
    ListItem,
    Form,
    Picker,
    Item,
    Textarea,
    Label,
    Thumbnail,
    Fab
} from 'native-base';
import {createDrawerNavigator,DrawerItems, SafeAreaView,createStackNavigator,NavigationActions } from 'react-navigation';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import Global from "../../constants/Global";
import {CartPrepare} from "../../constants/OrderListPrepare";

const {width,height} = Dimensions.get('window');

// class ShowSearchResult extends Component {
//     constructor(props){
//         super(props);
//         this.state = {
//             renderCoponentFlag: false,
//             LodingModal: false,
//             gro_searchData: this.props.gro_searchData,
//             res_searchData: this.props.res_searchData,
//             ser_searchData: this.props.ser_searchData,
//         }
//     }
//     componentDidMount() {
//         setTimeout(() => {this.setState({renderCoponentFlag: true})}, 0);
//     }

//     render() {
//         const {renderCoponentFlag} = this.state;
//         // console.log("in show seachResult ",this.state.gro_searchData);
//         if(renderCoponentFlag){
//             return(
//                 <View>
//                         <Card>
//                             <CardItem header bordered>
//                                 <Text>Grocery</Text>
//                             </CardItem>
//                         </Card> 
//                         {/* <ShopsProductsList gro_searchData ={this.state.gro_searchData}
//                             navigation = {this.props.navigation}
//                         /> */}
//                 </View>
//             );
//         }else{
//             return (
//             <AdvLoder/>
//             );
//         }
//     }
// }


class ShopsProductsList extends React.Component
{
    constructor(props){
        super(props);
        const {navigation} = this.props;
        // let val = navigation.getParam('sid',5);
        this.state={
            data: this.props.gro_searchData,//store data of sub-category items
            process:false,
            isEmpty:'"List is emptyshop_searchData..."',
            serachText:"",
            fullData:this.props.gro_searchData,
            Qun:1,
            weight:'0',
            start:0,
            loading:false,
            isData:true,
            imgPath:'http://gangacart.com/public/',
            checkboxes:[],   
        }
    }

    componentDidMount(){
       this.fetech(this.props.gro_searchData);
    //    console.log("comont",this.props.gro_searchData)
    }

    fetech = (responseJson) =>{
        if(Object.keys(responseJson).length > 0) {
            // this.setState({
            //     // data:responseJson,
            //     // isEmpty:,
            //     // loading:false,
            //     // fullData:responseJson
            // });
            // console.log("fetch  dj",this.state.data,this.state.fullData);
            this._addCheckbox();
        }
        else{
            this.setState({isEmpty:'No Data Found'});
        }
    }


    _addCheckbox() {
        // console.log("AddcheckBOx",this.state.data);



        let array =this.state.data;
        let index=0;
        let list = [];
        var temp_map_id = 0;
        var listArray = [];
        var content = [];
        var last = array[array.length-1]["psid"];
        array.forEach(element =>
        {  
            console.log(element["mid"] ,' ',index, ' ', last,' ',element["psid"]);
            if(element["mid"] == temp_map_id){
                temp_map_id = element["mid"];

                var temp = {
                    offer:element["offer"],
                    price:element["price"],
                    quantity:element["quantity"],
                    inStock:element["stock"],
                    unit:element["unit_name"]
                };
                content.push(temp);

                if(last == element["psid"])
                {
                    this.listArray['data'] = content;
                    list.push(this.listArray);
                }
            }
            else{

                if(temp_map_id != 0){
                    
                    this.listArray['data'] = content;
                    list.push(this.listArray);

                  //  console.log(this.listArray);
                    content = [];
                    this.listArray = [];
                    var arrayData = {
                        checked : true,
                        index : index++,
                        quntity : 1,
                        offer:element["offer"],
                        mapcid : element["cid"],
                        map : element["mid"],
                        pic : element["pic"],
                        info : element["pinfo"],
                        pid : element["plid"],
                        title : element["name"],
                        price : element["price"],
                        size : element["quantity"],
                        stock : element["stock"],
                        unit : element["unit_name"],
                    }

                    this.listArray = arrayData;                    

                    var temp = {
                        price:element["price"],
                        offer:element["offer"],
                        quantity:element["quantity"],
                        inStock:element["stock"],
                        unit:element["unit_name"]
                    };

                    content.push(temp);
                    if(last == element["psid"])
                    {
                        this.listArray['data'] = content;
                        list.push(this.listArray);
                    }
                }
                else{
                    var arrayData = {
                        checked : true,
                        index : index++,
                        quntity : 1,
                        offer:element["offer"],
                        mapcid : element["cid"],
                        map : element["mid"],
                        pic : element["pic"],
                        info : element["pinfo"],
                        pid : element["plid"],
                        title : element["name"],
                        price : element["price"],
                        size : element["quantity"],
                        stock : element["stock"],
                        unit : element["unit_name"],
                    }
                    this.listArray = arrayData; 
                    var temp = {
                        offer:element["offer"],
                        price:element["price"],
                        quantity:element["quantity"],
                        inStock:element["stock"],
                        unit:element["unit_name"]
                    };
                    content.push(temp);
                }
                temp_map_id = element["mid"];
            }
        });
        //console.log(list);
        this.setState({checkboxes:list})
        this.setState({fullData:list})
    }

    _addQuantity=(index) =>{
        const {checkboxes} = this.state;
        checkboxes[parseInt(index)].quntity = checkboxes[index].quntity +1;
        console.log("Addd");
        this.setState({
            checkboxes
        });
        CartPrepare(checkboxes[parseInt(index)],checkboxes[parseInt(index)].quntity);
    }

 
    _subQuantity=(index) =>{
        const {checkboxes} = this.state;
        checkboxes[parseInt(index)].quntity = checkboxes[index].quntity > 1? checkboxes[index].quntity-1 :checkboxes[index].quntity;
        console.log("sub");
        this.setState({
            checkboxes
        });
        CartPrepare(checkboxes[parseInt(index)],checkboxes[parseInt(index)].quntity);
    }

    _toggleCheckbox =(index) =>{
        console.log("Index value ",index);
         let checkboxes = this.state.fullData;
         console.log(checkboxes[parseInt(index)].checked);
        checkboxes[parseInt(index)].checked = !checkboxes[index].checked;
         this.setState({fullData:checkboxes});
         CartPrepare(checkboxes[parseInt(index)],checkboxes[parseInt(index)].quntity);
         console.log(checkboxes[index]);
    }

changeQuantity = (index,dindex) =>{
    let data =  this.state.fullData;
    data[index].size = data[index].data[dindex].quantity;
    data[index].price = data[index].data[dindex].price;
    data[index].unit =  data[index].data[dindex].unit;
    data[index].offer = data[index].data[dindex].offer;
    this.setState({fullData:data}); 
    console.log(data[index]);
}

_renderIteam=({item})=>{

    //console.log(item.title);
    let pName = item.title;
    let unit = item.unit;
    let price = item.price;
    let uri;
    //let Qun = this.size;
    let len = item.data.length;
    let PickerItem = [];
    
    for(let data of item.data){
        PickerItem.push(<Picker.Item label={data.quantity+" "+data.unit} value={data.quantity+" "+data.unit} />)
        //console.log(item.size + ' ' + data.quantity);
    }

    try {
      item.pic.length == 0 ? uri="https://pvsmt99345.i.lithium.com/t5/image/serverpage/image-id/10546i3DAC5A5993C8BC8C?v=1.0":uri=this.state.imgPath+item.pic;  
    } catch (error) {
        uri="https://pvsmt99345.i.lithium.com/t5/image/serverpage/image-id/10546i3DAC5A5993C8BC8C?v=1.0"
    }

    //  console.log(uri);
    
    return(    
        <Card>
            <CardItem>
                <Grid style={{flexDirection:'row'}}>
                    <Grid style={{flex:1}}>
                        <Image style={{width:100, height: 150,borderRadius:5,resizeMode: 'contain',}} source={{uri:uri}}/>
                    </Grid>
                    <Grid style={{paddingHorizontal:8,marginVertical:2,flexDirection:'column',flex:2}}>
                        <Text style={{fontSize:14,fontWeight:'900'}}>{pName}</Text>
                        <Text style={{fontSize:14,fontWeight:'400'}}>{item.info} </Text>
                        {(len > 1) ?
                            <View style={{borderWidth:1,margin:5}}> 
                                <Picker
                                    selectedValue={item.size+" "+unit}
                                    style={{height:30}}
                                    onValueChange={(itemValue, itemIndex) => {this.changeQuantity(item.index,itemIndex)}}>
                                    {PickerItem}
                                </Picker>
                            </View>
                            :
                            <Text style={{fontSize:14,fontWeight:'600',height:30,margin:5}}>{item.size+" "+unit}</Text>
                        } 
                        <Grid style={{flexDirection:'row'}}>
                            <Grid style={{flexDirection:'column'}}>
                                <Text style={{fontSize:16,fontWeight:'900'}}><Icon name={'currency-inr'} size={15}/>{
                                    (item.offer > 0 ) ? 
                                    (price - (price)*(item.offer/100))
                                        :
                                        price
                                    }
                                    {
                                        (item.offer > 0 ) ? 
                                            <Text style={{fontSize:12,textDecorationLine: 'line-through'}}>  MRP <Icon name="currency-inr" size={12}/>{price}</Text>
                                        :
                                        null
                                    } 
                                    </Text>
                                {(item.offer > 0.1) ?
                                    <Text style={{fontSize:14,fontWeight:'500',color:'green'}}>{item.offer}% off</Text>
                                    :
                                    null
                                }
                            </Grid>
                            {item.checked ?
                                <Button success onPress={this._toggleCheckbox.bind(this, item.index)}>
                                    <Text style={{fontSize:15,fontWeight:'500'}}>Add+</Text>
                                </Button>    
                            :
                            <View style={{borderWidth:1,height:40,flexDirection:'row'}}>
                                <Button  onPress={this._subQuantity.bind(this,item.index)}
                                    style={{height:40}}
                                >
                                    <Text style={{fontSize:20,fontWeight:'500'}}> - </Text>
                                </Button>                
                                <View style={{width:50,height:50,paddingBottom:5}}><Text style={{fontSize:20,alignSelf:'center'}}>{item.Quantity}</Text></View>
                                <Button onPress={this._addQuantity.bind(this,item.index)}
                                    style={{height:40}}
                                >
                                    <Text style={{fontSize:20,fontWeight:'500'}}> + </Text>
                                </Button>
                            </View>
                            }
                        </Grid>  
                    </Grid>
                </Grid>
            </CardItem>
        </Card>              
);
} 


/**end */
   
_storeData=async( nvg,item) =>{
    console.log("Eroor he Product list me ",item);
    try{
        //await AsyncStorage.setItem('PID',JSON.stringify(item.gro_product_list_id));
        //await AsyncStorage.setItem('Product',JSON.stringify(item));
        this.props.navigation.navigate('ShopProductDetails',{
            data : [item],
        });
    }
    catch(error){
        console.log("Eroor he Product list me ",error);
    }
}

// _onChangeText=(text) =>{
//     this.setState({serachText:text});
//     try {
//              const newData = this.state.fullData.filter(item => {      
//                 const itemData = `${item.title.toUpperCase()}`;
//                  const textData = text.toUpperCase();
//                  return itemData.indexOf(textData) > -1;    
//               });    
//               this.setState({checkboxes: newData });
//             if(newData.length == 0){
//                 this.setState({isEmpty:'No Data Found'});
//             }  
//             else{
//                 this.setState({isEmpty:''});
//             }
//         } catch (error) {
//              console.log(error)
//         }
//     }

    render(){
        
        return( 
            // <Content>
                <FlatList
                    data={this.state.checkboxes}
                    renderItem={this._renderIteam}
                    numColumns={1}
                    keyExtractor={item => item.index.toString()}
                    ListEmptyComponent={()=>{
                        if(this.state.isEmpty =='Wait List is Loading.....')
                            return(<View style={{justifyContent:'center'}}>
                                <ActivityIndicator size="large" color="#0000ff" />
                                <Text style={{justifyContent:'center',alignItems:'center',alignContent: 'center',alignSelf:'center',}}>{this.state.isEmpty}</Text>
                            </View>);
                        else
                            return(<View style={{justifyContent:'center'}}>
                                    <Text style={{justifyContent:'center',alignItems:'center',alignContent: 'center',alignSelf:'center',}}>{this.state.isEmpty}</Text>
                                </View>)}}
                    onEndReached = {()=>{
                        console.log("Reach End");
                    }}  
                    
                />  
            // </Content>      
        )
    }
}



class ShopList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:[],//store data of category items
            process:false,
            obj:this.props,
            serachText:"",
            fullData:'',
            isEmpty:'No Data Found', 
        }
    }
    componentDidMount(){  
        this.fetech(this.props.shop_searchData);
        console.log("shoppp data:",this.props.shop_searchData);
    }

    fetech = async(shop_searchData) =>{    
        console.log("Shop List Load ......",shop_searchData);
        if(Object.keys(shop_searchData).length > 0) {
            resdata = shop_searchData.data
            this.setState({data:resdata,
                fullData:resdata
            });
        }
        else{
            this.setState({isEmpty:'No Data Found'});
        }
        this.setState({process:false});
    }
    _storeData=async(sID) =>{
        try{
            await AsyncStorage.setItem('ShopID',JSON.stringify(sID))
            this.props.navigation.navigate('CategoryList');
        }
        catch(error){
            console.log("Eroor he Product list me ",error);
        }
    }


    _renderIteam=({item})=>{    
        let uri;
        try {
          (item.pic == null ||item.pic.length == 0) ? uri="https://pvsmt99345.i.lithium.com/t5/image/serverpage/image-id/10546i3DAC5A5993C8BC8C?v=1.0":uri=item.pic;  
        } catch (error) {
            uri="https://pvsmt99345.i.lithium.com/t5/image/serverpage/image-id/10546i3DAC5A5993C8BC8C?v=1.0"
        }
        return(
            //   <List style={{backgroundColor:'#f9f9f9'}}>
            //     <ListItem avatar>
            //         <Left>
            //             <TouchableOpacity onPress={()=>{this.props.navigation.navigate('ShopDetail',{item:item});}}>
            //                 <Thumbnail large source={{uri: uri}} />
            //             </TouchableOpacity>
            //         </Left>
            //         <Body style={{backgroundColor:"#f9f9f9"}}>
            //             <TouchableOpacity onPress={()=>{this._storeData(item.gro_shop_info_id);}}>
            //                 <View>
            //                     <Text>{item.name}</Text>
            //                     <Text note>Address : {item.address}</Text>
            //                 </View>
            //                 <View style={{flexDirection:'row',alignItems:'center'}}>
                                
            //                     {/* <View>
            //                     <Text note>Ratting : {item.address}</Text>
            //                     </View> */}
            //                 </View>
            //             </TouchableOpacity>
            //         </Body>
            //         <Right>
            //             <Text style={{
            //                     fontWeight:'500',
            //                     fontSize:15,
            //                     backgroundColor:'#ffa329',
            //                     color:'white',
            //                     borderRadius:5,
            //                     paddingHorizontal:5
            //                 }}>
            //                     {(item.rating ) ? (item.rating+'*') : 0+'*'}
            //             </Text>
            //         </Right>
            //     </ListItem>
            //   </List>
                    <Card>
                                            
                            <Header style={{backgroundColor:'#221793'}}>
                                <Title style={{color:'#ffffff'}}>{item.name}</Title>
                                {/* <Subtitle>{(item.rating ) ? (item.rating+'*') : 0+'*'}</Subtitle> */}
                            </Header>
                            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('ShopDetail',{item:item});}}>
                   
                            <CardItem>
                                    {/* <Thumbnail large source={{uri: uri}} /> */}
                                <Image style={{height:150,width:width-90,resizeMode:'contain',borderRadius:50,}} source={{uri:uri}}/>
                            </CardItem>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{this._storeData(item.gro_shop_info_id);}}>
                            <CardItem style={{backgroundColor:'#d4d8d4',borderTopWidth:0.5}}>
                            <Left>
                                <Text>Address</Text>
                            </Left>
                            <Right>
                                <Text>{item.address}</Text>
                            </Right>
                            </CardItem>
                            </TouchableOpacity>
                    {/* <CardItem style={{backgroundColor:'#d4d8d4'}}>
                        <Left>
                            <Text>Pin Code</Text>
                        </Left>
                        <Right>
                            <Text>{this.state.zipCode}</Text>
                        </Right>
                        
                    </CardItem> */}
            </Card>
            );
    }   

    _onChangeText=(text) =>{
        this.setState({serachText:text});
        try {
             const newData = this.state.fullData.filter(item => {      
                const itemData = `${item.name.toUpperCase()}`;
                 const textData = text.toUpperCase();
                 return itemData.indexOf(textData) > -1;    
              });    
              this.setState({data: newData });
            if(newData.length == 0){
                this.setState({isEmpty:'No Data Found'});
            }  
            else{
                this.setState({isEmpty:''});
            }
        } catch (error) {
             console.log(error)
        }
    }
    
    render(){    
        return(
            <View>
                 {/* <SearchBar
                        round
                        value = {this.state.serachText}
                        onChangeText={this._onChangeText}
                        placeholder='Type Here...' 
                    /> */}
                
                   
                                 
                    <FlatList
                        data={this.state.data}
                        renderItem={this._renderIteam}
                        keyExtractor={item => item.gro_shop_info_id.toString()}
                        ListEmptyComponent={()=>{
                            if(this.state.isEmpty)
                                return( 
                                    <View style={{justifyContent:'center',alignContent:'center',alignItems:'center',alignSelf:'center'}}>
                                        <Text>No Data Found</Text>
                                    </View>
                                );
                            else
                                return( 
                                    <View style={{justifyContent:'center'}}>
                                        <ActivityIndicator size="large" color="#0000ff" />
                                        <Text>Wait List is Loading.....</Text>
                                    </View>
                                );
                        }}  
                    />
                

            </View>
        );
    }
}




































export default class HomeScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            renderCoponentFlag: false,
            LodingModal: false,
            searchText:'',
            searchingStatusGro:false,
            searchingStatusShop:false,
            searchingStatusRest:false,
            searchingStatusServ:false,
            gro_searchData: [],
            res_searchData: [],
            ser_searchData: [],
            shop_searchData: [],
        }
    }
    componentDidMount() {
        setTimeout(() => {this.setState({renderCoponentFlag: true})}, 0);
    }

    render_getSearchData = async () => {
        var connectionInfoLocal = '';
        var KEY = await AsyncStorage.getItem('Token');
        var userID = await AsyncStorage.getItem('userID');
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
                let searchText = this.state.searchText;
                if(searchText.trim().length == 0 ){
                    console.log("Nothing to Search");
                    return;
                }
                this.setState({
                    searchingStatusGro:true,
                    searchingStatusShop:true,
                    searchingStatusRest:true,
                    searchingStatusServ:true,
                    gro_searchData: [],
                    res_searchData: [],
                    ser_searchData: [],
                    shop_searchData: [],
                });
                fetch(Global.API_URL+'gro/search', {
                    method: 'POST',
                    headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization':'Bearer '+KEY,
                        },
                        body: JSON.stringify({ 
                            userID:userID,
                            searchText: searchText,
                         })
                    }).then((response) => response.json())
                    .then((responseJson) => {
                        var gro_data_res = responseJson.gro_data;
                        var shop_data_res = responseJson.shop_data;
                        console.log("shop search data :",shop_data_res)
                        console.log('resp Length:',responseJson);

                        console.log('resp:',responseJson);
                        if(responseJson.received == 'yes'){
                            
                            this.setState({
                                gro_searchData:gro_data_res,
                                shop_searchData:shop_data_res,
                            })
                            
                        }else{
                            ToastAndroid.showWithGravityAndOffset(
                                'Internal Server Error',
                                ToastAndroid.SHORT,
                                ToastAndroid.BOTTOM,
                                25,
                                50,
                            );
                        }
                        this.setState({
                            searchingStatusGro:false,
                            searchingStatusShop:false,
                            searchingStatusRest:false,
                            searchingStatusServ:false,
                        });
                }).catch((error) => {
                    ToastAndroid.showWithGravityAndOffset(
                        'Network Failed!!! Retrying...',
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM,
                        25,
                        50,
                    );
                    setTimeout(() => {
                        this.render_getSearchData();
                    }, 10000);
                    console.log('on error fetching:'+error);
                    
                });
            }
        });
        console.log(connectionInfoLocal);
    }
    render() {
        const {renderCoponentFlag} = this.state;
        if(renderCoponentFlag){
            return(
                <Container >
                    <ScrollView ref={(scroller) => {this.scroller = scroller}}>
                        <Header style={{backgroundColor:'#fff'}}>
                            <Right style={{borderColor:'#848484',borderRadius:8,borderWidth:1}}>
                                <Icon name='magnify' style={{fontSize:30,alignSelf:'center',paddingHorizontal:5}} />
                                <Input 
                                    placeholder="Browse" 
                                    autoFocus={true}  
                                    onChangeText={(text) =>{
                                        this.setState({searchText:text});
                                        // this.doSearch(text);
                                    }}  
                                    onSubmitEditing={this.render_getSearchData}
                                    returnKeyType='search'
                                    
                                />
                            </Right>
                        </Header>
                        {/* Your component goes here */}

                        <Card>
                             <CardItem header bordered>
                                 <Text>Shop List</Text>
                             </CardItem>
                        </Card> 
                        {
                            this.state.searchingStatusShop ?
                                <AdvLoder/>:
                                <ShopList shop_searchData = {this.state.shop_searchData} navigation = {this.props.navigation} />
                        }
                        <Card>
                             <CardItem header bordered>
                                 <Text>Grocery</Text>
                             </CardItem>
                        </Card> 
                        {
                            this.state.searchingStatusGro ?
                                <AdvLoder/>:
                                <ShopsProductsList gro_searchData ={this.state.gro_searchData}
                                    navigation = {this.props.navigation}
                                />
                        }
                        
                        {/* <Card>
                             <CardItem header bordered>
                                 <Text>Resutrant</Text>
                             </CardItem>
                        </Card> 
                        {
                            this.state.searchingStatusRest ?
                                <AdvLoder/>:
                                <ShopsProductsList gro_searchData ={this.state.gro_searchData}
                                    navigation = {this.props.navigation}
                                />
                        }
                        <Card>
                             <CardItem header bordered>
                                 <Text>Service</Text>
                             </CardItem>
                        </Card> 
                        {
                            this.state.searchingStatusServ ?
                                <AdvLoder/>:
                                <ShopsProductsList gro_searchData ={this.state.gro_searchData}
                                    navigation = {this.props.navigation}
                                />
                        } */}
                        
                    </ScrollView>
                    <Fab
                            active={this.state.active}
                            direction="bottomRight"
                            containerStyle={{ }}
                            style={{ backgroundColor: '#5067FF' }}
                            position="bottomRight"
                            onPress={() => {
                                console.log("gogin up");
                                // console.log(this.scroller.scrollTo);
                                this.scroller.scrollTo({x: 0, y: 0, animated: true});
                                // this.refs.scrollView.scrollTo({x: 0, y: 0, animated: true});

                            }}>
                            <Icon name="arrow-up" />
                            
                        </Fab>
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