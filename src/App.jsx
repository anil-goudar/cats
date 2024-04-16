import { useEffect, useRef, useState } from "react";
import { catData } from "./data";
import Item from "./components/Item";
import "./App.css";
import Loader from "./components/Loader";

let timerInterval;

function App() {
  const [currentList, setCurrentList] = useState(catData);
  const [isSaving, setIsSaving] = useState(false);
  const [timeSinceLastSave, setTimeSinceLastSave] = useState(0);
  const previousList = useRef(null);
  const updatedListRef = useRef(null);

  useEffect(() => {
    fetchCats();
    const interval = setInterval(() => {
      // check for equality of updateListRef and previousList
      if (
        JSON.stringify(updatedListRef?.current) ===
        JSON.stringify(previousList.current)
      ) {
        return;
      }
      updateCats(updatedListRef?.current);
    }, 5000);

    return () => {
      clearInterval(interval);
      if (timerInterval) clearInterval(timerInterval);
    };
  }, []);

  const fetchCats = async () => {
    const response = await fetch("/api/cats");
    const data = await response.json();
    setCurrentList(data);
  };

  const beginTimer = () => {
    setTimeSinceLastSave(0);
    const interval = setInterval(() => {
      setTimeSinceLastSave((prev) => prev + 1);
    }, 1000);
    return interval;
  };

  const updateCats = async (updatedList) => {
    setIsSaving(true);
    previousList.current = updatedList;
    const response = await fetch("/api/cats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedList),
    });
    const data = await response.json();
    console.log(data);
    setIsSaving(false);
  };

  const handleDrop = (event, droppedIndex) => {
    event.preventDefault();
    const draggedCat = JSON.parse(event.dataTransfer.getData("cat"));

    const droppedCat = currentList.find(
      (item) => item.position === droppedIndex
    );
    // swap the dragged and dropped cats
    const updatedList = currentList.map((item) => {
      if (item.position === droppedIndex) {
        return { ...draggedCat, position: droppedIndex };
      } else if (item.position === draggedCat.position) {
        return { ...droppedCat, position: draggedCat.position };
      }
      return item;
    });
    // updateCats(updatedList);
    updatedListRef.current = updatedList;

    if (
      JSON.stringify(updatedListRef?.current) ===
      JSON.stringify(previousList.current)
    ) {
      return;
    }
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = beginTimer();
    localStorage.setItem("cats", JSON.stringify(updatedList));
    setCurrentList(updatedList);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className='app'>
      <div
        style={{
          display: "flex",
          position: "absolute",
          top: "10px",
          margin: "0 auto",
          justifyContent: "space-between",
          flexDirection: "column",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <p
          style={{
            fontWeight: "bold",
          }}
        >
          Cat List
        </p>
        <p>Last saved: {timeSinceLastSave} seconds ago</p>
      </div>
      <div className='cat-list'>
        {isSaving ? (
          <div className='loader-container'>
            <Loader />{" "}
          </div>
        ) : (
          <>
            <div className='row'>
              {currentList?.length > 0 &&
                currentList.slice(0, 3).map((cat, index) => {
                  return (
                    <div
                      key={index}
                      onDrop={(event) => handleDrop(event, cat.position)}
                      onDragOver={handleDragOver}
                    >
                      <Item cat={cat} />
                    </div>
                  );
                })}
            </div>
            <div className='row'>
              {currentList?.length > 0 &&
                currentList.slice(3, 5).map((cat, index) => {
                  return (
                    <div
                      key={index}
                      onDrop={(event) => handleDrop(event, cat.position)}
                      onDragOver={handleDragOver}
                    >
                      <Item cat={cat} />
                    </div>
                  );
                })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
