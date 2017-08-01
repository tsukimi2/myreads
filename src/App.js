import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import update from 'react-addons-update';
import './App.css';
import * as BooksAPI from './BooksAPI';
import BooklistContainer from './BooklistContainer';
import Search from './Search';

const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return (
    React.createElement(component, finalProps)
  );
}

const PropsRoute = ({ component, ...rest }) => {
  return (
    <Route {...rest} render={routeProps => {
      return renderMergedProps(component, routeProps, rest);
    }}/>
  );
}

class App extends Component {
	constructor() {
		super();
		this.state = {
			books: [],
			search: {
				books: [],
				max_results: 10,
			},
			loading: false,
		};
	}

	handleGetBooklist() {
		BooksAPI.getAll()
			.then(books => this.setState({ books: books, loading: false }))
			.catch(error => {
				// ToDo: Notification of error fetching books
				console.log('Error fetching books.');
				console.log(error);
				this.setState({ loading: false });
		});
	}

	handleMoveBook(book_id, shelf) {
		let prev_state = this.state;

		let book_index = this.state.books.findIndex((book) => book.id === book_id);
		let search_book_index = this.state.search.books.findIndex(book => book.id === book_id);

		if(search_book_index !== -1) {
	      let new_state = update(this.state.search.books, {
	         [search_book_index]: {
	            shelf: {
	               $set: shelf
	            }
	         }
	      });
	      this.setState({ search: {books: new_state }});
		}


		let book = null;
		if(book_index !== -1) {
			book = Object.assign({}, this.state.books[book_index]);

			if (book.shelf !== shelf) {
				book.shelf = shelf;
			}
		} else if(search_book_index !== -1) {
			book = Object.assign({}, this.state.search.books[search_book_index]);
		}

		if(book_index !== -1 || (book_index === -1 && search_book_index !== -1)) {
			// Filter out the book and append it to the end of the list
			// so it appears at the end of whatever shelf it was added to.
			this.setState(state => ({
				books: state.books.filter(b => b.id !== book.id).concat([ book ])
			}));

			BooksAPI.update(book, shelf).then(() => {
				// update 
			}).catch((error) => {
				// ToDo: notify user of update failed
				this.setState(prev_state);
			});
		}		

	}

	initBooklistContainer() {
		this.setState({ search: { books: [] }});
	}

	processSearch(searched_books, books) {
		for(let i = 0; i < searched_books.length; i++) {
			for(let j = 0; j < books.length; j++) {
				if(searched_books[i].id === books[j].id) {
					if(searched_books[i].shelf !== books[j].shelf) {
						searched_books[i].shelf = books[j].shelf;
					}

					break;
				}
			}
		}

		return searched_books;
	}

	handleSearch(evt) {
		let empty_query = false;
		let query = '';

		if(evt.target.value && (query = evt.target.value.trim())) {
			this.setState({ loading: true });

			BooksAPI.search(query, this.state.search.max_results)
				.then(res => {
					if(typeof res.error === 'undefined') {
						let searched_books = res;

						if(this.state.books.length !== 0) {
							this.setState({ 
								search: {
									books: this.processSearch(searched_books, this.state.books)
								},
								loading: false
							});							
						} else {
							BooksAPI.getAll()
							.then(books => {
								this.setState({ books: books });
								this.setState({ 
									search: {
										books: this.processSearch(searched_books, this.state.books)
									},
									loading: false
								});								
							})
							.catch(error => {
								this.setState({ loading: false });
							});
						}
					} else {
						throw new Error(res.error);
					}
				})
				.catch(error => {
					// ToDo: user notification
					console.log('error');
					console.log(error);

					this.setState({
						search: {
							books: []
						},
						loading: false
					});
					if(error.message === 'empty query') {
						// ToDo: user notification
						console.log('err');
					}
			});
		} else {
			empty_query = true;
		}

		if(empty_query) {
			this.setState({ books: [] });
		}	

	}

	render() {
		return(
			<BrowserRouter history={createBrowserHistory()}>
				<div className="app">	
					<PropsRoute
						exact={true}
						path='/'
						component={BooklistContainer}
						handleGetBooklist={this.handleGetBooklist.bind(this)}
						initBooklistContainer={this.initBooklistContainer.bind(this)}
						onMoveBook={this.handleMoveBook.bind(this)}
						books={this.state.books}
						loading={this.state.loading}
					/>
					<PropsRoute
						path="/search"
						component={Search}
						onMoveBook={this.handleMoveBook.bind(this)}
						handleSearch={this.handleSearch.bind(this)}
						books={this.state.search.books}
						loading={this.state.loading}
					/>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
