"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Component() {
  // return "derp"
  const { data } = useSession();
  const router = useRouter();
  if (!data) {
    return <div>Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </div>;
  }
  // @ts-ignore
  const { accessToken, user } = data;
  console.log(user);
  return <>
    <button onClick={() => {
      signOut().then(() => router.refresh());
    }}>Log out
    </button>
    <div>User: {user?.email}</div>
    <div>Access Token: {accessToken}</div>
  </>;
}