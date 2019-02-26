import React, { Fragment as R } from 'react';
import soundcloudAPI from 'utilities/soundcloudAPI'

import $ from 'utilities/theme'
import { Highlight as H } from 'Components/Styles'

const userinfo = ({ params }, { stdout }) => new Promise((resolve, reject) => {
  if (!params.length > 0) {
    return reject({ error: 'No username entered.' })
  }
  const username = params[0]

  if (!username) { reject({ lines: ['No username provided'] }) }

  soundcloudAPI.resolve(username).then(res => {
    const { data } = res

    stdout([
      <R><H color={$.cyan}>User ID:</H> <H>{data.id}</H></R>,
      <R><H color={$.cyan}>Username:</H> <H>{data.username}</H></R>,
      <R><H color={$.cyan}>Location:</H> <H>{data.city}, {data.country}</H></R>,
      <R><H color={$.cyan}>Description:</H> <H>{data.description}</H></R>,
    ])
    return resolve()
  }).catch(err => {
    return reject({ error: [err.message] })
  })
});

export default userinfo;
