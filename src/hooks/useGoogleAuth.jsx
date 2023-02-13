import * as Google from "expo-auth-session/providers/google";
import { WEB_CLIENT_ID } from "@env";

import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

export const useGoogleAuth = () => {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: WEB_CLIENT_ID,
  });

  return [request, response, promptAsync];
};
