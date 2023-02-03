import React, { Component } from 'react';

export function Message(props) {
  console.log(props.message.User)
  if (props.userPrefix === 'user-1') {
    return (
      <div class="message message--user-1">

        <time class="message__time">{props.message.created_at}</time>
        <figure class="message__author-pic">
          {/* <img src="http://pipsum.com/40x40.jpg"> */}
        </figure>
        <div class="message__text">
          <p>{props.message.message}</p>
        </div>
        <p style={{ padding: 0, marginLeft: '10px' }}>{props.message.User.login}</p><hr />
      </div >
    )
  }
  return (
    <div class="message message--user-2">
      <time class="message__time">{props.message.created_at}</time>
      <figure class="message__author-pic">
        {/* <img src="http://pipsum.com/40x40.jpg"> */}
      </figure>
      <p style={{ padding: 0, marginRight: '10px' }}>{props.message.User.login}</p><hr />
      <div class="message__text">
        <p>{props.message.message}</p>
      </div>
    </div>
  )
}
