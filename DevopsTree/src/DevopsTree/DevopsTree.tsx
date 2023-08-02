import { Button, Tree } from 'antd';
import type { DataNode, TreeProps } from 'antd/es/tree';
import React, { useEffect, useState } from 'react';
import { fetchAllInternalIdsByBusinessSurveyId, fetchWorkItemTypes, fetchWorkItemsByBusinessSurveyId, generateDevops } from '../api/Api';
import { findNodeAndRelations } from '../helper/GetParentNode';

declare global {
  interface Window {
    webapi: any;
  }
}
// const treeData: DataNode[] = [
//   {
//     title: 'parent 1',
//     key: '0-0',
//     children: [
//       {
//         title: 'parent 1-0',
//         key: '0-0-0',
//         disabled: true,
//         children: [
//           {
//             title: 'leaf',
//             key: '0-0-0-0',
//             disableCheckbox: true,
//           },
//           {
//             title: 'leaf',
//             key: '0-0-0-1',
//           },
//         ],
//       },
//       {
//         title: 'parent 1-1',
//         key: '0-0-1',
//         children: [{ title: <span style={{ color: '#1677ff' }}>sss</span>, key: '0-0-1-0' }],
//       },
//     ],
//   },
// ];

const internalIds:any = [
  {
      "internalid": "1472"
  },
  {
      "internalid": "DV-439"
  },
  {
      "internalid": "1472_1473"
  },
  {
      "internalid": "DV-439_DV-440"
  },
  {
      "internalid": "1472_1473_1474"
  },
  {
      "internalid": "1472_1473_1477"
  },
  {
      "internalid": "1472_1473_1478"
  },
  {
      "internalid": "1472_1473_1660"
  },
  {
      "internalid": "DV-439_DV-440_DV-441"
  }
]

