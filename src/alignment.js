function setupMatrices(numRows, numCols, gap, isGlobal) {
    let scoreMatrix = Array.from({ length: numRows }, () => Array(numCols).fill(null));
    let pathMatrix = Array.from({ length: numRows}, () => Array(numCols).fill(''));
    let rowScore = 0;

    for (let i = 0; i < numCols; i++) {
        if (isGlobal) {
            scoreMatrix[0][i] = rowScore;
            rowScore += gap;
            pathMatrix[0][i] = null;
        }
        else {
            scoreMatrix[0][i] = 0;
            pathMatrix[0][i] = '0';
        }
    }

    let colScore = 0;
    for (let i = 0; i < numRows; i++) {
        if (isGlobal) {
            scoreMatrix[i][0] = colScore;
            colScore += gap;
            pathMatrix[i][0] = null;
        }
        else {
            scoreMatrix[i][0] = 0;
            pathMatrix[i][0] = '0'
        }
    }

    return [scoreMatrix, pathMatrix];
}


function tracebackGlobalAlignment(seq1, seq2, pathMatrix) {
    let s1Alignment = '';
    let s2Alignment = '';
    let s1Index = seq1.length - 1;
    let s2Index = seq2.length - 1;
    let row = pathMatrix.length - 1;
    let col = pathMatrix[0].length - 1;
    let curr = pathMatrix[row][col];
    let path = [[row, col].toString()];

    while (curr !== null) {
        let direction = curr[0];
        if (direction === 'd') {
            s1Alignment = seq1[s1Index] + s1Alignment;
            s2Alignment = seq2[s2Index] + s2Alignment;
            s1Index -= 1;
            s2Index -= 1;
            row -= 1;
            col -= 1;
        }
        else if (direction === 'u') {
            s1Alignment = seq1[s1Index] + s1Alignment;
            s2Alignment = '_' + s2Alignment;
            s1Index -= 1;
            row -= 1;
        }
        else if (direction === 'l') {
            s1Alignment = '_' + s1Alignment;
            s2Alignment = seq2[s2Index] + s2Alignment;
            s2Index -= 1;
            col -= 1;
        }
        path.push([row, col].toString());
        curr = pathMatrix[row][col];
    }

    while (s1Index > -1) {
        s1Alignment = seq1[s1Index] + s1Alignment;
        s2Alignment = '_' + s2Alignment;
        s1Index -= 1;
    }

    while (s2Index > -1) {
        s2Alignment = seq2[s2Index] + s2Alignment;
        s1Alignment = '_' + s1Alignment;
        s2Index -= 1;
    }

    return [s1Alignment, s2Alignment, path];
}


function tracebackLocalAlignment(seq1, seq2, pathMatrix, maxscoreIndices) {
    let s1Alignment = '';
    let s2Alignment = '';
    let s1Index = maxscoreIndices[0] - 1;
    let s2Index = maxscoreIndices[1] - 1;
    let [row, col] = maxscoreIndices;
    let curr = pathMatrix[row][col];
    let path = [maxscoreIndices.toString()];

    while (curr !== '0') {
        let direction = curr[0];
        if (direction === 'd') {
            s1Alignment = seq1[s1Index] + s1Alignment;
            s2Alignment = seq2[s2Index] + s2Alignment;
            s1Index -= 1;
            s2Index -= 1;
            row -= 1;
            col -= 1;
        }
        else if (direction === 'u') {
            s1Alignment = seq1[s1Index] + s1Alignment;
            s2Alignment = '_' + s2Alignment;
            s1Index -= 1;
            row -= 1;
        }
        else if (direction === 'l') {
            s1Alignment = '_' + s1Alignment;
            s2Alignment = seq2[s2Index] + s2Alignment;
            s2Index -= 1;
            col -= 1;
        }
        path.push([row, col].toString());
        curr = pathMatrix[row][col];
    }

    return [s1Alignment, s2Alignment, path];
}

export function runGlobalAlignment(seq1, seq2, match, mismatch, gap) {
    let [scoreMatrix, pathMatrix] = setupMatrices(seq1.length + 1, seq2.length + 1, gap, true);
    let s1 = '_' + seq1;
    let s2 = '_' + seq2;
    for (let i = 1; i < s1.length; i++) {
        for (let j = 1; j < s2.length; j++) {
            let compareScore = s1[i] === s2[j] ? scoreMatrix[i-1][j-1] + match : scoreMatrix[i-1][j-1] + mismatch;
            let s1GapScore = scoreMatrix[i][j-1] + gap;
            let s2GapScore = scoreMatrix[i-1][j] + gap;
            let maxScore = Math.max(compareScore, s1GapScore, s2GapScore);
            scoreMatrix[i][j] = maxScore;
            if (maxScore === compareScore) {
                pathMatrix[i][j] += 'd'; 
            }
            if (maxScore === s1GapScore) {
                pathMatrix[i][j] += 'l';
            }
            if (maxScore === s2GapScore) {
                pathMatrix[i][j] += 'u';
            }
        }
    }
    const solutionPath = tracebackGlobalAlignment(seq1, seq2, pathMatrix);
    const solution = [solutionPath[0], solutionPath[1]];
    const path = solutionPath[2];
    return {"score": scoreMatrix[scoreMatrix.length - 1][scoreMatrix[0].length - 1], "scoreMatrix": scoreMatrix, "path": path, "pathMatrix": pathMatrix, "solution": solution}
}


export function runLocalAlignment(seq1, seq2, match, mismatch, gap) {
    let [scoreMatrix, pathMatrix] = setupMatrices(seq1.length + 1, seq2.length + 1, gap, false);
    let s1 = '_' + seq1;
    let s2 = '_' + seq2;
    let matrixMax = Number.NEGATIVE_INFINITY;
    let matrixMaxIndices = [null, null];

    for (let i = 1; i < s1.length; i++) {
        for (let j = 1; j < s2.length; j++) {
            let compareScore = s1[i] === s2[j] ? scoreMatrix[i-1][j-1] + match : scoreMatrix[i-1][j-1] + mismatch;
            let s1GapScore = scoreMatrix[i][j-1] + gap;
            let s2GapScore = scoreMatrix[i-1][j] + gap;
            let maxScore = Math.max(0, compareScore, s1GapScore, s2GapScore);
            scoreMatrix[i][j] = maxScore;

            // Keep track of the maximum value in matrix
            if (maxScore > matrixMax) {
                matrixMax = maxScore;
                matrixMaxIndices = [i, j];
            }
            if (maxScore === compareScore) {
                pathMatrix[i][j] += 'd';
            }
            if (maxScore === s1GapScore) {
                pathMatrix[i][j] += 'l';
            }
            if (maxScore === s2GapScore) {
                pathMatrix[i][j] += 'u';
            }
            if (maxScore === 0) {
                pathMatrix[i][j] = '0';
            }
        }
    }
    const solutionPath = tracebackLocalAlignment(seq1, seq2, pathMatrix, matrixMaxIndices);
    const solution = [solutionPath[0], solutionPath[1]];
    const path = solutionPath[2];
    return {"score": matrixMax, "scoreMatrix": scoreMatrix, "path": path,"pathMatrix": pathMatrix, "solution": solution}
}

// For debugging
// function printMatrix(mat) {
//     for (let i = 0; i < mat.length; i++) {
//         let row = '[';
//         for (let j = 0; j < mat[i].length; j++) {
//             row += mat[i][j];
//             if (j !== mat[i].length -1) {
//                 row += "\t";
//             }
//         }
//         row += "]";
//         console.log(row);
//     }
//     console.log('\n');
// }