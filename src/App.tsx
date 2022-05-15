import { useEffect, useState } from "react";
import styles from "./App.module.css";
import axios from "axios";
import { dataTypes } from "./types/data";
import CheckNetworkConnections from "./components/CheckNetworkConnections";
import GetIcon from "./components/GetIcon";

function App(): JSX.Element {
  const [data, setData] = useState<object[] | any>([]);
  const url = "https://sub.id/api/v1/chains/properties";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(url)
      .then((res) => {
        let result = res.data;
        console.log(Object.values(result));
        setData(Object.values(result));
      })
      .catch((e) => console.log(e.message));
  };

  const names = data.map((item: dataTypes): string[] => {
    let nameList: string[] = [];
    nameList.push(item.name.toLocaleLowerCase());
    return nameList;
  });

  return (
    <div className={styles.App}>
      {data?.map((item: dataTypes, index: number) => {
        if (item.tokenSymbols && item.tokenDecimals) {
          return (
            <CheckNetworkConnections netName={names} key={index}>
              <GetIcon src={item.icon} alt={item.name} />
              <p>{item.name}</p>
            </CheckNetworkConnections>
          );
        }
      })}
    </div>
  );
}

export default App;
