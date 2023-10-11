import { useEffect, useState } from "react";
import Apis, { endpoints } from "../configs/Apis";

const Home = () => {
    const [bla, setBla] = useState();
    useEffect(() => {
        const loadBlaBla = async () => {
            try {
                let res = await Apis.get(endpoints['tuan-tran'])
                setBla(res.data);
                console.log(res.data);
                console.log(res.data.content);
                console.log(res.data.totalPages);
            } catch (error) {
                console.log(error);
            }
        }
        loadBlaBla();
    }, [])

    return <>
        <h3>Trang chủ IMPROOK_CARE</h3>
    </>
}

export default Home;