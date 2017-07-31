import React, {Component} from 'react';
import update from 'react-addons-update';
import * as BooksAPI from './BooksAPI';
import Booklist from './Booklist';

class BooklistContainer extends Component {
	constructor() {
		super();
		this.state = {
			books: [],
			loading: true
		};
	}

	componentWillMount() {
		BooksAPI.getAll()
			.then(books => this.setState({ books: books, loading: false }))
			.catch(error => {
				// ToDo: Notification of error fetching books
				console.log('Error fetching books.');
				console.log(error);
				this.setState({ loading: false });
		});
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

	render() {
		return(
			<Booklist
				onMoveBook={this.handleMoveBook.bind(this)}
				books={this.state.books}
				loading={this.state.loading}
			/>
		);
	}
}

export default BooklistContainer;
