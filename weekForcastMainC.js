import React from 'react';
import WeekForcastListC from './weekForcastListC';
import { StyleSheet, Text, View, Image } from 'react-native';

export default class WeekForcastMainC extends React.Component {


  render() {
        //debugger
      return(
        <View style={styles.container}>
        <WeekForcastListC weeksForcast={this.props.apiObj}/>                
        </View> 
      )
  }
}

    

    

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#20c1e3',
    alignItems: 'center',
    justifyContent: 'space-around',
  }
}); 




