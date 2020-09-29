import * as Types from "./graphql"

import * as Operations from "./graphql"
import { NextPage } from "next"
import { NextRouter, useRouter } from "next/router"
import { NormalizedCacheObject } from "@apollo/client"
import { QueryHookOptions, useQuery } from "@apollo/client"
import * as Apollo from "@apollo/client"
import React from "react"
import { getApolloClient } from "../withApollo"
export async function getServerPageCreateComment<T extends true | false>(
  options: Omit<
    Apollo.QueryOptions<Types.CreateCommentMutationVariables>,
    "query"
  >,
  ctx?: any,
  rawQueryResult?: T
): Promise<{
  props: T extends true
    ? Apollo.ApolloQueryResult<Types.CreateCommentMutation>
    : { apolloState: NormalizedCacheObject }
}> {
  const apolloClient = getApolloClient(ctx)

  const data = await apolloClient.query<Types.CreateCommentMutation>({
    ...options,
    query: Operations.CreateCommentDocument
  })
  if (rawQueryResult) {
    return {
      props: data
    } as any
  }
  const apolloState = apolloClient.cache.extract()
  return {
    props: {
      apolloState
    }
  } as any
}
export const useCreateComment = (
  optionsFunc?: (
    router: NextRouter
  ) => QueryHookOptions<
    Types.CreateCommentMutation,
    Types.CreateCommentMutationVariables
  >
) => {
  const router = useRouter()
  const options = optionsFunc ? optionsFunc(router) : {}
  return useQuery(Operations.CreateCommentDocument, options)
}
export type PageCreateCommentComp = React.FC<{
  data?: Types.CreateCommentMutation
  error?: Apollo.ApolloError
}>
export const withPageCreateComment = (
  optionsFunc?: (
    router: NextRouter
  ) => QueryHookOptions<
    Types.CreateCommentMutation,
    Types.CreateCommentMutationVariables
  >
) => (WrappedComponent: PageCreateCommentComp): NextPage => props => {
  const router = useRouter()
  const options = optionsFunc ? optionsFunc(router) : {}
  const { data, error } = useQuery(Operations.CreateCommentDocument, options)
  return <WrappedComponent {...props} data={data} error={error} />
}
export const ssrCreateComment = {
  getServerPage: getServerPageCreateComment,
  withPage: withPageCreateComment,
  usePage: useCreateComment
}
export async function getServerPageCreatePost<T extends true | false>(
  options: Omit<
    Apollo.QueryOptions<Types.CreatePostMutationVariables>,
    "query"
  >,
  ctx?: any,
  rawQueryResult?: T
): Promise<{
  props: T extends true
    ? Apollo.ApolloQueryResult<Types.CreatePostMutation>
    : { apolloState: NormalizedCacheObject }
}> {
  const apolloClient = getApolloClient(ctx)

  const data = await apolloClient.query<Types.CreatePostMutation>({
    ...options,
    query: Operations.CreatePostDocument
  })
  if (rawQueryResult) {
    return {
      props: data
    } as any
  }
  const apolloState = apolloClient.cache.extract()
  return {
    props: {
      apolloState
    }
  } as any
}
export const useCreatePost = (
  optionsFunc?: (
    router: NextRouter
  ) => QueryHookOptions<
    Types.CreatePostMutation,
    Types.CreatePostMutationVariables
  >
) => {
  const router = useRouter()
  const options = optionsFunc ? optionsFunc(router) : {}
  return useQuery(Operations.CreatePostDocument, options)
}
export type PageCreatePostComp = React.FC<{
  data?: Types.CreatePostMutation
  error?: Apollo.ApolloError
}>
export const withPageCreatePost = (
  optionsFunc?: (
    router: NextRouter
  ) => QueryHookOptions<
    Types.CreatePostMutation,
    Types.CreatePostMutationVariables
  >
) => (WrappedComponent: PageCreatePostComp): NextPage => props => {
  const router = useRouter()
  const options = optionsFunc ? optionsFunc(router) : {}
  const { data, error } = useQuery(Operations.CreatePostDocument, options)
  return <WrappedComponent {...props} data={data} error={error} />
}
export const ssrCreatePost = {
  getServerPage: getServerPageCreatePost,
  withPage: withPageCreatePost,
  usePage: useCreatePost
}
export async function getServerPageCreateSubreddit<T extends true | false>(
  options: Omit<
    Apollo.QueryOptions<Types.CreateSubredditMutationVariables>,
    "query"
  >,
  ctx?: any,
  rawQueryResult?: T
): Promise<{
  props: T extends true
    ? Apollo.ApolloQueryResult<Types.CreateSubredditMutation>
    : { apolloState: NormalizedCacheObject }
}> {
  const apolloClient = getApolloClient(ctx)

  const data = await apolloClient.query<Types.CreateSubredditMutation>({
    ...options,
    query: Operations.CreateSubredditDocument
  })
  if (rawQueryResult) {
    return {
      props: data
    } as any
  }
  const apolloState = apolloClient.cache.extract()
  return {
    props: {
      apolloState
    }
  } as any
}
export const useCreateSubreddit = (
  optionsFunc?: (
    router: NextRouter
  ) => QueryHookOptions<
    Types.CreateSubredditMutation,
    Types.CreateSubredditMutationVariables
  >
) => {
  const router = useRouter()
  const options = optionsFunc ? optionsFunc(router) : {}
  return useQuery(Operations.CreateSubredditDocument, options)
}
export type PageCreateSubredditComp = React.FC<{
  data?: Types.CreateSubredditMutation
  error?: Apollo.ApolloError
}>
export const withPageCreateSubreddit = (
  optionsFunc?: (
    router: NextRouter
  ) => QueryHookOptions<
    Types.CreateSubredditMutation,
    Types.CreateSubredditMutationVariables
  >
) => (WrappedComponent: PageCreateSubredditComp): NextPage => props => {
  const router = useRouter()
  const options = optionsFunc ? optionsFunc(router) : {}
  const { data, error } = useQuery(Operations.CreateSubredditDocument, options)
  return <WrappedComponent {...props} data={data} error={error} />
}
export const ssrCreateSubreddit = {
  getServerPage: getServerPageCreateSubreddit,
  withPage: withPageCreateSubreddit,
  usePage: useCreateSubreddit
}
export async function getServerPageLogout<T extends true | false>(
  options: Omit<Apollo.QueryOptions<Types.LogoutMutationVariables>, "query">,
  ctx?: any,
  rawQueryResult?: T
): Promise<{
  props: T extends true
    ? Apollo.ApolloQueryResult<Types.LogoutMutation>
    : { apolloState: NormalizedCacheObject }
}> {
  const apolloClient = getApolloClient(ctx)

  const data = await apolloClient.query<Types.LogoutMutation>({
    ...options,
    query: Operations.LogoutDocument
  })
  if (rawQueryResult) {
    return {
      props: data
    } as any
  }
  const apolloState = apolloClient.cache.extract()
  return {
    props: {
      apolloState
    }
  } as any
}
export const useLogout = (
  optionsFunc?: (
    router: NextRouter
  ) => QueryHookOptions<Types.LogoutMutation, Types.LogoutMutationVariables>
) => {
  const router = useRouter()
  const options = optionsFunc ? optionsFunc(router) : {}
  return useQuery(Operations.LogoutDocument, options)
}
export type PageLogoutComp = React.FC<{
  data?: Types.LogoutMutation
  error?: Apollo.ApolloError
}>
export const withPageLogout = (
  optionsFunc?: (
    router: NextRouter
  ) => QueryHookOptions<Types.LogoutMutation, Types.LogoutMutationVariables>
) => (WrappedComponent: PageLogoutComp): NextPage => props => {
  const router = useRouter()
  const options = optionsFunc ? optionsFunc(router) : {}
  const { data, error } = useQuery(Operations.LogoutDocument, options)
  return <WrappedComponent {...props} data={data} error={error} />
}
export const ssrLogout = {
  getServerPage: getServerPageLogout,
  withPage: withPageLogout,
  usePage: useLogout
}
export async function getServerPageRegister<T extends true | false>(
  options: Omit<Apollo.QueryOptions<Types.RegisterMutationVariables>, "query">,
  ctx?: any,
  rawQueryResult?: T
): Promise<{
  props: T extends true
    ? Apollo.ApolloQueryResult<Types.RegisterMutation>
    : { apolloState: NormalizedCacheObject }
}> {
  const apolloClient = getApolloClient(ctx)

  const data = await apolloClient.query<Types.RegisterMutation>({
    ...options,
    query: Operations.RegisterDocument
  })
  if (rawQueryResult) {
    return {
      props: data
    } as any
  }
  const apolloState = apolloClient.cache.extract()
  return {
    props: {
      apolloState
    }
  } as any
}
export const useRegister = (
  optionsFunc?: (
    router: NextRouter
  ) => QueryHookOptions<Types.RegisterMutation, Types.RegisterMutationVariables>
) => {
  const router = useRouter()
  const options = optionsFunc ? optionsFunc(router) : {}
  return useQuery(Operations.RegisterDocument, options)
}
export type PageRegisterComp = React.FC<{
  data?: Types.RegisterMutation
  error?: Apollo.ApolloError
}>
export const withPageRegister = (
  optionsFunc?: (
    router: NextRouter
  ) => QueryHookOptions<Types.RegisterMutation, Types.RegisterMutationVariables>
) => (WrappedComponent: PageRegisterComp): NextPage => props => {
  const router = useRouter()
  const options = optionsFunc ? optionsFunc(router) : {}
  const { data, error } = useQuery(Operations.RegisterDocument, options)
  return <WrappedComponent {...props} data={data} error={error} />
}
export const ssrRegister = {
  getServerPage: getServerPageRegister,
  withPage: withPageRegister,
  usePage: useRegister
}
export async function getServerPageCategories<T extends true | false>(
  options: Omit<Apollo.QueryOptions<Types.CategoriesQueryVariables>, "query">,
  ctx?: any,
  rawQueryResult?: T
): Promise<{
  props: T extends true
    ? Apollo.ApolloQueryResult<Types.CategoriesQuery>
    : { apolloState: NormalizedCacheObject }
}> {
  const apolloClient = getApolloClient(ctx)

  const data = await apolloClient.query<Types.CategoriesQuery>({
    ...options,
    query: Operations.CategoriesDocument
  })
  if (rawQueryResult) {
    return {
      props: data
    } as any
  }
  const apolloState = apolloClient.cache.extract()
  return {
    props: {
      apolloState
    }
  } as any
}
export const useCategories = (
  optionsFunc?: (
    router: NextRouter
  ) => QueryHookOptions<Types.CategoriesQuery, Types.CategoriesQueryVariables>
) => {
  const router = useRouter()
  const options = optionsFunc ? optionsFunc(router) : {}
  return useQuery(Operations.CategoriesDocument, options)
}
export type PageCategoriesComp = React.FC<{
  data?: Types.CategoriesQuery
  error?: Apollo.ApolloError
}>
export const withPageCategories = (
  optionsFunc?: (
    router: NextRouter
  ) => QueryHookOptions<Types.CategoriesQuery, Types.CategoriesQueryVariables>
) => (WrappedComponent: PageCategoriesComp): NextPage => props => {
  const router = useRouter()
  const options = optionsFunc ? optionsFunc(router) : {}
  const { data, error } = useQuery(Operations.CategoriesDocument, options)
  return <WrappedComponent {...props} data={data} error={error} />
}
export const ssrCategories = {
  getServerPage: getServerPageCategories,
  withPage: withPageCategories,
  usePage: useCategories
}
export async function getServerPageComment<T extends true | false>(
  options: Omit<Apollo.QueryOptions<Types.CommentQueryVariables>, "query">,
  ctx?: any,
  rawQueryResult?: T
): Promise<{
  props: T extends true
    ? Apollo.ApolloQueryResult<Types.CommentQuery>
    : { apolloState: NormalizedCacheObject }
}> {
  const apolloClient = getApolloClient(ctx)

  const data = await apolloClient.query<Types.CommentQuery>({
    ...options,
    query: Operations.CommentDocument
  })
  if (rawQueryResult) {
    return {
      props: data
    } as any
  }
  const apolloState = apolloClient.cache.extract()
  return {
    props: {
      apolloState
    }
  } as any
}
export const useComment = (
  optionsFunc?: (
    router: NextRouter
  ) => QueryHookOptions<Types.CommentQuery, Types.CommentQueryVariables>
) => {
  const router = useRouter()
  const options = optionsFunc ? optionsFunc(router) : {}
  return useQuery(Operations.CommentDocument, options)
}
export type PageCommentComp = React.FC<{
  data?: Types.CommentQuery
  error?: Apollo.ApolloError
}>
export const withPageComment = (
  optionsFunc?: (
    router: NextRouter
  ) => QueryHookOptions<Types.CommentQuery, Types.CommentQueryVariables>
) => (WrappedComponent: PageCommentComp): NextPage => props => {
  const router = useRouter()
  const options = optionsFunc ? optionsFunc(router) : {}
  const { data, error } = useQuery(Operations.CommentDocument, options)
  return <WrappedComponent {...props} data={data} error={error} />
}
export const ssrComment = {
  getServerPage: getServerPageComment,
  withPage: withPageComment,
  usePage: useComment
}
export async function getServerPageComments<T extends true | false>(
  options: Omit<Apollo.QueryOptions<Types.CommentsQueryVariables>, "query">,
  ctx?: any,
  rawQueryResult?: T
): Promise<{
  props: T extends true
    ? Apollo.ApolloQueryResult<Types.CommentsQuery>
    : { apolloState: NormalizedCacheObject }
}> {
  const apolloClient = getApolloClient(ctx)

  const data = await apolloClient.query<Types.CommentsQuery>({
    ...options,
    query: Operations.CommentsDocument
  })
  if (rawQueryResult) {
    return {
      props: data
    } as any
  }
  const apolloState = apolloClient.cache.extract()
  return {
    props: {
      apolloState
    }
  } as any
}
export const useComments = (
  optionsFunc?: (
    router: NextRouter
  ) => QueryHookOptions<Types.CommentsQuery, Types.CommentsQueryVariables>
) => {
  const router = useRouter()
  const options = optionsFunc ? optionsFunc(router) : {}
  return useQuery(Operations.CommentsDocument, options)
}
export type PageCommentsComp = React.FC<{
  data?: Types.CommentsQuery
  error?: Apollo.ApolloError
}>
export const withPageComments = (
  optionsFunc?: (
    router: NextRouter
  ) => QueryHookOptions<Types.CommentsQuery, Types.CommentsQueryVariables>
) => (WrappedComponent: PageCommentsComp): NextPage => props => {
  const router = useRouter()
  const options = optionsFunc ? optionsFunc(router) : {}
  const { data, error } = useQuery(Operations.CommentsDocument, options)
  return <WrappedComponent {...props} data={data} error={error} />
}
export const ssrComments = {
  getServerPage: getServerPageComments,
  withPage: withPageComments,
  usePage: useComments
}
export async function getServerPageMe<T extends true | false>(
  options: Omit<Apollo.QueryOptions<Types.MeQueryVariables>, "query">,
  ctx?: any,
  rawQueryResult?: T
): Promise<{
  props: T extends true
    ? Apollo.ApolloQueryResult<Types.MeQuery>
    : { apolloState: NormalizedCacheObject }
}> {
  const apolloClient = getApolloClient(ctx)

  const data = await apolloClient.query<Types.MeQuery>({
    ...options,
    query: Operations.MeDocument
  })
  if (rawQueryResult) {
    return {
      props: data
    } as any
  }
  const apolloState = apolloClient.cache.extract()
  return {
    props: {
      apolloState
    }
  } as any
}
export const useMe = (
  optionsFunc?: (
    router: NextRouter
  ) => QueryHookOptions<Types.MeQuery, Types.MeQueryVariables>
) => {
  const router = useRouter()
  const options = optionsFunc ? optionsFunc(router) : {}
  return useQuery(Operations.MeDocument, options)
}
export type PageMeComp = React.FC<{
  data?: Types.MeQuery
  error?: Apollo.ApolloError
}>
export const withPageMe = (
  optionsFunc?: (
    router: NextRouter
  ) => QueryHookOptions<Types.MeQuery, Types.MeQueryVariables>
) => (WrappedComponent: PageMeComp): NextPage => props => {
  const router = useRouter()
  const options = optionsFunc ? optionsFunc(router) : {}
  const { data, error } = useQuery(Operations.MeDocument, options)
  return <WrappedComponent {...props} data={data} error={error} />
}
export const ssrMe = {
  getServerPage: getServerPageMe,
  withPage: withPageMe,
  usePage: useMe
}
export async function getServerPagePost<T extends true | false>(
  options: Omit<Apollo.QueryOptions<Types.PostQueryVariables>, "query">,
  ctx?: any,
  rawQueryResult?: T
): Promise<{
  props: T extends true
    ? Apollo.ApolloQueryResult<Types.PostQuery>
    : { apolloState: NormalizedCacheObject }
}> {
  const apolloClient = getApolloClient(ctx)

  const data = await apolloClient.query<Types.PostQuery>({
    ...options,
    query: Operations.PostDocument
  })
  if (rawQueryResult) {
    return {
      props: data
    } as any
  }
  const apolloState = apolloClient.cache.extract()
  return {
    props: {
      apolloState
    }
  } as any
}
export const usePost = (
  optionsFunc?: (
    router: NextRouter
  ) => QueryHookOptions<Types.PostQuery, Types.PostQueryVariables>
) => {
  const router = useRouter()
  const options = optionsFunc ? optionsFunc(router) : {}
  return useQuery(Operations.PostDocument, options)
}
export type PagePostComp = React.FC<{
  data?: Types.PostQuery
  error?: Apollo.ApolloError
}>
export const withPagePost = (
  optionsFunc?: (
    router: NextRouter
  ) => QueryHookOptions<Types.PostQuery, Types.PostQueryVariables>
) => (WrappedComponent: PagePostComp): NextPage => props => {
  const router = useRouter()
  const options = optionsFunc ? optionsFunc(router) : {}
  const { data, error } = useQuery(Operations.PostDocument, options)
  return <WrappedComponent {...props} data={data} error={error} />
}
export const ssrPost = {
  getServerPage: getServerPagePost,
  withPage: withPagePost,
  usePage: usePost
}
export async function getServerPagePosts<T extends true | false>(
  options: Omit<Apollo.QueryOptions<Types.PostsQueryVariables>, "query">,
  ctx?: any,
  rawQueryResult?: T
): Promise<{
  props: T extends true
    ? Apollo.ApolloQueryResult<Types.PostsQuery>
    : { apolloState: NormalizedCacheObject }
}> {
  const apolloClient = getApolloClient(ctx)

  const data = await apolloClient.query<Types.PostsQuery>({
    ...options,
    query: Operations.PostsDocument
  })
  if (rawQueryResult) {
    return {
      props: data
    } as any
  }
  const apolloState = apolloClient.cache.extract()
  return {
    props: {
      apolloState
    }
  } as any
}
export const usePosts = (
  optionsFunc?: (
    router: NextRouter
  ) => QueryHookOptions<Types.PostsQuery, Types.PostsQueryVariables>
) => {
  const router = useRouter()
  const options = optionsFunc ? optionsFunc(router) : {}
  return useQuery(Operations.PostsDocument, options)
}
export type PagePostsComp = React.FC<{
  data?: Types.PostsQuery
  error?: Apollo.ApolloError
}>
export const withPagePosts = (
  optionsFunc?: (
    router: NextRouter
  ) => QueryHookOptions<Types.PostsQuery, Types.PostsQueryVariables>
) => (WrappedComponent: PagePostsComp): NextPage => props => {
  const router = useRouter()
  const options = optionsFunc ? optionsFunc(router) : {}
  const { data, error } = useQuery(Operations.PostsDocument, options)
  return <WrappedComponent {...props} data={data} error={error} />
}
export const ssrPosts = {
  getServerPage: getServerPagePosts,
  withPage: withPagePosts,
  usePage: usePosts
}
export async function getServerPageUsers<T extends true | false>(
  options: Omit<Apollo.QueryOptions<Types.UsersQueryVariables>, "query">,
  ctx?: any,
  rawQueryResult?: T
): Promise<{
  props: T extends true
    ? Apollo.ApolloQueryResult<Types.UsersQuery>
    : { apolloState: NormalizedCacheObject }
}> {
  const apolloClient = getApolloClient(ctx)

  const data = await apolloClient.query<Types.UsersQuery>({
    ...options,
    query: Operations.UsersDocument
  })
  if (rawQueryResult) {
    return {
      props: data
    } as any
  }
  const apolloState = apolloClient.cache.extract()
  return {
    props: {
      apolloState
    }
  } as any
}
export const useUsers = (
  optionsFunc?: (
    router: NextRouter
  ) => QueryHookOptions<Types.UsersQuery, Types.UsersQueryVariables>
) => {
  const router = useRouter()
  const options = optionsFunc ? optionsFunc(router) : {}
  return useQuery(Operations.UsersDocument, options)
}
export type PageUsersComp = React.FC<{
  data?: Types.UsersQuery
  error?: Apollo.ApolloError
}>
export const withPageUsers = (
  optionsFunc?: (
    router: NextRouter
  ) => QueryHookOptions<Types.UsersQuery, Types.UsersQueryVariables>
) => (WrappedComponent: PageUsersComp): NextPage => props => {
  const router = useRouter()
  const options = optionsFunc ? optionsFunc(router) : {}
  const { data, error } = useQuery(Operations.UsersDocument, options)
  return <WrappedComponent {...props} data={data} error={error} />
}
export const ssrUsers = {
  getServerPage: getServerPageUsers,
  withPage: withPageUsers,
  usePage: useUsers
}
