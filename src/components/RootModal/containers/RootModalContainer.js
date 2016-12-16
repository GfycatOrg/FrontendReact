import { connect } from 'react-redux'
import RootModal from '../components/RootModal'

const mapStateToProps = (state) => ({
  modalType: state.modal.modalType,
  modalProps: state.modal.modalProps
})

export default connect(mapStateToProps)(RootModal)
