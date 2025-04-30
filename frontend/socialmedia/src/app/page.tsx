import Login from "./components/login";
import Register from "./components/register";

export default function Home() {
  return (
    <main>
      <div className="grid grid-cols-2">
        <Login></Login>
        <Register></Register>
      </div>
    </main>
  );
}