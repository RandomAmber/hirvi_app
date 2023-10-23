import { useState, useEffect } from "react"
import { Draggable, Droppable, DragDropContext } from "react-beautiful-dnd";
import './Affixes.css';
import wordData from "./AffixesData.json"

const dataArray = Object.values(wordData)
//Select a random data list


const randomIndex = Math.floor(Math.random() * dataArray.length);
const randomData = dataArray[randomIndex];

const WordHolders = {
  WordHolder1: {
    name: "WordHolder1",
    style: "WordHolder1",
    items: []
  },
  WordHolder2: {
    name: "WordHolder2",
    style: "WordHolder2",
    items: []
  },
  WordArea: {
    name: "WordArea",
    style: "WordArea",
    items: randomData
  }
}





const onDragEnd = (result, areas, setAreas) => {
  if (!result.destination) return;
  const { source, destination } = result;

  const sourceArea = areas[source.droppableId];
  const destArea = areas[destination.droppableId];
  const sourceItems = [...sourceArea.items];
  const destItems = [...destArea.items];
  const [removed] = sourceItems.splice(source.index, 1);

  if (
    (destination.droppableId === "WordHolder1" ||
      destination.droppableId === "WordHolder2") &&
    destItems.length === 1
  ) {
    // If destination is a WordHolder and already contains an item, swap items
    sourceItems.splice(source.index, 0, destItems[0]);
    destItems[0] = removed;
  } else {
    // Otherwise, add item to the destination normally
    destItems.splice(destination.index, 0, removed);
  }

  setAreas({
    ...areas,
    [source.droppableId]: {
      ...sourceArea,
      items: sourceItems, // Update source items
    },
    [destination.droppableId]: {
      ...destArea,
      items: destItems, // Update destination items
    },
  });
};





const wordsPerRow = 4



