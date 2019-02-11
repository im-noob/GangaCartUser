import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
   
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    Image,
    View,
    Text,
    FlatList,
    ScrollView,
    Modal,
    TouchableHighlight,
    Alert,
    Picker,
    Dimensions
    
} from 'react-native';

import { Thumbnail,ListItem,Container,List, Header, Content, Spinner,Button, Title,Card,CardItem,Left,Body,Right,Icon, Subtitle } from 'native-base';
// import { CartPrepare } from '../Cart/ListPrepare';


class Loading extends React.Component{
    constructor(props){
        super(props)
        this.state={
            width: Dimensions.get('window').width,
            price:0
        }
    }
    render() {
        return (
          <Container>
            
            <Content>
              
              <Spinner color='red' />
             
            </Content>
          </Container>
        );
      }
}

export default class ItemDetails extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isLoad:true,
            obj:this.props.obj,
            pID:0,
            sID:0,
            data:[],
            selectedQunt:1,
            selectedShop:{},
            price:0,
            offer:0,
            topay:0,
            selectedProduct:0,
            unitname:''
        }
    }
    
    componentDidMount(){
        this.fetech();
    }

    
    fetech = async() =>{

        let value = await AsyncStorage.getItem('PID')
        let product = await AsyncStorage.getItem('Product')
        if(value ==null && product == null){
            
           return; 
   
        }
        product = JSON.parse(product);
        console.log("Value ID :",product);
        await  fetch('http://gomarket.ourgts.com/public/api/gro_product_shop', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
            id:JSON.parse(value)
            })
            }).then((response) => response.json())
                .then((responseJson) => {
                
              // console.log("Related shop Load ......",responseJson);
               this.setState({selectedProduct:product});
              this.setState({data:responseJson.data.data}); 
              this._selectShop(responseJson.data.data[0]);
            // console.log("On shop  value :", this.data);
            }).catch((error) => {
                    
                //  alert("updated slow network");
                console.log( error.message);
                // log.error({error:err})
                //   value.flag=false;
                //   value.data = "Network request failed" ==error.message?  console.log("Check internet connection"):error;
    
                }); 

    }

    
    _selectShop= (item)=>{
        
        let p =(item.gro_price*this.state.selectedQunt);
       //unitname:item.unit_name
        this.setState({selectedShop:item,price:item.gro_price,offer:item.offer,unitname:item.unit_name})
      // console.log("In select shop : ",item);
      }

   /**Render iteam for shop this._selectShop(item)*/
    _renderIteam =({item})=>{
        //console.log(item.data[0].price);
        return(
            <List>
                <ListItem avatar>
                <Left>
                    <Thumbnail large source={{uri: item.pic}} />
                </Left>
                <Body>
                    <TouchableOpacity onPress={()=>{this._selectShop(item);}}>
                    <Card>
                        <Text style={{color:'#000000'}} >{item.name} </Text>
                        <Subtitle style={{color:'#9698b7'}}>Address :{item.address}</Subtitle>
                        
                        <Grid style={{paddingHorizontal:8,marginVertical:2,flexDirection:'row'}}>
                            <Text style={{fontSize:18}}><Icon name="currency-inr" size={18}/>{item.data[0].price}  </Text>
                            <Text style={{fontSize:14}}> {item.data[0].quantity}/{item.data[0].unit} </Text>
                            <Text style={{paddingHorizontal:4 ,color:'#4bb550',fontSize:15}}>  {item.data[0].offer} % off</Text>
                        </Grid>   
                    </Card>  
                    </TouchableOpacity>
                </Body>   
                </ListItem>
            </List>
        );
    }
    setData = async() =>{
        const { navigation } = this.props;
        const item = navigation.getParam('data', '[]');
        await this.setState({selectedProduct:item});
        await this.setState({pID:item[0].pid});
        await this.setState({unitname:item[0].unit});
        await this.setState({price:item[0].price});
        await this.setState({info:item[0].info});
        await this.setState({title:item[0].title});
        await this.setState({pic:item[0].pic});
        await this.setState({map:item[0].map});  
        var name = item[0].size + ' ' + item[0].unit;
        var list = [];
        list.push(<Picker.Item label={name} value={0} />);
        await this.setState({unit_name:0});
        await this.setState({unitList:list});
        console.log('Data seted successfully.');
    }

    // return(
            
        
    //       <List>
    //         <ListItem avatar>
    //         <Left>
    //         <Thumbnail large source={{uri: uri}} />
    //         </Left>
    //           <Body>
    //           <TouchableOpacity onPress={()=>{this._selectShop(item);}}>
    //           <Card>
    //             <CardItem>
    //                 <Title style={{color:'#000000'}} >{item.name}</Title>
    //             </CardItem>
    //             <CardItem>
    //                <Subtitle style={{color:'#9698b7'}}>Address : {item.address}</Subtitle>
    //             </CardItem>
    //             <CardItem>
    //                <Subtitle style={{color:'#9698b7'}}>Price <Icon name={'ios-cash'} size={15}/> : {item.gro_price}</Subtitle>
    //             </CardItem>
               
    //             </Card>
    //             </TouchableOpacity>
    //           </Body>
              
    //         </ListItem>
    //       </List>
          
    //     );
