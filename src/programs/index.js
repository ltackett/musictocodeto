import about from 'programs/about';
import fork from 'programs/fork';
import help from 'programs/help';
import userinfo from 'programs/userinfo';
import player from 'programs/player'

const programs = {
  about,
  fork,
  help,
  userinfo,
  ...player
}

export default programs;