function Affixes() {
  const [areas, setAreas] = useState(WordHolders);
  const [item1_translation, setItem1Translation] = useState('');
  const [item2_translation, setItem2Translation] = useState('');
  const [concat_translation, setConcatTranslation] = useState("");


  const [combinedWord, setCombinedWord] = useState("");
  const [matchesConcats, setMatchesConcats] = useState(false);
  const [score, setScore] = useState(0);
  const [dictionary, setDictionary] = useState([]);



  //clearWordHolders button
  const clearWordHolders = () => {
    setAreas({
      ...areas,
      WordHolder1: {
        ...areas.WordHolder1,
        items: [], // Clear WordHolder1
      },
      WordHolder2: {
        ...areas.WordHolder2,
        items: [], // Clear WordHolder2
      },
    });
  };






  const concatenateWords = () => {
    if (areas.WordHolder1.items.length === 1 && areas.WordHolder2.items.length === 1) {
      const item1 = areas.WordHolder1.items.map((item) => item.content)
      const item1Translation = areas.WordHolder1.items.map((item) => item.translation)
      const item2 = areas.WordHolder2.items.map((item) => item.content)
      const item2Translation = areas.WordHolder2.items.map((item) => item.translation)
      const combined = item1.join("") + item2.join("")
      setCombinedWord(combined)

      const matches = randomData.some((word) => word.concats.includes(combined))
      setMatchesConcats(matches)

      if (matches) {
        setItem1Translation(item1Translation);
        setItem2Translation(item2Translation);
        const index = areas.WordHolder1.items[0].concats.indexOf(combined)
        if(index !== -1){
          const concat_translation = areas.WordHolder1.items[0].concats_translation[index];
          setConcatTranslation(concat_translation)
        }
        if (!dictionary.includes(combined)) {
          setScore((prevScore) => prevScore + 1);
          setDictionary((prevDictionary) => [...prevDictionary, combined]);
        }

      } else {
        //clea the translation
        setItem1Translation("")
        setItem2Translation("")
        setConcatTranslation("")
      }


      return combined, item1Translation, item2Translation
    }
    setCombinedWord("") //reset the combinedWord
    setMatchesConcats(false) //reset matchesConcats
    setItem1Translation("")
    setItem2Translation("")
    return ""
  }

  useEffect(() => {
    concatenateWords();
  }, [areas.WordHolder1.items, areas.WordHolder2.items])




  return (
    <div className="mainContainer">
      <div className="leftArea">
        <p>rules</p>
        <p>leaderboard</p>
      </div>

      <div className="centreContainer">
        <h1 className="heading">Word Affixes</h1>
        <div className="gameContainer">

          <div className="gameArea">
            <DragDropContext onDragEnd={(result) => onDragEnd(result, areas, setAreas)}>
              <div className="heading">
                {matchesConcats && <p>Such word exists! Press the button to make a new one:</p>
                  && <button onClick={clearWordHolders}>Clear WordHolders</button>
                }
                {/* /* Check if WordArea is empty */}
                {areas.WordArea.items.length === 0 && (
                  <button onClick={() => window.location.reload()}>Reload Page</button>
                )}


              </div>


              <div className="wordHolders">
                {/* Render WordHolder1 */}
                <div>
                  {matchesConcats &&  item1_translation }
                  <div style={{ margin: 8 }}>
                    <Droppable droppableId="WordHolder1">
                      {(provided, snapshot) => (
                        <div className="wordHolder"
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver ? "pink" : "blue", //wordHolder 1 colors
                          }}
                        >
                          {areas.WordHolder1.items.map((item, index) => (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                              {(provided, snapshot) => (
                                <div className="wordInWordHolder"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={{
                                    backgroundColor: snapshot.isDragging
                                      ? "red"
                                      : "blue",
                                    ...provided.draggableProps.style,
                                  }}
                                >
                                  {item.content}
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </div>
                </div>

                <p>+</p>

                
                <div className="wordHolders">
                  {/* Render WordHolder2 */}
                  <div>
                  {matchesConcats &&  item2_translation }
                  
                
                  <div style={{ margin: 8 }}>
                    <Droppable droppableId="WordHolder2">
                      {(provided, snapshot) => (
                        <div className="wordHolder"
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver ? "lightblue" : "lightgrey", // wordHolder2 colors
                          }}
                        >
                          {areas.WordHolder2.items.map((item, index) => (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                              {(provided, snapshot) => (
                                <div className="wordInWordHolder"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={{
                                    backgroundColor: snapshot.isDragging
                                      ? "#263B4A"
                                      : "#456C86",
                                    ...provided.draggableProps.style,
                                  }}
                                >
                                  {item.content}
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>


                  </div>
                  </div>


                </div>

                <p>=</p>
                {/* answerholder  */}
                <div className="answerHolder" >
                  {matchesConcats &&  concat_translation }
                  <div className="answerHolderWFT" 
                  >
                    {combinedWord}
                  </div>

                </div>


              </div>
              {/* Render WordArea */}
              <div className="wordArea" >
                <p>Words to tinker with</p>
                <div style={{ margin: 8 }}>
                  <Droppable droppableId="WordArea">
                    {(provided, snapshot) => (
                      <div className="wordAreaWTF"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver ? "lightblue" : "lightgrey"}} //wordArea colors
                      >
                        {areas.WordArea.items.map((item, index) => (
                          <Draggable key={item.id} draggableId={item.id} index={index}>
                            {(provided, snapshot) => (
                              <div className="wordInWordArea"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                  backgroundColor: snapshot.isDragging ? "blue" : "red", //word colors!
                                  ...provided.draggableProps.style,
                                }}
                              >
                                {item.content}
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              </div>
            </DragDropContext>

          </div>

        </div>





      </div>
      <div className="rightArea">
        <div className="scoring">
          <span>Your score: {score} </span>
        </div>
        <div className="dict"></div>
        <p>Words you coined:</p>
        <ul>
          {dictionary.map((word, index) => (
            <li key={index}>{word}</li>
          ))}
        </ul>
      </div>
    </div>

  );
}

export default Affixes;
