
export function checkRules(prevSquare: any, currentSquare: any) {
    const road = [1, 2, 3, 4, 5, 6, 7];
    const pieceName = prevSquare.piece.name;
    const playerColor = prevSquare.piece.color;
    const opponentPiece = currentSquare.piece.name;
    const opponentColor = currentSquare.piece.color;
    const prevLabel = prevSquare.label;
    const currentLabel = currentSquare.label;
    const prevNumber = Number(prevLabel[1])
    const currentNumber = Number(currentLabel[1])
    const prevLetter = prevLabel.charCodeAt(0)
    const currentLetter = currentLabel.charCodeAt(0)

    /* Pawl rule */
    function pawnRule() {
        /* Pawn first Move */
        const whiteFirstMove =
            !opponentPiece &&
            prevNumber == 2 &&
            currentLetter == prevLetter &&
            (currentNumber == prevNumber + 1 || currentNumber == prevNumber + 2)

        const blackFirstMove =
            !opponentPiece &&
            prevNumber == 7 &&
            currentLetter == prevLetter &&
            (currentNumber == prevNumber - 1 || currentNumber == prevNumber - 2)


        /* Pawl walk */
        const blackWalk = !opponentPiece && currentLetter == prevLetter && currentNumber == prevNumber - 1;
        const whiteWalk = !opponentPiece && currentLetter == prevLetter && currentNumber == prevNumber + 1;

        /* Pawl eat */
        const eatProccess = opponentPiece && (prevLetter == currentLetter + 1 || prevLetter == currentLetter - 1)
        const whiteEat = eatProccess && (prevNumber == currentNumber - 1);
        const blackEat = eatProccess && (prevNumber == currentNumber + 1);

        /* Check if promote */
        const isPromote = currentNumber == 8 || currentNumber == 1 ? 'promote' : null

        /* Check for all in white case and black case */
        const whiteState = playerColor == "white" && (whiteFirstMove || whiteWalk || whiteEat);
        const blackState = playerColor == "black" && (blackFirstMove || blackWalk || blackEat);

        if (whiteState || blackState) {
            return { result: true, message: isPromote }
        }

        return false

    }

    /* Rook rule */
    function rookRule() {

        const checkRoad = prevLetter == currentLetter || prevNumber == currentNumber;
        const checkWhiteTarget = !opponentPiece || opponentColor == "black";
        const checkBlackTarget = !opponentPiece || opponentColor == "white";

        const whiteState = playerColor == "white" && (checkRoad && checkWhiteTarget);
        const blackState = playerColor == "black" && (checkRoad && checkBlackTarget)

        if (whiteState || blackState) {
            return { result: true, message: null }
        }

        return false
    }

    /* Bishop rule */
    function bishopRule() {

        function checkRoad() {
            let result = false
            road.forEach((item) => {
                if ((prevLetter == currentLetter + item || prevLetter == currentLetter - item) &&
                    (prevNumber == currentNumber - item || prevNumber == currentNumber + item)) {
                    result = true
                }
            })

            return result
        }

        if (checkRoad()) {
            return { result: true, message: null }
        }

        return false

    }

    /* Knight rule */
    function knightRule() {
        const checkNumberByOne = prevNumber == currentNumber + 1 || prevNumber == currentNumber - 1;
        const checkNumberByTwo = prevNumber == currentNumber + 2 || prevNumber == currentNumber - 2;
        if (
            (prevLetter == currentLetter + 2 && checkNumberByOne) ||
            (prevLetter == currentLetter + 1 && checkNumberByTwo) ||
            (prevLetter == currentLetter - 2 && checkNumberByOne) ||
            (prevLetter == currentLetter - 1 && checkNumberByTwo)
        ) {
            return { result: true, message: null }
        }

        return false

    }

    /* King rule */
    function kingRule() {
        const checkNumber = prevNumber == currentNumber + 1 || prevNumber == currentNumber - 1 || prevNumber == currentNumber;
        const checkLetter = prevLetter == currentLetter + 1 || prevLetter == currentLetter - 1 || prevLetter == currentLetter;

        if (checkLetter && checkNumber) {
            return { result: true, message: null }
        }

        return false

    }



    /* Return the result based on piece name */
    switch (pieceName) {
        case "pawn":
            return pawnRule();
        case "rook":
            return rookRule();
        case "knight":
            return knightRule();
        case "bishop":
            return bishopRule();
        case "queen":
            return bishopRule() || rookRule()
        case "king":
            return kingRule();
        default:
            break;
    }

}