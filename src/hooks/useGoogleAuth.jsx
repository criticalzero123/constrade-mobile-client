import * as Google from "expo-auth-session/providers/google";
import { WEB_CLIENT_ID, ANDROID_CLIENT_ID, IOS_CLIENT_ID } from "@env";

import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

export const useGoogleAuth = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: ANDROID_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    clientId: WEB_CLIENT_ID,
  });

  return [request, response, promptAsync];
};
