import { EntityManager } from '@mikro-orm/core'
import * as Faker from 'faker'
import { User } from '../entities/User'

export async function seedDatabase(em: EntityManager) {
  return async function seedUsers() {
    for (let index = 0; index < 20; index++) {
      let user = em.create(User, {
        email: Faker.fake('{{internet.exampleEmail}}'),
        username: Faker.fake('{{internet.userName}}'),
        password: Faker.fake('{{internet.password}}'),
      })
      await em.persistAndFlush(user)
    }
  }
}
//   async function seedCategories() {
//     for (let index = 0; index < 20; index++) {
//       let category = em.create(Category, {
//         name: Faker.fake("{{commerce.productName}}")
//       })
//       await em.persistAndFlush(category)
//     }
//   }

//   async function seedPosts() {
//     for (let index = 0; index < 100; index++) {
//       const post1 = em.create(Post, {
//         title: Faker.fake("{{commerce.department}}"),
//         author: em.getReference(User, Math.floor(Math.random() * 100 + 1)),
//         category: em.getReference(
//           Category,
//           Math.floor(Math.random() * 20 + 1)
//         )
//       })
//       await em.persistAndFlush(post1)
//     }
//   }
// }
