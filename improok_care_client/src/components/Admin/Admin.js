import { useContext, useEffect, useState } from "react";
import { MyUserContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import MySpinner from "../../layout/MySpinner";

const Admin = () => {
    const [user] = useContext(MyUserContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    var isAdmin = 0;
    var isLogin = 0;

    const checkLogin = (user) => {
        if (isLogin === 0) {
            if (user === null) {
                toast("Vui lòng đăng nhập!")
                isLogin = 1;
                navigate('/login');
            }
        }
    }

    const adminAuth = (user) => {
        if (isAdmin === 0) {
            if (user !== null && user.roleId.roleId !== 1) {
                toast.error("Bạn không có quyền truy cập!")
                isAdmin = 1;
                navigate('/')
            }
        }
    }

    useEffect(() => {
        checkLogin(user)
        adminAuth(user)
    }, [user])


    return (
        <>
            {loading ? (
                <MySpinner />
            ) : (
                <>
                    <h1>Quản trị hệ thống</h1>
                </>
            )}
        </>
    );
};

export default Admin;