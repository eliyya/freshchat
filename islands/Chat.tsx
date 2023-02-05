import { useEffect, useState } from "preact/hooks";

export default function Chat() {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    fetch("https://mppapi.up.railway.app/ws/messages")
      .then((r) => r.json())
      .then((r: { id: string; content: string }[]) =>
        setMessages(r.map((m) => m.content))
      );
  }, []);

  useEffect(() => {
    const ws = new WebSocket("wss://mppapi.up.railway.app");
    ws.onopen = () => console.log("ws connected!");
    ws.onmessage = (message) => {
      if (message.data.toString() === "ping") return ws.send("pong");
      setMessages((p) => [...p, message.data.toString()]);
    };
    ws.onclose = () => console.log("ws closed!");
    return () => ws.close();
  }, []);

  const sendMessage = () => {
    const t = document.querySelector("input");
    console.log(t?.value);

    if (!t?.value) return;
    fetch("https://mppapi.up.railway.app/ws/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: t.value }),
    });
    t.value = "";
  };

  return (
    <div class="flex flex-col-reverse flex-nowrap h-screen max-h-screen">
      <div class="flex gap-2 flex-row-reverse">
        <button
          class="p-2 border-2 rounded-sm border-blue-600"
          onClick={sendMessage}
        >
          send
        </button>
        <input
          type="text"
          class="w-full p-2 border-2 rounded-sm border-blue-600"
        />
      </div>
      <div class="flex gap-2 w-full flex-col overflow-hidden">
        {messages.map((m) => <p>{m}</p>)}
      </div>
    </div>
  );
}
