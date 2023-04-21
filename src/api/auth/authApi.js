import axios from "axios"

export const getAuthenticated = (accessToken) => {
    axios.get("http://localhost:8080/auth/authentication", {params: {accessToken}});
}