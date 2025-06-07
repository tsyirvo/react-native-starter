import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import { request } from '../../api/request';

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends Record<string, unknown>> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends Record<string, unknown>,
  K extends keyof T,
> = Partial<Record<K, never>>;
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
}

export interface Address {
  __typename?: 'Address';
  city?: Maybe<Scalars['String']['output']>;
  geo?: Maybe<Geo>;
  street?: Maybe<Scalars['String']['output']>;
  suite?: Maybe<Scalars['String']['output']>;
  zipcode?: Maybe<Scalars['String']['output']>;
}

export interface AddressInput {
  city?: InputMaybe<Scalars['String']['input']>;
  geo?: InputMaybe<GeoInput>;
  street?: InputMaybe<Scalars['String']['input']>;
  suite?: InputMaybe<Scalars['String']['input']>;
  zipcode?: InputMaybe<Scalars['String']['input']>;
}

export interface Album {
  __typename?: 'Album';
  id?: Maybe<Scalars['ID']['output']>;
  photos?: Maybe<PhotosPage>;
  title?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
}

export interface AlbumPhotosArgs {
  options?: InputMaybe<PageQueryOptions>;
}

export interface AlbumsPage {
  __typename?: 'AlbumsPage';
  data?: Maybe<Maybe<Album>[]>;
  links?: Maybe<PaginationLinks>;
  meta?: Maybe<PageMetadata>;
}

export interface Comment {
  __typename?: 'Comment';
  body?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  post?: Maybe<Post>;
}

export interface CommentsPage {
  __typename?: 'CommentsPage';
  data?: Maybe<Maybe<Comment>[]>;
  links?: Maybe<PaginationLinks>;
  meta?: Maybe<PageMetadata>;
}

export interface Company {
  __typename?: 'Company';
  bs?: Maybe<Scalars['String']['output']>;
  catchPhrase?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
}

export interface CompanyInput {
  bs?: InputMaybe<Scalars['String']['input']>;
  catchPhrase?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
}

export interface CreateAlbumInput {
  title: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
}

export interface CreateCommentInput {
  body: Scalars['String']['input'];
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
}

export interface CreatePhotoInput {
  thumbnailUrl: Scalars['String']['input'];
  title: Scalars['String']['input'];
  url: Scalars['String']['input'];
}

export interface CreatePostInput {
  body: Scalars['String']['input'];
  title: Scalars['String']['input'];
}

export interface CreateTodoInput {
  completed: Scalars['Boolean']['input'];
  title: Scalars['String']['input'];
}

export interface CreateUserInput {
  address?: InputMaybe<AddressInput>;
  company?: InputMaybe<CompanyInput>;
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  username: Scalars['String']['input'];
  website?: InputMaybe<Scalars['String']['input']>;
}

export interface Geo {
  __typename?: 'Geo';
  lat?: Maybe<Scalars['Float']['output']>;
  lng?: Maybe<Scalars['Float']['output']>;
}

export interface GeoInput {
  lat?: InputMaybe<Scalars['Float']['input']>;
  lng?: InputMaybe<Scalars['Float']['input']>;
}

export interface Mutation {
  __typename?: 'Mutation';
  _?: Maybe<Scalars['Int']['output']>;
  createAlbum?: Maybe<Album>;
  createComment?: Maybe<Comment>;
  createPhoto?: Maybe<Photo>;
  createPost?: Maybe<Post>;
  createTodo?: Maybe<Todo>;
  createUser?: Maybe<User>;
  deleteAlbum?: Maybe<Scalars['Boolean']['output']>;
  deleteComment?: Maybe<Scalars['Boolean']['output']>;
  deletePhoto?: Maybe<Scalars['Boolean']['output']>;
  deletePost?: Maybe<Scalars['Boolean']['output']>;
  deleteTodo?: Maybe<Scalars['Boolean']['output']>;
  deleteUser?: Maybe<Scalars['Boolean']['output']>;
  updateAlbum?: Maybe<Album>;
  updateComment?: Maybe<Comment>;
  updatePhoto?: Maybe<Photo>;
  updatePost?: Maybe<Post>;
  updateTodo?: Maybe<Todo>;
  updateUser?: Maybe<User>;
}

export interface MutationCreateAlbumArgs {
  input: CreateAlbumInput;
}

export interface MutationCreateCommentArgs {
  input: CreateCommentInput;
}

export interface MutationCreatePhotoArgs {
  input: CreatePhotoInput;
}

export interface MutationCreatePostArgs {
  input: CreatePostInput;
}

