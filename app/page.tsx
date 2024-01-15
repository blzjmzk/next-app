import Image from "next/image";
import testimage from "@/public/images/test-image.jpeg";
import { getServerSession } from "next-auth";
import { authHandler } from "@/app/auth";

export default function Home() {
  return (
    <main>
      <h1> Home</h1>
      <AuthenticatedContent />
    </main>
  );
}

async function AuthenticatedContent() {
  const session = await getServerSession();

  return (
    <div>
      <Image src={testimage} alt={"Landscape"} />
      {session ? (
        <>
          <p>Welcome, {session.user!.name}!</p>
        </>
      ) : null}
    </div>
  );
}
