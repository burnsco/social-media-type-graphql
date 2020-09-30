import { createApolloMock } from "apollo-typed-documents"

const operations = {}

export default createApolloMock(operations)

operations.createComment = {}
operations.createComment.variables = (values = {}, options = {}) => {
  const __typename = ""
  values = (({ data = undefined }) => ({ data }))(values)
  values.__typename = __typename
  return {
    data: CommentInput(values.data || undefined, options)
  }
}
operations.createComment.data = (values = {}, options = {}) => {
  const __typename = ""
  values = (({ createComment = null }) => ({ createComment }))(values)
  values.__typename = __typename
  return {
    createComment: ((values = {}, options = {}) => {
      const __typename = "CommentMutationResponse"
      values = (({ comment = null, post = null }) => ({ comment, post }))(
        values
      )
      values.__typename = __typename
      return {
        comment: !values.comment
          ? values.comment
          : ((values = {}, options = {}) => {
              const __typename = "Comment"
              values = (({
                id = null,
                body = null,
                createdBy = null,
                post = null
              }) => ({ id, body, createdBy, post }))(values)
              values.__typename = __typename
              return {
                id:
                  values.id === null || values.id === undefined
                    ? options.getDefaultScalarValue({
                        scalarTypeName: "ID",
                        mappedTypeName: "string",
                        fieldName: "id",
                        __typename,
                        scalarValues: options.scalarValues
                      })
                    : values.id,
                body:
                  values.body === null || values.body === undefined
                    ? options.getDefaultScalarValue({
                        scalarTypeName: "String",
                        mappedTypeName: "string",
                        fieldName: "body",
                        __typename,
                        scalarValues: options.scalarValues
                      })
                    : values.body,
                createdBy: ((values = {}, options = {}) => {
                  const __typename = "User"
                  values = (({ username = null }) => ({ username }))(values)
                  values.__typename = __typename
                  return {
                    username:
                      values.username === null || values.username === undefined
                        ? options.getDefaultScalarValue({
                            scalarTypeName: "String",
                            mappedTypeName: "string",
                            fieldName: "username",
                            __typename,
                            scalarValues: options.scalarValues
                          })
                        : values.username,
                    ...(options.addTypename ? { __typename } : {})
                  }
                })(values.createdBy || undefined, options),
                post: ((values = {}, options = {}) => {
                  const __typename = "Post"
                  values = (({ id = null }) => ({ id }))(values)
                  values.__typename = __typename
                  return {
                    id:
                      values.id === null || values.id === undefined
                        ? options.getDefaultScalarValue({
                            scalarTypeName: "ID",
                            mappedTypeName: "string",
                            fieldName: "id",
                            __typename,
                            scalarValues: options.scalarValues
                          })
                        : values.id,
                    ...(options.addTypename ? { __typename } : {})
                  }
                })(values.post || undefined, options),
                ...(options.addTypename ? { __typename } : {})
              }
            })(values.comment, options),
        post: !values.post
          ? values.post
          : ((values = {}, options = {}) => {
              const __typename = "Post"
              values = (({
                id = null,
                title = null,
                totalComments = null,
                totalVotes = null,
                comments = null
              }) => ({ id, title, totalComments, totalVotes, comments }))(
                values
              )
              values.__typename = __typename
              return {
                id:
                  values.id === null || values.id === undefined
                    ? options.getDefaultScalarValue({
                        scalarTypeName: "ID",
                        mappedTypeName: "string",
                        fieldName: "id",
                        __typename,
                        scalarValues: options.scalarValues
                      })
                    : values.id,
                title:
                  values.title === null || values.title === undefined
                    ? options.getDefaultScalarValue({
                        scalarTypeName: "String",
                        mappedTypeName: "string",
                        fieldName: "title",
                        __typename,
                        scalarValues: options.scalarValues
                      })
                    : values.title,
                totalComments: !values.totalComments
                  ? values.totalComments
                  : ((values = {}, options = {}) => {
                      const __typename = "_QueryMeta"
                      values = (({ count = null }) => ({ count }))(values)
                      values.__typename = __typename
                      return {
                        count: values.count,
                        ...(options.addTypename ? { __typename } : {})
                      }
                    })(values.totalComments, options),
                totalVotes: !values.totalVotes
                  ? values.totalVotes
                  : ((values = {}, options = {}) => {
                      const __typename = "_QueryMeta"
                      values = (({ count = null }) => ({ count }))(values)
                      values.__typename = __typename
                      return {
                        count: values.count,
                        ...(options.addTypename ? { __typename } : {})
                      }
                    })(values.totalVotes, options),
                comments: !values.comments
                  ? values.comments
                  : values.comments.map(item =>
                      ((values = {}, options = {}) => {
                        const __typename = "Comment"
                        values = (({ id = null, createdBy = null }) => ({
                          id,
                          createdBy
                        }))(values)
                        values.__typename = __typename
                        return {
                          id:
                            values.id === null || values.id === undefined
                              ? options.getDefaultScalarValue({
                                  scalarTypeName: "ID",
                                  mappedTypeName: "string",
                                  fieldName: "id",
                                  __typename,
                                  scalarValues: options.scalarValues
                                })
                              : values.id,
                          createdBy: ((values = {}, options = {}) => {
                            const __typename = "User"
                            values = (({ username = null }) => ({ username }))(
                              values
                            )
                            values.__typename = __typename
                            return {
                              username:
                                values.username === null ||
                                values.username === undefined
                                  ? options.getDefaultScalarValue({
                                      scalarTypeName: "String",
                                      mappedTypeName: "string",
                                      fieldName: "username",
                                      __typename,
                                      scalarValues: options.scalarValues
                                    })
                                  : values.username,
                              ...(options.addTypename ? { __typename } : {})
                            }
                          })(values.createdBy || undefined, options),
                          ...(options.addTypename ? { __typename } : {})
                        }
                      })(item, options)
                    ),
                ...(options.addTypename ? { __typename } : {})
              }
            })(values.post, options),
        ...(options.addTypename ? { __typename } : {})
      }
    })(values.createComment || undefined, options)
  }
}

