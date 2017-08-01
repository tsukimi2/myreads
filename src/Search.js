import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import Book from './Book';

class Search extends Component {
	handleMoveBook(book_id, moveto_bookshelf) {
		this.props.onMoveBook(book_id, moveto_bookshelf);
	}

	handleSearch(evt) {
		this.props.handleSearch(evt);
	}

	render() {
		let books = this.props.books.map(book => (
			<li key={book.id}>
				<Book book={book} onMoveBook={this.props.onMoveBook.bind(this)} />
			</li>
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
					{ this.props.loading === false && books.length === 0 ? <span id="no-books">No books found</span>  : null }
					{ this.props.loading === true? <div>Loading...</div> : null }
					
           		<ol className="books-grid">
						{books}
					</ol>
				
           	</div>
        	</div>
		);
	}
}

Search.propTypes = {
	onMoveBook: PropTypes.func.isRequired,
	handleSearch: PropTypes.func.isRequired,
	books: PropTypes.array.isRequired,
	loading: PropTypes.bool.isRequired
};

export default Search;
