import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Switch } from 'react-native';
import WeekForcastMain from './week forcast/weekForcastMain';
import TodaysForcastMain from './todays forcast/todaysForcastMain'
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

  handleToggleSwitch=()=>{
    this.setState({switchValue: !this.state.switchValue})
    }
  
   
      celsiusToFahrenheit=()=>{
        let tempVar = this.state.temp
        if(this.state.switchValue === false){
        this.setState({temp:tempVar*1.8+32})
        } else {
          this.setState({temp:tempVar})
        }
      }


      getSearchLocation=(data)=>{        
        this.setState({cityID:data.description},()=>{
          // console.log(this.state)
          this.getWeather('get')
          this.getWeeksWeather('banana')
        })
      }



     getWeather =(bool)=>{       
       if(bool === 'get'){
        let url = 'https://api.openweathermap.org/data/2.5/weather?q='+this.state.cityID +'&units=metric&appid=b4bf003ae1a8131434f3457495d5eee1'
        axios.get(url)
        .then((response)=> {  
            this.setState({
            cityName:response.data.name,
            icon:response.data.weather[0].icon,
            date:new Date(),
            temp:Math.round(response.data.main.temp),
            tempMin:response.data.main.temp_min,
            tempMax:response.data.main.temp_max,
          })
        })
        .catch((error)=> {
          // 
          //error case, handle the error
        });
       }else{
        let url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + this.state.latitude + '&lon=' + this.state.longitude + '&units=metric&appid=b4bf003ae1a8131434f3457495d5eee1';
        axios.get(url)
        .then((response)=> {
          this.setState({
            cityName:response.data.name,
            icon:response.data.weather[0].icon,
            date:new Date(),
            temp:Math.round(response.data.main.temp),
            tempMin:response.data.main.temp_min,
            tempMax:response.data.main.temp_max
          }),()=>{
            // this.celsiusToFahrenheit()
          }
          
        })
        .catch((error)=> {
          //error case, handle the error
        });
        // 
       }
      }

       getWeeksWeather=(bool)=>{
        // console.log('this.state.cityID', this.state.cityID)
        if(bool === 'banana'){//'https://api.openweathermap.org/data/2.5/weather?q='+this.state.cityID +'&units=metric&appid=b4bf003ae1a8131434f3457495d5eee1'
          let url = 'https://api.openweathermap.org/data/2.5/forecast?q='+ this.state.cityID +'&units=metric&appid=b4bf003ae1a8131434f3457495d5eee1'
          axios.get(url)
          .then((response)=> { 
              //debugger
              this.setState({
                apiObj:response.data
            },()=>{
              this.weekForcastCalc()

            })
          })
          .catch((error)=> {
            
            //error case, handle the error
          });
          // 
         }else{
          let url = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + this.state.latitude + '&lon=' + this.state.longitude + '&units=metric&appid=b4bf003ae1a8131434f3457495d5eee1';
          axios.get(url)
          .then((response)=> {            
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



      displaySearch=()=>{
          this.setState({displaySearch:true})
      }

      hideSearch=()=>{
        this.setState({displaySearch:false})
      }

////////// WEEK FORCAST CALCULATIONS //////////

 weekForcastCalc  =()=> {

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
                     // console.log('=====>',mainIcon)
              objArr.push({date:arr[0].dt_txt.split(' ')[0],max:max,min:min,icon:mainIcon})	
            })
            this.setState({wkApiObj:objArr},()=>{
             // console.log(this.state)
            });
}

///////// WEEK FORCAST CALCULATIONS //////////
    

    

    render() {  

      if(this.state.displaySearch){
        return(
        <View style={{marginTop:200, flex:1}}>
          <SelectLocation 
          getSearchLocation={this.getSearchLocation} 
          hideSearch={this.hideSearch}
        />
        </View> 
        )
      }else if(this.state.switchValue === false){
         this.celsiusToFahrenheit()
      return(          
        <View style={styles.container}>
        <View style={styles.top}>
        <TodaysForcastMain {...this.state}/>
        </View>
        <View style={styles.middle}>
          <WeekForcastMain apiObj={this.state.wkApiObj}/>
        </View>
        <View style={styles.bottom}> 
        <Switch style={{backgroundColor: '#1fbbdd', Color:'red', borderRadius: 17}}
              onValueChange={this.handleToggleSwitch}
              value={this.state.switchValue}
        />
        <TouchableOpacity  onPress={this.displaySearch}> 
        <Image
            style={{width:63,
                    height:63,
                    alignSelf:'center',
                    marginTop:11
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
          <TodaysForcastMain {...this.state}/>
          </View>
          <View style={styles.middle}>
            <WeekForcastMain apiObj={this.state.wkApiObj}/>
          </View>
          <View style={styles.bottom}> 
          <Switch style={{backgroundColor: '#1fbbdd', Color:'red', borderRadius: 17}}
                onValueChange={this.handleToggleSwitch}
                value={this.state.switchValue}
          />
          <TouchableOpacity  onPress={this.displaySearch}> 
          <Image
              style={{width:63,
                      height:63,
                      alignSelf:'center',
                      marginTop:11
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
    backgroundColor: '#1fbbdd',
    width: '100%',
    borderTopWidth: 1,
    borderColor: 'black'
  }
}); 





