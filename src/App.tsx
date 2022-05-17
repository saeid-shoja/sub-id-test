import { useEffect, useState, useCallback } from "react";
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
        setData(Object.values(result));
      })
      .catch((e) => console.log(e.message));
  };

  // const names = data.map((item: dataTypes): string[] => {
  //   let nameList: string[] = [];
  //   if (item.tokenSymbols && item.tokenDecimals) {
  //     nameList.push(item.name.toLocaleLowerCase());
  //   }
  //   return nameList;
  // });

  //I do map again because it doesn't work correctly and it will return false for.. //
  //all names in the above case(map)//

  const checkDataDetailes = useCallback(
    () =>
      data?.map((item: dataTypes) => {
        if (item.tokenSymbols && item.tokenDecimals) {
          return (
            <CheckNetworkConnections netName={item.name} key={item.name}>
              <GetIcon src={item.icon} alt={item.name} />
              <p>{item.name}</p>
            </CheckNetworkConnections>
          );
        }
      }),
    [data]
  );

  return <div className={styles.App}>{checkDataDetailes()}</div>;
}

export default App;
