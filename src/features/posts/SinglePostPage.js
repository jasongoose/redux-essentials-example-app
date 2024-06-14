import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'

import { selectPostById } from './postsSlice'

export default function SinglePostPage({ match }) {
  const { postId } = match.params

  const post = useSelector(selectPostById(postId))

  return post ? (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <p className="post-content">{post.content}</p>
        <PostAuthor userId={post.user} />
        <TimeAgo timeStamp={post.date} />
        <br />
        <ReactionButtons post={post} />
        <br />
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
