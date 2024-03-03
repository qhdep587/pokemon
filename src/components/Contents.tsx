/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useContext } from "react";
import Modal from "./Modal";
import CallList from "./CallList";
import { TargetContext } from "../context/TargetContext";
import { useAppSelector } from "../hoooks";
import { selectLoading } from "../redux/loadingSlice";

const Contents: React.FC = () => {
  const { targetIdForSearch, setPokeSet } = useContext(TargetContext);
  const footLine = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLTableSectionElement>(null);
  const isLoading = useAppSelector(selectLoading);
  const io: IntersectionObserver = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting && targetIdForSearch === undefined) {
      setPokeSet(3);
    }
  });
  useEffect(() => {
    io.observe(footLine.current!);
  }, []);
  useEffect(() => {
    if (targetIdForSearch) {
      setPokeSet(2);
    }
  }, [targetIdForSearch]);

  return (
    <>
      <section ref={sectionRef}>
        {isLoading ? <div className="loading">Loading...</div> : ""}
        <ul className="content">
          <Modal />
          <CallList />
        </ul>
      </section>
      <div className="footer" ref={footLine}></div>
    </>
  );
};

export default Contents;
