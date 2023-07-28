import { Button, Tree } from 'antd';
import type { DataNode, TreeProps } from 'antd/es/tree';
import React, { useEffect, useState } from 'react';
import { fetchWorkItemTypes, generateDevops } from '../api/Api';

declare global {
  interface Window {
    webapi: any;
  }
}
const treeData1: DataNode[] = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        // disabled: true,
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0',
            // disableCheckbox: true,
          },
          {
            title: 'leaf',
            key: '0-0-0-1',
          },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [{ title: <span style={{ color: '#1677ff' }}>sss</span>, key: '0-0-1-0' }],
      },
    ],
  },
  {title: 'parent 2',
    key: '0-1',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-1',
      // disabled: true,
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0',
           // disableCheckbox: true,
          },
          {
            title: 'leaf',
            key: '0-0-0-1',
          },
        ],
      },
    ]
    }
];


const sampleData = [
  {
      "workitemtypeid@OData.Community.Display.V1.AttributeName": "gyde_workitemtypeid",
      "workitemtypeid": "157c2482-c4dc-ed11-a7c6-6045bdd0ef22",
      "description@OData.Community.Display.V1.AttributeName": "gyde_workitemdescription",
      "description": "Description",
      "workitemtype@OData.Community.Display.V1.AttributeName": "gyde_name",
      "workitemtype": "Epic",
      "title@OData.Community.Display.V1.AttributeName": "gyde_title",
      "title": "W1-edited",
      "state@OData.Community.Display.V1.AttributeName": "statecode",
      "state@OData.Community.Display.V1.FormattedValue": "Active",
      "state": 0,
      "workitemid@OData.Community.Display.V1.AttributeName": "gyde_surveyworkitemid",
      "workitemid": "787960f2-2326-ee11-9965-6045bdd0ef22",
      "sequanceid@OData.Community.Display.V1.AttributeName": "gyde_workitemtemplatesequenceid",
      "sequanceid": "777960f2-2326-ee11-9965-6045bdd0ef22",
      "sequance@OData.Community.Display.V1.AttributeName": "gyde_sequence",
      "sequance@OData.Community.Display.V1.FormattedValue": "3",
      "sequance": 3,
      "internalid@OData.Community.Display.V1.AttributeName": "gyde_relatedsurveyitemid",
      "internalid": "7125"
  },
  
  {
      "workitemtypeid@OData.Community.Display.V1.AttributeName": "gyde_workitemtypeid",
      "workitemtypeid": "5b7a6e8a-c4dc-ed11-a7c6-6045bdd0ef22",
      "internalid@OData.Community.Display.V1.AttributeName": "gyde_relatedsurveyitemid",
      "internalid": "7125_7126",
      "workitemtype@OData.Community.Display.V1.AttributeName": "gyde_name",
      "workitemtype": "Requirement",
      "title@OData.Community.Display.V1.AttributeName": "gyde_title",
      "title": "SW1",
      "state@OData.Community.Display.V1.AttributeName": "statecode",
      "state@OData.Community.Display.V1.FormattedValue": "Active",
      "state": 0,
      "workitemid@OData.Community.Display.V1.AttributeName": "gyde_surveyworkitemid",
      "workitemid": "9af7ce22-2426-ee11-9965-6045bdd0ef22",
      "sequanceid@OData.Community.Display.V1.AttributeName": "gyde_workitemtemplatesequenceid",
      "sequanceid": "99f7ce22-2426-ee11-9965-6045bdd0ef22",
      "sequance@OData.Community.Display.V1.AttributeName": "gyde_sequence",
      "sequance@OData.Community.Display.V1.FormattedValue": "5",
      "sequance": 5
  },
  {
      "workitemtypeid@OData.Community.Display.V1.AttributeName": "gyde_workitemtypeid",
      "workitemtypeid": "5c7a6e8a-c4dc-ed11-a7c6-6045bdd0ef22",
      "parentworkitem@OData.Community.Display.V1.AttributeName": "gyde_parentworkitemsequence",
      "parentworkitem@OData.Community.Display.V1.FormattedValue": "W1",
      "parentworkitem@Microsoft.Dynamics.CRM.lookuplogicalname": "gyde_workitemtemplatesequence",
      "parentworkitem": "777960f2-2326-ee11-9965-6045bdd0ef22",
      "workitemtype@OData.Community.Display.V1.AttributeName": "gyde_name",
      "workitemtype": "Task",
      "title@OData.Community.Display.V1.AttributeName": "gyde_title",
      "title": "SW2",
      "state@OData.Community.Display.V1.AttributeName": "statecode",
      "state@OData.Community.Display.V1.FormattedValue": "Active",
      "state": 0,
      "workitemid@OData.Community.Display.V1.AttributeName": "gyde_surveyworkitemid",
      "workitemid": "1f1c3b39-2426-ee11-9965-6045bdd0ef22",
      "sequanceid@OData.Community.Display.V1.AttributeName": "gyde_workitemtemplatesequenceid",
      "sequanceid": "1e1c3b39-2426-ee11-9965-6045bdd0ef22",
      "sequance@OData.Community.Display.V1.AttributeName": "gyde_sequence",
      "sequance@OData.Community.Display.V1.FormattedValue": "3",
      "sequance": 3,
      "internalid@OData.Community.Display.V1.AttributeName": "gyde_relatedsurveyitemid",
      "internalid": "7125_7127"
  },
  {
      "workitemtypeid@OData.Community.Display.V1.AttributeName": "gyde_workitemtypeid",
      "workitemtypeid": "68f77c92-c4dc-ed11-a7c6-6045bdd0ef22",
      "parentworkitem@OData.Community.Display.V1.AttributeName": "gyde_parentworkitemsequence",
      "parentworkitem@OData.Community.Display.V1.FormattedValue": "LastW",
      "parentworkitem@Microsoft.Dynamics.CRM.lookuplogicalname": "gyde_workitemtemplatesequence",
      "parentworkitem": "a69a3e5c-2d26-ee11-9965-6045bdd0ef22",
      "workitemtype@OData.Community.Display.V1.AttributeName": "gyde_name",
      "workitemtype": "User Story",
      "title@OData.Community.Display.V1.AttributeName": "gyde_title",
      "title": "SP2",
      "state@OData.Community.Display.V1.AttributeName": "statecode",
      "state@OData.Community.Display.V1.FormattedValue": "Active",
      "state": 0,
      "workitemid@OData.Community.Display.V1.AttributeName": "gyde_surveyworkitemid",
      "workitemid": "e0b8bd67-2c26-ee11-9965-6045bdd0ef22",
      "sequanceid@OData.Community.Display.V1.AttributeName": "gyde_workitemtemplatesequenceid",
      "sequanceid": "dfb8bd67-2c26-ee11-9965-6045bdd0ef22",
      "sequance@OData.Community.Display.V1.AttributeName": "gyde_sequence",
      "sequance@OData.Community.Display.V1.FormattedValue": "1",
      "sequance": 1,
      "internalid@OData.Community.Display.V1.AttributeName": "gyde_relatedsurveyitemid",
      "internalid": "7125"
  },
  {
      "workitemtypeid@OData.Community.Display.V1.AttributeName": "gyde_workitemtypeid",
      "workitemtypeid": "68f77c92-c4dc-ed11-a7c6-6045bdd0ef22",
      "parentworkitem@OData.Community.Display.V1.AttributeName": "gyde_parentworkitemsequence",
      "parentworkitem@OData.Community.Display.V1.FormattedValue": "W2",
      "parentworkitem@Microsoft.Dynamics.CRM.lookuplogicalname": "gyde_workitemtemplatesequence",
      "parentworkitem": "d6692101-2426-ee11-9965-6045bdd0ef22",
      "workitemtype@OData.Community.Display.V1.AttributeName": "gyde_name",
      "workitemtype": "User Story",
      "title@OData.Community.Display.V1.AttributeName": "gyde_title",
      "title": "LastW",
      "state@OData.Community.Display.V1.AttributeName": "statecode",
      "state@OData.Community.Display.V1.FormattedValue": "Active",
      "state": 0,
      "workitemid@OData.Community.Display.V1.AttributeName": "gyde_surveyworkitemid",
      "workitemid": "a79a3e5c-2d26-ee11-9965-6045bdd0ef22",
      "sequanceid@OData.Community.Display.V1.AttributeName": "gyde_workitemtemplatesequenceid",
      "sequanceid": "a69a3e5c-2d26-ee11-9965-6045bdd0ef22",
      "sequance@OData.Community.Display.V1.AttributeName": "gyde_sequence",
      "sequance@OData.Community.Display.V1.FormattedValue": "1",
      "sequance": 1,
      "internalid@OData.Community.Display.V1.AttributeName": "gyde_relatedsurveyitemid",
      "internalid": "7125"
  },
  {
      "workitemtypeid@OData.Community.Display.V1.AttributeName": "gyde_workitemtypeid",
      "workitemtypeid": "187c2482-c4dc-ed11-a7c6-6045bdd0ef22",
      "internalid@OData.Community.Display.V1.AttributeName": "gyde_relatedsurveyitemid",
      "internalid": "7125",
      "workitemtype@OData.Community.Display.V1.AttributeName": "gyde_name",
      "workitemtype": "Feature",
      "title@OData.Community.Display.V1.AttributeName": "gyde_title",
      "title": "TestParentRDEdit",
      "state@OData.Community.Display.V1.AttributeName": "statecode",
      "state@OData.Community.Display.V1.FormattedValue": "Active",
      "state": 0,
      "workitemid@OData.Community.Display.V1.AttributeName": "gyde_surveyworkitemid",
      "workitemid": "43d9623a-bc26-ee11-9965-6045bdd0ef22",
      "sequanceid@OData.Community.Display.V1.AttributeName": "gyde_workitemtemplatesequenceid",
      "sequanceid": "42d9623a-bc26-ee11-9965-6045bdd0ef22",
      "sequance@OData.Community.Display.V1.AttributeName": "gyde_sequence",
      "sequance@OData.Community.Display.V1.FormattedValue": "4",
      "sequance": 4
  },
  {
      "workitemtypeid@OData.Community.Display.V1.AttributeName": "gyde_workitemtypeid",
      "workitemtypeid": "5b7a6e8a-c4dc-ed11-a7c6-6045bdd0ef22",
      "parentworkitem@OData.Community.Display.V1.AttributeName": "gyde_parentworkitemsequence",
      "parentworkitem@OData.Community.Display.V1.FormattedValue": "TestParentRD",
      "parentworkitem@Microsoft.Dynamics.CRM.lookuplogicalname": "gyde_workitemtemplatesequence",
      "parentworkitem": "42d9623a-bc26-ee11-9965-6045bdd0ef22",
      "workitemtype@OData.Community.Display.V1.AttributeName": "gyde_name",
      "workitemtype": "Requirement",
      "title@OData.Community.Display.V1.AttributeName": "gyde_title",
      "title": "RD903",
      "state@OData.Community.Display.V1.AttributeName": "statecode",
      "state@OData.Community.Display.V1.FormattedValue": "Active",
      "state": 0,
      "workitemid@OData.Community.Display.V1.AttributeName": "gyde_surveyworkitemid",
      "workitemid": "5bb65560-7727-ee11-9965-6045bdd0ef22",
      "sequanceid@OData.Community.Display.V1.AttributeName": "gyde_workitemtemplatesequenceid",
      "sequanceid": "5ab65560-7727-ee11-9965-6045bdd0ef22",
      "sequance@OData.Community.Display.V1.AttributeName": "gyde_sequence",
      "sequance@OData.Community.Display.V1.FormattedValue": "2",
      "sequance": 2,
      "internalid@OData.Community.Display.V1.AttributeName": "gyde_relatedsurveyitemid",
      "internalid": "7129"
  }
]



