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
    "timeslot-booking": `${SERVER_CONTEXT}/api/public/time-slot-booking/`,
    "add-booking": `${SERVER_CONTEXT}/api/auth/add-booking/`,
    "send-form-email": `${SERVER_CONTEXT}/api/public/send-form-email/`,
    "send-custom-email": `${SERVER_CONTEXT}/api/public/send-custom-email/`,
    "forgot-password": `${SERVER_CONTEXT}/api/public/forgot-password/`,
    "change-password": `${SERVER_CONTEXT}/api/auth/change-password/`,
    "booking-user-view": `${SERVER_CONTEXT}/api/auth/booking-user-view/`,
    "booking-doctor-view": `${SERVER_CONTEXT}/api/auth/booking-doctor-view/`,
    "accept-booking": `${SERVER_CONTEXT}/api/auth/doctor/accept-booking/`,
    "deny-booking": `${SERVER_CONTEXT}/api/auth/doctor/deny-booking/`,
    "cancel-booking": `${SERVER_CONTEXT}/api/auth/cancel-booking/`,
    "verification-forgot-password": `${SERVER_CONTEXT}/api/public/verification-forgot-password/`,
    "load-user": `${SERVER_CONTEXT}/api/public/users/`,
    "booking-details-user-view": `${SERVER_CONTEXT}/api/auth/booking-details-user-view/`,
    "admin-add-user": `${SERVER_CONTEXT}/api/auth/admin/add-user/`,
    "admin-update-user": `${SERVER_CONTEXT}/api/auth/admin/update-user/`,
    "load-user-by-Id": (userId) => `${SERVER_CONTEXT}/api/public/user/${userId}/`,
    "roles": `${SERVER_CONTEXT}/api/public/roles/`,
    "search-users": `${SERVER_CONTEXT}/api/public/search-users/`,
    "medicine-categories": `${SERVER_CONTEXT}/api/public/medicine-categories/`,
    "add-medicine-categories": `${SERVER_CONTEXT}/api/auth/admin/add-medicine-category/`,
    "update-medicine-categories": `${SERVER_CONTEXT}/api/auth/admin/update-medicine-category/`,
    "medicines": `${SERVER_CONTEXT}/api/public/medicines/`,
    "search-medicines": `${SERVER_CONTEXT}/api/public/search-medicines/`,
    "admin-add-medicine": `${SERVER_CONTEXT}/api/auth/admin/add-medicine/`,
    "load-medicine-by-Id": (medicineId) => `${SERVER_CONTEXT}/api/public/medicines/${medicineId}/`,
    "admin-update-medicine": `${SERVER_CONTEXT}/api/auth/admin/update-medicine/`
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

