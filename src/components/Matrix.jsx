import PropTypes from 'prop-types';
import './Matrix.css'

function Matrix({scoreMatrix, path, pathMatrix}) {
  const ArrowUpLeft01Icon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"} {...props}>
      <path d="M7 7L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M13 6.13151C13 6.13151 7.36646 5.65662 6.51153 6.51153C5.65661 7.36645 6.13157 13 6.13157 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const ArrowLeft02Icon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"} {...props}>
      <path d="M4 12L20 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.99996 17C8.99996 17 4.00001 13.3176 4 12C3.99999 10.6824 9 7 9 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const ArrowUp02Icon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"} {...props}>
      <path d="M12 4L12 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 8.99996C17 8.99996 13.3176 4.00001 12 4C10.6824 3.99999 7 9 7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

    return (
      <>
      <div className={scoreMatrix && "matrix"}>
      {
        scoreMatrix && scoreMatrix.map((mRow, i) => (
          <div key={i} className='row'>
          {
            (pathMatrix && path) && mRow.map((score, j) => (
            <div key={j} className={(i == 0 || j == 0) ? "headerBox" : path.has(`${[i-1, j-1]}`) ? "pathBox" : "scoreBox"}>
              <div className='arrowBox'>
                  {i != 0 && j != 0 && pathMatrix[i-1][j-1] != null && pathMatrix[i-1][j-1].includes("d") && <ArrowUpLeft01Icon className="arrow"/>}
                  {i != 0 && j != 0 && pathMatrix[i-1][j-1] != null && pathMatrix[i-1][j-1].includes("l") && <ArrowLeft02Icon className="arrow"/> }
                  {i != 0 && j != 0 && pathMatrix[i-1][j-1] != null && pathMatrix[i-1][j-1].includes("u") && <ArrowUp02Icon className="arrow"/> }
              </div>
              <p className="score">{score}</p>
            </div>
            ))
          }
          </div>
        ))
      }
      </div>
      </>
    )
}

Matrix.propTypes = {
    seq1Input: PropTypes.string.isRequired,
    seq2Input: PropTypes.string.isRequired,
    scoreMatrix: PropTypes.array.isRequired,
    path: PropTypes.object.isRequired,
    pathMatrix: PropTypes.array.isRequired
};

export default Matrix;