import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useSession, signIn, signOut } from "next-auth/react";
import ChatBubble from "../components/ChatBubble";
import SendMessage from "../components/SendMessage";
import ChatWindow from "../components/ChatWindow";

const Home: NextPage = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <Head>
          <title>Recycle Master</title>
        </Head>
        <h1 className="text-4xl font-bold text-blue-700">
          Signed in as {session?.user?.name}
        </h1>
        <button
          className="p-4 bg-green-400 rounded-2xl mt-4"
          onClick={() => signOut()}
        >
          Sign Out
        </button>
        <ChatWindow />
      </>
    );
  }
  return (
    <>
      <Head>
        <title>Recycle Master</title>
      </Head>
      <h1 className="text-4xl font-bold">Not signed in.</h1>
      <button
        className="p-4 bg-amber-200 rounded-2xl mt-4"
        onClick={() => signIn()}
      >
        Sign In
      </button>
      <ChatWindow />
    </>
  );
};

export default Home;
