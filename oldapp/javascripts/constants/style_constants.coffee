$ =
  phosphorus:     '#28db49'
  glow:           '0 0 10px'
  phosphorusGlow: "#28db49 0 0 10px"

WhiteTextGlow =
  color:          '#ffffff'
  textShadow:     "#ffffff #{$.glow}"

RedTextGlow =
  color:      '#ff0000'
  textShadow: "#ff0000 #{$.glow}"

module.exports = {
  $: $
  WhiteTextGlow: WhiteTextGlow
}