import faker from "faker"
import { gCall } from "../utils/gCall"
import { testConnection } from "../utils/testConn"
import { Category } from "./../entities/index"

const createCategoryMutation = `
mutation CreateCategory($data: CategoryInput! ) {
  createCategory(data: $data) {
    category {
      name
    }
    errors {
      field
      message
    }
  }
}
`

describe("Category", () => {
  it("User can create a category and is found in DB.", async () => {
    const orm = await testConnection()
    const category = {
      name: faker.fake("{{lorem.word}}")
    }
    const response = await gCall({
      source: createCategoryMutation,
      userId: "7dd263db-895a-42ee-bb67-4454b67180c9",
      variableValues: {
        data: {
          name: category.name
        }
      }
    })
    expect(response).toMatchObject({
      data: {
        createCategory: {
          category: {
            name: category.name
          }
        }
      }
    })

    const dbCategory = orm.em.findOne(Category, { name: category.name })
    expect(dbCategory).toBeDefined()
  })
})
