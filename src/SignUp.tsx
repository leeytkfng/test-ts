import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const PHONENUMBER_LIST = ["010", "011", "016", "018", "019"];
  const BIRTHDAY_YEAR_LIST = Array.from({ length: 15 }, (_, i) => `${i + 1990}년`);
  const BIRTHDAY_MONTH_LIST = Array.from({ length: 12 }, (_, i) => `${i + 1}월`);
  const BIRTHDAY_DAY_LIST = Array.from({ length: 31 }, (_, i) => `${i + 1}일`);

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    nickname: "",
  });

  const handleInputChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    setUserInfo((userInfo) => ({
      ...userInfo,
      [name]: value,
    }));
  };

  const moveNavigate = useNavigate();
  const goToLogin = () => {
    moveNavigate("/");
  };
  //회원가입 로직
  const processSignUp = () => {
    fetch("/Signup.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        email: userInfo.email,
        password: userInfo.password,
        nickname: userInfo.nickname,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("서버 응답이 올바르지 않습니다.");
      })
      .then((data) => {
        if (data.message === "SIGNUP SUCCESS") {
          moveNavigate("/signup-complete");
        } else {
          alert("회원가입에 실패했습니다. 다시 시도해주세요");
        }
      })
      .catch((error) => {
        alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
      });
  };

  const isValid = userInfo.email && userInfo.password.length >= 10 && userInfo.password === userInfo.passwordConfirm;

  return (
    <div className="SignUpPage">
      <div className="title">회원가입</div>
      <div className="infoTextFrame">
        <p className="SignUp">기본 정보</p>
        <p className="neccesary">필수 사항</p>
      </div>
      <div className="IdWrap">
        <input type="text" className="idInput" placeholder="아이디" style={{ marginLeft: "0px" }}></input>
      </div>
      <div className="PwWrap">
        <input type="text" className="pwInput" placeholder="비밀번호"></input>
      </div>
      <div className="PwCheck">
        <input type="text" className="pwRepeat" placeholder="비밀번호 확인"></input>
      </div>
      <div className="NickName">닉네임</div>
      <input type="text" className="nickInput" placeholder=" 별명설정"></input>
      <div className="numberFrame">
        <div className="infoTextFrame">
          <p className="userinfoFrame">전화번호</p>
          <p className="infoOptionalText">선택 사항</p>
        </div>
        <div className="numberSelectFrame">
          <select className="numberBox">
            {PHONENUMBER_LIST.map((number, index) => (
              <option key={index}>{number}</option>
            ))}
          </select>
          <input className="numberInput" type="text" placeholder="휴대폰 번호를 입력해주세요"></input>
        </div>
        <div className="birthdatFrame">
          <div className="infoTextFrame">
            <p className="userinfoText">생일</p>
            <p className="infoOptionalText">선택 사항</p>
          </div>
        </div>
        <div className="birthdaySelectFrame">
          <select className="birthdayBoxYearBox">
            {BIRTHDAY_YEAR_LIST.map((year, index) => (
              <option key={index}>{year}</option>
            ))}
          </select>
          <select className="birthdayBoxMonthBox">
            {BIRTHDAY_MONTH_LIST.map((month, index) => (
              <option key={index}>{month}</option>
            ))}
          </select>
          <select className="birthdayBoxDayBox">
            {BIRTHDAY_DAY_LIST.map((day, index) => (
              <option key={index}>{day}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="signupButtonFrame">
        <button className="signUpButton" disabled={!isValid}>
          회원 가입
        </button>
      </div>
    </div>
  );
}
