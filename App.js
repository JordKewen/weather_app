import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Switch } from 'react-native';
import WeekForcastMainC from './week forcast/weekForcastMainC';
import WeekForcastMainF from './week forcast/weekForcastMainF';
import TodaysForcastMainC from './todays forcast/todaysForcastMainC';
import TodaysForcastMainF from './todays forcast/todaysForcastMainF';
import axios from 'axios';
import SelectLocation from './selectLocation'

export default class App extends React.Component {

    state={
        //TODAYS FORCAST STATE
          latitude: 0,
          longitude: 0,
          forecast: [],
          cityName:'',
          icon:'',
          date:'',
          temp:0,
          tempMin:0,
          tempMax:0,
          cityID:'',
        //WEEKS FORCAST STATE
          apiObj:'',
          wDate:'',
          wIcon:'',
          wTempMin:0,
          wTempMax:0,
          wkApiObj:'',
        // DISPLAY SEARCH STATE
          displaySearch: false,
        // CELCIUS TO FAHRENHEIT
          switchValue: true
        }

    // RETREIVES LATITUDE AND LONGITUDE OF CURRENT LOCATION AND SENDS GET REQUEST FOR TODAYS AND WEEKS WEATHER
    componentDidMount(){
        const getLocation=()=>{
          navigator.geolocation.getCurrentPosition((pos)=>{
          this.setState({latitude:pos.coords.latitude,longitude:pos.coords.longitude},()=>{
          this.getWeather()
          this.getWeeksWeather()
            })
          })
        }
          getLocation(); 
    }

    //HANDLERS
    handleToggleSwitch=()=>{
        this.setState({switchValue: !this.state.switchValue})
    }

    getSearchLocation=(data)=>{        
      this.setState({cityID:data.description},()=>{
        this.getWeather('get')
        this.getWeeksWeather('banana')
      })
    }

    displaySearch=()=>{
      this.setState({displaySearch:true})
    }

    hideSearch=()=>{
      this.setState({displaySearch:false})
    }

    celsiusToFahrenheit=()=>{      
        let fahrenheit = {  temp : this.state.temp*1.8+32,
                            tempMin : this.state.tempMin*1.8+32,
                            tempMax : this.state.tempMax*1.8+32,
                            wTempMin : this.state.wTempMin*1.8+32,
                            wTempMax : this.state.wTempMax*1.8+32,
                            icon : this.state.icon,
                            date : this.state.date,
                            cityName : this.state.cityName
                          } 
                            return fahrenheit
    }

    getWeather =(bool)=>{       
        if(bool === 'get'){
          let url = 'https://api.openweathermap.org/data/2.5/weather?q=' + this.state.cityID + '&units=metric&appid=b4bf003ae1a8131434f3457495d5eee1'
          axios.get(url).then((response)=>{          
            this.setState({
              cityName:response.data.name,
              icon:response.data.weather[0].icon,
              date:new Date(),
              temp:Math.round(response.data.main.temp),
              tempMin:response.data.main.temp_min,
              tempMax:response.data.main.temp_max,
            }),()=>{
              this.weekForcastCalc()
            }
          })
          .catch((error)=> {
          //error case, handle the error
        });
        }else{
          let url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + this.state.latitude + '&lon=' + this.state.longitude + '&units=metric&appid=b4bf003ae1a8131434f3457495d5eee1';
          axios.get(url).then((response)=>{          
            this.setState({
              cityName:response.data.name,
              icon:response.data.weather[0].icon,
              date:new Date(),
              temp:Math.round(response.data.main.temp),
              tempMin:response.data.main.temp_min,
              tempMax:response.data.main.temp_max
            }),()=>{
              this.weekForcastCalc()
            }          
          })
          .catch((error)=> {
          //error case, handle the error
        });
      }
    }

