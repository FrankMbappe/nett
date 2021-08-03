import authStorage from "../auth/storage";
import jwtDecode from "jwt-decode";
const { useContext } = require("react");
const { default: AuthContext } = require("../auth/context");

const useAuth = () => {
    const { currentUser, setCurrentUser } = useContext(AuthContext);

    const logIn = async (authToken) => {
        /* I store the JWT token
		   and decode the user object from it */
        authStorage.storeToken(authToken);
        const decodedUser = jwtDecode(authToken);

        // Then I set the current user to decoded value
        setCurrentUser(decodedUser);
    };

    const logOut = () => {
        setCurrentUser(null);
        authStorage.removeToken();
    };

    return { currentUser, setCurrentUser, logIn, logOut };
};

export default useAuth;