export interface MutationCreateTodoArgs {
  input: CreateTodoInput;
}

export interface MutationCreateUserArgs {
  input: CreateUserInput;
}

export interface MutationDeleteAlbumArgs {
  id: Scalars['ID']['input'];
}

export interface MutationDeleteCommentArgs {
  id: Scalars['ID']['input'];
}

export interface MutationDeletePhotoArgs {
  id: Scalars['ID']['input'];
}

export interface MutationDeletePostArgs {
  id: Scalars['ID']['input'];
}

export interface MutationDeleteTodoArgs {
  id: Scalars['ID']['input'];
}

export interface MutationDeleteUserArgs {
  id: Scalars['ID']['input'];
}

export interface MutationUpdateAlbumArgs {
  id: Scalars['ID']['input'];
  input: UpdateAlbumInput;
}

export interface MutationUpdateCommentArgs {
  id: Scalars['ID']['input'];
  input: UpdateCommentInput;
}

export interface MutationUpdatePhotoArgs {
  id: Scalars['ID']['input'];
  input: UpdatePhotoInput;
}

export interface MutationUpdatePostArgs {
  id: Scalars['ID']['input'];
  input: UpdatePostInput;
}

export interface MutationUpdateTodoArgs {
  id: Scalars['ID']['input'];
  input: UpdateTodoInput;
}

export interface MutationUpdateUserArgs {
  id: Scalars['ID']['input'];
  input: UpdateUserInput;
}

export enum OperatorKindEnum {
  Gte = 'GTE',
  Like = 'LIKE',
  Lte = 'LTE',
  Ne = 'NE',
}

export interface OperatorOptions {
  field?: InputMaybe<Scalars['String']['input']>;
  kind?: InputMaybe<OperatorKindEnum>;
  value?: InputMaybe<Scalars['String']['input']>;
}

export interface PageLimitPair {
  __typename?: 'PageLimitPair';
  limit?: Maybe<Scalars['Int']['output']>;
  page?: Maybe<Scalars['Int']['output']>;
}

export interface PageMetadata {
  __typename?: 'PageMetadata';
  totalCount?: Maybe<Scalars['Int']['output']>;
}

export interface PageQueryOptions {
  operators?: InputMaybe<InputMaybe<OperatorOptions>[]>;
  paginate?: InputMaybe<PaginateOptions>;
  search?: InputMaybe<SearchOptions>;
  slice?: InputMaybe<SliceOptions>;
  sort?: InputMaybe<InputMaybe<SortOptions>[]>;
}

export interface PaginateOptions {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
}

export interface PaginationLinks {
  __typename?: 'PaginationLinks';
  first?: Maybe<PageLimitPair>;
  last?: Maybe<PageLimitPair>;
  next?: Maybe<PageLimitPair>;
  prev?: Maybe<PageLimitPair>;
}

export interface Photo {
  __typename?: 'Photo';
  album?: Maybe<Album>;
  id?: Maybe<Scalars['ID']['output']>;
  thumbnailUrl?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
}

export interface PhotosPage {
  __typename?: 'PhotosPage';
  data?: Maybe<Maybe<Photo>[]>;
  links?: Maybe<PaginationLinks>;
  meta?: Maybe<PageMetadata>;
}

export interface Post {
  __typename?: 'Post';
  body?: Maybe<Scalars['String']['output']>;
  comments?: Maybe<CommentsPage>;
  id?: Maybe<Scalars['ID']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
}

export interface PostCommentsArgs {
  options?: InputMaybe<PageQueryOptions>;
}

export interface PostsPage {
  __typename?: 'PostsPage';
  data?: Maybe<Maybe<Post>[]>;
  links?: Maybe<PaginationLinks>;
  meta?: Maybe<PageMetadata>;
}

export interface Query {
  __typename?: 'Query';
  _?: Maybe<Scalars['Int']['output']>;
  album?: Maybe<Album>;
  albums?: Maybe<AlbumsPage>;
  comment?: Maybe<Comment>;
  comments?: Maybe<CommentsPage>;
  photo?: Maybe<Photo>;
  photos?: Maybe<PhotosPage>;
  post?: Maybe<Post>;
  posts?: Maybe<PostsPage>;
  todo?: Maybe<Todo>;
  todos?: Maybe<TodosPage>;
  user?: Maybe<User>;
  users?: Maybe<UsersPage>;
}

export interface QueryAlbumArgs {
  id: Scalars['ID']['input'];
}

export interface QueryAlbumsArgs {
  options?: InputMaybe<PageQueryOptions>;
}

