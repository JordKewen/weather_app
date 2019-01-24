import React from 'react';
import WeekForcastItemF from './weekForcastItemF';
import {View} from 'react-native'

export default class WeekForcastListF extends React.Component {
        render(){
            //debugger
             if(this.props.weeksForcast){
                 let splicedForcast = this.props.weeksForcast.splice(1,4)
                 //debugger
             return(                               
                <View>                    
                {     splicedForcast.map((ele, i)=>{                    
                        let day = ele.date;
                        let icon = ele.icon;
                        let tempMax = ele.max*1.8+32;
                        let tempMin = ele.min*1.8+32;
                        //debugger
                        return(
                            <View key={i}>
                                <WeekForcastItemF 
                                    day={day}
                                    icon={icon}
                                    max={tempMax}
                                    min={tempMin}
                                />
                            </View>
                        )
                    })
                }
                        </View>   
                    )

        
    }else return null


    }
}
