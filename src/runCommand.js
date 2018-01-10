import programs from './programs';

const runCommand = (commandObject) => new Promise((resolve, reject) => {
  const { program } = commandObject;

  // Check programs object
  // If there is a match, run it.
  if (typeof programs[program] === 'function') {
    runProgram(
      programs[program],
      commandObject,
      (data) => {
        // Kinda hacky way to append a newLine at
        // the end of every successful command
        resolve(Object.assign(data, {
          stdOut: data.stdOut.concat('')
        }));
      }
    );

  // If the program string is empty,
  // just resolve without any data.
  } else if (program === '') {
    resolve();

  // Otherwise, error out.
  } else {
    reject({
      stdOut: ['Command not found.', '']
    })
  }
});

const runProgram = (program, commandObject, callback) => {
  program(commandObject).then((data) => callback(data));
};

export default runCommand;
