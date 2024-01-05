
import React, { useState, useEffect } from "react";

//include images into your bundle


//create your first component
const Home = () => {

	const [task, setTask] = useState([])
	const [ newtasks, setNestasks] = useState({label:"", done: false})
	
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
			//console.log("data", data)
			setTask(data)
		})
			.catch((error) =>
				console.log(error))

	}, [])
	
	const updateTask = () => {
		console.log(task)
		fetch("https://playground.4geeks.com/apis/fake/todos/user/deyruby", {
			method: "PUT",
			body: JSON.stringify(task),
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


	const deleteTasks = () => { fetch("https://playground.4geeks.com/apis/fake/todos/user/deyruby", {
		method: "DELETE",
		headers: {
			"content-type": "application/json",

		},
       
	})
	setTask([])
	createUser()
}
	const enterPressed = (event) => {
		if (event.keyCode === 13 && event.target.value != "") {
			setTask([...task, newtasks])
			updateTask()

		}
	}
	
	
	const handleChange = (event) => {
		const tarea = {
			label: event.target.value,
			done: false,
		}
		setNestasks(tarea)
		event.target.value = ""
		
	}
	return (
		<>
			<div className="todolist">
				<div className="header">
					<p>to-do-list</p>
				</div>
				<div className="container">
					<ul>
						<li className="input1"><input type="text" value={newtasks.label} onChange={handleChange} name="label" placeholder="Add a new task" onKeyDown={(e) => enterPressed(e)} /></li>
						<button onClick={() => deleteTasks()}>Delete tasks</button>
					

						{
							task.map((value, index) => {
								//console.log("index", index)
								return <li className="list" key={index}>{value.label}
									<i onClick={() => setTask(task.filter((_, currentIndex) => {
										console.log("currentIndex", currentIndex)
										return currentIndex != index
									}))} className="fa-solid fa-trash"></i>
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
