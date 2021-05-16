const faker = require('faker')

/**
 * Generates a random number
 * @param max
 * @returns {number}
 */
const getRandomInt = max => Math.floor(Math.random() * Math.floor(max))
const contentGenerators = [
  faker.lorem.paragraph,
  faker.lorem.paragraphs,
  faker.lorem.sentence,
  faker.lorem.sentences
]

/**
 * Generetes the fake data
 * @returns {{posts: this, users: this}}
 */
module.exports = () => {
  const users = []
  const userIds = []
  for (let i = 0; i < 5000; i++) {
    const id = faker.random.number()
    if (userIds.indexOf(id) > -1) continue
    const user = {
      avatar: faker.internet.avatar(),
      email: faker.internet.email(),
      firstName: faker.name.firstName(),
      id,
      lastName: faker.name.lastName()
    }
    users.push(user)
    userIds.push(id)
  }
  const posts = []
  const postIds = []
  for (let j = 0; j < 10000; j++) {
    const totalComments = getRandomInt(5)
    const id = faker.random.number()
    if (postIds.indexOf(id) > -1) continue
    const post = {
      content: contentGenerators[getRandomInt(4)](),
      id,
      title: faker.lorem.sentence()
    }
    const comments = []
    for (let k = 0; k < totalComments; k++) {
      const comment = {
        userId: userIds[getRandomInt(userIds.length)],
        content: contentGenerators[getRandomInt(4)]()
      }
      comments.push(comment)
    }
    post['comments'] = comments
    posts.push(post)
    postIds.push(id)
  }
  return {
    posts: posts.sort((a, b) => a.id - b.id),
    users: users.sort((a, b) => a.id - b.id)
  }
}
