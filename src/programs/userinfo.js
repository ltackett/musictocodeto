import React from 'react';
import soundcloudAPI from '../utilities/soundcloudAPI'

const R = React.Fragment // Alias React.Fragment for shorthand JSX preprocessing per line
const { paths } = soundcloudAPI

const userinfo = ({ params }) => new Promise((resolve, reject) => {
  const username = params[0]

  paths.resolve(username).then(res => {
    const { data } = res

    const stdOut = [
      <R><em>User ID:</em> {data.id}</R>,
      <R><em>Username:</em> {data.username}</R>,
      <R><em>Location:</em> {data.city}, {data.country}</R>,
      <R><em>Description:</em> {data.description}</R>,
    ]

    resolve({ stdOut })
  }).catch(err => {
    const stdOut = [
      <R><strong>{err.message}</strong></R>,
    ]

    reject({ stdOut })
  })
});

export default userinfo;
