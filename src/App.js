import React, { Fragment } from 'react';
import * as BooksAPI from './BooksAPI';
import Index from './components/Index';
import SearchBooks from './components/SearchBooks';
import Loader from './components/Loader';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

class BooksApp extends React.Component {
  state = {
    books: [],
    loading: false,
  };

  componentDidMount = () => {
    this.getAllBooks();
  };

  getAllBooks = () => {
    BooksAPI.getAll()
      .then((data) => this.setState({ books: data, loading: true }))
      .then(() =>
        this.setState({
          loading: setTimeout(() => {
            this.setState({ loading: false });
          }, 3000),
        }),
      )
      .catch((error) => console.error(error));
  };

  changeReadingState = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then((response) => {
        book.shelf = shelf;
        this.setState((state) => ({
          books: state.books.filter((bk) => bk.id !== book.id).concat([book]),
        }));
      })
      .catch((error) => console.error(error));
  };

  render() {
    const { books, loading } = this.state;
    return (
      <div className="list-books">
        <Router>
          <Fragment>
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <Switch>
              <Route
                path="/"
                exact={true}
                render={() =>
                  loading ? (
                    <Loader />
                  ) : (
                    <Index
                      allBookData={books}
                      onChangeReadingState={this.changeReadingState}
                    />
                  )
                }
              />
              <Route
                path="/search"
                render={(props) => (
                  <SearchBooks
                    {...props}
                    onChangeReadingState={this.changeReadingState}
                  />
                )}
              />
            </Switch>
          </Fragment>
        </Router>
      </div>
    );
  }
}

export default BooksApp;
