import { connect } from 'react-redux';
import { newUrlPasted, stateUrlPending } from 'actions/urlInput';

import PasteUrl from './PasteUrl';


const mapStateToProps = state => ({
  pending: state.simpleupload.pending
});


const mapDispatchToProps = dispatch => ({
  onPaste: (event) => {
    const url = event.clipboardData.getData('Text');
    if (url && url.length > 1) {
      dispatch(newUrlPasted(url));
      dispatch(stateUrlPending(true));
    }
  },
  onKeyPress: (event, url) => {
    if (event.key === 'Enter' && url) {
      dispatch(newUrlPasted(url));
      dispatch(stateUrlPending(true));
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PasteUrl);
