import React from 'react';
import soundcloudAPI from 'utilities/soundcloudAPI'

import $ from 'utilities/theme'
import { Highlight as H } from 'Components/Styles'

const userinfo = ({ params }, { stdout, settings }) => new Promise((resolve, reject) => {
  if (!params.length > 0) {
    return reject({ error: 'No username entered.' })
  }
  const username = params[0]

  if (!username) { reject({ lines: ['No username provided'] }) }

  soundcloudAPI.resolve(username).then(res => {
    const { data } = res

    if (settings.textOnly) {
      stdout([
        `User ID: ${data.id}`,
        `Username: ${data.username}`,
        `Location: ${data.city}, ${data.country}`,
        `Description: ${data.description}`,
      ])
    } else {
      stdout([
        <><H color={$.cyan}>User ID:</H> <H>{data.id}</H></>,
        <><H color={$.cyan}>Username:</H> <H>{data.username}</H></>,
        <><H color={$.cyan}>Location:</H> <H>{data.city}, {data.country}</H></>,
        <><H color={$.cyan}>Description:</H> <H>{data.description}</H></>,
      ])
    }
    return resolve()
  }).catch(err => {
    return reject({ error: [err.message] })
  })
});

export default userinfo;
