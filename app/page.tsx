import Image from "next/image";
import TestCompo from "../components/TestCompo";
import GoToChat from "../components/GoToChat/GoToChat";





export default function Home() {

  return (
    <main>
      <div className="frontpage-centerer">
        <h1>Welcome to your localhost Nextjs chat</h1>

          <GoToChat />
          {/*<TestCompo />*/}
        </div>
    </main>
  );
}
