import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import './App.css';
import * as Global from './Global';
import Bookshelf from './Bookshelf';

class Booklist extends Component {
	render() {
/*
		let bookshelves = Object.keys(Global.Shelf).filter((item, i) => Global.Shelf[item].key !== Global.Shelf.NONE.key)
			.map((item, i) => (
				<Bookshelf
					key={Global.Shelf[item].key}
					onMoveBook={this.props.onMoveBook}
					bookshelf={Global.Shelf[item]}
					books={this.props.books}
					loading={this.props.loading}
				/>
			));
*/	

		return(
      	<div className="list-books">
         	<div className="list-books-title">
            	<h1>MyReads</h1>
            </div>
            <div className="list-books-content">					
            	<div>
						<Bookshelf
							key={Global.Shelf.CURRENTLY_READING.key}
							onMoveBook={this.props.onMoveBook}
							bookshelf={Global.Shelf.CURRENTLY_READING}
							books={this.props.books}
							loading={this.props.loading}
						/>
						<Bookshelf
							key={Global.Shelf.WANT_TO_READ.key}
							onMoveBook={this.props.onMoveBook}
							bookshelf={Global.Shelf.WANT_TO_READ}
							books={this.props.books}
							loading={this.props.loading}
						/>
						<Bookshelf
							key={Global.Shelf.READ.key}
							onMoveBook={this.props.onMoveBook}
							bookshelf={Global.Shelf.READ}
							books={this.props.books}
							loading={this.props.loading}
						/>
              	</div>
            </div>
            <div className="open-search">
					<Link to="/search">Add a book</Link>
            </div>
          </div>
		);
	}
}

Booklist.propTypes = {
	books: PropTypes.arrayOf(PropTypes.object),
	onMoveBook: PropTypes.func.isRequired
};

export default Booklist;
