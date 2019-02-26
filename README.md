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

---

MTCT is a CLI-like interface for SoundCloud written in React.  
Check it out at [musictocodeto.com](http://musictocodeto.com)

### Running MTCT locally

Assuming you've got Node and Yarn installed, just install the modules and run the server:

```
yarn install
yarn start
```

You will also need to add your own soundcloud API key to the local environment variables.

#### `.env.local`

```REACT_APP_SOUNDCLOUD_API_KEY=abc123xyz789```

---

### Purpose of MTCT

This is my playground project. Every few years I firepurge the codebase and start over.

The goal here is twofold:

1. To iteratively document how I have grown in my approach to solving the same set of problems.
1. To try out new and emergent technologies, and git gud.
