import React from 'react';
import WeekForcastItem from './weekForcastItem';
import {View} from 'react-native'

export default class WeekForcastList extends React.Component {
        render(){
            
             if(this.props.weeksForcast){
                 let splicedForcast = this.props.weeksForcast.splice(1,4)
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
                                <WeekForcastItem 
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
