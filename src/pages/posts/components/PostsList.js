import React, { PureComponent } from 'react';
import {
  View,
  ListView,
} from 'react-native';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';

import Post from './Post';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
});

class PostsList extends PureComponent {
  static renderSeparator() {
    return (
      <View
        style={{
          height: 1,
          backgroundColor: '#000',
          marginVertical: 15,
        }}
      />
    );
  }

  static renderRow(rowData) {
    return (
      <Post
        title={rowData.title}
        body={rowData.body}
        onEdit={() => {}}
        onDelete={() => {}}
      />
    );
  }

  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.state = {
      dataSource: this.ds.cloneWithRows([]),
    };
  }

  componentDidMount() {
    this.props.getPosts();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.posts !== nextProps.posts) {
      this.setState((state) => {
        return {
          ...state,
          dataSource: this.ds.cloneWithRows(nextProps.posts),
        };
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={PostsList.renderRow}
          renderSeparator={PostsList.renderSeparator}
          enableEmptySections
          initialListSize={10}
          scrollRenderAheadDistance={200}
        />
      </View>
    );
  }
}

PostsList.propTypes = {
  getPosts: PropTypes.func.isRequired,
  posts: PropTypes.arrayOf(PropTypes.shape({
    userId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  })).isRequired,
};

export default PostsList;
