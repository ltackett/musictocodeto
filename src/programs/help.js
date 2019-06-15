import React from 'react';
import $ from 'utilities/theme'

import { Highlight as H } from 'Components/Styles'
const Cmd = ({ children }) => <><H color={$.orange}>{children}</H></>
const Arg = ({ children }) => <><H color={$.pink}>{children}</H></>

const help = (cmdObject, { stdout }) => new Promise((resolve, reject) => {
  stdout([<>tl;dr — just type <Cmd>play</Cmd> and enjoy the ride.</>, ''])

  stdout([
    <H color={$.cyan}>Basics</H>,
    <H color={$.dark}>————————————————————————————————————————————————————————————————————————————————</H>,
    <>&gt; {<Cmd>play</Cmd>}</>,
    <>&gt; {<Cmd>pause</Cmd>}</>,
    <>&gt; {<Cmd>prev</Cmd>}</>,
    <>&gt; {<Cmd>next</Cmd>}</>,
    <>&gt; {<Cmd>skip</Cmd>} {<Arg>[seconds]</Arg>}</>,
    ''
  ])

  stdout([
    <H color={$.cyan}>Getting Around</H>,
    <H color={$.dark}>————————————————————————————————————————————————————————————————————————————————</H>,
    <>&gt; {<Cmd>cd</Cmd>} {<Arg>[path]</Arg>}</>,
    <>&gt; {<Cmd>ls</Cmd>} {<Arg>[path]</Arg>}</>,
    ''
  ])

  stdout([
    <H color={$.cyan}>Discovery</H>,
    <H color={$.dark}>————————————————————————————————————————————————————————————————————————————————</H>,
    <>&gt; {<Cmd>user</Cmd>} {<Arg>[user-slug]</Arg>} {<Arg>[info|playlists|tracks]</Arg>}</>,
    ''
  ])

  resolve()
});



export default help;
