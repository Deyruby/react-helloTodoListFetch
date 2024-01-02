
import React, { useState, useEffect } from "react";

//include images into your bundle


//create your first component
const Home = () => {

	const [task, setTask] = useState([])

	useEffect(() => {
		fetch(("https://playground.4geeks.com/apis/fake/todos/user/deyruby"), {
			method: "GET",
			headers: {
				"content-type": "application/json"
			},
		}).then((response) => {
			//console.log("response", response)
			return response.json()
		}).then((data) => {
			console.log("data", data)
			setTask(data)
		})
			.catch((error) =>
				console.log(error))

	}, [])
const updateTask= ()=>{
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

	


	const enterPressed = (event) => {
		if (event.keyCode === 13 && event.target.value != "") {
			handleChange(event)

		}
	}
	const handleChange = (event) => {
		const newTask = {
			label: event.target.value,
			done: false,
		}
		setTask([...task, newTask])
		//console.log(event.target.value)
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
						<li className="input1"><input type="text" name="label" placeholder="Add a new task" onKeyDown={(e) => enterPressed(e)} /></li>
						<button onClick = {() => updateTask()}>Update tasks</button>
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
