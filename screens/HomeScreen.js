import React, { Component } from "react";
import {
  StyleSheet,
  WebView ,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  AsyncStorage,
  ToastAndroid,
  FlatList,
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
//import ImageSlider from 'react-native-image-slider';
// import Slideshow from 'react-native-slideshow';
import {createDrawerNavigator,DrawerItems, SafeAreaView,createStackNavigator,NavigationActions } from 'react-navigation';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import DeckSwiperAdvancedExample from "./ImageExample";
const {width,height} = Dimensions.get('window');

export default class HomeScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      renderCoponentFlag: false,
      LodingModal: false,
      data:[{key:'1',title:'Gorcery',navigationKey:'Grocery',pic:'https://upload.wikimedia.org/wikipedia/commons/1/13/Supermarkt.jpg'}]
    }
  }
  componentDidMount() {
    setTimeout(() => {this.setState({renderCoponentFlag: true})}, 5);
  }

  _renderItem = ({item}) =>{
                            return(
                             <TouchableOpacity onPress={()=>{this.props.navigation.navigate(item.navigationKey)}}>
                             <View  style={{justifyContent:'center',width:60,paddingHorizontal:10,paddingVertical:4,borderColor:"#040504"}}>
                                  <Image style={{height:50,width:50,resizeMode: 'contain'}} source={{uri: item.pic}}/>
                                  <Text style={{color:'#000000',fontSize:10}}>{item.title}</Text>   
                              </View>
                              </TouchableOpacity>
                              
                            )
                           } 

  render() {
    const {renderCoponentFlag} = this.state;
    if(renderCoponentFlag){
      return(
        <Container>
          <Content>
            <Card style={{height:100,width:500}} transparent >
              <FlatList
                data={this.state.data}
               
               
                renderItem={this._renderItem}
              />
            </Card>
            <Card>
              
                <DeckSwiperAdvancedExample/>
             
            </Card>


            <Button bordered dark onPress={()=>{
              this.props.navigation.navigate('Gorcery');
            }}>
              <Text> Go to Profile screen</Text>
            </Button>
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