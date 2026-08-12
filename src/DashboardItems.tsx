import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";

import { TodosSchema } from "./DashboardItems.schema";

const fetchTodos = async (id?: string) => {
  // await new Promise((resolve) => setTimeout(resolve, 250));
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}/todos123`,
  );

  if (!response.ok) {
    const errorBody = await response.text();

    console.error("Failed todos response", {
      url: response.url,
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
      headers: Object.fromEntries(response.headers.entries()),
      body: errorBody,
    });

    throw new Error("Failed to fetch todos", {
      cause: {
        status: response.status,
        statusText: response.statusText,
        body: errorBody,
      },
    });
  }

  const data = await response.json();
  return TodosSchema.parse(data);
};

const DashboardItems = () => {
  const { id } = useParams<{ id?: string }>();
  const {
    data: todos = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["todos", id],
    queryFn: () => fetchTodos(id),
    enabled: Boolean(id),
    retry(failureCount, error) {
      if (error instanceof Error) {
        console.error(
          `Failed to fetch todos for user ${id} (attempt ${failureCount}): ${error.message}`,
          error.cause ? { cause: error.cause } : {},
        );
      }
      return failureCount < 3; // Retry up to 3 times
    },
  });

  let errorMessage: string | null = null;
  if (error instanceof Error) {
    const cause = error.cause ? ` ${JSON.stringify(error.cause)}` : "";
    errorMessage = `${error.message}${cause}`;
  }

  let content;
  if (isLoading) {
    content = (
      <>
        <div className="spinner"></div>
        {/* <p>Loading...</p> */}
      </>
    );
  } else if (isError) {
    content = <p>{errorMessage}</p>;
  } else {
    content = (
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    );
  }

  return (
    <div>
      <h1>Dashboard Item {id}</h1>
      <Link to="/dashboard">Back to Dashboard</Link>
      {content}
    </div>
  );
};

export default DashboardItems;
