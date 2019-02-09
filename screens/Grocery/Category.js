import React, { Component } from "react";
import {
    StyleSheet,WebView,View,TouchableOpacity,FlatList,
    Dimensions,AsyncStorage,ToastAndroid,NetInfo,Modal,
} from "react-native";
import { 
    Container,Spinner,Button,
    Text,Content,Header,Left,Right,Title,Body,Input,Card,CardItem,List,ListItem,Form,
    Picker,Item,Textarea,Label,Accordion,Thumbnail,
} from 'native-base';
import {createDrawerNavigator,DrawerItems, SafeAreaView,createStackNavigator,NavigationActions } from 'react-navigation';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
const {width,height} = Dimensions.get('window');

const dataArray = [
    { title: "Vegitables", content: [{id:1,name:'Green Vegitables',pic:'http://gomarket.ourgts.com/storage/app/public/offer/ImageNotFound.png'},
                                        {id:2,name:'Dry Vegitables',pic:'http://gomarket.ourgts.com/storage/app/public/offer/ImageNotFound.png'}]},
    { title: "Fruits", content: [{id:4,name:'Green Vegitables',pic:'http://gomarket.ourgts.com/storage/app/public/offer/ImageNotFound.png'},
                                    {id:3,name:'Dry Vegitables',pic:'http://gomarket.ourgts.com/storage/app/public/offer/ImageNotFound.png'}] },
    { title: "Third Element", content: [{id:5,name:'Green Vegitables',pic:'http://gomarket.ourgts.com/storage/app/public/offer/ImageNotFound.png'},
                                    {id:6,name:'Dry Vegitables',pic:'http://gomarket.ourgts.com/storage/app/public/offer/ImageNotFound.png'}] }
];

export default class Category extends Component {
    constructor(props){
        super(props);
        this.state = {
            renderCoponentFlag: false,
            LodingModal: false,
            CategoryData: [],
        }
    }

    fatchCategory =async ()=> {
        
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
            
            fetch(Global.API_URL+'Retailer/getOrder', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson); 
                }).catch((error) => {
                    console.log("on error featching:"+error);
            });
        }
        });
        console.log(connectionInfoLocal);  
    }

    componentDidMount() {
        setTimeout(() => {this.setState({renderCoponentFlag: true})}, 0);
    }

    _renderHeader(item, expanded) {
        return (
          <View style={{
            flexDirection: "row",
            padding: 10,
            justifyContent: "space-between",
            alignItems: "center" ,
            backgroundColor: "#A9DAD6" }}>
          <Text style={{ fontWeight: "600" }}>
              {" "}{item.title}
            </Text>
            {expanded
              ? <Icon style={{ fontSize: 18 }} name="minus" />
              : <Icon style={{ fontSize: 18 }} name="plus" />}
          </View>
        );
      }
      _renderContent(Item) {
        return (
            <List>
                <FlatList 
                    data = {Item.content}
                    renderItem={({item}) => {return(
                        <ListItem avatar onPress = {() => {console.log('Clickec On item : ', item.id)}} >
                            <Left>
                                <Thumbnail source={{ uri: item.pic }} />
                            </Left>
                            <Body>
                                <Text>{item.name}</Text>
                            </Body>
                        </ListItem>
                    )} }
                    keyExtractor={item => item.id.toString()}
                >
                </FlatList>
            </List>
        );
    }
    render() {
        const {renderCoponentFlag} = this.state;
        if(renderCoponentFlag){
            return(
                <Container>
                    <Content padder style={{ backgroundColor: "white" }}>
                        <Accordion
                            dataArray={dataArray}
                            animation={true}
                            expanded={true}
                            renderHeader={this._renderHeader}
                            renderContent={this._renderContent}
                        />
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