import { EntityManager } from "@mikro-orm/core"
import { Category, Post, User, Vote } from "../entities"

export async function seedDatabase(em: EntityManager) {
  const defaultUser = em.create(User, {
    email: "test@github.com",
    username: "testUser",
    password: "test123"
  })
  em.persist(defaultUser)

  const category = em.create(Category, {
    name: "react"
  })
  const post1 = em.create(Post, {
    title: "First Post on React",
    author: em.getReference(User, defaultUser.id),
    category: em.getReference(Category, category.id)
  })

  post1.votes.add(
    em.create(Vote, { value: 1, user: defaultUser }),
    em.create(Vote, { value: 1, user: defaultUser }),
    em.create(Vote, { value: -1, user: defaultUser }),
    em.create(Vote, { value: -1, user: defaultUser }),
    em.create(Vote, { value: 1, user: defaultUser })
  )
  em.persist(post1)

  await em.flush()
  return { defaultUser }
}
