import { NetworkStatus } from "@apollo/client"
import { useAllPostsQuery } from "../../generated/graphql"

export const allPostsQueryVars = {
  skip: 0,
  first: 2
}

const PostList = () => {
  const { loading, data, error, fetchMore, networkStatus } = useAllPostsQuery({
    variables: allPostsQueryVars,
    notifyOnNetworkStatusChange: true
  })

  const loadingMorePosts = networkStatus === NetworkStatus.fetchMore

  const loadMorePosts = () => {
    fetchMore({
      variables: {
        skip: allPosts!.length
      }
    })
  }

  if (error) return <div>error loading posts</div>
  if (loading && !loadingMorePosts) return <div>Loading</div>

  const allPosts = data?.allPosts
  const _allPostsMeta = data?._allPostsMeta
  const areMorePosts = allPosts!.length < _allPostsMeta!.count

  return (
    <section>
      <ul>
        {allPosts!.map((post, index) => (
          <li key={post.id}>
            <div>
              <span>{index + 1}. </span>
              <div>{post.title}</div>
              <div>{post.category.name}</div>
              <div>{post.author.username}</div>
            </div>
          </li>
        ))}
      </ul>
      {areMorePosts && (
        <button onClick={() => loadMorePosts()} disabled={loadingMorePosts}>
          {loadingMorePosts ? "Loading..." : "Show More"}
        </button>
      )}
      <style jsx>{`
        section {
          padding-bottom: 20px;
        }
        li {
          display: block;
          margin-bottom: 10px;
        }
        div {
          align-items: center;
          display: flex;
        }
        a {
          font-size: 14px;
          margin-right: 10px;
          text-decoration: none;
          padding-bottom: 0;
          border: 0;
        }
        span {
          font-size: 14px;
          margin-right: 5px;
        }
        ul {
          margin: 0;
          padding: 0;
        }
        button:before {
          align-self: center;
          border-style: solid;
          border-width: 6px 4px 0 4px;
          border-color: #ffffff transparent transparent transparent;
          content: "";
          height: 0;
          margin-right: 5px;
          width: 0;
        }
      `}</style>
    </section>
  )
}

export default PostList
