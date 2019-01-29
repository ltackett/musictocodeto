import animate from 'programs/animate';
import about from 'programs/about';
import boot from 'programs/boot';
import clear from 'programs/clear';
import fork from 'programs/fork';
import help from 'programs/help';
import userinfo from 'programs/userinfo';
import player from 'programs/player'

const programs = {
  animate,
  about,
  boot,
  clear,
  fork,
  help,
  userinfo,
  ...player,

  cls: clear
}

export default programs;
