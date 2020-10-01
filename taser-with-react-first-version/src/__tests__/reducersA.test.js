import C from '../store/constants-a'
import { tasers } from '../store/reducers-a'
import { addTaser, 
        removeTaser,
        renameTaser,
        addDayInTaser,
        removeDayInTaser,
        addUserAndVacationInDayInTaser,
        removeOneUserAtWorkInDayInTaser,
        addUserInTaserConfig, 
        removeUserInTaserConfig,
        addVacationInTaserConfig,
        removeVacationInTaserConfig,
        addPartialtimeInUserConfig,
        removeOnePartialtimeInUserInTaserConfig,
        addtasersSharedInVacationConfig,
        removeOneSharedtaserInVacationInTaserConfig,
        addUserAndDesiderataInDayInTaser,
        removeOneUserWithDesiderataInDayInTaser} from '../store/actions-a'

describe("tasers Reducer", () => {

    it('ADD_TASER sucess', () => {
        const state = [
                        {taserDef:{taserId:15,name:"taserDesCprs"},
                        taserDays:[],
                        users:[],
                        vacations:[]},
                        {taserDef:{taserId:16,name:"taserDesCprs"},
                        taserDays:[],
                        users:[],
                        vacations:[]}
        ]
        const action = {
            type: C.ADD_TASER,
            taserDef:{taserId:0,name:"taserDesPars"},
            taserDays:[],
            users:[],
            vacations:[]
        }
        const results = tasers(state,action)
        expect(results)
            .toEqual([
                {taserDef:{taserId:15,name:"taserDesCprs"},
                taserDays:[],
                users:[],
                vacations:[]},
                {taserDef:{taserId:16,name:"taserDesCprs"},
                taserDays:[],
                users:[],
                vacations:[]},
                {taserDef:{taserId:0,name:"taserDesPars"},
                taserDays:[],
                users:[],
                vacations:[]}
            ])
    })

    it('ADD_TASER with action creator sucess', () => {
        const state = []
        const action = addTaser("taserDesCprs")
        const results = tasers(state,action)
        expect(results)
            .toEqual([
                {taserDef:{taserId:action.taserDef.taserId,name:"taserDesCprs"},
                taserDays:[],
                users:[],
                vacations:[]}
            ])
    })

    it('REMOVE_TASER with action creator sucess', () => {
        const state = [                
                        {taserDef:{taserId:15,name:"taserDesCprs"},
                        taserDays:[],
                        users:[],
                        vacations:[]},
                        {taserDef:{taserId:16,name:"taserDesCprs"},
                        taserDays:[],
                        users:[],
                        vacations:[]}
                    ]
        const action = removeTaser(15)
        const results = tasers(state,action)
        expect(results)
            .toEqual([
                {taserDef:{taserId:16,name:"taserDesCprs"},
                taserDays:[],
                users:[],
                vacations:[]}
            ])
    })

    it('UPDATE_TASER_DEF with action creator sucess', () => {
        const state = [                
                        {taserDef:{taserId:15,name:"taserDesCprs"},
                        taserDays:[],
                        users:[],
                        vacations:[]},
                        {taserDef:{taserId:16,name:"taserDesCprs"},
                        taserDays:[],
                        users:[],
                        vacations:[]}
                    ]
        const action = renameTaser(15,"NouveauNom")
        const results = tasers(state,action)
        expect(results)
            .toEqual([
                        {taserDef:{taserId:15,name:"NouveauNom"},
                        taserDays:[],
                        users:[],
                        vacations:[]},
                        {taserDef:{taserId:16,name:"taserDesCprs"},
                        taserDays:[],
                        users:[],
                        vacations:[]}
            ])
    })

    it('ADD_TASER_DAY with action creator sucess', () => {
        const state = [                
                        {taserDef:{taserId:17,name:"taserDesCprs"},
                        taserDays:[
                            {dayId:12,
                            dayDate:"unedate1",
                            dayAtWorkUsers:[],
                            dayWithDesiderataUsers:[]}
                        ],
                        users:[],
                        vacations:[]},
                    ]
        const action = addDayInTaser(new Date(2020,1,1).toString(),17)
        const results = tasers(state,action)
        expect(results)
            .toEqual([
                {taserDef:{taserId:17,name:"taserDesCprs"},
                taserDays:[ 
                            {dayId:12,
                            dayDate:"unedate1",
                            dayAtWorkUsers:[],
                            dayWithDesiderataUsers:[]},
                            {dayId:action.dayId,
                            dayDate:action.dayDate,
                            dayAtWorkUsers:action.dayAtWorkUsers,
                            dayWithDesiderataUsers:action.dayWithDesiderataUsers
                            }
                ],
                users:[],
                vacations:[]}
            ])
    })

    it('REMOVE_TASER_DAY with action creator sucess', () => {
        const state = [                
                        {taserDef:{taserId:17,name:"taserDesCprs"},
                        taserDays:[
                            {dayId:12,
                            dayDate:"unedate1",
                            dayAtWorkUsers:[]},
                            {dayId:13,
                            dayDate:"unedate2",
                            dayAtWorkUsers:[]}
                        ],
                        users:[],
                        vacations:[]},
                        {taserDef:{taserId:28,name:"taserDesCs"},
                        taserDays:[
                            {dayId:"day1",
                            dayDate:"unedate3",
                            dayAtWorkUsers:[]},
                            {dayId:"day2",
                            dayDate:"unedate4",
                            dayAtWorkUsers:[]}
                        ],
                        users:[],
                        vacations:[]}
                    ]
        const action = removeDayInTaser("day1",28)
        const results = tasers(state,action)
        expect(results)
            .toEqual([
                        {taserDef:{taserId:17,name:"taserDesCprs"},
                        taserDays:[
                            {dayId:12,
                            dayDate:"unedate1",
                            dayAtWorkUsers:[]},
                            {dayId:13,
                            dayDate:"unedate2",
                            dayAtWorkUsers:[]}
                            ],
                        users:[],
                        vacations:[]},
                        {taserDef:{taserId:28,name:"taserDesCs"},
                        taserDays:[
                            {dayId:"day2",
                            dayDate:"unedate4",
                            dayAtWorkUsers:[]}
                            ],
                        users:[],
                        vacations:[]}
            ])
    })

    it('ADD_TASER_DAY_AT_WORK_USER with action creator sucess', () => {
        const state = [                
                        {taserDef:{taserId:17,name:"taserDesCprs"},
                        taserDays:[
                            {dayId:12,
                            dayDate:"unedate1",
                            dayAtWorkUsers:[]},
                            {dayId:13,
                            dayDate:"unedate2",
                            dayAtWorkUsers:[]}
                        ],
                        users:[],
                        vacations:[]},
                    ]
        const action = addUserAndVacationInDayInTaser(17,12,122,123)//(taserId,dayId,userId,vacationId)
        const results = tasers(state,action)
        expect(results)
            .toEqual([
                {taserDef:{taserId:17,name:"taserDesCprs"},
                taserDays:[
                            {dayId:12,
                            dayDate:"unedate1",
                            dayAtWorkUsers:[
                                {
                                ElementAtWorkThisDayId:action.ElementAtWorkThisDayId,
                                dayId:12,
                                userId:122,
                                vacationId:123,
                               }
                            ]},
                            {dayId:13,
                            dayDate:"unedate2",
                            dayAtWorkUsers:[]}
                ],
                users:[],
                vacations:[]}
            ])
    })

    it('REMOVE_TASER_DAY_AT_WORK_USER with action creator sucess', () => {
        const state = [                
                        {taserDef:{taserId:17,name:"taserDesCprs"},
                        taserDays:[
                            {dayId:12,
                            dayDate:"unedate1",
                            dayAtWorkUsers:[
                                {
                                ElementAtWorkThisDayId:1234567,
                                dayId:12,
                                userId:122,
                                vacationId:123,
                                },
                                {
                                ElementAtWorkThisDayId:123456,
                                dayId:12,
                                userId:122,
                                vacationId:123,
                                }
                            ]},
                            {dayId:13,
                            dayDate:"unedate2",
                            dayAtWorkUsers:[]}
                        ],
                        users:[],
                        vacations:[]},
                    ]
        const action = removeOneUserAtWorkInDayInTaser(17,12,122) //(taserId,dayId,userId)
        const results = tasers(state,action)
        expect(results)
            .toEqual([
                {taserDef:{taserId:17,name:"taserDesCprs"},
                taserDays:[
                            {dayId:12,
                            dayDate:"unedate1",
                            dayAtWorkUsers:[
                                {
                                ElementAtWorkThisDayId:1234567,
                                dayId:12,
                                userId:122,
                                vacationId:123,
                                }
                            ]},
                            {dayId:13,
                            dayDate:"unedate2",
                            dayAtWorkUsers:[]}
                ],
                users:[],
                vacations:[]}
            ])
    })

    it('REMOVE_TASER_DAY_AT_WORK_USER with action creator sucess', () => {
        const state = [                
                        {taserDef:{taserId:17,name:"taserDesCprs"},
                        taserDays:[
                            {dayId:12,
                            dayDate:"unedate1",
                            dayAtWorkUsers:[
 
                            ]},
                            {dayId:13,
                            dayDate:"unedate2",
                            dayAtWorkUsers:[]}
                        ],
                        users:[],
                        vacations:[]},
                    ]
        const action = removeOneUserAtWorkInDayInTaser(17,12,"u2")
        const results = tasers(state,action)
        expect(results)
            .toEqual([
                {taserDef:{taserId:17,name:"taserDesCprs"},
                taserDays:[
                            {dayId:12,
                            dayDate:"unedate1",
                            dayAtWorkUsers:[

                            ]},
                            {dayId:13,
                            dayDate:"unedate2",
                            dayAtWorkUsers:[]}
                ],
                users:[],
                vacations:[]}
            ])
    })

    it('ADD_TASER_DAY_WITH_DESIDERATA_USER with action creator sucess', () => {
        const state = [                
                        {taserDef:{taserId:17,name:"taserDesCprs"},
                        taserDays:[
                            {dayId:12,
                            dayDate:"unedate1",
                            dayAtWorkUsers:[],
                            dayWithDesiderataUsers:[]},
                            {dayId:13,
                            dayDate:"unedate2",
                            dayAtWorkUsers:[],
                            dayWithDesiderataUsers:[]}
                        ],
                        users:[],
                        vacations:[]},
                    ]
        const action = addUserAndDesiderataInDayInTaser(17,12,122,456)// (taserId,dayId,userId,desiderataId)
        const results = tasers(state,action)
        expect(results)
            .toEqual([
                {taserDef:{taserId:17,name:"taserDesCprs"},
                taserDays:[
                            {dayId:12,
                            dayDate:"unedate1",
                            dayAtWorkUsers:[],
                            dayWithDesiderataUsers:[
                                {
                                ElementWithDesiderataThisDayId:action.ElementWithDesiderataThisDayId,
                                dayId:12,
                                userId:122,
                                desiderataId:456,
                               }
                            ]},
                            {dayId:13,
                            dayDate:"unedate2",
                            dayAtWorkUsers:[],
                            dayWithDesiderataUsers:[],
                            }
                ],
                users:[],
                vacations:[]}
            ])
    })

    it('REMOVE_TASER_DAY_WITH_DESIDERATA_USER with action creator sucess', () => {
        const state = [                
                {taserDef:{taserId:17,name:"taserDesCprs"},
                taserDays:[
                            {dayId:12,
                            dayDate:"unedate1",
                            dayAtWorkUsers:[],
                            dayWithDesiderataUsers:[
                                {
                                ElementWithDesiderataThisDayId:888,
                                dayId:12,
                                userId:122,
                                desiderataId:456,
                               }
                            ]},
                            {dayId:13,
                            dayDate:"unedate2",
                            dayAtWorkUsers:[],
                            dayWithDesiderataUsers:[],
                            }
                        ],
                users:[],
                vacations:[]}
                    ]
        const action = removeOneUserWithDesiderataInDayInTaser(17,12,888) //(taserId,dayId,ElementWithDesiderataThisDayId)
        const results = tasers(state,action)
        expect(results)
            .toEqual([
                {taserDef:{taserId:17,name:"taserDesCprs"},
                taserDays:[
                            {dayId:12,
                            dayDate:"unedate1",
                            dayAtWorkUsers:[],
                            dayWithDesiderataUsers:[

                            ]},
                            {dayId:13,
                            dayDate:"unedate2",
                            dayAtWorkUsers:[],
                            dayWithDesiderataUsers:[],
                            }
                ],
                users:[],
                vacations:[]}
            ])
    })

    it('ADD_TASER_USER with action creator sucess', () => {
        const state = [                
                        {taserDef:{taserId:17,name:"taserDesCprs"},
                        taserDays:[
                            {dayId:12,
                            dayDate:"unedate1",
                            dayAtWorkUsers:[]}
                        ],
                        users:[],
                        vacations:[]},
                    ]
        const action = addUserInTaserConfig(17,"chris",new Date(2030,1,1).toString())
        const results = tasers(state,action)
        expect(results)
            .toEqual([
                {taserDef:{taserId:17,name:"taserDesCprs"},
                taserDays:[ 
                            {dayId:12,
                            dayDate:"unedate1",
                            dayAtWorkUsers:[]}
                ],
                users:[
                        {userId:action.userId,
                        name:"chris",
                        endDate:action.endDate,
                        partialTimes:[]}
                ],
                vacations:[]}
            ])
    })

    it('REMOVE_TASER_USER with action creator sucess', () => {
        const state = [                
                        {taserDef:{taserId:17,name:"taserDesCprs"},
                        taserDays:[
                            {dayId:12,
                            dayDate:"unedate1",
                            dayAtWorkUsers:[]},
                            {dayId:13,
                            dayDate:"unedate2",
                            dayAtWorkUsers:[]}
                        ],
                        users:[
                            {userId:"u1",
                            name:"chris",
                            endDate:"2030-01-01",
                            partialTimes:[]}
                        ],
                        vacations:[]},
                        {taserDef:{taserId:28,name:"taserDesCs"},
                        taserDays:[
                            {dayId:"day2",
                            dayDate:"unedate4",
                            dayAtWorkUsers:[]}
                        ],
                        users:[],
                        vacations:[]}
                    ]
        const action = removeUserInTaserConfig(17,"u1")
        const results = tasers(state,action)
        expect(results)
            .toEqual([
                        {taserDef:{taserId:17,name:"taserDesCprs"},
                        taserDays:[
                            {dayId:12,
                            dayDate:"unedate1",
                            dayAtWorkUsers:[]},
                            {dayId:13,
                            dayDate:"unedate2",
                            dayAtWorkUsers:[]}
                            ],
                        users:[],
                        vacations:[]},
                        {taserDef:{taserId:28,name:"taserDesCs"},
                        taserDays:[
                            {dayId:"day2",
                            dayDate:"unedate4",
                            dayAtWorkUsers:[]}
                            ],
                        users:[],
                        vacations:[]}
            ])
    })

    it('ADD_TASER_VACATION with action creator sucess', () => {
        const state = [                
                        {taserDef:{taserId:17,name:"taserDesCprs"},
                        taserDays:[
                            {dayId:12,
                            dayDate:"unedate1",
                            dayAtWorkUsers:[]}
                        ],
                        users:[
                            {taserId:"u1",
                            name:"chris",
                            endDate:"2030-01-01",
                            partialTimes:[]}
                        ],
                        vacations:[]},
                    ]
        const action = addVacationInTaserConfig(17,"jPar","red","j",true,true) //(taserId,name,color,shortKey,isNeeded,isUniqueInDayTab)
        const results = tasers(state,action)
        expect(results)
            .toEqual([
                {taserDef:{taserId:17,name:"taserDesCprs"},
                taserDays:[ 
                            {dayId:12,
                            dayDate:"unedate1",
                            dayAtWorkUsers:[]}
                ],
                users:[
                        {taserId:"u1",
                        name:"chris",
                        endDate:"2030-01-01",
                        partialTimes:[]}
                ],
                vacations:[
                    {
                        vacationId:action.vacationId,
                        name:"jPar",
                        color:"red",
                        shortKey:"j",
                        isNeeded:true,
                        isUniqueInDayTab:true,
                        tasersShared:[]
                    }
                ]}
            ])
    })

    it('REMOVE_TASER_VACATION with action creator sucess', () => {
        const state = [                
                        {taserDef:{taserId:17,name:"taserDesCprs"},
                        taserDays:[
                            {dayId:12,
                            dayDate:"unedate1",
                            dayAtWorkUsers:[]}
                        ],
                        users:[
                            {userId:"u1",
                            name:"chris",
                            endDate:"2030-01-01",
                            partialTimes:[]}
                        ],
                        vacations:[
                            {
                                vacationId:"123",
                                name:"jPar",
                                color:"red",
                                shortKey:"j",
                                isNeeded:true,
                                isUniqueInDayTab:true,
                                tasersShared:[]
                            },
                            {
                                vacationId:"124",
                                name:"jPar",
                                shortKey:"j",
                                isNeeded:true,
                                isUniqueInDayTab:true,
                                tasersShared:[]
                            }
                        ]},
                    ]
        const action = removeVacationInTaserConfig(17,"124")
        const results = tasers(state,action)
        expect(results)
            .toEqual([                
                        {taserDef:{taserId:17,name:"taserDesCprs"},
                        taserDays:[
                            {dayId:12,
                            dayDate:"unedate1",
                            dayAtWorkUsers:[]}
                        ],
                        users:[
                            {userId:"u1",
                            name:"chris",
                            endDate:"2030-01-01",
                            partialTimes:[]}
                        ],
                        vacations:[
                            {
                                vacationId:"123",
                                name:"jPar",
                                color:"red",
                                shortKey:"j",
                                isNeeded:true,
                                isUniqueInDayTab:true,
                                tasersShared:[]
                            }
                        ]},
                    ])
    })

    it('ADD_TASER_USER_PARTIALTIME with action creator sucess', () => {
        const state =[                
                        {taserDef:{taserId:17,name:"taserDesCprs"},
                        taserDays:[
                            {dayId:12,
                            dayDate:"unedate1",
                            dayAtWorkUsers:[]}
                        ],
                        users:[
                            {userId:"u1",
                            name:"chris",
                            endDate:"2030-01-01",
                            partialTimes:[]}
                        ],
                        vacations:[
                            {
                                vacationId:"123",
                                name:"jPar",
                                shortKey:"j",
                                isNeeded:true,
                                isUniqueInDayTab:true,
                                tasersShared:[]
                            },
                            {
                                vacationId:"124",
                                name:"jPar",
                                shortKey:"j",
                                isNeeded:true,
                                isUniqueInDayTab:true,
                                tasersShared:[]
                            }
                        ]},
                    ]
        const action = addPartialtimeInUserConfig (17,"u1",100,"2020-01-01","2022-01-01") // (taserId,userId,quotite,startDate,endDate)
        const results = tasers(state,action)
        expect(results)
            .toEqual([                
                        {taserDef:{taserId:17,name:"taserDesCprs"},
                        taserDays:[
                            {dayId:12,
                            dayDate:"unedate1",
                            dayAtWorkUsers:[]}
                        ],
                        users:[
                            {userId:"u1",
                            name:"chris",
                            endDate:"2030-01-01",
                            partialTimes:[
                                {
                                    partialtimeId:action.partialtimeId,
                                    quotite:100,
                                    startDate:"2020-01-01",
                                    endDate:"2022-01-01"
                                }
                            ]}
                        ],
                        vacations:[
                            {
                                vacationId:"123",
                                name:"jPar",
                                shortKey:"j",
                                isNeeded:true,
                                isUniqueInDayTab:true,
                                tasersShared:[]
                            },
                            {
                                vacationId:"124",
                                name:"jPar",
                                shortKey:"j",
                                isNeeded:true,
                                isUniqueInDayTab:true,
                                tasersShared:[]
                            }
                        ]},
                    ])
    })

    it('REMOVE_TASER_USER_PARTIALTIME with action creator sucess', () => {
        const state =[                
                        {taserDef:{taserId:17,name:"taserDesCprs"},
                        taserDays:[
                            {dayId:12,
                            dayDate:"unedate1",
                            dayAtWorkUsers:[]}
                        ],
                        users:[
                            {userId:"u1",
                            name:"chris",
                            endDate:"2030-01-01",
                            partialTimes:[
                                {
                                    partialtimeId:123,
                                    quotite:100,
                                    startDate:"2020-01-01",
                                    endDate:"2022-01-01"
                                }
                            ]}
                        ],
                        vacations:[
                            {
                                vacationId:"123",
                                name:"jPar",
                                shortKey:"j",
                                isNeeded:true,
                                isUniqueInDayTab:true,
                                tasersShared:[]
                            },
                            {
                                vacationId:"124",
                                name:"jPar",
                                shortKey:"j",
                                isNeeded:true,
                                isUniqueInDayTab:true,
                                tasersShared:[]
                            }
                        ]},
                    ]
        const action = removeOnePartialtimeInUserInTaserConfig(17,"u1",123)
        const results = tasers(state,action)
        expect(results)
            .toEqual([                
                        {taserDef:{taserId:17,name:"taserDesCprs"},
                        taserDays:[
                            {dayId:12,
                            dayDate:"unedate1",
                            dayAtWorkUsers:[]}
                        ],
                        users:[
                            {userId:"u1",
                            name:"chris",
                            endDate:"2030-01-01",
                            partialTimes:[

                            ]}
                        ],
                        vacations:[
                            {
                                vacationId:"123",
                                name:"jPar",
                                shortKey:"j",
                                isNeeded:true,
                                isUniqueInDayTab:true,
                                tasersShared:[]
                            },
                            {
                                vacationId:"124",
                                name:"jPar",
                                shortKey:"j",
                                isNeeded:true,
                                isUniqueInDayTab:true,
                                tasersShared:[]
                            }
                        ]},
                    ])
    })

    it('ADD_TASER_VACATION_SHAREDTASER with action creator sucess', () => {
        const state = [                
                        {taserDef:{taserId:17,name:"taserDesCprs"},
                        taserDays:[
                            {dayId:12,
                            dayDate:"unedate1",
                            dayAtWorkUsers:[]}
                        ],
                        users:[
                            {userId:"u1",
                            name:"chris",
                            endDate:"2030-01-01",
                            partialTimes:[]}
                        ],
                        vacations:[
                            {
                                vacationId:123,
                                name:"jPar",
                                shortKey:"j",
                                isNeeded:true,
                                isUniqueInDayTab:true,
                                tasersShared:[]
                            }
                        ]},
                    ]
        const action = addtasersSharedInVacationConfig (17,123,"18") //(taserId,vacationId,taserToSharedId)
        const results = tasers(state,action)
        expect(results)
            .toEqual([
                {taserDef:{taserId:17,name:"taserDesCprs"},
                taserDays:[ 
                            {dayId:12,
                            dayDate:"unedate1",
                            dayAtWorkUsers:[]}
                ],
                users:[
                        {userId:"u1",
                        name:"chris",
                        endDate:"2030-01-01",
                        partialTimes:[]}
                ],
                vacations:[
                    {
                        vacationId:123,
                        name:"jPar",
                        shortKey:"j",
                        isNeeded:true,
                        isUniqueInDayTab:true,
                        tasersShared:["18"]
                    }
                ]}
            ])
    })

    it('REMOVE_TASER_VACATION with action creator sucess', () => {
        const state = [                
                        {taserDef:{taserId:17,name:"taserDesCprs"},
                        taserDays:[
                            {dayId:12,
                            dayDate:"unedate1",
                            dayAtWorkUsers:[]}
                        ],
                        users:[
                            {userId:"u1",
                            name:"chris",
                            endDate:"2030-01-01",
                            partialTimes:[]}
                        ],
                        vacations:[
                            {
                                vacationId:"123",
                                name:"jPar",
                                shortKey:"j",
                                isNeeded:true,
                                isUniqueInDayTab:true,
                                tasersShared:[]
                            },
                            {
                                vacationId:"124",
                                name:"jPar",
                                shortKey:"j",
                                isNeeded:true,
                                isUniqueInDayTab:true,
                                tasersShared:[]
                            }
                        ]},
                    ]
        const action = removeVacationInTaserConfig(17,"124")
        const results = tasers(state,action)
        expect(results)
            .toEqual([                
                        {taserDef:{taserId:17,name:"taserDesCprs"},
                        taserDays:[
                            {dayId:12,
                            dayDate:"unedate1",
                            dayAtWorkUsers:[]}
                        ],
                        users:[
                            {userId:"u1",
                            name:"chris",
                            endDate:"2030-01-01",
                            partialTimes:[]}
                        ],
                        vacations:[
                            {
                                vacationId:"123",
                                name:"jPar",
                                shortKey:"j",
                                isNeeded:true,
                                isUniqueInDayTab:true,
                                tasersShared:[]
                            }
                        ]},
                    ])
    })

    it('ADD_TASER_USER_PARTIALTIME with action creator sucess', () => {
        const state =[                
                        {taserDef:{taserId:17,name:"taserDesCprs"},
                        taserDays:[
                            {dayId:12,
                            dayDate:"unedate1",
                            dayAtWorkUsers:[]}
                        ],
                        users:[
                            {userId:"u1",
                            name:"chris",
                            endDate:"2030-01-01",
                            partialTimes:[]}
                        ],
                        vacations:[
                            {
                                vacationId:"123",
                                name:"jPar",
                                shortKey:"j",
                                isNeeded:true,
                                isUniqueInDayTab:true,
                                tasersShared:[]
                            },
                            {
                                vacationId:"124",
                                name:"jPar",
                                shortKey:"j",
                                isNeeded:true,
                                isUniqueInDayTab:true,
                                tasersShared:[]
                            }
                        ]},
                    ]
        const action = addPartialtimeInUserConfig (17,"u1",100,"2020-01-01","2022-01-01")
        const results = tasers(state,action)
        expect(results)
            .toEqual([                
                        {taserDef:{taserId:17,name:"taserDesCprs"},
                        taserDays:[
                            {dayId:12,
                            dayDate:"unedate1",
                            dayAtWorkUsers:[]}
                        ],
                        users:[
                            {userId:"u1",
                            name:"chris",
                            endDate:"2030-01-01",
                            partialTimes:[
                                {
                                    partialtimeId:action.partialtimeId,
                                    quotite:100,
                                    startDate:"2020-01-01",
                                    endDate:"2022-01-01"
                                }
                            ]}
                        ],
                        vacations:[
                            {
                                vacationId:"123",
                                name:"jPar",
                                shortKey:"j",
                                isNeeded:true,
                                isUniqueInDayTab:true,
                                tasersShared:[]
                            },
                            {
                                vacationId:"124",
                                name:"jPar",
                                shortKey:"j",
                                isNeeded:true,
                                isUniqueInDayTab:true,
                                tasersShared:[]
                            }
                        ]},
                    ])
    })

    it('REMOVE_TASER_USER_PARTIALTIME with action creator sucess', () => {
        const state =[                
                        {taserDef:{taserId:17,name:"taserDesCprs"},
                        taserDays:[
                            {dayId:12,
                            dayDate:"unedate1",
                            dayAtWorkUsers:[]}
                        ],
                        users:[
                            {userId:"u1",
                            name:"chris",
                            endDate:"2030-01-01",
                            partialTimes:[
                                {
                                    partialtimeId:123,
                                    quotite:100,
                                    startDate:"2020-01-01",
                                    endDate:"2022-01-01"
                                }
                            ]}
                        ],
                        vacations:[
                            {
                                vacationId:"123",
                                name:"jPar",
                                shortKey:"j",
                                isNeeded:true,
                                isUniqueInDayTab:true,
                                tasersShared:[]
                            },
                            {
                                vacationId:"124",
                                name:"jPar",
                                shortKey:"j",
                                isNeeded:true,
                                isUniqueInDayTab:true,
                                tasersShared:[]
                            }
                        ]},
                    ]
        const action = removeOnePartialtimeInUserInTaserConfig(17,"u1",123)
        const results = tasers(state,action)
        expect(results)
            .toEqual([                
                        {taserDef:{taserId:17,name:"taserDesCprs"},
                        taserDays:[
                            {dayId:12,
                            dayDate:"unedate1",
                            dayAtWorkUsers:[]}
                        ],
                        users:[
                            {userId:"u1",
                            name:"chris",
                            endDate:"2030-01-01",
                            partialTimes:[

                            ]}
                        ],
                        vacations:[
                            {
                                vacationId:"123",
                                name:"jPar",
                                shortKey:"j",
                                isNeeded:true,
                                isUniqueInDayTab:true,
                                tasersShared:[]
                            },
                            {
                                vacationId:"124",
                                name:"jPar",
                                shortKey:"j",
                                isNeeded:true,
                                isUniqueInDayTab:true,
                                tasersShared:[]
                            }
                        ]},
                    ])
    })

    it('REMOVE_TASER_VACATION_SHAREDTASER with action creator sucess', () => {
        const state = [                
                        {taserDef:{taserId:17,name:"taserDesCprs"},
                        taserDays:[
                            {dayId:12,
                            dayDate:"unedate1",
                            dayAtWorkUsers:[]}
                        ],
                        users:[
                            {userId:"u1",
                            name:"chris",
                            endDate:"2030-01-01",
                            partialTimes:[]}
                        ],
                        vacations:[
                            {
                                vacationId:123,
                                name:"jPar",
                                shortKey:"j",
                                isNeeded:true,
                                isUniqueInDayTab:true,
                                tasersShared:["18","17","15"]
                            }
                        ]},
                    ]
        const action = removeOneSharedtaserInVacationInTaserConfig (17,123,"15")
        const results = tasers(state,action)
        expect(results)
            .toEqual([
                {taserDef:{taserId:17,name:"taserDesCprs"},
                taserDays:[ 
                            {dayId:12,
                            dayDate:"unedate1",
                            dayAtWorkUsers:[]}
                ],
                users:[
                        {userId:"u1",
                        name:"chris",
                        endDate:"2030-01-01",
                        partialTimes:[]}
                ],
                vacations:[
                    {
                        vacationId:123,
                        name:"jPar",
                        shortKey:"j",
                        isNeeded:true,
                        isUniqueInDayTab:true,
                        tasersShared:["18","17"]
                    }
                ]}
            ])
    })
    
})