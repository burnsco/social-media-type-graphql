import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  categories?: Maybe<Array<Category>>;
  post?: Maybe<Post>;
  posts?: Maybe<Array<Post>>;
  postsByCategory?: Maybe<Array<Post>>;
  me?: Maybe<User>;
  users?: Maybe<Array<User>>;
};


export type QueryPostArgs = {
  postId: Scalars['Float'];
};


export type QueryPostsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryPostsByCategoryArgs = {
  category: Scalars['String'];
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['Int'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  name: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['Int'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  title: Scalars['String'];
  author: User;
  category: Category;
  votes?: Maybe<Array<Vote>>;
  comments?: Maybe<Array<Comment>>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  email: Scalars['String'];
  username: Scalars['String'];
};

export type Vote = {
  __typename?: 'Vote';
  id: Scalars['Int'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  value: Scalars['Float'];
  castBy: User;
};

export type Comment = {
  __typename?: 'Comment';
  id: Scalars['Int'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  body: Scalars['String'];
  createdBy: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  createCategory: CategoryMutationResponse;
  createPost: PostMutationResponse;
  createComment: CommentMutationResponse;
  vote: VoteMutationResponse;
  register: UserMutationResponse;
  logout: LogoutMutationResponse;
};


export type MutationCreateCategoryArgs = {
  data: CategoryInput;
};


export type MutationCreatePostArgs = {
  data: PostInput;
};


export type MutationCreateCommentArgs = {
  data: CommentInput;
};


export type MutationVoteArgs = {
  data: VoteInput;
};


export type MutationRegisterArgs = {
  data: RegisterInput;
};

export type CategoryMutationResponse = {
  __typename?: 'CategoryMutationResponse';
  errors?: Maybe<Array<FieldError>>;
  category?: Maybe<Category>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type CategoryInput = {
  name: Scalars['String'];
};

export type PostMutationResponse = {
  __typename?: 'PostMutationResponse';
  errors?: Maybe<Array<FieldError>>;
  post?: Maybe<Post>;
};

export type PostInput = {
  title: Scalars['String'];
  categoryId: Scalars['Int'];
};

export type CommentMutationResponse = {
  __typename?: 'CommentMutationResponse';
  errors?: Maybe<Array<FieldError>>;
  comment?: Maybe<Comment>;
};

export type CommentInput = {
  body: Scalars['String'];
  postId: Scalars['Int'];
};

export type VoteMutationResponse = {
  __typename?: 'VoteMutationResponse';
  errors?: Maybe<Array<FieldError>>;
  vote?: Maybe<Vote>;
};

export type VoteInput = {
  postId: Scalars['Int'];
  value: Scalars['Int'];
};

export type UserMutationResponse = {
  __typename?: 'UserMutationResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type RegisterInput = {
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
};

export type LogoutMutationResponse = {
  __typename?: 'LogoutMutationResponse';
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type ErrorDetailsFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type ErrorsAndUserDetailsFragment = (
  { __typename?: 'UserMutationResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & ErrorDetailsFragment
  )>>, user?: Maybe<(
    { __typename?: 'User' }
    & UserDetailsFragment
  )> }
);

export type UserDetailsFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username'>
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & { logout: (
    { __typename?: 'LogoutMutationResponse' }
    & Pick<LogoutMutationResponse, 'message' | 'success'>
  ) }
);

export type RegisterMutationVariables = Exact<{
  data: RegisterInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserMutationResponse' }
    & ErrorsAndUserDetailsFragment
  ) }
);

export type AllCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllCategoriesQuery = (
  { __typename?: 'Query' }
  & { categories?: Maybe<Array<(
    { __typename?: 'Category' }
    & Pick<Category, 'id' | 'name'>
  )>> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  )> }
);

export type SinglePostQueryVariables = Exact<{
  postId: Scalars['Float'];
}>;


export type SinglePostQuery = (
  { __typename?: 'Query' }
  & { post?: Maybe<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'createdAt' | 'updatedAt' | 'title'>
    & { author: (
      { __typename?: 'User' }
      & Pick<User, 'username'>
    ), comments?: Maybe<Array<(
      { __typename?: 'Comment' }
      & Pick<Comment, 'id' | 'createdAt' | 'updatedAt' | 'body'>
      & { createdBy: (
        { __typename?: 'User' }
        & Pick<User, 'username'>
      ) }
    )>>, category: (
      { __typename?: 'Category' }
      & Pick<Category, 'id' | 'name'>
    ), votes?: Maybe<Array<(
      { __typename?: 'Vote' }
      & Pick<Vote, 'id' | 'value'>
      & { castBy: (
        { __typename?: 'User' }
        & Pick<User, 'username'>
      ) }
    )>> }
  )> }
);

