import * as React from 'react'
import { GoogleMap, useLoadScript, Marker, Data} from '@react-google-maps/api'

const GoogleMaps = () => {

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyD43LpIkXOzbKNGU6LjVdYI2CNR4n4hTiw'
  })

  return (
    isLoaded ? 
      <GoogleMap
        id="circle-example"
        mapContainerStyle={{
          height: 400,
          width: '100%'
        }}
        zoom={12}
        center={{
          lat: 37.558750,
          lng: 126.991980
        }}
      >
        <Data
          options={{
            controls: ["Point"],
            drawingMode: "Point",
            featureFactory: geometry => {
              console.log("geometry: ", geometry);
            },
            clickable: true,
            draggable: true,
          }}
        />
        <Marker
          label='숙소1'
          position={{
            lat: 37.558750,
            lng: 126.991980
          }}
        />
      </GoogleMap>
    : loadError ? <div>Loading</div>
    : <div>Error</div>
  )
}

export default GoogleMaps