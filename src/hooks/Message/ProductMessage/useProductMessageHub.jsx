import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { useEffect, useState } from "react";
import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useMessageHubConnection() {
  const [connection, setConnection] = useState(null);
  const [message, setMessage] = useState();

  useEffect(() => {
    AsyncStorage.multiGet(["apiKey", "token"], (err, item) => {
      const apiKey = item[0][1];
      const token = item[1][1];

      const newConnection = new HubConnectionBuilder()
        .withUrl(`${API_URL}/hubs/productChatHub`, {
          headers: {
            ApiKey: apiKey,
          },
          accessTokenFactory: () => {
            return `${token}`;
          },
        })
        .withAutomaticReconnect({
          nextRetryDelayInMilliseconds: (retryContext) => {
            newConnection.headers["ApiKey"] = apiKey;
            return Math.random() < 0.5 ? 1000 : 3000;
          },
        })
        .configureLogging(LogLevel.Information)
        .build();
      setConnection(newConnection);
    });
  }, []);

  useEffect(() => {
    if (connection && connection._connectionState === "Disconnected") {
      connection
        .start()
        .then(() => {
          console.log("SignalR connection established.");

          // Message Receiver
          connection.on("ProductReceiveMessage", (message) => {
            setMessage(message);
          });
        })
        .catch((err) => {
          console.log(`SignalR connection error: ${err}`);
        });
    }

    return () => {
      if (connection) {
        connection.stop();
        console.log("SignalR connection closed.");
      }
    };
  }, [connection]);

  //id for the creating chat or email for the uniqueness of the auth
  const sendMessage = async (senderId, receiverId, productId, message) => {
    if (connection) {
      await connection.invoke(
        "SendMessage",
        senderId,
        receiverId,
        productId,
        message
      );
    }
  };

  return { sendMessage, message };
}