operations.createPost = {}
operations.createPost.variables = (values = {}, options = {}) => {
  const __typename = ""
  values = (({ data = undefined }) => ({ data }))(values)
  values.__typename = __typename
  return {
    data: PostInput(values.data || undefined, options)
  }
}
operations.createPost.data = (values = {}, options = {}) => {
  const __typename = ""
  values = (({ createPost = null }) => ({ createPost }))(values)
  values.__typename = __typename
  return {
    createPost: ((values = {}, options = {}) => {
      const __typename = "PostMutationResponse"
      values = (({ post = null, errors = null }) => ({ post, errors }))(values)
      values.__typename = __typename
      return {
        post: !values.post
          ? values.post
          : ((values = {}, options = {}) => {
              const __typename = "Post"
              values = (({
                createdAt = null,
                updatedAt = null,
                id = null,
                title = null,
                text = null,
                video = null,
                image = null,
                link = null
              }) => ({
                createdAt,
                updatedAt,
                id,
                title,
                text,
                video,
                image,
                link
              }))(values)
              values.__typename = __typename
              return {
                createdAt:
                  values.createdAt === null || values.createdAt === undefined
                    ? options.getDefaultScalarValue({
                        scalarTypeName: "String",
                        mappedTypeName: "string",
                        fieldName: "createdAt",
                        __typename,
                        scalarValues: options.scalarValues
                      })
                    : values.createdAt,
                updatedAt:
                  values.updatedAt === null || values.updatedAt === undefined
                    ? options.getDefaultScalarValue({
                        scalarTypeName: "String",
                        mappedTypeName: "string",
                        fieldName: "updatedAt",
                        __typename,
                        scalarValues: options.scalarValues
                      })
                    : values.updatedAt,
                id:
                  values.id === null || values.id === undefined
                    ? options.getDefaultScalarValue({
                        scalarTypeName: "ID",
                        mappedTypeName: "string",
                        fieldName: "id",
                        __typename,
                        scalarValues: options.scalarValues
                      })
                    : values.id,
                title:
                  values.title === null || values.title === undefined
                    ? options.getDefaultScalarValue({
                        scalarTypeName: "String",
                        mappedTypeName: "string",
                        fieldName: "title",
                        __typename,
                        scalarValues: options.scalarValues
                      })
                    : values.title,
                text: values.text,
                video: values.video,
                image: values.image,
                link: values.link,
                ...(options.addTypename ? { __typename } : {})
              }
            })(values.post, options),
        errors: !values.errors
          ? values.errors
          : values.errors.map(item =>
              ((values = {}, options = {}) => {
                const __typename = "FieldError"
                values = (({ field = null, message = null }) => ({
                  field,
                  message
                }))(values)
                values.__typename = __typename
                return {
                  field:
                    values.field === null || values.field === undefined
                      ? options.getDefaultScalarValue({
                          scalarTypeName: "String",
                          mappedTypeName: "string",
                          fieldName: "field",
                          __typename,
                          scalarValues: options.scalarValues
                        })
                      : values.field,
                  message:
                    values.message === null || values.message === undefined
                      ? options.getDefaultScalarValue({
                          scalarTypeName: "String",
                          mappedTypeName: "string",
                          fieldName: "message",
                          __typename,
                          scalarValues: options.scalarValues
                        })
                      : values.message,
                  ...(options.addTypename ? { __typename } : {})
                }
              })(item, options)
            ),
        ...(options.addTypename ? { __typename } : {})
      }
    })(values.createPost || undefined, options)
  }
}

operations.createSubreddit = {}
operations.createSubreddit.variables = (values = {}, options = {}) => {
  const __typename = ""
  values = (({ data = undefined }) => ({ data }))(values)
  values.__typename = __typename
  return {
    data: CategoryInput(values.data || undefined, options)
  }
}
operations.createSubreddit.data = (values = {}, options = {}) => {
  const __typename = ""
  values = (({ createCategory = null }) => ({ createCategory }))(values)
  values.__typename = __typename
  return {
    createCategory: ((values = {}, options = {}) => {
      const __typename = "CategoryMutationResponse"
      values = (({ category = null, errors = null }) => ({ category, errors }))(
        values
      )
      values.__typename = __typename
      return {
        category: !values.category
          ? values.category
          : ((values = {}, options = {}) => {
              const __typename = "Category"
              values = (({ id = null, name = null }) => ({ id, name }))(values)
              values.__typename = __typename
              return {
                id:
                  values.id === null || values.id === undefined
                    ? options.getDefaultScalarValue({
                        scalarTypeName: "ID",
                        mappedTypeName: "string",
                        fieldName: "id",
                        __typename,
                        scalarValues: options.scalarValues
                      })
                    : values.id,
                name:
                  values.name === null || values.name === undefined
                    ? options.getDefaultScalarValue({
                        scalarTypeName: "String",
                        mappedTypeName: "string",
                        fieldName: "name",
                        __typename,
                        scalarValues: options.scalarValues
                      })
                    : values.name,
                ...(options.addTypename ? { __typename } : {})
              }
            })(values.category, options),
        errors: !values.errors
          ? values.errors
          : values.errors.map(item =>
              ((values = {}, options = {}) => {
                const __typename = "FieldError"
                values = (({ field = null, message = null }) => ({
                  field,
                  message
                }))(values)
                values.__typename = __typename
                return {
                  field:
                    values.field === null || values.field === undefined
                      ? options.getDefaultScalarValue({
                          scalarTypeName: "String",
                          mappedTypeName: "string",
                          fieldName: "field",
                          __typename,
                          scalarValues: options.scalarValues
                        })
                      : values.field,
                  message:
                    values.message === null || values.message === undefined
                      ? options.getDefaultScalarValue({
                          scalarTypeName: "String",
                          mappedTypeName: "string",
                          fieldName: "message",
                          __typename,
                          scalarValues: options.scalarValues
                        })
                      : values.message,
                  ...(options.addTypename ? { __typename } : {})
                }
              })(item, options)
            ),
        ...(options.addTypename ? { __typename } : {})
      }
    })(values.createCategory || undefined, options)
  }
}

