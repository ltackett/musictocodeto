import programs from 'programs';

const runCommand = (commandObject, props) => new Promise((resolve, reject) => {
  const { cmd, program, params } = commandObject;

  // Check programs object
  // If there is a match, run it.
  if (typeof programs[program] === 'function') {
    props.startCmd();

    programs[program](commandObject, props)
    .then(data => {
      props.stopCmd();

      if (program !== 'boot') {
        window.mixpanel.track('Command', { type: 'successful-command', params: params.join(' '), cmd })
      }

      resolve(data)
    })
    .catch(data => {
      props.stopCmd();

      // Reject if there are any errors
      if (data.error) {
        window.mixpanel.track('Error', { type: 'error-in-command', params: params.join(' '), cmd, error: data.error })
        reject(data)
        return
      }

      window.mixpanel.track('Error', { type: 'unknown-error', params: params.join(' '), cmd })
      reject({})
    })

  // If the program string is empty,
  // just resolve without any data.
  } else if (program === '') {
    window.mixpanel.track('Command', { type: 'empty-command', params: params.join(' '), cmd })
    resolve();

  // Otherwise, error out.
  } else {
    window.mixpanel.track('Command', { type: 'no-command', params: params.join(' '), cmd })
    reject({ error: 'Command not found' })
  }
});

export default runCommand;
