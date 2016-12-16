import { connect } from 'react-redux'
import LoginModal from '../components/LoginModal'

const mapStateToProps = (state) => ({
  loginRequest: state.login
})

export default connect(mapStateToProps)(LoginModal)
