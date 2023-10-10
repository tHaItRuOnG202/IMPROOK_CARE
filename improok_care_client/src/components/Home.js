import { useEffect, useState } from "react";
import Apis, { endpoints } from "../configs/Apis";
import PageNavigation from "../utils/PageNavigation";

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
        <PageNavigation totalPages={5} />
    </>
}

export default Home;