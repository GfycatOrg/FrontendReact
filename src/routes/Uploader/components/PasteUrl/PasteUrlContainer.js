import { connect } from 'react-redux'
import PasteUrl from './PasteUrl'
import { newUrlPasted, stateUrlPending } from 'actions/urlInput'


const mapStateToProps = (state) => ({
  pending: state.simpleupload.pending
})


const mapDispatchToProps = (
  dispatch
) => {
  return {
    onPaste: (event) => {
      const url = event.clipboardData.getData('Text');
      if (url && url.length > 1) {
        dispatch(newUrlPasted(url));
        dispatch(stateUrlPending(true))
      }
    },
    onKeyPress: (event, url) => {
      if (event.key === "Enter" && url) {
        dispatch(newUrlPasted(url));
        dispatch(stateUrlPending(true));
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PasteUrl)
