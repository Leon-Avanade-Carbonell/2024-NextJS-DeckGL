'use client'

import DeckGL from '@deck.gl/react'
import { MapViewState } from '@deck.gl/core'
import { FOOTER_HEIGHT, HEADER_HEIGHT } from '@/helpers/constants'

// typescript
import { BitmapLayer, TileLayer, type Layer } from 'deck.gl'

type BaseMapProps = {
  height?: string
  width?: string
  layers?: Layer[]
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
    layers = [] as Layer[],
  } = props
  //   const defaultHeight = `calc(100vh - ${HEADER_HEIGHT} - ${FOOTER_HEIGHT})` // tailwind does not handle JS variables

  const layer = new TileLayer({
    id: 'TileLayer',
    data: 'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png',
    maxZoom: 19,
    minZoom: 0,

    renderSubLayers: (props) => {
      const { boundingBox } = props.tile

      return new BitmapLayer(props, {
        data: undefined,
        image: props.data,
        bounds: [
          boundingBox[0][0],
          boundingBox[0][1],
          boundingBox[1][0],
          boundingBox[1][1],
        ],
      })
    },
    pickable: true,
  })
  const deckLayers: Layer[] = [layer, ...layers]

  return (
    <div
      className="relative bg-slate-300"
      style={{ height: height, width: width }}
    >
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller
        layers={deckLayers}
        style={{ height: height, width: width, position: 'absolute' }}
      />
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
