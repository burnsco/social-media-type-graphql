import { gql } from "@apollo/client"
import * as Apollo from "@apollo/client"
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type Query = {
  __typename?: "Query"
  categories: Array<Category>
  comment?: Maybe<Comment>
  comments?: Maybe<Array<Comment>>
  _allPostsMeta: _QueryMeta
  _categoryPostsMeta: _QueryMeta
  post?: Maybe<Post>
  posts?: Maybe<Array<Post>>
  postsByCategory?: Maybe<Array<Post>>
  me?: Maybe<User>
  isUsernameTaken: Scalars["Boolean"]
  user: User
  users: Array<User>
}

export type QueryCommentArgs = {
  first?: Maybe<Scalars["Int"]>
  postId?: Maybe<Scalars["ID"]>
  orderBy?: Maybe<PostOrderBy>
  category?: Maybe<Scalars["String"]>
  skip?: Maybe<Scalars["Int"]>
  name?: Maybe<Scalars["String"]>
}

export type QueryCommentsArgs = {
  first?: Maybe<Scalars["Int"]>
  postId?: Maybe<Scalars["ID"]>
  orderBy?: Maybe<PostOrderBy>
  category?: Maybe<Scalars["String"]>
  skip?: Maybe<Scalars["Int"]>
  name?: Maybe<Scalars["String"]>
}

export type Query_CategoryPostsMetaArgs = {
  first?: Maybe<Scalars["Int"]>
  postId?: Maybe<Scalars["ID"]>
  orderBy?: Maybe<PostOrderBy>
  category?: Maybe<Scalars["String"]>
  skip?: Maybe<Scalars["Int"]>
  name?: Maybe<Scalars["String"]>
}

export type QueryPostArgs = {
  first?: Maybe<Scalars["Int"]>
  postId?: Maybe<Scalars["ID"]>
  orderBy?: Maybe<PostOrderBy>
  category?: Maybe<Scalars["String"]>
  skip?: Maybe<Scalars["Int"]>
  name?: Maybe<Scalars["String"]>
}

export type QueryPostsArgs = {
  first?: Maybe<Scalars["Int"]>
  postId?: Maybe<Scalars["ID"]>
  orderBy?: Maybe<PostOrderBy>
  category?: Maybe<Scalars["String"]>
  skip?: Maybe<Scalars["Int"]>
  name?: Maybe<Scalars["String"]>
}

export type QueryPostsByCategoryArgs = {
  first?: Maybe<Scalars["Int"]>
  postId?: Maybe<Scalars["ID"]>
  orderBy?: Maybe<PostOrderBy>
  category?: Maybe<Scalars["String"]>
  skip?: Maybe<Scalars["Int"]>
  name?: Maybe<Scalars["String"]>
}

export type QueryIsUsernameTakenArgs = {
  data: CheckUsernameInput
}

export type QueryUserArgs = {
  userId: PostInput
}

export type Category = {
  __typename?: "Category"
  id: Scalars["ID"]
  createdAt: Scalars["String"]
  updatedAt: Scalars["String"]
  name: Scalars["String"]
}

export type Comment = {
  __typename?: "Comment"
  id: Scalars["ID"]
  createdAt: Scalars["String"]
  updatedAt: Scalars["String"]
  body: Scalars["String"]
  createdBy: User
  post: Post
}

export type User = {
  __typename?: "User"
  id: Scalars["ID"]
  createdAt: Scalars["String"]
  updatedAt: Scalars["String"]
  email: Scalars["String"]
  username: Scalars["String"]
  avatar?: Maybe<Scalars["String"]>
  about?: Maybe<Scalars["String"]>
}

export type Post = {
  __typename?: "Post"
  id: Scalars["ID"]
  createdAt: Scalars["String"]
  updatedAt: Scalars["String"]
  title: Scalars["String"]
  text?: Maybe<Scalars["String"]>
  link?: Maybe<Scalars["String"]>
  image?: Maybe<Scalars["String"]>
  video?: Maybe<Scalars["String"]>
  author: User
  category: Category
  votes?: Maybe<Array<Vote>>
  comments?: Maybe<Array<Comment>>
  totalComments?: Maybe<_QueryMeta>
  totalVotes?: Maybe<_QueryMeta>
}

