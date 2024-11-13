'use client'

import { CrimeData } from '@/db/nyc_neighborhoods'
import { GeoJsonLayer } from 'deck.gl'
import { Feature, Geometry } from 'geojson'

type CrimePropertyType = {
  id: number
  name: string
  count: number
}

export function useCrimeLayer(crimeData: CrimeData[]) {
  const geoData = crimeData.map((entry) => JSON.parse(entry.geojson))
  const layer = new GeoJsonLayer({
    id: 'CrimeLayer',
    data: geoData,

    stroked: true,
    filled: true,
    pointType: 'circle+text',
    pickable: true,

    getFillColor: (f: Feature<Geometry, CrimePropertyType>) => [
      200,
      160,
      180,
      f.properties.count,
    ],

    getText: (f: Feature<Geometry, CrimePropertyType>) => f.properties.name,
    getLineWidth: 20,
    getPointRadius: 4,
    getTextSize: 12,
  })
  return { layer }
}
