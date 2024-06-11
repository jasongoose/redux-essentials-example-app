import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function SinglePostPage({ match }) {
  const { postId } = match.params

  const post = useSelector((state) =>
    state.posts.find((post) => post.id === postId),
  )

  return post ? (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <p className="post-content">{post.content}</p>
        <Link to={`/editPost/${post.id}`} className="button">
          Edit Post
        </Link>
      </article>
    </section>
  ) : (
    <section>
      <h2>Post not found!</h2>
    </section>
  )
}