export type Vote = {
  __typename?: "Vote"
  id: Scalars["ID"]
  createdAt: Scalars["String"]
  updatedAt: Scalars["String"]
  value: Scalars["Int"]
  castBy: User
}

export type _QueryMeta = {
  __typename?: "_QueryMeta"
  count?: Maybe<Scalars["Int"]>
  score?: Maybe<Scalars["Int"]>
}

export type PostOrderBy = {
  createdAt?: Maybe<OrderBy>
  title?: Maybe<OrderBy>
  updatedAt?: Maybe<OrderBy>
  votes?: Maybe<OrderBy>
}

export enum OrderBy {
  Asc = "ASC",
  Desc = "DESC"
}

export type CheckUsernameInput = {
  username: Scalars["String"]
}

export type PostInput = {
  categoryId: Scalars["ID"]
  userId: Scalars["ID"]
  title: Scalars["String"]
  text?: Maybe<Scalars["String"]>
  image?: Maybe<Scalars["String"]>
  video?: Maybe<Scalars["String"]>
  link?: Maybe<Scalars["String"]>
}

export type Mutation = {
  __typename?: "Mutation"
  createCategory: CategoryMutationResponse
  editComment: CommentMutationResponse
  deleteComment: CommentMutationResponse
  createPost: PostMutationResponse
  createComment: CommentMutationResponse
  vote: VoteMutationResponse
  register: UserMutationResponse
  editUser: UserMutationResponse
  login: UserMutationResponse
  logout: LogoutMutationResponse
}

export type MutationCreateCategoryArgs = {
  data: CategoryInput
}

export type MutationEditCommentArgs = {
  data: CommentInput
}

export type MutationDeleteCommentArgs = {
  data: CommentInput
}

export type MutationCreatePostArgs = {
  data: PostInput
}

export type MutationCreateCommentArgs = {
  data: CommentInput
}

export type MutationVoteArgs = {
  data: VoteInput
}

export type MutationRegisterArgs = {
  data: RegisterInput
}

export type MutationEditUserArgs = {
  data: EditUserInput
}

export type MutationLoginArgs = {
  data: LoginInput
}

export type CategoryMutationResponse = {
  __typename?: "CategoryMutationResponse"
  errors?: Maybe<Array<FieldError>>
  category?: Maybe<Category>
}

export type FieldError = {
  __typename?: "FieldError"
  field: Scalars["String"]
  message: Scalars["String"]
}

export type CategoryInput = {
  name: Scalars["String"]
}

export type CommentMutationResponse = {
  __typename?: "CommentMutationResponse"
  errors?: Maybe<Array<FieldError>>
  comment?: Maybe<Comment>
  post?: Maybe<Post>
}

export type CommentInput = {
  body: Scalars["String"]
  postId: Scalars["ID"]
}

export type PostMutationResponse = {
  __typename?: "PostMutationResponse"
  errors?: Maybe<Array<FieldError>>
  post?: Maybe<Post>
}

export type VoteMutationResponse = {
  __typename?: "VoteMutationResponse"
  errors?: Maybe<Array<FieldError>>
  vote?: Maybe<Vote>
  post?: Maybe<Post>
}

export type VoteInput = {
  postId: Scalars["ID"]
  value: Scalars["Int"]
}

export type UserMutationResponse = {
  __typename?: "UserMutationResponse"
  errors?: Maybe<Array<FieldError>>
  user?: Maybe<User>
}

export type RegisterInput = {
  email: Scalars["String"]
  username: Scalars["String"]
  password: Scalars["String"]
  avatar?: Maybe<Scalars["String"]>
  about?: Maybe<Scalars["String"]>
}

