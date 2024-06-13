import React from 'react'
import { parseISO, formatDistanceToNow } from 'date-fns'

export default function TimeAgo({ timeStamp }) {
  const timeAgo = Boolean(timeStamp)
    ? `${formatDistanceToNow(parseISO(timeStamp))} ago`
    : ''

  return (
    <span title={timeAgo}>
      &nbsp; <i>{timeAgo}</i>
    </span>
  )
}
