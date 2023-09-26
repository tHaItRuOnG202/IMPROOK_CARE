import "../styles/PhoneVerification.css"
import { FaFacebook, FaGoogle } from "react-icons/fa";
import yaemiko from "../assests/images/yaemiko.png"
import { useContext, useState } from "react";
import { Form } from "react-bootstrap"
import Apis, { endpoints } from "../configs/Apis";
import { Navigate, useNavigate } from "react-router-dom"
import MySpinner from "../layout/MySpinner";
import { MyUserContext } from "../App";
import { toast } from "react-toastify";
import cookie from "react-cookies"

const PhoneVerification = () => {
    const [user,] = useContext(MyUserContext)
    const [err, setErr] = useState(null);
    const [code, setCode] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [check, setCheck] = useState(false)
    const nav = useNavigate();

    const [verificationInfo, setVerificationInfo] = useState(null)

    const handleCodeChange = (evt) => {
        setCode(evt.target.value);
    };

    const handleCheck = (evt) => {
        setCheck(evt.target.checked);
    }

    const OTPSender = (evt) => {
        evt.preventDefault();

        const process = async () => {
            try {
                setLoading(true);
                console.log(phonenumber);
                // let form = new FormData();
                // form.append("phonenumber", phonenumber);
                let resVerification = await Apis.post(endpoints['verification'], {
                    "phonenumber": phonenumber
                })
                // let resVerification = await Apis.get(endpoints['verification'], form)
                console.log(resVerification.status);
                setLoading(false);

            } catch (error) {
                console.log(error)
            }
        }
        process();
    }


    const verification = (evt) => {
        evt.preventDefault();

        const process = async () => {
            try {
                setLoading(true)
                if (code === '') {
                    toast.warning("Vui lòng nhập OTP");
                    setLoading(false);
                } else if (check === false) {
                    toast.warning("Vui lòng đồng ý với điều khoản dịch vụ");
                    setLoading(false);
                }

                console.log("code" + code)
                console.log("phonenumber" + phonenumber)

                let res = await Apis.post(endpoints['verification-check'], {
                    "code": code,
                    "phonenumber": phonenumber
                })

                cookie.save('token', res.data);
                console.log(res.data);

                setLoading(false);
                nav('/register');
            } catch (error) {
                console.log(error);
            }
        }
        process();
    }

    const toRegister = () => {
        cookie.save("phonenumber", phonenumber)
        nav('/register')
    }

    if (user !== null)
        return <Navigate to="/" />

    return (<>
        <div class="PhoneVerification_Wrapper">
            <div class="PhoneVerification_Content">
                <div class="PhoneVerification_Form">
                    <div class="PhoneVerification_Left">
                        <img src={yaemiko} alt="Yae Miko" />
                    </div>
                    <div class="PhoneVerification_Right">
                        <Form class="PhoneVerification_Form">
                            <div class="PhoneVerification_Form">
                                <div class="PhoneVerification_Detail">
                                    <div class="PhoneVerification_Header">
                                        <div>
                                            <div>XÁC THỰC NGƯỜI DÙNG</div>
                                        </div>
                                    </div>
                                    <div class="PhoneVerification_Fill">
                                        <div class="PhoneVerification_User">
                                            <div class="PhoneVerification_User_OTP">
                                                <div class="PhoneVerification_User_Input">
                                                    <input type="text" defaultValue={phonenumber} onChange={(e) => setPhonenumber(e.target.value)} placeholder="Số điện thoại" pattern="[0-9]+" required></input>
                                                </div>
                                                <button type="button" class="OTP" onClick={OTPSender}>Gửi OTP</button>
                                            </div>
                                            <div class="Separate"></div>
                                        </div>
                                        <div class="PhoneVerification_User">
                                            <div class="PhoneVerification_User_Input">
                                                <input type="text" defaultValue={code} onChange={(e) => setCode(e.target.value)} placeholder="Mã OTP" pattern="[0-9]+" required></input>
                                            </div>
                                            <div class="Separate"></div>
                                        </div>
                                        <div class="PhoneVerification_User">
                                            <div class="PhoneVerification_User_PolicyCheck">
                                                <span><input type="checkbox" onChange={handleCheck} /> Tôi đã đọc và đồng ý với
                                                    các điều khoản và điều kiện sử dụng</span>
                                            </div>
                                            <div class="Separate"></div>
                                        </div>
                                        <button type="button" class="PhoneVerification_Butt" onClick={toRegister}>Register</button>
                                        {/* <button class="PhoneVerification_Butt">Đăng ký</button> */}
                                        {loading === true ? <MySpinner /> : <button type="button" class="PhoneVerification_Butt" onClick={verification}>Xác thực</button>}
                                        <div class="PhoneVerification_Option">
                                            <div class="PhoneVerification_Or">
                                                <div></div>
                                                <span>Hoặc</span>
                                                <div></div>
                                            </div>
                                            <div class="PhoneVerification_Another">
                                                <button><FaGoogle /> Google</button>
                                                <button><FaFacebook /> Facebook</button>
                                            </div>
                                        </div>
                                        <div class="PhoneVerification_Policy">
                                            <div>
                                                Bằng việc đăng kí, bạn đã đồng ý với Spring Care về
                                                <a href="/"> Điều khoản dịch vụ </a>
                                                &
                                                <a href="/"> Chính sách bảo mật</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="To_Login">
                                        <div>
                                            Bạn đã có tài khoản?
                                            <a href="/login"> Đăng nhập</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default PhoneVerification;