export type EditUserInput = {
  email?: Maybe<Scalars["String"]>
  username?: Maybe<Scalars["String"]>
  password?: Maybe<Scalars["String"]>
  avatar?: Maybe<Scalars["String"]>
  about?: Maybe<Scalars["String"]>
}

export type LoginInput = {
  email: Scalars["String"]
  password: Scalars["String"]
}

export type LogoutMutationResponse = {
  __typename?: "LogoutMutationResponse"
  message: Scalars["String"]
  success: Scalars["Boolean"]
}

export type CreateCommentMutationVariables = Exact<{
  data: CommentInput
}>

export type CreateCommentMutation = { __typename?: "Mutation" } & {
  createComment: { __typename?: "CommentMutationResponse" } & {
    comment?: Maybe<
      { __typename?: "Comment" } & Pick<Comment, "id" | "body"> & {
          createdBy: { __typename?: "User" } & Pick<User, "username">
          post: { __typename?: "Post" } & Pick<Post, "id">
        }
    >
    post?: Maybe<
      { __typename?: "Post" } & Pick<Post, "id" | "title"> & {
          totalComments?: Maybe<
            { __typename?: "_QueryMeta" } & Pick<_QueryMeta, "count">
          >
          totalVotes?: Maybe<
            { __typename?: "_QueryMeta" } & Pick<_QueryMeta, "count">
          >
          comments?: Maybe<
            Array<
              { __typename?: "Comment" } & Pick<Comment, "id"> & {
                  createdBy: { __typename?: "User" } & Pick<User, "username">
                }
            >
          >
        }
    >
  }
}

export type CreatePostMutationVariables = Exact<{
  data: PostInput
}>

export type CreatePostMutation = { __typename?: "Mutation" } & {
  createPost: { __typename?: "PostMutationResponse" } & {
    post?: Maybe<
      { __typename?: "Post" } & Pick<
        Post,
        | "id"
        | "createdAt"
        | "updatedAt"
        | "title"
        | "text"
        | "image"
        | "video"
        | "link"
      > & {
          comments?: Maybe<
            Array<
              { __typename?: "Comment" } & Pick<
                Comment,
                "id" | "createdAt" | "updatedAt" | "body"
              > & {
                  createdBy: { __typename?: "User" } & Pick<User, "username">
                }
            >
          >
          author: { __typename?: "User" } & Pick<User, "id" | "username">
          category: { __typename?: "Category" } & Pick<Category, "id" | "name">
          totalComments?: Maybe<
            { __typename?: "_QueryMeta" } & Pick<_QueryMeta, "count">
          >
          totalVotes?: Maybe<
            { __typename?: "_QueryMeta" } & Pick<_QueryMeta, "score" | "count">
          >
        }
    >
    errors?: Maybe<
      Array<
        { __typename?: "FieldError" } & Pick<FieldError, "field" | "message">
      >
    >
  }
}

export type CreateSubredditMutationVariables = Exact<{
  data: CategoryInput
}>

export type CreateSubredditMutation = { __typename?: "Mutation" } & {
  createCategory: { __typename?: "CategoryMutationResponse" } & {
    category?: Maybe<
      { __typename?: "Category" } & Pick<Category, "id" | "name">
    >
    errors?: Maybe<
      Array<
        { __typename?: "FieldError" } & Pick<FieldError, "field" | "message">
      >
    >
  }
}

export type CreateVoteMutationVariables = Exact<{
  data: VoteInput
}>

export type CreateVoteMutation = { __typename?: "Mutation" } & {
  vote: { __typename?: "VoteMutationResponse" } & {
    vote?: Maybe<{ __typename?: "Vote" } & Pick<Vote, "value" | "id">>
    post?: Maybe<
      { __typename?: "Post" } & Pick<Post, "id"> & {
          totalVotes?: Maybe<
            { __typename?: "_QueryMeta" } & Pick<_QueryMeta, "count" | "score">
          >
        }
    >
  }
}

export type EditUserMutationVariables = Exact<{
  data: EditUserInput
}>

