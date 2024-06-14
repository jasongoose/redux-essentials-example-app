import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'
import { Spinner } from '../../components/Spinner'

import { selectAllPosts, fetchPostsThunk } from './postsSlice'
import { dv } from '@faker-js/faker'

const PostExcerpt = ({ post }) => (
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
)

export default function PostsList() {
  const dispatch = useDispatch()
  const posts = useSelector(selectAllPosts)

  const orderedPosts = posts.slice().reverse()

  const postsStatus = useSelector((state) => state.posts.status)
  const error = useSelector((state) => state.posts.error)

  const renderContents = (() => {
    switch (postsStatus) {
      case 'pending':
        return <Spinner text="Loading..." />
        break
      case 'fulfilled':
        return orderedPosts.map((post) => (
          <PostExcerpt key={post.id} {...{ post }} />
        ))
      case 'error':
        return <div>{error}</div>
      default:
        return '😪'
    }
  })()

  useEffect(() => {
    if (postsStatus === 'idle') {
      dispatch(fetchPostsThunk())
    }
  }, [postsStatus, dispatch])

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {renderContents}
    </section>
  )
}
