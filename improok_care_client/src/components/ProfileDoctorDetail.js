import { useEffect, useState } from "react";
import "../styles/ProfileDoctorDetail.css"
import { useParams } from "react-router-dom";
import Apis, { endpoints } from "../configs/Apis";

const ProfileDoctorDetail = () => {
    const { profileDoctorId } = useParams();
    const [doctorDetail, setDoctorDetail] = useState('');

    useEffect(() => {
        const loadProfileDoctorById = async () => {
            try {
                let res = await Apis.get(endpoints['load-profile-doctor-by-Id'](profileDoctorId));
                setDoctorDetail(res.data);
                console.log(res.data);
            } catch (error) {
                console.log(error);
            }
        }

        loadProfileDoctorById();
    }, [profileDoctorId])

    let url = `/booking/doctor/${doctorDetail.profileDoctorId}`

    return <>
        <h3>Bác sĩ {doctorDetail.name}</h3>
        <button><a href={url}>Đặt khám liền</a></button>
    </>
}

export default ProfileDoctorDetail;