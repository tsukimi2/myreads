import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import update from 'react-addons-update';
import * as BooksAPI from './BooksAPI';
import Book from './Book';

class Search extends Component {
	constructor() {
		super();
		this.state = {
			books: [],
			loading: false,
			max_results: 10	// ToDo: implement UI for user input max results
		};
	}

	handleMoveBook(book_id, moveto_bookshelf) {
		let prev_state = this.state.books;

		let book_index = this.state.books.findIndex((book) => book.id === book_id);
		let book = Object.assign({}, this.state.books[book_index]);
		if(book_index !== -1) {
			let new_state = update(this.state.books, {
				[book_index]: {
					shelf: {
						$set: moveto_bookshelf
					}
				}
			});

			this.setState({ books: new_state });
		}
		
		BooksAPI.update(book, moveto_bookshelf)
		.then((res) => {
			// ToDo: notify user of update success
		}).catch((error) => {
			// ToDo: notify user of update failed
			this.setState({ books: prev_state });
		});
	}

	handleSearch(evt) {
		let empty_query = false;
		let query = '';

		if(evt.target.value && (query = evt.target.value.trim())) {
			this.setState({ loading: true });

			BooksAPI.search(query, this.state.max_results)
				.then(res => {
					if(typeof res.error === 'undefined') {
						this.setState({ books: res, loading: false });
					} else {
						throw new Error(res.error);
					}
				})
				.catch(error => {
					// ToDo: user notification
					console.log('error');
					console.log(error);

					this.setState({ books: [], loading: false });
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
		let books = this.state.books.map(book => (
			<li key={book.id}><Book book={book} onMoveBook={this.handleMoveBook.bind(this)} /></li>
		));

		return(
      	<div className="search-books">
         	<div className="search-books-bar">
					<Link to="/" className="close-search">Close</Link>
           		<div className="search-books-input-wrapper">
             		{/*
  	               	NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  	You can find these search terms here:
                  	https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  	However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  	you don't find a specific author or title. Every search is limited by search terms.
                		*/}
              		<input type="text" placeholder="Search by title or author" onChange={this.handleSearch.bind(this)} />
           		</div>
          	</div>
          	<div className="search-books-results">				
					{ this.state.loading === false && books.length === 0 ? <span id="no-books">No books found</span>  : null }
					{ this.state.loading === true? <div>Loading...</div> : null }
					
           		<ol className="books-grid">
						{books}
					</ol>
				
           	</div>
        	</div>
		);
	}
}

export default Search;