const workItems:any = {"results":  [
    
  {
      "title": "RDW1",
      "sequance": "1",
      "sequanceid": "d605a3ed-3b2c-ee11-bdf4-6045bd0fcbc6",
      "parentworkitem": "",
      "description": "RDW1",
      "workitemid": "d705a3ed-3b2c-ee11-bdf4-6045bd0fcbc6",
      "priority": "1",
      "workitemresource": "674ae973-c4dc-ed11-a7c6-6045bdd0ef22",
      "designclassification": "Configuration",
      "workitemmodule": "",
      "gapfit": "Partial",
      "workitemisv": "5137cc2a-c4dc-ed11-a7c6-6045bdd0ef22",
      "complexity": "2 - Low",
      "buildestimatepts": "2.0000000000",
      "buildestimatehrs": "3.0000000000",
      "workitemtype": "Epic",
      "workitemtypeid": "157c2482-c4dc-ed11-a7c6-6045bdd0ef22",
      "acceptancecriteria": "AC1",
      "internalid": "DV-439"
  },

  {
      "title": "RDW2",
      "sequance": "1",
      "sequanceid": "35c5870e-3c2c-ee11-bdf4-6045bd0fcbc6",
      "parentworkitem": "d605a3ed-3b2c-ee11-bdf4-6045bd0fcbc6",
      "description": "",
      "workitemid": "36c5870e-3c2c-ee11-bdf4-6045bd0fcbc6",
      "priority": "",
      "workitemresource": "",
      "designclassification": "",
      "workitemmodule": "",
      "gapfit": "",
      "workitemisv": "",
      "complexity": "",
      "buildestimatepts": "",
      "buildestimatehrs": "",
      "workitemtype": "Feature",
      "workitemtypeid": "187c2482-c4dc-ed11-a7c6-6045bdd0ef22",
      "acceptancecriteria": "",
      "internalid": "DV-439"
  },

  {
      "title": "RDW3",
      "sequance": "1",
      "sequanceid": "d43bc8b5-062d-ee11-bdf4-6045bd0fcbc6",
      "parentworkitem": "35c5870e-3c2c-ee11-bdf4-6045bd0fcbc6",
      "description": "",
      "workitemid": "d53bc8b5-062d-ee11-bdf4-6045bd0fcbc6",
      "priority": "",
      "workitemresource": "",
      "designclassification": "",
      "workitemmodule": "",
      "gapfit": "",
      "workitemisv": "",
      "complexity": "",
      "buildestimatepts": "",
      "buildestimatehrs": "",
      "workitemtype": "User Story",
      "workitemtypeid": "68f77c92-c4dc-ed11-a7c6-6045bdd0ef22",
      "acceptancecriteria": "",
      "internalid": "DV-439"
  },

  {
      "title": "RDW4",
      "sequance": "1",
      "sequanceid": "4fdd7fc9-062d-ee11-bdf4-6045bd0fcbc6",
      "parentworkitem": "d43bc8b5-062d-ee11-bdf4-6045bd0fcbc6",
      "description": "",
      "workitemid": "50dd7fc9-062d-ee11-bdf4-6045bd0fcbc6",
      "priority": "",
      "workitemresource": "",
      "designclassification": "",
      "workitemmodule": "",
      "gapfit": "",
      "workitemisv": "",
      "complexity": "",
      "buildestimatepts": "",
      "buildestimatehrs": "",
      "workitemtype": "Task",
      "workitemtypeid": "5c7a6e8a-c4dc-ed11-a7c6-6045bdd0ef22",
      "acceptancecriteria": "",
      "internalid": "DV-439"
  },

  {
      "title": "RDW5",
      "sequance": "2",
      "sequanceid": "9f956bd6-062d-ee11-bdf4-6045bd0fcbc6",
      "parentworkitem": "d43bc8b5-062d-ee11-bdf4-6045bd0fcbc6",
      "description": "",
      "workitemid": "a0956bd6-062d-ee11-bdf4-6045bd0fcbc6",
      "priority": "",
      "workitemresource": "",
      "designclassification": "",
      "workitemmodule": "",
      "gapfit": "",
      "workitemisv": "",
      "complexity": "",
      "buildestimatepts": "",
      "buildestimatehrs": "",
      "workitemtype": "Requirement",
      "workitemtypeid": "5b7a6e8a-c4dc-ed11-a7c6-6045bdd0ef22",
      "acceptancecriteria": "",
      "internalid": "DV-439"
  },

  {
      "title": "RDW6",
      "sequance": "2",
      "sequanceid": "e43374ea-062d-ee11-bdf4-6045bd0fcbc6",
      "parentworkitem": "",
      "description": "",
      "workitemid": "e53374ea-062d-ee11-bdf4-6045bd0fcbc6",
      "priority": "",
      "workitemresource": "",
      "designclassification": "",
      "workitemmodule": "",
      "gapfit": "",
      "workitemisv": "",
      "complexity": "",
      "buildestimatepts": "",
      "buildestimatehrs": "",
      "workitemtype": "Epic",
      "workitemtypeid": "157c2482-c4dc-ed11-a7c6-6045bdd0ef22",
      "acceptancecriteria": "",
      "internalid": "DV-439"
  },

  {
      "title": "RDW7",
      "sequance": "1",
      "sequanceid": "4b8935fe-062d-ee11-bdf4-6045bd0fcbc6",
      "parentworkitem": "e43374ea-062d-ee11-bdf4-6045bd0fcbc6",
      "description": "",
      "workitemid": "4c8935fe-062d-ee11-bdf4-6045bd0fcbc6",
      "priority": "",
      "workitemresource": "",
      "designclassification": "",
      "workitemmodule": "",
      "gapfit": "",
      "workitemisv": "",
      "complexity": "",
      "buildestimatepts": "",
      "buildestimatehrs": "",
      "workitemtype": "Feature",
      "workitemtypeid": "187c2482-c4dc-ed11-a7c6-6045bdd0ef22",
      "acceptancecriteria": "",
      "internalid": "DV-439"
  },

  {
      "title": "RDW8",
      "sequance": "3",
      "sequanceid": "39ad9c4d-072d-ee11-bdf4-6045bd0fcbc6",
      "parentworkitem": "",
      "description": "",
      "workitemid": "3aad9c4d-072d-ee11-bdf4-6045bd0fcbc6",
      "priority": "",
      "workitemresource": "",
      "designclassification": "",
      "workitemmodule": "",
      "gapfit": "",
      "workitemisv": "",
      "complexity": "",
      "buildestimatepts": "",
      "buildestimatehrs": "",
      "workitemtype": "Epic",
      "workitemtypeid": "157c2482-c4dc-ed11-a7c6-6045bdd0ef22",
      "acceptancecriteria": "",
      "internalid": "DV-439"
  },

  {
      "title": "RDS_WI1",
      "sequance": "4",
      "sequanceid": "53e65bb3-072d-ee11-bdf4-6045bd0fcbc6",
      "parentworkitem": "",
      "description": "",
      "workitemid": "54e65bb3-072d-ee11-bdf4-6045bd0fcbc6",
      "priority": "",
      "workitemresource": "",
      "designclassification": "",
      "workitemmodule": "",
      "gapfit": "",
      "workitemisv": "",
      "complexity": "",
      "buildestimatepts": "",
      "buildestimatehrs": "",
      "workitemtype": "Epic",
      "workitemtypeid": "157c2482-c4dc-ed11-a7c6-6045bdd0ef22",
      "acceptancecriteria": "",
      "internalid": "DV-439_DV-440"
  },

  {
      "title": "RDS_WI2",
      "sequance": "1",
      "sequanceid": "0e3fd7bc-072d-ee11-bdf4-6045bd0fcbc6",
      "parentworkitem": "53e65bb3-072d-ee11-bdf4-6045bd0fcbc6",
      "description": "",
      "workitemid": "0f3fd7bc-072d-ee11-bdf4-6045bd0fcbc6",
      "priority": "",
      "workitemresource": "",
      "designclassification": "",
      "workitemmodule": "",
      "gapfit": "",
      "workitemisv": "",
      "complexity": "",
      "buildestimatepts": "",
      "buildestimatehrs": "",
      "workitemtype": "Feature",
      "workitemtypeid": "187c2482-c4dc-ed11-a7c6-6045bdd0ef22",
      "acceptancecriteria": "",
      "internalid": "DV-439_DV-440"
  },

  {
      "title": "RDS_WI3",
      "sequance": "1",
      "sequanceid": "8cae39d2-072d-ee11-bdf4-6045bd0fcbc6",
      "parentworkitem": "0e3fd7bc-072d-ee11-bdf4-6045bd0fcbc6",
      "description": "",
      "workitemid": "8dae39d2-072d-ee11-bdf4-6045bd0fcbc6",
      "priority": "",
      "workitemresource": "",
      "designclassification": "",
      "workitemmodule": "",
      "gapfit": "",
      "workitemisv": "",
      "complexity": "",
      "buildestimatepts": "",
      "buildestimatehrs": "",
      "workitemtype": "User Story",
      "workitemtypeid": "68f77c92-c4dc-ed11-a7c6-6045bdd0ef22",
      "acceptancecriteria": "",
      "internalid": "DV-439_DV-440"
  },

  {
      "title": "RDS_WI4",
      "sequance": "1",
      "sequanceid": "23b129e2-072d-ee11-bdf4-6045bd0fcbc6",
      "parentworkitem": "8cae39d2-072d-ee11-bdf4-6045bd0fcbc6",
      "description": "",
      "workitemid": "24b129e2-072d-ee11-bdf4-6045bd0fcbc6",
      "priority": "",
      "workitemresource": "",
      "designclassification": "",
      "workitemmodule": "",
      "gapfit": "",
      "workitemisv": "",
      "complexity": "",
      "buildestimatepts": "",
      "buildestimatehrs": "",
      "workitemtype": "Task",
      "workitemtypeid": "5c7a6e8a-c4dc-ed11-a7c6-6045bdd0ef22",
      "acceptancecriteria": "",
      "internalid": "DV-439_DV-440"
  },

  {
      "title": "RDS_WI5",
      "sequance": "2",
      "sequanceid": "dcb8e001-082d-ee11-bdf4-6045bd0fcbc6",
      "parentworkitem": "35c5870e-3c2c-ee11-bdf4-6045bd0fcbc6",
      "description": "",
      "workitemid": "ddb8e001-082d-ee11-bdf4-6045bd0fcbc6",
      "priority": "",
      "workitemresource": "",
      "designclassification": "",
      "workitemmodule": "",
      "gapfit": "",
      "workitemisv": "",
      "complexity": "",
      "buildestimatepts": "",
      "buildestimatehrs": "",
      "workitemtype": "User Story",
      "workitemtypeid": "68f77c92-c4dc-ed11-a7c6-6045bdd0ef22",
      "acceptancecriteria": "",
      "internalid": "DV-439_DV-440"
  },

  {
      "title": "RDQ_WI1",
      "sequance": "5",
      "sequanceid": "13fdb962-082d-ee11-bdf4-6045bd0fcbc6",
      "parentworkitem": "",
      "description": "",
      "workitemid": "14fdb962-082d-ee11-bdf4-6045bd0fcbc6",
      "priority": "",
      "workitemresource": "",
      "designclassification": "",
      "workitemmodule": "",
      "gapfit": "",
      "workitemisv": "",
      "complexity": "",
      "buildestimatepts": "",
      "buildestimatehrs": "",
      "workitemtype": "Epic",
      "workitemtypeid": "157c2482-c4dc-ed11-a7c6-6045bdd0ef22",
      "acceptancecriteria": "",
      "internalid": "DV-439_DV-440_DV-441"
  },

  {
      "title": "RDQ_WI2",
      "sequance": "1",
      "sequanceid": "39821b71-082d-ee11-bdf4-6045bd0fcbc6",
      "parentworkitem": "13fdb962-082d-ee11-bdf4-6045bd0fcbc6",
      "description": "",
      "workitemid": "3a821b71-082d-ee11-bdf4-6045bd0fcbc6",
      "priority": "",
      "workitemresource": "",
      "designclassification": "",
      "workitemmodule": "",
      "gapfit": "",
      "workitemisv": "",
      "complexity": "",
      "buildestimatepts": "",
      "buildestimatehrs": "",
      "workitemtype": "Feature",
      "workitemtypeid": "187c2482-c4dc-ed11-a7c6-6045bdd0ef22",
      "acceptancecriteria": "",
      "internalid": "DV-439_DV-440_DV-441"
  },

  {
      "title": "RDQ_WI3",
      "sequance": "1",
      "sequanceid": "0fe7b87c-082d-ee11-bdf4-6045bd0fcbc6",
      "parentworkitem": "39821b71-082d-ee11-bdf4-6045bd0fcbc6",
      "description": "",
      "workitemid": "10e7b87c-082d-ee11-bdf4-6045bd0fcbc6",
      "priority": "",
      "workitemresource": "",
      "designclassification": "",
      "workitemmodule": "",
      "gapfit": "",
      "workitemisv": "",
      "complexity": "",
      "buildestimatepts": "",
      "buildestimatehrs": "",
      "workitemtype": "User Story",
      "workitemtypeid": "68f77c92-c4dc-ed11-a7c6-6045bdd0ef22",
      "acceptancecriteria": "",
      "internalid": "DV-439_DV-440_DV-441"
  }

]}



