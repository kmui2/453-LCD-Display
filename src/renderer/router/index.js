import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage').default,
    },
    {
      path: '*',
      redirect: '/',
    },
    // {
    //   path: '/simon-says',
    //   component: require('@/components/SimonSays').default,
    // },
    // {
    //   path: '/tic-tac-toe',
    //   component: require('@/components/TicTacToe').default,
    // },
    // {
    //   path: '/rock-paper-sissors',
    //   component: require('@/components/RockPaperSissors').default,
    // },
    // {
    //   path: '/trivia',
    //   component: require('@/components/Trivia').default,
    // },
  ],
});
