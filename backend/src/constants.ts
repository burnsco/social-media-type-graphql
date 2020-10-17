export const __prod__ = process.env.NODE_ENV === "production"
export const COOKIE_NAME = "reddit"

export const invalidPostOrId = {
  errors: [
    { field: "postId", message: "postId invalid or post does not exist." }
  ]
}

export const subRedditNameInUse = {
  errors: [{ field: "name", message: "Subreddit name already in use." }]
}

export const userNotFound = {
  errors: [{ field: "email", message: "Not Found." }]
}
