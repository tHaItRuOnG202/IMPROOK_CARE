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
    "load-profile-patient": (userId) => `${SERVER_CONTEXT}/api/auth/user/${userId}/profile-patient/`,
    "view-profile-patient": (profilePatientId) => `${SERVER_CONTEXT}/api/auth/profile-patient/${profilePatientId}/`,
    "update-profile-patient": `${SERVER_CONTEXT}/api/auth/update-profile-patient/`,
    "load-profile-doctor-by-userId": (userId) => `${SERVER_CONTEXT}/api/public/user/${userId}/profile-doctor/`,
    "load-profile-doctor-by-Id": (profileDoctorId) => `${SERVER_CONTEXT}/api/public/profile-doctor/${profileDoctorId}/`,
    "load-profile-doctor": `${SERVER_CONTEXT}/api/public/profile-doctor/`,
    "add-profile-doctor": `${SERVER_CONTEXT}/api/auth/doctor/add-profile-doctor/`,
    "update-profile-doctor": `${SERVER_CONTEXT}/api/auth/doctor/update-profile-doctor/`,
    "time-distance": `${SERVER_CONTEXT}/api/public/timeDistance/`,
    "time-slot": (timeDistanceId) => `${SERVER_CONTEXT}/api/public/timeDistance/${timeDistanceId}/timeSlot/`,
    "add-schedule": `${SERVER_CONTEXT}/api/auth/doctor/add-schedule/`,
    "specialty": `${SERVER_CONTEXT}/api/public/specialty/`,
    "check-scheduled": `${SERVER_CONTEXT}/api/public/check-scheduled/`,
    "find-check-scheduled": `${SERVER_CONTEXT}/api/public/find-check-scheduled/`,
    "date-booking": `${SERVER_CONTEXT}/api/public/date-booking/`,
    "timeslot-booking": `${SERVER_CONTEXT}/api/public/time-slot-booking/`
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

