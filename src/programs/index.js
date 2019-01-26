import animate from 'programs/animate';
import about from 'programs/about';
import boot from 'programs/boot';
import fork from 'programs/fork';
import help from 'programs/help';
import userinfo from 'programs/userinfo';
import player from 'programs/player'

const programs = {
  animate,
  about,
  boot,
  fork,
  help,
  userinfo,
  ...player
}

export default programs;
