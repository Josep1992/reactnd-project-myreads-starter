import React, { Component } from 'react';
import * as BooksAPI from '../BooksAPI';
import Loader from './Loader';
import Book from './Book';
import { Link } from 'react-router-dom';

class SearchBooks extends Component {
  state = {
    query: '',
    loading: false,
    books: [],
    search: [],
  };

  componentDidMount = () => {
    this.setState({ books: this.props.location.state.books });
  };

  searchAllBooks = (query) => {
    if (this.state.query === '' || this.state.query === undefined) {
      return this.setState({ search: [] });
    } else {
      BooksAPI.search(query)
        .then((response) => {
          if (response.error) {
            return this.setState({ search: [] });
          } else {
            response.forEach((bk) => {
              let find = this.state.books.filter((book) => book.id === bk.id);
              if (find[0]) {
                bk.shelf = find[0].shelf;
              }
            });
            return this.setState({ search: response });
          }
        })
        .catch((error) => console.error(error));
    }
  };

  handleSearch = (query) => {
    this.setState({ query }, this.searchAllBooks);
  };

  render() {
    const { query, search } = this.state;
    const { onChangeReadingState } = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(e) => this.handleSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {search.map((book) => (
              <Book
                book={book}
                key={book.id}
                onChangeReadingState={onChangeReadingState}
              />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;
