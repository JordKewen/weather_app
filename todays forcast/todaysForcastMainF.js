import React from 'react';
import TodaysForcastItemF from './todaysForcastItemF';
import {StyleSheet, View} from 'react-native';

export default class TodaysForcastMainF extends React.Component {


  render() {

    let todaysForcast = this.props
    



      return(
        <View style={styles.container}>
            <TodaysForcastItemF 
            todaysForcast={todaysForcast}/>
        </View> 
      )
  }
}

    

    

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#20c1e3',
    alignItems: 'center',
    justifyContent: 'center',
  }
}); 