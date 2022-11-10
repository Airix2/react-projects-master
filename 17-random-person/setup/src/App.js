import React, { useState, useEffect } from "react";
import axios from "axios";
import {
	FaEnvelopeOpen,
	FaUser,
	FaCalendarTimes,
	FaMap,
	FaPhone,
	FaLock,
} from "react-icons/fa";
const url = "https://randomuser.me/api/";
const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";

function App() {
	const [title, setTitle] = useState("name");
	const [value, setValue] = useState("");
	const [user, setUser] = useState({});

	const getNewUser = async () => {
		try {
			let { data } = await axios.get(url);
			data = data.results[0];
			let userValues = {
				name: `${data.name.first} ${data.name.last}`,
				email: data.email,
				phone: data.phone,
				age: data.dob.age,
				street: `${data.location.street.number} ${data.location.street.name}`,
				password: data.login.password,
			};
			setUser(userValues);
			setTitle("name");
			setValue(userValues.name);
		} catch (error) {
			console.log(error.response);
		}
	};

	useEffect(() => {
		getNewUser();
	}, []);

	const handleValue = (e) => {
		if (e.target.dataset?.label) {
			let label = e.target.dataset?.label;
			if (title !== label) {
				setTitle(label);
				setValue(user[label]);
			}
		}
	};
	return (
		<main>
			<div className="block bcg-black"></div>
			<div className="block">
				<div className="container">
					<img src={user.image || defaultImage} alt="random" />
					<p className="user-title">My {title} is</p>
					<p className="user-value">{value}</p>
					<div className="values-list">
						<button
							className="icon"
							data-label="name"
							onMouseOver={handleValue}
						>
							<FaUser />
						</button>
						<button
							className="icon"
							data-label="email"
							onMouseOver={handleValue}
						>
							<FaEnvelopeOpen />
						</button>
						<button
							className="icon"
							data-label="age"
							onMouseOver={handleValue}
						>
							<FaCalendarTimes />
						</button>
						<button
							className="icon"
							data-label="street"
							onMouseOver={handleValue}
						>
							<FaMap />
						</button>
						<button
							className="icon"
							data-label="phone"
							onMouseOver={handleValue}
						>
							<FaPhone />
						</button>
						<button
							className="icon"
							data-label="password"
							onMouseOver={handleValue}
						>
							<FaLock />
						</button>
					</div>
					<button className="btn" onClick={getNewUser}>
						Random User
					</button>
				</div>
			</div>
		</main>
	);
}

export default App;
