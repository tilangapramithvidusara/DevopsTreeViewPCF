import { Button, Tree } from 'antd';
import type { DataNode, TreeProps } from 'antd/es/tree';
import React, { useEffect, useState } from 'react';
import { fetchAllInternalIdsByBusinessSurveyId, fetchWorkItemTypes, fetchWorkItemsByBusinessSurveyId, generateDevops } from '../api/Api';

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


// const sampleData = [
//   {
//       "workitemtypeid@OData.Community.Display.V1.AttributeName": "gyde_workitemtypeid",
//       "workitemtypeid": "157c2482-c4dc-ed11-a7c6-6045bdd0ef22",
//       "description@OData.Community.Display.V1.AttributeName": "gyde_workitemdescription",
//       "description": "Description",
//       "workitemtype@OData.Community.Display.V1.AttributeName": "gyde_name",
//       "workitemtype": "Epic",
//       "title@OData.Community.Display.V1.AttributeName": "gyde_title",
//       "title": "W1-edited",
//       "state@OData.Community.Display.V1.AttributeName": "statecode",
//       "state@OData.Community.Display.V1.FormattedValue": "Active",
//       "state": 0,
//       "workitemid@OData.Community.Display.V1.AttributeName": "gyde_surveyworkitemid",
//       "workitemid": "787960f2-2326-ee11-9965-6045bdd0ef22",
//       "sequanceid@OData.Community.Display.V1.AttributeName": "gyde_workitemtemplatesequenceid",
//       "sequanceid": "777960f2-2326-ee11-9965-6045bdd0ef22",
//       "sequance@OData.Community.Display.V1.AttributeName": "gyde_sequence",
//       "sequance@OData.Community.Display.V1.FormattedValue": "3",
//       "sequance": 3,
//       "internalid@OData.Community.Display.V1.AttributeName": "gyde_relatedsurveyitemid",
//       "internalid": "7125"
//   },
  
