import React from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import CatchError from "../../ErrorBoundries/CatchError";
import ApiContext from "../../ApiContext";
import config from "../../config";
import PropTypes from "prop-types";
import "./Note.css";

class Note extends React.Component {
	static defaultProps = {
		onDeleteNote : () => {}
	};
	static contextType = ApiContext;

	handleClickDelete = (e) => {
		e.preventDefault();
		const noteId = this.props.id;

		fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
			method  : "DELETE",
			headers : {
				"content-type" : "application/json"
			}
		})
			.then((response) => {
				if (!response.ok) {
					return response.json().then((e) => Promise.reject(e));
				}
				return response.json();
			})
			.then(() => {
				this.context.deleteNote(noteId);
				this.props.onDeleteNote(noteId);
			})
			.catch((error) => console.error({ error }));
	};

	render() {
		const { name, id, modified } = this.props;
		return (
			<div className="Note">
				<CatchError>
					<h2 className="Note__title">
						<Link to={`/note/${id}`}>{name}</Link>
					</h2>
					<button className="Note__delete" type="button" onClick={this.handleClickDelete}>
						Remove
					</button>
					<div className="Note__dates">
						<div className="Note__dates-modified">
							Modified <span className="Date">{format(modified, "Do MMM YYYY")}</span>
						</div>
					</div>
				</CatchError>
			</div>
		);
	}
}

Note.propTypes = {
	name         : PropTypes.string,
	id           : PropTypes.string,
	modified     : PropTypes.string,
	onDeleteNote : PropTypes.func.isRequired
};

export default Note;
