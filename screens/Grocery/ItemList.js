import React, { Component } from "react";
import {
    StyleSheet,WebView ,View,TouchableOpacity,Dimensions,AsyncStorage,
    ToastAndroid,NetInfo,Modal,FlatList,ScrollView,Image
} from "react-native";
import { 
    Container,Spinner,Button,Text,Content,Header,Grid,
    Left,Right,Title,Body,Input,Card,CardItem,List,ListItem,Form,Picker,Item,
    Textarea,Label,Thumbnail,
} from 'native-base';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import HeaderTitle from './../../components/HeaderTitle';
const {width,height} = Dimensions.get('window');

export default class ItemList extends Component {
    constructor(props){
        super(props);
        const {navigation} = this.props;
        let val = navigation.getParam('sid',5);
        this.state = {
            renderCoponentFlag: false,
            LodingModal: false,
            value:val,
            ProductList:[],
        }
    }
    componentDidMount() {
        setTimeout(() => {this.setState({renderCoponentFlag: true})}, 0);
        this.fatchItem();
    }

    fatchItem =async ()=> {
        
        this.setState({renderCoponentFlag:false});
        var connectionInfoLocal = '';
        NetInfo.getConnectionInfo().then((connectionInfo) => {
     //   console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
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
            fetch('http://gomarket.ourgts.com/public/api/gro_product', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({
                    id:this.state.value
                })
            }).then((response) => response.json())
            .then((responseJson) => {
               //console.log(responseJson); 
                if(responseJson.received == "yes"){
                    this.setState({ProductList:responseJson.data.data});
                    //console.log(responseJson.data.data);
                }
                }).catch((error) => {
                    console.log("on error featching:"+error);
            });
        }
        });
        console.log(connectionInfoLocal);  
        this.setState({renderCoponentFlag:true});
    }
    render() {
        
        dataView = (item) => {
           // console.log('http://gomarket.ourgts.com/public/'+item.pic);
            return ( 
                <Content>
                    <Card style={{flex: 0}}>
                        <CardItem style={{height:200,width:(width-4)/2 }} button onPress={() => {  this.props.navigation.navigate('ItemDetails',{
                            data:[item]
                        })}}>
                            <Body>
                                <Image source={{uri:"http://gomarket.ourgts.com/public/"+item.pic}} style={{height:150, width: "100%",resizeMode: 'contain'}}/>
                            </Body>
                        </CardItem>
                        <Title style={{paddingHorizontal:8,marginVertical:2,fontSize:14,color:'#000000'}}>{item.title}</Title>
                        <Grid style={{paddingHorizontal:8,marginVertical:2,flexDirection:'row'}}>
                            <Text style={{fontSize:12}}><Icon name="currency-inr" size={12}/>{item.price}</Text>
                            <Text style={{paddingHorizontal:4 ,fontSize:12}}>{item.size}/{item.unit}</Text>
                        </Grid>
                    </Card>
                </Content>
            );
        }
        const {renderCoponentFlag} = this.state;
        if(renderCoponentFlag){
            return(
                <Container>
                <ScrollView>
                <FlatList 
                        data = {this.state.ProductList}
                        renderItem = {({item}) => dataView(item) }
                        keyExtractor = {item => item.pid}
                        numColumns = {2}
                    >
                    </FlatList>
                </ScrollView>
                </Container>
            );
        }else{
            return (
                <Spinner color='#2874f0' size='large' style={{height:40}} />
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