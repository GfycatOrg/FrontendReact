import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'
import { resolve } from 'react-resolver'

@resolve('fetchedData', (props) => {
  const { fetchData } = props
  return fetchData().then(action => action.payload)
})

export class AsyncExample extends Component {
  static propTypes = {
    fetchData: PropTypes.func.isRequired
  }

  render() {
    const { fetchedData } = this.props

    return (
      <div>
        <Helmet title='Async Example' />
        <h2>Async Example</h2>
        <div>{JSON.stringify(fetchedData)}</div>
      </div>    
    )
  }
}

export default AsyncExample