operations.Logout = {}
operations.Logout.variables = (values = {}, options = {}) => {
  const __typename = ""
  values = (({}) => ({}))(values)
  values.__typename = __typename
  return {}
}
operations.Logout.data = (values = {}, options = {}) => {
  const __typename = ""
  values = (({ logout = null }) => ({ logout }))(values)
  values.__typename = __typename
  return {
    logout: ((values = {}, options = {}) => {
      const __typename = "LogoutMutationResponse"
      values = (({ message = null, success = null }) => ({ message, success }))(
        values
      )
      values.__typename = __typename
      return {
        message:
          values.message === null || values.message === undefined
            ? options.getDefaultScalarValue({
                scalarTypeName: "String",
                mappedTypeName: "string",
                fieldName: "message",
                __typename,
                scalarValues: options.scalarValues
              })
            : values.message,
        success:
          values.success === null || values.success === undefined
            ? options.getDefaultScalarValue({
                scalarTypeName: "Boolean",
                mappedTypeName: "boolean",
                fieldName: "success",
                __typename,
                scalarValues: options.scalarValues
              })
            : values.success,
        ...(options.addTypename ? { __typename } : {})
      }
    })(values.logout || undefined, options)
  }
}

operations.Register = {}
operations.Register.variables = (values = {}, options = {}) => {
  const __typename = ""
  values = (({ data = undefined }) => ({ data }))(values)
  values.__typename = __typename
  return {
    data: RegisterInput(values.data || undefined, options)
  }
}
operations.Register.data = (values = {}, options = {}) => {
  const __typename = ""
  values = (({ register = null }) => ({ register }))(values)
  values.__typename = __typename
  return {
    register: ((values = {}, options = {}) => {
      const __typename = "UserMutationResponse"
      values = (({ user = null, errors = null }) => ({ user, errors }))(values)
      values.__typename = __typename
      return {
        user: !values.user
          ? values.user
          : ((values = {}, options = {}) => {
              const __typename = "User"
              values = (({ id = null, username = null }) => ({ id, username }))(
                values
              )
              values.__typename = __typename
              return {
                id:
                  values.id === null || values.id === undefined
                    ? options.getDefaultScalarValue({
                        scalarTypeName: "ID",
                        mappedTypeName: "string",
                        fieldName: "id",
                        __typename,
                        scalarValues: options.scalarValues
                      })
                    : values.id,
                username:
                  values.username === null || values.username === undefined
                    ? options.getDefaultScalarValue({
                        scalarTypeName: "String",
                        mappedTypeName: "string",
                        fieldName: "username",
                        __typename,
                        scalarValues: options.scalarValues
                      })
                    : values.username,
                ...(options.addTypename ? { __typename } : {})
              }
            })(values.user, options),
        errors: !values.errors
          ? values.errors
          : values.errors.map(item =>
              ((values = {}, options = {}) => {
                const __typename = "FieldError"
                values = (({ field = null, message = null }) => ({
                  field,
                  message
                }))(values)
                values.__typename = __typename
                return {
                  field:
                    values.field === null || values.field === undefined
                      ? options.getDefaultScalarValue({
                          scalarTypeName: "String",
                          mappedTypeName: "string",
                          fieldName: "field",
                          __typename,
                          scalarValues: options.scalarValues
                        })
                      : values.field,
                  message:
                    values.message === null || values.message === undefined
                      ? options.getDefaultScalarValue({
                          scalarTypeName: "String",
                          mappedTypeName: "string",
                          fieldName: "message",
                          __typename,
                          scalarValues: options.scalarValues
                        })
                      : values.message,
                  ...(options.addTypename ? { __typename } : {})
                }
              })(item, options)
            ),
        ...(options.addTypename ? { __typename } : {})
      }
    })(values.register || undefined, options)
  }
}

operations.Categories = {}
operations.Categories.variables = (values = {}, options = {}) => {
  const __typename = ""
  values = (({}) => ({}))(values)
  values.__typename = __typename
  return {}
}
operations.Categories.data = (values = {}, options = {}) => {
  const __typename = ""
  values = (({ categories = null }) => ({ categories }))(values)
  values.__typename = __typename
  return {
    categories: (values.categories || []).map(item =>
      ((values = {}, options = {}) => {
        const __typename = "Category"
        values = (({ id = null, name = null }) => ({ id, name }))(values)
        values.__typename = __typename
        return {
          id:
            values.id === null || values.id === undefined
              ? options.getDefaultScalarValue({
                  scalarTypeName: "ID",
                  mappedTypeName: "string",
                  fieldName: "id",
                  __typename,
                  scalarValues: options.scalarValues
                })
              : values.id,
          name:
            values.name === null || values.name === undefined
              ? options.getDefaultScalarValue({
                  scalarTypeName: "String",
                  mappedTypeName: "string",
                  fieldName: "name",
                  __typename,
                  scalarValues: options.scalarValues
                })
              : values.name,
          ...(options.addTypename ? { __typename } : {})
        }
      })(item, options)
    )
  }
}

