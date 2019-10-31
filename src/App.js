import React from "react";
import { Route, Link } from "react-router-dom";
import dummyStore from "./dummy-store";
import NoteListMain from "./NoteListMain/NoteListMain";
import NoteListNav from "./NoteListNav/NoteListNav";
import NotePageNav from "./NotePageNav/NotePageNav";
import NotePageMain from "./NotePageMain/NotePageMain";
import "./App.css";

// FROM notes-helpers.js
const findFolder = (folders = [], folderId) => folders.find((folder) => folder.id === folderId);

const findNote = (notes = [], noteId) => notes.find((note) => note.id === noteId);

const getNotesForFolder = (notes = [], folderId) =>
	!folderId ? notes : notes.filter((note) => note.folderId === folderId);

class App extends React.Component {
	state = {
		notes   : [],
		folders : []
	};

	componentDidMount() {
		setTimeout(() => this.setState(dummyStore), 600);
	}

	renderNavRoutes() {
		const { notes, folders } = this.state;
		return (
			<React.Fragment>
				{[
					"/",
					"/folder/:folderId"
				].map((path) => (
					<Route
						exact
						key={path}
						path={path}
						render={(routeProps) => <NoteListNav folders={folders} notes={notes} {...routeProps} />}
					/>
				))}
				<Route
					path="/note/:noteId"
					render={(routeProps) => {
						const { noteId } = routeProps.match.params;
						const note = findNote(notes, noteId) || {};
						const folder = findFolder(folders, note.folderId);
						return <NotePageNav {...routeProps} folder={folder} />;
					}}
				/>
				<Route path="/add-folder" component={NotePageNav} />
				<Route path="/add-note" component={NotePageNav} />
			</React.Fragment>
		);
	}

	renderMainRoutes() {
		const { notes } = this.state;
		return (
			<React.Fragment>
				{[
					"/",
					"/folder/:folderId"
				].map((path) => (
					<Route
						exact
						key={path}
						path={path}
						render={(routeProps) => {
							const { folderId } = routeProps.match.params;
							const notesForFolder = getNotesForFolder(notes, folderId);
							return <NoteListMain {...routeProps} notes={notesForFolder} />;
						}}
					/>
				))}
				<Route
					path="note/:noteId"
					render={(routeProps) => {
						const { noteId } = routeProps.match.params;
						const note = findNote(notes, noteId);
						return <NotePageMain {...routeProps} note={note} />;
					}}
				/>
			</React.Fragment>
		);
	}

	render() {
		return (
			<div className="App">
				<nav className="App__nav">{this.renderNavRoutes()}</nav>
				<header className="App__header">
					<h1>
						<Link to="/">Noteful</Link>
					</h1>
				</header>
				<main className="App__main">{this.renderMainRoutes()}</main>
			</div>
		);
	}
}

export default App;