const DevopsTree: React.FC = () => {

const url = new URL(window.location.href);
const queryParameters = url.searchParams;
const _navigateUrl = queryParameters.get("returnto");
const [checkedKeys, setCheckedKeys] = useState([]);
const [dataAfterSave, setDataAfterSave] = useState([]);
const [filteredTreeData, setFilteredTreeData] = useState([]);
const [workItemsBySurveyId, setWorkItemsBySurveyId] = useState<any>(workItems?.results);
const [allInternalIdsBySurveyId, setAllInternalIdsBySurveyId] = useState<any>(internalIds);
const [selectedNodes, setSelectedNodes] = useState<any>([]);
const [halfSelectedNodes, setHalfSelectedNodes] = useState<any>([]);

const setAllKeysChecked = (loadedKeys:any, {event, node}:any ) => {
  console.log("keys", loadedKeys);
  console.log("event...", event, node);
  // setCheckedKeys(keys);
}

  useEffect(()=>{
  fetchAllInternalIdsByBusinessSurveyId("")
    .then((res)=>{
      console.log("internal ids",res);
      const data:any = res?.map((item:any)=>JSON.parse(item?.data));
      setAllInternalIdsBySurveyId(data?.flatMap((obj:any) => obj.results));
    })
    .catch((err)=>console.log("error getting all ids",err));

  fetchWorkItemsByBusinessSurveyId("")
    .then((val:any)=>{
      const workItems = val?.data;
      const jsonData = JSON.parse(workItems);
      setWorkItemsBySurveyId(jsonData?.results);
    })
    .catch((err)=>console.log("error getting work items",err));
  },[])

  useEffect(()=>{
    const internalIds = allInternalIdsBySurveyId?.map((item:any)=>item?.internalid);
    const filteredData = workItemsBySurveyId?.filter((item:any)=> internalIds?.includes(item?.internalid));
    setFilteredTreeData(filteredData);
    console.log("filtered data....", filteredData);
  },[allInternalIdsBySurveyId])

  console.log("workItemsBySurveyId",workItemsBySurveyId);
  console.log("allInternalIdsBySurveyId", allInternalIdsBySurveyId);
  console.log("filteredData", filteredTreeData);

  // const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
  //   console.log('selected', selectedKeys, info.node);
  //   const nodesDetails = info?.node;
  //   if(nodesDetails){

  //   }
  // };

  const onCheck: TreeProps['onCheck'] = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info?.checkedNodes,"info..",info);
    setSelectedNodes(info?.checkedNodes);
    setHalfSelectedNodes(info?.halfCheckedKeys);
  };

  const handleMigrateToDevops = async() => {
    
    const checkedObj = filteredTreeData?.filter((node:any)=> selectedNodes?.includes(node?.workitemid));
    console.log("checked objects for migration:", checkedObj);
    // create functionality....
    // To filter the parent nodes....
    const parentNodes = selectedNodes?.filter((item:any)=> !item?.rest?.parentworkitem);
    console.log("parentNodes", parentNodes);
    console.log("halfSelectedNodes", halfSelectedNodes);
    // To get the half checked nodes with parent.....
    // const filteredNodes = halfSelectedNodes;
    console.log("selectedNodes..", selectedNodes);
    const halfCheckedData = halfSelectedNodes?.map((item:any)=>findNodeAndRelations(treeData,item));
    console.log("half checked data..", halfCheckedData);

    const result = await parentNodes?.map((item:any)=>{
       generateDevops(item, false);
    }); 

    console.log("console....", result);
    //  update functionality ..... 

  }

  // Helper function to create a new node
  const createNode =(title:any, key:any, rest:any,children?:any) =>{
    return { title, key,rest, children: children || [] };
  }

