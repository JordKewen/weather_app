import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native'
import WeatherIcons from './weatherIcons'


export default class WeekForcastItemF extends React.Component {
    render(){
        let day = new Date(this.props.day).toDateString().split(' ')
        let icon = this.props.icon
        let max = Math.round(this.props.max)
        let min = Math.round(this.props.min)
        return(
            <View style={{flexDirection:'row', justifyContent:'space-around', width:'100%', padding: 3, alignItems:'flex-end'}}>  
                <Text style={{fontSize:19, width:51,marginLeft:23}}>{day[0]}</Text>
                <Image style={{width: 31, height: 31,marginLeft:87}}source={{uri:WeatherIcons[icon]}}/> 
                <Text style={{fontSize:19,marginLeft:71,width:49}}>{max}º </Text>
                <Text style={{fontSize:17,marginLeft:17,width:49}}>{min}º </Text>
            </View>
        )

    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
    }
  }); 
