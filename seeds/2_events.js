const SequentialUUID = require('sequential-uuid')
const uuid = new SequentialUUID()

function randomCoords () {
  return {
    lat: +((Math.random() * (52 - 51.5) + 51.5).toFixed(8)),
    long: +((Math.random() * (19.7 - 19) + 19).toFixed(8))
  }
}

exports.seed = function (knex) {
  const urls = [
    'https://hiddenurl.com/users/5eb078ee-bd04-d85d-02d5-d78c6e2df5d2/pictures/e24e1e1e-9b49-41e9-a0ef-2028ae4e74ff.jpeg',
    'https://hiddenurl.com/users/5eb078ee-bd04-d85d-02d5-d78c6e2df5d2/pictures/e24e1e1e-9b49-41e9-a0ef-2028ae4e74ff.jpeg,',
    'https://hiddenurl.com/users/5eb078ee-bd04-d85d-02d5-d78c6e2df5d2/pictures/e24e1e1e-9b49-41e9-a0ef-2028ae4e74ff.jpeg'
  ]

  const parties = []
  const moderators = []
  const participants = []
  const tags = []
  const nowTs = +new Date()
  const months3 = 1000 * 60 * 60 * 24 * 31

  for (let i = 0; i < 20000; i++) {
    const loc = randomCoords()
    const age = Math.floor(Math.random() * 30) + 18
    parties.push({
      uuid: uuid.generate(),
      title: 'Testfest #' + (i + 1),
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      photo_url: urls[Math.floor(Math.random() * 2) + 0],
      visibility: Math.floor(Math.random() * 3) + 1,
      require_confirmation: Math.round(Math.random()),
      type: Math.floor(Math.random() * 4) + 1,
      owner_id: Math.floor(Math.random() * 20000) + 1,
      date: (Math.random() > 0.5) ? new Date(nowTs + Math.floor(Math.random() * months3) + 1) : new Date(nowTs - Math.floor(Math.random() * months3) + 1),
      location: knex.raw('ll_to_earth(?, ?)', [loc.lat, loc.long]),
      age_restriction: `[${age}, ${age + 15}]`
    })

    moderators.push({
      users_id: Math.floor(Math.random() * 20000) + 1,
      events_id: i + 1
    })

    const participantsSet = new Set()
    for (let o = 0; o < 25; o++) {
      participantsSet.add(Math.floor(Math.random() * 20000) + 1)
    }

    participants.push(...Array.from(participantsSet).map(v => {
      return {
        users_id: v,
        events_id: i + 1
      }
    }))

    tags.push({
      events_tags_id: Math.floor(Math.random() * 4) + 1,
      events_id: i + 1
    })
  }

  return knex.raw('TRUNCATE TABLE events_participants CASCADE').then(() => {
    return knex.raw('TRUNCATE TABLE events CASCADE').then(() => {
      return knex.batchInsert('events', parties, 2000).then(() => {
        return knex.batchInsert('events_participants', participants, 2000)
      })
    })
  })
}
