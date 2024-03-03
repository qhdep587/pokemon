/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useState, useRef, useEffect, useContext } from "react";
import { axiosGet } from "../api/axios";
import { TargetContext } from "../context/TargetContext";
import { selectUrl } from "../redux/urlSlice";
import { iEvObject, iTypeObject, iPokemonDetail, iPokemonInfo, iExplanationKoItem } from "../interface";
import { loadingFn } from "../redux/loadingSlice";
import { useAppDispatch, useAppSelector } from "../hoooks";

const Modal: React.FC = () => {
  const url = useAppSelector(selectUrl);
  const dispatch = useAppDispatch();
  const { targetId, setTargetId, setErrTf } = useContext(TargetContext);
  const [pokemonEvolution, setPokemonEvolution] = useState<iEvObject[]>(); //진화정보
  const [pokemonType, setPokemonType] = useState<iTypeObject[]>(); //속성정보
  const [pokemonDetail, setPokemonDetail] = useState<iPokemonDetail>(); //디테일정보
  const [pokemonInfo, setPokemonInfo] = useState<iPokemonInfo>(); //신체정보
  const [explanationKo, setExplanationKo] = useState<string>("");
  const modalOnOff = useRef<boolean>(false); //모달 on/off
  const blackBack = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (targetId !== undefined) {
      modalFn(targetId);
      setTargetId();
    }
  }, [targetId]);

  const modalFn = async (targetId: number): Promise<void> => {
    dispatch(loadingFn(true));
    modalOnOff.current = true;
    let typeObject: iTypeObject[] = [];
    let evList: number[] = [];
    let evObject: iEvObject[] = [];
    let explanationKo: string[] = [];
    const info = await axiosGet(url.infoUrl + targetId, setErrTf);
    const detail = await axiosGet(url.detailUrl + targetId, setErrTf);
    const evolutionChainNum =
      detail?.data.evolution_chain.url.split("/")[detail?.data.evolution_chain.url.split("/").length - 2];
    const evolution = await axiosGet(url.evolutionUrl + evolutionChainNum, setErrTf);
    if (evolution?.data.chain.species) {
      const getIdLv1 = evolution.data.chain.species.url;
      evList.push(getIdLv1.split("/")[getIdLv1.split("/").length - 2]);
      if (evolution.data.chain.evolves_to.length !== 0) {
        const getIdLv2 = evolution.data.chain.evolves_to[0].species.url;
        evList.push(getIdLv2.split("/")[getIdLv2.split("/").length - 2]);
        if (evolution.data.chain.evolves_to[0].evolves_to.length !== 0) {
          const getIdLv3 = evolution.data.chain.evolves_to[0].evolves_to[0].species.url;
          evList.push(getIdLv3.split("/")[getIdLv3.split("/").length - 2]);
          if (evolution.data.chain.evolves_to[0].evolves_to[0].evolves_to.length !== 0) {
            const getIdLv4 = evolution.data.chain.evolves_to[0].evolves_to[0].evolves_to[0].species.url;
            evList.push(getIdLv4.split("/")[getIdLv4.split("/").length - 2]);
          }
        }
      }
    }
    evList.map(async (item) => {
      const infoRes = await axiosGet(url.infoUrl + item, setErrTf);
      const detailRes = await axiosGet(url.detailUrl + item, setErrTf);
      const name = detailRes.data ? detailRes.data.names[2].name : "";
      const id = detailRes.data ? detailRes.data.id : "";
      evObject.push({
        id: id,
        name: name,
        img: infoRes.data.sprites.front_default,
      });
    });
    info?.data.types.map(async (item: iPokemonInfo) => {
      const typeUrlForKo = item.type.url;
      const res = await axiosGet(url.typeUrl + typeUrlForKo.split("/")[typeUrlForKo.split("/").length - 2], setErrTf);
      typeObject.push(res.data.names[1]);
      setPokemonType(typeObject);
    });
    detail?.data.flavor_text_entries.map((item: iExplanationKoItem) => {
      if (item.language.name === "ko") {
        explanationKo.push(item.flavor_text);
      }
    });
    setExplanationKo(explanationKo[1]);
    setPokemonDetail(detail?.data);
    setPokemonInfo(info?.data);
    setTimeout(() => {
      setPokemonEvolution(evObject.sort((a: iEvObject, b: iEvObject) => a.id - b.id));
      dispatch(loadingFn(false));
    }, 50);
    setTimeout(() => {
      blackBack.current!.classList.add("blackBackShow");
    }, 60);
  };

  return (
    <div ref={blackBack} className="blackBack">
      <div className="modalContent">
        <div className="modalHeader">
          <span>* 포켓몬 정보 *</span>
          <button
            onClick={(e) => {
              blackBack.current!.classList.remove("blackBackShow");
              modalOnOff.current = false;
            }}
          >
            close
          </button>
        </div>
        <div className="modalContentItem">
          <div className="modalContentItem1">
            <img
              className="modalImgBox"
              src={pokemonInfo ? pokemonInfo.sprites.front_default : "data:x"}
              alt="detailPhoto"
            />
          </div>
          <div className="modalContentItem2">
            <div className="pokemonDetail">
              <div className="pokemonDetailTitle">
                {modalOnOff ? (pokemonDetail ? "No." + pokemonDetail.id : "data:x") : "data:x"}&nbsp;&nbsp;
                <span className="fontSize2r">
                  {modalOnOff ? (pokemonDetail ? pokemonDetail.names[2].name : "data:x") : "data:x"}
                </span>
              </div>
              <hr className="hrTop"></hr>
              <br></br>
              <div className="pokemonInfo">
                <div className="info1">
                  키 : {pokemonInfo ? pokemonInfo?.height : "data:x"}
                  <br></br>
                  몸무게 : {pokemonInfo ? pokemonInfo?.weight : "data:x"}
                  <br></br>
                  속성 :
                  {pokemonType
                    ? pokemonType.map((item, index) => {
                        return index < pokemonType.length - 1 ? (
                          <span key={index}> {item.name},</span>
                        ) : (
                          <span key={index}> {item.name}</span>
                        );
                      })
                    : "data:x"}
                </div>
                <hr className="infoHr"></hr>
                <div className="info2">
                  {modalOnOff
                    ? pokemonDetail
                      ? pokemonDetail.flavor_text_entries
                        ? "설명 : " + explanationKo
                        : "data:x"
                      : "data:x"
                    : "data:x"}
                </div>
              </div>
            </div>
            <div className="evolution">
              <div className="evolutionTitle">진화 단계</div>
              <div className="evolutionChain">
                {pokemonEvolution
                  ? pokemonEvolution.map((item, idx) => {
                      return (
                        <div className="evolutionBox" key={"eb" + idx}>
                          <img className="evolutionImgBox" src={item.img} alt="evolutionPhoto" />
                          <br></br>
                          <span className="smallFont">
                            {item.id ? "No." + item.id : "data:x"} {item.name ? item.name : "data:x"}
                          </span>
                        </div>
                      );
                    })
                  : "data:x"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
