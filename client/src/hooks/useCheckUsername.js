import { useEffect, useState } from "react";
import api from "../utils/api";

const useCheckUsername = (username) => {
  const [usernameLoader, setusernameLaoder] = useState(false);
  const [usernameAvailabel, setUsernameAvailable] = useState(false);
  const [usernamehelperText, setUsernameHelperText] = useState(null);

  useEffect(() => {
    setUsernameAvailable(false);
    if (username) {
      const getData = setTimeout(() => {
        setusernameLaoder(true);
        api
          .post("/auth/check-username", { username })
          .then((e) => {
            console.log(e.data);
            if (e.data.exist) {
              setUsernameHelperText({
                msg: "This username is already taken",
                color: "red",
                error: true,
              });
            } else {
              setUsernameAvailable(true);
              setUsernameHelperText({
                msg: "This username is available",
                color: "green",
                error: false,
              });
            }
          })
          .catch((e) => console.log(e))
          .finally(() => setusernameLaoder(false));
      }, 500);
      return () => clearTimeout(getData);
    }
  }, [username]);

  return {
    usernameLoader,
    usernameAvailabel,
    username,
    setUsernameHelperText,
    usernamehelperText,
  };
};

export default useCheckUsername;
