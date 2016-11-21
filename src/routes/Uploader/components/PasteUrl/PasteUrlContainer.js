import { connect } from 'react-redux'
import PasteUrl from './PasteUrl'

const newUrlPasted = (url) => {
  return {
    type: 'NEW_URL_PASTED',
    url
  }
};

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (
  dispatch
) => {
  return {
    onPaste: (event) => {
      const url = event.clipboardData.getData('Text');
      if (url) {
        dispatch(newUrlPasted(url));
      }
    },
    onKeyPress: (event, url) => {
      if (event.key === "Enter" && url) {
        dispatch(newUrlPasted(url));
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PasteUrl)