export type EditUserMutation = { __typename?: "Mutation" } & {
  editUser: { __typename?: "UserMutationResponse" } & {
    user?: Maybe<
      { __typename?: "User" } & Pick<
        User,
        "id" | "username" | "about" | "email" | "avatar"
      >
    >
  }
}

export type LogoutMutationVariables = Exact<{ [key: string]: never }>

export type LogoutMutation = { __typename?: "Mutation" } & {
  logout: { __typename?: "LogoutMutationResponse" } & Pick<
    LogoutMutationResponse,
    "message" | "success"
  >
}

export type RegisterMutationVariables = Exact<{
  data: RegisterInput
}>

export type RegisterMutation = { __typename?: "Mutation" } & {
  register: { __typename?: "UserMutationResponse" } & {
    user?: Maybe<{ __typename?: "User" } & Pick<User, "id" | "username">>
    errors?: Maybe<
      Array<
        { __typename?: "FieldError" } & Pick<FieldError, "field" | "message">
      >
    >
  }
}

export type CategoriesQueryVariables = Exact<{ [key: string]: never }>

export type CategoriesQuery = { __typename?: "Query" } & {
  categories: Array<{ __typename?: "Category" } & Pick<Category, "id" | "name">>
}

export type CommentQueryVariables = Exact<{
  postId?: Maybe<Scalars["ID"]>
}>

export type CommentQuery = { __typename?: "Query" } & {
  comment?: Maybe<
    { __typename?: "Comment" } & Pick<
      Comment,
      "id" | "createdAt" | "updatedAt" | "body"
    > & { createdBy: { __typename?: "User" } & Pick<User, "username"> }
  >
}

export type CommentsQueryVariables = Exact<{
  first?: Maybe<Scalars["Int"]>
  orderBy?: Maybe<PostOrderBy>
  skip?: Maybe<Scalars["Int"]>
  postId?: Maybe<Scalars["ID"]>
}>

export type CommentsQuery = { __typename?: "Query" } & {
  comments?: Maybe<
    Array<
      { __typename?: "Comment" } & Pick<
        Comment,
        "id" | "createdAt" | "updatedAt" | "body"
      > & { createdBy: { __typename?: "User" } & Pick<User, "username"> }
    >
  >
}

export type IsUsernameTakenQueryVariables = Exact<{
  data: CheckUsernameInput
}>

export type IsUsernameTakenQuery = { __typename?: "Query" } & Pick<
  Query,
  "isUsernameTaken"
>

export type MeQueryVariables = Exact<{ [key: string]: never }>

export type MeQuery = { __typename?: "Query" } & {
  me?: Maybe<{ __typename?: "User" } & Pick<User, "id" | "username">>
}

export type PostQueryVariables = Exact<{
  postId?: Maybe<Scalars["ID"]>
}>

export type PostQuery = { __typename?: "Query" } & {
  post?: Maybe<
    { __typename?: "Post" } & Pick<
      Post,
      | "id"
      | "createdAt"
      | "updatedAt"
      | "title"
      | "text"
      | "image"
      | "video"
      | "link"
    > & {
        comments?: Maybe<
          Array<
            { __typename?: "Comment" } & Pick<
              Comment,
              "id" | "createdAt" | "updatedAt" | "body"
            > & { createdBy: { __typename?: "User" } & Pick<User, "username"> }
          >
        >
        author: { __typename?: "User" } & Pick<User, "id" | "username">
        category: { __typename?: "Category" } & Pick<Category, "id" | "name">
        totalComments?: Maybe<
          { __typename?: "_QueryMeta" } & Pick<_QueryMeta, "count">
        >
        totalVotes?: Maybe<
          { __typename?: "_QueryMeta" } & Pick<_QueryMeta, "score" | "count">
        >
      }
  >
}

export type PostsQueryVariables = Exact<{
  first?: Maybe<Scalars["Int"]>
  orderBy?: Maybe<PostOrderBy>
  skip?: Maybe<Scalars["Int"]>
  category?: Maybe<Scalars["String"]>
}>

