const knex = require('knex')(require('./knexfile'))

function createQuery () {
  // Simulate variables obtained from other sources in original project
  const startDate = new Date(+new Date() - 2 * 60 * 60 * 1000)
  const ownersIds = [5056, 19495, 6748, 380, 2014, 12624, 4830, 9487, 10434, 7422, 12144, 5220, 10142, 12480, 17521, 14422, 1412, 17132, 14879, 999, 312, 2341, 19713, 16166, 1409, 16217, 8920, 14487, 17455, 1201, 12807, 7416, 5340, 10637, 1745, 1386, 19192, 13178, 4977, 11769, 19946, 2713, 10200, 11909, 13519, 9588, 4528, 19737, 2685, 8429, 7222, 2017, 18114, 13685, 4062, 19409, 18218, 15987, 10496, 3499, 8071, 1516, 14590, 9495, 5458, 6041, 8992, 17768, 15929, 3540, 1685, 7839, 11095, 15432, 8786, 9107, 819, 9250, 5822, 4094, 619, 15520, 2419, 17051, 1208, 12966, 12447, 8591, 6786, 12725]
  const userData = {
    coords: '(3733027.200898386, 1309786.8685408758, 5002998.4321979005)',
    age: 37
  }
  const dist = 49000

  // Create knex query
  return knex('events as e')
    .select('e.id', 'e.uuid', 'e.title', 'e.description', 'e.photo_url as photoUrl', 'e.visibility', 'e.require_confirmation as requireConfirmation', 'e.type', 'e.date', knex.raw('count(p.*)::int as participants'), knex.raw('round((earth_distance(?, e.location) / 1000)::numeric, 1) as distance', [userData.coords]))
    .leftJoin('events_participants as p', 'p.events_id', 'e.id')
    .groupBy('e.id')
    .orderBy('e.date', 'asc')
    .whereRaw('e.date > ?', [startDate])
    .andWhereRaw('?::int <@ e.age_restriction', userData.age)
    .andWhereRaw('earth_box(?, ?) @> e.location', [userData.coords, dist])
    .andWhereRaw('earth_distance(?, e.location) <= ?', [userData.coords, dist])
    .andWhereRaw('owner_id NOT IN (??)', [ownersIds])
}

async function start () {
  try {
    const s1 = +new Date()
    const query1 = createQuery()
    const sql = query1.toString()
    // Run query knex which executes in reasonable time
    await knex.raw(sql)
    console.log(`Method #1 executed in: ${(+new Date() - s1)}ms`)

    const s2 = +new Date()
    const query2 = createQuery()
    // Run knex query in a normal way
    await query2
    console.log(`Method #2 executed in: ${(+new Date() - s2)}ms`)
    process.exit()
  } catch (e) {
    console.error(e)
  }
}

start()
