import React from "react";
import { Route } from "react-router-dom";
import ApiContext from "./ApiContext";
import config from "./config";
import NoteListMain from "./components/NoteListMain/NoteListMain";
import NoteListNav from "./components/NoteListNav/NoteListNav";
import NotePageNav from "./components/NotePageNav/NotePageNav";
import NotePageMain from "./components/NotePageMain/NotePageMain";
import AddFolder from "./components/AddFolder/AddFolder";
import AddNote from "./components/AddNote/AddNote";
import Header from "./components/Header/Header";
import "./App.css";

class App extends React.Component {
	state = {
		notes   : [],
		folders : []
	};

	componentDidMount() {
		Promise.all([
			fetch(`${config.API_ENDPOINT}/notes`),
			fetch(`${config.API_ENDPOINT}/folders`)
		])
			.then(([ notesRes, foldersRes
			]) => {
				if (!notesRes.ok) return notesRes.json().then((e) => Promise.reject(e));
				if (!foldersRes.ok) return foldersRes.json().then((e) => Promise.reject(e));
				return Promise.all([
					notesRes.json(),
					foldersRes.json()
				]);
			})
			.then(([ notes, folders
			]) => {
				this.setState({ notes, folders });
			})
			.catch((error) => {
				console.error({ error });
			});
	}

	addNote = (note) => {
		this.setState({
			notes : [
				...this.state.notes,
				note
			]
		});
	};

	addFolder = (folder) => {
		this.setState({
			folders : [
				...this.state.folders,
				folder
			]
		});
	};

	handleDeleteNote = (noteId) => {
		this.setState({
			notes : this.state.notes.filter((note) => note.id !== noteId)
		});
	};

	renderNavRoutes() {
		return (
			<React.Fragment>
				{[
					"/",
					"/folder/:folderId"
				].map((path) => <Route exact key={path} path={path} component={NoteListNav} />)}
				<Route path="/note/:noteId" component={NotePageNav} />
				<Route path="/add-folder" component={NotePageNav} />
				<Route path="/add-note" component={NotePageNav} />
			</React.Fragment>
		);
	}

	renderMainRoutes() {
		return (
			<React.Fragment>
				{[
					"/",
					"/folder/:folderId"
				].map((path) => <Route exact key={path} path={path} component={NoteListMain} />)}
				<Route path="/note/:noteId" component={NotePageMain} />
				<Route path="/add-folder" component={AddFolder} />
				<Route path="/add-note" component={AddNote} />
			</React.Fragment>
		);
	}

	render() {
		const contextValue = {
			notes      : this.state.notes,
			folders    : this.state.folders,
			deleteNote : this.handleDeleteNote,
			addNote    : this.addNote,
			addFolder  : this.addFolder
		};
		return (
			<ApiContext.Provider value={contextValue}>
				<div className="App">
					<nav className="App__nav">{this.renderNavRoutes()}</nav>
					<Header />
					<main className="App__main">{this.renderMainRoutes()}</main>
				</div>
			</ApiContext.Provider>
		);
	}
}

export default App;
