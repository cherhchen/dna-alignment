import { useState } from 'react'
import { runGlobalAlignment, runLocalAlignment } from '../alignment'
import Matrix from './Matrix';
import PropTypes from 'prop-types';
import './Solver.css'

function Solver({option}) {
  const [seq1Input, setSeq1Input] = useState('');
  const [seq2Input, setSeq2Input] = useState('');
  const [matchScore, setMatchScore] = useState(1);
  const [mismatchScore, setMismatchScore] = useState(-1);
  const [gapScore, setGapScore] = useState(-2);
  const [scoreMatrix, setScoreMatrix] = useState(null);
  const [pathMatrix, setPathMatrix] = useState(null);
  const [path, setPath] = useState(null);
  const [score, setScore] = useState(null);
  const [solution, setSolution] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (seq1Input.length === 0 || seq2Input.length === 0) {
      setErrorMessage("Error: Please enter two sequences");
      return;
    }

    let solution;
    if (option === "global") {
        solution = runGlobalAlignment(seq1Input, seq2Input, Number(matchScore), Number(mismatchScore), Number(gapScore));
    }
    else {
        solution = runLocalAlignment(seq1Input, seq2Input, Number(matchScore), Number(mismatchScore), Number(gapScore));
    }
    console.log(solution)

    // Add sequence headers in matrix 
    const seq1 = "__" + seq1Input;
    const seq1Arr = seq1.split("");
    const seq2 = "_" + seq2Input;
    const seq2Arr = seq2.split("");
    let scores = solution["scoreMatrix"].map((arr) => {
      return arr.slice();
    });
    scores.unshift(seq2Arr);
    scores.map((arr, i) => {
      arr.unshift(seq1Arr[i]);
    })

    setScoreMatrix(scores);
    setPathMatrix(solution["pathMatrix"]);
    setPath(new Set(solution["path"]));
    setScore(solution["score"]);
    setSolution(solution["solution"]);
    setErrorMessage('');
  }

  return (
    <>
    <div className="topBox">
      <div className="innerTopForm">
        <form onSubmit={handleSubmit}>
          <h2 className="subtitle">Enter your sequences</h2>
          <div className="formBox">
            <div>
              <label className="inputLabel">Sequence 1:</label>
              <input type="text" value={seq1Input} onChange={e => setSeq1Input(e.target.value)} className="sequenceInput"/>
            </div>
            <div>
              <label className="inputLabel">Sequence 2:</label>
              <input type="text" value={seq2Input} onChange={e => setSeq2Input(e.target.value)} className="sequenceInput"/>
            </div>
            <div className="scoreInputBox">
              <div>
                <label className="inputLabel">Match Score:</label>
                <input type="number" value={matchScore} onChange={e => setMatchScore(e.target.value)} className="scoreInput"/>
              </div>
              <div>
                <label className="inputLabel">Mismatch Score:</label>
                <input type="number" value={mismatchScore} onChange={e => setMismatchScore(e.target.value)} className="scoreInput"/>
              </div>
              <div>
                <label className="inputLabel">Gap Score:</label>
                <input type="number" value={gapScore} onChange={e => setGapScore(e.target.value)} className="scoreInput"/>
              </div>
            </div>
            <button type="submit" className="button">Compute Alignment</button>
          </div>
          { errorMessage && <p style={{color:"red"}}>{errorMessage}</p> }
        </form>
      </div>
      <div className="innerTopResult">
        { solution &&
          <div className="resultBox">
            <h2 className="subtitle">Solution</h2>
            <p className="result">{solution && solution[0].split('').join(' ')}</p>
            <p className="result">{solution && solution[1].split('').join(' ')}</p>
            <p className="result">{score != null ? "Score: " + score: ""}</p>
          </div>
        }
      </div>
    </div>
    <div className="matrixBox">
    { solution &&
    <Matrix 
      seq1Input={seq1Input}
      seq2Input={seq2Input}
      scoreMatrix={scoreMatrix}
      path={path}
      pathMatrix={pathMatrix}
    />
    }
    </div>
    </>
  )
}

export default Solver;

Solver.propTypes = {
    option: PropTypes.string.isRequired
};