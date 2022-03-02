import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [list, setList] = useState([]);
	const [todo, setTodo] = useState('');
	const [isLoading, setisLoading] = useState(true);
	const [reload, setReload] = useState(true);

	useEffect(() => {
		axios.get('http://localhost:3001/list').then((response) => {
			setList(response.data);
			setisLoading(false);
			setTodo("");
		});
	}, [reload]);

	const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.code === 'Enter') {
			handleClick();
		}
	};

	const checkboxHandle = (id: any) => {
		setReload(false);
		axios
		.post('http://localhost:3001/remove?id='+id)
		.then((response) => {
			if (response.status === 200) {
				setReload(true);
			}
		});
	}

	const handleClick = () => {
		setReload(false);
		axios
			.post('http://localhost:3001/add', { todo: todo })
			.then((response) => {
				if (response.status === 200) {
					setReload(true);
				}
			});
	};

	if (isLoading) {
		return <p>Loading ...</p>;
	}

	return (
		<div className="container">
			<div id="add">
				<input
					id="todo-input"
					type='text'
					value={todo}
					onChange={(e) => {
						setTodo(e.target.value);
					}}
					onKeyDown={keyDownHandler}
				/>
				<button
					onClick={(e) => {
						handleClick();
					}}>
					Add
				</button>
			</div>
			<ul>
				{list.map((x, key) => {
					return (
						<li className="list-item" key={key}>
							<input type="checkbox" onClick={()=>{checkboxHandle(x[0])
							}}/>
							<span>{x[1]}</span>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export default App;
