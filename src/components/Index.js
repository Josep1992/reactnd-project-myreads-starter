import React, { Component } from 'react';
import Bookshelf from './Bookshelf';
import { Link } from 'react-router-dom';

class Index extends Component {
  render() {
    const { allBookData } = this.props;
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
          />
          <Bookshelf
            books={allBookData.filter((books) => books.shelf === 'wantToRead')}
            tier={'Want to Read'}
          />
          <Bookshelf
            books={allBookData.filter((books) => books.shelf === 'read')}
            tier={'Read'}
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
