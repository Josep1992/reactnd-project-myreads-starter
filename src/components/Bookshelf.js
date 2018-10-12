import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

class Bookshelf extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
  };

  render() {
    const { books, tier } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{tier}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.length !== 0
              ? books.map((book) => <Book book={book} key={book.id} />)
              : console.log('Books are empty')}
          </ol>
        </div>
      </div>
    );
  }
}

export default Bookshelf;
