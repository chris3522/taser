import { Component } from 'react'
import moment from 'moment'

export default class Init extends Component {
  /*constructor(props) {
    super(props)
  }*/
 
  componentDidMount() {
      const { initDateCurrent, initDateSelect } = this.props
      initDateCurrent(moment(new Date()).format("YYYY-MM-DD"))
      initDateSelect(moment(new Date()).format("YYYY-MM-DD"))
  }

  componentWillUnmount() {
  }

  render() {
    return null
  }
}