export interface QueryCommentArgs {
  id: Scalars['ID']['input'];
}

export interface QueryCommentsArgs {
  options?: InputMaybe<PageQueryOptions>;
}

export interface QueryPhotoArgs {
  id: Scalars['ID']['input'];
}

export interface QueryPhotosArgs {
  options?: InputMaybe<PageQueryOptions>;
}

export interface QueryPostArgs {
  id: Scalars['ID']['input'];
}

export interface QueryPostsArgs {
  options?: InputMaybe<PageQueryOptions>;
}

export interface QueryTodoArgs {
  id: Scalars['ID']['input'];
}

export interface QueryTodosArgs {
  options?: InputMaybe<PageQueryOptions>;
}

export interface QueryUserArgs {
  id: Scalars['ID']['input'];
}

export interface QueryUsersArgs {
  options?: InputMaybe<PageQueryOptions>;
}

export interface SearchOptions {
  q?: InputMaybe<Scalars['String']['input']>;
}

export interface SliceOptions {
  end?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  start?: InputMaybe<Scalars['Int']['input']>;
}

export interface SortOptions {
  field?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<SortOrderEnum>;
}

export enum SortOrderEnum {
  Asc = 'ASC',
  Desc = 'DESC',
}

export interface Todo {
  __typename?: 'Todo';
  completed?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
}

export interface TodosPage {
  __typename?: 'TodosPage';
  data?: Maybe<Maybe<Todo>[]>;
  links?: Maybe<PaginationLinks>;
  meta?: Maybe<PageMetadata>;
}

export interface UpdateAlbumInput {
  title?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
}

export interface UpdateCommentInput {
  body?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
}

export interface UpdatePhotoInput {
  thumbnailUrl?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
}

export interface UpdatePostInput {
  body?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
}

export interface UpdateTodoInput {
  completed?: InputMaybe<Scalars['Boolean']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
}

export interface UpdateUserInput {
  address?: InputMaybe<AddressInput>;
  company?: InputMaybe<CompanyInput>;
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
}

export interface User {
  __typename?: 'User';
  address?: Maybe<Address>;
  albums?: Maybe<AlbumsPage>;
  company?: Maybe<Company>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  posts?: Maybe<PostsPage>;
  todos?: Maybe<TodosPage>;
  username?: Maybe<Scalars['String']['output']>;
  website?: Maybe<Scalars['String']['output']>;
}

export interface UserAlbumsArgs {
  options?: InputMaybe<PageQueryOptions>;
}

export interface UserPostsArgs {
  options?: InputMaybe<PageQueryOptions>;
}

export interface UserTodosArgs {
  options?: InputMaybe<PageQueryOptions>;
}

export interface UsersPage {
  __typename?: 'UsersPage';
  data?: Maybe<Maybe<User>[]>;
  links?: Maybe<PaginationLinks>;
  meta?: Maybe<PageMetadata>;
}

export type GetPostQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export interface GetPostQuery {
  __typename?: 'Query';
  post?: {
    __typename?: 'Post';
    id?: string | null;
    title?: string | null;
    user?: {
      __typename?: 'User';
      id?: string | null;
      username?: string | null;
    } | null;
  } | null;
}

export interface UserItemFragment {
  __typename?: 'User';
  id?: string | null;
  username?: string | null;
}

export const UserItemFragmentDoc = `
    fragment UserItem on User {
  id
  username
}
    `;
export const GetPostDocument = `
    query getPost($id: ID!) {
  post(id: $id) {
    id
    title
    user {
      ...UserItem
    }
  }
}
    ${UserItemFragmentDoc}`;

export const useGetPostQuery = <TData = GetPostQuery, TError = unknown>(
  variables: GetPostQueryVariables,
  options?: Omit<UseQueryOptions<GetPostQuery, TError, TData>, 'queryKey'> & {
    queryKey?: UseQueryOptions<GetPostQuery, TError, TData>['queryKey'];
  },
) => {
  return useQuery<GetPostQuery, TError, TData>({
    queryKey: ['getPost', variables],
    queryFn: request<GetPostQuery, GetPostQueryVariables>(
      GetPostDocument,
      variables,
    ),
    ...options,
  });
};

useGetPostQuery.getKey = (variables: GetPostQueryVariables) => [
  'getPost',
  variables,
];

useGetPostQuery.fetcher = (
  variables: GetPostQueryVariables,
  options?: RequestInit['headers'],
) =>
  request<GetPostQuery, GetPostQueryVariables>(
    GetPostDocument,
    variables,
    options,
  );
