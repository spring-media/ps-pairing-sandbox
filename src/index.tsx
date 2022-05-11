import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

// TODOs:
// - app sends list update  to server but never updates the UI
// - the server is flaky, maybe we need retries
// - missing functionality to add a new item -- and validate it with the new validation function
// - Customer really wants Material UI

function useList() {
  const [list, setList] = useState<string[]>([]);

  useEffect(() => {
    fetch("/list")
      .then((res) => res.json())
      .then((res) => {
        setList(res);
      });
  }, []);

  function updateList(newList: string[]) {
    fetch("/list", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newList),
    });
  }

  return { list, updateList };
}

function App() {
  const { list, updateList } = useList();

  function sendListItemToTop(index: number) {
    updateList([list[index], ...list.filter((_, i) => i !== index)]);
  }

  return (
    <div>
      <ul>
        {list.map((text, index) => (
          <li key={index} onClick={() => sendListItemToTop(index)}>
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
}
ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
