import React from 'react';
import $ from 'utilities/theme'

import { Highlight as H } from 'Components/Styles'

const Cmd = ({ children }) => <><H color={$.orange}>{children}</H></>
const Arg = ({ children }) => <><H color={$.pink}>{children}</H></>

const help = (cmdObject, { stdout, bang }) => new Promise((resolve, reject) => {
  stdout([<>tl;dr — just type <Cmd>play</Cmd> and enjoy the ride.</>, ''])

  stdout([
    <H color={$.cyan}>Basics</H>,
    <H color={$.dark}>————————————————————————————————————————————————————————————————————————————————</H>,
    <>{bang} {<Cmd>play</Cmd>}</>,
    <>{bang} {<Cmd>pause</Cmd>}</>,
    <>{bang} {<Cmd>prev</Cmd>}</>,
    <>{bang} {<Cmd>next</Cmd>}</>,
    <>{bang} {<Cmd>skip</Cmd>} {<Arg>[seconds]</Arg>}</>,
    ''
  ])

  stdout([
    <H color={$.cyan}>Getting Around</H>,
    <H color={$.dark}>————————————————————————————————————————————————————————————————————————————————</H>,
    <>{bang} {<Cmd>cd</Cmd>} {<Arg>[path]</Arg>}</>,
    <>{bang} {<Cmd>ls</Cmd>} {<Arg>[path]</Arg>}</>,
    ''
  ])

  stdout([
    <H color={$.cyan}>Discovery</H>,
    <H color={$.dark}>————————————————————————————————————————————————————————————————————————————————</H>,
    <>{bang} {<Cmd>user</Cmd>} {<Arg>[user-slug]</Arg>} {<Arg>[info|playlists|tracks]</Arg>}</>,
    ''
  ])

  resolve()
});



export default help;
