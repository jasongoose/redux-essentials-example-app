import React from 'react'
import { useDispatch } from 'react-redux'

import { addReaction } from './postsSlice'

const reactionEmoji = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀',
}

export default function ReactionButtons({ post }) {
  const dispatch = useDispatch()

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => (
    <button
      key={name}
      type="button"
      onClick={() =>
        dispatch(
          addReaction({
            postId: post.id,
            reaction: name,
          }),
        )
      }
      className="muted-button reaction-button"
    >
      {emoji} {post.reactions[name]}
    </button>
  ))

  return <div>{reactionButtons}</div>
}
