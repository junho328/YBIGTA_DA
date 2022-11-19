import "./App.css";
import { useState } from "react";

function App() {
  const post = "11월 일상";
  const [title, setTitle] = useState([
    "9월 일상 모음",
    "YBIGTA 홈커밍데이",
    "컨퍼런스",
  ]);
  const [date, setDate] = useState(["10월 8일", "10월 30일", "11월 12일"]);
  const [good, setGood] = useState([0, 0, 0]);
  const [modal, setModal] = useState(false);
  const [changeTitle, setChangeTitle] = useState(0);
  const [detail, setDetail] = useState([
    "휴학생 김소정의 9월 일상을 돌아보자",
    "수료 기수와 활동 기수 간의 교류의 장 YBIGTA 홈커밍데이",
    "와빅의 꽃 컨퍼런스 모두 파이팅!",
  ]);

  const [inputValue, setInputValue] = useState("");
  const [changeValue, setChangeValue] = useState("");

  return (
    <div className="App">
      <div className="black-nav">
        <div>
          <h4 style={{ color: "white", fontSize: "16px" }}>Blog</h4>
        </div>
        <div className="submit">
          <input
            placeholder="제목을 입력하세요"
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          ></input>
          <input
            placeholder='내용을 입력하세요'
            onChange={(e) => {
              setChangeValue(e.target.value);
            }}
          ></input>
          <button
            onClick={() => {
              let copy = [...title];
              copy.unshift(inputValue);
              setTitle(copy);

              let copy2 = [...detail];
              copy2.unshift(changeValue);
              setDetail(copy2);

              setDate(a => {
                let date = new Date();
                let month = date.getMonth();
                let day = date.getDate();
                return [String(month+1)+'월 '+String(day)+'일',...a]
              })

              setGood(a => {
                return [0,...a]
              })
            }}
          >
            글 발행
          </button>
        </div>
      </div>
      {title.map(function (a, i) {
        return (
          <div className="list">
            <h4
              onClick={() => {
                setModal(!modal);
                setChangeTitle(i);
              }}
            >
              {title[i]}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  let copy = [...good];
                  copy[i] = copy[i] + 1;
                  setGood(copy);
                }}
              >
                {" "}
                👍{" "}
              </span>
              {good[i]}
            </h4>
            <p>{date[i]}</p>

            <button
            onClick={(e) => {
            e.stopPropagation();
            let copy = [...title];
            copy.splice(i,1);
            setTitle(copy);  
            }}>Delete</button>


          </div>
        );
      })}
      {modal == true ? (
        <Modal
          title={title}
          date={date}
          detail={detail}
          changeTitle={changeTitle}
        ></Modal>
      ) : null}
    </div>
  );
}

function Modal(props) {
  return (
    <div className="modal">
      <h4>{props.title[props.changeTitle]}</h4>
      <p>{props.date[props.changeTitle]}</p>
      <p>{props.detail[props.changeTitle]}</p>
    </div>
  );
}

export default App;
