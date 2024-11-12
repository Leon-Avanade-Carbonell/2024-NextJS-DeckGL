'use client'

import DeckGL from '@deck.gl/react'
import { MapViewState } from '@deck.gl/core'
import { FOOTER_HEIGHT, HEADER_HEIGHT } from '@/helpers/constants'
import { Map } from 'react-map-gl/maplibre'
import 'maplibre-gl/dist/maplibre-gl.css'

// typescript
import { type Layer } from 'deck.gl'

type BaseMapProps = {
  height?: string
  width?: string
  layers?: Layer[]
  longitude?: number
  latitude?: number
  zoom?: number
}

const INITIAL_VIEW_STATE: MapViewState = {
  longitude: -122.41669,
  latitude: 37.7853,
  zoom: 13,
}

function MapComponent(props: BaseMapProps) {
  const {
    height = `calc(100vh - ${HEADER_HEIGHT} - ${FOOTER_HEIGHT})`,
    width = '100vw',
    longitude = -122.41669,
    latitude = 37.7853,
    zoom = 13,
    layers = [] as Layer[],
  } = props
  const deckLayers: Layer[] = [...layers]

  return (
    <div
      className="relative m-0 bg-slate-300 p-0"
      style={{ height: height, width: width }}
    >
      <DeckGL
        initialViewState={{ longitude, latitude, zoom } as MapViewState}
        controller
        layers={deckLayers}
        style={{ height: height, width: width }}
      >
        <Map
          initialViewState={INITIAL_VIEW_STATE}
          mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
          // mapStyle="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
          style={{ position: 'fixed', width: width, height: height }}
        />
      </DeckGL>
    </div>
  )
}

export default function BaseMap(props: BaseMapProps) {
  return (
    <>
      <div>
        <MapComponent {...props} />
      </div>
    </>
  )
}
