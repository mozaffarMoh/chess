import "./CheckMate.scss";

const CheckMate = ({ player }: any) => {
  const handleRetry = () => {
    location.reload();
  };
  return (
    <div className="check-mate-container flexCenter">
      <div className="check-mate flexCenterColumn">
        <p>CHECK MATE</p>
        <h1>{player} won the match</h1>
        <button onClick={handleRetry}>Play again</button>
      </div>
    </div>
  );
};

export default CheckMate;
