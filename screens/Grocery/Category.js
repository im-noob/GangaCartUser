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
            fetch('http://gomarket.ourgts.com/public/api/cat', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            }).then((response) => response.json())
            .then((responseJson) => {
                //console.log(responseJson); 
                if(responseJson.received == "yes"){
                    let list = [];
                    let content1 = [];
                    var ckeyT = 0;
                    var last = responseJson.data[responseJson.data.length -1].sKey;
                    //console.log(last);
                    for(let data of responseJson.data){
                        if(data.cKey == ckeyT){
                            ckeyT = data.cKey;
                            var temp = {
                                 sKey :data.sKey,
                                 sName : data.sName,
                                 sPic : (data.sPic) ? data.sPic : "http://gomarket.ourgts.com/storage/app/public/offer/ImageNotFound.png"
                             }
                            content1.push(temp);
                            if(data.sKey == last){
                                let title = {
                                    title : data.cname,
                                    content : content1 
                                };
                                list.push(title);
                            }
                        }
                        else{
                            if( ckeyT != 0){
                                let title = {
                                    title : data.cname,
                                    content : content1 
                                };
                                list.push(title);
                                content1 = [];
                                var temp = {
                                    sKey :data.sKey,
                                    sName : data.sName,
                                    sPic : (data.sPic) ? data.sPic : "http://gomarket.ourgts.com/storage/app/public/offer/ImageNotFound.png"
                                }
                               content1.push(temp);                                                                           
                            }
                            else{
                                var temp = {
                                    sKey :data.sKey,
                                    sName : data.sName,
                                    sPic : (data.sPic) ? data.sPic : "http://gomarket.ourgts.com/storage/app/public/offer/ImageNotFound.png"
                                }
                               content1.push(temp);
                            }
                            ckeyT = data.cKey;
                        }
                    }

                    this.setState({CategoryData:list});
                }
                }).catch((error) => {
                    console.log("on error featching:"+error);
            });
        }
        });
        console.log(connectionInfoLocal);  
    }

    componentDidMount() {
        setTimeout(() => {this.setState({renderCoponentFlag: true})}, 0);
        this.fatchCategory();
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
                        <ListItem avatar onPress = {() => {this.props.navigation.navigate('itemList',{
                            sid: item.sKey
                        })}} >
                            <Left>
                                <Thumbnail source={{ uri: item.sPic }} />
                            </Left>
                            <Body>
                                <Text>{item.sName}</Text>
                            </Body>
                        </ListItem>
                    )} }
                    keyExtractor={item => item.sKey.toString()}
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
                            dataArray={this.state.CategoryData}
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