import { initialPositions } from "./initialPositions";

export const labelsColumnArray = ["a", "b", "c", "d", "e", "f", "g", "h"];
export const labelsRowArray = ["8", "7", "6", "5", "4", "3", "2", "1"];

export const generateSquares = () => {
    const squares = [];
    const labels = ["a", "b", "c", "d", "e", "f", "g", "h"];
    for (let row = 8; row >= 1; row--) {
        for (let col = 0; col < 8; col++) {
            const label = `${labels[col]}${row}`;
            const isEvenSquare = (row + col) % 2 === 0;
            const pieceColor = label.includes("1") || label.includes("2") ? 'white' : label.includes("7") || label.includes("8") ? "black" : ""
            squares.push({
                label,
                color: isEvenSquare ? "bg-slate-300" : "bg-slate-600",
                piece: { name: initialPositions[label] || null, color: pieceColor },
            });
        }
    }
    return squares;
};
