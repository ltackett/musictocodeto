import React, { Fragment as R} from 'react';
import $ from 'utilities/theme'

import { Highlight as H } from 'Components/Styles'
const Cmd = ({ children }) => <R><H color={$.orange}>{children}</H></R>
const Arg = ({ children }) => <R><H color={$.pink}>{children}</H></R>

const help = (cmdObject, { stdout }) => new Promise((resolve, reject) => {
  stdout([<R>tl;dr — just type <Cmd>play</Cmd> and enjoy the ride.</R>, ''])

  stdout([
    <H color={$.cyan}>Basics</H>,
    <H color={$.dark}>————————————————————————————————————————————————————————————————————————————————</H>,
    <R>&gt; {<Cmd>play</Cmd>}</R>,
    <R>&gt; {<Cmd>pause</Cmd>}</R>,
    <R>&gt; {<Cmd>prev</Cmd>}</R>,
    <R>&gt; {<Cmd>next</Cmd>}</R>,
    <R>&gt; {<Cmd>skip</Cmd>} {<Arg>[seconds]</Arg>}</R>,
    ''
  ])

  stdout([
    <H color={$.cyan}>Getting Around</H>,
    <H color={$.dark}>————————————————————————————————————————————————————————————————————————————————</H>,
    <R>&gt; {<Cmd>cd</Cmd>} {<Arg>[path]</Arg>}</R>,
    <R>&gt; {<Cmd>ls</Cmd>} {<Arg>[path]</Arg>}</R>,
    ''
  ])

  stdout([
    <H color={$.cyan}>Discovery</H>,
    <H color={$.dark}>————————————————————————————————————————————————————————————————————————————————</H>,
    <R>&gt; {<Cmd>user</Cmd>} {<Arg>[user-slug]</Arg>} {<Arg>[info|playlists|tracks]</Arg>}</R>,
    ''
  ])

  resolve()
});



export default help;
