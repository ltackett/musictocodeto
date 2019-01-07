import React, { Fragment as R} from 'react';
import { store } from 'store'
import { stdout as output } from 'modules/stdout/actions'
import theme from 'utilities/theme'

import H from 'Components/Text_Highlight'
const Cmd = ({ children }) => <R><H color={theme.orange}>{children}</H></R>
const Arg = ({ children }) => <R><H color={theme.pink}>{children}</H></R>

const { dispatch } = store
const stdout = (o) => dispatch(output(o))

const help = (cmdObject) => new Promise((resolve, reject) => {
  stdout([<R>tl;dr — just type <Cmd>play</Cmd> and enjoy the ride.</R>, ''])

  stdout([
    <H color={theme.cyan}>Basics</H>,
    <H color={theme.dark}>————————————————————————————————————————————————————————————————————————————————</H>,
    <R>&gt; {<Cmd>play</Cmd>}</R>,
    <R>&gt; {<Cmd>pause</Cmd>}</R>,
    <R>&gt; {<Cmd>prev</Cmd>}</R>,
    <R>&gt; {<Cmd>next</Cmd>}</R>,
    ''
  ])

  stdout([
    <H color={theme.cyan}>Getting Around</H>,
    <H color={theme.dark}>————————————————————————————————————————————————————————————————————————————————</H>,
    <R>&gt; {<Cmd>cd</Cmd>} {<Arg>[path]</Arg>}</R>,
    <R>&gt; {<Cmd>ls</Cmd>} {<Arg>[path]</Arg>}</R>,
    ''
  ])

  stdout([
    <H color={theme.cyan}>Discovery</H>,
    <H color={theme.dark}>————————————————————————————————————————————————————————————————————————————————</H>,
    <R>&gt; {<Cmd>user</Cmd>} {<Arg>[user-slug]</Arg>} {<Arg>[info|playlists|tracks]</Arg>}</R>,
    ''
  ])

  resolve()
});



export default help;
