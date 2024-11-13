'use client'
import BaseMap from '@/components/map/basemap'
import { CrimeData, Neighborhood } from '@/db/nyc_neighborhoods'
import { useCrimeLayer } from './useCrimeLayer'

interface NYCMapProps {
  neighborhoods: Neighborhood[]
  crimeData: CrimeData[]
}

export default function NYC_Map({ crimeData }: NYCMapProps) {
  const { layer: crimeLayer } = useCrimeLayer(crimeData)

  return (
    <BaseMap
      layers={[crimeLayer]}
      latitude={40.73061}
      longitude={-73.935242}
      zoom={10}
    />
  )
}
