import React from "react";
import { NavLink, Link } from "react-router-dom";
import ApiContext from "../../ApiContext";
import Button from "../Button/Button";
import "./NoteListNav.css";

class NoteListNav extends React.Component {
	static contextType = ApiContext;

	render() {
		const { folders = [], notes = [] } = this.context;
		const countNotesForFolder = (notes = [], folderId) => notes.filter((note) => note.folderId === folderId).length;
		return (
			<div className="NoteListNav">
				<ul className="NoteListNav__list">
					{folders.map((folder) => (
						<li key={folder.id}>
							<NavLink className="NoteListNav__folder-link" to={`/folder/${folder.id}`}>
								<span className="NoteListNav__num-notes">{countNotesForFolder(notes, folder.id)}</span>
								{folder.name}
							</NavLink>
						</li>
					))}
				</ul>
				<div className="NoteListNav__button-wrapper">
					<Button tag={Link} to="/add-folder" type="button" className="NoteListNav__add-folder-button">
						<br />
						Folder
					</Button>
				</div>
			</div>
		);
	}
}

export default NoteListNav;
