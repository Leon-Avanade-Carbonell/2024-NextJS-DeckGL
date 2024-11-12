import pg from 'pg'
const { Pool } = pg

let pgPool: pg.Pool | undefined = undefined

if (!pgPool) {
  pgPool = new Pool({
    connectionString: 'postgresql://leon:leon@localhost:5432/nyc',
  })
}
export default pgPool as pg.Pool