export type AllPostsQueryVariables = Exact<{
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
}>;


export type AllPostsQuery = (
  { __typename?: 'Query' }
  & { posts?: Maybe<Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'createdAt' | 'updatedAt' | 'title'>
    & { author: (
      { __typename?: 'User' }
      & Pick<User, 'username'>
    ), comments?: Maybe<Array<(
      { __typename?: 'Comment' }
      & Pick<Comment, 'id' | 'createdAt' | 'updatedAt' | 'body'>
      & { createdBy: (
        { __typename?: 'User' }
        & Pick<User, 'username'>
      ) }
    )>>, category: (
      { __typename?: 'Category' }
      & Pick<Category, 'id' | 'name'>
    ), votes?: Maybe<Array<(
      { __typename?: 'Vote' }
      & Pick<Vote, 'id' | 'value'>
      & { castBy: (
        { __typename?: 'User' }
        & Pick<User, 'username'>
      ) }
    )>> }
  )>> }
);

export type PostsByCategoryQueryVariables = Exact<{
  category: Scalars['String'];
}>;


export type PostsByCategoryQuery = (
  { __typename?: 'Query' }
  & { postsByCategory?: Maybe<Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'createdAt' | 'updatedAt' | 'title'>
    & { author: (
      { __typename?: 'User' }
      & Pick<User, 'username'>
    ), comments?: Maybe<Array<(
      { __typename?: 'Comment' }
      & Pick<Comment, 'id' | 'createdAt' | 'updatedAt' | 'body'>
      & { createdBy: (
        { __typename?: 'User' }
        & Pick<User, 'username'>
      ) }
    )>>, category: (
      { __typename?: 'Category' }
      & Pick<Category, 'id' | 'name'>
    ), votes?: Maybe<Array<(
      { __typename?: 'Vote' }
      & Pick<Vote, 'id' | 'value'>
      & { castBy: (
        { __typename?: 'User' }
        & Pick<User, 'username'>
      ) }
    )>> }
  )>> }
);

export type AllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type AllUsersQuery = (
  { __typename?: 'Query' }
  & { users?: Maybe<Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  )>> }
);

export const ErrorDetailsFragmentDoc = gql`
    fragment ErrorDetails on FieldError {
  field
  message
}
    `;
export const UserDetailsFragmentDoc = gql`
    fragment UserDetails on User {
  id
  username
}
    `;
export const ErrorsAndUserDetailsFragmentDoc = gql`
    fragment ErrorsAndUserDetails on UserMutationResponse {
  errors {
    ...ErrorDetails
  }
  user {
    ...UserDetails
  }
}
    ${ErrorDetailsFragmentDoc}
${UserDetailsFragmentDoc}`;
export const LogoutDocument = gql`
    mutation Logout {
  logout {
    message
    success
  }
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

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
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($data: RegisterInput!) {
  register(data: $data) {
    ...ErrorsAndUserDetails
  }
}
    ${ErrorsAndUserDetailsFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

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
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const AllCategoriesDocument = gql`
    query AllCategories {
  categories {
    id
    name
  }
}
    `;

/**
 * __useAllCategoriesQuery__
 *
 * To run a query within a React component, call `useAllCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<AllCategoriesQuery, AllCategoriesQueryVariables>) {
        return Apollo.useQuery<AllCategoriesQuery, AllCategoriesQueryVariables>(AllCategoriesDocument, baseOptions);
      }
export function useAllCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllCategoriesQuery, AllCategoriesQueryVariables>) {
          return Apollo.useLazyQuery<AllCategoriesQuery, AllCategoriesQueryVariables>(AllCategoriesDocument, baseOptions);
        }
export type AllCategoriesQueryHookResult = ReturnType<typeof useAllCategoriesQuery>;
export type AllCategoriesLazyQueryHookResult = ReturnType<typeof useAllCategoriesLazyQuery>;
export type AllCategoriesQueryResult = Apollo.QueryResult<AllCategoriesQuery, AllCategoriesQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    username
  }
}
    `;

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
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const SinglePostDocument = gql`
    query SinglePost($postId: Float!) {
  post(postId: $postId) {
    id
    createdAt
    updatedAt
    title
    author {
      username
    }
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
    votes {
      id
      value
      castBy {
        username
      }
    }
  }
}
    `;

/**
 * __useSinglePostQuery__
 *
 * To run a query within a React component, call `useSinglePostQuery` and pass it any options that fit your needs.
 * When your component renders, `useSinglePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSinglePostQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useSinglePostQuery(baseOptions?: Apollo.QueryHookOptions<SinglePostQuery, SinglePostQueryVariables>) {
        return Apollo.useQuery<SinglePostQuery, SinglePostQueryVariables>(SinglePostDocument, baseOptions);
      }