operations.Comment = {}
operations.Comment.variables = (values = {}, options = {}) => {
  const __typename = ""
  values = (({ postId = undefined }) => ({ postId }))(values)
  values.__typename = __typename
  return {
    postId: values.postId
  }
}
operations.Comment.data = (values = {}, options = {}) => {
  const __typename = ""
  values = (({ comment = null }) => ({ comment }))(values)
  values.__typename = __typename
  return {
    comment: !values.comment
      ? values.comment
      : ((values = {}, options = {}) => {
          const __typename = "Comment"
          values = (({
            id = null,
            createdAt = null,
            updatedAt = null,
            body = null,
            createdBy = null
          }) => ({ id, createdAt, updatedAt, body, createdBy }))(values)
          values.__typename = __typename
          return {
            id:
              values.id === null || values.id === undefined
                ? options.getDefaultScalarValue({
                    scalarTypeName: "ID",
                    mappedTypeName: "string",
                    fieldName: "id",
                    __typename,
                    scalarValues: options.scalarValues
                  })
                : values.id,
            createdAt:
              values.createdAt === null || values.createdAt === undefined
                ? options.getDefaultScalarValue({
                    scalarTypeName: "String",
                    mappedTypeName: "string",
                    fieldName: "createdAt",
                    __typename,
                    scalarValues: options.scalarValues
                  })
                : values.createdAt,
            updatedAt:
              values.updatedAt === null || values.updatedAt === undefined
                ? options.getDefaultScalarValue({
                    scalarTypeName: "String",
                    mappedTypeName: "string",
                    fieldName: "updatedAt",
                    __typename,
                    scalarValues: options.scalarValues
                  })
                : values.updatedAt,
            body:
              values.body === null || values.body === undefined
                ? options.getDefaultScalarValue({
                    scalarTypeName: "String",
                    mappedTypeName: "string",
                    fieldName: "body",
                    __typename,
                    scalarValues: options.scalarValues
                  })
                : values.body,
            createdBy: ((values = {}, options = {}) => {
              const __typename = "User"
              values = (({ username = null }) => ({ username }))(values)
              values.__typename = __typename
              return {
                username:
                  values.username === null || values.username === undefined
                    ? options.getDefaultScalarValue({
                        scalarTypeName: "String",
                        mappedTypeName: "string",
                        fieldName: "username",
                        __typename,
                        scalarValues: options.scalarValues
                      })
                    : values.username,
                ...(options.addTypename ? { __typename } : {})
              }
            })(values.createdBy || undefined, options),
            ...(options.addTypename ? { __typename } : {})
          }
        })(values.comment, options)
  }
}

operations.Comments = {}
operations.Comments.variables = (values = {}, options = {}) => {
  const __typename = ""
  values = (({
    first = undefined,
    orderBy = undefined,
    skip = undefined,
    postId = undefined
  }) => ({ first, orderBy, skip, postId }))(values)
  values.__typename = __typename
  return {
    first: values.first,
    orderBy: !values.orderBy
      ? values.orderBy
      : PostOrderBy(values.orderBy, options),
    skip: values.skip,
    postId: values.postId
  }
}
operations.Comments.data = (values = {}, options = {}) => {
  const __typename = ""
  values = (({ comments = null }) => ({ comments }))(values)
  values.__typename = __typename
  return {
    comments: !values.comments
      ? values.comments
      : values.comments.map(item =>
          ((values = {}, options = {}) => {
            const __typename = "Comment"
            values = (({
              id = null,
              createdAt = null,
              updatedAt = null,
              body = null,
              createdBy = null
            }) => ({ id, createdAt, updatedAt, body, createdBy }))(values)
            values.__typename = __typename
            return {
              id:
                values.id === null || values.id === undefined
                  ? options.getDefaultScalarValue({
                      scalarTypeName: "ID",
                      mappedTypeName: "string",
                      fieldName: "id",
                      __typename,
                      scalarValues: options.scalarValues
                    })
                  : values.id,
              createdAt:
                values.createdAt === null || values.createdAt === undefined
                  ? options.getDefaultScalarValue({
                      scalarTypeName: "String",
                      mappedTypeName: "string",
                      fieldName: "createdAt",
                      __typename,
                      scalarValues: options.scalarValues
                    })
                  : values.createdAt,
              updatedAt:
                values.updatedAt === null || values.updatedAt === undefined
                  ? options.getDefaultScalarValue({
                      scalarTypeName: "String",
                      mappedTypeName: "string",
                      fieldName: "updatedAt",
                      __typename,
                      scalarValues: options.scalarValues
                    })
                  : values.updatedAt,
              body:
                values.body === null || values.body === undefined
                  ? options.getDefaultScalarValue({
                      scalarTypeName: "String",
                      mappedTypeName: "string",
                      fieldName: "body",
                      __typename,
                      scalarValues: options.scalarValues
                    })
                  : values.body,
              createdBy: ((values = {}, options = {}) => {
                const __typename = "User"
                values = (({ username = null }) => ({ username }))(values)
                values.__typename = __typename
                return {
                  username:
                    values.username === null || values.username === undefined
                      ? options.getDefaultScalarValue({
                          scalarTypeName: "String",
                          mappedTypeName: "string",
                          fieldName: "username",
                          __typename,
                          scalarValues: options.scalarValues
                        })
                      : values.username,
                  ...(options.addTypename ? { __typename } : {})
                }
              })(values.createdBy || undefined, options),
              ...(options.addTypename ? { __typename } : {})
            }
          })(item, options)
        )
  }
}

