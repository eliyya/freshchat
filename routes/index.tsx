import { Head } from "$fresh/runtime.ts";
import Chat from "../islands/Chat.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Fresh App</title>
      </Head>
      <div class="mx-auto max-w-screen-md">
        <Chat/>
      </div>
    </>
  );
}
