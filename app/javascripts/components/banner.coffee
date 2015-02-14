React = require('react')

{stdout} = require('./stdout')

# Sign in banner
# ============================================================================
banner = []
banner.push "MMMMMMMM               MMMMMMMMTTTTTTTTTTTTTTTTTTTTTTT       CCCCCCCCCCCCCTTTTTTTTTTTTTTTTTTTTTTT"
banner.push "M:::::::M             M:::::::MT:::::::::::::::::::::T    CCC::::::::::::CT:::::::::::::::::::::T"
banner.push "M::::::::M           M::::::::MT:::::::::::::::::::::T  CC:::::::::::::::CT:::::::::::::::::::::T"
banner.push "M:::::::::M         M:::::::::MT:::::TT:::::::TT:::::T C:::::CCCCCCCC::::CT:::::TT:::::::TT:::::T"
banner.push "M::::::::::M       M::::::::::MTTTTTT  T:::::T  TTTTTTC:::::C       CCCCCCTTTTTT  T:::::T  TTTTTT"
banner.push "M:::::::::::M     M:::::::::::M        T:::::T       C:::::C                      T:::::T"
banner.push "M:::::::M::::M   M::::M:::::::M        T:::::T       C:::::C                      T:::::T"
banner.push "M::::::M M::::M M::::M M::::::M        T:::::T       C:::::C                      T:::::T"
banner.push "M::::::M  M::::M::::M  M::::::M        T:::::T       C:::::C                      T:::::T"
banner.push "M::::::M   M:::::::M   M::::::M        T:::::T       C:::::C                      T:::::T"
banner.push "M::::::M    M:::::M    M::::::M        T:::::T       C:::::C                      T:::::T"
banner.push "M::::::M     MMMMM     M::::::M        T:::::T        C:::::C       CCCCCC        T:::::T"
banner.push "M::::::M               M::::::M      TT:::::::TT       C:::::CCCCCCCC::::C      TT:::::::TT"
banner.push "M::::::M               M::::::M      T:::::::::T        CC:::::::::::::::C      T:::::::::T"
banner.push "M::::::M               M::::::M      T:::::::::T          CCC::::::::::::C      T:::::::::T"
banner.push "MMMMMMMM               MMMMMMMM      TTTTTTTTTTT             CCCCCCCCCCCCC      TTTTTTTTTTT"
banner.push " "
banner.push "          |             |         ' | |                                   |             |"
banner.push "|/~\\/~\\/~~|_/  /~\\|   |~|~  \\    /|~|~|/~\\   \\  //~\\|   ||/~\\  /~~||/~\\/~\\|_/  /~\\|   |~|~"
banner.push "|   \\_/\\__| \\  \\_/ \\_/| |    \\/\\/ | | |   |   \\/ \\_/ \\_/||     \\__||   \\_/| \\  \\_/ \\_/| |  . . ."
banner.push "                                             _/                \\__|          "
banner.push " "
banner.push "Type <span class='highlight'>help</span> for a list of useful commands."
banner.push " "

module.exports = (context) ->
  React.createClass
    render: -> null

    componentDidMount: ->
      banner.map (line) ->
        stdout(line)