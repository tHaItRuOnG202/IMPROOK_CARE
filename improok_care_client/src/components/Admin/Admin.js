import { useContext, useEffect, useRef, useState } from "react";
import { MyUserContext } from "../../App";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, Form, Table } from "react-bootstrap";
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
import { AddCircle, Analytics, Category, LocalHospital, LocalPharmacy, Medication, MonetizationOn, People, Person, PersonAdd, Speed, Update } from "@mui/icons-material";
import { Box, Paper, Typography } from "@mui/material";
import Apis, { authApi, endpoints } from "../../configs/Apis";
import moment from 'moment';
import { HiPlus } from "react-icons/hi";
import avatar_user from "../../assests/images/avatar-user.png"
import PageNavigation from "../../utils/PageNavigation";


const Admin = () => {
    const [current_user,] = useContext(MyUserContext);
    const [userList, setUserList] = useState([]);
    // const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedOption, setSelectedOption] = useState('overview');
    const [gender, setGender] = useState();
    const navigate = useNavigate();
    const avatar = useRef();
    const [roles, setRoles] = useState();
    const [selectedRole, setSelectedRole] = useState('1');
    const [totalPages, setTotalPages] = useState('1');
    const [totalMedicinePages, setTotalMedicinePages] = useState('1')
    const [medicineCategoryName, setMedicineCategoryName] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState('')
    const [editCategoryName, setEditCategoryName] = useState('');
    const [medicineList, setMedicineList] = useState([]);

    const [editingIndex, setEditingIndex] = useState(-1);

    const [user, setUser] = useState({
        "username": "",
        "password": "",
        "firstname": "",
        "lastname": "",
        "gender": "",
        "avatar": "",
        "birthday": ""
    })

    // const [userUpdate, setUserUpdate] = useState({
    //     "userId": userInfo.userId,
    //     "firstname": userInfo.firstname,
    //     "lastname": userInfo.lastname,
    //     "birthday": userInfo.birthday,
    //     "gender": userInfo.gender,
    //     "roleId": userInfo.roleId,
    //     "avatar": userInfo.avatar
    // })

    const [selectedPage, setSelectedPage] = useState('1');

    const [userUpdate, setUserUpdate] = useState(null)

    const currentDate = new Date();
    const currentFormattedDate = currentDate.toISOString().split('T')[0];

    const [selectedImage, setSelectedImage] = useState('');

    const [categories, setCategories] = useState([]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setSelectedImage(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    var isAdmin = 0;
    var isLogin = 0;

    const checkLogin = (current_user) => {
        if (isLogin === 0) {
            if (current_user === null) {
                toast("Vui lòng đăng nhập!")
                isLogin = 1;
                navigate('/login');
            }
        }
    }

    const adminAuth = (current_user) => {
        if (isAdmin === 0) {
            if (current_user !== null && current_user.roleId.roleId !== 1) {
                toast.error("Bạn không có quyền truy cập!")
                isAdmin = 1;
                navigate('/')
            }
        }
    }

    useEffect(() => {
        checkLogin(current_user)
        adminAuth(current_user)
    }, [current_user])

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
            setLoading(true);

            let res = await Apis.get(endpoints['search-users'])
            setUserList(res.data.content);
            setTotalPages(res.data.totalPages);
            setLoading(false);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const loadUserPage = async (pageNumber) => {
        try {
            setLoading(true);
            let e = endpoints['search-users'];
            // let pageNumber = document.getElementsByClassName("active").id;
            console.log(pageNumber)
            if (pageNumber !== null) {
                e = `${e}?pageNumber=${pageNumber - 1}`
            }
            // let url = `/users/${pageNumber}`
            let res = await Apis.get(e);
            setUserList(res.data.content);
            setTotalPages(res.data.totalPages);
            // navigate(url);
            setLoading(false);
            console.log(res.data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        loadUserPage();
        loadUser();
    }, [])

    const addUser = (evt) => {
        evt.preventDefault();

        const process = async () => {
            try {
                const dateInput = document.getElementById('doB');
                const selectedDate = dateInput.value; // Lấy giá trị ngày từ trường input

                const birthDate = new Date(selectedDate).toISOString().split('T')[0]; // Định dạng lại ngày thành "yyyy-MM-dd"
                console.log(avatar.current.files[0]);
                let form = new FormData();
                for (let field in user)
                    if (field !== "gender" && field !== "avatar" && field !== "birthday")
                        form.append(field, user[field]);

                if (avatar.current.files[0] !== undefined)
                    form.append("avatar", avatar.current.files[0]);
                else
                    form.append("avatar", new Blob());

                form.delete("gender");
                if (gender === false) {
                    form.append("gender", false)
                } else {
                    form.append("gender", true)
                }

                form.delete("birthday")
                form.append("birthday", birthDate);

                setLoading(true);

                let res = await Apis.post(endpoints['admin-add-user'], form);
                if (res.status === 200) {
                    toast.success(res.data)
                }
                setLoading(false);
            } catch (error) {
                if (error.request.responseText === "Số điện thoại đã tồn tại!")
                    toast.error(error.request.responseText);
                else
                    toast.error(error.request.responseText);
                console.log(error);
            }
        }
        process();
    }

    const loadUserById = (evt, userId) => {
        evt.preventDefault();

        const process = async () => {
            try {
                setLoading(true);
                console.log(userId)
                let res = await Apis.get(endpoints['load-user-by-Id'](userId))
                setUserUpdate(res.data);
                setLoading(false);
                console.log("Đây là userInfo");
                console.log(res.data);
                console.log(userUpdate);
                setGender(res.data['gender'])
            } catch (error) {
                console.log(error);
            }
        }
        process();
    }

    const updateUser = (evt) => {
        evt.preventDefault();

        const process = async () => {
            try {
                console.log(userUpdate['gender'])
                const dateInput = document.getElementById('doBUpdate');
                const selectedDate = dateInput.value; // Lấy giá trị ngày từ trường input
                const userId = userUpdate['userId'];

                const birthDate = new Date(selectedDate).toISOString().split('T')[0]; // Định dạng lại ngày thành "yyyy-MM-dd"
                console.log(avatar.current.files[0]);
                console.log(userId);
                let form = new FormData();

                console.log("For nhé cả nhà")
                for (let field in userUpdate)
                    if (field !== "username" && field !== "password" && field !== "email" && field !== "createdDate" && field !== "updatedDate" && field !== "deletedDate" && field !== "active" && field !== "userId" && field !== "gender" && field !== "avatar" && field !== "birthday" && field !== "roleId") {
                        console.log(field)
                        console.log(userUpdate[field])
                        form.append(field, userUpdate[field]);
                    }
                console.log("Bye for nhé cả nhà")
                form.append("userId", userId);

                if (avatar.current.files[0] !== undefined)
                    form.append("avatar", avatar.current.files[0]);
                else
                    form.append("avatar", new Blob());

                form.delete("gender");
                form.append("gender", gender)
                // if (gender === false) {
                //     form.append("gender", gender)
                // } else {
                //     form.append("gender", gender)
                // }

                form.delete("birthday")
                form.append("birthday", birthDate);

                console.log(selectedRole)
                form.append("roleId", selectedRole);

                console.log(gender, selectedRole, birthDate, avatar.current.files[0], userId)

                console.log(userUpdate);

                setLoading(true);

                let res = await authApi().post(endpoints['admin-update-user'], form, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                if (res.status === 200) {
                    toast.success(res.data)
                    handleOptionClick("alluser");
                    loadUser();
                }
                setLoading(false);
            } catch (error) {
                if (error.request.responseText === "Người dùng không tồn tại!")
                    toast.error(error.request.responseText);
                else
                    toast.error(error.request.responseText);
                console.log(error);
            }
        }
        process();
    }

    const handleOptionClickAndUpdateUser = (e, userId) => {
        handleOptionClick("updateuser");
        loadUserById(e, userId);
    };

    const change = (evt, field) => {
        // setUser({...user, [field]: evt.target.value})
        setUser(current => {
            return { ...current, [field]: evt.target.value }
        })
    }

    const updateChange = (evt, field) => {
        // setUser({...user, [field]: evt.target.value})
        setUserUpdate(current => {
            return { ...current, [field]: evt.target.value }
        })
    }

    useEffect(() => {
        const loadRole = async () => {
            try {
                let res = await Apis.get(endpoints['roles'])
                setRoles(res.data);
                console.log(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        loadRole();
    }, [])

    const handleRoleChange = (e) => {
        const selectedRoleId = e.target.value;
        setSelectedRole(selectedRoleId);
    }

    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
    const handlePageChange = (pageNumber) => {
        // TODO: Xử lý sự kiện khi người dùng chuyển trang
        setSelectedPage(pageNumber);
        loadUserPage(pageNumber);
        console.log(`Chuyển đến trang ${pageNumber}`);
    };

    const medicinePages = Array.from({ length: totalMedicinePages }, (_, index) => index + 1);
    const handleMedicinePageChange = (pageNumber) => {
        // TODO: Xử lý sự kiện khi người dùng chuyển trang
        setSelectedPage(pageNumber);
        loadMedicinePage(pageNumber);
        console.log(`Chuyển đến trang ${pageNumber}`);
    };

    const loadMedicineCategories = async () => {
        try {
            setLoading(true);
            let res = await Apis.get(endpoints['medicine-categories'])
            setCategories(res.data);
            // setTotalPages(res.data.totalPages);
            setLoading(false);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const addMedicineCategory = (evt) => {
        evt.preventDefault();

        const process = async () => {
            try {
                setLoading(true)
                if (medicineCategoryName === '') {
                    toast.warning("Vui lòng nhập tên thuốc");
                    setLoading(false);
                    return
                }
                let res = await authApi().post(endpoints['add-medicine-categories'], {
                    "medicineCategoryName": medicineCategoryName
                });
                if (res.status === 200) {
                    toast.success(res.data)
                    handleOptionClick("medicinecategory");
                    loadMedicineCategories();
                }
                setLoading(false);
            } catch (error) {
                if (error.request.responseText === "Thêm danh mục thuốc thất bại!")
                    toast.error(error.request.responseText);
                else
                    toast.error(error.request.responseText);
                console.log(error);
            }
        }
        process();
    }

    const updateMedicineCategory = (evt, categoryName) => {
        evt.preventDefault();

        const process = async () => {
            try {
                setLoading(true)
                console.log(selectedCategoryId, editCategoryName)
                let res = await authApi().post(endpoints['update-medicine-categories'], {
                    "medicineCategoryId": selectedCategoryId,
                    "medicineCategoryName": editCategoryName === '' ? categoryName : editCategoryName
                });
                if (res.status === 200) {
                    toast.success(res.data)
                    handleOptionClick("medicinecategory");
                    loadMedicineCategories();
                }
                console.log(res.data);
                setEditCategoryName('');
                setEditingIndex(-1);
                setLoading(false);
            } catch (error) {
                if (error.request.responseText === "Danh mục thuốc không tồn tại!")
                    toast.error(error.request.responseText);
                else
                    toast.error(error.request.responseText);
                console.log(error);
            }
        }
        process();
    }

    const handleEdit = (index, categoryId) => {
        setEditingIndex(index);
        setSelectedCategoryId(categoryId)
    };

    const handleCancel = () => {
        setEditingIndex(-1);
    };

    useEffect(() => {
        loadMedicineCategories();
        console.log(medicineCategoryName);
    }, [])


    const loadMedicine = async () => {
        try {
            setLoading(true);
            let res = await Apis.get(endpoints['search-medicines'])
            setMedicineList(res.data.content);
            setTotalPages(res.data.totalPages);
            setLoading(false);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const loadMedicinePage = async (pageNumber) => {
        try {
            setLoading(true);
            let e = endpoints['search-medicines'];
            // let pageNumber = document.getElementsByClassName("active").id;
            console.log(pageNumber)
            if (pageNumber !== null) {
                e = `${e}?pageNumber=${pageNumber - 1}`
            }
            // let url = `/users/${pageNumber}`
            let res = await Apis.get(e);
            setMedicineList(res.data.content);
            setTotalMedicinePages(res.data.totalPages);
            // navigate(url);
            setLoading(false);
            console.log(res.data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        loadMedicine();
        loadMedicinePage();
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
                                        <th>Vai trò</th>
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
                                                <td>{u.roleId.roleName}</td>
                                                <td>
                                                    <Button variant="success" onClick={(e) => {
                                                        handleOptionClickAndUpdateUser(e, u.userId)
                                                    }}>Cập nhật</Button>
                                                </td>
                                            </tr>
                                        </>
                                    })}
                                </tbody>
                            </Table>
                            <div className="Page_Nav">
                                {pages.map((page) => (
                                    <button id={`${page}`} key={page} onClick={() => handlePageChange(page)}
                                        className={page === selectedPage ? 'active' : ''}>
                                        {page}
                                    </button>
                                ))}
                            </div>
                            {/* <PageNavigation totalPages={totalPages} onClick={loadUserPage} /> */}
                        </div>
                    </div>
                </>
            case "adduser":
                return <>
                    <div>
                        <div>
                            <div class="Add_User_Header">
                                <h4 className="text-primary">Thông tin người dùng</h4>
                            </div>
                            <div class="Add_User_Body">
                                <div class="Add_User_UserName">
                                    <Form.Label style={{ width: "20%" }}>Tên đăng nhập</Form.Label>
                                    <Form.Control type="text" onChange={(e) => change(e, "username")} placeholder="Tên đăng nhập" required />
                                </div>
                                <div class="Add_User_Password">
                                    <Form.Label style={{ width: "20%" }}>Mật khẩu</Form.Label>
                                    <Form.Control type="text" onChange={(e) => change(e, "password")} placeholder="Mật khẩu" required />
                                </div>
                                <div class="Add_User_Name">
                                    <div class="Add_Lastname">
                                        <Form.Label style={{ width: "78%" }}>Họ và tên đệm</Form.Label>
                                        <Form.Control type="Text" onChange={(e) => change(e, "lastname")} placeholder="Họ và tên đệm" required />
                                    </div>
                                    <div class="Add_Firstname">
                                        <Form.Label style={{ width: "78%" }}>Tên</Form.Label>
                                        <Form.Control type="Text" onChange={(e) => change(e, "firstname")} placeholder="Tên" required />
                                    </div>
                                </div>
                                <div class="Add_User_Gender">
                                    <Form.Label style={{ width: "16%" }}>Giới tính</Form.Label>
                                    <div class="Add_User_Gender_Tick">
                                        <Form.Check type="radio" label="Nam" name="genderOption" defaultChecked onChange={() => setGender(true)} />
                                        <Form.Check type="radio" label="Nữ" name="genderOption" onChange={() => setGender(false)} />
                                    </div>
                                </div>
                                <div class="Add_User_Avatar">
                                    <Form.Label style={{ width: "16%" }}>Ảnh đại diện</Form.Label>
                                    <div class="Avatar_Choice">
                                        {selectedImage ? (
                                            <div>
                                                <img src={selectedImage} alt="Selected" width="100%" />
                                            </div>
                                        ) : (
                                            <div class="Avatar_Null">
                                                <span>Vui lòng chọn ảnh</span>
                                                <img src={avatar_user} alt="user avatar" />
                                            </div>
                                        )}
                                        <Form.Control type="File" ref={avatar} onChange={handleImageChange} width={'50%'} />
                                    </div>
                                </div>
                                <div class="Add_User_Birthday">
                                    <Form.Label style={{ width: "20%" }}>Ngày sinh</Form.Label>
                                    <Form.Control type="Date" id="doB" defaultValue={currentFormattedDate} />
                                </div>
                                <div class="Add_User_Button">
                                    <button type="button">Hủy</button>
                                    <button type="button" onClick={(e) => addUser(e)}>Thêm</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            case "updateuser":
                return <>
                    <div>
                        <div>
                            <div class="Update_User_Header">
                                <h4 className="text-primary">Thông tin người dùng</h4>
                            </div>
                            <div class="Update_User_Body">
                                <div class="Update_User_Name">
                                    <div class="Update_Lastname">
                                        <Form.Label style={{ width: "78%" }}>Họ và tên đệm</Form.Label>
                                        <Form.Control type="Text" defaultValue={userUpdate.lastname} onChange={(e) => updateChange(e, "lastname")} placeholder="Họ và tên đệm" required />
                                    </div>
                                    <div class="Update_Firstname">
                                        <Form.Label style={{ width: "78%" }}>Tên</Form.Label>
                                        <Form.Control type="Text" defaultValue={userUpdate.firstname} onChange={(e) => updateChange(e, "firstname")} placeholder="Tên" required />
                                    </div>
                                </div>
                                <div class="Update_User_Gender">
                                    <Form.Label style={{ width: "16%" }}>Giới tính</Form.Label>
                                    <div class="Update_User_Gender_Tick">
                                        {userUpdate.gender === true ? <>
                                            <Form.Check type="radio" label="Nam" name="genderOption" defaultChecked onChange={() => setGender(true)} />
                                            <Form.Check type="radio" label="Nữ" name="genderOption" onChange={() => setGender(false)} />
                                        </> : <>
                                            <Form.Check type="radio" label="Nam" name="genderOption" onChange={() => setGender(true)} />
                                            <Form.Check type="radio" label="Nữ" name="genderOption" defaultChecked onChange={() => setGender(false)} />
                                        </>}
                                    </div>
                                </div>
                                <div class="Update_User_Avatar">
                                    <Form.Label style={{ width: "16%" }}>Ảnh đại diện</Form.Label>
                                    <div class="Update_Avatar_Choice">
                                        <div>
                                            {selectedImage ? <img src={selectedImage} alt="Selected" width={"100%"} /> : <img src={userUpdate.avatar} alt="Selected" width="100%" />}
                                        </div>
                                        <Form.Control type="File" ref={avatar} onChange={handleImageChange} width={'50%'} />
                                    </div>
                                </div>
                                <div class="Update_User_Birthday">
                                    <Form.Label style={{ width: "20%" }}>Ngày sinh</Form.Label>
                                    {(() => {
                                        const formattedBirthDate = new Date(userUpdate.birthday);
                                        formattedBirthDate.setHours(formattedBirthDate.getHours() + 7);
                                        const formattedBirthDateTime = formattedBirthDate.toISOString().substring(0, 10);
                                        return (
                                            <Form.Control
                                                type="date" defaultValue={formattedBirthDateTime} id="doBUpdate"
                                            />
                                        );
                                    })()}
                                </div>
                                <div class="Update_User_Role">
                                    <Form.Label style={{ width: "20%" }}>Vai trò</Form.Label>
                                    <Form.Select defaultValue={userUpdate.roleId} onChange={(e) => handleRoleChange(e)}>
                                        {Object.values(roles).map(r => <option key={r.roleId} value={r.roleId}>{r.roleName}</option>)}
                                    </Form.Select>
                                </div>
                                <div class="Update_User_Button">
                                    <button type="button">Hủy</button>
                                    <button type="button" onClick={(e) => updateUser(e)}>Cập nhật</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            case "allmedicine":
                return <>
                    <div>
                        <div>
                            <div class="Medicine">
                                <button onClick={() => handleOptionClick("addmedicine")}><HiPlus /> Thêm 1 thuốc mới</button>
                            </div>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Ảnh đại diện</th>
                                        <th>#</th>
                                        <th>Tên thuốc</th>
                                        <th>Mô tả</th>
                                        <th>Thành phần</th>
                                        <th>Liều lượng</th>
                                        <th>Đơn giá</th>
                                        <th>Loại</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.values(medicineList).map(m => {
                                        return <>
                                            <tr key={m.medicineId}>
                                                <td style={{ width: '11%' }}><img src={m.avatar} alt="avatar" width={'100%'} /></td>
                                                <td>{m.medicineId}</td>
                                                <td>{m.medicineName}</td>
                                                <td>{m.description}</td>
                                                <td>{m.ingredients}</td>
                                                <td>{m.dosage}</td>
                                                <td>{m.unitPrice}</td>
                                                <td>{m.categoryId.categoryName}</td>
                                                <td>
                                                    <Button variant="success" onClick={(e) => {
                                                        handleOptionClickAndUpdateUser(e, m.medicineId)
                                                    }}>Cập nhật</Button>
                                                </td>
                                            </tr>
                                        </>
                                    })}
                                </tbody>
                            </Table>
                            <div className="Page_Nav">
                                {medicinePages.map((page) => (
                                    <button id={`${page}`} key={page} onClick={() => handleMedicinePageChange(page)}
                                        className={page === selectedPage ? 'active' : ''}>
                                        {page}
                                    </button>
                                ))}
                            </div>
                            {/* <PageNavigation totalPages={totalPages} onClick={loadUserPage} /> */}
                        </div>
                    </div>
                </>
            case "medicinecategory":
                return <>
                    <div>
                        <div>
                            <div class="Medicine_Category_Header">
                                <h4 className="text-primary">Thông tin danh mục thuốc</h4>
                            </div>
                            <div class="Medicine_Catagory">
                                <Form.Label style={{ width: "78%" }}>Thêm danh mục thuốc</Form.Label>
                                <div class="Add_Medicine_Category">
                                    <Form.Control type="text" defaultValue={medicineCategoryName} onChange={(e) => setMedicineCategoryName(e.target.value)} placeholder="Tên danh mục thuốc" required />
                                    <Button variant="secondary" onClick={(e) => {
                                        addMedicineCategory(e);
                                        setMedicineCategoryName(''); // Xóa nội dung input
                                    }}>Thêm</Button>
                                </div>
                            </div>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Tên danh mục</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.values(categories).map((c, index) => (
                                        <tr key={c.categoryId}>
                                            <td style={{ width: '20%' }}>{c.categoryId}</td>
                                            <td style={{ width: '40%' }}>
                                                {editingIndex === index ? (
                                                    <input
                                                        type="text"
                                                        defaultValue={c.categoryName}
                                                        onChange={(e) => setEditCategoryName(e.target.value)}
                                                    />
                                                ) : (
                                                    c.categoryName
                                                )}
                                            </td>
                                            <td style={{ width: '30%' }}>
                                                {editingIndex === index ? (
                                                    <>
                                                        <Button style={{ marginRight: '0.5rem' }} variant="success" onClick={(e) => updateMedicineCategory(e, c.categoryName)}>
                                                            Cập nhật
                                                        </Button>
                                                        <Button style={{ marginRight: '0.5rem' }} variant="warning" onClick={handleCancel}>
                                                            Hủy
                                                        </Button>
                                                    </>
                                                ) : (
                                                    <Button style={{ marginRight: '0.5rem' }} variant="primary" onClick={() => handleEdit(index, c.categoryId)}>
                                                        Sửa
                                                    </Button>
                                                )}
                                                <Button variant="danger">Xóa</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <div className="Page_Nav">
                                {pages.map((page) => (
                                    <button id={`${page}`} key={page} onClick={() => handlePageChange(page)}
                                        className={page === selectedPage ? 'active' : ''}>
                                        {page}
                                    </button>
                                ))}
                            </div>
                            {/* <PageNavigation totalPages={totalPages} onClick={loadUserPage} /> */}
                        </div>
                    </div>
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