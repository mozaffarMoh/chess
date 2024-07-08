
export function checkRules(prevSquare: any, currentSquare: any, squares: any) {
    const pieceName = prevSquare.piece.name;
    const playerColor = prevSquare.piece.color;
    const opponentPiece = currentSquare.piece.name;
    const opponentColor = currentSquare.piece.color;
    const prevLabel = prevSquare.label;
    const currentLabel = currentSquare.label;
    const prevNumber = Number(prevLabel[1])
    const currentNumber = Number(currentLabel[1])
    const prevLetter = prevLabel.charCodeAt(0);
    const currentLetter = currentLabel.charCodeAt(0);
    const prevIndex = squares.indexOf(prevSquare)
    const currentIndex = squares.indexOf(currentSquare)
    const minValue = Math.min(prevIndex, currentIndex);
    const maxValue = Math.max(prevIndex, currentIndex);

    /* Pawl rule */
    function pawnRule() {
        /* Pawn first Move */
        const whiteFirstMove =
            !opponentPiece &&
            prevNumber == 2 &&
            currentLetter == prevLetter &&
            (currentNumber == prevNumber + 1 || (currentNumber == prevNumber + 2 && !squares[prevIndex - 8].piece.name))

        const blackFirstMove =
            !opponentPiece &&
            prevNumber == 7 &&
            currentLetter == prevLetter &&
            (currentNumber == prevNumber - 1 || (currentNumber == prevNumber - 2 && !squares[prevIndex + 8].piece.name))


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
        let range = [];
        for (let i = minValue + 1; i < maxValue; i++) {
            prevNumber == currentNumber && range.push(i);
            if (prevLetter == currentLetter) {
                if ((i - minValue) % 8 === 0 && i - minValue > 0) {
                    range.push(i);
                }
            }
        }

        const isRoadClosing = () => {
            let result = true
            range.forEach((item) => {
                if (squares[item]?.piece.name != null) {
                    result = false
                }
            })
            return result
        }

        const checkRoad = (prevLetter == currentLetter || prevNumber == currentNumber) && isRoadClosing();
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
        const road = [1, 2, 3, 4, 5, 6, 7];
        let range: any = [];

        const checkRange = (item: number) => {
            const checkLetterLarge = prevLetter == currentLetter - item
            const checkLetterSmall = prevLetter == currentLetter + item
            const checkNumberLarge = prevNumber == currentNumber - item
            const checkNumberSmall = prevNumber == currentNumber + item

            const addToRange = (i: number, modValue: number) => {
                if ((i - minValue) % modValue === 0 && i - minValue > 0) {
                    range.push(i);
                }
            };

            for (let i = minValue + 1; i < maxValue; i++) {
                checkLetterLarge && checkNumberSmall && addToRange(i, 9)
                checkLetterLarge && checkNumberLarge && addToRange(i, -7)
                checkLetterSmall && checkNumberSmall && addToRange(i, 7)
                checkLetterSmall && checkNumberLarge && addToRange(i, -9)
            }

        }

        const isRoadClosing = (item: any) => {
            checkRange(item)
            let result = true
            range.forEach((item: any) => {
                if (squares[item]?.piece.name != null) {
                    result = false
                }
            })
            return result
        }

        function checkRoad() {
            let result = false
            road.forEach((item) => {
                if ((prevLetter == currentLetter + item || prevLetter == currentLetter - item) && isRoadClosing(item) &&
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
        const blockedPoints = [-9, -8, -7, -1, 1, 7, 8, 9]
        const checkNumber = prevNumber == currentNumber + 1 || prevNumber == currentNumber - 1 || prevNumber == currentNumber;
        const checkLetter = prevLetter == currentLetter + 1 || prevLetter == currentLetter - 1 || prevLetter == currentLetter;

        const isOppenentKingExist = () => {
            let result = true
            blockedPoints.forEach((item) => {
                let isBlackKing = playerColor == 'black' && squares[currentIndex + item].piece.color !== 'black';
                let isWhiteKing = playerColor == 'white' && squares[currentIndex + item].piece.color !== 'white';
                if (squares[currentIndex + item] &&
                    squares[currentIndex + item].piece.name == 'king' &&
                    (isWhiteKing || isBlackKing)
                ) {
                    result = false
                }
            })

            return result;
        }

        if (checkLetter && checkNumber && isOppenentKingExist()) {
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