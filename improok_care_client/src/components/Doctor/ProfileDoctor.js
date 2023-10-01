import { useContext, useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { MyUserContext } from "../../App";
import "../../styles/ProfileDoctor.css";
import { Form, Image } from "react-bootstrap";
import Apis, { authApi, endpoints } from "../../configs/Apis";
import cookie from "react-cookies";
import { toast } from "react-toastify";
import doctorprofile from "../../assests/images/doctor-profile-icon.png"

const ProfileDoctor = () => {
    const [current_user, dispatch] = useContext(MyUserContext);
    const nav = useNavigate();
    const [loading, setLoading] = useState(true)

    const [name, setName] = useState();
    const [phonenumber, setPhonenumber] = useState();
    const [bookingPrice, setBookingPrice] = useState();
    const [workPlace, setWorkPlace] = useState();
    const [email, setEmail] = useState();
    const [specialty, setSpecialty] = useState([]);
    const [position, setPosition] = useState();

    const [province, setProvince] = useState();
    const [district, setDistrict] = useState();
    const [ward, setWard] = useState();
    const [provincename, setProvinceName] = useState();
    const [districtname, setDistrictName] = useState();
    const [wardname, setWardName] = useState();
    const [selectedProvinceCode, setSelectedProvinceCode] = useState('01');
    const [selectedDistrictCode, setSelectedDistrictCode] = useState('001');
    const [selectedWardCode, setSelectedWardCode] = useState('00001');
    const [selectedSpecialty, setSelectedSpecialty] = useState('1');

    const [addProfileInfo, setAddProfileInfo] = useState(false)
    const [profile, setProfile] = useState([]);
    const [checkProfileInfo, setCheckProfileInfo] = useState(true)


    // const formattedDate = new Date(current_user.birthday).toISOString().substring(0, 10);
    // console.log(typeof (current_birthday))
    // console.log(typeof (current_user.birthday))
    // const formattedDate = current_user.birthDate.toISOString();
    // const formattedDate = new Date(current_birthday).toISOString();

    const logout = () => {
        dispatch({
            "type": "logout"
        })
        nav("/")
    }

    useEffect(() => {
        const loadProvince = async () => {
            try {
                let res = await Apis.get(endpoints['provinces'])
                setProvince(res.data);
            } catch (error) {
                console.log(error);
            }
        }

        const loadDistrict = async () => {
            try {
                let res = await Apis.get(endpoints['districts'](selectedProvinceCode))
                setDistrict(res.data);
            } catch (error) {
                console.log(error);
            }
        }

        const loadWard = async () => {
            try {
                let res = await Apis.get(endpoints['wards'](selectedDistrictCode))
                setWard(res.data);
            } catch (error) {
                console.log(error)
            }
        }

        loadProvince();
        // if (selectedProvinceCode)
        loadDistrict();
        // if (selectedDistrictCode)
        loadWard()
    }, [selectedProvinceCode, selectedDistrictCode])

    useEffect(() => {
        const loadSpecialty = async () => {
            try {
                let res = await Apis.get(endpoints['specialty']);
                setSpecialty(res.data);
                console.log(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        loadSpecialty();
    }, [])

    const updateClick = () => {
        setCheckProfileInfo(!checkProfileInfo);
    }

    const addNewProfile = (evt) => {
        evt.preventDefault();

        const process = async () => {
            try {
                setLoading(true);

                let res = await authApi().post(endpoints['add-profile-doctor'], {
                    "name": name,
                    "phonenumber": phonenumber,
                    "bookingPrice": bookingPrice,
                    "email": email,
                    "provinceName": provincename,
                    "districtName": districtname,
                    "wardName": wardname,
                    "workPlace": workPlace,
                    "position": position,
                    "userId": current_user.userId,
                    "specialtyId": selectedSpecialty
                });
                console.log(res.data);
                toast.success(res.data)
                setLoading(false);
                setAddProfileInfo(false);

            } catch (error) {
                console.log(error);
                toast.error("Có lỗi xảy ra!")
            }
        }

        process();
    }

    const addProfileClick = () => {
        setAddProfileInfo(true);
    }

    const exitAddProfileClick = () => {
        setAddProfileInfo(false);
    }

    const focusProvince = (e) => {
        setSelectedProvinceCode(e.target.value);
    }

    const handleProvinceChange = (e) => {
        const selectedProvinceCode = e.target.value;
        const selectedProvince = province.find(pr => pr.code === selectedProvinceCode);

        setSelectedProvinceCode(selectedProvinceCode);
        setProvinceName(selectedProvince.fullName);

    };

    const focusDistrict = (e) => {
        setSelectedDistrictCode(e.target.value);
    }

    const handleDistrictChange = (e) => {
        const selectedDistrictCode = e.target.value;
        const selectedDistrict = district.find(dis => dis.code === selectedDistrictCode);

        setSelectedDistrictCode(selectedDistrictCode);
        setDistrictName(selectedDistrict.fullName);
    }

    const focusWard = (e) => {
        setSelectedWardCode(e.target.value);
    }

    const handleWardChange = (e) => {
        const selectedWardCode = e.target.value;
        const selectedWard = ward.find(wa => wa.code === selectedWardCode);

        setSelectedWardCode(selectedWardCode);
        setWardName(selectedWard.fullName);
    }

    const focusSpecialty = (e) => {
        setSelectedSpecialty(e.target.value);
    }

    const handleSpecialtyChange = (e) => {
        const selectedSpecialtyId = e.target.value;

        setSelectedSpecialty(selectedSpecialtyId);
    }


    if (current_user === null)
        <Navigate to="/" />

    return <>
        <div class="Profile_Doctor_Wrapper">
            <div class="Profile">
                <div class="Profile_Doctor_Left">
                    <div class="Profile_Doctor_Left_Content">
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
                <div class="Profile_Doctor_Middle">
                    <div class="Profile_Doctor_Middle_Header">
                        <h3>Hồ sơ</h3>
                    </div>
                    <div class="Profile_Doctor_Middle_Content">
                        <div class="Profile_Doctor_Middle_Container">
                            <div class="Profile_Doctor_Middle_Info">
                                <input type="text" placeholder="Nhập tên hồ sơ cần tìm..."></input>
                                <div class="Profile_List">

                                </div>
                            </div>
                            <button onClick={addProfileClick}>Thêm hồ sơ</button>
                        </div>
                    </div>
                </div>
                <div class="Profile_Doctor_Right">
                    {addProfileInfo === false ?
                        <>
                            {checkProfileInfo === true ?
                                <>
                                    <section>
                                        <div class="Profile_Doctor_Right_Header"><h3 className="text-center text-success">Thông tin cá nhân của bác sĩ {current_user.firstname}</h3></div>
                                        <div class="Profile_Doctor_Right_Content">
                                            <div class="Profile_Doctor_Name">
                                                <Form.Label style={{ width: "30%" }}>Tên</Form.Label>
                                                <Form.Control value={current_user.lastname} type="text" disabled />
                                            </div>
                                            <div class="Profile_Doctor_Phonenumber">
                                                <Form.Label style={{ width: "30%" }}>Số điện thoại</Form.Label>
                                                <Form.Control value={current_user.firstname} type="text" disabled />
                                            </div>
                                            <div class="Profile_Doctor_Price">
                                                <Form.Label style={{ width: "30%" }}>Giá khám</Form.Label>
                                                <Form.Control value={current_user.email} type="text" disabled />
                                            </div>
                                            <div class="Profile_Doctor_Email">
                                                <Form.Label style={{ width: "30%" }}>Email</Form.Label>
                                                <Form.Control value={current_user.gender === true ? "Nam" : "Nữ"} type="email" disabled />
                                            </div>
                                            <div class="Profile_Doctor_Address">
                                                <Form.Label style={{ width: "30%" }}>Địa chỉ công tác</Form.Label>
                                                <Form.Control value={current_user.gender === true ? "Nam" : "Nữ"} type="text" disabled />
                                            </div>
                                            <div class="Profile_Doctor_Specialty">
                                                <Form.Label style={{ width: "30%" }}>Chuyên khoa</Form.Label>
                                                <Form.Control value={current_user.gender} type="text" disabled />
                                            </div>
                                            <div class="Profile_Doctor_Position">
                                                <Form.Label style={{ width: "30%" }}>Vị trí</Form.Label>
                                                <Form.Control value={current_user.gender === true ? "Nam" : "Nữ"} type="text" disabled />
                                            </div>
                                            <div class="Change_Button">
                                                <button type="button">Xóa</button>
                                                <button type="button" onClick={updateClick}>Thay đổi thông tin</button>
                                            </div>
                                        </div>
                                    </section>
                                </> : <>
                                    <section>
                                        <div class="Profile_Doctor_Right_Header"><h3 className="text-center text-success">Thay đổi thông tin</h3></div>
                                        <div class="Profile_Doctor_Right_Content">
                                            <div class="Profile_Doctor_Name">
                                                <Form.Label style={{ width: "30%" }}>Tên</Form.Label>
                                                <Form.Control defaultValue={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Họ và tên" required />
                                            </div>
                                            <div class="Profile_Doctor_Phonenumber">
                                                <Form.Label style={{ width: "30%" }}>Số điện thoại</Form.Label>
                                                <Form.Control defaultValue={phonenumber} onChange={(e) => setPhonenumber(e.target.value)} type="text" placeholder="Số điện thoại" required />
                                            </div>
                                            <div class="Profile_Doctor_Price">
                                                <Form.Label style={{ width: "30%" }}>Giá khám</Form.Label>
                                                <Form.Control defaultValue={bookingPrice} type="text" onChange={(e) => setBookingPrice(e.target.value)} placeholder="Giá khám" required />
                                            </div>
                                            <div class="Profile_Doctor_Email">
                                                <Form.Label style={{ width: "30%" }}>Email</Form.Label>
                                                <Form.Control defaultValue={email} type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                                            </div>
                                            <div class="Profile_Doctor_Address">
                                                <div>
                                                    <Form.Label style={{ width: "30%" }}>Tỉnh/TP</Form.Label>
                                                    <Form.Select defaultValue={selectedProvinceCode} onChange={(e) => handleProvinceChange(e)} onFocus={(e) => focusProvince(e)}>
                                                        {Object.values(province).map(pr => <option key={pr.code} value={pr.code}>{pr.name}</option>)}
                                                    </Form.Select>
                                                </div>
                                                <div>
                                                    <Form.Label style={{ width: "30%" }}>Quận/Huyện</Form.Label>
                                                    <Form.Select defaultValue={selectedDistrictCode} onChange={(e) => handleDistrictChange(e)} onFocus={(e) => focusDistrict(e)}>
                                                        {Object.values(district).map(dis => <option key={dis.code} value={dis.code}>{dis.fullName}</option>)}
                                                    </Form.Select>
                                                </div>
                                                <div>
                                                    <Form.Label style={{ width: "30%" }}>Phường/Xã</Form.Label>
                                                    <Form.Select defaultValue={selectedWardCode} onChange={(e) => handleWardChange(e)} onFocus={(e) => focusWard(e)}>
                                                        {Object.values(ward).map(wa => <option key={wa.code} value={wa.code}>{wa.fullName}</option>)}
                                                    </Form.Select>
                                                </div>
                                            </div>
                                            <div class="Profile_Doctor_Work_Place">
                                                <Form.Label style={{ width: "30%" }}>Địa chỉ làm việc</Form.Label>
                                                <Form.Control type="text" defaultValue={workPlace} placeholder="Địa chỉ làm việc" required onChange={(e) => setWorkPlace(e.target.value)} />
                                            </div>
                                            <div class="Profile_Doctor_Specialty">
                                                <Form.Label style={{ width: "30%" }}>Chuyên khoa</Form.Label>
                                                <Form.Select defaultValue={selectedSpecialty} onChange={(e) => handleSpecialtyChange(e)} onFocus={(e) => focusSpecialty(e)}>
                                                    {Object.values(specialty).map(s => <option key={s.specialtyId} value={s.specialtyId}>{s.specialtyName}</option>)}
                                                </Form.Select>
                                            </div>
                                            <div class="Profile_Doctor_Position">
                                                <Form.Label style={{ width: "30%" }}>Vị trí</Form.Label>
                                                <Form.Control defaultValue={position} type="text" onChange={(e) => setPosition(e.target.value)} placeholder="Vị trí công việc" required />
                                            </div>
                                            <div class="Update_Button">
                                                <button type="button" onClick={updateClick}>Hủy</button>
                                                <button type="button">Cập nhật thông tin</button>
                                            </div>
                                        </div>
                                    </section>
                                </>}
                        </> : <>
                            <section>
                                <div class="Profile_Doctor_Right_Header"><h3 className="text-left text-success mb-4">Thêm hồ sơ mới</h3></div>
                                <div class="Profile_Doctor_Right_Content">
                                    <div class="Profile_Doctor_Name">
                                        <Form.Label style={{ width: "30%" }}>Tên</Form.Label>
                                        <Form.Control defaultValue={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Họ và tên" required />
                                    </div>
                                    <div class="Profile_Doctor_Phonenumber">
                                        <Form.Label style={{ width: "30%" }}>Số điện thoại</Form.Label>
                                        <Form.Control defaultValue={phonenumber} onChange={(e) => setPhonenumber(e.target.value)} type="text" placeholder="Số điện thoại" required />
                                    </div>
                                    <div class="Profile_Doctor_Price">
                                        <Form.Label style={{ width: "30%" }}>Giá khám</Form.Label>
                                        <Form.Control defaultValue={bookingPrice} type="text" onChange={(e) => setBookingPrice(e.target.value)} placeholder="Giá khám" required />
                                    </div>
                                    <div class="Profile_Doctor_Email">
                                        <Form.Label style={{ width: "30%" }}>Email</Form.Label>
                                        <Form.Control defaultValue={email} type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                                    </div>
                                    <div class="Profile_Doctor_Address">
                                        <div>
                                            <Form.Label style={{ width: "30%" }}>Tỉnh/TP</Form.Label>
                                            <Form.Select defaultValue={selectedProvinceCode} onChange={(e) => handleProvinceChange(e)} onFocus={(e) => focusProvince(e)}>
                                                {Object.values(province).map(pr => <option key={pr.code} value={pr.code}>{pr.name}</option>)}
                                            </Form.Select>
                                        </div>
                                        <div>
                                            <Form.Label style={{ width: "30%" }}>Quận/Huyện</Form.Label>
                                            <Form.Select defaultValue={selectedDistrictCode} onChange={(e) => handleDistrictChange(e)} onFocus={(e) => focusDistrict(e)}>
                                                {Object.values(district).map(dis => <option key={dis.code} value={dis.code}>{dis.fullName}</option>)}
                                            </Form.Select>
                                        </div>
                                        <div>
                                            <Form.Label style={{ width: "30%" }}>Phường/Xã</Form.Label>
                                            <Form.Select defaultValue={selectedWardCode} onChange={(e) => handleWardChange(e)} onFocus={(e) => focusWard(e)}>
                                                {Object.values(ward).map(wa => <option key={wa.code} value={wa.code}>{wa.fullName}</option>)}
                                            </Form.Select>
                                        </div>
                                    </div>
                                    <div class="Profile_Doctor_Work_Place">
                                        <Form.Label style={{ width: "30%" }}>Địa chỉ làm việc</Form.Label>
                                        <Form.Control type="text" defaultValue={workPlace} placeholder="Địa chỉ làm việc" required onChange={(e) => setWorkPlace(e.target.value)} />
                                    </div>
                                    <div class="Profile_Doctor_Specialty">
                                        <Form.Label style={{ width: "30%" }}>Chuyên khoa</Form.Label>
                                        <Form.Select defaultValue={selectedSpecialty} onChange={(e) => handleSpecialtyChange(e)} onFocus={(e) => focusSpecialty(e)}>
                                            {Object.values(specialty).map(s => <option key={s.specialtyId} value={s.specialtyId}>{s.specialtyName}</option>)}
                                        </Form.Select>
                                    </div>
                                    <div class="Profile_Doctor_Position">
                                        <Form.Label style={{ width: "30%" }}>Vị trí</Form.Label>
                                        <Form.Control defaultValue={position} type="text" onChange={(e) => setPosition(e.target.value)} placeholder="Vị trí công việc" required />
                                    </div>
                                    <div class="Update_Button">
                                        <button type="button" onClick={exitAddProfileClick}>Thoát</button>
                                        <button type="button" onClick={addNewProfile}>Thêm hồ sơ mới</button>
                                    </div>
                                </div>
                            </section>
                        </>}
                </div>
            </div>
        </div >
    </>
}

export default ProfileDoctor;