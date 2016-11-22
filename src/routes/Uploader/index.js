import { injectReducer } from '../../store/reducers';
import Uploader from './components/Uploader';

export default store => ({
  component: Uploader,
  childRoutes: [
    {
      path: 'upload',
      /*  Async getComponent is only invoked when route matches   */
      getComponent(nextState, cb) {
        /*  Webpack - use 'require.ensure' to create a split point
            and embed an async module loader (jsonp) when bundling   */
        require.ensure([], (require) => {
          /*  Webpack - use require callback to define
              dependencies for bundling   */
          const SimpleUpload = require('./components/SimpleUpload/SimpleUpload').default;
          const reducer = require('./modules/simpleupload.reducer').default;

          /*  Add the reducer to the store on key 'counter'  */
          injectReducer(store, { key: 'simpleupload', reducer });

          /*  Return getComponent   */
          cb(null, SimpleUpload);

          /* Webpack named bundle   */
        }, 'upload');
      }
    },
    {
      path: 'editor',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          const Editor = require('./components/Editor/Editor').default;
          cb(null, Editor);
        }, 'editor');
      }
    }
  ]
});