export type PostsQuery = { __typename?: "Query" } & {
  posts?: Maybe<
    Array<
      { __typename?: "Post" } & Pick<
        Post,
        | "id"
        | "createdAt"
        | "updatedAt"
        | "title"
        | "text"
        | "image"
        | "video"
        | "link"
      > & {
          comments?: Maybe<
            Array<
              { __typename?: "Comment" } & Pick<
                Comment,
                "id" | "createdAt" | "updatedAt" | "body"
              > & {
                  createdBy: { __typename?: "User" } & Pick<User, "username">
                }
            >
          >
          category: { __typename?: "Category" } & Pick<Category, "id" | "name">
          author: { __typename?: "User" } & Pick<User, "id" | "username">
          totalComments?: Maybe<
            { __typename?: "_QueryMeta" } & Pick<_QueryMeta, "count">
          >
          totalVotes?: Maybe<
            { __typename?: "_QueryMeta" } & Pick<_QueryMeta, "score" | "count">
          >
        }
    >
  >
  _allPostsMeta: { __typename?: "_QueryMeta" } & Pick<_QueryMeta, "count">
  _categoryPostsMeta: { __typename?: "_QueryMeta" } & Pick<_QueryMeta, "count">
}

export type UsersQueryVariables = Exact<{ [key: string]: never }>

export type UsersQuery = { __typename?: "Query" } & {
  users: Array<{ __typename?: "User" } & Pick<User, "id" | "username">>
}

export const CreateCommentDocument = gql`
  mutation createComment($data: CommentInput!) {
    createComment(data: $data) {
      comment {
        id
        body
        createdBy {
          username
        }
        post {
          id
        }
      }
      post {
        id
        title
        totalComments {
          count
        }
        totalVotes {
          count
        }
        comments {
          id
          createdBy {
            username
          }
        }
      }
    }
  }
`
export type CreateCommentMutationFn = Apollo.MutationFunction<
  CreateCommentMutation,
  CreateCommentMutationVariables
>

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateCommentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateCommentMutation,
    CreateCommentMutationVariables
  >
) {
  return Apollo.useMutation<
    CreateCommentMutation,
    CreateCommentMutationVariables
  >(CreateCommentDocument, baseOptions)
}
export type CreateCommentMutationHookResult = ReturnType<
  typeof useCreateCommentMutation
>
export type CreateCommentMutationResult = Apollo.MutationResult<
  CreateCommentMutation
>
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<
  CreateCommentMutation,
  CreateCommentMutationVariables
>
export const CreatePostDocument = gql`
  mutation createPost($data: PostInput!) {
    createPost(data: $data) {
      post {
        id
        createdAt
        updatedAt
        title
        text
        image
        video
        link
        comments {
          id
          createdAt
          updatedAt
          body
          createdBy {
            username
          }
        }
        author {
          id
          username
        }
        category {
          id
          name
        }
        totalComments {
          count
        }
        totalVotes {
          score
          count
        }
      }
      errors {
        field
        message
      }
    }
  }
`
export type CreatePostMutationFn = Apollo.MutationFunction<
  CreatePostMutation,
  CreatePostMutationVariables
>

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreatePostMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreatePostMutation,
    CreatePostMutationVariables
  >
) {
  return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(
    CreatePostDocument,
    baseOptions
  )
}
export type CreatePostMutationHookResult = ReturnType<
  typeof useCreatePostMutation
>
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<
  CreatePostMutation,
  CreatePostMutationVariables
>
export const CreateSubredditDocument = gql`
  mutation createSubreddit($data: CategoryInput!) {
    createCategory(data: $data) {
      category {
        id
        name
      }
      errors {
        field
        message
      }
    }
  }
`
export type CreateSubredditMutationFn = Apollo.MutationFunction<
  CreateSubredditMutation,
  CreateSubredditMutationVariables
>

