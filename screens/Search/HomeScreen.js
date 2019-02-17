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
import Global from "../../constants/Global";
const {width,height} = Dimensions.get('window');

class ShowSearchResult extends Component {
    constructor(props){
        super(props);
        this.state = {
            renderCoponentFlag: false,
            LodingModal: false,
            gro_searchData: this.props.gro_searchData,
            res_searchData: this.props.res_searchData,
            ser_searchData: this.props.ser_searchData,
        }
    }
    componentDidMount() {
        setTimeout(() => {this.setState({renderCoponentFlag: true})}, 0);
    }

    render() {
        const {renderCoponentFlag} = this.state;
        var items = [
            'Simon Mignolet',
            'Nathaniel Clyne',
            'Dejan Lovren',
            'Mama Sakho',
            'Emre Can'
          ];
        if(renderCoponentFlag){
            return(
                <Container>
                    <Content>
                    <Card>
                        <CardItem header bordered>
                            <Text>Grocery</Text>
                        </CardItem>
                        <CardItem bordered>
                        <Body>
                            <List dataArray={items}
                                renderRow={(item) =>
                                <ListItem onPress={()=>{
                                    console.log(item);
                                }}>
                                    <Text>{item}</Text>
                                </ListItem>
                                }>
                            </List>
                        </Body>
                        </CardItem>
                            <Button transparent block >
                                <Text>Primary</Text>
                            </Button>
                    </Card>
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





export default class HomeScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            renderCoponentFlag: false,
            LodingModal: false,
            searchText:'',
            searchingStatus:false,
            gro_searchData: [],
            res_searchData: [],
            ser_searchData: [],
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
                this.setState({
                    searchingStatus:true,
                });
                fetch(Global.API_URL+'gro/search', {
                    method: 'POST',
                    headers: {
                            'Accept': 'application/json',
                            'Authorization':'Bearer '+KEY,
                        },
                        body: JSON.stringify({ 
                            userID:userID,
                            searchText: this.state.searchText,
                         })
                    }).then((response) => response.json())
                    .then((responseJson) => {
                        var itemsToSet = responseJson.data;
                        console.log('resp:',itemsToSet);
                        if(responseJson.received == 'yes'){
                            
                                // Success Code Goes Here
                            
                        }else{
                            ToastAndroid.showWithGravityAndOffset(
                                'Internal Server Error',
                                ToastAndroid.LONG,
                                ToastAndroid.BOTTOM,
                                25,
                                50,
                            );
                        }
                        this.setState({
                            searchingStatus:false,
                        });
                }).catch((error) => {
                    ToastAndroid.showWithGravityAndOffset(
                        'Network Failed!!! Retrying...',
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM,
                        25,
                        50,
                    );
                    console.log('on error fetching:'+error);
                    this.render_getSearchData();
                });
            }
        });
        console.log(connectionInfoLocal);
    }
    render() {
        const {renderCoponentFlag} = this.state;
        if(renderCoponentFlag){
            return(
                <Container>
                    <Content>
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
                        {
                            this.state.searchingStatus ?
                                <AdvLoder/>:
                                <ShowSearchResult 
                                    gro_searchData = {this.state.gro_searchData}
                                    res_searchData = {this.state.res_searchData}
                                    ser_searchData = {this.state.ser_searchData}
                                    navigation = {this.props.navigation}
                                />
                        }
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