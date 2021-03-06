import React, { useState, useEffect } from "react";
function Todo() {
	const [task, setTask] = useState("");
	const [listTask, setListTask] = useState([]);
	useEffect(() => {
		getList();
	}, []);
	const getList = () => {
		let fetchUrl =
			"https://assets.breatheco.de/apis/fake/todos/user/melissaaraya";
		fetch(fetchUrl)
			.then(response => response.json())
			.then(fetchBody => {
				setListTask(
					fetchBody.map(item => {
						return { label: item.label, done: item.done };
					})
				);
			})
			.catch(error => console.log("error", error));
	};
	const putFetch = listTaskNew => {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		var raw = JSON.stringify(listTaskNew);
		var requestOptions = {
			method: "PUT",
			headers: myHeaders,
			body: raw,
			redirect: "follow"
		};
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/melissaaraya",
			requestOptions
		)
			.then(response => response.text())
			.then(result => console.log("Resultado", result))
			.then(() => getList())
			.catch(error => console.log("error", error));
	};
	const putTask = () => {
		//cambio sin parametro "e"
		// e.preventDefault(); eliminamos el prevent para que el botón funcione
		if (task !== "") {
			putFetch([...listTask, { label: task, done: false }]);
			setTask("");
		} else {
			alert("Por favor ingrese tarea antes de confirmar");
		}
	};
	const deleteTask = indexDelete => {
		let resultado = listTask.filter((task, index) => index != indexDelete);
		putFetch(resultado);
	};
	// Delete all Tasks and user
	const deleteAll = async () => {
		const request = await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/melissaaraya",
			{ method: "DELETE" }
		);
		const json = await request.json();
		const data = json;
		createUser();
		fetchData();
		console.log("delete response", data);
	};
	return (
		<div className="container">
			<div className="todo-box row p-3">
				<div className="col">
					<h1 className="text-center">To Do</h1>
					<div className="mb-2">
						<form onSubmit={putTask}>
							<div className="d-flex">
								<input
									type="text"
									className="form-control"
									placeholder="add new task"
									onChange={e => {
										setTask(e.target.value);
									}}
									value={task}
									placeholder="Enter new task"
								/>
								<button
									onClick={e => putTask(e.target.value)} //este botón añade la nueva tarea
									className="btn btn-primary"
									type="button">
									Confirm
								</button>
							</div>
						</form>
					</div>
					<ul className="list-group">
						{listTask.map((item, index) => {
							return (
								<li
									key={index}
									className="d-flex list-group-item list-group-item-action">
									{item.label}
									<div id="close-icon" className="ml-auto">
										<i
											onClick={() => {
												deleteTask(index);
											}}
											className="far fa-times-circle"></i>
									</div>
								</li>
							);
						})}
					</ul>
					<small className="text-muted ml-2">
						{listTask.length} To do&#8217; s
					</small>
				</div>
			</div>
		</div>
	);
}
export default Todo;