// }

    
// _storeData=async(item) =>{
//     try{
//         console.log("Button click",item);
//         await AsyncStorage.setItem('PID',JSON.stringify(item.gro_product_list_id));
//         await AsyncStorage.setItem('Product',JSON.stringify(item));
//         this.state.obj.navigate('Details',{
//             id: item.gro_product_list_id,
//             info:item.gro_product_info,
//             name:item.gro_product_name,
//             pic:this.state.imgPath+item.pic,
//             unit:item.unit_name
//           });
//     }
//     catch(error){
//         console.log("Eroor he Product list me ",error);
//     }
// }
  

    render(){

        const { navigation } = this.state.obj;
        const itemId = navigation.getParam('id', 'NO-ID');
        const info = navigation.getParam('info', 'some default value');
        const name = navigation.getParam('name', 'some default value');
        const pic = navigation.getParam('pic', 'some default value');
        const unitname = navigation.getParam('unit','');

        if(this.state.isLoad)
            return(<Container>
                <Header>
                    <Title>{name}</Title>
                </Header>
                <Content>
                  <Card>
                        <CardItem cardBody>
                    <Image source={{uri: pic}} style={{height: 200, width: null, flex: 1, resizeMode: 'contain'}}/>
                    </CardItem>
                    <CardItem>
                    <Left>
                        <Button transparent>
                        <Icon active name="thumbs-up" />
                        <Text>12 Likes</Text>
                        </Button>
                    </Left>
                    
                    <Right>
                    <Button transparent>
                        <Icon active name="chatbubbles" />
                        <Text>4 Comments</Text>
                        </Button>
                    </Right>
                    </CardItem>


                </Card>

                <Card>
                    <CardItem header>
                    <Title style={{color:'#eb42f4'}}>Item Details</Title>
                    </CardItem>
                    <CardItem>
                    <Body>
                        
                            <CardItem> 
                                <Left>
                                    <Subtitle style={{color:'#000000'}} >Name</Subtitle>
                                </Left>
                                <Right>
                                    <Subtitle style={{color:'#000000'}}>{name}</Subtitle>
                                </Right>
                            </CardItem> 

                            <CardItem> 
                                <Left>
                                    <Subtitle style={{color:'#000000'}} >Item Information</Subtitle>
                                </Left>
                                <Right>
                                    <Subtitle style={{color:'#000000'}}>{info}</Subtitle>
                                </Right>
                            </CardItem> 
                            <CardItem> 
                                <Left>
                                    <Subtitle style={{color:'#000000'}} >Price</Subtitle>
                                </Left>
                                <Right>
                                    <CardItem>
                                            <Subtitle style={{color:'#000000'}}>{this.state.price*this.state.selectedQunt}</Subtitle> 
                                    </CardItem>
                                    {
                                        this.state.offer!=0?
                                        
                                        <CardItem>
                                             <Subtitle style={{color:'#14600f'}}> {this.state.offer} % off on this</Subtitle> 

                                        </CardItem>
                                    :
                                   <Subtitle></Subtitle>
                                    }
                                    
                                    
                                </Right>
                            </CardItem> 
                       
                    </Body>
                    </CardItem>
                    <CardItem footer>
                                <View style={{ backgroundColor:'#fffcfc', 
                                                    padding:5,
                                                    
                                                    borderBottomColor:'#b4b5b3'}}>
                            <View style={{flexDirection:'row'}}>          
                                <Title style={{color:'#000000'}}>Quntity :  </Title>
                                    <Title style={{color:'#000000'}}>{this.state.selectedQunt} {this.state.unitname}</Title>
                                <View style={{paddingHorizontal:10}}></View>
                                <Button  onPress={()=>{let qunt=this.state.selectedQunt-1; qunt>1?'':qunt=1; this.setState({selectedQunt:qunt})}}>
                                    <Text style={{color:'#ffffff',fontSize:'900',fontSize:25}}>   -   </Text>
                                </Button>
                                <View style={{borderWidth:1,width:50,alignItems:'center'}}>
                                    <Title style={{color:'#000000'}}>{this.state.selectedQunt}</Title>
                                </View>                        
                                <Button  onPress={()=>{let qunt=this.state.selectedQunt+1;this.setState({selectedQunt:qunt})}}>
                                    <Text style={{color:'#ffffff',fontSize:'900',fontSize:25}}>   +   </Text>
                                </Button>
                        
                            </View>
                        
                    
                    </View>

                        
                    </CardItem>
                    <Button bordered full onPress={()=>{
                        // CartPrepare(this.state.selectedProduct,this.state.selectedQunt);
                        }}>
                            <Text>Add To Cart</Text>
                        </Button>
                </Card>

                <Card>
                    <CardItem header>
                    <Title style={{color:'#0d18e2'}}>Shop From Your Nearby Stores</Title>
                    </CardItem>
                    <CardItem>
                    <Body>

                        <FlatList
                            horizontal
                            data={this.state.data}
                            renderItem={this._renderIteam}
                        
                            keyExtractor={item => item.gro_shop_info_id.toString()}
                            ListEmptyComponent={()=>{
                                if(this.state.isEmpty =='Wait List is Loading.....')
                                    return(<View style={{justifyContent:'center'}}>
                                        <ActivityIndicator size="large" color="#0000ff" />
                                        <Text>{this.state.isEmpty}</Text>

                                    </View>);
                                else
                                return(<View style={{justifyContent:'center'}}>
                                        <Text>{this.state.isEmpty}</Text>

                                        </View>)}}

                            ListFooterComponent={()=>{if(this.state.loading) return <View style={{height:20}}><ActivityIndicator size="large" color="#0000ff" /></View>
                            else return <View></View>}}              
                        />   

                    </Body>
                    </CardItem>
                   
                </Card>
                
                </Content>
              </Container>);
        else{
            return <Loading/>
        }
    }
}

