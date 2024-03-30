import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { throttle } from "lodash";
import useWebSocket from "react-use-websocket";

const HomePage = ({ userName }) => {
  const WS_URL = "ws://localhost:8000";
  const { sendJsonMessage } = useWebSocket(WS_URL, {
    queryParams: { username: userName },
  });

  const THROTTLE = 50;
  const throttledSend = useRef(throttle(sendJsonMessage, THROTTLE));

  useEffect(() => {
    window.addEventListener("mousemove", (e) => {
      throttledSend.current({
        x: e.clientX,
        y: e.clientY,
      });
    });
  }, []);

  return <div>HomePage {userName}</div>;
};

HomePage.propTypes = {
  userName: PropTypes.string,
};

export default HomePage;
