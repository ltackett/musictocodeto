import { store } from 'store'
import { playNextFromQueue } from 'modules/player/actions'
import play from './play'

const { dispatch } = store

const next = (cmdObject) => new Promise((resolve, reject) => {
  dispatch(playNextFromQueue())
  play()
    .then(() => resolve())
    .catch(err => reject(err))
});

export default next;
