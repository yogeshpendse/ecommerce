export function Statusjs({ checker }) {
  return (
    <div>
      {checker ? (
        <p className="green-check">&#10003;</p>
      ) : (
        <p className="red-cross">&#x2573;</p>
      )}
    </div>
  );
}
