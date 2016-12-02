export default () => ({
  path: 'team',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Team = require('./TeamPage').default;
      cb(null, Team);
    }, 'team');
  }
});
