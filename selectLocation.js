import React from 'react';
import { View, Image, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// import api_key from './config.js'

export default class GooglePlacesInput extends React.Component {

  state={
        city:''
  }

  

render () {


//  const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
//  const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};
    return (
    <GooglePlacesAutocomplete
      placeholder='Choose your place'
      minLength={2} // minimum length of text to search
      autoFocus={false}
      returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
      listViewDisplayed='auto'    // true/false/undefined
      fetchDetails={true}
      renderDescription={row => row.description} // custom description render
      onPress={(data, details = null) => {
        //this.props.getLatLong(details.geometry.location.lat,details.geometry.location.lng) // 'details' is provided when fetchDetails = true
        this.setState({city:data},()=>{
          this.props.getSearchLocation(data)
        })
           this.props.hideSearch()
      }}
      
      getDefaultValue={() => ''}
      
      query={{
        // available options: https://developers.google.com/places/web-service/autocomplete
        // key: api_key.api_google_maps,
        key:'AIzaSyAJJBgVgFCOGYxPPZW4NkvfZVnKU6vDkH4',
        language: 'en', // language of the results
        types: '(cities)' // default: 'geocode'
      }}
      
      styles={{
        textInputContainer: {
          width: '100%',
          backgroundColor: 'black'
        },
        description: {
          fontWeight: 'bold',
        }
      }}
      
      //currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
      //currentLocationLabel="Current location"
      //nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
      GoogleReverseGeocodingQuery={{
        // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
      }}
      GooglePlacesSearchQuery={{
        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
        rankby: 'distance',
        types: 'food'
      }}
 
      filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
      // predefinedPlaces={[homePlace, workPlace]}
 
      debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
      // renderLeftButton={()  => <Text>L</Text>}
      // // renderLeftButton={()  => <Image source={require('path/custom/left-icon')} />}
      // renderRightButton={() => <Text>R</Text>}
    />
    )
}
}