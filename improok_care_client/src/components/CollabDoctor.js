import { useEffect, useState } from "react";
import "../styles/CollabDoctor.css"
import Apis, { endpoints } from "../configs/Apis";
import googleplay from "../assests/images/googleplay.svg"
import appstore from "../assests/images/appstore.svg"
import maledoctor from "../assests/images/male-doctor.png"
import femaledoctor from "../assests/images/female-doctor.png"
import { TiTickOutline } from "react-icons/ti";
import { FcSearch } from "react-icons/fc";
import { Link } from "react-router-dom";

const CollabDoctor = () => {
    const [imageClick, setImageClick] = useState(true);

    const checkImageClick = () => {
        setImageClick(!imageClick);
    }


    return <>
        <div class="CollabDoctor_Wrapper">
            <div class="CollabDoctor_Content_1">
                <div>
                    <div class="CollabDoctor_Content_1_Header">
                        <h3>Đặt khám bác sĩ</h3>
                        <h5>Đặt khám với hơn 500 bác sĩ đã kết nối chính thức với IMPROOKCARE để có số thứ tự và khung giờ khám trước</h5>
                    </div>
                    <div class="CollabDoctor_Content_1_Content">
                        <input type="text" placeholder="Nhập tên bác sĩ...." />
                        <button><FcSearch /></button>
                    </div>
                </div>
            </div>
            <div class="CollabDoctor_Content">
                <div class="CollabDoctor_Content_2">
                    <div class="CollabDoctor_Content_2_Header">
                        <h4>Đặt khám bác sĩ</h4>
                    </div>
                    <div>

                    </div>
                </div>
                <div class="CollabDoctor_Content_3">
                    <div class="CollabDoctor_Content_3_Header">
                        <h3>Đa dạng chuyên khoa khám bệnh</h3>
                        <h5>Đặt khám dễ dàng và tiện lợi hơn với đầy đủ các chuyên khoa</h5>
                    </div>
                    <div class="CollabDoctor_Content_3_Content">
                        <div class="Specialty_List">

                        </div>
                    </div>
                </div>
                <div class="CollabDoctor_Content_4">
                    <div class="CollabDoctor_Content_4_Header">
                        <h3>An tâm tìm và đặt bác sĩ</h3>
                        <h5>Hơn 500 bác sĩ liên kết chính thức với I'MPROOKCARE</h5>
                    </div>
                    <div class="CollabDoctor_Content_4_Content">
                        <div class="CollabDoctor_Content_4_LeftContent">
                            {imageClick === true ? <img src={femaledoctor} alt="doctor" style={{ width: '100%' }} /> : <img src={maledoctor} alt="doctor" style={{ width: '100%' }} />}
                        </div>
                        <div class="CollabDoctor_Content_4_RightContent">
                            <div >
                                <div class="Separate"></div>
                                <div onClick={checkImageClick}>
                                    <h5 style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>Đội ngũ bác sĩ</h5>
                                    <h6 style={{ fontWeight: '400' }}>Tất cả các bác sĩ đều liên kết chính thức với IMPROOKCARE.</h6>
                                </div>
                            </div>
                            <hr />
                            <div>
                                <div class="Separate"></div>
                                <div onClick={checkImageClick}>
                                    <h5 style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>Đặt khám dễ dàng, nhanh chóng, chủ động</h5>
                                    <h6 style={{ fontWeight: '400' }}>Chỉ với 1 phút, bạn có thể đặt khám thành công với bác sĩ.</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="CollabDoctor_Content_5">
                <div>
                    <div class="CollabDoctor_Content_5_Left">
                        <h3>Tải ứng dụng IMPROOKCARE</h3>
                        <ul>
                            <li>
                                <TiTickOutline />
                                <span>Đặt khám bác sĩ</span>
                            </li>
                            <li>
                                <TiTickOutline />
                                <span>Tiện lợi - Nhanh chóng - Dễ dàng</span>
                            </li>
                        </ul>
                        <div>
                            <Link to="/" style={{ marginRight: '1rem' }}><img src={googleplay} alt="GooglePlay" /></Link>
                            <Link to="/"><img src={appstore} alt="AppStore" /></Link>
                        </div>
                    </div>
                    <div class="CollabDoctor_Content_5_Right">
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default CollabDoctor;