/**
 * __useCreateSubredditMutation__
 *
 * To run a mutation, you first call `useCreateSubredditMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSubredditMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSubredditMutation, { data, loading, error }] = useCreateSubredditMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateSubredditMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateSubredditMutation,
    CreateSubredditMutationVariables
  >
) {
  return Apollo.useMutation<
    CreateSubredditMutation,
    CreateSubredditMutationVariables
  >(CreateSubredditDocument, baseOptions)
}
export type CreateSubredditMutationHookResult = ReturnType<
  typeof useCreateSubredditMutation
>
export type CreateSubredditMutationResult = Apollo.MutationResult<
  CreateSubredditMutation
>
export type CreateSubredditMutationOptions = Apollo.BaseMutationOptions<
  CreateSubredditMutation,
  CreateSubredditMutationVariables
>
export const CreateVoteDocument = gql`
  mutation createVote($data: VoteInput!) {
    vote(data: $data) {
      vote {
        value
        id
      }
      post {
        id
        totalVotes {
          count
          score
        }
      }
    }
  }
`
export type CreateVoteMutationFn = Apollo.MutationFunction<
  CreateVoteMutation,
  CreateVoteMutationVariables
>

/**
 * __useCreateVoteMutation__
 *
 * To run a mutation, you first call `useCreateVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createVoteMutation, { data, loading, error }] = useCreateVoteMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateVoteMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateVoteMutation,
    CreateVoteMutationVariables
  >
) {
  return Apollo.useMutation<CreateVoteMutation, CreateVoteMutationVariables>(
    CreateVoteDocument,
    baseOptions
  )
}
export type CreateVoteMutationHookResult = ReturnType<
  typeof useCreateVoteMutation
>
export type CreateVoteMutationResult = Apollo.MutationResult<CreateVoteMutation>
export type CreateVoteMutationOptions = Apollo.BaseMutationOptions<
  CreateVoteMutation,
  CreateVoteMutationVariables
>
export const EditUserDocument = gql`
  mutation editUser($data: EditUserInput!) {
    editUser(data: $data) {
      user {
        id
        username
        about
        email
        avatar
      }
    }
  }
`
export type EditUserMutationFn = Apollo.MutationFunction<
  EditUserMutation,
  EditUserMutationVariables
>

/**
 * __useEditUserMutation__
 *
 * To run a mutation, you first call `useEditUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editUserMutation, { data, loading, error }] = useEditUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useEditUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    EditUserMutation,
    EditUserMutationVariables
  >
) {
  return Apollo.useMutation<EditUserMutation, EditUserMutationVariables>(
    EditUserDocument,
    baseOptions
  )
}
export type EditUserMutationHookResult = ReturnType<typeof useEditUserMutation>
export type EditUserMutationResult = Apollo.MutationResult<EditUserMutation>
export type EditUserMutationOptions = Apollo.BaseMutationOptions<
  EditUserMutation,
  EditUserMutationVariables
>
export const LogoutDocument = gql`
  mutation Logout {
    logout {
      message
      success
    }
  }
`
export type LogoutMutationFn = Apollo.MutationFunction<
  LogoutMutation,
  LogoutMutationVariables
>

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LogoutMutation,
    LogoutMutationVariables
  >
) {
  return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
    baseOptions
  )
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>
export type LogoutMutationOptions = Apollo.BaseMutationOptions<
  LogoutMutation,
  LogoutMutationVariables
>
export const RegisterDocument = gql`
  mutation Register($data: RegisterInput!) {
    register(data: $data) {
      user {
        id
        username
      }
      errors {
        field
        message
      }
    }
  }
`
export type RegisterMutationFn = Apollo.MutationFunction<
  RegisterMutation,
  RegisterMutationVariables
>

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRegisterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RegisterMutation,
    RegisterMutationVariables
  >
) {
  return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument,
    baseOptions
  )
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>
export const CategoriesDocument = gql`
  query Categories {
    categories {
      id
      name
    }
  }
`

/**
 * __useCategoriesQuery__
 *
 * To run a query within a React component, call `useCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCategoriesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    CategoriesQuery,
    CategoriesQueryVariables
  >
) {
  return Apollo.useQuery<CategoriesQuery, CategoriesQueryVariables>(
    CategoriesDocument,
    baseOptions
  )
}
export function useCategoriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CategoriesQuery,
    CategoriesQueryVariables
  >
) {
  return Apollo.useLazyQuery<CategoriesQuery, CategoriesQueryVariables>(
    CategoriesDocument,
    baseOptions
  )
}
export type CategoriesQueryHookResult = ReturnType<typeof useCategoriesQuery>
export type CategoriesLazyQueryHookResult = ReturnType<
  typeof useCategoriesLazyQuery
>
export type CategoriesQueryResult = Apollo.QueryResult<
  CategoriesQuery,
  CategoriesQueryVariables
>
export const CommentDocument = gql`
  query Comment($postId: ID) {
    comment(postId: $postId) {
      id
      createdAt
      updatedAt
      body
      createdBy {
        username
      }
    }
  }
`

/**
 * __useCommentQuery__
 *
 * To run a query within a React component, call `useCommentQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useCommentQuery(
  baseOptions?: Apollo.QueryHookOptions<CommentQuery, CommentQueryVariables>
) {
  return Apollo.useQuery<CommentQuery, CommentQueryVariables>(
    CommentDocument,
    baseOptions
  )
}
export function useCommentLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<CommentQuery, CommentQueryVariables>
) {
  return Apollo.useLazyQuery<CommentQuery, CommentQueryVariables>(
    CommentDocument,
    baseOptions
  )
}
export type CommentQueryHookResult = ReturnType<typeof useCommentQuery>
export type CommentLazyQueryHookResult = ReturnType<typeof useCommentLazyQuery>
export type CommentQueryResult = Apollo.QueryResult<
  CommentQuery,
  CommentQueryVariables
>
export const CommentsDocument = gql`
  query Comments($first: Int, $orderBy: PostOrderBy, $skip: Int, $postId: ID) {
    comments(first: $first, orderBy: $orderBy, skip: $skip, postId: $postId) {
      id
      createdAt
      updatedAt
      body
      createdBy {
        username
      }
    }
  }
`

/**
 * __useCommentsQuery__
 *
 * To run a query within a React component, call `useCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentsQuery({
 *   variables: {
 *      first: // value for 'first'
 *      orderBy: // value for 'orderBy'
 *      skip: // value for 'skip'
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useCommentsQuery(
  baseOptions?: Apollo.QueryHookOptions<CommentsQuery, CommentsQueryVariables>
) {
  return Apollo.useQuery<CommentsQuery, CommentsQueryVariables>(
    CommentsDocument,
    baseOptions
  )
}
export function useCommentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CommentsQuery,
    CommentsQueryVariables
  >
) {
  return Apollo.useLazyQuery<CommentsQuery, CommentsQueryVariables>(
    CommentsDocument,
    baseOptions
  )
}
export type CommentsQueryHookResult = ReturnType<typeof useCommentsQuery>
export type CommentsLazyQueryHookResult = ReturnType<
  typeof useCommentsLazyQuery
>
export type CommentsQueryResult = Apollo.QueryResult<
  CommentsQuery,
  CommentsQueryVariables
>
export const IsUsernameTakenDocument = gql`
  query IsUsernameTaken($data: CheckUsernameInput!) {
    isUsernameTaken(data: $data)
  }
`

/**
 * __useIsUsernameTakenQuery__
 *
 * To run a query within a React component, call `useIsUsernameTakenQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsUsernameTakenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsUsernameTakenQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useIsUsernameTakenQuery(
  baseOptions?: Apollo.QueryHookOptions<
    IsUsernameTakenQuery,
    IsUsernameTakenQueryVariables
  >
) {
  return Apollo.useQuery<IsUsernameTakenQuery, IsUsernameTakenQueryVariables>(
    IsUsernameTakenDocument,
    baseOptions
  )
}
export function useIsUsernameTakenLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IsUsernameTakenQuery,
    IsUsernameTakenQueryVariables
  >
) {
  return Apollo.useLazyQuery<
    IsUsernameTakenQuery,
    IsUsernameTakenQueryVariables
  >(IsUsernameTakenDocument, baseOptions)
}
export type IsUsernameTakenQueryHookResult = ReturnType<
  typeof useIsUsernameTakenQuery
>
export type IsUsernameTakenLazyQueryHookResult = ReturnType<
  typeof useIsUsernameTakenLazyQuery
>
export type IsUsernameTakenQueryResult = Apollo.QueryResult<
  IsUsernameTakenQuery,
  IsUsernameTakenQueryVariables
>
export const MeDocument = gql`
  query Me {
    me {
      id
      username
    }
  }
`

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(
  baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>
) {
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions)
}
export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>
) {
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions)
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>
export const PostDocument = gql`
  query Post($postId: ID) {
    post(postId: $postId) {
      id
      createdAt
      updatedAt
      title
      text
      image
      video
      link
      comments {
        id
        createdAt
        updatedAt
        body
        createdBy {
          username
        }
      }
      author {
        id
        username
      }
      category {
        id
        name
      }
      totalComments {
        count
      }
      totalVotes {
        score
        count
      }
    }
  }
`

/**
 * __usePostQuery__
 *
 * To run a query within a React component, call `usePostQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function usePostQuery(
  baseOptions?: Apollo.QueryHookOptions<PostQuery, PostQueryVariables>
) {
  return Apollo.useQuery<PostQuery, PostQueryVariables>(
    PostDocument,
    baseOptions
  )
}
export function usePostLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PostQuery, PostQueryVariables>
) {
  return Apollo.useLazyQuery<PostQuery, PostQueryVariables>(
    PostDocument,
    baseOptions
  )
}
export type PostQueryHookResult = ReturnType<typeof usePostQuery>
export type PostLazyQueryHookResult = ReturnType<typeof usePostLazyQuery>
export type PostQueryResult = Apollo.QueryResult<PostQuery, PostQueryVariables>
export const PostsDocument = gql`
  query Posts(
    $first: Int
    $orderBy: PostOrderBy
    $skip: Int
    $category: String
  ) {
    posts(first: $first, orderBy: $orderBy, skip: $skip, category: $category) {
      id
      createdAt
      updatedAt
      title
      text
      image
      video
      link
      comments {
        id
        createdAt
        updatedAt
        body
        createdBy {
          username
        }
      }
      category {
        id
        name
      }
      author {
        id
        username
      }
      totalComments {
        count
      }
      totalVotes {
        score
        count
      }
    }
    _allPostsMeta {
      count
    }
    _categoryPostsMeta(name: $category) {
      count
    }
  }
`

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *      first: // value for 'first'
 *      orderBy: // value for 'orderBy'
 *      skip: // value for 'skip'
 *      category: // value for 'category'
 *   },
 * });
 */
export function usePostsQuery(
  baseOptions?: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>
) {
  return Apollo.useQuery<PostsQuery, PostsQueryVariables>(
    PostsDocument,
    baseOptions
  )
}
export function usePostsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>
) {
  return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(
    PostsDocument,
    baseOptions
  )
}
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>
export type PostsQueryResult = Apollo.QueryResult<
  PostsQuery,
  PostsQueryVariables
>
export const UsersDocument = gql`
  query Users {
    users {
      id
      username
    }
  }
`

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(
  baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>
) {
  return Apollo.useQuery<UsersQuery, UsersQueryVariables>(
    UsersDocument,
    baseOptions
  )
}
export function useUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>
) {
  return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(
    UsersDocument,
    baseOptions
  )
}
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>
export type UsersQueryResult = Apollo.QueryResult<
  UsersQuery,
  UsersQueryVariables
>
