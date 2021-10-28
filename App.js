import React, { useRef } from 'react'
import { Animated, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height';

import locations from './model/locations';
import SunIcon from './assets/sun.svg';
import CloudIcon from './assets/cloudy.svg';
import MoonIcon from './assets/moon.svg';
import RainIcon from './assets/rain.svg';
import MenuIcon from './assets/menu.svg';
import SearchIcon from './assets/search.svg';

const App = () => {


  const {width:windowWidth,height:windowHeight} = useWindowDimensions();

  const scrollX= useRef(new Animated.Value(0)).current;

  const WeatherIcon = (weatherType)=>{
    if(weatherType==='Sunny'){
      return <SunIcon height={34} width={34} fill='#fff' />
    }
    if(weatherType==='Rainy'){
      return <RainIcon height={34} width={34} fill='#fff' />
    }
    if(weatherType==='Cloudy'){
      return <CloudIcon height={34} width={34} fill='#fff' />
    }
    if(weatherType==='Night'){
      return <MoonIcon height={34} width={34} fill='#fff' />
    }
  }; 

  return (
    <>
    <StatusBar barStyle="light-content"/>
    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      onScroll={
        Animated.event(
          [{nativeEvent:{
            contentOffset:{
              x:scrollX
            }
          }}],{useNativeDriver:false}
        )
      }
      scrollEventThrottle={1}
    >
      {locations.map((location,index)=>{
        if(location.weatherType === 'Night'){
          bgImg = require('./assets/night2.jpg');
          i = index;
        }
        else if(location.weatherType === 'Cloudy'){
          bgImg = require('./assets/cloudy.jpeg');
          i = index;
        }
        else if(location.weatherType === 'Sunny'){
          bgImg = require('./assets/sunny.jpg');
          i = index;
        }
        else if(location.weatherType === 'Rainy'){
          bgImg = require('./assets/rainy.jpg');
          i = index;
        }

        return (
        <View key={index} style={{width:windowWidth,height:windowHeight}}>
          <ImageBackground source={bgImg} style={{flex:1}}>
            <View style={{flex:1,backgroundColor:'rgba(0,0,0,0.3)',padding:20}}>
              <View style={styles.topInfoWrapper}>
                <View>
                <Text style={styles.city}>{location.city}</Text>
                <Text style={styles.time}>{location.dateTime}</Text>
                </View>
                <View>
                  <Text style={styles.temp}>{location.temparature}</Text>
                  <View style={{flexDirection:'row'}}>
                  {WeatherIcon(location.weatherType)}
                  <Text style={styles.weatherType}>{location.weatherType}</Text>
                  </View>
                  
                </View>
              </View>
              <View style={{
                borderBottomColor:'rgba(255,255,255,0.7)',
                marginTop:20,
                borderBottomWidth:1
                }}/>
              <View style={styles.bottomInfoWrapper}>
                <View style={{alignItems:'center'}}>
                  <Text style={styles.infoText}>Wind</Text>
                  <Text style={[styles.infoText,{fontSize:24}]}>{location.wind}</Text>
                  <Text style={styles.infoText}>km/hr</Text>
                  <View style={styles.infoBar}>
                    <View style={{width:location.wind/2,height:5,backgroundColor:'#69F0AE'}}/>
                  </View>
                </View>
                <View style={{alignItems:'center'}}>
                  <Text style={styles.infoText}>Rain</Text>
                  <Text style={[styles.infoText,{fontSize:24}]}>{location.rain}</Text>
                  <Text style={styles.infoText}>%</Text>
                  <View style={styles.infoBar}>
                    <View style={{width:location.rain/2,height:5,backgroundColor:'#F44336'}}/>
                  </View>
                </View>
                <View style={{alignItems:'center'}}>
                  <Text style={styles.infoText}>Humidity</Text>
                  <Text style={[styles.infoText,{fontSize:24}]}>{location.humidity}</Text>
                  <Text style={styles.infoText}>%</Text>
                  <View style={styles.infoBar}>
                    <View style={{width:location.humidity/2,height:5,backgroundColor:'#69F0AE'}}/>
                  </View>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
        );
      })}
    </ScrollView>

    <View style={styles.appHeader}>
      <TouchableOpacity onPress={()=>{}}>
        <SearchIcon width={24} height={24} fill="#fff" />
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{}}>
        <MenuIcon width={24} height={24} fill="#fff" />
      </TouchableOpacity>
    </View>
    
    <View style={styles.indicatorWrapper}> 
      {locations.map((location,index)=>{
        const width =scrollX.interpolate({
            inputRange:[
              windowWidth * (index-1),
              windowWidth * (index),
              windowWidth * (index+1),
            ],
            outputRange:[5,12,5],
            extrapolate:'clamp'
        });
        return(
          <Animated.View key={index} 
          style={[styles.normalDot,{width}]}
          />
        );
      })}
    </View>
    </>
  )
}

export default App;

const styles = StyleSheet.create({
  appHeader:{
    position:'absolute',
    top:0,
    width:'100%',
    height:getStatusBarHeight()+40,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'flex-end',
    paddingHorizontal:20
  },
  infoBar:{
    width:45,
    height:5,
    backgroundColor:'rgba(255,255,255,0.5)'
  },
  infoText:{fontSize:14,color:'white',fontFamily:'Lato-Regular',fontWeight:'bold'},
  topInfoWrapper:{
    flex:1,
    marginTop:160,
    justifyContent:'space-between'
  },
  bottomInfoWrapper:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginVertical:20
  },
  city:{
    color:'#fff',
    fontSize:30,
    fontFamily:'Lato-Regular',
    fontWeight:'bold'
  },
  time:{
    color:'#fff',
    fontFamily:'Lato-Regular',
    fontWeight:'bold'
  },
  temp:{
    color:'#fff',
    fontFamily:'Lato-Light',
    fontSize:85
  },
  weatherType:{
    color:'#fff',
    fontSize:25,
    fontFamily:'Lato-Regular',
    fontWeight:'bold',
    lineHeight:34,
    marginLeft:10
  },
  normalDot:{height:5,width:5,borderRadius:4,marginHorizontal:4,backgroundColor:'#fff'},
  indicatorWrapper:{position:'absolute',top:140,left:20,flexDirection:'row',justifyContent:'center',alignItems:'center'}
})
