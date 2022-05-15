import axios from "axios";
import { useState, useEffect, useMemo, useCallback } from "react";
import styles from "./CheckNetworkConnections.module.css";
// import * as debounce from "lodash.debounce";

type props = {
  children: React.ReactNode;
  netName: string[];
};

const CheckNetworkConnections = ({ children, netName }: props) => {
  const [isConnected, setIsConnected] = useState<boolean>();

  useEffect(() => {
    checkNetwork();
    const interval = setInterval(() => checkNetwork(), 300000);
    return () => clearInterval(interval);
  }, []);

  const checkNetwork = useCallback(() => {
    netName.map((name: string) =>
      axios
        .get(`https://sub.id/api/v1/check/${name}`)
        .then((res) => {
          setIsConnected(res.data);
        })
        .catch((error) => console.log(error.message))
    );
  }, [netName]);

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
