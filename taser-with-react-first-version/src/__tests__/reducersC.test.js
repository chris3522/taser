import { config } from '../store/reducers-c'
import { addDesiderataType,
        addATaserAdmin,
        removeDesiderata,
        removeATaserAdmin } from '../store/actions-c'
 
describe("config Reducer", () => {

    it('ADD_DESIDERATA with action creator sucess', () => {
        const state = {taserAdmins:[],desideratas:[]}
        //const state = {tasersAdmins:[]}
        const action = addDesiderataType("Congés","bleu","c")
        const results = config(state,action)
        expect(results)
            .toEqual(
                        {   
                            taserAdmins:[],
                            desideratas:[
                                {
                                    desiderataId:action.desiderataId,
                                    name:"Congés",
                                    color:"bleu",
                                    shortKey:"c"
                                }
                            ]
                        }
            )
    })

    it('ADD_TASER_ADMIN with action creator sucess', () => {
        const state = {taserAdmins:[],desideratas:[]}
        //const state = {tasersAdmins:[]}
        const action = addATaserAdmin("taser5","jj") //(taserIdToAdmin,pwd)
        const results = config(state,action)
        expect(results)
            .toEqual(
                        {   
                            taserAdmins:[
                                {
                                    taserAdminId:action.taserAdminId,
                                    pwd:"jj",
                                    taserIdToAdmin:"taser5"
                                }
                            ],
                            desideratas:[]
                        }
            )
    })

    it('REMOVE_DESIDERATA with action creator sucess', () => {
        const state = {taserAdmins:[
                                {
                                    taserAdminId:12,
                                    pwd:"jj",
                                    taserIdToAdmin:"taser5"
                                }],
                        desideratas:[
                                {
                                    desiderataId:12,
                                    name:"Congés",
                                    color:"bleu",
                                    shortKey:"c"
                                }
                        ]}
        //const state = {tasersAdmins:[]}
        const action = removeDesiderata(12) //(taserIdToAdmin,pwd)
        const results = config(state,action)
        expect(results)
            .toEqual({taserAdmins:[
                                {
                                    taserAdminId:12,
                                    pwd:"jj",
                                    taserIdToAdmin:"taser5"
                                }],
                        desideratas:[

                        ]}
            )
    })

    it('REMOVE_DESIDERATA with action creator sucess', () => {
        const state = {taserAdmins:[
                                {
                                    taserAdminId:12,
                                    pwd:"jj",
                                    taserIdToAdmin:"taser5"
                                }],
                        desideratas:[
                                {
                                    desiderataId:12,
                                    name:"Congés",
                                    color:"bleu",
                                    shortKey:"c"
                                }
                        ]}
        //const state = {tasersAdmins:[]}
        const action = removeATaserAdmin(12) //(taserIdToAdmin,pwd)
        const results = config(state,action)
        expect(results)
            .toEqual({taserAdmins:[],
                        desideratas:[
                                 {
                                    desiderataId:12,
                                    name:"Congés",
                                    color:"bleu",
                                    shortKey:"c"
                                }

                        ]}
            )
    })
    
})