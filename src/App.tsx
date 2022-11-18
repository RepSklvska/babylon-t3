import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Index from './elements/index'
import Scene1 from './elements/scene1'
import Scene2 from './elements/scene2'

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Index/>}></Route>
				<Route path="/scene1" element={<Scene1/>}></Route>
				<Route path="/scene2" element={<Scene2/>}></Route>
			</Routes>
		</div>
	);
}

export default App;
