import { getAllNeighborhood } from '@/db/nyc_neighborhoods'
import NYC_Map from './_components/nyc-map'

export default async function MapPage() {
  const data = await getAllNeighborhood('Manhattan')

  return (
    <>
      <NYC_Map neighborhoods={data} />
    </>
  )
}