// Function to construct the tree recursively
function constructTree(data:any, parentId:any) {
  const childrenData = data.filter((item:any) => item.parentworkitem === parentId);

  const childrenNodes = childrenData.map((child:any) => {
    const { title, workitemid,...rest } = child;
    const newNode = createNode(title, workitemid, rest);
    newNode.children = constructTree(data, child.sequanceid);
 // Recursively construct children
    return newNode;
  });

  return childrenNodes;
}

// Filter data to get only items without a parent (top-level nodes)
const topLevelNodes = filteredTreeData?.filter((item:any) => !item.parentworkitem);
const topLevelNodes2 = filteredTreeData?.filter((item:any) => item.parentworkitem);

const filteredData = topLevelNodes2.filter((item:any) => {
  return !filteredTreeData?.some((otherItem:any) => otherItem.sequanceid === item.parentworkitem);
});
console.log("");

const _dataSource = [...topLevelNodes,...filteredData]

const treeData = _dataSource.map((item:any) => {
  const { title, workitemid,...rest } = item;
  const newNode = createNode(title, workitemid,rest);
  newNode.children = constructTree(filteredTreeData, item.sequanceid);
  return newNode;
});

const convertObject = (data:any) => {
  const result = data?.map((item:any) => {
    const { title, key } = item;
    const newNode = { title, key, children: [] };

    if (item.children.length > 0) {
      newNode.children = convertObject(item?.children);
    }

    return newNode;
  });

  return result;
};

const outputObject = convertObject(treeData);
console.log("outputObject",outputObject);
console.log("treeData",treeData);

useEffect(()=> {
  fetchWorkItemTypes().then((res)=> console.log("res",res)).catch((err:any)=> console.log(err))
},[])

  return (
    <>
      <Tree
        checkable
        // defaultExpandedKeys={['0-0-0', '0-0-1']}
        // defaultSelectedKeys={['0-0-0', '0-0-1']}
        // defaultCheckedKeys={['0-0-0', '0-0-1']}
        // onSelect={onSelect}
        onCheck={onCheck}
        treeData={treeData}
        onLoad={setAllKeysChecked}
      />
      <span>
        <Button
          className="cancel-btn mr-10"
          type="primary"
          htmlType="button"
          onClick={() => {
            window.location.href = `/${_navigateUrl}`;
          }}
        >
          Cancel
        </Button>

        <Button
            type="primary"
            htmlType="button"
            onClick={handleMigrateToDevops}
          >
            Migrate to DevOps
        </Button>
      </span>
    </>
  );
};

export default DevopsTree;

