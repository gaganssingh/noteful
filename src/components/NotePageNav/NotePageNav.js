import React from "react";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import ApiContext from "../../ApiContext";
import "./NotePageNav.css";

class NotePageNav extends React.Component {
	static defaultProps = {
		history : {
			goBack : () => {}
		},
		match   : {
			params : {}
		}
	};
	static contextType = ApiContext;

	render() {
		const { notes, folders } = this.context;
		const { noteId } = this.props.match.params;
		const findFolder = (folders = [], folderId) => folders.find((folder) => folder.id === folderId);
		const findNote = (notes = [], noteId) => notes.find((note) => note.id === noteId);
		const note = findNote(notes, noteId) || {};
		const folder = findFolder(folders, note.folderId);
		return (
			<div className="NotePageNav">
				<Button
					tag="button"
					role="link"
					onClick={() => this.props.history.goBack()}
					className="NotePageNav__back-button"
				>
					<br />
					Back
				</Button>
				{folder && <h3 className="NotePageNav__folder-name">{folder.name}</h3>}
			</div>
		);
	}
}

NotePageNav.propTypes = {
	history : PropTypes.object.isRequired,
	match   : PropTypes.object.isRequired
};

export default NotePageNav;
