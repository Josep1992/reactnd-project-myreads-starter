import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

const Bookshelf = (props) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{props.tier}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {props.books.length !== 0
          ? props.books.map((book) => (
              <Book
                book={book}
                key={book.id}
                onChangeReadingState={props.onChangeReadingState}
              />
            ))
          : console.log('Books are empty')}
      </ol>
    </div>
  </div>
);

Bookshelf.propTypes = {
  books: PropTypes.array.isRequired,
  onChangeReadingState: PropTypes.func.isRequired,
  tier: PropTypes.string.isRequired,
};

export default Bookshelf;
