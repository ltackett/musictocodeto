import programs from 'programs';

const runCommand = (commandObject, props) => new Promise((resolve, reject) => {
  const { program } = commandObject;

  // Check programs object
  // If there is a match, run it.
  if (typeof programs[program] === 'function') {
    props.startCmd();

    programs[program](commandObject, props)
    .then(data => {
      props.stopCmd();
      resolve(data)
    })
    .catch(data => {
      props.stopCmd();

      // Reject if there are any errors
      if (data.error) {
        reject(data)
      }

      reject({})
    })

  // If the program string is empty,
  // just resolve without any data.
  } else if (program === '') {
    resolve();

  // Otherwise, error out.
  } else {
    reject({ error: 'Command not found' })
  }
});

export default runCommand;
