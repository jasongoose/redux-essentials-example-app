import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'

import { selectAllPosts, fetchPostsThunk } from './postsSlice'

export default function PostsList() {
  const dispatch = useDispatch()
  const posts = useSelector(selectAllPosts)

  const orderedPosts = posts.slice().reverse()

  const postsStatus = useSelector((state) => state.posts.status)

  const renderedPosts = orderedPosts.map((post) => (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <PostAuthor userId={post.user} />
      <TimeAgo timeStamp={post.date} />
      <br />
      <ReactionButtons post={post} />
      <br />
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  ))

  useEffect(() => {
    if (postsStatus === 'idle') {
      dispatch(fetchPostsThunk())
    }
  }, [postsStatus, dispatch])

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  )
}