const DevopsTree: React.FC = () => {

const url = new URL(window.location.href);
const queryParameters = url.searchParams;
const _navigateUrl = queryParameters.get("returnto");
const [checkedKeys, setCheckedKeys] = useState([]);
const [dataAfterSave, setDataAfterSave] = useState([]);

const setAllKeysChecked = (keys?:any) => {
  console.log("keys", keys);
  // setCheckedKeys(keys);
}

  // useEffect(()=>{
  // setAllKeysChecked();
  // },[])

  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info.node);
  };

  const onCheck: TreeProps['onCheck'] = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info.node);
  };

  const handleMigrateToDevops = async() => {
    const result = await generateDevops();

    console.log("console....", result);
  }

  // const checkAllKeys = async() :any=> {

  // }

  // Helper function to create a new node
const createNode =(title:any, key:any, rest:any,children?:any) =>{
  return { title, key,rest, children: children || [] };
}

// Function to construct the tree recursively
function constructTree(data:any, parentId:any) {
  const childrenData = data.filter((item:any) => item.parentworkitem === parentId);

  const childrenNodes = childrenData.map((child:any) => {
    const { title, workitemtypeid,...rest } = child;
    const newNode = createNode(title, workitemtypeid,rest);
    newNode.children = constructTree(data, child.sequanceid); // Recursively construct children
    return newNode;
  });

  return childrenNodes;
}

// Filter data to get only items without a parent (top-level nodes)
const topLevelNodes = sampleData.filter(item => !item.parentworkitem);
const topLevelNodes2 = sampleData.filter(item => item.parentworkitem);

const filteredData = topLevelNodes2.filter(item => {
  return !sampleData.some(otherItem => otherItem.sequanceid === item.parentworkitem);
});
console.log("");

const _dataSource = [...topLevelNodes,...filteredData]

const treeData = _dataSource.map(item => {
  const { title, workitemid ,...rest} = item;
  const newNode = createNode(title, workitemid,rest);
  newNode.children = constructTree(sampleData, item.sequanceid);
  return newNode;
});

const convertObject = (data:any) => {
  const result = data.map((item:any) => {
    const { title, key } = item;
    const newNode = { title, key, children: [] };

    if (item.children.length > 0) {
      newNode.children = convertObject(item.children);
    }

    return newNode;
  });

  return result;
};

const outputObject = convertObject(treeData);
console.log(outputObject);
console.log(treeData);

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
        onSelect={onSelect}
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

