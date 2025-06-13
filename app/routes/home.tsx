import type { Route } from "./+types/home";
import { useLoaderData } from "react-router";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({}: Route.LoaderArgs) {
  // Call the Lambda function
  let lambdaMessage = "Lambda not available";
  try {
    const functionUrl = process.env.HELLO_FUNCTION_URL;
    if (functionUrl) {
      const response = await fetch(functionUrl);
      const lambdaData = await response.json();
      lambdaMessage = lambdaData.message;
    }
  } catch (error) {
    console.error("Error calling Lambda:", error);
  }

  // Simulate some async data fetching
  await new Promise(resolve => setTimeout(resolve, 500));
  const randomNumber = Math.floor(Math.random() * 9000) + 1000;
  console.log(`Running loader ${randomNumber}`);
  return {
    message: `Hello from the loader ${randomNumber}!`,
    lambdaMessage,
    timestamp: new Date().toISOString(),
    data: {
      users: ["Alice", "Bob", "Charlie"],
      count: 42,
      isLoaded: true
    }
  };
}

export default function Home() {
  const loaderData = useLoaderData<typeof loader>();
  
  return (
    <div>
      <Welcome />
      <div style={{ marginTop: "2rem", padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}>
        <h2>Loader Data:</h2>
        <p><strong>Message:</strong> {loaderData.message}</p>
        <p><strong>Lambda Response:</strong> <span style={{ color: "#0066cc" }}>{loaderData.lambdaMessage}</span></p>
        <p><strong>Timestamp:</strong> {loaderData.timestamp}</p>
        <p><strong>Count:</strong> {loaderData.data.count}</p>
        <p><strong>Users:</strong> {loaderData.data.users.join(", ")}</p>
        <p><strong>Loaded:</strong> {loaderData.data.isLoaded ? "✅ Yes" : "❌ No"}</p>
      </div>
    </div>
  );
}
