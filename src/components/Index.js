import React, { Component } from 'react';
import Bookshelf from './Bookshelf';
import { Link } from 'react-router-dom';

class Index extends Component {
  render() {
    const { allBookData, onChangeReadingState } = this.props;
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <Bookshelf
            books={allBookData.filter(
              (books) => books.shelf === 'currentlyReading',
            )}
            tier={'Currently Reading'}
            onChangeReadingState={onChangeReadingState}
          />
          <Bookshelf
            books={allBookData.filter((books) => books.shelf === 'wantToRead')}
            tier={'Want to Read'}
            onChangeReadingState={onChangeReadingState}
          />
          <Bookshelf
            books={allBookData.filter((books) => books.shelf === 'read')}
            tier={'Read'}
            onChangeReadingState={onChangeReadingState}
          />
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default Index;