//   {
//       "workitemtypeid@OData.Community.Display.V1.AttributeName": "gyde_workitemtypeid",
//       "workitemtypeid": "5b7a6e8a-c4dc-ed11-a7c6-6045bdd0ef22",
//       "internalid@OData.Community.Display.V1.AttributeName": "gyde_relatedsurveyitemid",
//       "internalid": "7125_7126",
//       "workitemtype@OData.Community.Display.V1.AttributeName": "gyde_name",
//       "workitemtype": "Requirement",
//       "title@OData.Community.Display.V1.AttributeName": "gyde_title",
//       "title": "SW1",
//       "state@OData.Community.Display.V1.AttributeName": "statecode",
//       "state@OData.Community.Display.V1.FormattedValue": "Active",
//       "state": 0,
//       "workitemid@OData.Community.Display.V1.AttributeName": "gyde_surveyworkitemid",
//       "workitemid": "9af7ce22-2426-ee11-9965-6045bdd0ef22",
//       "sequanceid@OData.Community.Display.V1.AttributeName": "gyde_workitemtemplatesequenceid",
//       "sequanceid": "99f7ce22-2426-ee11-9965-6045bdd0ef22",
//       "sequance@OData.Community.Display.V1.AttributeName": "gyde_sequence",
//       "sequance@OData.Community.Display.V1.FormattedValue": "5",
//       "sequance": 5
//   },
//   {
//       "workitemtypeid@OData.Community.Display.V1.AttributeName": "gyde_workitemtypeid",
//       "workitemtypeid": "5c7a6e8a-c4dc-ed11-a7c6-6045bdd0ef22",
//       "parentworkitem@OData.Community.Display.V1.AttributeName": "gyde_parentworkitemsequence",
//       "parentworkitem@OData.Community.Display.V1.FormattedValue": "W1",
//       "parentworkitem@Microsoft.Dynamics.CRM.lookuplogicalname": "gyde_workitemtemplatesequence",
//       "parentworkitem": "777960f2-2326-ee11-9965-6045bdd0ef22",
//       "workitemtype@OData.Community.Display.V1.AttributeName": "gyde_name",
//       "workitemtype": "Task",
//       "title@OData.Community.Display.V1.AttributeName": "gyde_title",
//       "title": "SW2",
//       "state@OData.Community.Display.V1.AttributeName": "statecode",
//       "state@OData.Community.Display.V1.FormattedValue": "Active",
//       "state": 0,
//       "workitemid@OData.Community.Display.V1.AttributeName": "gyde_surveyworkitemid",
//       "workitemid": "1f1c3b39-2426-ee11-9965-6045bdd0ef22",
//       "sequanceid@OData.Community.Display.V1.AttributeName": "gyde_workitemtemplatesequenceid",
//       "sequanceid": "1e1c3b39-2426-ee11-9965-6045bdd0ef22",
//       "sequance@OData.Community.Display.V1.AttributeName": "gyde_sequence",
//       "sequance@OData.Community.Display.V1.FormattedValue": "3",
//       "sequance": 3,
//       "internalid@OData.Community.Display.V1.AttributeName": "gyde_relatedsurveyitemid",
//       "internalid": "7125_7127"
//   },
//   {
//       "workitemtypeid@OData.Community.Display.V1.AttributeName": "gyde_workitemtypeid",
//       "workitemtypeid": "68f77c92-c4dc-ed11-a7c6-6045bdd0ef22",
//       "parentworkitem@OData.Community.Display.V1.AttributeName": "gyde_parentworkitemsequence",
//       "parentworkitem@OData.Community.Display.V1.FormattedValue": "LastW",
//       "parentworkitem@Microsoft.Dynamics.CRM.lookuplogicalname": "gyde_workitemtemplatesequence",
//       "parentworkitem": "a69a3e5c-2d26-ee11-9965-6045bdd0ef22",
//       "workitemtype@OData.Community.Display.V1.AttributeName": "gyde_name",
//       "workitemtype": "User Story",
//       "title@OData.Community.Display.V1.AttributeName": "gyde_title",
//       "title": "SP2",
//       "state@OData.Community.Display.V1.AttributeName": "statecode",
//       "state@OData.Community.Display.V1.FormattedValue": "Active",
//       "state": 0,
//       "workitemid@OData.Community.Display.V1.AttributeName": "gyde_surveyworkitemid",
//       "workitemid": "e0b8bd67-2c26-ee11-9965-6045bdd0ef22",
//       "sequanceid@OData.Community.Display.V1.AttributeName": "gyde_workitemtemplatesequenceid",
//       "sequanceid": "dfb8bd67-2c26-ee11-9965-6045bdd0ef22",
//       "sequance@OData.Community.Display.V1.AttributeName": "gyde_sequence",
//       "sequance@OData.Community.Display.V1.FormattedValue": "1",
//       "sequance": 1,
//       "internalid@OData.Community.Display.V1.AttributeName": "gyde_relatedsurveyitemid",
//       "internalid": "7125"
//   },
//   {
//       "workitemtypeid@OData.Community.Display.V1.AttributeName": "gyde_workitemtypeid",
//       "workitemtypeid": "68f77c92-c4dc-ed11-a7c6-6045bdd0ef22",
//       "parentworkitem@OData.Community.Display.V1.AttributeName": "gyde_parentworkitemsequence",
//       "parentworkitem@OData.Community.Display.V1.FormattedValue": "W2",
//       "parentworkitem@Microsoft.Dynamics.CRM.lookuplogicalname": "gyde_workitemtemplatesequence",
//       "parentworkitem": "d6692101-2426-ee11-9965-6045bdd0ef22",
//       "workitemtype@OData.Community.Display.V1.AttributeName": "gyde_name",
//       "workitemtype": "User Story",
//       "title@OData.Community.Display.V1.AttributeName": "gyde_title",
//       "title": "LastW",
//       "state@OData.Community.Display.V1.AttributeName": "statecode",
//       "state@OData.Community.Display.V1.FormattedValue": "Active",
//       "state": 0,
//       "workitemid@OData.Community.Display.V1.AttributeName": "gyde_surveyworkitemid",
//       "workitemid": "a79a3e5c-2d26-ee11-9965-6045bdd0ef22",
//       "sequanceid@OData.Community.Display.V1.AttributeName": "gyde_workitemtemplatesequenceid",
//       "sequanceid": "a69a3e5c-2d26-ee11-9965-6045bdd0ef22",
//       "sequance@OData.Community.Display.V1.AttributeName": "gyde_sequence",
//       "sequance@OData.Community.Display.V1.FormattedValue": "1",
//       "sequance": 1,
//       "internalid@OData.Community.Display.V1.AttributeName": "gyde_relatedsurveyitemid",
//       "internalid": "7125"
//   },
//   {
//       "workitemtypeid@OData.Community.Display.V1.AttributeName": "gyde_workitemtypeid",
//       "workitemtypeid": "187c2482-c4dc-ed11-a7c6-6045bdd0ef22",
//       "internalid@OData.Community.Display.V1.AttributeName": "gyde_relatedsurveyitemid",
//       "internalid": "7125",
//       "workitemtype@OData.Community.Display.V1.AttributeName": "gyde_name",
//       "workitemtype": "Feature",
//       "title@OData.Community.Display.V1.AttributeName": "gyde_title",
//       "title": "TestParentRDEdit",
//       "state@OData.Community.Display.V1.AttributeName": "statecode",
//       "state@OData.Community.Display.V1.FormattedValue": "Active",
//       "state": 0,
//       "workitemid@OData.Community.Display.V1.AttributeName": "gyde_surveyworkitemid",
//       "workitemid": "43d9623a-bc26-ee11-9965-6045bdd0ef22",
//       "sequanceid@OData.Community.Display.V1.AttributeName": "gyde_workitemtemplatesequenceid",
//       "sequanceid": "42d9623a-bc26-ee11-9965-6045bdd0ef22",
//       "sequance@OData.Community.Display.V1.AttributeName": "gyde_sequence",
//       "sequance@OData.Community.Display.V1.FormattedValue": "4",
//       "sequance": 4
//   },
//   {
//       "workitemtypeid@OData.Community.Display.V1.AttributeName": "gyde_workitemtypeid",
//       "workitemtypeid": "5b7a6e8a-c4dc-ed11-a7c6-6045bdd0ef22",
//       "parentworkitem@OData.Community.Display.V1.AttributeName": "gyde_parentworkitemsequence",
//       "parentworkitem@OData.Community.Display.V1.FormattedValue": "TestParentRD",
//       "parentworkitem@Microsoft.Dynamics.CRM.lookuplogicalname": "gyde_workitemtemplatesequence",
//       "parentworkitem": "42d9623a-bc26-ee11-9965-6045bdd0ef22",
//       "workitemtype@OData.Community.Display.V1.AttributeName": "gyde_name",
//       "workitemtype": "Requirement",
//       "title@OData.Community.Display.V1.AttributeName": "gyde_title",
//       "title": "RD903",
//       "state@OData.Community.Display.V1.AttributeName": "statecode",
//       "state@OData.Community.Display.V1.FormattedValue": "Active",
//       "state": 0,
//       "workitemid@OData.Community.Display.V1.AttributeName": "gyde_surveyworkitemid",
//       "workitemid": "5bb65560-7727-ee11-9965-6045bdd0ef22",
//       "sequanceid@OData.Community.Display.V1.AttributeName": "gyde_workitemtemplatesequenceid",
//       "sequanceid": "5ab65560-7727-ee11-9965-6045bdd0ef22",
//       "sequance@OData.Community.Display.V1.AttributeName": "gyde_sequence",
//       "sequance@OData.Community.Display.V1.FormattedValue": "2",
//       "sequance": 2,
//       "internalid@OData.Community.Display.V1.AttributeName": "gyde_relatedsurveyitemid",
//       "internalid": "7129"
//   }
// ]

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
      "priority": "🟥 1",
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
const [workItemsBySurveyId, setWorkItemsBySurveyId] = useState<any>([workItems?.results]);
const [allInternalIdsBySurveyId, setAllInternalIdsBySurveyId] = useState([internalIds]);

