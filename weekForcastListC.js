import React from 'react';
import WeekForcastItemC from './weekForcastItemC';
import {View} from 'react-native'

export default class WeekForcastListC extends React.Component {
        render(){
            //debugger
             if(this.props.weeksForcast){
                 let splicedForcast = this.props.weeksForcast.slice(1,4)
             return(                               
                <View>                    
                {
                    splicedForcast.map((ele, i)=>{
                        
                
                        let day = ele.date;
                        let icon = ele.icon;
                        let tempMax = ele.max;
                        let tempMin = ele.min;
                        
                        return(
                            <View key={i}>
                                <WeekForcastItemC 
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
