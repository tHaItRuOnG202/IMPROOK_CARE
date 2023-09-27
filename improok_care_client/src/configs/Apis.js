import axios from "axios";
import cookie from "react-cookies";

const SERVER_CONTEXT = "/IMPROOK_CARE";
const SERVER = "http://localhost:2024"

export const endpoints = {
    "login": `${SERVER_CONTEXT}/api/public/login/`,
    "current-user": `${SERVER_CONTEXT}/api/auth/current-user/`,
    "update-user": `${SERVER_CONTEXT}/api/auth/update-user/`,
    "verification": `${SERVER_CONTEXT}/api/public/verification/`,
    "verification-check": `${SERVER_CONTEXT}/api/public/verification-check/`,
    "register": `${SERVER_CONTEXT}/api/public/register/`,
    "add-profile-patient": `${SERVER_CONTEXT}/api/auth/add-profile-patient/`,
    "provinces": `${SERVER_CONTEXT}/api/public/provinces/`,
    "districts": (provinceCode) => `${SERVER_CONTEXT}/api/public/provinces/${provinceCode}/districts/`,
    "wards": (districtCode) => `${SERVER_CONTEXT}/api/public/districts/${districtCode}/wards/`
}

export const authApi = () => {
    return axios.create({
        baseURL: SERVER,
        headers: {
            "Authorization": cookie.load("token")
        }
    })
}

export default axios.create({
    baseURL: SERVER
})

