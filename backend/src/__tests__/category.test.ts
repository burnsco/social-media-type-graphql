import faker from "faker"
import { gCall } from "../testing/gCall"
import { testConnection } from "../testing/testConn"
import { Category } from "./../entities/Category"

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
  it("User can create a category", async () => {
    const orm = await testConnection()
    const category = {
      name: faker.fake("{{internet.userName}}")
    }
    const response = await gCall({
      source: createCategoryMutation,
      userId: "1",
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
