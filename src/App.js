import React from 'react';
import * as BooksAPI from './BooksAPI';
import Index from './components/Index';
import SearchBooks from './components/SearchBooks';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

class BooksApp extends React.Component {
  state = {
    books: [],
  };

  getAllBooks = () => {
    BooksAPI.getAll().then((data) => this.setState({ books: data }));
  };

  componentDidMount = () => {
    this.getAllBooks();
  };

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact={true} component={Index} />
          <Route path="/search" component={SearchBooks} />
        </Switch>
      </Router>
    );
  }
}

export default BooksApp;
