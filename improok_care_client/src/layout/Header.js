// import { useEffect, useState } from "react";
import { FaSeedling } from "react-icons/fa"
//import { FaSearch } from "react-icons/fa"
// import { FaTimesCircle } from "react-icons/fa";
// import Apis, { endpoints } from "../configs/Apis";
import "../styles/Header.css"
import { useContext, useState } from "react"
import { MyUserContext } from "../App"
import { useNavigate } from "react-router-dom"
import { Dropdown, NavDropdown } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {

    const [user, dispatch] = useContext(MyUserContext);
    // const [currentUser,] = useContext(MyUserContext);
    const nav = useNavigate();
    const [loading, setLoading] = useState(true)

    const logout = () => {
        dispatch({
            "type": "logout"
        })
        nav("/")
    }

    return (<>
        <div class="Header">
            <div class="Header1">
                <a href="/"><h2 class="Title"><FaSeedling /> IM'PROOK CARE</h2></a>
            </div>
            <div class="Header2">
                <ul class="Menu-bar">
                    <li>
                        <a href="/">Chuyên khoa</a>
                        <span>Tìm bác sĩ theo chuyên khoa</span>
                    </li>
                    {/* <li>
                        <a href="/">Cơ sở y tế</a>
                        <span>Chọn bệnh viện, phòng khám</span>
                    </li> */}

                    <li>
                        <a href="/">Tin tức</a>
                        <span>Tin tức về y tế thế giới</span>
                    </li>
                    <li>
                        <Dropdown>
                            <NavDropdown title='Hợp tác bác sĩ ' id="basic-nav-dropdown">
                                <NavDropdown.Item href="/collabdoctor">Đăng ký</NavDropdown.Item>
                            </NavDropdown>
                        </Dropdown>
                        <span>Đăng ký ngay</span>
                    </li>
                </ul>
            </div>
            <div class="Header3">
                {user === null ?
                    <><button class="Sign-in"><a href="/phoneverification">Đăng ký</a></button>
                        <button class="Log-in"><a href="/login">Đăng nhập</a></button></> :
                    <>
                        {user.roleId.roleId === 1 ?
                            <>
                                <button class="Admin"><a href="/admin">Quản trị</a></button>
                            </> :
                            <>
                                {user.roleId.roleId === 2 ?
                                    <>
                                        <button class="Doctor"><a href="/doctor">Bác sĩ</a></button>
                                    </> :
                                    <></>}
                            </>
                        }
                        {/* <span class="User-profile"><a href="/">Chào {user.lastname} {user.firstname}</a></span> */}
                        <Dropdown>
                            <NavDropdown title={`Chào ${user.lastname} ${user.firstname}`} id="basic-nav-dropdown">
                                <NavDropdown.Item href="/" >Về trang chủ</NavDropdown.Item>
                                <NavDropdown.Item href="/personalpage" >Thông tin cá nhân</NavDropdown.Item>
                                <NavDropdown.Item href="/medicalrecord" >Lịch sử khám bệnh</NavDropdown.Item>
                                <NavDropdown.Item onClick={logout} >Đăng xuất</NavDropdown.Item>
                            </NavDropdown>
                        </Dropdown>
                    </>
                }
                {/* <button class="Little-menu">
                    <div><FaEllipsisV /></div>
                    <ul>
                        <li><FaLanguage /> Ngôn ngữ</li>
                        <li><FaQuestionCircle /> Trợ giúp và phản hồi</li>
                    </ul>
                </button> */}
            </div>
        </div >
        {/* <ul>
            {users.map(u => <li key={u.userId}>{u.lastname}</li>)}
        </ul> */}
    </>)
}

export default Header;