import animate from 'programs/animate';
import about from 'programs/about';
import fork from 'programs/fork';
import help from 'programs/help';
import userinfo from 'programs/userinfo';
import player from 'programs/player'

const programs = {
  animate,
  about,
  fork,
  help,
  userinfo,
  ...player
}

export default programs;
