import React from 'react';
import soundcloudAPI from '../utilities/soundcloudAPI'
import { store } from '../store'
import { stdoutMultiline } from '../modules/stdout'

const { dispatch } = store
const { paths } = soundcloudAPI
const R = React.Fragment

const userinfo = ({ params }) => new Promise((resolve, reject) => {
  const username = params[0]

  if (!username) {
    reject({ lines: ['No username provided'] })
  }

  paths.resolve(username).then(res => {
    const { data } = res

    dispatch(stdoutMultiline([
      <R><em>User ID:</em> {data.id}</R>,
      <R><em>Username:</em> {data.username}</R>,
      <R><em>Location:</em> {data.city}, {data.country}</R>,
      <R><em>Description:</em> {data.description}</R>,
    ]))
    resolve()
  }).catch(err => {
    reject({ error: [err.message] })
  })
});

export default userinfo;
