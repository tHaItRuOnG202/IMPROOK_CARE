import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MyUserContext } from "../../App";
import "../../styles/Prescription.css";
import { Form } from "react-bootstrap";

const Presciption = () => {
    const [current_user, dispatch] = useContext(MyUserContext);
    const nav = useNavigate();
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
                            <li><a href="/doctor">Thông tin cá nhân</a></li>
                            <li><a href="/changepassword">Đổi mật khẩu</a></li>
                            <li><a href="/schedule">Đăng ký lịch khám</a></li>
                            <li><a href="/bookingmanagement">Lịch hẹn</a></li>
                            <li><a href="/profiledoctor">Hồ sơ</a></li>
                            <li><a href="/prescription">Tạo đơn thuốc</a></li>
                            <li onClick={logout}>Đăng xuất</li>
                        </ul>
                    </div>
                </div>
                <div class="Prescription_Right">
                    <div class="Prescription_Right_Header">
                        <h2 className="text-center mb-3 text-info">TẠO ĐƠN THUỐC</h2>
                    </div>
                    <div class="Prescription_Right_Body_1">
                        <div class="Patient_Name">
                            <Form.Label style={{ width: "30%" }}>Bệnh nhân</Form.Label>
                            <Form.Control type="text" disabled />
                        </div>
                        <div class="Doctor_Name">
                            <Form.Label style={{ width: "30%" }}>Bác sĩ</Form.Label>
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
                    </div>
                    <div class="Prescription_Right_Body_2">

                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Presciption;