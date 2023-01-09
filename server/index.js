const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");
const schema = require("./schema");
const users = [
	{ id: 1, username: "Test", age: 18 },
	{ id: 2, username: "Test2", age: 18 },
	{ id: 3, username: "Test3", age: 18 },
	{ id: 4, username: "Test4", age: 18 },
];

const app = express();
app.use(cors());

const createUser = (input) => {
	const id = Date.now();
	return {
		id,
		...input,
	};
};
// const deleteUser = (id) => {
// 	return users.find((user) => user.id == id);
// };

const root = {
	getAllUsers: () => {
		return users;
	},
	getUser: ({ id }) => {
		return users.find((user) => user.id === id);
	},
	createUser: ({ input }) => {
		const user = createUser(input);
		users.push(user);
		return user;
	},
	// deleteUser: ({ id }) => {
	// 	const user = deleteUser(id);
	// 	users.filter(user);
	// 	return user;
	// },
};

app.use(
	"/graphql",
	graphqlHTTP({
		graphiql: true,
		schema,
		rootValue: root,
	})
);
app.listen(5000, () => console.log("started on 5000"));
