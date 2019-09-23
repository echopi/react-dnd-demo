
import React from 'react'
import ReactDOM from 'react-dom'
import Example from './example'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import TouchBackend from 'react-dnd-touch-backend'

// https://github.com/Modernizr/Modernizr/blob/master/feature-detects/touchevents.js
const isTouch = ('ontouchstart' in window);

function App() {
	return (
		<div className="App">
			<DndProvider backend={isTouch?TouchBackend:HTML5Backend}>
				<Example />
			</DndProvider>
		</div>
	)
}
const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)	
