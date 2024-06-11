import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { updatePost } from './postsSlice'

export default function EditPostForm({ match }) {
  const { postId } = match.params

  const dispatch = useDispatch()
  const history = useHistory()

  const post = useSelector((state) => {
    return state.posts.find((post) => post.id === postId)
  })

  const [title, setTitle] = useState(post?.title ?? '')
  const [content, setContent] = useState(post?.content ?? '')

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleContentChange = (e) => {
    setContent(e.target.value)
  }

  const handleSaveBtnClick = () => {
    if (!title || !content) {
      return
    }
    dispatch(
      updatePost({
        id: postId,
        title,
        content,
      }),
    )
    history.push(`/posts/${postId}`)
  }

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="What's on your mind?"
          value={title}
          onChange={handleTitleChange}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={handleContentChange}
        />
      </form>
      <button type="button" onClick={handleSaveBtnClick}>
        Save Post
      </button>
    </section>
  )
}
