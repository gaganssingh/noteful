import React from "react";
import PropTypes from "prop-types";
import Note from "../Note/Note";
import ApiContext from "../../ApiContext";
import "./NotePageMain.css";

class NotePageMain extends React.Component {
	static defaultProps = {
		match : {
			params : {}
		}
	};
	static contextType = ApiContext;

	handleDeleteNote = (noteId) => {
		this.props.history.push(`/`);
	};

	render() {
		const { notes = [] } = this.context;
		const { noteId } = this.props.match.params;
		const findNote = (notes = [], noteId) => notes.find((note) => note.id === noteId);
		const note = findNote(notes, noteId) || { content: "" };
		return (
			<section className="NotePageMain">
				<Note id={note.id} name={note.name} modified={note.modified} onDeleteNote={this.handleDeleteNote} />
				<div className="NotePageMain__content">
					{note.content.split(/\n \r|\n/).map((para, i) => <p key={i}>{para}</p>)}
				</div>
			</section>
		);
	}
}

NotePageMain.propTypes = {
	match : PropTypes.object.isRequired
};

export default NotePageMain;
