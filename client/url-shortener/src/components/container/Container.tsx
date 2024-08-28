import FormContainer from "./FormContainer.tsx"
import { UrlData } from "../../interface/UrlData.ts"
import React from "react"
import { serverUrl } from "../../helpers/Constant.tsx";
import axios from "axios";
import DataTable from "../DataTable/DataTable.tsx";

const Container = () => {
    const [data, setData] = React.useState<UrlData[]>([]);
    const [reload, setReload] = React.useState<boolean>(false);

    const updateReloadState = ():void =>{
      setReload(true);
    }
    const fetchTableData = async() =>{
        const response = await axios.get(`${serverUrl}/shortUrl`);
        console.log("response from server: ", response);
        setData(response.data);
        console.log(data)
        setReload(false)
    };

    React.useEffect(()=>{
        fetchTableData();
    },[reload])
  return (
    <>
<FormContainer updateReloadState={updateReloadState}/>
<DataTable updateReloadState={updateReloadState} data={data}/>
</>
  )
}

export default Container
