import "../styles/Register.css"
import { FaFacebook, FaGoogle, FaRegTimesCircle } from "react-icons/fa";
import yaemiko from "../assests/images/yaemiko.png"
import { useContext, useState } from "react";
import { Form } from "react-bootstrap"
import Apis, { endpoints } from "../configs/Apis";
import { Navigate, useNavigate } from "react-router-dom"
import { Spinner } from "react-bootstrap";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { MyUserContext } from "../App";
import cookie from "react-cookies"

const Register = () => {
    const [current_user,] = useContext(MyUserContext)
    const [user, setUser] = useState({
        "firstname": "",
        "lastname": "",
        "username": cookie.load("token"),
        "password": "",
        "confirmPass": "",
        "gender": ""
    })
    const [err, setErr] = useState(null);
    const nav = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const register = (evt) => {
        evt.preventDefault();

        const process = async () => {


            setLoading(true);

            let res = await Apis.post(endpoints['register'], {

            });
            if (res.status === 201) {
                nav("/login");
                cookie.remove("token");
            }
            else
                setErr("Có lỗi xảy ra!")
        }

        if (user.password === user.confirmPass)
            process();
        else
            setErr("Mật khẩu không khớp!")
    }

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    // const change = (evt, field) => {
    //     // setUser({ ...user, [field]: evt.target.value })
    //     setUser(current => {
    //         return { ...current, [field]: evt.target.value }
    //     })
    // }

    if (current_user !== null)
        return <Navigate to="/" />

    return (<>
        <div class="Register_Wrapper">
            <div class="Register_Content">
                <div class="Register_Form">
                    <div class="Register_Left">
                        <img src={yaemiko} alt="Yae Miko" />
                    </div>
                    <div class="Register_Right">
                        <Form class="Register_Form">
                            <div class="Register_Form">
                                <div class="Register_Detail">
                                    <div class="Register_Header">
                                        <div>
                                            <div>ĐĂNG KÝ NGƯỜI DÙNG</div>
                                        </div>
                                    </div>
                                    <div class="Register_Fill">
                                        <div class="Register_User">
                                            <div class="Register_User_Input">
                                                <input type="text" placeholder="Tên" required></input>
                                            </div>
                                            <div class="Separate"></div>
                                        </div>
                                        <div class="Register_User">
                                            <div class="Register_User_Input">
                                                <input type="text" placeholder="Họ và tên đệm" required></input>
                                            </div>
                                            <div class="Separate"></div>
                                        </div>
                                        <div class="Register_User">
                                            <div class="Register_User_Input">
                                                <input type="text" disabled></input>
                                            </div>
                                            <div class="Separate"></div>
                                        </div>
                                        <div class="Register_Password">
                                            <div class="Register_Password_Input">
                                                <input type={showPassword ? 'text' : 'password'} placeholder="Nhập mật khẩu" required></input>
                                                <button type="button" onClick={toggleShowPassword}>
                                                    {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                                                </button>
                                            </div>
                                            <div class="Separate"></div>
                                        </div>
                                        <div class="Password_Confirm">
                                            <div class="Password_Confirm_Input">
                                                <input type={showConfirmPassword ? 'text' : 'password'} value={user.confirmPass} placeholder="Xác nhận mật khẩu" required></input>
                                                <button type="button" onClick={toggleShowConfirmPassword}>
                                                    {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                                                </button>
                                            </div>
                                            <div class="Separate"></div>
                                        </div>
                                        {/* <button class="Register_Butt">Đăng ký</button> */}
                                        {loading === true ? <Spinner animation="grow" variant="info" /> : <button class="Register_Butt">Đăng ký</button>}
                                        {/* <div class="Register_Help">
                                            <a href="/">Quên mật khẩu</a>
                                            <a href="/">Đăng ký với SMS</a>
                                        </div> */}
                                        <div class="Register_Option">
                                            <div class="Register_Or">
                                                <div></div>
                                                <span>Hoặc</span>
                                                <div></div>
                                            </div>
                                            <div class="Register_Another">
                                                <button><FaGoogle /> Google</button>
                                                <button><FaFacebook /> Facebook</button>
                                            </div>
                                        </div>
                                        <div class="Register_Policy">
                                            <div>
                                                Bằng việc đăng kí, bạn đã đồng ý với Spring Care về
                                                <a href="/"> Điều khoản dịch vụ </a>
                                                &
                                                <a href="/"> Chính sách bảo mật</a>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div class="To_Login">
                                        <div>
                                            Bạn đã có tài khoản?
                                            <a href="/login"> Đăng nhập</a>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default Register;