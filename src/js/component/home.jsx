
import React, { useState, useEffect } from "react";

//include images into your bundle


//create your first component
const Home = () => {

	const [task, setTask] = useState([])
	const [newtasks, setNewtasks] = useState("")

	const createUser = async () => {
		try {
			let response = await fetch(("https://playground.4geeks.com/apis/fake/todos/user/deyruby"), {
				method: "POST",
				headers: {
					"content-type": "application/json"
				},
				body: JSON.stringify([])

			})
			let data = await response.json()
			return true
		} catch (error) {
			return false

		}



	}

	const handleUser = () => {
		if (e.code === "Enter") {
			createUser(e)
		}
	}

	useEffect(() => {
		fetch(("https://playground.4geeks.com/apis/fake/todos/user/deyruby"), {
			method: "GET",
			headers: {
				"content-type": "application/json"
			},
		}).then(async (response) => {
			//console.log("response", response)
			if (response.status == 404) {
				await createUser()
			}
			return response.json()
		}).then((data) => {
			console.log("data", data)
			if (data.msg && data.msg == "The user deyruby doesn't exists") {
				setTask([])

			} else {
				setTask(data)
			}

		})
			.catch((error) =>
				console.log(error))
		console.log(task)
	}, [newtasks])

	const updateTask = (tarea) => {
		fetch("https://playground.4geeks.com/apis/fake/todos/user/deyruby", {
			method: "PUT",
			body: JSON.stringify(tarea),
			headers: {
				"content-type": "application/json",

			},
		}).then((response) => {
			console.log("response", response)
			return response.json()
		}).then((data) => {
			console.log("data", data)
		})
			.catch((error) =>
				console.log(error))





	}


	const deleteTasks = () => {
		fetch("https://playground.4geeks.com/apis/fake/todos/user/deyruby", {
			method: "DELETE",
			headers: {
				"content-type": "application/json",

			},

		})
		setTask([])
		createUser()
	}

	const deleteTaskintheApi = () => {
		fetch("https://playground.4geeks.com/apis/fake/todos/user/deyruby", {
			method: "DELETE",
			headers: {
				"content-type": "application/json",

			},

		})
	}

	const deleteWithTrash = (id) => {
		console.log("id", id)
		let auxVar = task.filter((element, _) => {
			return element.id != id

		})
		console.log("variable aux", auxVar)
		setTask(auxVar)

		updateTask(auxVar)
	}


	const enterPressed = (event) => {
		if (event.keyCode === 13 && event.target.value != "") {
			let variableAux = [...task, { label: newtasks, done: false }]
			updateTask(variableAux)
			setNewtasks("")

		}
	}



	return (
		<>
			<div className="todolist">
				<div className="header">
					<p>to-do-list</p>
				</div>
				<div className="container">
					<ul>
						<li className="input1"><input type="text" value={newtasks} onChange={e => setNewtasks(e.target.value)} name="label" placeholder="Add a new task" onKeyDown={(e) => enterPressed(e)} /></li>
						<button onClick={() => deleteTasks()}>Delete tasks</button>


						{
							task?.map((value, index) => {
								//console.log("index", index)
								return <li className="list" key={index}>{value.label}
									<i onClick={() => deleteWithTrash(value.id)} className="fa-solid fa-trash"></i>
								</li>
							})

						}
					</ul>

				</div>
			</div>

		</>
	);
};

export default Home;
