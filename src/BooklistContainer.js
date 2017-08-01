import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Booklist from './Booklist';

class BooklistContainer extends Component {
	componentWillMount() {
		this.props.initBooklistContainer();
		this.props.handleGetBooklist();
	}

	render() {
		return(
			<Booklist
				onMoveBook={this.props.onMoveBook}
				books={this.props.books}
				loading={this.props.loading}
			/>
		);
	}
}

BooklistContainer.propTypes = {
	books: PropTypes.arrayOf(PropTypes.object),
	handleGetBooklist: PropTypes.func.isRequired,
	initBooklistContainer: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
	onMoveBook: PropTypes.func.isRequired
}

export default BooklistContainer;
