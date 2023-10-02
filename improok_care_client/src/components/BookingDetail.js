import { useParams } from "react-router-dom";
import "../styles/BookingDetail.css"
import { useContext, useEffect, useState } from "react";
import Apis, { authApi, endpoints } from "../configs/Apis";
import { MyUserContext } from "../App";
import printer from "../assests/images/printer.png"
import profileicon from "../assests/images/profile-icon.png"
import profile404 from "../assests/images/profile.png"

const BookingDetail = () => {
    const [current_user, dispatch] = useContext(MyUserContext);
    const { profileDoctorId } = useParams();
    const [doctorDetail, setDoctorDetail] = useState('');
    const [profilePatient, setProfilePatient] = useState([]);
    const [dateBooking, setDateBooking] = useState([]);
    const [timeSlotBooking, setTimeSlotBooking] = useState([]);
    const [selectedDateBooking, setSeleectedDateBooking] = useState('');
    const [selectedTimeSlotBooking, setSelectedTimeSlotBooking] = useState('');
    const [selectedProfileBooking, setSelectedProfileBooking] = useState('');

    useEffect(() => {
        const loadProfileDoctorById = async () => {
            try {
                console.log(profileDoctorId)
                let res = await Apis.get(endpoints['load-profile-doctor-by-Id'](profileDoctorId));
                setDoctorDetail(res.data);
                console.log(res.data);
            } catch (error) {
                console.log(error);
            }
        }

        loadProfileDoctorById();
    }, [profileDoctorId])

    useEffect(() => {
        const loadDateBooking = async () => {
            try {
                let res = await Apis.post(endpoints['date-booking'], {
                    "profileDoctorId": profileDoctorId
                })
                setDateBooking(res.data);
                console.log(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        loadDateBooking();
    }, [profileDoctorId])

    useEffect(() => {
        const loadProfilePatient = async () => {
            try {
                let res = await authApi().get(endpoints['load-profile-patient'](current_user.userId))
                setProfilePatient(res.data);
                console.log(res.data);
            } catch (error) {
                console.log(error)
            }
        }
        loadProfilePatient();
    }, [current_user.userId])

    return <>
        <h3>Đặt khám bác sĩ {doctorDetail.name}</h3>
        <div class="Booking_Detail_Wrapper">
            <div class="Booking_Detail">
                <div class="Booking_Detail_Header">
                    <div class="Booking_Step">
                        <div class="Booking_Step_1">
                            <span>1</span>
                            <span>Thời gian khám</span>
                        </div>
                        <div class="Booking-Step_2">
                            <span>2</span>
                            <span>Bệnh nhân</span>
                        </div>
                    </div>
                </div>
                <div class="Booking_Detail_Body">
                    <div class="Booking_Detail_Body_Left">
                        <div class="Booking_Date_Time">
                            <div>
                                <span>1</span>
                                <span>Ngày và giờ khám</span>
                            </div>
                            <div>
                                {dateBooking.length === 0 ? (
                                    <h5>Bác sĩ này chưa có lịch</h5>
                                ) : (
                                    Object.values(dateBooking).map(db => {
                                        const currentDate = new Date();
                                        const bookingDate = new Date(db);

                                        if (bookingDate > currentDate) {
                                            return (
                                                <div className="Booking_Date_Item" key={db}>
                                                    <span>{db}</span>
                                                </div>
                                            );
                                        }
                                    })
                                )}
                            </div>
                            <div></div>
                        </div>
                        <div class="Booking_Patient">
                            <div>
                                <span>2</span>
                                <span>Bệnh nhân</span>
                            </div>
                            <div>
                                {profilePatient.length === 0 ? (
                                    <>
                                        <h6>Chọn hồ sơ bạn muốn đặt khám</h6>
                                        <div class="Profile_List_404">
                                            <img src={printer} alt="404" width={'20%'} />
                                            <span>Không tìm thấy kết quả</span>
                                        </div>
                                    </>
                                ) : (
                                    Object.values(profilePatient).map(pp => {
                                        return <>
                                            <div class="Profile_List_Detail">
                                                <img src={profileicon} alt="profileicon" width={'20%'} />
                                                <li key={pp.profilePatientId} value={pp.profilePatientId}>{pp.name}</li>
                                            </div>
                                        </>
                                    })
                                )}
                            </div>
                        </div>
                    </div>
                    <div class="Booking_Detail_Body_Right">
                        <div>

                        </div>
                    </div>
                </div>
                <div class="Booking_Detail_Footer"></div>
            </div>
        </div>
    </>
}

export default BookingDetail;