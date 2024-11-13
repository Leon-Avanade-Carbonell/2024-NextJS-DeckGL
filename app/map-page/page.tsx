import { getAllNeighborhood, getCrimeData } from '@/db/nyc_neighborhoods'
import NYC_Map from './_components/nyc-map'

export default async function MapPage() {
  const data = await getAllNeighborhood('Manhattan')
  const crimeData = await getCrimeData()

  return (
    <>
      <NYC_Map neighborhoods={data} crimeData={crimeData} />
    </>
  )
}
