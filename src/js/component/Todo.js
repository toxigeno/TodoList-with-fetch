import React, { useState, useEffect } from "react";

function Todo() {
	const [task, setTask] = useState("");
	const [listTask, setListTask] = useState([]);

	useEffect(() => {
		getList();
	}, []);

	const getList = () => {
		console.log("Entró Get List");
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
		console.log(listTaskNew);
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify(listTaskNew);
		console.log("Body Request ", raw);

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
			.catch(error => console.log("error", error));
	};

	const putTask = e => {
		e.preventDefault();
		if (task != "") {
			setListTask([...listTask, { label: task, done: false }]);
			putFetch(listTask);
			setTask("");
		} else {
			alert("Por favor ingrese tarea antes de confirmar");
		}
	};

	const deleteTask = indexDelete => {
		let resultado = listTask.filter((task, index) => index != indexDelete);
		setListTask(resultado);
	};

	return (
		<div className="container">
			<div className="todo-box row p-3">
				<div className="col">
					<h1 className="text-center">To Do</h1>
					<div className="input-group mb-2">
						<form onSubmit={putTask}>
							<input
								type="text"
								className="form-control"
								placeholder="add new task"
								onChange={e => {
									setTask(e.target.value);
								}}
								value={task}
							/>
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
						{listTask.length} tareas por hacer
					</small>
				</div>
			</div>
		</div>
	);
}

export default Todo;
