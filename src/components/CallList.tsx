/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useContext, useEffect } from "react";
import { axiosGet } from "../api/axios";
import { TargetContext } from "../context/TargetContext";
import { loadingFn } from "../redux/loadingSlice";
import { emptyFn } from "../redux/emptySlice";
import { selectEmpty } from "../redux/emptySlice";
import { selectUrl } from "../redux/urlSlice";
import { useAppDispatch, useAppSelector } from "../hoooks";
import { iPokemonCard, iPokeList } from "../interface";

const CallList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { setTargetId, searchOnOff, pokeSet, setPokeSet, targetIdForSearch, errTf, setErrTf } =
    useContext(TargetContext);
  const [pokeList, setPokeList] = useState<iPokeList[]>([]); //포켓몬 리스트
  const empty = useAppSelector(selectEmpty);
  const url = useAppSelector(selectUrl);
  const page = useRef<number>(0);

  useEffect(() => {
    if (targetIdForSearch !== undefined && pokeSet === 2) {
      callListFn(targetIdForSearch);
    } else if (targetIdForSearch === undefined && pokeSet === 3) {
      callListFn(undefined);
    }
    setPokeSet(1);
  }, [pokeSet]);

  const changeNameFn = (res: any): void => {
    res?.data.results.forEach(async (item: iPokemonCard, i: number) => {
      let nameRes = await axiosGet(url.detailUrl + item.url.split("/")[item.url.split("/").length - 2] + "", setErrTf);
      let imgRes = await axiosGet(url.infoUrl + item.url.split("/")[item.url.split("/").length - 2] + "", setErrTf);
      res.data.results[i].name = nameRes?.data.names[2].name;
      res.data.results[i].img = imgRes?.data.sprites.front_default;
    });
  };

  const callListFn = async (props: number | undefined): Promise<void> => {
    dispatch(emptyFn(false));
    if (props !== undefined) {
      dispatch(loadingFn(true));
      try {
        const res = await axiosGet(url.listUrlFront + (props - 1) + url.listUrlBackForSearch, setErrTf);
        if (res?.status === 200 && res?.data.results.length > 0) {
          changeNameFn(res);
          setTimeout(() => {
            setPokeList(res.data.results);
            page.current = 1;
          }, 100);
        } else {
          dispatch(emptyFn(true));
        }
      } catch (e) {
        console.log(e);
      }
      dispatch(loadingFn(false));
    } else if (searchOnOff) {
      dispatch(loadingFn(true));
      try {
        const res = await axiosGet(url.listUrlFront + page.current * 20 + url.listUrlBack, setErrTf);
        if (res?.status === 200) {
          changeNameFn(res);
          setTimeout(() => {
            setPokeList((prev) => {
              return [...prev.concat(res.data.results)];
            });
            page.current = page.current + 1;
          }, 100);
        }
      } catch (e) {
        console.log(e);
      }
      dispatch(loadingFn(false));
    }
  };

  const setTargetIdFn = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (errTf) setTargetId((e.target as HTMLButtonElement).id);
    else alert("검색된 포켓몬의 상세정보가 존재하지 않습니다.");
  };

  return (
    <>
      {!empty ? (
        pokeList ? (
          pokeList.map((item: iPokeList, i: number) => {
            const idNum = item.url.split("/")[item.url.split("/").length - 2];
            return (
              <li
                id={idNum}
                key={"poke" + i}
                className="pokemonCard"
                onClick={(e) => {
                  e.stopPropagation();
                  setTargetIdFn(e);
                }}
              >
                <span
                  id={idNum}
                  className="numSpan"
                  onClick={(e) => {
                    e.stopPropagation();
                    setTargetIdFn(e);
                  }}
                >
                  {idNum ? "No." + idNum : "data:x"}
                </span>
                <br></br>
                <span
                  id={idNum}
                  className="nameSpan"
                  onClick={(e) => {
                    e.stopPropagation();
                    setTargetIdFn(e);
                  }}
                >
                  {item.name ? item.name : "data:x"}
                </span>
                <hr></hr>
                <img
                  id={idNum}
                  className="imgBox"
                  src={item.img}
                  alt={item.name}
                  onClick={(e) => {
                    e.stopPropagation();
                    setTargetIdFn(e);
                  }}
                />
              </li>
            );
          })
        ) : (
          "data:x"
        )
      ) : (
        <h3>해당 ID의 포켓몬이 없습니다. (No.1302 까지)</h3>
      )}
    </>
  );
};
export default CallList;
