import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { Loader } from 'semantic-ui-react'

import CardPet from './CardPet';
import './list.css';

class ListImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listUrl: []
    }
  }

  componentDidMount() {
    this.loadMore();
  }

  loadMore = () => {
    fetch('https://dog.ceo/api/breeds/image/random/10')
    .then(response => response.json())
    .then(response => {
      const { message, status } = response;
      this.setState(state => ({
        ...state,
        listUrl: [
          ...state.listUrl,
          ...message
        ],
        status
      }))
    });
  }

  render () {
    const { listUrl } = this.state;
    return (
      <React.Fragment>
        <InfiniteScroll
          className="u-width-100"
          pageStart={0}
          loadMore={this.loadMore}
          hasMore={true || false}
          loader={
            <Loader active inline='centered' className="u-mt-20" key="loader" />
          }
        >
          <div className="list-pet">
          {
            listUrl.map((url, index) => <CardPet src={url} key={index} />)
          }
          </div>
        </InfiniteScroll>
        
      </React.Fragment>
    )
  }
}

export default ListImage;