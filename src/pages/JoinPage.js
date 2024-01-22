import React, { useState } from "react";
import { registerUser } from "../api"; // api.js에서 함수를 임포트합니다.
import { useNavigate } from "react-router-dom";

import styles from "./LoginJoin.module.css";

const JoinPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await registerUser(username, password, email);
      if (response) {
        navigate("/login");
        console.log("Registration successful", response);
      } else {
        // 에러 처리
        setError("회원가입에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("회원가입 과정에서 오류가 발생했습니다.");
    }
  };

  return (
    <div className={styles.loginJoinPage}>
      <div className={styles.section}>
        <h1>Create an account</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              placeholder="Email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Name"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className={styles.button} type="submit">
            SignUp
          </button>
          {error && <p className={styles.errorMessage}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default JoinPage;
