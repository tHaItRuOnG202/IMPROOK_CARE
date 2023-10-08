import MySpinner from "../layout/MySpinner";
import yaemiko from "../assests/images/yaemiko.png";
import { Form } from "react-bootstrap";
import { useContext, useState } from "react";
import { MyUserContext } from "../App";
import "../styles/ChangePassword.css";
import { useNavigate } from "react-router-dom";
import { authApi, endpoints } from "../configs/Apis";
import { toast } from "react-toastify";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const ChangePassword = () => {
    const [current_user, dispatch] = useContext(MyUserContext);
    const [loading, setLoading] = useState(null);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [username, setUsername] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewpassword, setConfirmNewpassword] = useState('')

    // const [newPassword, setNewPassword] = useState({
    //     "username": current_user.username,
    //     "currentPassword": "",
    //     "newPassword": "",
    //     "confirmNewpassword": "",
    // })

    const nav = useNavigate();

    // const change = (evt, field) => {
    //     setNewPassword(current => {
    //         return { ...current, [field]: evt.target.value }
    //     })
    // }

    const passwordChange = (evt) => {
        const process = async () => {
            try {
                setLoading(true);

                // let form = new FormData();

                console.log(currentPassword, newPassword)

                // form.append("username", newPassword.username);
                // form.append("currentPassword", newPassword.currentPassword);
                // form.append("newPassword", newPassword.newPassword);

                let res = await authApi().post(endpoints['change-password'], {
                    "username": current_user.username,
                    "currentPassword": currentPassword,
                    "newPassword": newPassword
                });

                if (res.data === "Đổi mật khẩu thành công!") {
                    toast.success("Đổi mật khẩu thành công!")
                    nav("/");
                    console.log(res.data)
                }
                setLoading(false);
            } catch (error) {
                if (error.request.responseText === "Người dùng không tồn tại!") {
                    toast.error(error.request.responseText)
                    console.log(error.request.responseText)
                }
                else if (error.request.responseText === "Mật khẩu hiện tại và mật khẩu cũ không khớp!") {
                    toast.error(error.request.responseText)
                    console.log(error.request.responseText)
                }
                else {
                    toast.error(error.request.responseText)
                    console.log(error.request.responseText)
                }
                setLoading(false);
            }
        }
        if (newPassword === confirmNewpassword)
            process();
        else {
            toast.error("Mật khẩu KHÔNG khớp!");
        }
    }

    const toggleShowCurrentPassword = () => {
        setShowCurrentPassword(!showCurrentPassword);
    };

    const toggleShowNewPassword = () => {
        setShowNewPassword(!showNewPassword);
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return <>
        <div class="ChangePassword_Wrapper">
            <div class="ChangePassword_Content">
                <div class="ChangePassword_Form">
                    <div class="ChangePassword_Left">
                        <img src={yaemiko} alt="Yae Miko" />
                    </div>
                    <div class="ChangePassword_Right">
                        <Form class="ChangePassword_Form">
                            <div class="ChangePassword_Form">
                                <div class="ChangePassword_Detail">
                                    <div class="ChangePassword_Header">
                                        <div>
                                            <div>THAY ĐỔI MẬT KHẨU</div>
                                        </div>
                                    </div>
                                    <div class="ChangePassword_Fill">
                                        <div class="ChangePassword_User">
                                            <div class="ChangePassword_Old">
                                                <input type={showCurrentPassword ? 'text' : 'password'} defaultValue={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="Mật khẩu hiện tại" required></input>
                                                <button type="button" onClick={toggleShowCurrentPassword}>
                                                    {showCurrentPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                                                </button>
                                            </div>
                                            <div class="Separate"></div>
                                        </div>
                                        <div class="ChangePassword_User">
                                            <div class="ChangePassword_New">
                                                <input type={showNewPassword ? 'text' : 'password'} defaultValue={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Mật khẩu mới" required></input>
                                                <button type="button" onClick={toggleShowNewPassword}>
                                                    {showNewPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                                                </button>
                                            </div>
                                            <div class="Separate"></div>
                                        </div>
                                        <div class="ChangePassword_User">
                                            <div class="ChangePassword_Confirm">
                                                <input type={showConfirmPassword ? 'text' : 'password'} onChange={(e) => setConfirmNewpassword(e.target.value)} placeholder="Xác nhận mật khẩu mới" required></input>
                                                <button type="button" onClick={toggleShowConfirmPassword}>
                                                    {showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                                                </button>
                                            </div>
                                            <div class="Separate"></div>
                                        </div>
                                        {loading === true ? <MySpinner /> : <button type="button" class="ChangePassword_Butt" onClick={(e) => passwordChange(e)}>Lưu thay đổi</button>}
                                    </div>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default ChangePassword;