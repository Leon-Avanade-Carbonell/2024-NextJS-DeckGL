'use client'
import { Feature, Geometry } from 'geojson'
import BaseMap from '@/components/map/basemap'
import { GeoJsonLayer } from 'deck.gl'
import { Neighborhood } from '@/db/nyc_neighborhoods'

interface NYCMapProps {
  neighborhoods: Neighborhood[]
}

type PropertiesType = {
  name: string
}

export default function NYC_Map({ neighborhoods }: NYCMapProps) {
  const geoData = neighborhoods.map((entry) => JSON.parse(entry.geojson))

  console.table(geoData)

  const layer = new GeoJsonLayer({
    id: 'GeoJsonLayer',
    data: geoData,

    stroked: true,
    filled: true,
    pointType: 'circle+text',
    pickable: true,

    getFillColor: [160, 160, 180, 200],

    getText: (f: Feature<Geometry, PropertiesType>) => f.properties.name,
    getLineWidth: 20,
    getPointRadius: 4,
    getTextSize: 12,
  })

  return <BaseMap layers={[layer]} latitude={40.73061} longitude={-73.935242} />
}
