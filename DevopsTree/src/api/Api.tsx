import axios from "axios";


export const generateDevops = async (value?: any) => {
  try {
    //azureWorkItemTypeURL
    const result = await axios.post(
      "https://seerv2sample2.azurewebsites.net/api/GetWorkItemTypes?code=eZ8HwfEwRhr3EMahUUgKUz44rtzwwtaHss-lHwReYpS2AzFuDdbXow==",
      {
        "organizationUri": "https://dev.azure.com/SEERTEST2",
        "personalAccessToken": "c7b2ycmt27ph6wo4b2grqiasffiynzuz3k6srhvujbyfrtzmoioq",
        "projectName": "TestMyAgile",
        "workItemType":"Epic",
        "reproStep":"1234",
        "priority":"1",
        "severity":"1",
        "title":"Work Item Title",        "parent":"https://dev.azure.com/SEERTEST2/74c83c28-aad3-4e58-bd88-129ed531eb02/_apis/wit/workItems/118" 
    } 
    );
    console.log("GetWorkItemTypes =========> ", result);
    if (result?.status === 200) {
      if (result?.data?.StatusCode === 200) {
        return { status: "success", data: result?.data };
      } else if (result?.data?.StatusCode === 401) {
        return { status: "error", data: result?.data };
      } else {
        return { status: "error", data: result?.data };
      }
    } else {
      return { status: "error", data: "Something Went Wrong..!" };
    }
  } catch (error) {
    console.log("GetWorkItemTypes ===========", error);
    return { status: "error", data: error };
  }
};

export const fetchWorkItemTypes = ()=> {

  return new Promise((resolve,reject)=>{
    window.parent.webapi.safeAjax({
  type: "GET",
  url: "/_api/gyde_workitemtypes",
  contentType: "application/json",
  success: function (data: any, textStatus: any, xhr: any) {
    resolve({ type: "success", data });
  },
  error: function (request: any, status: any, thrown: any) {
    reject({ type: "error", status: request.status });
  },
  });
  
  
  
  })
}