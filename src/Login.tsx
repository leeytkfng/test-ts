import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const User = {
  email: "test@gmail.com",
  pw: "a123456789@@",
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);

  const navigate = useNavigate();

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setEmailValid(regex.test(e.target.value));
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPw(e.target.value);
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    setPwValid(regex.test(e.target.value));
  };

  const onClickConfirmButton = () => {
    if (email === User.email && pw === User.pw) {
      alert("로그인에 성공했습니다.");
    } else {
      alert("등록되지 않은 회원입니다.");
    }
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  useEffect(() => {
    setNotAllow(!(emailValid && pwValid));
  }, [emailValid, pwValid]);

  return (
    <div className="page">
      <div className="titleWrap">
        TEST-REACT
        <br />
        Good night
      </div>
      <div className="contentWrap">
        <div className="inputTitle">이메일주소</div>
        <div className="inputWrap">
          <input type="text" className="input" placeholder="test@gmail.com" value={email} onChange={handleEmail} />
        </div>
        <div className="errorMessageWrap">
          {!emailValid && email.length > 0 && <div>올바른 이메일을 입력해주세요</div>}
        </div>
        <div style={{ marginTop: "26px" }} className="inputTitle">
          비밀번호
        </div>
        <div className="inputWrap">
          <input
            type="password"
            className="input"
            placeholder="영문,특수문자 포함 8자 이상"
            value={pw}
            onChange={handlePassword}
          />
        </div>
        <div className="errorMessageWrap">
          {!pwValid && pw.length > 0 && <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>}
        </div>
        <button onClick={handleSignUp} className="SignUpButton" style={{ marginLeft: "10px" }}>
          회원가입
        </button>
      </div>
      <div>
        <button onClick={onClickConfirmButton} disabled={notAllow} className="bottomButton">
          확인
        </button>
      </div>
    </div>
  );
}
