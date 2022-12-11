import Secret from "./Secret";

const Secrets = ({ secrets }) => {
  return (
    <div>
      <ul className="list-group">
        {secrets.map((secret) => {
          return (
            <div className="mt-3" key={secret._id}>
              <Secret secret={secret} />
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default Secrets;
