import { gql } from "@apollo/client"
import * as Apollo from "@apollo/client"
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** The Email scalar type represents E-Mail addresses compliant to RFC 822. */
  Email: any
}

export type Query = {
  __typename?: "Query"
  categories?: Maybe<Array<Category>>
  comment?: Maybe<Comment>
  comments?: Maybe<Array<Comment>>
  _allPostsMeta: _QueryMeta
  _categoryPostsMeta: _QueryMeta
  post?: Maybe<Post>
  posts?: Maybe<Array<Post>>
  me?: Maybe<User>
  user: User
  users: Array<User>
}

export type QueryCategoriesArgs = {
  first?: Maybe<Scalars["Int"]>
  skip?: Maybe<Scalars["Int"]>
  orderBy?: Maybe<Scalars["String"]>
  name?: Maybe<Scalars["String"]>
}

export type QueryCommentArgs = {
  first?: Maybe<Scalars["Int"]>
  postId?: Maybe<Scalars["ID"]>
  orderBy?: Maybe<Scalars["String"]>
  category?: Maybe<Scalars["String"]>
  skip?: Maybe<Scalars["Int"]>
  name?: Maybe<Scalars["String"]>
}

export type QueryCommentsArgs = {
  first?: Maybe<Scalars["Int"]>
  postId?: Maybe<Scalars["ID"]>
  orderBy?: Maybe<Scalars["String"]>
  category?: Maybe<Scalars["String"]>
  skip?: Maybe<Scalars["Int"]>
  name?: Maybe<Scalars["String"]>
}

export type Query_CategoryPostsMetaArgs = {
  first?: Maybe<Scalars["Int"]>
  postId?: Maybe<Scalars["ID"]>
  orderBy?: Maybe<Scalars["String"]>
  category?: Maybe<Scalars["String"]>
  skip?: Maybe<Scalars["Int"]>
  name?: Maybe<Scalars["String"]>
}

export type QueryPostArgs = {
  first?: Maybe<Scalars["Int"]>
  postId?: Maybe<Scalars["ID"]>
  orderBy?: Maybe<Scalars["String"]>
  category?: Maybe<Scalars["String"]>
  skip?: Maybe<Scalars["Int"]>
  name?: Maybe<Scalars["String"]>
}

export type QueryPostsArgs = {
  first?: Maybe<Scalars["Int"]>
  postId?: Maybe<Scalars["ID"]>
  orderBy?: Maybe<Scalars["String"]>
  category?: Maybe<Scalars["String"]>
  skip?: Maybe<Scalars["Int"]>
  name?: Maybe<Scalars["String"]>
}

export type QueryUserArgs = {
  data: EditUserInput
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
  post?: Maybe<Post>
}

