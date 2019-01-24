import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native'
import WeatherIcons from '../week forcast/weatherIcons'


export default class TodaysForcastItemF extends React.Component {

    render(){
              let date = new Date().toDateString().split(' ')
              let weatherIcon = this.props.todaysForcast.todaysForcast.icon
               //debugger
        return(
            <View style={styles.container}>
            <View style={styles.todaysIcon}>
                <Text style={{fontSize: 39, paddingBottom:29}}>{this.props.todaysForcast.todaysForcast.cityName}</Text>
                <Image style={{width:61, height: 61, paddingBottom:35}} source={{uri: WeatherIcons[weatherIcon]}}/>
                <Text style={{fontSize:37, paddingTop:33}}>{Math.round(this.props.todaysForcast.todaysForcast.temp)}º </Text>
            <View style={{flexDirection:'row',justifyContent:'space-evenly',width:'100%'}}>                
            </View> 
            </View>
            <View style={styles.dateAndTemp}>
                <Text style={{fontSize:31,marginLeft:17}}>{date[0]}</Text>
                <Text style={{fontSize:19, marginRight:29}}>TODAY</Text>         
                <Text style={{fontSize:21,marginLeft:77}}>{Math.round(this.props.todaysForcast.todaysForcast.tempMax)}º </Text>
                <Text style={{fontSize:19,marginRight:3}}>{Math.round(this.props.todaysForcast.todaysForcast.tempMin)}º </Text>
            </View>
            
            </View>
        )

    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
       justifyContent: 'space-around',
    },
    todaysIcon:{
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    dateAndTemp:{
        alignContent: 'space-between',
        alignItems: 'baseline',
        flexDirection: 'row',
        justifyContent:'space-around',
        width:'100%',
        paddingBottom: 55
    }

})