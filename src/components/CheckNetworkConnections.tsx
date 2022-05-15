import axios from "axios";
import { useState, useEffect } from "react";
import styles from "./CheckNetworkConnections.module.css";
// import * as debounce from "lodash.debounce";

type props = {
  children: React.ReactNode;
  netName: string[];
};

const CheckNetworkConnections = ({ children, netName }: props) => {
  const [isConnected, setIsConnected] = useState<boolean>();

  useEffect(() => {
    netName.forEach(checkNetwork);
    const interval = setInterval(() => {
      netName.forEach(checkNetwork);
    }, 300000);
    return () => clearInterval(interval);
  }, []);

  const checkNetwork = (name: string) => {
    axios
      .get(`https://sub.id/api/v1/check/${name}`)
      .then((res) => {
        setIsConnected(res.data);
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <div
      className={
        !isConnected ? styles.networkNotConnect : styles.networkConnect
      }
    >
      {children}
      <p className={styles.connection}>
        {isConnected ? "connected" : "disConnected"}
        <span
          className={
            isConnected
              ? styles.connectionRectangleG
              : styles.connectionRectangleR
          }
        ></span>
      </p>
    </div>
  );
};

export default CheckNetworkConnections;
