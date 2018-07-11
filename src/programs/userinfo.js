import React from 'react';
import soundcloudAPI from '../utilities/soundcloudAPI'

const R = React.Fragment // Alias React.Fragment for shorthand JSX preprocessing per line
const { paths } = soundcloudAPI

const userinfo = ({ params }) => new Promise((resolve, reject) => {
  const username = params[0]

  if (!username) {
    reject({ lines: ['No username provided'] })
  }

  paths.resolve(username).then(res => {
    const { data } = res

    resolve({
      lines: [
        <R><em>User ID:</em> {data.id}</R>,
        <R><em>Username:</em> {data.username}</R>,
        <R><em>Location:</em> {data.city}, {data.country}</R>,
        <R><em>Description:</em> {data.description}</R>,
      ]
    })
  }).catch(err => {
    reject({ lines: [err.message] })
  })
});

export default userinfo;
