import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

class Bookshelf extends Component {
	render() {
		let books = this.props.books.filter((book) => book.shelf === this.props.bookshelf.key)
		.map((book) => (
			<li key={book.id}><Book book={book} onMoveBook={this.props.onMoveBook} /></li>
		));

		return(
      	<div className="bookshelf">
      	   <h2 className="bookshelf-title">{this.props.bookshelf.title}</h2>
         	<div className="bookshelf-books">
					{ this.props.loading === false && books.length === 0 ? <span id="no-books">No books found</span>  : null }
					{ this.props.loading === false ? null : <div>Loading...</div> } 
           		<ol className="books-grid">
					{books}
           		</ol>
         	</div>
       	</div>
		);
	}
}

Bookshelf.propTypes = {
	bookshelf: PropTypes.shape({
		title: PropTypes.string.isRequired
	}),
	onMoveBook: PropTypes.func.isRequired
};

export default Bookshelf;
