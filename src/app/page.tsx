import Link from "next/link";
import Navbar from "@/components/Navbar";
export default function Home() {
  return (
    <main>
      <Navbar />
      <h1>Welcome to Enzert</h1>

      <Link href="/login">
        <button>Login</button>
      </Link>
      <br />
      <Link href="/signup">
        <button>Create Account</button>
      </Link>
    </main>
  );
}
