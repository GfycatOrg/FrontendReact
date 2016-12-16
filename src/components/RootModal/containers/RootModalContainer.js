import { connect } from 'react-redux'
import RootModal from '../components/RootModal'

const mapStateToProps = (state) => ({
  modal: state.modal
})

export default connect(mapStateToProps)(RootModal)
