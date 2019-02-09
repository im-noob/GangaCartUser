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
//import ImageSlider from 'react-native-image-slider';
// import Slideshow from 'react-native-slideshow';
import {createDrawerNavigator,DrawerItems, SafeAreaView,createStackNavigator,NavigationActions } from 'react-navigation';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import Global from "../constants/Global";
const {width,height} = Dimensions.get('window');

export default class HomeScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      renderCoponentFlag: false,
      LodingModal: false,
    }
  }
  componentDidMount() {
    setTimeout(() => {this.setState({renderCoponentFlag: true})}, 5);
  }

  render() {
    const {renderCoponentFlag} = this.state;
    if(renderCoponentFlag){
      return(
        <Container>
          <Content>
            <Button bordered dark onPress={()=>{
              this.props.navigation.navigate('ExampleScreenFirst');
            }}>
              <Text> Go to First screen</Text>
            </Button>
            <Button bordered primary onPress={()=>{
              console.log("changin no:"+Global.CART_VALUE);
              value = parseInt(Global.CART_VALUE) + 1 
              AsyncStorage.setItem('cart_value',value+"12");
              Global.CART_VALUE = "5";
              console.log("changin:"+Global.CART_VALUE);
            }}>
                <Text>Add to Cart</Text>
            </Button>
            <Card>
              <CardItem>
              {/* <ImageSlider images={[
                'http://placeimg.com/640/480/any',
                'http://placeimg.com/640/480/any',
                'http://placeimg.com/640/480/any'
              ]}/> */}
                
                {/* <Slideshow
                dataSource={[
                              { url:'http://placeimg.com/640/480/any' },
                              { url:'http://placeimg.com/640/480/any' },
                              { url:'http://placeimg.com/640/480/any' }
                            ]}
                />  */}
              </CardItem>
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