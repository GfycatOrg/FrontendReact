import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'

export class AsyncExample extends Component {
  static propTypes = {
    fetchedData: PropTypes.func.isRequired
  }

  render() {
    const { fetchedData } = this.props
    console.log('fetched data', fetchedData)

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
