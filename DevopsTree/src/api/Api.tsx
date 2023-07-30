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

// export const fetchWorkItemsByBusinessSurveyId = async(id:string) => {
//   id = '73e7d54d-7c03-ee11-8f6e-6045bd0fcbc6';
//   try {
//     const result = await fetch(`https://partnerstudioportaluk.powerappsportals.com/en-US/getsurveyworkItems/?type=workitem&id=${id}`).then((val)=>{
//       console.log("fetch value", val.json());
//     })
//     console.log("GetWorkItemTypesByBusinessSurveyId ===========", result);
//     // if (result?.status === 200) {
//     //   return { status: "success", data: result?.data };
//     // }else {
//     //   return { status: "error", data: "Something Went Wrong..!" };
//     // }
//   } catch (error) {
//     console.log("GetWorkItemTypesByBusinessSurveyId ===========", error);
//     return { status: "error", data: error };
//   }
// }

export const fetchWorkItemsByBusinessSurveyId = (id:string)=> {
  id = '73e7d54d-7c03-ee11-8f6e-6045bd0fcbc6';
  return new Promise((resolve,reject)=>{
    window.parent.webapi.safeAjax({
    type: "GET",
    url: `/getsurveyworkItems/?type=workitem&id=${id}`,
    contentType: "application/json",
    success: function (data: any, textStatus: any, xhr: any) {
      console.log("GetWorkItemTypes",data);
      resolve({ type: "success", data });
    },
    error: function (request: any, status: any, thrown: any) {
      reject({ type: "error", status: request.status });
    },
    });
  })
}

export const fetchAllInternalIdsByBusinessSurveyId =(id:string) => {
  id = '73e7d54d-7c03-ee11-8f6e-6045bd0fcbc6';
  const apiCalls = [
    `/getsurveyworkItems/?type=chapters&id=${id}`,
    `/getsurveyworkItems/?type=sections&id=${id}`,
    `/getsurveyworkItems/?type=questions&id=${id}`,
  ];

  const promises = apiCalls.map((url) => {
    return new Promise((resolve, reject) => {
      window.parent.webapi.safeAjax({
        type: "GET",
        url,
        contentType: "application/json",
        success: function (data:any, textStatus:any, xhr:any) {
          resolve({ type: "success", data });
        },
        error: function (request:any, status:any, thrown:any) {
          reject({ type: "error", status: request.status });
        },
      });
    });
  });

  return Promise.all(promises);
}

// export const fetchAllInternalIdsByBusinessSurveyId = async(id:string) => {
//   id = '73e7d54d-7c03-ee11-8f6e-6045bd0fcbc6';
//   try {
//     const chapterIds = await axios.post(`https://partnerstudioportaluk.powerappsportals.com/en-US/getsurveyworkItems/?type=chapters&id=${id}`);
//     const sectionIds = await axios.post(`https://partnerstudioportaluk.powerappsportals.com/en-US/getsurveyworkItems/?type=sections&id=${id}`);
//     const questionIds = await axios.post(`https://partnerstudioportaluk.powerappsportals.com/en-US/getsurveyworkItems/?type=questions&id=${id}`);
//     console.log("GetWorkItemTypesByBusinessSurveyId ===========", chapterIds, sectionIds, questionIds);
//     Promise.all([chapterIds,sectionIds,questionIds]).then((value)=>{
//       console.log("all internal ids value",value);
//       return value;
//     }).catch((error)=>{
//       return { status: "error", data: "Something Went Wrong..!", error:error}
//     })
//     // if (result?.status === 200) {
//     //   return { status: "success", data: result?.data };
//     // }else {
//     //   return { status: "error", data: "Something Went Wrong..!" };
//     // }
//   } catch (error) {
//     console.log("GetWorkItemTypesByBusinessSurveyId ===========", error);
//     return { status: "error", data: error };
//   }

// }