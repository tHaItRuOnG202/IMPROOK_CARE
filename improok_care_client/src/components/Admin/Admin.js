import { useContext, useEffect, useState } from "react";
import { MyUserContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import MySpinner from "../../layout/MySpinner";
import "../../styles/Admin.css";
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { AddCircle, Analytics, Category, LocalHospital, LocalPharmacy, Medication, MonetizationOn, People, Person, PersonAdd, Speed } from "@mui/icons-material";
import { Box, Paper, Typography } from "@mui/material";
import Apis, { endpoints } from "../../configs/Apis";
import moment from 'moment';
import { HiPlus } from "react-icons/hi";


const Admin = () => {
    const [user,] = useContext(MyUserContext);
    const [userList, setUserList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedOption, setSelectedOption] = useState('overview');
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

    const [open, setOpen] = useState(false);
    const [medicineOpen, setMedicineOpen] = useState(false);
    const [statisticalTick, setStatisticalTick] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const handleMedicineClick = () => {
        setMedicineOpen(!medicineOpen);
    }

    const handleStatisticalTick = () => {
        setStatisticalTick(!statisticalTick);
    }

    const loadUser = async () => {
        try {
            let res = await Apis.get(endpoints['load-user'])
            setUserList(res.data)
            console.log(res.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadUser();
    }, [])

    const renderContent = () => {
        switch (selectedOption) {
            case "overview":
                return <>
                    <div></div>
                </>
            case "alluser":
                return <>
                    <div>
                        <div>
                            <div class="Add_User">
                                <button onClick={() => handleOptionClick("adduser")}><HiPlus /> Thêm 1 người dùng mới</button>
                            </div>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Ảnh đại diện</th>
                                        <th>#</th>
                                        <th>Họ và tên đệm</th>
                                        <th>Tên</th>
                                        <th>Tài khoản/Số điện thoại</th>
                                        <th>Ngày sinh</th>
                                        <th>Giới tính</th>
                                        <th>Email</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.values(userList).map(u => {
                                        const dateTimeString = u.birthday;
                                        const formattedDate = moment(dateTimeString).format('DD-MM-YYYY');
                                        return <>
                                            <tr key={u.userId}>
                                                <td style={{ width: '11%' }}><img src={u.avatar} alt="avatar" width={'100%'} /></td>
                                                <td>{u.userId}</td>
                                                <td>{u.lastname}</td>
                                                <td>{u.firstname}</td>
                                                <td>{u.username}</td>
                                                <td>{formattedDate}</td>
                                                <td>{u.gender === true ? 'Nam' : 'Nữ'}</td>
                                                <td>{u.email}</td>
                                                <td>
                                                    <Button variant="success">Cập nhật</Button>
                                                </td>
                                            </tr>
                                        </>
                                    })}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </>
            case "adduser":
                return <>
                    <div>Nội dung thêm người dùng</div>
                </>
            case "allmedicine":
                return <>
                    <div>Nội dung cho tất cả thuốc</div>
                </>
            case "medicinecategory":
                return <>
                    <div>Nội dung cho danh mục thuốc</div>
                </>
            case "addmedicine":
                return <>
                    <div>Nội dung cho thêm thuốc</div>
                </>
            case "revenue":
                return <>
                    <div>Nội dung thống kê doanh thu</div>
                </>
            case "patient":
                return <>
                    <div>Nội dung thống kê bệnh nhân</div>
                </>
            default:
                return null;
        }
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    return (
        <>
            {loading ? (
                <MySpinner />
            ) : (
                <>
                    <div class="Admin_Wrapper">
                        <div class="Admin_Content">
                            <div class="Admin_Content_Left">
                                <Paper style={{ maxHeight: '50rem', height: '37rem', overflow: 'auto' }}>
                                    <Box sx={{ p: 2 }}>
                                        <List
                                            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                                            component="nav"
                                            aria-labelledby="nested-list-subheader"
                                        >
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <Speed />
                                                </ListItemIcon>
                                                <ListItemText primary="Tổng quan" onClick={() => handleOptionClick("overview")} />
                                            </ListItemButton>
                                            <div class="System_Management">
                                                <ListItemText primary={<Typography variant="body2" style={{ fontSize: '0.85rem', fontWeight: 'bold', marginLeft: '3rem', color: '#009FFD' }}>
                                                    QUẢN LÝ HỆ THỐNG
                                                </Typography>} />
                                                <ListItemButton onClick={handleClick}>
                                                    <ListItemIcon>
                                                        <Person />
                                                    </ListItemIcon>
                                                    <ListItemText primary="Quản lý người dùng" />
                                                    {open ? <ExpandLess /> : <ExpandMore />}
                                                </ListItemButton>
                                                <Collapse in={open} timeout="auto" unmountOnExit>
                                                    <List component="div" disablePadding>
                                                        <ListItemButton sx={{ pl: 4 }} onClick={() => handleOptionClick("alluser")}>
                                                            <ListItemIcon>
                                                                <People />
                                                            </ListItemIcon>
                                                            <ListItemText primary="Tất cả người dùng" />
                                                        </ListItemButton>
                                                        <ListItemButton sx={{ pl: 4 }} onClick={() => handleOptionClick("adduser")}>
                                                            <ListItemIcon>
                                                                <PersonAdd />
                                                            </ListItemIcon>
                                                            <ListItemText primary="Thêm người dùng" />
                                                        </ListItemButton>
                                                    </List>
                                                </Collapse>
                                                <ListItemButton onClick={handleMedicineClick}>
                                                    <ListItemIcon>
                                                        <LocalPharmacy />
                                                    </ListItemIcon>
                                                    <ListItemText primary="Quản lý thuốc" />
                                                    {medicineOpen ? <ExpandLess /> : <ExpandMore />}
                                                </ListItemButton>
                                                <Collapse in={medicineOpen} timeout="auto" unmountOnExit>
                                                    <List component="div" disablePadding>
                                                        <ListItemButton sx={{ pl: 4 }} onClick={() => handleOptionClick("allmedicine")}>
                                                            <ListItemIcon>
                                                                <Medication />
                                                            </ListItemIcon>
                                                            <ListItemText primary="Tất cả thuốc" />
                                                        </ListItemButton>
                                                        <ListItemButton sx={{ pl: 4 }} onClick={() => handleOptionClick("medicinecategory")}>
                                                            <ListItemIcon>
                                                                <Category />
                                                            </ListItemIcon>
                                                            <ListItemText primary="Danh mục thuốc" />
                                                        </ListItemButton>
                                                        <ListItemButton sx={{ pl: 4 }} onClick={() => handleOptionClick("addmedicine")}>
                                                            <ListItemIcon>
                                                                <AddCircle />
                                                            </ListItemIcon>
                                                            <ListItemText primary="Thêm thuốc" />
                                                        </ListItemButton>
                                                    </List>
                                                </Collapse>
                                            </div>
                                            <div class="Utilities_Service">
                                                <ListItemText primary={<Typography variant="body2" style={{ fontSize: '0.85rem', fontWeight: 'bold', marginLeft: '3rem', color: '#009FFD' }}>
                                                    DỊCH VỤ TIỆN ÍCH
                                                </Typography>} />
                                                <ListItemButton onClick={handleStatisticalTick}>
                                                    <ListItemIcon>
                                                        <Analytics />
                                                    </ListItemIcon>
                                                    <ListItemText primary="Thống kê" />
                                                    {statisticalTick ? <ExpandLess /> : <ExpandMore />}
                                                </ListItemButton>
                                                <Collapse in={statisticalTick} timeout="auto" unmountOnExit>
                                                    <List component="div" disablePadding>
                                                        <ListItemButton sx={{ pl: 4 }} onClick={() => handleOptionClick("revenue")}>
                                                            <ListItemIcon>
                                                                <MonetizationOn />
                                                            </ListItemIcon>
                                                            <ListItemText primary="Thống kê doanh thu" />
                                                        </ListItemButton>
                                                        <ListItemButton sx={{ pl: 4 }} onClick={() => handleOptionClick("patient")}>
                                                            <ListItemIcon>
                                                                <LocalHospital />
                                                            </ListItemIcon>
                                                            <ListItemText primary="Thống kê bệnh nhân" />
                                                        </ListItemButton>
                                                    </List>
                                                </Collapse>
                                            </div>
                                        </List>
                                    </Box>
                                </Paper>
                            </div>
                            <div></div>
                            <div class="Admin_Content_Right">
                                {renderContent()}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Admin;