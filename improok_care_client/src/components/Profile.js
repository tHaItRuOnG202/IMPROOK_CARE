import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyUserContext } from "../App";
import "../styles/Profile.css";
import { Form, Image } from "react-bootstrap";
import Apis, { authApi, endpoints } from "../configs/Apis";
import cookie from "react-cookies";
import { toast } from "react-toastify";
import printer from "../assests/images/printer.png"
import profileicon from "../assests/images/profile-icon.png"

const Profile = () => {
    const [current_user, dispatch] = useContext(MyUserContext);
    const [current_birthday, setCurrent_birthday] = useState(current_user.birthday)
    const [birthday, setBirthday] = useState(null)
    const [gender, setGender] = useState(null)
    const nav = useNavigate();
    const [loading, setLoading] = useState(true)

    const [name, setName] = useState();
    const [phonenumber, setPhonenumber] = useState();
    const [personalAddress, setPersonalAddress] = useState();
    const [email, setEmail] = useState();
    const [relationship, setRelationship] = useState();

    const [profilePatient, setProfilePatient] = useState([]);

    const [province, setProvince] = useState();
    const [district, setDistrict] = useState();
    const [ward, setWard] = useState();
    const [provincename, setProvinceName] = useState();
    const [districtname, setDistrictName] = useState();
    const [wardname, setWardName] = useState();
    const [selectedProvinceCode, setSelectedProvinceCode] = useState('01');
    const [selectedDistrictCode, setSelectedDistrictCode] = useState('001');
    const [selectedWardCode, setSelectedWardCode] = useState('00001')

    const [addProfileInfo, setAddProfileInfo] = useState(false)
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
        const loadProfilePatient = async () => {
            try {
                let res = await authApi().get(endpoints['load-profile-patient'](current_user.userId))
                setProfilePatient(res.data)
                console.log(res.data);
            } catch (error) {
                console.log(error)
            }
        }
        loadProfilePatient();
    }, [current_user.userId])

    const updateClick = () => {
        setCheckProfileInfo(!checkProfileInfo);
    }

    const addNewProfile = (evt) => {
        evt.preventDefault();

        const process = async () => {
            try {
                setLoading(true);
                console.log(name + '' + phonenumber + '' + provincename + '' + districtname + '' + wardname + '' + personalAddress + '' + relationship)

                let res = await authApi().post(endpoints['add-profile-patient'], {
                    "name": name,
                    "phonenumber": phonenumber,
                    "provinceName": provincename,
                    "districtName": districtname,
                    "wardName": wardname,
                    "personalAddress": personalAddress,
                    "email": email,
                    "relationship": relationship,
                    "userId": current_user.userId
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

    return <>
        <div class="Profile_Wrapper">
            <div class="Profile">
                <div class="Profile_Left">
                    <div class="Profile_Left_Content">
                        <ul>
                            <li><a href="/personalpage">Thông tin cá nhân</a></li>
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
                                <div class="Profile_List">
                                    {profilePatient.length === 0 ? <>
                                        <div class="Profile_List_404">
                                            <img src={printer} alt="404" width={'20%'} />
                                            <span>Không tìm thấy kết quả</span>
                                        </div>
                                    </> : <>
                                        <div class="Profile_List_Info">
                                            <ul>
                                                {Object.values(profilePatient).map(pp => {
                                                    return <>
                                                        <div class="Profile_List_Detail">
                                                            <img src={profileicon} alt="profileicon" width={'20%'} />
                                                            <li key={pp.profilePatientId}>{pp.name}</li>
                                                        </div>
                                                    </>
                                                })}
                                            </ul>
                                        </div>
                                    </>}
                                </div>
                            </div>
                            <button class="addProfileButt" onClick={addProfileClick}>Thêm hồ sơ</button>
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
                                            <div class="Profile_Phonenumber">
                                                <Form.Label style={{ width: "30%" }}>Số điện thoại</Form.Label>
                                                <Form.Control value={current_user.firstname} type="text" disabled />
                                            </div>
                                            <div class="Profile_Email">
                                                <Form.Label style={{ width: "30%" }}>Email</Form.Label>
                                                <Form.Control value={current_user.email} type="email" disabled />
                                            </div>
                                            <div class="Profile_Address">
                                                <Form.Label style={{ width: "30%" }}>Địa chỉ</Form.Label>
                                                <Form.Control value={current_user.gender === true ? "Nam" : "Nữ"} type="Text" disabled />
                                            </div>
                                            <div class="Profile_Gender">
                                                <Form.Label style={{ width: "30%" }}>Giới tính</Form.Label>
                                                <Form.Control value={current_user.gender === true ? "Nam" : "Nữ"} type="Text" disabled />
                                            </div>
                                            <div class="Profile_Relationship">
                                                <Form.Label style={{ width: "30%" }}>Quan hệ</Form.Label>
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
                                        <div class="Profile_Right_Header"><h3 className="text-center text-success">Thay đổi thông tin</h3></div>
                                        <div class="Profile_Right_Content">
                                            <div class="Profile_Name">
                                                <Form.Label style={{ width: "30%" }}>Tên</Form.Label>
                                                <Form.Control defaultValue={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Họ và tên" required />
                                            </div>
                                            <div class="Profile_Phonenumber">
                                                <Form.Label style={{ width: "30%" }}>Số điện thoại</Form.Label>
                                                <Form.Control defaultValue={phonenumber} onChange={(e) => setPhonenumber(e.target.value)} type="text" placeholder="Số điện thoại" required />
                                            </div>
                                            <div class="Profile_Email">
                                                <Form.Label style={{ width: "30%" }}>Email</Form.Label>
                                                <Form.Control defaultValue={email} type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                                            </div>
                                            <div class="Profile_Address">
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
                                            <div class="Profile_Personal_Address">
                                                <Form.Label style={{ width: "30%" }}>Địa chỉ nhà</Form.Label>
                                                <Form.Control type="text" defaultValue={personalAddress} placeholder="Địa chỉ nhà" required onChange={(e) => setPersonalAddress(e.target.value)} />
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
                                                    <Form.Check type="radio" defaultValue="Cha" label="Cha" name="relationshipOption" onChange={(e) => setRelationship(e.target.value)} />
                                                    <Form.Check type="radio" defaultValue="Mẹ" label="Mẹ" name="relationshipOption" onChange={(e) => setRelationship(e.target.value)} />
                                                    <Form.Check type="radio" defaultValue="Con" label="Con" name="relationshipOption" onChange={(e) => setRelationship(e.target.value)} />
                                                    <Form.Check type="radio" defaultValue="Vợ" label="Vợ" name="relationshipOption" onChange={(e) => setRelationship(e.target.value)} />
                                                    <Form.Check type="radio" defaultValue="Chồng" label="Chồng" name="relationshipOption" onChange={(e) => setRelationship(e.target.value)} />
                                                    <Form.Check type="radio" defaultValue="Khác" label="Khác" name="relationshipOption" defaultChecked onChange={(e) => setRelationship(e.target.value)} />
                                                </div>
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
                                <div class="Profile_Right_Header"><h3 className="text-left text-success mb-4">Thêm hồ sơ mới</h3></div>
                                <div class="Profile_Right_Content">
                                    <div class="Profile_Name">
                                        <Form.Label style={{ width: "30%" }}>Tên</Form.Label>
                                        <Form.Control defaultValue={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Họ và tên" required />
                                    </div>
                                    <div class="Profile_Phonenumber">
                                        <Form.Label style={{ width: "30%" }}>Số điện thoại</Form.Label>
                                        <Form.Control defaultValue={phonenumber} onChange={(e) => setPhonenumber(e.target.value)} type="text" placeholder="Số điện thoại" required />
                                    </div>
                                    <div class="Profile_Email">
                                        <Form.Label style={{ width: "30%" }}>Email</Form.Label>
                                        <Form.Control defaultValue={email} type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                                    </div>
                                    <div class="Profile_Address">
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
                                    <div class="Profile_Personal_Address">
                                        <Form.Label style={{ width: "30%" }}>Địa chỉ nhà</Form.Label>
                                        <Form.Control type="text" defaultValue={personalAddress} placeholder="Địa chỉ nhà" required onChange={(e) => setPersonalAddress(e.target.value)} />
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
                                            <Form.Check type="radio" defaultValue="Cha" label="Cha" name="relationshipOption" onChange={(e) => setRelationship(e.target.value)} />
                                            <Form.Check type="radio" defaultValue="Mẹ" label="Mẹ" name="relationshipOption" onChange={(e) => setRelationship(e.target.value)} />
                                            <Form.Check type="radio" defaultValue="Con" label="Con" name="relationshipOption" onChange={(e) => setRelationship(e.target.value)} />
                                            <Form.Check type="radio" defaultValue="Vợ" label="Vợ" name="relationshipOption" onChange={(e) => setRelationship(e.target.value)} />
                                            <Form.Check type="radio" defaultValue="Chồng" label="Chồng" name="relationshipOption" onChange={(e) => setRelationship(e.target.value)} />
                                            <Form.Check type="radio" defaultValue="Khác" label="Khác" name="relationshipOption" defaultChecked onChange={(e) => setRelationship(e.target.value)} />
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