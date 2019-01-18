import React from 'react';
import TodaysForcastItem from './todaysForcastItem';
import {StyleSheet, View} from 'react-native';

export default class TodaysForcastMain extends React.Component {


  render() {

    let todaysForcast = this.props



      return(
        <View style={styles.container}>
            <TodaysForcastItem 
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




