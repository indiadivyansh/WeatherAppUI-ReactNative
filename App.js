import React, { useRef } from 'react'
import { Animated, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, useWindowDimensions, View } from 'react-native'

import locations from './model/locations';

const App = () => {


  const {width:windowWidth,height:windowHeight} = useWindowDimensions();

  const scrollX= useRef(new Animated.Value(0)).current;

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
            <View style={{flex:1,backgroundColor:'rgba(0,0,0,0.3)',padding:20,justifyContent:'center',alignItems:'center'}}>
              <Text style={{color:'white'}}>{location.city}</Text>
            </View>
          </ImageBackground>
        </View>
        );
      })}
 
    </ScrollView>
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

export default App

const styles = StyleSheet.create({
  normalDot:{height:5,width:5,borderRadius:4,marginHorizontal:4,backgroundColor:'#fff'},
  indicatorWrapper:{position:'absolute',top:160,left:20,flexDirection:'row',justifyContent:'center',alignItems:'center'}
})
