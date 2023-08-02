import axios from "axios";


export const generateDevops = async (value?: any, isChild?:boolean) => {
  try {
      console.log("parentNode...", value );
      const saveParentObj = {
        "organizationUri": "https://dev.azure.com/SEERTEST2",
        "personalAccessToken": "lx3ojrtzlq4r2gwiqa7mfchzo4ztkxbx5gbdur6vegqlffjzow7q",
        "projectName": "TestMyAgile",
        "workItemType":value?.rest?.workitemtype,
        "fieldData":Object?.keys(value?.rest)?.map((attributes:any)=>{
         return { 
          name : attributes,
          value:value?.rest[attributes],
          referencePath:"" ,
        }
        })
    };

      const saveChildObj = {
        "organizationUri": "https://dev.azure.com/SEERTEST2",
        "personalAccessToken": "lx3ojrtzlq4r2gwiqa7mfchzo4ztkxbx5gbdur6vegqlffjzow7q",
        "projectName": "TestMyAgile",
        "workItemType":value?.rest?.workitemtype,
        "fieldData":Object?.keys(value?.rest)?.map((attributes:any)=>{
          return { 
           name : attributes,
           value:value?.rest[attributes],
           referencePath:"" ,
         }
         }),
         "parent":"",
    };
      // Make an API call to save the parent node data here
      const response = await axios.post('https://seerv2sample2.azurewebsites.net/api/GetWorkItemTypes?code=eZ8HwfEwRhr3EMahUUgKUz44rtzwwtaHss-lHwReYpS2AzFuDdbXow==',isChild ? saveChildObj : saveParentObj);
      console.log('Parent node saved:', response);
      // Get the ID of the saved parent node
      const parentId = response.data.id;
      // Update the parent node's key with the ID
      value.key = parentId;
      console.log("saved as ",isChild ? "child"+ saveChildObj : "parent" + saveParentObj );

      // Recursively save children nodes
      for (const childNode of value.children) {
        console.log("childNode", childNode);
        if(value?.children?.length> 0){
          // check it has children if so need to save as parent
          await generateDevops(childNode, false);
        }else{
          await generateDevops(childNode, true);
        }
      }
  } catch (error) {
    console.log("Save  WorkItemTypes ===========", error);
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