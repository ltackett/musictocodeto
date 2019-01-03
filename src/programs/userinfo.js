import React, { Fragment as R } from 'react';
import soundcloudAPI from 'utilities/soundcloudAPI'
import { store } from 'store'
import { stdoutMultiline } from 'modules/stdout'

import theme from 'utilities/theme'
import H from 'Components/Text_Highlight'

const { dispatch } = store
const { paths } = soundcloudAPI

const userinfo = ({ params }) => new Promise((resolve, reject) => {
  const username = params[0]

  if (!username) {
    reject({ lines: ['No username provided'] })
  }

  paths.resolve(username).then(res => {
    const { data } = res

    dispatch(stdoutMultiline([
      <R><H color={theme.cyan}>User ID:</H> <H>{data.id}</H></R>,
      <R><H color={theme.cyan}>Username:</H> <H>{data.username}</H></R>,
      <R><H color={theme.cyan}>Location:</H> <H>{data.city}, {data.country}</H></R>,
      <R><H color={theme.cyan}>Description:</H> <H>{data.description}</H></R>,
    ]))
    resolve()
  }).catch(err => {
    reject({ error: [err.message] })
  })
});

export default userinfo;
