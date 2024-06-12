import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { addPost } from './postsSlice'

export default function AddPostForm() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')

  const dispatch = useDispatch()

  const users = useSelector((state) => state.users)

  const handleSaveBtnClick = () => {
    dispatch(
      addPost({
        title,
        content,
        userId,
      }),
    )
    setTitle('')
    setContent('')
    setUserId('')
  }

  const disableSaveBtnOrNot = !title || !userId || !content
  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="postAuthor">Author:</label>
        <select
          id="postAuthor"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        >
          <option value=""></option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button
          type="button"
          disabled={disableSaveBtnOrNot}
          onClick={handleSaveBtnClick}
        >
          Save Post
        </button>
      </form>
    </section>
  )
}