const setAllKeysChecked = (keys?:any) => {
  console.log("keys", keys);
  // setCheckedKeys(keys);
}

  useEffect(()=>{

  fetchAllInternalIdsByBusinessSurveyId("")
    .then((res)=>{
      console.log("internal ids",res);
      const data:any = res?.map((item:any)=>JSON.parse(item?.data));
      // setAllInternalIdsBySurveyId(data?.flatMap((obj:any) => obj.results));
    })
    .catch((err)=>console.log("error getting all ids",err));

  fetchWorkItemsByBusinessSurveyId("")
    .then((val:any)=>{
      console.log("response..", val);
      const value = val;
      console.log("trim only value",value)
      const workItems = val?.data;
      // workItemsBySurveyId(workItems);
      console.log("workItems..", workItems);
      const allWorkItems = val?.data?.results;
      console.log("all workItems..", allWorkItems);
      const jsonData = JSON.parse(workItems);
      console.log("converted data..", jsonData)
    })
    .catch((err)=>console.log("error getting work items",err));

    const filteredData = workItemsBySurveyId?.filter((item:any)=> allInternalIdsBySurveyId?.find((id:any)=> id?.internalid ==item?.internalid));
    setFilteredTreeData(filteredData);
    console.log("filteredData", filteredData);
  },[])
  console.log("workItemsBySurveyId",workItemsBySurveyId);
  console.log("allInternalIdsBySurveyId", allInternalIdsBySurveyId);
  console.log("filteredData", filteredTreeData);

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
    const newNode = createNode(title, workitemtypeid, rest);
    if(child?.sequanceid){
      newNode.children = constructTree(data, child.sequanceid);
    }
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
  // if(item?.sequanceid){
    newNode.children = constructTree(filteredTreeData, item.sequanceid);
  // }
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

