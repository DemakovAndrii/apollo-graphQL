import { useQuery, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { GET_ALL_USERS } from "./query/user";
import { CREATE_USER } from "./mutations/user";

export default function App() {
	const { data, loading, error, refetch } = useQuery(GET_ALL_USERS);
	const [newUser] = useMutation(CREATE_USER);
	const [users, setUsers] = useState([]);
	const [username, setUsername] = useState("");
	const [age, setAge] = useState(0);

	useEffect(() => {
		if (!loading) {
			setUsers(data.getAllUsers);
		}
	}, [data]);

	const addUser = (e) => {
		e.preventDefault();
		newUser({
			variables: {
				input: {
					username,
					age,
				},
			},
		}).then(({ data }) => {
			console.log(data);
			setUsername("");
			setAge(0);
		});
	};

	const getAll = (e) => {
		e.preventDefault();
		refetch();
	};

	if (loading) {
		return <h1>Loafing...</h1>;
	}

	return (
		<div>
			<form>
				<input
					type="text"
					placeholder="name"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<input
					type="number"
					placeholder="age"
					value={age}
					onChange={(e) => setAge(e.target.value)}
				/>
				<div className="btns">
					<button onClick={(e) => addUser(e)}>Создать</button>
					<button onClick={(e) => getAll(e)}>Получить</button>
				</div>
				{users.map((user) => (
					<div>
						{user.id}. {user.username} - {user.age}
					</div>
				))}
			</form>
		</div>
	);
}