operations.Me = {}
operations.Me.variables = (values = {}, options = {}) => {
  const __typename = ""
  values = (({}) => ({}))(values)
  values.__typename = __typename
  return {}
}
operations.Me.data = (values = {}, options = {}) => {
  const __typename = ""
  values = (({ me = null }) => ({ me }))(values)
  values.__typename = __typename
  return {
    me: !values.me
      ? values.me
      : ((values = {}, options = {}) => {
          const __typename = "User"
          values = (({ id = null, username = null }) => ({ id, username }))(
            values
          )
          values.__typename = __typename
          return {
            id:
              values.id === null || values.id === undefined
                ? options.getDefaultScalarValue({
                    scalarTypeName: "ID",
                    mappedTypeName: "string",
                    fieldName: "id",
                    __typename,
                    scalarValues: options.scalarValues
                  })
                : values.id,
            username:
              values.username === null || values.username === undefined
                ? options.getDefaultScalarValue({
                    scalarTypeName: "String",
                    mappedTypeName: "string",
                    fieldName: "username",
                    __typename,
                    scalarValues: options.scalarValues
                  })
                : values.username,
            ...(options.addTypename ? { __typename } : {})
          }
        })(values.me, options)
  }
}

operations.Post = {}
operations.Post.variables = (values = {}, options = {}) => {
  const __typename = ""
  values = (({ postId = undefined }) => ({ postId }))(values)
  values.__typename = __typename
  return {
    postId: values.postId
  }
}
operations.Post.data = (values = {}, options = {}) => {
  const __typename = ""
  values = (({ post = null }) => ({ post }))(values)
  values.__typename = __typename
  return {
    post: !values.post
      ? values.post
      : ((values = {}, options = {}) => {
          const __typename = "Post"
          values = (({
            id = null,
            createdAt = null,
            updatedAt = null,
            title = null,
            text = null,
            image = null,
            video = null,
            link = null,
            comments = null,
            author = null,
            category = null,
            totalComments = null,
            totalVotes = null
          }) => ({
            id,
            createdAt,
            updatedAt,
            title,
            text,
            image,
            video,
            link,
            comments,
            author,
            category,
            totalComments,
            totalVotes
          }))(values)
          values.__typename = __typename
          return {
            id:
              values.id === null || values.id === undefined
                ? options.getDefaultScalarValue({
                    scalarTypeName: "ID",
                    mappedTypeName: "string",
                    fieldName: "id",
                    __typename,
                    scalarValues: options.scalarValues
                  })
                : values.id,
            createdAt:
              values.createdAt === null || values.createdAt === undefined
                ? options.getDefaultScalarValue({
                    scalarTypeName: "String",
                    mappedTypeName: "string",
                    fieldName: "createdAt",
                    __typename,
                    scalarValues: options.scalarValues
                  })
                : values.createdAt,
            updatedAt:
              values.updatedAt === null || values.updatedAt === undefined
                ? options.getDefaultScalarValue({
                    scalarTypeName: "String",
                    mappedTypeName: "string",
                    fieldName: "updatedAt",
                    __typename,
                    scalarValues: options.scalarValues
                  })
                : values.updatedAt,
            title:
              values.title === null || values.title === undefined
                ? options.getDefaultScalarValue({
                    scalarTypeName: "String",
                    mappedTypeName: "string",
                    fieldName: "title",
                    __typename,
                    scalarValues: options.scalarValues
                  })
                : values.title,
            text: values.text,
            image: values.image,
            video: values.video,
            link: values.link,
            comments: !values.comments
              ? values.comments
              : values.comments.map(item =>
                  ((values = {}, options = {}) => {
                    const __typename = "Comment"
                    values = (({
                      id = null,
                      createdAt = null,
                      updatedAt = null,
                      body = null,
                      createdBy = null
                    }) => ({ id, createdAt, updatedAt, body, createdBy }))(
                      values
                    )
                    values.__typename = __typename
                    return {
                      id:
                        values.id === null || values.id === undefined
                          ? options.getDefaultScalarValue({
                              scalarTypeName: "ID",
                              mappedTypeName: "string",
                              fieldName: "id",
                              __typename,
                              scalarValues: options.scalarValues
                            })
                          : values.id,
                      createdAt:
                        values.createdAt === null ||
                        values.createdAt === undefined
                          ? options.getDefaultScalarValue({
                              scalarTypeName: "String",
                              mappedTypeName: "string",
                              fieldName: "createdAt",
                              __typename,
                              scalarValues: options.scalarValues
                            })
                          : values.createdAt,
                      updatedAt:
                        values.updatedAt === null ||
                        values.updatedAt === undefined
                          ? options.getDefaultScalarValue({
                              scalarTypeName: "String",
                              mappedTypeName: "string",
                              fieldName: "updatedAt",
                              __typename,
                              scalarValues: options.scalarValues
                            })
                          : values.updatedAt,
                      body:
                        values.body === null || values.body === undefined
                          ? options.getDefaultScalarValue({
                              scalarTypeName: "String",
                              mappedTypeName: "string",
                              fieldName: "body",
                              __typename,
                              scalarValues: options.scalarValues
                            })
                          : values.body,
                      createdBy: ((values = {}, options = {}) => {
                        const __typename = "User"
                        values = (({ username = null }) => ({ username }))(
                          values
                        )
                        values.__typename = __typename
                        return {
                          username:
                            values.username === null ||
                            values.username === undefined
                              ? options.getDefaultScalarValue({
                                  scalarTypeName: "String",
                                  mappedTypeName: "string",
                                  fieldName: "username",
                                  __typename,
                                  scalarValues: options.scalarValues
                                })
                              : values.username,
                          ...(options.addTypename ? { __typename } : {})
                        }
                      })(values.createdBy || undefined, options),
                      ...(options.addTypename ? { __typename } : {})
                    }
                  })(item, options)
                ),
            author: ((values = {}, options = {}) => {
              const __typename = "User"
              values = (({ id = null, username = null }) => ({ id, username }))(
                values
              )
              values.__typename = __typename
              return {
                id:
                  values.id === null || values.id === undefined
                    ? options.getDefaultScalarValue({
                        scalarTypeName: "ID",
                        mappedTypeName: "string",
                        fieldName: "id",
                        __typename,
                        scalarValues: options.scalarValues
                      })
                    : values.id,
                username:
                  values.username === null || values.username === undefined
                    ? options.getDefaultScalarValue({
                        scalarTypeName: "String",
                        mappedTypeName: "string",
                        fieldName: "username",
                        __typename,
                        scalarValues: options.scalarValues
                      })
                    : values.username,
                ...(options.addTypename ? { __typename } : {})
              }
            })(values.author || undefined, options),
            category: ((values = {}, options = {}) => {
              const __typename = "Category"
              values = (({ id = null, name = null }) => ({ id, name }))(values)
              values.__typename = __typename
              return {
                id:
                  values.id === null || values.id === undefined
                    ? options.getDefaultScalarValue({
                        scalarTypeName: "ID",
                        mappedTypeName: "string",
                        fieldName: "id",
                        __typename,
                        scalarValues: options.scalarValues
                      })
                    : values.id,
                name:
                  values.name === null || values.name === undefined
                    ? options.getDefaultScalarValue({
                        scalarTypeName: "String",
                        mappedTypeName: "string",
                        fieldName: "name",
                        __typename,
                        scalarValues: options.scalarValues
                      })
                    : values.name,
                ...(options.addTypename ? { __typename } : {})
              }
            })(values.category || undefined, options),
            totalComments: !values.totalComments
              ? values.totalComments
              : ((values = {}, options = {}) => {
                  const __typename = "_QueryMeta"
                  values = (({ count = null }) => ({ count }))(values)
                  values.__typename = __typename
                  return {
                    count: values.count,
                    ...(options.addTypename ? { __typename } : {})
                  }
                })(values.totalComments, options),
            totalVotes: !values.totalVotes
              ? values.totalVotes
              : ((values = {}, options = {}) => {
                  const __typename = "_QueryMeta"
                  values = (({ count = null }) => ({ count }))(values)
                  values.__typename = __typename
                  return {
                    count: values.count,
                    ...(options.addTypename ? { __typename } : {})
                  }
                })(values.totalVotes, options),
            ...(options.addTypename ? { __typename } : {})
          }
        })(values.post, options)
  }
}

