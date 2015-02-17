MTCT is a CLI-like interface for SoundCloud written in React.  
Check it out at [musictocodeto.com](http://musictocodeto.com)

### Basic usage:

**Getting a list of tracks from a user, and playing back a track**

`> usertracks [artist_slug]` — eg. the user permalink `daze-of-resistance` would be my `artist_slug`  
`> play [i]` — you will receive a list of track from the `usertracks` program. `play 0` will play the first track from the list. Right now it only loads the first 50 tracks. Paging will come in a future version.

**Getting a playlist from a user, and playing all tracks**
 
`> userplaylists [artist_slug]` — similar to `usertracks`, this accepts a user permalink and returns a list of playlists.  
`> play list [i]` — similar to playing a track, this will playback a playlist.  
`> play [i]` — loading the playlist also loads it's songs into the current context, so you can skip to any song in the list just as you would running `play [i]` after loading tracks from `usertracks`... though currently this stops the playlist from playing sequentially. I will fix that soon.

**Player actions while audio is loaded**

`> player play`  
`> player pause`  
`> player stop`  
`> player rewind`  
`> player skip [n]` — a positive or negative integer will skip through the audio by that many seconds.

Thanks for checking out my ridiculous little project!

---

```
 ██▀███   ▒█████   ▄████▄   ██ ▄█▀    ▒█████   █    ██ ▄▄▄█████▓
▓██ ▒ ██▒▒██▒  ██▒▒██▀ ▀█   ██▄█▒    ▒██▒  ██▒ ██  ▓██▒▓  ██▒ ▓▒
▓██ ░▄█ ▒▒██░  ██▒▒▓█    ▄ ▓███▄░    ▒██░  ██▒▓██  ▒██░▒ ▓██░ ▒░
▒██▀▀█▄  ▒██   ██░▒▓▓▄ ▄██▒▓██ █▄    ▒██   ██░▓▓█  ░██░░ ▓██▓ ░
░██▓ ▒██▒░ ████▓▒░▒ ▓███▀ ░▒██▒ █▄   ░ ████▓▒░▒▒█████▓   ▒██▒ ░
░ ▒▓ ░▒▓░░ ▒░▒░▒░ ░ ░▒ ▒  ░▒ ▒▒ ▓▒   ░ ▒░▒░▒░ ░▒▓▒ ▒ ▒   ▒ ░░
  ░▒ ░ ▒░  ░ ▒ ▒░   ░  ▒   ░ ░▒ ▒░     ░ ▒ ▒░ ░░▒░ ░ ░     ░
  ░░   ░ ░ ░ ░ ▒  ░        ░ ░░ ░    ░ ░ ░ ▒   ░░░ ░ ░   ░
   ░         ░ ░  ░ ░      ░  ░          ░ ░     ░
                  ░

 █     █░ ██▓▄▄▄█████▓ ██░ ██    ▓██   ██▓ ▒█████   █    ██  ██▀███
▓█░ █ ░█░▓██▒▓  ██▒ ▓▒▓██░ ██▒    ▒██  ██▒▒██▒  ██▒ ██  ▓██▒▓██ ▒ ██▒
▒█░ █ ░█ ▒██▒▒ ▓██░ ▒░▒██▀▀██░     ▒██ ██░▒██░  ██▒▓██  ▒██░▓██ ░▄█ ▒
░█░ █ ░█ ░██░░ ▓██▓ ░ ░▓█ ░██      ░ ▐██▓░▒██   ██░▓▓█  ░██░▒██▀▀█▄
░░██▒██▓ ░██░  ▒██▒ ░ ░▓█▒░██▓     ░ ██▒▓░░ ████▓▒░▒▒█████▓ ░██▓ ▒██▒
░ ▓░▒ ▒  ░▓    ▒ ░░    ▒ ░░▒░▒      ██▒▒▒ ░ ▒░▒░▒░ ░▒▓▒ ▒ ▒ ░ ▒▓ ░▒▓░
  ▒ ░ ░   ▒ ░    ░     ▒ ░▒░ ░    ▓██ ░▒░   ░ ▒ ▒░ ░░▒░ ░ ░   ░▒ ░ ▒░
  ░   ░   ▒ ░  ░       ░  ░░ ░    ▒ ▒ ░░  ░ ░ ░ ▒   ░░░ ░ ░   ░░   ░
    ░     ░            ░  ░  ░    ░ ░         ░ ░     ░        ░
                                  ░ ░

  ▄████  ██▀███   ▒█████   ██ ▄█▀    ▒█████   █    ██ ▄▄▄█████▓
 ██▒ ▀█▒▓██ ▒ ██▒▒██▒  ██▒ ██▄█▒    ▒██▒  ██▒ ██  ▓██▒▓  ██▒ ▓▒
▒██░▄▄▄░▓██ ░▄█ ▒▒██░  ██▒▓███▄░    ▒██░  ██▒▓██  ▒██░▒ ▓██░ ▒░
░▓█  ██▓▒██▀▀█▄  ▒██   ██░▓██ █▄    ▒██   ██░▓▓█  ░██░░ ▓██▓ ░
░▒▓███▀▒░██▓ ▒██▒░ ████▓▒░▒██▒ █▄   ░ ████▓▒░▒▒█████▓   ▒██▒ ░
 ░▒   ▒ ░ ▒▓ ░▒▓░░ ▒░▒░▒░ ▒ ▒▒ ▓▒   ░ ▒░▒░▒░ ░▒▓▒ ▒ ▒   ▒ ░░
  ░   ░   ░▒ ░ ▒░  ░ ▒ ▒░ ░ ░▒ ▒░     ░ ▒ ▒░ ░░▒░ ░ ░     ░
░ ░   ░   ░░   ░ ░ ░ ░ ▒  ░ ░░ ░    ░ ░ ░ ▒   ░░░ ░ ░   ░
      ░    ░         ░ ░  ░  ░          ░ ░     ░
```
