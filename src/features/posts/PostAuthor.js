import React from 'react'
import { useSelector } from 'react-redux'

export default function PostAuthor({ userId }) {
  const author = useSelector((state) =>
    state.users.find((user) => user.id === userId),
  )

  return <span>by {Boolean(author) ? author.name : 'Unknown author'}</span>
}
