// Break down the cmd string into an object
const getCmdObject = (cmd) => ({
  cmd: cmd,
  program: cmd.split(/\s/)[0],
  params: cmd.split(/\s/).slice(1),
})

export default getCmdObject
