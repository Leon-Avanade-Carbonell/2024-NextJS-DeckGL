import pgPool from '@/lib/pg'

export type Neighborhood = {
  name: string
  //   boroname: string
  geojson: string
}

export async function getAllNeighborhood(neighborhood?: string) {
  try {
    const query = `
            SELECT name, 
            json_build_object('type', 'Polygon', 'geometry', ST_AsGeoJSON(ST_Transform(geom, 4326))::json)::text as geoJSON 
            FROM nyc_neighborhoods 
            ${!!neighborhood ? `WHERE boroname='${neighborhood}'` : ''};
        `
    const { rows } = await pgPool.query(query)

    return rows as Neighborhood[]
  } catch (error) {
    console.table(error)
    throw new Error('Failed to get neighborhoods')
  }
}

export async function getAllBoronames() {
  try {
    const query = `SELECT DISTINCT boroname FROM nyc_neighborhoods;`
    const { rows } = await pgPool.query(query)

    return rows as string[]
  } catch (error) {
    console.table(error)
    throw new Error('Failed to get neighborhoods')
  }
}
