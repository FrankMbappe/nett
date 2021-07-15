import authStorage from "../auth/storage";

const { useContext } = require("react");
const { default: AuthContext } = require("../auth/context");

const useAuth = () => {
	const { currentUser, setCurrentUser } = useContext(AuthContext);

	const logOut = () => {
		setCurrentUser(null);
		authStorage.removeToken();
	};

	return { currentUser, setCurrentUser, logOut };
};

export default useAuth;
