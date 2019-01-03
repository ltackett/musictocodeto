import play from 'programs/player/play'
import pause from 'programs/player/pause'
import next from 'programs/player/next'
import prev from 'programs/player/prev'
import repeat from 'programs/player/repeat'

export default {
  play,
  pause,
  next,
  prev,
  repeat,

  // Aliases
  previous: prev,
}
