import React from 'react'
import { useSelector } from 'react-redux'

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
      </article>
    </section>
  ) : (
    <section>
      <h2>Post not found!</h2>
    </section>
  )
}
