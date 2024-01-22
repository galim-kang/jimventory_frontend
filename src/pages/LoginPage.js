import React, { useState } from "react";
import { loginUser } from "../api"; // api.js에서 로그인 함수를 임포트합니다.
import { useNavigate } from "react-router-dom";
import styles from "./LoginJoin.module.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await loginUser(email, password);
      if (response) {
        // 로그인 성공 처리
        navigate("/"); // 예: 홈페이지로 이동
      } else {
        setError("로그인에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      setError("로그인 과정에서 오류가 발생했습니다.");
    }
  };

  return (
    <div className={styles.loginJoinPage}>
      <div className={styles.section}>
        <h1>Login to your account</h1>
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
              type="password"
              placeholder="Password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className={styles.button} type="submit">
            Login
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
