import axios from "axios";

export const axiosGet = async (url: string, callback: Function): Promise<void | any> => {
  const res = await axios.get(process.env.REACT_APP_BASE_URL + url).catch((err) => {
    callback(false);
    return console.log("검색된 포켓몬의 상세정보가 존재하지 않습니다.");
  });
  return res;
};

export default axios;
