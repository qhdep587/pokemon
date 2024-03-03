import { useState } from "react";
import { useContext, useRef } from "react";
import { TargetContext } from "../context/TargetContext";
const Header: React.FC = () => {
  const { setTargetIdForSearch, setSearchOnOff, setErrTf } = useContext(TargetContext);
  const [searchText, setSearchText] = useState<string>();
  const searchInput = useRef<HTMLInputElement>(null);
  return (
    <div className="header">
      <span className="search">
        <button
          className="searchBtn"
          onClick={() => {
            setSearchOnOff(false);
            setTargetIdForSearch(searchText);
            setErrTf(true);
          }}
        >
          search
        </button>
        &nbsp;
        <input
          className="searchInput"
          ref={searchInput}
          type="text"
          placeholder="포켓몬ID 검색(숫자)"
          value={searchText}
          onFocus={() => setSearchText("")}
          onChange={(e) => {
            const regex = /^[0-9]*$/;
            if (regex.test((e.target as HTMLInputElement).value)) {
              setSearchText((e.target as HTMLInputElement).value);
            } else {
              alert("숫자만 입력 가능합니다.");
              searchInput.current!.focus();
            }
          }}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              setSearchOnOff(false);
              setTargetIdForSearch(searchText);
              setErrTf(true);
            }
          }}
        />
      </span>
      <span className="headerTitle">
        [스튜디오메이트 프론트 개발자 과제] - 포켓몬 API 을 이용하여 react로 포켓몬 도감을 만들어라.
      </span>
      <button
        className="topBtn"
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        TOP
      </button>
      <button className="refresh" onClick={() => window.location.reload()}>
        <img
          className="refreshIcon"
          src={require("../image/refresh.png")}
          alt="아스트랄 아이콘 제작자: Metami septiana - Flaticon"
        />
      </button>
    </div>
  );
};

export default Header;
