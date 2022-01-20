import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import './Map.css'

mapboxgl.accessToken =
  "pk.eyJ1IjoicHN5a2VtYW4iLCJhIjoiY2t5aTZ1MGFiMXZvZDJ1dXJnbmIzaTl4aSJ9.aJLH3v8je--S5NhgGGiZMg";

  const Map = (props) => {
      const map = useRef(null);
      const mapContainer = useRef(null)
    //  const { center, zoom } = props;
      useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-70.9, 42.35],
        zoom: 16
        });
        });
      return (
          <div>
              ref={mapContainer}
              className={`map ${props.className}`}
              style={props.style}
          </div>
      )
  }

  export default Map;