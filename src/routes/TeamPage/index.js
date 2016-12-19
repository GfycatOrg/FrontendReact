// export default () => ({
//   path: 'team',
//   getComponent(nextState, cb) {
//     require.ensure([], (require) => {
//       const Team = require('./TeamPage').default;
//       cb(null, Team);
//     }, 'team');
//   }
// });


import TeamPage from './components/TeamPage'

export default {
  path: 'team',
  component: TeamPage
}
