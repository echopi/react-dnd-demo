
	import React from 'react'
	import ReactDOM from 'react-dom'
	import Example from './example'
	import { DndProvider } from 'react-dnd'
	// import HTML5Backend from 'react-dnd-html5-backend'
	import TouchBackend from 'react-dnd-touch-backend'

	
	function App() {
		return (
			<div className="App">
				<DndProvider backend={TouchBackend}>
					<Example />
				</DndProvider>
			</div>
		)
	}
	const rootElement = document.getElementById('root')
	ReactDOM.render(<App />, rootElement)	
