import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyUserContext } from "../App";
import "../styles/Appointment.css";
import { authApi, endpoints } from "../configs/Apis";
import printer from "../assests/images/printer.png"
import { Form } from "react-bootstrap";
import schedule from "../assests/images/schedule.png"

const Appointment = () => {
    const [current_user, dispatch] = useContext(MyUserContext);
    const nav = useNavigate();
    const [booking, setBooking] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState('');

    const logout = () => {
        dispatch({
            "type": "logout"
        })
        nav("/");
    }

    const loadUserBooking = async () => {
        try {
            let res = await authApi().post(endpoints['booking-user-view'], {
                "userId": current_user.userId
            })
            setBooking(res.data);
            console.log(res.data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        loadUserBooking();
    }, [current_user.userId])

    // const viewBookingDetail = (evt, b) => {
    //     evt.preventDefault();

    //     const process = async () => {
    //         try {
    //             let res = await authApi().post(endpoints['booking-user-view'], {
    //                 "userId": current_user.userId
    //             })
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     process();
    // }

    return <>
        <div class="Appointment_Wrapper">
            <div class="Appointment">
                <div class="Appointment_Left">
                    <div class="Appointment_Left_Content">
                        <ul>
                            <li><a href="/personalpage">Thông tin cá nhân</a></li>
                            <li><a href="/changepassword">Đổi mật khẩu</a></li>
                            <li><a href="/appointment">Lịch khám</a></li>
                            <li><a href="/medicalrecord">Lịch sử khám</a></li>
                            <li><a href="/profile">Hồ sơ</a></li>
                            <li onClick={logout}>Đăng xuất</li>
                        </ul>
                    </div>
                </div>
                <div class="Appointment_Middle">
                    <div class="Appoitment_Middle_Header">
                        <h3>Lịch khám</h3>
                    </div>
                    <div class="Appointment_Middle_Content">
                        <div class="Appointment_Middle_Container">
                            <div class="Appointment_Middle_Info">
                                <input type="text" placeholder="Tên bệnh nhân, tên bác sĩ,..."></input>
                                <div class="Appointment_List">
                                    {booking.length === 0 ? <>
                                        <div class="Appointment_List_404">
                                            <img src={printer} alt="404" width={'20%'} />
                                            <span>Không tìm thấy kết quả</span>
                                        </div>
                                    </> : <>
                                        <div class="Appointment_List_Info">
                                            <ul>
                                                {Object.values(booking).map(b => {
                                                    const isCancelled = b[7] === true;
                                                    const created_date = new Date(b[6]);

                                                    const formattedDate = created_date.toLocaleDateString(); // Định dạng ngày
                                                    const formattedTime = created_date.toLocaleTimeString(); // Định dạng giờ
                                                    return <>
                                                        <div class="Appointment_List_Detail" value={selectedBooking}>
                                                            <li key={b[0]} style={{ fontWeight: 'bold', fontSize: '1.25rem' }} value={b[0]}>{b[4]}</li>
                                                            <li >{formattedTime} - {formattedDate}</li>
                                                            <li >{b[2]}</li>
                                                            <li style={{ color: isCancelled ? 'red' : 'green', fontSize: '0.8rem' }}>
                                                                {isCancelled ? 'Đã hủy' : 'Đã đặt lịch'}
                                                            </li>
                                                        </div>
                                                    </>
                                                })}
                                            </ul>
                                        </div>
                                    </>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="Appointment_Right">
                    <section>
                        <div class="Profile_Right_Content">
                            {booking === null ? <>
                                <div class="Profile_Null">
                                    <h5 className="mb-4">Chọn hồ sơ cần xem</h5>
                                    <img src={schedule} alt="Not found" width={'20%'} />
                                </div>
                            </> :
                                <>
                                    <div class="Profile_Name">
                                        <Form.Label style={{ width: "30%" }}>Họ và tên</Form.Label>
                                        <Form.Control type="text" disabled />
                                    </div>
                                    <div class="Profile_Phonenumber">
                                        <Form.Label style={{ width: "30%" }}>Số điện thoại</Form.Label>
                                        <Form.Control type="text" disabled />
                                    </div>
                                    <div class="Profile_Email">
                                        <Form.Label style={{ width: "30%" }}>Email</Form.Label>
                                        <Form.Control type="email" disabled />
                                    </div>
                                    <div class="Profile_Address">
                                        <Form.Label style={{ width: "30%" }}>Địa chỉ</Form.Label>
                                        <Form.Control type="Text" disabled />
                                    </div>
                                    <div class="Profile_Gender">
                                        <Form.Label style={{ width: "30%" }}>Giới tính</Form.Label>
                                        <Form.Control type="Text" disabled />
                                    </div>
                                    <div class="Profile_Relationship">
                                        <Form.Label style={{ width: "30%" }}>Quan hệ</Form.Label>
                                        <Form.Control type="Text" disabled />
                                    </div>
                                    <div class="Profile_Birthday">
                                        <Form.Label style={{ width: "30%" }}>Ngày sinh</Form.Label>

                                    </div>
                                    <div class="Change_Button">
                                        <button type="button">Hủy Lịch</button>
                                    </div>
                                </>}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </>
}

export default Appointment;