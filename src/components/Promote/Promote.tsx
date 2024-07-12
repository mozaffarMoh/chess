import "./Promote.scss";
import { pieces } from "../../assets/constants/pieces";

const Promote = ({ setIsPromote, playerColor, setPromotePiece }: any) => {
  const promoteItems = [
    { icon: pieces.rook, name: "rook" },
    { icon: pieces.bishop, name: "bishop" },
    { icon: pieces.knight, name: "knight" },
    { icon: pieces.queen, name: "queen" },
  ];

  const handleChoosePromote = (name: string) => {
    setIsPromote(false);
    setPromotePiece(name);
  };

  return (
    <div className="promote-container flexCenter">
      <div className="promote flexCenter">
        {promoteItems.map((item, i) => {
          const Piece = item.icon;
          return (
            <Piece
              key={i}
              onClick={() => handleChoosePromote(item.name)}
              color={playerColor}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Promote;
