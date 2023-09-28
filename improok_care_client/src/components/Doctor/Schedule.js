import { useContext, useEffect, useState } from "react";
import "../../styles/Schedule.css";
import { MyUserContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import Apis, { authApi, endpoints } from "../../configs/Apis";
import { toast } from "react-toastify";

const Schedule = () => {
    const [current_user, dispatch] = useContext(MyUserContext);
    const nav = useNavigate();
    const [minDate, setMinDate] = useState('');
    const [timeDistance, setTimeDistance] = useState([]);
    const [timeSlot, setTimeSlot] = useState([]);
    const [selectedTimeDistanceId, setSelectedTimeDistanceId] = useState('1');
    const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
    const [timeSlotCheck, setTimeSlotCheck] = useState([]);
    const [loading, setLoading] = useState(true)

    const logout = () => {
        dispatch({
            "type": "logout"
        })
        nav("/")
    }

    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];
        setMinDate(today);
    }, []);

    useEffect(() => {
        const loadTimeDistance = async () => {
            try {
                let res = await Apis.get(endpoints['time-distance']);
                setTimeDistance(res.data);
                console.log(res.data);
            } catch (error) {
                console.log(error);
            }
        }

        const loadTimeSlot = async () => {
            try {
                let res = await Apis.get(endpoints['time-slot'](selectedTimeDistanceId));
                setTimeSlot(res.data);
                console.log(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        loadTimeDistance();
        loadTimeSlot();
    }, [selectedTimeDistanceId])

    const timeDistanceChange = (e) => {
        setSelectedTimeDistanceId(e.target.value);
        setSelectedTimeSlots([]);
    }

    const timeSlotClickCheck = (timeSlotId) => {
        const isSelected = selectedTimeSlots.includes(timeSlotId);

        if (isSelected) {
            setSelectedTimeSlots(selectedTimeSlots.filter(id => id !== timeSlotId));
        } else {
            setSelectedTimeSlots([...selectedTimeSlots, timeSlotId]);
        }
    }

    const addSchedule = (evt) => {
        evt.preventDefault();

        const process = async () => {
            try {
                setLoading(true);
                const dateInput = document.getElementById('dateInput');
                const selectedDate = dateInput.value; // Lấy giá trị ngày từ trường input

                const formattedDate = new Date(selectedDate).toISOString().split('T')[0]; // Định dạng lại ngày thành "yyyy-MM-dd"

                if (selectedTimeSlots.length === 0) {
                    toast.warning("Vui lòng chọn ít nhất một khung giờ trước khi lưu.");
                    setLoading(false);
                    return;
                }

                for (let i = 0; i < selectedTimeSlots.length; i++) {
                    const timeSlotId = selectedTimeSlots[i];

                    let res = await authApi().post(endpoints['add-schedule'], {
                        "profileDoctorId": current_user.userId,
                        "date": formattedDate,
                        "timeSlotId": timeSlotId
                    });
                    console.log(res.data);
                }
                toast.success("Tạo lịch khám thành công!")
                setLoading(false);

            } catch (error) {
                console.log(error);
                toast.error("Có lỗi xảy ra!")
            }
        }

        process();
    }

    console.log(selectedTimeSlots);

    return <>
        <div class="Schedule_Wrapper">
            <div class="Schedule">
                <div class="Schedule_Left">
                    <div class="Schedule_Left_Content">
                        <ul>
                            <li><a href="/doctor">Thông tin cá nhân</a></li>
                            <li><a href="/test">Đổi mật khẩu</a></li>
                            <li><a href="/schedule">Đăng ký lịch khám</a></li>
                            <li><a href="/">Lịch hẹn</a></li>
                            <li><a href="/profiledoctor">Hồ sơ</a></li>
                            <li><a href="/">Tạo đơn thuốc</a></li>
                            <li onClick={logout}>Đăng xuất</li>
                        </ul>
                    </div>
                </div>
                <div class="Schedule_Right">
                    <div class="Schedule_Right_Content">
                        <h3 className="text-center text-primary">ĐĂNG KÝ LỊCH KHÁM BỆNH</h3>
                        <div class="Schedule_Option">
                            <div class="Schedule_Date_Option">
                                <Form.Label style={{ width: "22%" }}>Chọn ngày</Form.Label>
                                <input type="date" style={{ width: "60%" }} defaultValue={minDate} id="dateInput" min={minDate} />
                            </div>
                            <div class="Schedule_Distance_Option">
                                <Form.Label class="label" style={{ width: "40%" }}>Chọn giãn cách</Form.Label>
                                <select class="value" defaultValue={selectedTimeDistanceId} onChange={timeDistanceChange} onFocus={timeDistanceChange}>
                                    {Object.values(timeDistance).map(td => <option key={td.timeDistanceId} value={td.timeDistanceId}>{td.timeDistanceValue}</option>)}
                                </select>
                            </div>
                        </div>
                        <div class="Schedule_Timeslot">
                            <div class="TimeSlot_Option">
                                {Object.values(timeSlot).map(ts => {
                                    const timeBegin = new Date(ts.timeBegin).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                                    const timeEnd = new Date(ts.timeEnd).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                                    const isSelected = selectedTimeSlots.includes(ts.timeSlotId);
                                    return (
                                        <span key={ts.timeSlotId} value={ts.timeSlotId} style={{ marginRight: '10px', background: isSelected ? 'lightblue' : 'white' }}
                                            onClick={() => timeSlotClickCheck(ts.timeSlotId)}>
                                            {timeBegin} - {timeEnd}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div class="Create_Butt">
                        <button class="Create_Schedule_Butt" onClick={addSchedule}>Tạo lịch khám</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Schedule;