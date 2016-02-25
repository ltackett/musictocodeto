import React, {Component} from 'react';
import Helmet from 'react-helmet';

export default class About extends Component {
  render() {
    return (
      <div className="container">
        <h1>About MTCT</h1>
        <Helmet title="- About"/>

        <p>MTCT started out of frustration when my music player died. I threw together some playlists on the now defunct <strong>playlist.com</strong> with a couple tunes that put me in the mood to code, and set about my work day.</p>

        <p>Later that evening I cobbled together a little interface, bought a domain, and tossed what I built out into the world.</p>

        <p>Now MTCT is a front-end application for SoundCloud, and I keep a few currated playlists there as well. Mostly, this is an app I like to rebuild every so often with new tech under the hood.</p>

        <p>Currently, it is powered by React, Redux, and Webpack.</p>
      </div>
    );
  }
}
