import Head from "next/head";
import Secrets from "../components/Secrets";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import CryptoJS from "crypto-js";
import { authOptions } from "./api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import Link from "next/link";

export default function Home({ secrets }) {
  const { data: session } = useSession();
  if (!session) {
    return (
      <div>
        <Head>
          <title>Secrets master</title>
        </Head>
        <div className="container jutify-content-center mt-5">
          <div className="container col-md-5 justify-content-center text-center">
            <h3>You are not signed in !</h3>
            <button onClick={() => signIn()} className="btn btn-light me-3">
              Sign in
            </button>
            <Link href="/register">
              <button className="btn btn-dark">Register</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  console.log(secrets);
  console.log(session);
  console.log(session.user);
  const user = session.user;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const text = e.target.text.value;
    const cipher = CryptoJS.AES.encrypt(text, user["password"]).toString();
    const res = await fetch(
      "http://localhost:3000/api/secrets/" + user["username"],
      {
        method: "POST",
        body: JSON.stringify({
          name: name,
          cipher: cipher,
          belongs_to: user["username"],
        }),
      }
    );
    location.reload();
    e.target.name.value = "";
    e.target.text.value = "";
  };
  return (
    <div>
      <Head>
        <title>Secrets Master</title>
      </Head>
      <div className="container justify-content-center mt-5">
        <div className="col-md-5 container justify-content-center">
          <button onClick={() => signOut()} className="btn btn-danger mb-5">
            Sign out
          </button>
          <h3>New Secret :</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="text" className="form-label">
                Text:
              </label>
              <input
                type="text"
                className="form-control"
                id="text"
                name="text"
              ></input>
            </div>
            <button className="btn btn-dark" type="submit">
              Submit
            </button>
          </form>
          <hr />
          <h3>Your secrets: </h3>
          <Secrets secrets={secrets} />
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  if (session == null) {
    return {
      props: {
        secrets: [],
      },
    };
  }
  const user = session.user;
  const res = await fetch(
    "http://localhost:3000/api/secrets/" + user["username"]
  );
  const secrets = await res.json();
  const mySecrets = secrets.map((secret) => {
    const name = secret.name;
    const belongs_to = secret.belongs_to;
    const cipher = secret.cipher;
    const textBytes = CryptoJS.AES.decrypt(cipher, user["password"]);
    const text = textBytes.toString(CryptoJS.enc.Utf8);
    return {
      name: name,
      text: text,
      belongs_to: belongs_to,
    };
  });
  return {
    props: {
      secrets: mySecrets,
    },
  };
};
