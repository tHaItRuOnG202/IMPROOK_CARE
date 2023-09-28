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
    "wards": (districtCode) => `${SERVER_CONTEXT}/api/public/districts/${districtCode}/wards/`,
    "add-profile-doctor": `${SERVER_CONTEXT}/api/auth/doctor/add-profile-doctor/`,
    "load-profile-patient": (userId) => `${SERVER_CONTEXT}/api/auth/user/${userId}/profile-patient/`,
    "view-profile-patient": (profilePatientId) => `${SERVER_CONTEXT}/auth/profile-patient/${profilePatientId}/`,
    "time-distance": `${SERVER_CONTEXT}/api/public/timeDistance/`,
    "time-slot": (timeDistanceId) => `${SERVER_CONTEXT}/api/public/timeDistance/${timeDistanceId}/timeSlot/`,
    "add-schedule": `${SERVER_CONTEXT}/api/auth/doctor/add-schedule/`
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

