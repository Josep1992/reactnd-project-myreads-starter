import React from 'react';
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
    BooksAPI.getAll().then((data) =>
      this.setState({ books: data, loading: true }),
    );
    this.setState({
      loading: setTimeout(() => {
        this.setState({ loading: false });
      }, 3000),
    });
  };

  render() {
    const { books, loading } = this.state;
    return (
      <Router>
        <Switch>
          <Route
            path="/"
            exact={true}
            render={() =>
              loading ? <Loader /> : <Index allBookData={books} />
            }
          />
          <Route path="/search" component={SearchBooks} />
        </Switch>
      </Router>
    );
  }
}

export default BooksApp;