    getWeeksWeather=(bool)=>{
        if(bool === 'banana'){
          let url = 'https://api.openweathermap.org/data/2.5/forecast?q='+ this.state.cityID +'&units=metric&appid=b4bf003ae1a8131434f3457495d5eee1'
          axios.get(url).then((response)=>{ 
            this.setState({
              apiObj:response.data
            },()=>{
              this.weekForcastCalc()
            })
          })
          .catch((error)=> {            
            //error case, handle the error
          });
         }else{
          let url = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + this.state.latitude + '&lon=' + this.state.longitude + '&units=metric&appid=b4bf003ae1a8131434f3457495d5eee1';
          axios.get(url).then((response)=> {                   
            this.setState({
               apiObj:response.data,
            },()=>{
              this.weekForcastCalc()
            })
          })
          .catch((error)=> {
            //error case, handle the error
          });
       }
    }

////////// WEEK FORCAST CALCULATIONS //////////
    weekForcastCalc=()=>{
        this.arr = [], this.newArr = [];
          if(this.state.apiObj.list){
              this.state.apiObj.list.forEach(ele => {   
                var date = ele.dt_txt.split(' ')[0];
          if(this.arr.includes(date)){
              this.arr.push(date)
                this.newArr.push(ele);                
          }else if(this.arr.length === 0){    
                    this.newArr.push(ele)
                      this.arr.push(date)
          }else{
                this.arr.push(date)       
                  this.arr.push(this.newArr)
                    this.newArr = []
                }
              })
          }
        let arr = this.arr.filter(ele => Array.isArray(ele));
        let objArr = []                
          arr.forEach((arr)=>{
            let maxNum=[];
            let minNum = []
            let icon = [];
          arr.forEach((obj)=>{
              maxNum.push(obj.main.temp_max);
              minNum.push(obj.main.temp_min);
              iconString = obj.weather[0].icon;
            if(iconString.includes('d')){
              icon.push(iconString)
            }
          })
        let max = Math.max.apply(null,maxNum);
        let min = Math.min.apply(null,minNum);
        const mostOccurrences=(icon)=>{
              return icon.sort((a,b) =>
                     icon.filter(v => v===a).length
                   - icon.filter(v => v===b).length
                     ).pop();
              }                        
        let mainIcon = mostOccurrences(icon)
          objArr.push({date:arr[0].dt_txt.split(' ')[0],max:max,min:min,icon:mainIcon})	
          })
        this.setState({wkApiObj:objArr},()=>{
        });
      }
///////// WEEK FORCAST CALCULATIONS ///////////

    render() {  
        if(this.state.displaySearch){
          return(
                <View style={{marginTop:23, flex:1,backgroundColor:'#1fbbdd'}}>
                    <SelectLocation style={{flex:.4}}
                    getSearchLocation={this.getSearchLocation} 
                    hideSearch={this.hideSearch}
                  />
                </View> 
          )
        }else if(this.state.switchValue === false){
          return(          
                <View style={styles.container}>
                  <View style={styles.top}>
                      <TodaysForcastMainF todaysForcast={this.celsiusToFahrenheit()}/>
                  </View>
                  <View style={styles.middle}>
                      <WeekForcastMainF apiObj={this.state.wkApiObj}/>
                  </View>
                  <View style={styles.bottom}> 
                  <View style={{flexDirection:'row',alignContent:'center'}}>
                  <TouchableOpacity onPress={this.handleToggleSwitch}>
                        <Text style={{fontSize: 21,justifyContent:'flex-start',opacity:.5}}>ºC/</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.handleToggleSwitch}>
                        <Text style={{fontSize: 21,justifyContent:'flex-end'}}>ºF</Text>
                  </TouchableOpacity>
                  </View>
                  <TouchableOpacity  onPress={this.displaySearch}> 
                      <Image  style={{flex:1,
                                      width:69,
                                      height:63,
                                      alignSelf:'center',
                                      marginTop:0,
                                      marginRight:101
                              }}
                              source={{uri:'https://res.cloudinary.com/dyxarofvr/image/upload/v1547715406/reload__refresh__world__browser__global-512.png'}}
                      />
                  </TouchableOpacity>
                  </View>
                </View>
      )} else {
          return(          
                <View style={styles.container}>
                  <View style={styles.top}>
                      <TodaysForcastMainC {...this.state}/>
                  </View>
                  <View style={styles.middle}>
                      <WeekForcastMainC apiObj={this.state.wkApiObj}/>
                  </View>
                  <View style={styles.bottom}>              
                  <View style={{flexDirection:'row',alignContent:'center'}}>
                  <TouchableOpacity onPress={this.handleToggleSwitch}>
                        <Text style={{fontSize: 21,justifyContent:'flex-start'}}>ºC/</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.handleToggleSwitch}>
                        <Text style={{fontSize: 21,justifyContent:'flex-end',opacity:.5}}>ºF</Text>
                  </TouchableOpacity>
                  </View>
                  <TouchableOpacity  onPress={this.displaySearch}> 
                      <Image  style={{flex:1,
                                      width:69,
                                      height:63,
                                      alignSelf:'center',
                                      marginTop:0,
                                      marginRight:101
                              }}
                              source={{uri:'https://res.cloudinary.com/dyxarofvr/image/upload/v1547715406/reload__refresh__world__browser__global-512.png'}}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
          )
        }    
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  top:{
    flex:.6,
    backgroundColor: 'white',
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  middle:{
    flex:.27,
    backgroundColor: 'red',
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderTopWidth: 1,
    borderColor:'black'
  },
  bottom:{
    flex:.13,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#1fbbdd',
    width: '100%',
    borderTopWidth: 1,
    borderColor: 'black'
  }
});