operations.Posts = {}
operations.Posts.variables = (values = {}, options = {}) => {
  const __typename = ""
  values = (({
    first = undefined,
    orderBy = undefined,
    skip = undefined,
    category = undefined
  }) => ({ first, orderBy, skip, category }))(values)
  values.__typename = __typename
  return {
    first: values.first,
    orderBy: !values.orderBy
      ? values.orderBy
      : PostOrderBy(values.orderBy, options),
    skip: values.skip,
    category: values.category
  }
}
operations.Posts.data = (values = {}, options = {}) => {
  const __typename = ""
  values = (({
    posts = null,
    _allPostsMeta = null,
    _categoryPostsMeta = null
  }) => ({ posts, _allPostsMeta, _categoryPostsMeta }))(values)
  values.__typename = __typename
  return {
    posts: !values.posts
      ? values.posts
      : values.posts.map(item =>
          ((values = {}, options = {}) => {
            const __typename = "Post"
            values = (({
              id = null,
              createdAt = null,
              updatedAt = null,
              title = null,
              text = null,
              image = null,
              video = null,
              link = null,
              comments = null,
              category = null,
              author = null,
              totalComments = null,
              totalVotes = null
            }) => ({
              id,
              createdAt,
              updatedAt,
              title,
              text,
              image,
              video,
              link,
              comments,
              category,
              author,
              totalComments,
              totalVotes
            }))(values)
            values.__typename = __typename
            return {
              id:
                values.id === null || values.id === undefined
                  ? options.getDefaultScalarValue({
                      scalarTypeName: "ID",
                      mappedTypeName: "string",
                      fieldName: "id",
                      __typename,
                      scalarValues: options.scalarValues
                    })
                  : values.id,
              createdAt:
                values.createdAt === null || values.createdAt === undefined
                  ? options.getDefaultScalarValue({
                      scalarTypeName: "String",
                      mappedTypeName: "string",
                      fieldName: "createdAt",
                      __typename,
                      scalarValues: options.scalarValues
                    })
                  : values.createdAt,
              updatedAt:
                values.updatedAt === null || values.updatedAt === undefined
                  ? options.getDefaultScalarValue({
                      scalarTypeName: "String",
                      mappedTypeName: "string",
                      fieldName: "updatedAt",
                      __typename,
                      scalarValues: options.scalarValues
                    })
                  : values.updatedAt,
              title:
                values.title === null || values.title === undefined
                  ? options.getDefaultScalarValue({
                      scalarTypeName: "String",
                      mappedTypeName: "string",
                      fieldName: "title",
                      __typename,
                      scalarValues: options.scalarValues
                    })
                  : values.title,
              text: values.text,
              image: values.image,
              video: values.video,
              link: values.link,
              comments: !values.comments
                ? values.comments
                : values.comments.map(item =>
                    ((values = {}, options = {}) => {
                      const __typename = "Comment"
                      values = (({
                        id = null,
                        createdAt = null,
                        updatedAt = null,
                        body = null,
                        createdBy = null
                      }) => ({ id, createdAt, updatedAt, body, createdBy }))(
                        values
                      )
                      values.__typename = __typename
                      return {
                        id:
                          values.id === null || values.id === undefined
                            ? options.getDefaultScalarValue({
                                scalarTypeName: "ID",
                                mappedTypeName: "string",
                                fieldName: "id",
                                __typename,
                                scalarValues: options.scalarValues
                              })
                            : values.id,
                        createdAt:
                          values.createdAt === null ||
                          values.createdAt === undefined
                            ? options.getDefaultScalarValue({
                                scalarTypeName: "String",
                                mappedTypeName: "string",
                                fieldName: "createdAt",
                                __typename,
                                scalarValues: options.scalarValues
                              })
                            : values.createdAt,
                        updatedAt:
                          values.updatedAt === null ||
                          values.updatedAt === undefined
                            ? options.getDefaultScalarValue({
                                scalarTypeName: "String",
                                mappedTypeName: "string",
                                fieldName: "updatedAt",
                                __typename,
                                scalarValues: options.scalarValues
                              })
                            : values.updatedAt,
                        body:
                          values.body === null || values.body === undefined
                            ? options.getDefaultScalarValue({
                                scalarTypeName: "String",
                                mappedTypeName: "string",
                                fieldName: "body",
                                __typename,
                                scalarValues: options.scalarValues
                              })
                            : values.body,
                        createdBy: ((values = {}, options = {}) => {
                          const __typename = "User"
                          values = (({ username = null }) => ({ username }))(
                            values
                          )
                          values.__typename = __typename
                          return {
                            username:
                              values.username === null ||
                              values.username === undefined
                                ? options.getDefaultScalarValue({
                                    scalarTypeName: "String",
                                    mappedTypeName: "string",
                                    fieldName: "username",
                                    __typename,
                                    scalarValues: options.scalarValues
                                  })
                                : values.username,
                            ...(options.addTypename ? { __typename } : {})
                          }
                        })(values.createdBy || undefined, options),
                        ...(options.addTypename ? { __typename } : {})
                      }
                    })(item, options)
                  ),
              category: ((values = {}, options = {}) => {
                const __typename = "Category"
                values = (({ id = null, name = null }) => ({ id, name }))(
                  values
                )
                values.__typename = __typename
                return {
                  id:
                    values.id === null || values.id === undefined
                      ? options.getDefaultScalarValue({
                          scalarTypeName: "ID",
                          mappedTypeName: "string",
                          fieldName: "id",
                          __typename,
                          scalarValues: options.scalarValues
                        })
                      : values.id,
                  name:
                    values.name === null || values.name === undefined
                      ? options.getDefaultScalarValue({
                          scalarTypeName: "String",
                          mappedTypeName: "string",
                          fieldName: "name",
                          __typename,
                          scalarValues: options.scalarValues
                        })
                      : values.name,
                  ...(options.addTypename ? { __typename } : {})
                }
              })(values.category || undefined, options),
              author: ((values = {}, options = {}) => {
                const __typename = "User"
                values = (({ id = null, username = null }) => ({
                  id,
                  username
                }))(values)
                values.__typename = __typename
                return {
                  id:
                    values.id === null || values.id === undefined
                      ? options.getDefaultScalarValue({
                          scalarTypeName: "ID",
                          mappedTypeName: "string",
                          fieldName: "id",
                          __typename,
                          scalarValues: options.scalarValues
                        })
                      : values.id,
                  username:
                    values.username === null || values.username === undefined
                      ? options.getDefaultScalarValue({
                          scalarTypeName: "String",
                          mappedTypeName: "string",
                          fieldName: "username",
                          __typename,
                          scalarValues: options.scalarValues
                        })
                      : values.username,
                  ...(options.addTypename ? { __typename } : {})
                }
              })(values.author || undefined, options),
              totalComments: !values.totalComments
                ? values.totalComments
                : ((values = {}, options = {}) => {
                    const __typename = "_QueryMeta"
                    values = (({ count = null }) => ({ count }))(values)
                    values.__typename = __typename
                    return {
                      count: values.count,
                      ...(options.addTypename ? { __typename } : {})
                    }
                  })(values.totalComments, options),
              totalVotes: !values.totalVotes
                ? values.totalVotes
                : ((values = {}, options = {}) => {
                    const __typename = "_QueryMeta"
                    values = (({ count = null }) => ({ count }))(values)
                    values.__typename = __typename
                    return {
                      count: values.count,
                      ...(options.addTypename ? { __typename } : {})
                    }
                  })(values.totalVotes, options),
              ...(options.addTypename ? { __typename } : {})
            }
          })(item, options)
        ),
    _allPostsMeta: ((values = {}, options = {}) => {
      const __typename = "_QueryMeta"
      values = (({ count = null }) => ({ count }))(values)
      values.__typename = __typename
      return {
        count: values.count,
        ...(options.addTypename ? { __typename } : {})
      }
    })(values._allPostsMeta || undefined, options),
    _categoryPostsMeta: ((values = {}, options = {}) => {
      const __typename = "_QueryMeta"
      values = (({ count = null }) => ({ count }))(values)
      values.__typename = __typename
      return {
        count: values.count,
        ...(options.addTypename ? { __typename } : {})
      }
    })(values._categoryPostsMeta || undefined, options)
  }
}

