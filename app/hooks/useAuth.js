const { useContext } = require("react");
const { default: AuthContext } = require("../auth/context");

const useAuth = () => {
	const { currentUser, setCurrentUser } = useContext(AuthContext);

	return { currentUser, setCurrentUser };
};

export default useAuth;
