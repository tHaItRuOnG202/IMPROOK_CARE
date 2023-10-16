import { useContext, useEffect, useRef, useState } from "react";
import "../styles/ProfileDoctorDetail.css"
import { useParams, Link } from "react-router-dom";
import Apis, { authApi, endpoints } from "../configs/Apis";
import verified from "../assests/images/verified.svg"
import MySpinner from "../layout/MySpinner";
import googleplay from "../assests/images/googleplay.svg"
import appstore from "../assests/images/appstore.svg"
import { MyUserContext } from "../App";
import GoogleMapAPI from "../utils/GoogleMapAPI";
import { Button, Form, Image, ListGroup } from "react-bootstrap";
import Moment from "react-moment";
import { Rating, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { ElectricScooterTwoTone } from "@mui/icons-material";

const ProfileDoctorDetail = () => {
    const { profileDoctorId } = useParams();
    const [doctorDetail, setDoctorDetail] = useState('');
    const [loading, setLoading] = useState(false);
    const [current_user, dispatch] = useContext(MyUserContext)
    const [comment, setComment] = useState([]);
    const [content, setContent] = useState(null);
    const [rating, setRating] = useState(0);

    const avatar = useRef();

    useEffect(() => {
        const loadProfileDoctorById = async () => {
            try {
                setLoading(true);
                let res = await Apis.get(endpoints['load-profile-doctor-by-Id'](profileDoctorId));
                setDoctorDetail(res.data);
                console.log(res.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }

        loadProfileDoctorById();
    }, [profileDoctorId])

    const loadComment = async () => {
        let e = `${endpoints['search-comments']}?profileDoctorId=${profileDoctorId}`;
        let res = await Apis.get(e);

        setComment(res.data.content);
        console.log(res.data.content);
    }

    useEffect(() => {
        loadComment();
    }, [profileDoctorId]);

    const addComment = async () => {
        setLoading(true);

        let form = new FormData();
        form.append("profileDoctorId", doctorDetail.profileDoctorId);
        form.append("userId", current_user.userId);
        form.append("content", content);
        form.append("rating", rating)
        if (avatar.current.files[0] !== undefined) {
            form.append("avatar", avatar.current.files[0]);
        } else {
            form.append("avatar", new Blob());
        }

        try {
            let res = await authApi().post(endpoints['add-comment'], form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            toast.success(res.data);
            loadComment();
            setLoading(false);
        } catch (error) {
            setLoading(false);
            if (error.response.data === "Chưa khám không thể bình luận!")
                toast.error(error.response.data)
            else
                toast.error(error.response.data)
            console.log(error);
        }
    };

    let url = `/booking/doctor/${doctorDetail.profileDoctorId}`

    return <>
        <div class="Profile_Doctor_Detail_Wrapper">
            <div class="Profile_Doctor_Detail_Content">
                <div class="Profile_Doctor_Detail_Header">
                    {loading === true ? <MySpinner /> :
                        <>
                            {doctorDetail?.userId?.avatar && (
                                <div className="Profile_Doctor_Avatar">
                                    <img src={doctorDetail.userId.avatar} alt="Doctor Avatar" />
                                </div>
                            )}
                            {doctorDetail?.specialtyId?.specialtyName &&
                                (<div class="Profile_Doctor_Info">
                                    <h3>Phó giáo sư, Tiến sĩ, Bác sĩ {doctorDetail.name}</h3>
                                    <span className="mb-4"><img src={verified} alt="verified" /> <span style={{ color: '#1975e3', fontSize: '1.1rem', fontWeight: 'bold' }}>Bác sĩ</span> | <strong>10</strong> năm kinh nghiệm</span>
                                    <span>Chuyên khoa <span style={{ color: '#1975e3', fontSize: '1.1rem', fontWeight: 'bold' }}>{doctorDetail.specialtyId.specialtyName}</span></span>
                                    <span>Chức vụ {doctorDetail.position}</span>
                                    <span>Nơi công tác <span style={{ fontSize: '1.1rem', fontWeight: '500' }}>{doctorDetail.workAddress}</span></span>
                                </div>)
                            }
                        </>}
                </div>
                <div class="Profile_Doctor_Detail_Body">
                    <div class="Phonenumber">
                        <div>
                            <span>Hỗ trợ đặt khám</span>
                            <span>2051052125</span>
                        </div>
                        {current_user === null ? <button><Link to={`/login?next=/doctor/${profileDoctorId}`}>Đăng nhập để đặt khám</Link></button> : <button><Link to={url}>ĐẶT KHÁM NGAY</Link></button>}

                    </div>
                    <div className="googleMapAPI">
                        <GoogleMapAPI address={doctorDetail.workAddress} />
                    </div>
                    <div class="Profile_Doctor_Comment">
                        {current_user === null ? <p>Vui lòng <Link to={`/login?next=/doctor/${profileDoctorId}`}>đăng nhập</Link> để bình luận! </p> : <>
                            <Form.Label style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Để lại ý kiến của bạn</Form.Label>
                            <Form.Control as="textarea" aria-label="With textarea" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Nhập nội dung bình luận" />
                            <div class="Profile_Doctor_Rating">
                                <Typography component="legend">Đánh giá của bạn</Typography>
                                <Rating name="simple-controlled" value={rating} onChange={(event, newValue) => { setRating(newValue) }}
                                />
                            </div>
                            <Form.Control className="mt-2" accept=".jpg, .jpeg, .png, .gif, .bmp" type="file" ref={avatar} />
                            <Button className="mt-2" variant="info" onClick={addComment}>Bình luận</Button>
                        </>}
                        <hr />
                        <ListGroup>
                            <div class="Comment_List">
                                {Object.values(comment).map(c => <ListGroup.Item key={c.commentId}>
                                    <div class="User_Comment">
                                        <Image src={c.userId.avatar} style={{ width: "6%" }} fluid roundedCircle />
                                        <span>{c.userId.lastname} {c.userId.firstname} đã đánh giá</span>
                                        <Rating name="read-only" value={c.rating} readOnly />
                                    </div>
                                    <div class="Avatar_Comment">
                                        <Image src={c.avatar} style={{ width: "10%" }} />
                                    </div>
                                    <div>
                                        {c.content} - <Moment locale="vi" fromNow>{c.createdDate}</Moment>
                                    </div>
                                </ListGroup.Item>)}
                            </div>
                        </ListGroup>

                    </div>
                </div>
                <div class="Profile_Doctor_Detail_Footer">
                    <div>
                        <span>Đặt lịch khám Bác sĩ dễ dàng</span>
                        <h3>Tải ngay IMPROOKCARE</h3>
                        <div>
                            <Link to="/" style={{ marginRight: '1rem' }}><img src={googleplay} alt="GooglePlay" /></Link>
                            <Link to="/"><img src={appstore} alt="AppStore" /></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default ProfileDoctorDetail;