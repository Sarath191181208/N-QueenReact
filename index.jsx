const { useState, useCallback, useRef, useEffect, useLayoutEffect } = React;
const { createRoot } = ReactDOM;

const config = {
  gridLightColor: "#426ff5",
  gridDarkColor: "#3F3F3F",
  queenImage: "./queen2.png",
  dangerColor: "#f00",
  checkColor: "#00c483",
};

function getWindowDimensions() {
  // This is form Stack Overflow  :
  /// https://stackoverflow.com/questions/19014250/rerender-view-on-browser-resize-with-react
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

const root = createRoot(document.getElementById("root"));
root.render(<Conway />);

function Conway() {
  // LL is where we store the animations of  the  algo.
  // LL -> Linked List
  let LL = null;
  const [numGrid, setNumGrid] = useState(6);
  const numGridRef = useRef(numGrid);
  numGridRef.current = numGrid;
  const setNumGridState = (newDim) => {
    setNumGrid(newDim);
    numGridRef.current = newDim;
  };

  const [grid, setGrid] = useState(
    getEmptyBoard(numGridRef.current, numGridRef.current)
  );
  const currGrid = useRef(grid);
  currGrid.current = grid;
  const setGridState = (val) => {
    setGrid(val);
    currGrid.current = val;
  };

  const [running, setRunning] = useState(false);
  const runningRef = useRef(running);
  runningRef.current = running;
  const setRunningState = (val) => {
    setRunning(val);
    runningRef.current = val;
  };

  const blocksRef = useRef([]);
  blocksRef.current = getSingleDimArr(numGridRef.current, numGridRef.current);

  const getIdx = (row, col) => {
    let idx = row * numGridRef.current;
    return idx + col;
  };
  const [animTime, setAnimTime] = useState(500);
  const animTimeRef = useRef();
  animTimeRef.current = animTime;

  const setAnimTimeState = (newTime) => {
    setAnimTime(newTime);
    animTimeRef.current = newTime;
  };

  const [width, height] = getWindowDimensions();

  const runSimulation = useCallback(
    (node) => {
      if (!runningRef.current || node == null) return setRunningState(false);
      const idx1 = node.idx1;
      const idx2 = node.idx2;
      let tempArr = getCopy(currGrid.current);

      tempArr[idx1][idx2] = node.val;
      if (node.val) colorViewRange(idx1, idx2);

      setGridState(tempArr);
      setTimeout(() => {
        colorViewRange(idx1, idx2, true);
        setTimeout(() => {
          runSimulation(node.next);
        }, animTimeRef.current);
      }, animTimeRef.current);
    },
    [grid, animTime]
  );

  const colorViewRange = (row, col, reset = false) => {
    if (running) return;
    function colorBlock(row, col, isDanger = false) {
      // if reset opacity : 0 else 1
      let idx = getIdx(row, col);
      if (!reset) {
        blocksRef.current[idx].style.opacity = 1;
        blocksRef.current[idx].style.backgroundColor = isDanger
          ? config.dangerColor
          : config.checkColor;
      } else {
        blocksRef.current[idx].style.opacity = currGrid.current[row][col];
        blocksRef.current[idx].style.backgroundColor = "transparent";
      }
    }

    let board = currGrid.current;

    N = board.length;

    // left
    for (let i = 0; i < col; i++) {
      colorBlock(row, i);
      if (board[row][i]) colorBlock(row, i, 1);
    }

    // upper-left
    for (i = row, j = col; i >= 0 && j >= 0; i--, j--) {
      colorBlock(i, j);
      if (board[i][j]) colorBlock(i, j, 1);
    }

    // lower-left
    for (i = row, j = col; j >= 0 && i < N; i++, j--) {
      colorBlock(i, j);
      if (board[i][j]) colorBlock(i, j, 1);
    }

    return true;
  };

  const getBlockWidth = () => {
    const paddig = 5 * numGridRef.current;
    const blockHeight = (height - paddig) / (numGridRef.current + 1);
    const blockWidth = (width - paddig) / (numGridRef.current + 1);

    return Math.min(blockHeight, blockWidth);
  };

  function toggleStart() {
    setRunningState(!running);
    // if we pause we don't need to create a new
    // LL we  are handling that here
    if (runningRef.current) {
      clearBoard();
      LL = solveNQ(getCopy(currGrid.current));
    }
    runSimulation(LL);
  }

  function clearBoard() {
    const N = numGridRef.current;
    let emptyArr = getEmptyBoard(N, N);

    setGridState(emptyArr);
  }

  function resetBoard() {
    setRunningState(false);
    clearBoard();
  }

  function handleAnimationTimeSlider(newTime) {
    setAnimTimeState(newTime);
  }

  function changeNumGrid(val) {
    val = parseInt(val);
    blocksRef.current = getSingleDimArr(val, val);
    setNumGridState(val);
    resetBoard();
  }

  return (
    <>
      <div id="settings">
        <button onClick={resetBoard}>Reset</button>
        <button
          style={{
            color: running ? "grey" : "green",
          }}
          onClick={toggleStart}
        >
          {running ? <Pause /> : <Play />}
        </button>
        <div className="slider-container">
          <label htmlFor="animSlider">
            AnimationTime: <p className="val">{animTime / 1000}s</p>
          </label>
          <input
            type="range"
            min="0"
            max="5000"
            value={animTime}
            className="slider"
            step={100}
            id="animSlider"
            onChange={(event) => handleAnimationTimeSlider(event.target.value)}
          ></input>
        </div>
        <div className="slider-container">
          <label htmlFor="gridDim">
            GridDimensions: <p className="val">{numGridRef.current}</p>
          </label>
          <input
            type="range"
            min="4"
            max="15"
            value={numGridRef.current}
            className="slider"
            step={1}
            id="gridDim"
            onChange={(event) => changeNumGrid(event.target.value)}
          ></input>
        </div>
      </div>

      <div className="board-container">
        <div
          className="board"
          style={{
            gridTemplateColumns: `repeat(${
              numGridRef.current
            }, ${getBlockWidth()}px)`,
          }}
        >
          {currGrid.current.map((row, i) =>
            row.map((isQueen, j) => (
              <div
                className="board-ele"
                key={`${i}-${j}`}
                style={{
                  backgroundColor:
                    (i + j) % 2 == 0
                      ? config.gridLightColor
                      : config.gridDarkColor,
                }}
              >
                <div
                  ref={(ele) => {
                    let idx = getIdx(i, j);
                    blocksRef.current[idx] = ele;
                  }}
                  className="img-container"
                >
                  {isQueen ? (
                    <img
                      className="queen-img"
                      style={{
                        opacity: isQueen,
                      }}
                      key={`${i}--${j}`}
                      src={config.queenImage}
                    ></img>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

function Pause() {
  return <i className="fa-solid fa-pause"></i>;
}
function Play() {
  return <i className="fa-solid fa-play"></i>;
}