operations.Users = {}
operations.Users.variables = (values = {}, options = {}) => {
  const __typename = ""
  values = (({}) => ({}))(values)
  values.__typename = __typename
  return {}
}
operations.Users.data = (values = {}, options = {}) => {
  const __typename = ""
  values = (({ users = null }) => ({ users }))(values)
  values.__typename = __typename
  return {
    users: (values.users || []).map(item =>
      ((values = {}, options = {}) => {
        const __typename = "User"
        values = (({ id = null, username = null }) => ({ id, username }))(
          values
        )
        values.__typename = __typename
        return {
          id:
            values.id === null || values.id === undefined
              ? options.getDefaultScalarValue({
                  scalarTypeName: "ID",
                  mappedTypeName: "string",
                  fieldName: "id",
                  __typename,
                  scalarValues: options.scalarValues
                })
              : values.id,
          username:
            values.username === null || values.username === undefined
              ? options.getDefaultScalarValue({
                  scalarTypeName: "String",
                  mappedTypeName: "string",
                  fieldName: "username",
                  __typename,
                  scalarValues: options.scalarValues
                })
              : values.username,
          ...(options.addTypename ? { __typename } : {})
        }
      })(item, options)
    )
  }
}

const CommentInput = (values = {}, options = {}) => {
  const __typename = "CommentInput"
  values = (({ body = undefined, postId = undefined }) => ({ body, postId }))(
    values
  )
  values.__typename = __typename
  return {
    body:
      values.body === null || values.body === undefined
        ? options.getDefaultScalarValue({
            scalarTypeName: "String",
            mappedTypeName: "string",
            fieldName: "body",
            __typename,
            scalarValues: options.scalarValues
          })
        : values.body,
    postId:
      values.postId === null || values.postId === undefined
        ? options.getDefaultScalarValue({
            scalarTypeName: "ID",
            mappedTypeName: "string",
            fieldName: "postId",
            __typename,
            scalarValues: options.scalarValues
          })
        : values.postId
  }
}