export function useSinglePostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SinglePostQuery, SinglePostQueryVariables>) {
          return Apollo.useLazyQuery<SinglePostQuery, SinglePostQueryVariables>(SinglePostDocument, baseOptions);
        }
export type SinglePostQueryHookResult = ReturnType<typeof useSinglePostQuery>;
export type SinglePostLazyQueryHookResult = ReturnType<typeof useSinglePostLazyQuery>;
export type SinglePostQueryResult = Apollo.QueryResult<SinglePostQuery, SinglePostQueryVariables>;
export const AllPostsDocument = gql`
    query AllPosts($offset: Int, $limit: Int) {
  posts(offset: $offset, limit: $limit) {
    id
    createdAt
    updatedAt
    title
    author {
      username
    }
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
    votes {
      id
      value
      castBy {
        username
      }
    }
  }
}
    `;

/**
 * __useAllPostsQuery__
 *
 * To run a query within a React component, call `useAllPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllPostsQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useAllPostsQuery(baseOptions?: Apollo.QueryHookOptions<AllPostsQuery, AllPostsQueryVariables>) {
        return Apollo.useQuery<AllPostsQuery, AllPostsQueryVariables>(AllPostsDocument, baseOptions);
      }
export function useAllPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllPostsQuery, AllPostsQueryVariables>) {
          return Apollo.useLazyQuery<AllPostsQuery, AllPostsQueryVariables>(AllPostsDocument, baseOptions);
        }
export type AllPostsQueryHookResult = ReturnType<typeof useAllPostsQuery>;
export type AllPostsLazyQueryHookResult = ReturnType<typeof useAllPostsLazyQuery>;
export type AllPostsQueryResult = Apollo.QueryResult<AllPostsQuery, AllPostsQueryVariables>;
export const PostsByCategoryDocument = gql`
    query PostsByCategory($category: String!) {
  postsByCategory(category: $category) {
    id
    createdAt
    updatedAt
    title
    author {
      username
    }
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
    votes {
      id
      value
      castBy {
        username
      }
    }
  }
}
    `;

/**
 * __usePostsByCategoryQuery__
 *
 * To run a query within a React component, call `usePostsByCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsByCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsByCategoryQuery({
 *   variables: {
 *      category: // value for 'category'
 *   },
 * });
 */
export function usePostsByCategoryQuery(baseOptions?: Apollo.QueryHookOptions<PostsByCategoryQuery, PostsByCategoryQueryVariables>) {
        return Apollo.useQuery<PostsByCategoryQuery, PostsByCategoryQueryVariables>(PostsByCategoryDocument, baseOptions);
      }
export function usePostsByCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsByCategoryQuery, PostsByCategoryQueryVariables>) {
          return Apollo.useLazyQuery<PostsByCategoryQuery, PostsByCategoryQueryVariables>(PostsByCategoryDocument, baseOptions);
        }
export type PostsByCategoryQueryHookResult = ReturnType<typeof usePostsByCategoryQuery>;
export type PostsByCategoryLazyQueryHookResult = ReturnType<typeof usePostsByCategoryLazyQuery>;
export type PostsByCategoryQueryResult = Apollo.QueryResult<PostsByCategoryQuery, PostsByCategoryQueryVariables>;
export const AllUsersDocument = gql`
    query AllUsers {
  users {
    id
    username
  }
}
    `;

/**
 * __useAllUsersQuery__
 *
 * To run a query within a React component, call `useAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllUsersQuery(baseOptions?: Apollo.QueryHookOptions<AllUsersQuery, AllUsersQueryVariables>) {
        return Apollo.useQuery<AllUsersQuery, AllUsersQueryVariables>(AllUsersDocument, baseOptions);
      }
export function useAllUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllUsersQuery, AllUsersQueryVariables>) {
          return Apollo.useLazyQuery<AllUsersQuery, AllUsersQueryVariables>(AllUsersDocument, baseOptions);
        }
export type AllUsersQueryHookResult = ReturnType<typeof useAllUsersQuery>;
export type AllUsersLazyQueryHookResult = ReturnType<typeof useAllUsersLazyQuery>;
export type AllUsersQueryResult = Apollo.QueryResult<AllUsersQuery, AllUsersQueryVariables>;