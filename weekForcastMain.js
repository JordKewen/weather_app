import React from 'react';
import WeekForcastList from './WeekForcastList'
import { StyleSheet, Text, View, Image } from 'react-native';

export default class weekForcastMain extends React.Component {


  render() {

      return(
        <View style={styles.container}>
        <WeekForcastList weeksForcast={this.props.apiObj}/>                
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