const PostInput = (values = {}, options = {}) => {
  const __typename = "PostInput"
  values = (({
    categoryId = undefined,
    userId = undefined,
    title = undefined,
    text = undefined,
    image = undefined,
    video = undefined,
    link = undefined
  }) => ({ categoryId, userId, title, text, image, video, link }))(values)
  values.__typename = __typename
  return {
    categoryId:
      values.categoryId === null || values.categoryId === undefined
        ? options.getDefaultScalarValue({
            scalarTypeName: "ID",
            mappedTypeName: "string",
            fieldName: "categoryId",
            __typename,
            scalarValues: options.scalarValues
          })
        : values.categoryId,
    userId:
      values.userId === null || values.userId === undefined
        ? options.getDefaultScalarValue({
            scalarTypeName: "ID",
            mappedTypeName: "string",
            fieldName: "userId",
            __typename,
            scalarValues: options.scalarValues
          })
        : values.userId,
    title:
      values.title === null || values.title === undefined
        ? options.getDefaultScalarValue({
            scalarTypeName: "String",
            mappedTypeName: "string",
            fieldName: "title",
            __typename,
            scalarValues: options.scalarValues
          })
        : values.title,
    text: values.text,
    image: values.image,
    video: values.video,
    link: values.link
  }
}

const CategoryInput = (values = {}, options = {}) => {
  const __typename = "CategoryInput"
  values = (({ name = undefined }) => ({ name }))(values)
  values.__typename = __typename
  return {
    name:
      values.name === null || values.name === undefined
        ? options.getDefaultScalarValue({
            scalarTypeName: "String",
            mappedTypeName: "string",
            fieldName: "name",
            __typename,
            scalarValues: options.scalarValues
          })
        : values.name
  }
}

const RegisterInput = (values = {}, options = {}) => {
  const __typename = "RegisterInput"
  values = (({
    email = undefined,
    username = undefined,
    password = undefined
  }) => ({ email, username, password }))(values)
  values.__typename = __typename
  return {
    email:
      values.email === null || values.email === undefined
        ? options.getDefaultScalarValue({
            scalarTypeName: "String",
            mappedTypeName: "string",
            fieldName: "email",
            __typename,
            scalarValues: options.scalarValues
          })
        : values.email,
    username:
      values.username === null || values.username === undefined
        ? options.getDefaultScalarValue({
            scalarTypeName: "String",
            mappedTypeName: "string",
            fieldName: "username",
            __typename,
            scalarValues: options.scalarValues
          })
        : values.username,
    password:
      values.password === null || values.password === undefined
        ? options.getDefaultScalarValue({
            scalarTypeName: "String",
            mappedTypeName: "string",
            fieldName: "password",
            __typename,
            scalarValues: options.scalarValues
          })
        : values.password
  }
}

const PostOrderBy = (values = {}, options = {}) => {
  const __typename = "PostOrderBy"
  values = (({
    createdAt = undefined,
    title = undefined,
    updatedAt = undefined,
    votes = undefined
  }) => ({ createdAt, title, updatedAt, votes }))(values)
  values.__typename = __typename
  return {
    createdAt: values.createdAt,
    title: values.title,
    updatedAt: values.updatedAt,
    votes: values.votes
  }
}
