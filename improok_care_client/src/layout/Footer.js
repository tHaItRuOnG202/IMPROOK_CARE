import { FaFacebookSquare, FaLinkedin, FaTiktok, FaYoutube } from "react-icons/fa";
import "../styles/Footer.css"
import dadangky from "../assests/images/dadangky.svg"
import dmcabadge from "../assests/images/dmca-badge.png"

const Footer = () => {
    return (<>
        <div class="Footer">
            <div class="Footer1">
                <div class="Footer1_1">
                    <p style={{ fontWeight: 600 }}>CÔNG TY TNHH IMPROOK VIỆT NAM</p>
                    <p><strong>VPĐD:</strong> 371 Nguyễn Kiệm, P.3, Q.Gò Vấp, Tp. HCM</p>
                    <p>Số ĐKKD 0315268642 do Sở Kế hoạch và Đầu tư TP. Hồ Chí Minh cấp lần đầu ngày 28/08/2023</p>
                    <p>Chịu trách nhiệm nội dung: <a href="https://www.youtube.com/@tuantran0168">PGS. TS. Tuấn Trần</a></p>
                </div>
                <div class="Footer1_2">
                    <label style={{ fontWeight: 600 }}>Về Spring Care</label>
                    <ul>
                        <li>Giới thiệu về IMPROOK Care</li>
                        <li>Ban điều hành</li>
                        <li>Nhân sự & Tuyển dụng</li>
                        <li>Liên hệ</li>
                    </ul>
                </div>
                <div class="Footer1_3">
                    <label style={{ fontWeight: 600 }}>Dịch vụ</label>
                    <ul>
                        <li>Đặt khám Bác sĩ</li>
                        <li>Đặt khám Bệnh viện</li>
                        <li>Đặt khám Phòng khám</li>
                        <li>IMPROOK Store</li>
                    </ul>
                </div>
                <div class="Footer1_4">
                    <label style={{ fontWeight: 600 }}>Hỗ trợ</label>
                    <ul>
                        <li>Câu hỏi thường gặp</li>
                        <li>Điều khoản sử dụng</li>
                        <li>Chính sách bảo mật</li>
                        <li>Chính sách giải quyết khiếu nại</li>
                        <li>Hỗ trợ khách hàng: <a href="mailto:cskh@spring.vn">cskh@improok.vn</a></li>
                    </ul>
                </div>
                <div class="Footer1_5">
                    <div style={{ fontWeight: 600 }}>Kết nối với chúng tôi</div>
                    <ul>
                        <li><FaFacebookSquare /></li>
                        <li><FaYoutube /></li>
                        <li><FaLinkedin /></li>
                        <li><FaTiktok /></li>
                    </ul>
                </div>
                <div class="Footer1_6">
                    <ul>
                        <li>
                            <a href="/">
                                <img src={dadangky} alt="Đã đăng ký bộ công thương" width={'80%'} />
                            </a>
                        </li>
                        <li>
                            <a href="/">
                                <img src={dmcabadge} alt="dmca" width={'100%'} />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="Footer2">
                <p>Các thông tin trên IMPROOK Care chỉ dành cho mục đích tham khảo, tra cứu và không thay thế cho việc chuẩn đoán hoặc điều trị y khoa.
                    <br />
                    Cần tuyệt đối tuân theo hướng dẫn của Bác sĩ và Nhân viên y tế.
                </p>
                <p>Copyright © 2020 - 2024 Công ty TNHH I'MPROOK Việt Nam.</p>
            </div>
        </div>
    </>)
}

export default Footer;