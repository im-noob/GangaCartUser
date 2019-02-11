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
    Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Thumbnail,ListItem,Container,List,Grid,Picker,
     Header, Content, Spinner,Button, Title,Card,CardItem,Left,Body,Right,Subtitle, Form } from 'native-base';
import {createDrawerNavigator,DrawerItems, SafeAreaView,createStackNavigator,NavigationActions } from 'react-navigation';
import Global from '../../constants/Global';
// import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
// const {width,height} = Dimensions.get('window');

export default class ChangeOrder extends React.Component {
    constructor(props){
        super(props);
        this.state={
            isLoad:false,
            pID:0,
            mid:0,
            sID:0,
            data:[],
            selectedQunt:1,
            selectedShop:[],
            price:0,
            offer:0,
            topay:0,
            selectedProduct:[],
            unitname:'',
            pic:'',
            pic1:'',
            info:'',
            title:'',
            shopName:'No Shop Selected',
            address:'',
            unitList :[],
            unit_name:'',
        }
    }
    
    componentDidMount = async () => {
        await this.setData();
        await this.fetech();
        this.setState({path:Global.Image_URL});
    }

    fetech = async() =>{


        this.setState({isLoad:false});
        await fetch('http://gomarket.ourgts.com/public/api/gro_product_shop', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                id:this.state.map
            })
            }).then((response) => response.json())
            .then((responseJson) => {
           console.log(this.state.map +" Related shop Load ......",responseJson);
              this.setState({data:responseJson.data}); 
              this._selectShop(responseJson.data[0]);
            }).catch((error) => {        

                console.log( error.message);
        }); 
        this.setState({isLoad:true});

    }

    _selectShop= (item)=>{
        //var name = item.data[0].quantity + ' ' + item.data[0].unit;
        var list = [];
        for (let index = 0; index < item.data.length; index++) {
            list.push(<Picker.Item label={item.data[index].quantity + ' ' + item.data[index].unit} value={index} />);   
        }
        this.setState({
            selectedShop:item,
            price:item.data[0].price,
            offer:item.data[0].offer,
            unitname:item.data[0].unit,
            shopName : item.name,
            address:item.address,
            unit_name:0,
            unitList:list,
            pic1:item.pic,
            path:'http://gomarket.ourgts.com/public/'
        }); 
        
        console.log('Shop Selected.');
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
        console.log("Data not found ",this.props);
        const item = navigation.getParam('data', '[]');
        console.log("Data not found ",item);
        await this.setState({selectedProduct:item[0]});
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

    unitChange = (indx) =>{

        console.log(this.state.selectedShop.data[indx],indx);
        var name = this.state.selectedShop.data[indx].quantity + ' ' + this.state.selectedShop.data[indx].unit;
        
        this.setState({unit_name:indx});
        console.log(name);
        this.setState({
            price:this.state.selectedShop.data[indx].price,
            offer:this.state.selectedShop.data[indx].offer,
            unitname:this.state.selectedShop.data[indx].unit,
        }); 
    }

    render(){
      //  console.log(Global.API_URL+this.state.pic);
        if(this.state.isLoad)
            return(
            <Container>
                <Header>
                    <Left>
                        <Thumbnail source={{uri:this.state.path+ this.state.pic1}} />
                    </Left>
                    <Body>
                        <Title style={{color:'#ffffff',fontSize:'600',fontSize:20}}>{this.state.shopName}</Title>
                        <Subtitle style={{color:'#ffffff'}}>{this.state.address}</Subtitle>
                    </Body>
                </Header>
                <Content>
                    <Card>
                        <CardItem cardBody>
                            <Image 
                                source={{uri:Global.API_URL+this.state.pic}} 
                                style={{height: 200, width:'100%', flex: 1, resizeMode: 'contain'}}
                            />
                        </CardItem>
                        <Grid style={{paddingHorizontal:8,marginVertical:2,flexDirection:'row'}}>
                            <Body>
                                <Text style={{fontSize:18}}>{this.state.title} - Local</Text>
                            </Body>
                        </Grid>

                        <CardItem >
                            <Picker
                                style = {{borderColor:'black',borderRadius:10,borderWidth:1}} 
                                selectedValue={this.state.unit_name}
                                onValueChange={(itemValue, itemIndex) => {this.unitChange(itemIndex)}}>
                                {this.state.unitList}
                            </Picker>
                        </CardItem>
                        
                        <Grid style={{paddingHorizontal:8,marginVertical:2,flexDirection:'row'}}>
                            <Right>
                                 <Text style={{fontSize:18}}><Icon name="currency-inr" size={18}/>{this.state.price }  </Text>
                            </Right>
                            <Body>
                                <Text style={{fontSize:14,textDecorationLine: 'line-through'}}> MRP <Icon name="currency-inr" size={14}/> {this.state.price}</Text>
                            </Body>                                        
                            <Right>
                                <Text style={{paddingHorizontal:4 ,color:'#4bb550',fontSize:15}}> {this.state.offer} % off</Text>
                            </Right>
                        </Grid>                    
                        <CardItem footer>
                            <Left> 
                                <Text style={{color:'#000000'}}><Icon name="currency-inr" size={18}/>{this.state.price * this.state.selectedQunt}</Text>
                            </Left>
                            <Right>
                                <View style={{flexDirection:'row'}}>          
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
                            </Right>
                        </CardItem>

                        <Button bordered full onPress={()=>{
                            CartPrepare(this.state.selectedProduct,this.state.selectedQunt);
                            }}>
                                <Text>Add To Cart</Text>
                        </Button>
                    </Card>
                <Card>
                    <CardItem header>
                        <Title style={{color:'#0d18e2'}}>Nearby Stores</Title>
                    </CardItem>
                    <FlatList
                        data={this.state.data}
                        renderItem={this._renderIteam}
                        keyExtractor={item => item.key.toString()}
                        ListFooterComponent={()=>{
                            if(!this.state.isLoad) 
                                return <View style={{height:20}}><ActivityIndicator size="large" color="#0000ff" /></View>
                            else 
                                return <View></View>}}              
                    />   
                </Card>
                </Content>
              </Container>);
        else{
            return <Loading/>
        }
    }
}

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