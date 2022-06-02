import React, { useState, useEffect } from "react";

const newBoard = {
  0: null,
  1: null,
  2: null,
  3: null,
  4: null,
  5: null,
  6: null,
  7: null,
  8: null,
};

const winningCondition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 7],
];

const Cell = ({ nextMove, idx, updateBoard }) => {
  const [content, setContent] = useState("");
  const [canPlace, setCanPlace] = useState(true);
  const [mouseOver, setMouseOver] = useState(false);
  return (
    <div
      onMouseLeave={() => {
        if (canPlace) {
          setContent("");
          setMouseOver(false);
        }
      }}
      onMouseOver={() => {
        if (canPlace) {
          setContent(nextMove.player);
          setMouseOver(true);
        }
      }}
      onClick={() => {
        if (canPlace) {
          setContent(nextMove.player);
          updateBoard.setBoard({
            ...updateBoard.board,
            [idx]: nextMove.player,
          });
          setCanPlace(false);
          setMouseOver(false);
          if (nextMove.player === "X") {
            nextMove.setPlayer("O");
          } else {
            nextMove.setPlayer("X");
          }
        }
      }}
      className={`px-5 py-5 w-[7rem] h-[7rem] rounded-md text-6xl flex justify-center items-center ${
        mouseOver
          ? "opacity-50 w-[6.5rem] h-[6.5rem] duration-200 ease-in-out"
          : ""
      } cursor-pointer font-bold`}
      style={{ backgroundColor: "#F0A500" }}
    >
      {content}
    </div>
  );
};

const TicTacToe = () => {
  const [canPlay, setCanPlay] = useState(true);
  const [player, setPlayer] = useState("X");

  const [board, setBoard] = useState(newBoard);
  const [winner, setWinner] = useState();

  const checkForWinner = () => {
    // for (let i = 0; i < winningCondition.length; i++) {
    //   let arr = winningCondition[i];
    // console.log(arr[0], board[arr[0]]);
    // console.log(arr[1], board[arr[1]]);
    // console.log(arr[2], board[arr[2]]);
    // console.log((board[arr[0]] == board[arr[1]]) !== null);
    if ((board[0] === board[1]) === board[2] && board[1] !== null) {
      return true;
    } else {
      return false;
    }
    // }
  };

  // useEffect(() => {
  //   console.log(checkForWinner());
  //   if (checkForWinner()) {
  //     setCanPlay(false);
  //   }
  //   console.log("useEffect ran");
  // }, [board]);

  return (
    <div
      className="min-w-screen min-h-screen grid md:grid-cols-12"
      style={{ backgroundColor: "#1B1A17" }}
    >
      <div
        className="md:col-start-2 md:col-span-10 m-auto text-center text-2xl"
        style={{ color: "#E6D5B8" }}
      >
        <div className="text-4xl pb-2">Tic Tac Toe</div>
        <div className="text-xl pb-2">(2 Player)</div>
        <div
          className="text-xl py-2"
          onClick={() => {
            console.log(board);
            checkForWinner();
            console.log(checkForWinner());
          }}
        >
          Player {player}, please place your move
        </div>

        <div
          className="grid grid-cols-3 gap-x-2 gap-y-2 py-5 place-items-center"
          style={{ color: "#000" }}
        >
          {canPlay &&
            Object.keys(board).map((idx) => {
              return (
                <Cell
                  key={idx}
                  idx={idx}
                  nextMove={{ player, setPlayer }}
                  updateBoard={{ board, setBoard }}
                />
              );
            })}
          {!canPlay && <div>Player {player} wins the game</div>}
        </div>

        <div
          className="pt-5 flex flex-col justify-center md:flex-row"
          style={{ color: "#E6D5B8" }}
        >
          <div
            onClick={() => {
              setBoard(newBoard);
              setPlayer("X");
              setCanPlay(true);
            }}
            className="p-5 rounded-lg cursor-pointer"
            style={{ backgroundColor: "#E45826", color: "#000" }}
          >
            Reset
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicTacToe;
