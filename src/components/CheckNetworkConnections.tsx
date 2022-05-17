import axios from "axios";
import { useState, useEffect } from "react";
import styles from "./CheckNetworkConnections.module.css";

type props = {
  children: React.ReactNode;
  netName: string;
};

const CheckNetworkConnections = ({ children, netName }: props) => {
  const [isConnected, setIsConnected] = useState<boolean>();

  useEffect(() => {
    checkNetwork();
    const interval = setInterval(() => {
      checkNetwork();
    }, 6000);
    return () => clearInterval(interval);
  }, [netName]);

  const checkNetwork = () => {
    axios
      .get(`https://sub.id/api/v1/check/${netName}`)
      .then((res) => {
        res.status === 200 ? setIsConnected(true) : setIsConnected(false);
      })
      .catch((error) => console.log(error.message));
  };
  console.log(isConnected);

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
