export default () => {
  window.requestAnimationFrame(() => {
    window.scrollTo(0,document.body.scrollHeight);
  })
}
