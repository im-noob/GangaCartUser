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
import { Tile } from "react-native-elements";
const {width,height} = Dimensions.get('window');

export default class Order extends Component {
    constructor(props){
        super(props);
        this.state = {
            renderCoponentFlag: false,
            LodingModal: false,
            cartData:[],
        }
    }
    componentDidMount() {
        setTimeout(() => {this.setState({renderCoponentFlag: true})}, 0);
        this._start();

    }

    _start =async()=>{
        data =await AsyncStorage.getItem('CartList');
        data = JSON.parse(data);
        console.log("Cart Order : ",data);
    }

    render() {
        const {renderCoponentFlag} = this.state;
        if(renderCoponentFlag){
            return(
                <Container>
                    <Content>
                    
                       <Card>
                            <CardItem header>
                                    <Title style={{color:'#000000'}}>Redmi 6 (Rose Gold, 32 GB)</Title>
                            </CardItem>
                            <CardItem>
                                    <Left>

                                    </Left>
                                    <Right>

                                    </Right>
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