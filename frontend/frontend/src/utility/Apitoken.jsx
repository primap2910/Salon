import axios from "axios";
import CheckToken from "./CheckToken";
import Logout from "./Logout";

const api = axios.create({
    baseURL: "http://localhost:8000"
});

api.interceptors.request.use((config) => {
    const token = CheckToken();
    if (token) {
        config.headers.Authorization = "Bearer " + token; 
    }
    return config;
    }
);

api.interceptors.response.use(
    res => res,
    err => {
        if ( err.response &&
      (err.response.status === 401 || err.response.status === 403)) {
            Logout();
        }
        // FIX: return Promise.reject so .catch() in components receives the error properly
        return Promise.reject(err);
    }
);

export default api;