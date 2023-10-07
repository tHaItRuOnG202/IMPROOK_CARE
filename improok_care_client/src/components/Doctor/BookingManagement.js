import { useContext, useEffect, useState } from "react";
import { MyUserContext } from "../../App";
import { useNavigate } from "react-router-dom";
import "../../styles/BookingManagement.css";
import Apis, { authApi, endpoints } from "../../configs/Apis";
import { Badge, Button, Form, Table } from "react-bootstrap";
import { toast } from "react-toastify";

const BookingManagement = () => {
    const [current_user, dispatch] = useContext(MyUserContext);
    const [profileDoctorByUserId, setProfileDoctorByUserId] = useState([]);
    const [selectedProfileDoctorId, setSeletedProfileDoctorId] = useState();
    const [bookingList, setBookingList] = useState([]);
    const [minDate, setMinDate] = useState('');
    const nav = useNavigate();
    const [selectedOption, setSelectedOption] = useState('new');
    const [bookingListCheck, setBookingListCheck] = useState("");
    // const [selectedBookingId, setSelectedBookingId] = useState('');

    const logout = () => {
        dispatch({
            "type": "logout"
        })
        nav("/")
    }

    useEffect(() => {
        const loadProfileDoctorByUserId = async () => {
            try {
                let res = await Apis.get(endpoints['load-profile-doctor-by-userId'](current_user.userId));
                setProfileDoctorByUserId(res.data);
                console.log(res.data.length)
                if (res.data === 0) {
                    toast.info("Vui lòng tạo hồ sơ!");
                    nav('/profiledoctor');
                }
                if (res.data[0] !== undefined) {
                    setSeletedProfileDoctorId(res.data[0].profileDoctorId)
                }
                console.log(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        loadProfileDoctorByUserId();
    }, [])

    const profileDoctorChange = (e) => {
        setSeletedProfileDoctorId(e.target.value);
    }

    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];
        setMinDate(today);
    }, []);

    const loadWaitingBooking = async () => {
        try {
            console.log(selectedProfileDoctorId);
            let res = await authApi().post(endpoints['booking-doctor-view'], {
                "profiledoctorId": selectedProfileDoctorId
            })
            setBookingList(res.data);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadWaitingBooking();
    }, [selectedProfileDoctorId])

    // useEffect(() => {
    //     loadWaitingBooking();
    // }, [bookingList])

    // const loadWaitingBooking = async () => {
    //     try {
    //         console.log(selectedProfileDoctorId);
    //         let res = await authApi().post(endpoints['booking-doctor-view'], {
    //             "profiledoctorId": selectedProfileDoctorId
    //         });
    //         setBookingList(res.data);
    //         console.log(res.data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // useEffect(() => {
    //     loadWaitingBooking();
    // }, [selectedProfileDoctorId]);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    const acceptBooking = (evt, bookingId) => {
        evt.preventDefault();

        const process = async () => {
            try {
                const requestBody = bookingId.toString()
                let res = await authApi().post(endpoints['accept-booking'], requestBody, {
                    headers: {
                        'Content-Type': 'text/plain'
                    }
                })
                if (res.data === "Xác nhận thành công lịch đặt khám!") {
                    toast.success(res.data);
                    loadWaitingBooking();
                    let mes = await Apis.post(endpoints['send-custom-email'], {
                        "mailTo": "2051050549tuan@ou.edu.vn",
                        "mailSubject": "Hello quý khách đã tin tưởng dịch vụ bên em",
                        "mailContent": "Giờ không thích khám nè làm gì nhau"
                    })
                    console.log(mes.data);
                }
                else {
                    toast.error(res.data);
                }
                console.log(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        process();
    }

    const denyBooking = (evt, bookingId) => {
        evt.preventDefault();

        const process = async () => {
            try {
                const requestBody = bookingId.toString()
                let res = await authApi().post(endpoints['deny-booking'], requestBody, {
                    headers: {
                        'Content-Type': 'text/plain'
                    }
                })
                if (res.data === "Từ chối thành công lịch đặt khám!") {
                    toast.success(res.data);
                    let mes = await Apis.post(endpoints['send-custom-email'], {
                        "mailTo": "2051050549tuan@ou.edu.vn",
                        "mailSubject": "Hello quý khách đã tin tưởng dịch vụ bên em",
                        "mailContent": "Chào em, em đã bị cho vào danh sách đen của bên công ty anh"
                    })
                    console.log(mes.data);
                }
                else {
                    toast.error(res.data);
                }
                console.log(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        process();
    }

    // const cancelBooking = (evt, bookingId) => {
    //     evt.preventDefault();

    //     const process = async () => {
    //         try {
    //             const requestBody = bookingId.toString()
    //             let res = await authApi().post(endpoints['cancel-booking'], requestBody, {
    //                 headers: {
    //                     'Content-Type': 'text/plain'
    //                 }
    //             })
    //             if (res.data === "Hủy thành công lịch đặt khám!") {
    //                 toast.success(res.data);
    //                 let mes = await Apis.post(endpoints['send-custom-email'], {
    //                     "mailTo": "2051050549tuan@ou.edu.vn",
    //                     "mailSubject": "Hello quý khách đã tin tưởng dịch vụ bên em",
    //                     "mailContent": "Điểm em quá thấp mời em đến nhập học ĐH Family"
    //                 })
    //                 console.log(mes.data);
    //             }
    //             else {
    //                 toast.error(res.data);
    //             }
    //             console.log(res.data);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     process();
    // }

    const renderContent = () => {
        switch (selectedOption) {
            case "new":
                return <>
                    <div>
                        <div>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Tên bệnh nhân</th>
                                        <th>Ngày</th>
                                        <th>Khung giờ</th>
                                        <th>Tình trạng</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.values(bookingList).map((bl, index) => {
                                        const timeBegin = new Date(bl[3]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                                        const timeEnd = new Date(bl[4]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                                        if (bl[5] === "Chờ xác nhận") {
                                            return <>
                                                <tr key={index}>
                                                    <td>{bl[0]}</td>
                                                    <td>{bl[6]}</td>
                                                    <td>{bl[2]}</td>
                                                    <td>{timeBegin} - {timeEnd}</td>
                                                    <td>{bl[5]}</td>
                                                    <td>
                                                        <Button style={{ marginRight: '.5rem' }} variant="success" onClick={(evt) => acceptBooking(evt, bl[0])}>Xác nhận</Button>
                                                        <Button variant="danger" onClick={(evt) => denyBooking(evt, bl[0])}>Từ chối</Button>
                                                    </td>
                                                </tr>
                                            </>
                                        }
                                    })}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </>
            case "confirmed":
                return <>
                    <div>
                        <div>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Tên bệnh nhân</th>
                                        <th>Ngày</th>
                                        <th>Khung giờ</th>
                                        <th>Tình trạng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.values(bookingList).map((bl, index) => {
                                        const timeBegin = new Date(bl[3]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                                        const timeEnd = new Date(bl[4]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                                        if (bl[5] === "Đã xác nhận") {
                                            return <>
                                                <tr key={index}>
                                                    <td>{bl[0]}</td>
                                                    <td>{bl[6]}</td>
                                                    <td>{bl[2]}</td>
                                                    <td>{timeBegin} - {timeEnd}</td>
                                                    <td><Badge bg="success">{bl[5]}</Badge></td>
                                                </tr>
                                            </>
                                        }
                                    })}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </>
            case "rejected":
                return <>
                    <div>
                        <div>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Tên bệnh nhân</th>
                                        <th>Ngày</th>
                                        <th>Tình trạng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.values(bookingList).map((bl, index) => {
                                        const timeBegin = new Date(bl[3]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                                        const timeEnd = new Date(bl[4]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                                        if (bl[5] === "Từ chối") {
                                            return <>
                                                <tr key={index}>
                                                    <td>{bl[0]}</td>
                                                    <td>{bl[6]}</td>
                                                    <td>{bl[2]}</td>
                                                    <td>{timeBegin} - {timeEnd}</td>
                                                    <td><Badge bg="danger">Đã {bl[5]}</Badge></td>
                                                </tr>
                                            </>
                                        }
                                    })}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </>
            case "cancelled":
                return <>
                    <div>Nội dung cho Đã hủy</div>
                </>
            default:
                return null;
        }
    };

    return <>
        <div class="BookingManagement_Wrapper">
            <div class="BookingManagement">
                <div class="BookingManagement_Left">
                    <div class="BookingManagement_Left_Content">
                        <ul>
                            <li><a href="/doctor">Thông tin cá nhân</a></li>
                            <li><a href="/changepassword">Đổi mật khẩu</a></li>
                            <li><a href="/schedule">Đăng ký lịch khám</a></li>
                            <li><a href="/bookingmanagement">Lịch hẹn</a></li>
                            <li><a href="/profiledoctor">Hồ sơ</a></li>
                            <li><a href="/">Tạo đơn thuốc</a></li>
                            <li onClick={logout}>Đăng xuất</li>
                        </ul>
                    </div>
                </div>
                <div class="BookingManagement_Right">
                    <div class="BookingManagement_Right_Header">
                        <h2 className="text-center mb-3 text-info">QUẢN LÝ LỊCH HẸN</h2>
                    </div>
                    <div class="BookingManagement_Right_Body_1">
                        {/* <div class="BookingManagement_Date_Option">
                            <Form.Label style={{ width: "30%" }}>Chọn ngày</Form.Label>
                            <input type="date" style={{ width: "60%" }} defaultValue={minDate} min={minDate} id="dateInput" />
                        </div> */}
                        <div class="BookingManagement_Profile_Option">
                            <Form.Label style={{ width: "30%" }}>Chọn hồ sơ</Form.Label>
                            <select style={{ width: "60%" }} class="value" defaultValue={selectedProfileDoctorId} onChange={(e) => profileDoctorChange(e)} onFocus={(e) => profileDoctorChange(e)}>
                                {Object.values(profileDoctorByUserId).map(pd => <option key={pd.profileDoctorId} value={pd.profileDoctorId}>{pd.name}</option>)}
                            </select>
                        </div>
                    </div>
                    <div class="BookingManagement_Right_Body_2">
                        <div class="List_Action">
                            <ul>
                                <li className={selectedOption === "new" ? "active" : ""}
                                    onClick={() => handleOptionClick("new")}>Bệnh nhân mới</li>
                                <li className={selectedOption === "confirmed" ? "active" : ""}
                                    onClick={() => handleOptionClick("confirmed")}>Đã xác nhận</li>
                                <li className={selectedOption === "rejected" ? "active" : ""}
                                    onClick={() => handleOptionClick("rejected")}>Đã từ chối</li>
                                <li className={selectedOption === "cancelled" ? "active" : ""}
                                    onClick={() => handleOptionClick("cancelled")}>Đã hủy</li>
                            </ul>
                        </div>
                        <div>
                            {renderContent()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default BookingManagement;