export function pawnRule(prevSquare: any, currentSquare: any) {
    const playerColor = prevSquare.piece.color;
    const opponentPiece = currentSquare.piece.name;
    const prevLabel = prevSquare.label;
    const currentLabel = currentSquare.label;
    const prevNumber = Number(prevLabel[1])
    const currentNumber = Number(currentLabel[1])
    const prevLetter = prevLabel.charCodeAt(0)
    const currentLetter = currentLabel.charCodeAt(0)


    if (playerColor == "white") {
        /* When white first start */
        if (
            prevNumber == 2 &&
            currentLetter == prevLetter &&
            (currentNumber == prevNumber + 1 || currentNumber == prevNumber + 2)
        ) {
            return { result: true, message: null }
        }

        /* When pawn is walk */
        if ((!opponentPiece && currentLetter == prevLetter && currentNumber == prevNumber + 1) ||
            ((opponentPiece) && ((currentLetter + currentNumber == prevLetter + prevNumber + 2) ||
                (currentLetter + currentNumber == prevLetter + prevNumber)))
        ) {
            return { result: true, message: currentNumber == 8 ? 'promote' : null }
        }

    }


    if (playerColor == "black") {
        /* When black first start */
        if (
            prevNumber == 7 &&
            currentLetter == prevLetter &&
            (currentNumber == prevNumber - 1 || currentNumber == prevNumber - 2)) {
            return { result: true, message: null }
        }


        /* When pawn is walk */
        if ((!opponentPiece && currentLetter == prevLetter && currentNumber == prevNumber - 1) ||
            ((opponentPiece) && ((currentLetter + currentNumber == prevLetter + prevNumber - 2) ||
                (currentLetter + currentNumber == prevLetter + prevNumber)))
        ) {
            return { result: true, message: currentNumber == 1 ? 'promote' : null }
        }

    }

    
    return false

}