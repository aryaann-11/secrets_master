const Secret = ({ secret }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{secret.name}</h5>
        <p className="card-text">{secret.text}</p>
      </div>
    </div>
  );
};

export default Secret;
