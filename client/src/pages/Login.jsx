import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        localStorage.setItem("isLoggedIn", true);
        navigate("/create");
    };

    return (
        <div className="h-screen flex items-center justify-center bg-[#111] text-white">
            <button
                onClick={handleLogin}
                className="bg-purple-600 px-6 py-2 rounded-lg text-lg font-semibold"
            >
                Login to Continue
            </button>
        </div>
    );
};

export default Login;
