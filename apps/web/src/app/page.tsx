import { Button } from "antd";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <h1>LiveStock Management</h1>
      <Button>
        <Link href={"/login"}>Start Now!</Link>
      </Button>
    </div>
  );
}
