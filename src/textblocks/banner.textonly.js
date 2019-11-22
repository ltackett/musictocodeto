import pkg from '../../package.json'

export default [
  { pause: 3000 },
  '::::    ::::  :::::::::::  ::::::::  :::::::::::  ',
  '+:+:+: :+:+:+     :+:     :+:    :+:     :+:',
  '+:+ +:+:+ +:+     +:+     +:+            +:+',
  '+#+  +:+  +#+     +#+     +#+            +#+',
  '+#+       +#+     +#+     +#+            +#+',
  '#+#       #+#     #+#     #+#    #+#     #+#',
  `###       ###     ###      ########      ###   ${pkg.version}`,
  '',
  { pause: 2000 },
  'Rock out while you grok out.',
  '',
  { pause: 2000 },
  'type \'play\' to start the fun, or',
  'type \'help\' for some useful commands',
  '',
  { pause: 3000, last: true },
]
