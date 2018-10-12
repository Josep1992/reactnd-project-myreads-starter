import React, { Component } from 'react';
import * as BooksAPI from '../BooksAPI';
import Loader from './Loader';
import Book from './Book';
import { Link } from 'react-router-dom';

/* https://www.youtube.com/watch?v=acJHkd6K5kI&t=0s&list=PLKC17wty6rS1XVZbRlWjYU0WVsIoJyO3s&index=4%2A%2F
   searchAllBooks function Tutorial Requests: FEND Project 6 - Walk Through (LONG) Ryan Waite
*/
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

  searchAllBooks = () => {
    if (this.state.query === '' || this.state.query === undefined) {
      return this.setState({ search: [] });
    } else {
      BooksAPI.search(this.state.query.trim())
        .then((response) => {
          if (response.error) {
            return this.setState({ search: [] });
          } else {
            this.setState({ loading: true });
            response.forEach((bk) => {
              let find = this.state.books.filter((book) => book.id === bk.id);
              if (find[0]) {
                bk.shelf = find[0].shelf;
              }
            });
            return this.setState({
              search: response,
              loading: setTimeout(() => {
                this.setState({ loading: false });
              }, 2000),
            });
          }
        })
        .catch((error) => console.error(error));
    }
  };

  handleSearch = (query) => {
    this.setState({ query }, this.searchAllBooks);
  };

  render() {
    const { query, search, loading } = this.state;
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
            {loading ? (
              <Loader />
            ) : (
              search.map((book) => (
                <Book
                  book={book}
                  key={book.id}
                  onChangeReadingState={onChangeReadingState}
                />
              ))
            )}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;