export type User = {
  __typename?: "User"
  id: Scalars["ID"]
  createdAt: Scalars["String"]
  updatedAt: Scalars["String"]
  email: Scalars["Email"]
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

export type EditUserInput = {
  email?: Maybe<Scalars["Email"]>
  username?: Maybe<Scalars["String"]>
  password?: Maybe<Scalars["String"]>
  avatar?: Maybe<Scalars["String"]>
  about?: Maybe<Scalars["String"]>
}

export type Mutation = {
  __typename?: "Mutation"
  createCategory: CategoryMutationResponse
  editComment: CommentMutationResponse
  createPost: PostMutationResponse
  editPost: PostMutationResponse
  deletePost: PostMutationResponse
  createComment: CommentMutationResponse
  vote: VoteMutationResponse
  forgotPassword: Scalars["Boolean"]
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

export type MutationCreatePostArgs = {
  data: CreatePostInput
}

export type MutationEditPostArgs = {
  data: EditPostInput
}

export type MutationDeletePostArgs = {
  data: EditPostInput
}

export type MutationCreateCommentArgs = {
  data: CommentInput
}

export type MutationVoteArgs = {
  data: VoteInput
}

export type MutationForgotPasswordArgs = {
  email: CheckAvailability
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

export type CreatePostInput = {
  categoryId: Scalars["ID"]
  title: Scalars["String"]
  text?: Maybe<Scalars["String"]>
  image?: Maybe<Scalars["String"]>
  video?: Maybe<Scalars["String"]>
  link?: Maybe<Scalars["String"]>
}

export type EditPostInput = {
  postId: Scalars["ID"]
  categoryId?: Maybe<Scalars["ID"]>
  title?: Maybe<Scalars["String"]>
  text?: Maybe<Scalars["String"]>
  image?: Maybe<Scalars["String"]>
  video?: Maybe<Scalars["String"]>
  link?: Maybe<Scalars["String"]>
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

export type CheckAvailability = {
  username?: Maybe<Scalars["String"]>
  email?: Maybe<Scalars["Email"]>
}

export type UserMutationResponse = {
  __typename?: "UserMutationResponse"
  errors?: Maybe<Array<FieldError>>
  user?: Maybe<User>
}

export type RegisterInput = {
  email: Scalars["Email"]
  username: Scalars["String"]
  password: Scalars["String"]
  avatar?: Maybe<Scalars["String"]>
  about?: Maybe<Scalars["String"]>
}

export type LoginInput = {
  email?: Maybe<Scalars["Email"]>
  password?: Maybe<Scalars["String"]>
}

export type LogoutMutationResponse = {
  __typename?: "LogoutMutationResponse"
  message?: Maybe<Scalars["String"]>
  success?: Maybe<Scalars["String"]>
}

export type CategoryDetailsFragment = { __typename?: "Category" } & Pick<
  Category,
  "createdAt" | "id" | "name"
>

export type CommentDetailsFragment = { __typename?: "Comment" } & Pick<
  Comment,
  "id" | "createdAt" | "updatedAt" | "body"
>

export type PostDetailsFragment = { __typename?: "Post" } & Pick<
  Post,
  | "id"
  | "createdAt"
  | "updatedAt"
  | "title"
  | "text"
  | "image"
  | "video"
  | "link"
>

export type UserDetailsFragment = { __typename?: "User" } & Pick<
  User,
  "id" | "username"
>

export type UserMeDetailsFragment = { __typename?: "User" } & Pick<
  User,
  "id" | "username" | "email" | "about" | "avatar"
>

export type CreateCommentMutationVariables = Exact<{
  data: CommentInput
}>

export type CreateCommentMutation = { __typename?: "Mutation" } & {
  createComment: { __typename?: "CommentMutationResponse" } & {
    comment?: Maybe<
      { __typename?: "Comment" } & Pick<Comment, "id" | "body"> & {
          createdBy: { __typename?: "User" } & Pick<User, "id" | "username">
          post?: Maybe<{ __typename?: "Post" } & Pick<Post, "id">>
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
  data: CreatePostInput
}>

export type CreatePostMutation = { __typename?: "Mutation" } & {
  createPost: { __typename?: "PostMutationResponse" } & {
    post?: Maybe<
      { __typename?: "Post" } & {
        comments?: Maybe<
          Array<
            { __typename?: "Comment" } & {
              createdBy: { __typename?: "User" } & UserDetailsFragment
            } & CommentDetailsFragment
          >
        >
        author: { __typename?: "User" } & UserDetailsFragment
        category: { __typename?: "Category" } & CategoryDetailsFragment
        totalComments?: Maybe<
          { __typename?: "_QueryMeta" } & Pick<_QueryMeta, "count">
        >
        totalVotes?: Maybe<
          { __typename?: "_QueryMeta" } & Pick<_QueryMeta, "score" | "count">
        >
      } & PostDetailsFragment
    >
  }
}

export type CreateSubredditMutationVariables = Exact<{
  data: CategoryInput
}>

export type CreateSubredditMutation = { __typename?: "Mutation" } & {
  createCategory: { __typename?: "CategoryMutationResponse" } & {
    category?: Maybe<{ __typename?: "Category" } & CategoryDetailsFragment>
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

export type DeletePostMutationVariables = Exact<{
  data: EditPostInput
}>

export type DeletePostMutation = { __typename?: "Mutation" } & {
  deletePost: { __typename?: "PostMutationResponse" } & {
    post?: Maybe<{ __typename?: "Post" } & Pick<Post, "id">>
  }
}

export type EditPostMutationVariables = Exact<{
  data: EditPostInput
}>

export type EditPostMutation = { __typename?: "Mutation" } & {
  editPost: { __typename?: "PostMutationResponse" } & {
    post?: Maybe<
      { __typename?: "Post" } & {
        category: { __typename?: "Category" } & CategoryDetailsFragment
      } & PostDetailsFragment
    >
    errors?: Maybe<
      Array<
        { __typename?: "FieldError" } & Pick<FieldError, "field" | "message">
      >
    >
  }
}

export type EditUserMutationVariables = Exact<{
  data: EditUserInput
}>

export type EditUserMutation = { __typename?: "Mutation" } & {
  editUser: { __typename?: "UserMutationResponse" } & {
    errors?: Maybe<
      Array<
        { __typename?: "FieldError" } & Pick<FieldError, "field" | "message">
      >
    >
    user?: Maybe<
      { __typename?: "User" } & Pick<
        User,
        "id" | "username" | "about" | "email" | "avatar"
      >
    >
  }
}

export type LoginMutationVariables = Exact<{
  data: LoginInput
}>

export type LoginMutation = { __typename?: "Mutation" } & {
  login: { __typename?: "UserMutationResponse" } & {
    errors?: Maybe<
      Array<
        { __typename?: "FieldError" } & Pick<FieldError, "field" | "message">
      >
    >
    user?: Maybe<
      { __typename?: "User" } & Pick<User, "id" | "username" | "email">
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
    user?: Maybe<
      { __typename?: "User" } & Pick<User, "id" | "username" | "email">
    >
    errors?: Maybe<
      Array<
        { __typename?: "FieldError" } & Pick<FieldError, "field" | "message">
      >
    >
  }
}

export type CategoriesQueryVariables = Exact<{
  first?: Maybe<Scalars["Int"]>
  orderBy?: Maybe<Scalars["String"]>
  skip?: Maybe<Scalars["Int"]>
  name?: Maybe<Scalars["String"]>
}>

export type CategoriesQuery = { __typename?: "Query" } & {
  categories?: Maybe<
    Array<{ __typename?: "Category" } & CategoryDetailsFragment>
  >
}

export type CommentQueryVariables = Exact<{
  postId?: Maybe<Scalars["ID"]>
}>

export type CommentQuery = { __typename?: "Query" } & {
  comment?: Maybe<
    { __typename?: "Comment" } & {
      createdBy: { __typename?: "User" } & UserDetailsFragment
    } & CommentDetailsFragment
  >
}

export type CommentsQueryVariables = Exact<{
  first?: Maybe<Scalars["Int"]>
  orderBy?: Maybe<Scalars["String"]>
  skip?: Maybe<Scalars["Int"]>
  postId?: Maybe<Scalars["ID"]>
}>

export type CommentsQuery = { __typename?: "Query" } & {
  comments?: Maybe<
    Array<
      { __typename?: "Comment" } & {
        createdBy: { __typename?: "User" } & UserDetailsFragment
      } & CommentDetailsFragment
    >
  >
}

export type MeQueryVariables = Exact<{ [key: string]: never }>

export type MeQuery = { __typename?: "Query" } & {
  me?: Maybe<{ __typename?: "User" } & UserMeDetailsFragment>
}

export type PostQueryVariables = Exact<{
  postId?: Maybe<Scalars["ID"]>
}>

export type PostQuery = { __typename?: "Query" } & {
  post?: Maybe<
    { __typename?: "Post" } & {
      comments?: Maybe<
        Array<
          { __typename?: "Comment" } & {
            createdBy: { __typename?: "User" } & UserDetailsFragment
          } & CommentDetailsFragment
        >
      >
      author: { __typename?: "User" } & UserDetailsFragment
      category: { __typename?: "Category" } & CategoryDetailsFragment
      totalComments?: Maybe<
        { __typename?: "_QueryMeta" } & Pick<_QueryMeta, "count">
      >
      totalVotes?: Maybe<
        { __typename?: "_QueryMeta" } & Pick<_QueryMeta, "score" | "count">
      >
    } & PostDetailsFragment
  >
}

export type PostsQueryVariables = Exact<{
  first?: Maybe<Scalars["Int"]>
  orderBy?: Maybe<Scalars["String"]>
  skip?: Maybe<Scalars["Int"]>
  category?: Maybe<Scalars["String"]>
}>

export type PostsQuery = { __typename?: "Query" } & {
  posts?: Maybe<
    Array<
      { __typename?: "Post" } & {
        comments?: Maybe<
          Array<
            { __typename?: "Comment" } & {
              createdBy: { __typename?: "User" } & UserDetailsFragment
            } & CommentDetailsFragment
          >
        >
        category: { __typename?: "Category" } & CategoryDetailsFragment
        author: { __typename?: "User" } & UserDetailsFragment
        totalComments?: Maybe<
          { __typename?: "_QueryMeta" } & Pick<_QueryMeta, "count">
        >
        totalVotes?: Maybe<
          { __typename?: "_QueryMeta" } & Pick<_QueryMeta, "score" | "count">
        >
      } & PostDetailsFragment
    >
  >
  _allPostsMeta: { __typename?: "_QueryMeta" } & Pick<_QueryMeta, "count">
  _categoryPostsMeta: { __typename?: "_QueryMeta" } & Pick<_QueryMeta, "count">
}

export type UpdateMetaQueryVariables = Exact<{
  category?: Maybe<Scalars["String"]>
}>

export type UpdateMetaQuery = { __typename?: "Query" } & {
  _allPostsMeta: { __typename?: "_QueryMeta" } & Pick<_QueryMeta, "count">
  _categoryPostsMeta: { __typename?: "_QueryMeta" } & Pick<_QueryMeta, "count">
}

export type UserQueryVariables = Exact<{
  data: EditUserInput
}>

export type UserQuery = { __typename?: "Query" } & {
  user: { __typename?: "User" } & UserMeDetailsFragment
}

export type UsersQueryVariables = Exact<{ [key: string]: never }>

export type UsersQuery = { __typename?: "Query" } & {
  users: Array<{ __typename?: "User" } & UserMeDetailsFragment>
}

export const CategoryDetailsFragmentDoc = gql`
  fragment CategoryDetails on Category {
    createdAt
    id
    name
  }
`
export const CommentDetailsFragmentDoc = gql`
  fragment CommentDetails on Comment {
    id
    createdAt
    updatedAt
    body
  }
`
export const PostDetailsFragmentDoc = gql`
  fragment PostDetails on Post {
    id
    createdAt
    updatedAt
    title
    text
    image
    video
    link
  }
`
export const UserDetailsFragmentDoc = gql`
  fragment UserDetails on User {
    id
    username
  }
`
export const UserMeDetailsFragmentDoc = gql`
  fragment UserMeDetails on User {
    id
    username
    email
    about
    avatar
  }
`
export const CreateCommentDocument = gql`
  mutation createComment($data: CommentInput!) {
    createComment(data: $data) {
      comment {
        id
        body
        createdBy {
          id
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
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<
  CreateCommentMutation,
  CreateCommentMutationVariables
>
export const CreatePostDocument = gql`
  mutation createPost($data: CreatePostInput!) {
    createPost(data: $data) {
      post {
        ...PostDetails
        comments {
          ...CommentDetails
          createdBy {
            ...UserDetails
          }
        }
        author {
          ...UserDetails
        }
        category {
          ...CategoryDetails
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
  }
  ${PostDetailsFragmentDoc}
  ${CommentDetailsFragmentDoc}
  ${UserDetailsFragmentDoc}
  ${CategoryDetailsFragmentDoc}
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
        ...CategoryDetails
      }
      errors {
        field
        message
      }
    }
  }
  ${CategoryDetailsFragmentDoc}
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
export type CreateSubredditMutationResult = Apollo.MutationResult<CreateSubredditMutation>
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
export const DeletePostDocument = gql`
  mutation DeletePost($data: EditPostInput!) {
    deletePost(data: $data) {
      post {
        id
      }
    }
  }
`
export type DeletePostMutationFn = Apollo.MutationFunction<
  DeletePostMutation,
  DeletePostMutationVariables
>

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useDeletePostMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeletePostMutation,
    DeletePostMutationVariables
  >
) {
  return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(
    DeletePostDocument,
    baseOptions
  )
}
export type DeletePostMutationHookResult = ReturnType<
  typeof useDeletePostMutation
>
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<
  DeletePostMutation,
  DeletePostMutationVariables
>
export const EditPostDocument = gql`
  mutation EditPost($data: EditPostInput!) {
    editPost(data: $data) {
      post {
        ...PostDetails
        category {
          ...CategoryDetails
        }
      }
      errors {
        field
        message
      }
    }
  }
  ${PostDetailsFragmentDoc}
  ${CategoryDetailsFragmentDoc}
`
export type EditPostMutationFn = Apollo.MutationFunction<
  EditPostMutation,
  EditPostMutationVariables
>

/**
 * __useEditPostMutation__
 *
 * To run a mutation, you first call `useEditPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editPostMutation, { data, loading, error }] = useEditPostMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useEditPostMutation(
  baseOptions?: Apollo.MutationHookOptions<
    EditPostMutation,
    EditPostMutationVariables
  >
) {
  return Apollo.useMutation<EditPostMutation, EditPostMutationVariables>(
    EditPostDocument,
    baseOptions
  )
}
export type EditPostMutationHookResult = ReturnType<typeof useEditPostMutation>
export type EditPostMutationResult = Apollo.MutationResult<EditPostMutation>
export type EditPostMutationOptions = Apollo.BaseMutationOptions<
  EditPostMutation,
  EditPostMutationVariables
>
export const EditUserDocument = gql`
  mutation editUser($data: EditUserInput!) {
    editUser(data: $data) {
      errors {
        field
        message
      }
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
export const LoginDocument = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      errors {
        field
        message
      }
      user {
        id
        username
        email
      }
    }
  }
`
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    baseOptions
  )
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
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
        email
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
  query Categories($first: Int, $orderBy: String, $skip: Int, $name: String) {
    categories(first: $first, orderBy: $orderBy, skip: $skip, name: $name) {
      ...CategoryDetails
    }
  }
  ${CategoryDetailsFragmentDoc}
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
 *      first: // value for 'first'
 *      orderBy: // value for 'orderBy'
 *      skip: // value for 'skip'
 *      name: // value for 'name'
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
export function refetchCategoriesQuery(variables?: CategoriesQueryVariables) {
  return { query: CategoriesDocument, variables: variables }
}
export const CommentDocument = gql`
  query Comment($postId: ID) {
    comment(postId: $postId) {
      ...CommentDetails
      createdBy {
        ...UserDetails
      }
    }
  }
  ${CommentDetailsFragmentDoc}
  ${UserDetailsFragmentDoc}
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
export function refetchCommentQuery(variables?: CommentQueryVariables) {
  return { query: CommentDocument, variables: variables }
}
export const CommentsDocument = gql`
  query Comments($first: Int, $orderBy: String, $skip: Int, $postId: ID) {
    comments(first: $first, orderBy: $orderBy, skip: $skip, postId: $postId) {
      ...CommentDetails
      createdBy {
        ...UserDetails
      }
    }
  }
  ${CommentDetailsFragmentDoc}
  ${UserDetailsFragmentDoc}
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
export function refetchCommentsQuery(variables?: CommentsQueryVariables) {
  return { query: CommentsDocument, variables: variables }
}
export const MeDocument = gql`
  query Me {
    me {
      ...UserMeDetails
    }
  }
  ${UserMeDetailsFragmentDoc}
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
export function refetchMeQuery(variables?: MeQueryVariables) {
  return { query: MeDocument, variables: variables }
}
export const PostDocument = gql`
  query Post($postId: ID) {
    post(postId: $postId) {
      ...PostDetails
      comments {
        ...CommentDetails
        createdBy {
          ...UserDetails
        }
      }
      author {
        ...UserDetails
      }
      category {
        ...CategoryDetails
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
  ${PostDetailsFragmentDoc}
  ${CommentDetailsFragmentDoc}
  ${UserDetailsFragmentDoc}
  ${CategoryDetailsFragmentDoc}
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
export function refetchPostQuery(variables?: PostQueryVariables) {
  return { query: PostDocument, variables: variables }
}
export const PostsDocument = gql`
  query Posts($first: Int, $orderBy: String, $skip: Int, $category: String) {
    posts(first: $first, orderBy: $orderBy, skip: $skip, category: $category) {
      ...PostDetails
      comments {
        ...CommentDetails
        createdBy {
          ...UserDetails
        }
      }
      category {
        ...CategoryDetails
      }
      author {
        ...UserDetails
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
  ${PostDetailsFragmentDoc}
  ${CommentDetailsFragmentDoc}
  ${UserDetailsFragmentDoc}
  ${CategoryDetailsFragmentDoc}
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
export function refetchPostsQuery(variables?: PostsQueryVariables) {
  return { query: PostsDocument, variables: variables }
}
export const UpdateMetaDocument = gql`
  query UpdateMeta($category: String) {
    _allPostsMeta {
      count
    }
    _categoryPostsMeta(name: $category) {
      count
    }
  }
`

/**
 * __useUpdateMetaQuery__
 *
 * To run a query within a React component, call `useUpdateMetaQuery` and pass it any options that fit your needs.
 * When your component renders, `useUpdateMetaQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUpdateMetaQuery({
 *   variables: {
 *      category: // value for 'category'
 *   },
 * });
 */
export function useUpdateMetaQuery(
  baseOptions?: Apollo.QueryHookOptions<
    UpdateMetaQuery,
    UpdateMetaQueryVariables
  >
) {
  return Apollo.useQuery<UpdateMetaQuery, UpdateMetaQueryVariables>(
    UpdateMetaDocument,
    baseOptions
  )
}
export function useUpdateMetaLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    UpdateMetaQuery,
    UpdateMetaQueryVariables
  >
) {
  return Apollo.useLazyQuery<UpdateMetaQuery, UpdateMetaQueryVariables>(
    UpdateMetaDocument,
    baseOptions
  )
}
export type UpdateMetaQueryHookResult = ReturnType<typeof useUpdateMetaQuery>
export type UpdateMetaLazyQueryHookResult = ReturnType<
  typeof useUpdateMetaLazyQuery
>
export type UpdateMetaQueryResult = Apollo.QueryResult<
  UpdateMetaQuery,
  UpdateMetaQueryVariables
>
export function refetchUpdateMetaQuery(variables?: UpdateMetaQueryVariables) {
  return { query: UpdateMetaDocument, variables: variables }
}
export const UserDocument = gql`
  query User($data: EditUserInput!) {
    user(data: $data) {
      ...UserMeDetails
    }
  }
  ${UserMeDetailsFragmentDoc}
`

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUserQuery(
  baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>
) {
  return Apollo.useQuery<UserQuery, UserQueryVariables>(
    UserDocument,
    baseOptions
  )
}
export function useUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>
) {
  return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(
    UserDocument,
    baseOptions
  )
}
export type UserQueryHookResult = ReturnType<typeof useUserQuery>
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>
export function refetchUserQuery(variables?: UserQueryVariables) {
  return { query: UserDocument, variables: variables }
}
export const UsersDocument = gql`
  query Users {
    users {
      ...UserMeDetails
    }
  }
  ${UserMeDetailsFragmentDoc}
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
export function refetchUsersQuery(variables?: UsersQueryVariables) {
  return { query: UsersDocument, variables: variables }
}
