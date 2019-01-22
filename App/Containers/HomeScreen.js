import React from 'react'
import {
  Button,
  Dimensions,
  FlatList,
  Text,
  TextInput,
  View,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import _ from 'lodash'

import NewsCreators from '../Redux/NewsRedux'
import NavCreators from '../Redux/NavReduxCreators'
import HomeImage from '../Components/HomeImage'

export const HomeScreenNavigationOptions = {
  title: 'Home',
  tabBarLabel: 'Home',
  tabBarIcon: ({ tintColor }) => <Text style={{ color: tintColor }}>Home</Text>
}

export class HomeScreen extends React.PureComponent {
  windowWidth = Dimensions.get('window').width

  componentDidMount () {
    if (!this.props.newsList) {
      this.props.onFetchNews()
    }
  }

  render () {
    return (
      <View style={{ flex: 1 }}>
        <View style={{
          flexDirection: 'row',
          width: this.windowWidth,
          alignItems: 'center',
          paddingBottom: 5,
          borderBottomColor: 'black',
          borderBottomWidth: 0.5
        }}>
          <Text>Keyword: </Text>
          <TextInput
            style={{
              flex: 1,
              borderColor: 'black',
              borderWidth: 0.5,
              padding: 5,
              marginRight: 5
            }}
            onChangeText={txt => { this.keywordValue = txt }}
            onSubmitEditing={() => this.props.onFetchNews(this.keywordValue)} />
          <Button title='Search' onPress={() => this.props.onFetchNews(this.keywordValue)} />
        </View>
        <FlatList
          data={this.props.newsList}
          renderItem={({ item, index }) => {
            let image = null
            if (item.urlToImage &&
              typeof item.urlToImage === 'string' &&
              item.urlToImage.trim() !== '') {
              image = <HomeImage uri={_.get(item, 'urlToImage', '')} width={this.windowWidth} />
            }
            return (
              <TouchableOpacity key={index}
                style={{
                  padding: 5,
                  borderBottomColor: 'black',
                  borderBottomWidth: 0.5
                }}
                onPress={() => this.props.onGoNewsDetail({ url: item.url })}>
                {image}
                <Text>{_.get(item, 'title', 'Untitled')}</Text>
              </TouchableOpacity>
            )
          }}
          onEndReached={() => this.props.onFetchMoreNews()}
          onRefresh={() => this.props.onRefreshNews()}
          refreshing={this.props.refreshing}
        />
      </View>
    )
  }
}

export const mapStateToProps = (state) => {
  return {
    newsList: state.news.newsList,
    refreshing: state.news.refreshing
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchNews: keyword => dispatch(NewsCreators.fetchNews(keyword)),
    onFetchMoreNews: () => dispatch(NewsCreators.fetchMoreNews()),
    onRefreshNews: () => dispatch(NewsCreators.refreshNews()),
    onGoNewsDetail: params => dispatch(NavCreators.goNewsDetail(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
