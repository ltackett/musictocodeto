import programs from 'programs';

const runCommand = (commandObject, context) => new Promise((resolve, reject) => {
  const { program } = commandObject;

  // Check programs object
  // If there is a match, run it.
  if (typeof programs[program] === 'function') {
    runProgram(programs[program], commandObject, context, (data) => {
        // Reject if there are any errors
        if (data.error) { reject(data) }

        // Otherwise, resolve
        resolve(data)
      }
    );

  // If the program string is empty,
  // just resolve without any data.
  } else if (program === '') {
    resolve();

  // Otherwise, error out.
  } else {
    reject({ error: 'Command not found' })
  }
});

const runProgram = (program, commandObject, context, callback) => {
  program(commandObject, context)
    .then((data) => callback(data))
    .catch((data) => callback(data));
};

export default runCommand;
