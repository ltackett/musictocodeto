import banner from 'textblocks/banner'

const scrollToBottom = () => {
  window.requestAnimationFrame(() => {
    window.scrollTo(0,document.body.scrollHeight);
  })
}

export default (command, { stdout, setBooted }) => new Promise((resolve, reject) => {
  setBooted(false)

  let cycle = 0
  let jitter = (n) => (n * Math.random()) + 10
  banner.forEach((line, index) => {
    const delay = cycle + jitter(100)

    setTimeout(() => {
      stdout(line)
      scrollToBottom()
    }, delay)

    cycle = delay

    if (index === 16) {
      cycle = delay + 1500
    }

    if (index === 20) {
      cycle = delay + 1000
    }

    if (index === banner.length - 1) {
      setTimeout(() => {
        scrollToBottom()
        setBooted(true)
        resolve()
      }, cycle + 2000);
    }
  });
})
