import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchSearchData } from '../../../store/actions/searchActions';

import Index from './components/index/index';
import NoResults from './components/noResults/noResults';
import Results from './components/results/results';
import Spinner from '../../spinner/spinner';
import './search.css';

class Search extends Component {
  render = () => {
    const results =
      this.props.songs.length ||
      this.props.playlists.length ||
      this.props.artists.length ||
      this.props.albums.length;

    return (
      <Spinner loading={this.props.fetching}>
        <div className="search-container">
          {!this.props.query && <Index />}
          {this.props.query &&
            results && (
              <Results
                artists={this.props.artists}
                playlists={this.props.playlists}
                albums={this.props.albums}
                songs={this.props.songs}
              />
            )}
          {this.props.query &&
            !results && <NoResults query={this.props.query} />}
        </div>
      </Spinner>
    );
  };
}

const mapStateToProps = state => {
  return {
    fetching: state.searchReducer.fetchSearchData,
    query: state.searchReducer.query,
    artists: state.searchReducer.artists || [],
    songs: state.searchReducer.tracks || [],
    playlists: state.searchReducer.playlists || [],
    albums: state.searchReducer.albums || []
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchSearchData
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);