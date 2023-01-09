import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const client = new ApolloClient({
	uri: "http://localhost:5000/graphql",
	cache: new InMemoryCache(),
});

root.render(
	<ApolloProvider client={client}>
		<StrictMode>
			<App />
		</StrictMode>
	</ApolloProvider>
);
