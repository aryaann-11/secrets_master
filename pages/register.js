import Head from "next/head";
import Link from "next/link";

export default function Register() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => {
        alert("You have been registered but you must sign in again !");
      })
      .catch((e) => {
        alert("Registeration failed");
      });
  };
  return (
    <div>
      <Head>
        <title>Secrets Master</title>
      </Head>
      <div className="container justify-content-center mt-5">
        <div className="col-md-5 container justify-content-center">
          <Link href="/">
            <button className="btn btn-dark">Back to home</button>
          </Link>
          <h3 className="mt-5">Register :</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username:
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="text" className="form-label">
                Password:
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
              ></input>
            </div>
            <button className="btn btn-dark" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
