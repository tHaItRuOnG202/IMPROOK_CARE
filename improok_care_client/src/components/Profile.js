import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyUserContext } from "../App";
import "../styles/Profile.css";
import { Form, Image } from "react-bootstrap";
import Apis, { authApi, endpoints } from "../configs/Apis";
import cookie from "react-cookies";
import { toast } from "react-toastify";

const Profile = () => {
    const [current_user, dispatch] = useContext(MyUserContext);
    const [current_avatar, setCurrent_avatar] = useState(current_user.avatar);
    const [current_birthday, setCurrent_birthday] = useState(current_user.birthday)
    const [birthday, setBirthday] = useState(null)
    const [gender, setGender] = useState(null)
    const avatar = useRef();
    const nav = useNavigate();
    const [loading, setLoading] = useState(true)
    const [addProfile, setAddProfile] = useState({
        "name": "",
        "phonenumber": "",
        "provinceName": "",
        "districtName": "",
        "wardName": "",
        "persionalAddress": "",
        "email": "",
        "relationship": "",
        "userId": current_user.userId
    })
    const [province, setProvince] = useState([]);
    const [district, setDistrict] = useState([]);
    const [ward, setWard] = useState([]);
    const [selectedProvinceCode, setSelectedProvinceCode] = useState('01');
    const [selectedDistrictCode, setSelectedDistrictCode] = useState('001');

    const [addProfileInfo, setAddProfileInfo] = useState(false)
    const [profile, setProfile] = useState([]);
    const [checkProfileInfo, setCheckProfileInfo] = useState(true)


    const formattedDate = new Date(current_user.birthday).toISOString().substring(0, 10);
    console.log(typeof (current_birthday))
    console.log(typeof (current_user.birthday))
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

    const updateClick = () => {
        setCheckProfileInfo(!checkProfileInfo);
    }

    const addNewProfile = (evt) => {
        evt.preventDefault();

        const process = async () => {
            try {
                setLoading(true);
                let res = await authApi().post(endpoints['add-profile-patient'], {
                    "name": "",
                    "phonenumber": "",
                    "provinceName": "",
                    "districtName": "",
                    "wardName": "",
                    "persionalAddress": "",
                    "email": "",
                    "relationship": "",
                    "userId": current_user.userId
                });

            } catch (error) {
                console.log(error);
            }
        }
    }

    const updateUser = (evt) => {
        evt.preventDefault();

        const process = async () => {
            try {
                let form = new FormData();

                console.log(addProfile);

                for (let field in addProfile) {
                    if (field !== "avatar" || field !== "gender" || field !== "birthday")
                        form.append(field, addProfile[field]);
                }

                if (avatar.current.files[0] !== undefined) {
                    form.append("avatar", avatar.current.files[0]);
                } else {
                    form.append("avatar", new Blob());
                }

                form.delete("gender");
                if (gender === false) {
                    form.append("gender", false)
                } else {
                    form.append("gender", true)
                }

                form.delete("birthday");
                form.append("birthday", formattedDate);

                setLoading(true);

                try {
                    console.log(addProfile);
                    let { data } = await authApi().post(endpoints['update-user'], form, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    });

                    let update_User = await authApi().get(endpoints['current-user'])
                    cookie.save('user', update_User.data);

                    console.log(update_User.data);
                    dispatch({
                        "type": "login",
                        "payload": update_User.data
                    });

                    toast.success("Cập nhật thành công!")

                    setAddProfile(update_User.data);
                    setLoading(false);
                } catch (err) {
                    // if (err.request.responeText === "Cập nhật thành công!")
                    //     setErr("Cập nhật thành công");
                    // else if (err.request.responeText === "Số điện thoại đã được đăng ký!")
                    //     setErr("Số điện thoại đã được đăng ký!");
                    // else if (err.request.responeText === "Email đã được đăng ký!")
                    //     setErr("Email đã được đăng ký!");
                    // else
                    //     setErr("Có lỗi xảy ra!")
                    toast.error(err.request.responseText);
                    // console.log(err.request.status);
                    setLoading(false);
                }
                setAddProfileInfo(!addProfileInfo);
            } catch (ex) {
                console.log(ex)
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

    // const updateBirthDate = (birthday) => {
    //     setBirthday(formattedDate)
    // }

    const change = (evt, field) => {
        // setUser({...user, [field]: evt.target.value})
        setAddProfile(current => {
            return { ...current, [field]: evt.target.value }
        })
    }

    // const birthDateChange = (evt, field) => {
    //     setUser(current => {
    //         return { ...current, [field]: evt.target.value }
    //     }
    // };

    // console.log(current_user)

    return <>
        <div class="Profile_Wrapper">
            <div class="Profile">
                <div class="Profile_Left">
                    <div class="Profile_Left_Content">
                        <ul>
                            <li><a href="/Profilepage">Thông tin cá nhân</a></li>
                            <li><a href="/test">Đổi mật khẩu</a></li>
                            <li><a href="/booking">Lịch khám</a></li>
                            <li><a href="/medicalrecord">Lịch sử khám</a></li>
                            <li><a href="/profile">Hồ sơ</a></li>
                            <li onClick={logout}>Đăng xuất</li>
                        </ul>
                    </div>
                </div>
                <div class="Profile_Middle">
                    <div class="Profile_Middle_Header">
                        <h3>Hồ sơ</h3>
                    </div>
                    <div class="Profile_Middle_Content">
                        <div class="Profile_Middle_Container">
                            <div class="Profile_Middle_Info">
                                <input type="text" placeholder="Nhập tên hồ sơ cần tìm..."></input>
                                <div>

                                </div>
                            </div>
                            <button onClick={addProfileClick}>Thêm hồ sơ</button>
                        </div>
                    </div>
                </div>
                <div class="Profile_Right">
                    {addProfileInfo === false ?
                        <>
                            {checkProfileInfo === true ?
                                <>
                                    <section>
                                        <div class="Profile_Right_Header"><h3 className="text-center text-success">Thông tin cá nhân của {current_user.firstname}</h3></div>
                                        <div class="Profile_Right_Content">
                                            <div class="Profile_Name">
                                                <Form.Label style={{ width: "30%" }}>Họ và tên đệm</Form.Label>
                                                <Form.Control value={current_user.lastname} type="text" disabled />
                                            </div>
                                            <div class="Profile_FirstName">
                                                <Form.Label style={{ width: "30%" }}>Tên</Form.Label>
                                                <Form.Control value={current_user.firstname} type="text" disabled />
                                            </div>
                                            <div class="Profile_Email">
                                                <Form.Label style={{ width: "30%" }}>Email</Form.Label>
                                                <Form.Control value={current_user.email} type="email" disabled />
                                            </div>
                                            <div class="Profile_Gender">
                                                <Form.Label style={{ width: "30%" }}>Giới tính</Form.Label>
                                                <Form.Control value={current_user.gender === true ? "Nam" : "Nữ"} type="Text" disabled />
                                            </div>
                                            <div class="Profile_Birthday">
                                                <Form.Label style={{ width: "30%" }}>Ngày sinh</Form.Label>
                                                {current_user.birthday === null ? <>
                                                    <Form.Control value="Thiết lập ngày sinh" type="Text" disabled />
                                                </> : <>
                                                    <Form.Control value={current_user.birthday.substring(0, 10)} type="Text" disabled />
                                                </>}
                                            </div>
                                            <div class="Change_Button">
                                                <button type="button">Xóa</button>
                                                <button type="button" onClick={updateClick}>Thay đổi thông tin</button>
                                            </div>
                                        </div>
                                    </section>
                                </> : <>
                                    <section>
                                        <div class="Profile_Right_Header"><h3 className="text-center text-success">Thông tin cá nhân của {current_user.firstname}</h3></div>
                                        <div class="Profile_Right_Content">
                                            <div class="Profile_Name">
                                                <Form.Label style={{ width: "30%" }}>Họ và tên đệm</Form.Label>
                                                <Form.Control defaultValue={current_user.lastname} onChange={(e) => change(e, "lastname")} type="text" placeholder="Họ và tên đệm" required />
                                            </div>
                                            <div class="Profile_FirstName">
                                                <Form.Label style={{ width: "30%" }}>Tên</Form.Label>
                                                <Form.Control defaultValue={current_user.firstname} onChange={(e) => change(e, "firstname")} type="text" placeholder="Tên" required />
                                            </div>
                                            <div class="Profile_Email">
                                                <Form.Label style={{ width: "30%" }}>Email</Form.Label>
                                                <Form.Control defaultValue={current_user.email} type="email" placeholder="Email" required />
                                            </div>
                                            <div class="Profile_Gender">
                                                <Form.Label style={{ width: "22%" }}>Giới tính</Form.Label>
                                                <div class="Profile_Gender_Tick">
                                                    {current_user.gender === true ? <>
                                                        <Form.Check type="radio" label="Nam" name="radioOption" defaultChecked onChange={() => setGender(true)} />
                                                        <Form.Check type="radio" label="Nữ" name="radioOption" onChange={() => setGender(false)} />
                                                    </> : <>
                                                        <Form.Check type="radio" label="Nam" name="radioOption" onChange={() => setGender(true)} />
                                                        <Form.Check type="radio" label="Nữ" name="radioOption" defaultChecked onChange={() => setGender(false)} />
                                                    </>}
                                                </div>
                                            </div>
                                            <div className="Profile_Birthday">
                                                <Form.Label style={{ width: "22%" }}>Ngày sinh</Form.Label>
                                                <div className="Profile_Birthday_Tick">
                                                    <input
                                                        type="date" defaultValue={formattedDate} onChange={(e) => change(e, "birthday")}
                                                    />
                                                </div>
                                            </div>
                                            <div class="Update_Button">
                                                <button type="button" onClick={updateClick}>Hủy</button>
                                                <button type="button" onClick={updateUser}>Cập nhật thông tin</button>
                                            </div>
                                        </div>
                                    </section>
                                </>}
                        </> : <>
                            <section>
                                <div class="Profile_Right_Header"><h3 className="text-left text-success mb-4">Thêm hồ sơ mới</h3></div>
                                <div class="Profile_Right_Content">
                                    <div class="Profile_Name">
                                        <Form.Label style={{ width: "30%" }}>Tên</Form.Label>
                                        <Form.Control onChange={(e) => change(e, "name")} type="text" placeholder="Họ và tên" required />
                                    </div>
                                    <div class="Profile_Phonenumber">
                                        <Form.Label style={{ width: "30%" }}>Số điện thoại</Form.Label>
                                        <Form.Control onChange={(e) => change(e, "phonenumber")} type="text" placeholder="Số điện thoại" required />
                                    </div>
                                    <div class="Profile_Email">
                                        <Form.Label style={{ width: "30%" }}>Email</Form.Label>
                                        <Form.Control type="email" placeholder="Email" required />
                                    </div>
                                    <div class="Profile_Address">
                                        <div>
                                            <Form.Label style={{ width: "30%" }}>Tỉnh/TP</Form.Label>
                                            <Form.Select value={selectedProvinceCode} onChange={(e) => setSelectedProvinceCode(e.target.value)}>
                                                {province.map(pr => <option key={pr.code} value={pr.code}>{pr.name}</option>)}
                                            </Form.Select>
                                        </div>
                                        <div>
                                            <Form.Label style={{ width: "30%" }}>Quận/Huyện</Form.Label>
                                            <Form.Select value={selectedDistrictCode} onChange={(e) => setSelectedDistrictCode(e.target.value)}>
                                                {Object.values(district).map(dis => <option key={dis.code} value={dis.code}>{dis.fullName}</option>)}
                                            </Form.Select>
                                        </div>
                                        <div>
                                            <Form.Label style={{ width: "30%" }}>Phường/Xã</Form.Label>
                                            <Form.Select>
                                                {ward.map(wa => <option key={wa.code} value={wa.code}>{wa.fullName}</option>)}
                                            </Form.Select>
                                        </div>
                                    </div>
                                    <div class="Profile_Personal_Address">
                                        <Form.Label style={{ width: "30%" }}>Địa chỉ nhà</Form.Label>
                                        <Form.Control type="text" placeholder="Địa chỉ nhà" required />
                                    </div>
                                    <div class="Profile_Gender">
                                        <Form.Label style={{ width: "22%" }}>Giới tính</Form.Label>
                                        <div class="Profile_Gender_Tick">
                                            <Form.Check type="radio" label="Nam" name="genderOption" defaultChecked onChange={() => setGender(true)} />
                                            <Form.Check type="radio" label="Nữ" name="genderOption" onChange={() => setGender(false)} />
                                        </div>
                                    </div>
                                    <div className="Profile_Relationship">
                                        <Form.Label style={{ width: "22%" }}>Mối quan hệ</Form.Label>
                                        <div class="Profile_Relationship_Tick">
                                            <Form.Check type="radio" label="Cha" name="relationshipOption" />
                                            <Form.Check type="radio" label="Mẹ" name="relationshipOption" />
                                            <Form.Check type="radio" label="Con" name="relationshipOption" />
                                            <Form.Check type="radio" label="Vợ" name="relationshipOption" />
                                            <Form.Check type="radio" label="Chồng" name="relationshipOption" />
                                            <Form.Check type="radio" label="Khác" name="relationshipOption" defaultChecked />
                                        </div>
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
        </div>
    </>
}

export default Profile;