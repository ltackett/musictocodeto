import play from 'programs/player/play'
import pause from 'programs/player/pause'
import next from 'programs/player/next'
import prev from 'programs/player/prev'
import skip from 'programs/player/skip'
import repeat from 'programs/player/repeat'
import rewind from 'programs/player/rewind'

export default {
  play,
  pause,
  next,
  prev,
  skip,
  repeat,
  rewind,

  // Aliases
  previous: prev,
}
