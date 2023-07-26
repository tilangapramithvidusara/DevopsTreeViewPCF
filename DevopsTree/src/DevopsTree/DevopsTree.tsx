import { Button, Tree } from 'antd';
import type { DataNode, TreeProps } from 'antd/es/tree';
import React, { useEffect, useState } from 'react';
import { generateDevops } from '../api/Api';

const treeData: DataNode[] = [
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
        disabled: true,
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0',
            disableCheckbox: true,
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
    console.log('selected', selectedKeys, info);
  };

  const onCheck: TreeProps['onCheck'] = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
  };

  const handleMigrateToDevops = async() => {
    const result = await generateDevops();

    console.log("console....", result);
  }

  // const checkAllKeys = async() :any=> {

  // }

  return (
    <>
      <Tree
        checkable
        defaultExpandedKeys={['0-0-0', '0-0-1']}
        defaultSelectedKeys={['0-0-0', '0-0-1']}
        defaultCheckedKeys={['0-0-0', '0-0-1']}
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