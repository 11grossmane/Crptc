const admin = require('firebase-admin')
// serviceAccountKey.json can be generated in Firebase Console.
const serviceAccountKey = require('/Users/Eric/Downloads/crptc-sac.json')

const faker = require('faker')
// GOOGLE_APPLICATION_CREDENTIALS = '/Users/Eric/Downloads/crptc-sac.json'
const adminApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
  databaseURL: 'https://crptc-b8ee4.firebaseio.com',
  storageBucket: 'crptc-b8ee4.appspot.com',
})
const db = adminApp.firestore()
// Import seeds.

const comments = []
const names = []
async function seed() {
  let userIds = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => `${num}yolo`)
  for (let i = 0; i < 10; i++) {
    let fakerEmail = faker.internet.email()
    let fakerName = `${fakerEmail.split('@')[0]}-${faker.lorem.word()}`
    names.push(fakerName.toLowerCase())
    let word = faker.lorem.word()
    let sentence = faker.lorem.sentence()
    let random = Math.floor(Math.random() * 10)
    try {
      await db
        .collection('users')
        .doc(fakerName.toLowerCase())
        .set(
          {
            name: fakerName.toLowerCase(),
            password: 'yolo123',
            email: fakerEmail.toLowerCase(),
            friendIds: names,
          },
          { merge: true }
        )
      for (let j = 0; j < 10; j++) {
        await db
          .collection('words')
          .doc(word)
          .set(
            {
              value: word,
              timestamp: faker.date.past(),
              image: faker.image.abstract(),
              userId: names[Math.floor(Math.random() * names.length)],
            },
            { merge: true }
          )

        await db
          .collection('comments')
          .doc(sentence)
          .set(
            {
              value: sentence,
              likes: Math.floor(Math.random() * 20 + 1),
              timestamp: faker.date.past(),
              userId: fakerName.toLowerCase(),
              wordId: word,
            },
            { merge: true }
          )
      }
    } catch (err) {
      console.error(err)
    }
  }
}
seed()
