let Config = {};

Config.clientSettings = {
  "client_id": "97151530-f9ce-4127-887d-31375c0fa784",
  "scope"    : "patient/*.* openid profile"
}

Config.submitEndpoint = "/Measure/measure-mrp/$submit-data";

Config.payerEndpoints = [{
    "name": "HSPC Payer Demo (Secure)",
    "type": "secure-smart",
    "url": "https://api.logicahealth.org/MedRecDemo/data",
    "clientID": "97151530-f9ce-4127-887d-31375c0fa784",
    "scope": "user/*.write" // offline_access
  }
]

// default configuration
Config.configSetting = 1; // HSPC Payer Demo (Open)
Config.payerEndpoint = Config.payerEndpoints[Config.configSetting];

Config.scenarios = {
  "patient01": {
    "lists": ["list01", "list02"],
    "location": "location01",
    "description": "Mr. Webster is a 72 y.o. male who was discharged from the hospital 10 days ago. He was admitted for an exacerbation of heart failure due to fluid overload due to dietary changes. His weight had increased by 15 pounds compared to his last outpatient visit 6 weeks earlier. His echocardiogram showed a stable ejection fraction of 25% compared to 8 months prior. He was treated with diuretics, and his medications were adjusted at discharge.<br/><br/>As the follow-up physician, you will be reconciling Mr. Webster's discharge medication list against his last outpatient medication list."
  },
  "patient02": {
    "lists": ["list03", "list04"],
    "location": "location02",
    "description": "Mr. Bernard is a 51 y.o. male with a history of hypertension and gout who was discharged from the hospital 3 days ago following a 3 day admission for acute left lower lobe pneumonia. He was discharged on an oral antibiotics and instructed to follow-up with his primary care physician within 5 days of discharge.<br/><br/>As the follow-up physician, you will be reconciling Mr. Bernard's discharge medication list against his last outpatient medication list."
  },
  "patient03": {
    "lists": ["list05", "list06"],
    "location": "location03",
    "description": "Ms. Hartman is a 35y.o. previously healthy female who was discharged from the hospital 10 days prior following a 2 day admission for acute pyelonephritis. She was discharged on oral antibiotics and instructed to follow-up with her primary care physician within 2 weeks.<br/><br/>As the follow-up physician, you will be reconciling Ms. Hartman's discharge medication list against his last outpatient medication list."
  },
  "patient04": {
    "lists": ["list07", "list08"],
    "location": "location01",
    "description": "Viet to put in"
  },
  "cf-1548845717752": {
    "lists": ["cf-1549030480855", "cf-1549030685865"],
    "location": "location01",
    "description": "You the primary care provider who is seeing Dara Kim for a discharge follow-up appointment. She was admitted to the hospital for evaluation of chest pain. She was found to have coronary disease and received a stent. She was discharged seven days ago. During this visit you will be performing a post-discharge medication reconciliation and attest to completing the reconciliation."
  }
}

Config.newListResource = {
    "resourceType": "List",
    "id": "LISTIDHERE",
    "status": "current",
    "subject": {
        "reference": "Patient/PATIENTID"
    },
    "date": "DATEHERE",
    "mode": "working",
    "title": "Reconciled Medications",
    "entry": []
}

Config.operationPayload = {
    "resourceType": "Parameters",
    "id": "OPERATIONID",
    "parameter": [
      {
        "name": "measure-report",
        "resource": {
            "resourceType": "MeasureReport",
            "meta": {
              "profile": ["http://hl7.org/fhir/us/davinci-deqm/STU3/StructureDefinition/measurereport-deqm"]
            },
            "id": "MEASUREREPORTID",
            "status": "complete",
            "type": "individual",
            "measure": {
                "reference": "https://ncqa.org/fhir/ig/Measure/measure-mrp"
            },
            "patient": {
                "reference": "Patient/PATIENTID"
            },
            "date": "TIMESTAMP",
            "period": {
                "start": "TIMESTAMP",
                "end": "TIMESTAMP"
            },
            "reportingOrganization": {
                "reference": "Organization/ORGANIZATIONID"
            },
            "evaluatedResources": {
              "extension": [
                {
                  "url": "http://hl7.org/fhir/us/davinci-deqm/StructureDefinition/extension-referenceAny",
                  "valueReference": {
                    "reference": "Task/TASKID"
                  }
                }
              ]
            }
        }
      },
      {
        "name": "resource",
        "resource": {
            "resourceType": "Task",
            "meta": {
              "profile": ["http://hl7.org/fhir/us/hedis/StructureDefinition/hedis-task"]
            },
            "id": "TASKID",
            "identifier" : [
              {
                "system" : "http://www.acme.org/tasks",
                "value" : "12345"
              }
            ],            
            "status": "completed",
            "intent": "plan",
            "priority": "routine",
            "code": {
                "coding":[
                    {
                        "system": "http://www.ama-assn.org/go/cpt",
                        "code": "1111F",
                        "display": "Medication Reconciliation"
                    }
                ]
            },
            "for": {
              "reference": "Patient/PATIENTID"
            },
            "context": {
              "reference": "Encounter/ENCOUNTERID"
            },
            "authoredOn": "TIMESTAMP",
            "executionPeriod": {
              "start": "TIMESTAMP",
              "end": "TIMESTAMP"
            },
            "owner": {
              "reference": "Practitioner/PRACTITIONERID"
            }
        }
      },
      {
        "name": "resource",
        "resource": {
            "resourceType": "Patient"
        }
      },
      {
        "name": "resource",
        "resource": {
            "resourceType": "Location"
        }          
      },
      {
        "name": "resource",
        "resource": {
            "resourceType": "Practitioner"
        }
      },
      {
        "name": "resource",
        "resource": {
            "resourceType": "Organization"
        }
      },
      {
        "name": "resource",
        "resource": {
            "resourceType": "Encounter",
            "id": "ENCOUNTERID",
            "meta": {
              "profile": ["http://hl7.org/fhir/us/qicore/StructureDefinition/qicore-encounter"]
            },
            "status": "finished",
            "class": {
              "system": "http://hl7.org/fhir/v3/ActCode",
              "code": "AMB",
              "display": "ambulatory"
            },
            "type": [
              {
                "coding": [
                  {
                    "system": "http://snomed.info/sct",
                    "code": "390906007",
                    "display": "Follow-up encounter (procedure)"
                  }
                ]
              }
            ],
            "period": {
                "start": "TIMESTAMP",
                "end": "TIMESTAMP"
            },
            "subject": {
              "reference": "Patient/PATIENTID"
            },
            "location": [{
              "location": {
                  "reference": "Location/LOCATIONID"
              }
            }],
            "participant": [
              {
                "individual": {
                  "reference": "Practitioner/PRACTITIONERID"
                }
              }
            ],
            "serviceProvider": {
              "reference": "Organization/ORGANIZATIONID"
            }
        }
      },
      {
        "name": "resource",
        "resource": {
            "resourceType": "Coverage"
          }
      }
    ]
}

Config.postDischargeReconciliationCoding = {
  "system": "http://snomed.info/sct",
  "code": "430193006",
  "display": "Generic Medication Reconciliation"
}

export default Config;
