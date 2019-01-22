import React from 'react'
import {
  Image
} from 'react-native'
import PropTypes from 'prop-types'

export default class HomeImage extends React.PureComponent {
  state = {
    height: 0
  }

  componentDidMount () {
    Image.getSize(this.props.uri, (realWidth, realHeight) => {
      const expectedHeight = realHeight / realWidth * this.props.width
      this.setState({ height: expectedHeight })
    })
  }

  render () {
    if (this.state.height <= 0) return null
    return <Image source={{ uri: this.props.uri }}
      style={{ width: this.props.width, height: this.state.height }} />
  }
}

HomeImage.propTypes = {
  width: PropTypes.number.isRequired,
  uri: PropTypes.string.isRequired
}
