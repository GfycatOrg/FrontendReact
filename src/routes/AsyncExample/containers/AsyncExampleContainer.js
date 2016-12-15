import { connect } from 'react-redux'
import { fetchData } from '../modules/AsyncExampleModule'
import AsyncExample from '../components/AsyncExample'

const mapDispatchToProps = {
  fetchData
}

const mapStateToProps = (state) => ({
  fetchedData: state.fetchedData
})

export default connect(mapStateToProps, mapDispatchToProps)(AsyncExample)
