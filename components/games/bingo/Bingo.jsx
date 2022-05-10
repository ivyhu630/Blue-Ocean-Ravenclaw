import {
  getBoard,
  generateNumberSequence,
  checkWinner,
} from "../../../lib/bingo.js";
import BingoBoard from './BingoBoard.jsx';
import {useState, useReducer, useEffect} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Sequence from './Sequence.jsx';
import { ScratchOff } from "@sky790312/react-scratch-off";

//TODO: Make bingo numbers light up when you reveal their sequence number
//TODO: Bingo! pop up when you hit a bingo
//TODO: Prizes
export default function Bingo({plays, luck, playGame, playing}) {
  const [board, setBoard] = useState([]);
  const [sequences, setSequences] = useState([]);

  useEffect(() => {
    if (playing) {
      let newBoard = getBoard();
      let newSequences = generateNumberSequence();
      newBoard[2][2] = 'Free';
      setBoard(newBoard);
      setSequences(newSequences);
    }
  }, [plays]);

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'column'
    }}>
        <Button variant='contained' onClick={playGame}>New Board</Button>
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            width: 420,
            flexDirection: 'row',
            margin: 1
          }}>
          {sequences.map((sequence, i) => <Sequence key={i} sequences={sequences} sequence={sequence} />)}
        </Box>
        <ScratchOff
          width={300}
          height={300}
          coverImgSrc={
            "data:image/jpeg;base64,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"
          }
          revealPercentage={80}
        >
          <div>
            Hello
            {/* <BingoBoard board={board} /> */}
          </div>
        </ScratchOff>
    </Box>
  );
}
const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
  width: 400,
  flexDirection: 'row'
};