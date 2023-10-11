import { useContext } from "react";
import { useNavigate, Link, useParams, useSearchParams } from "react-router-dom";
import { MyUserContext } from "../../App";
import "../../styles/Prescription.css";
import { Form } from "react-bootstrap";
import { useLocation } from 'react-router-dom';

const Presciption = () => {
    const [current_user, dispatch] = useContext(MyUserContext);
    const nav = useNavigate();
    const location = useLocation();
    const paramA = location.state?.paramA;


    const currentDate = new Date();
    const currentFormattedDate = currentDate.toISOString().split('T')[0];

    const { selectedBookingId, selectedProfilePatientName } = useParams();

    const [q] = useSearchParams();

    // const paramA = q.get('bookingId');
    // const paramB = q.get('profilePatientName');


    const logout = () => {
        dispatch({
            "type": "logout"
        })
        nav("/")
    }
    return <>
        <div class="Prescription_Wrapper">
            <div class="Prescription">
                <div class="Prescription_Left">
                    <div class="Prescription_Left_Content">
                        <ul>
                            <li><Link to="/doctor">Thông tin cá nhân</Link></li>
                            <li><Link to="/changepassword">Đổi mật khẩu</Link></li>
                            <li><Link to="/schedule">Đăng ký lịch khám</Link></li>
                            <li><Link to="/bookingmanagement">Lịch hẹn</Link></li>
                            <li><Link to="/profiledoctor">Hồ sơ</Link></li>
                            <li><Link to="/prescription">Tạo đơn thuốc</Link></li>
                            <li onClick={logout}>Đăng xuất</li>
                        </ul>
                    </div>
                </div>
                <div class="Prescription_Right">
                    <div class="Prescription_Right_Header">
                        <h2 className="text-center mb-3 text-info">THÔNG TIN ĐƠN THUỐC</h2>
                    </div>
                    <div class="Prescription_Right_Body_1">
                        <div class="Patient_Name">
                            <Form.Label style={{ width: "30%" }}>Bệnh nhân</Form.Label>
                            <Form.Control type="text" value={paramA} disabled />
                        </div>
                        <div class="Doctor_Name">
                            <Form.Label style={{ width: "30%" }}>Bác sĩ</Form.Label>
                            <Form.Control type="text" disabled />
                        </div>
                        <div class="Create_Date">
                            <Form.Label style={{ width: "30%" }}>Ngày lập</Form.Label>
                            <Form.Control type="date" value={currentFormattedDate} disabled />
                        </div>
                        <div class="Booking_Price">
                            <Form.Label style={{ width: "30%" }}>Phí khám</Form.Label>
                            <Form.Control type="Text" disabled />
                        </div>
                        <div class="Symptom">
                            <Form.Label style={{ width: "40%" }}>Triệu chứng</Form.Label>
                            <Form.Control type="Text" placeholder="Nhập triệu chứng..." />
                        </div>
                        <div class="Diagnosis">
                            <Form.Label style={{ width: "40%" }}>Chuẩn đoán</Form.Label>
                            <Form.Control type="Text" placeholder="Nhập chuẩn đoán..." />
                        </div>
                    </div>
                    <div class="Prescription_Right_Body_2">
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Presciption;