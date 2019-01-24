import React, { Fragment as R } from 'react';
import soundcloudAPI from 'utilities/soundcloudAPI'
import { store } from 'store'
import { stdout } from 'modules/stdout/actions'

import $ from 'utilities/theme'
import { Highlight as H } from 'Components/Styles'

const { dispatch } = store
const { paths } = soundcloudAPI

const userinfo = ({ params }) => new Promise((resolve, reject) => {
  const username = params[0]

  if (!username) {
    reject({ lines: ['No username provided'] })
  }

  paths.resolve(username).then(res => {
    const { data } = res

    dispatch(stdout([
      <R><H color={$.cyan}>User ID:</H> <H>{data.id}</H></R>,
      <R><H color={$.cyan}>Username:</H> <H>{data.username}</H></R>,
      <R><H color={$.cyan}>Location:</H> <H>{data.city}, {data.country}</H></R>,
      <R><H color={$.cyan}>Description:</H> <H>{data.description}</H></R>,
    ]))
    resolve()
  }).catch(err => {
    reject({ error: [err.message] })
  })
});

export default userinfo;
