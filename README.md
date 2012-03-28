# What it is

MusicToCodeTo.com is a front end application for SoundCloud, which resembles a command line interface.

This is a work-in-progress. Here is a breakdown of some of the features I'm working on:

 * Command Line Interface UI (DONE!)
 * Play any song from SoundCloud (DONE!)
 * OAuth login with SoundCloud, Facebook, or Twitter credentials
 * Playlists (internal feature, since SoundCloud doesn't support playlists per se)
 * Ability to create your own playlists and share them with friends
 * Internal chat room (maybe...)

# How to work it

If you want to dev MTCT locally, you'll need to get SocketStream running locally. SocketStream is a node.js framework, so you will need to get [node](https://github.com/joyent/node) and [npm](http://npmjs.org/) installed first.

To install SocketStream:

    npm install socketstream

Now you can checkout the repo, `cd` into it and start the server:
    
    socketstream start