import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ApiContext from "../../ApiContext";
import Note from "../Note/Note";
import Button from "../Button/Button";
import "./NoteListMain.css";

const getNotesForFolder = (notes = [], folderId) =>
	!folderId ? notes : notes.filter((note) => note.folderId === folderId);

class NoteListMain extends React.Component {
	static defaultProps = {
		match : {
			params : {}
		}
	};
	static contextType = ApiContext;

	render() {
		const { folderId } = this.props.match.params;
		const { notes = [] } = this.context;
		const notesForFolder = getNotesForFolder(notes, folderId);
		return (
			<section className="NoteListMain">
				<ul>
					{notesForFolder.map((note) => (
						<li key={note.id}>
							<Note id={note.id} name={note.name} modified={note.modified} />
						</li>
					))}
				</ul>
				<div className="NoteListMain__button-container">
					<Button tag={Link} to="/add-note" type="button" className="NoteListMain__add-note-button">
						<br />
						Add Note
					</Button>
				</div>
			</section>
		);
	}
}

NoteListMain.propTypes = {
	match : PropTypes.object.isRequired
};

export default NoteListMain;
