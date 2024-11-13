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

export type CrimeData = {
  neighborhood: string
  boroname: string
  victim_count: string
  geojson: string
}

export async function getCrimeData(neighborhood?: string) {
  try {
    const query = `
      SELECT 
        hoods.name AS neighborhood, 
        hoods.boroname AS boroname, 
        COUNT(victims.num_victim) as victim_count, 
        json_build_object(
          'type', 'Polygon', 
          'properties', json_build_object(
            'id', hoods.gid,
            'name', hoods.name,
            'count', COUNT(victims.num_victim)
          ),
          'geometry', ST_AsGeoJSON(ST_Transform(hoods.geom, 4326))::json
        )::text AS geojson 
      FROM nyc_homicides as victims
      JOIN nyc_neighborhoods as hoods
      ON ST_Within(victims.geom, hoods.geom)
      ${!!neighborhood ? `WHERE boroname='${neighborhood}'` : ''}
      GROUP BY hoods.name, hoods.geom, hoods.boroname, hoods.gid
      ORDER BY COUNT(victims.num_victim) ASC
    `
    const { rows } = await pgPool.query(query)

    return rows as CrimeData[]
  } catch (error) {
    console.table(error)
    throw new Error('Failed to get crimes')
  }
}
