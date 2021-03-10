import React, { useState } from "react";
import { Button } from "reactstrap";

function Todo() {
	const [task, setTask] = useState("");
	const [listTask, setListTask] = useState([]);
	const [isShown, setIsShown] = useState(false);

	const putTask = () => {
		if (task != "") {
			setListTask([...listTask, task]);
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
					<div className="input-group">
						<input
							type="text"
							className="form-control"
							placeholder="add new task"
							onChange={e => {
								setTask(e.target.value);
							}}
							value={task}
						/>
						<div className="input-group-append">
							{/* botón para meter task */}
							<button
								onClick={putTask}
								className="btn btn-outline-secondary"
								type="button">
								confirm
							</button>
						</div>
					</div>
					<ul className="list-group">
						{listTask.map((item, index) => {
							return (
								<li
									onMouseEnter={() => setIsShown(true)}
									onMouseLeave={() => setIsShown(false)}
									key={index}
									className="list-group-item list-group-item-action">
									{item}
									{isShown && (
										<Button
											close
											type="button"
											className="btn-close"
											onClick={() => {
												deleteTask(index);
											}}
										/>
									)}
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
