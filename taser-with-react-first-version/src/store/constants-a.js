/*
Store
	[tasers]
		{taser}
			{taserDef}
			[taserDays]
				{taserDay}
					[dayAtWorkUsers]
						{dayAtWorkUser}
                        {dayAtWorkUser}
					[dayWithDesideratasUsers]
						{dayWithDesiderataUser}
						{dayWithDesiderataUser}
				{taserDay}
			[users]
				{user}
					[partialTime]
						{partialTime}
						{partialTime}
				{user}
			[vacations]
				{vacation}
					[sharedTaser]
						"taser.id1"
						"taser.id2"
				{vacation}
		{taser}
		{taser}
*/

//Definitions des ACTIONS aplliquées à l'arbre
const constants = {
	ADD_TASER: "ADD_TASER", //test done
	REMOVE_TASER: "REMOVE_TASER", //test done
    UPDATE_TASER_DEF: "UPDATE_TASER_DEF", //test done
    UPDATE_TASER_DEF_AUTH: "UPDATE_TASER_DEF_AUTH", 
	ADD_TASER_DAY: "ADD_TASER_DAY", //test done
    REMOVE_TASER_DAY: "REMOVE_TASER_DAY", //test done
    
    ADD_TASER_USER: "ADD_TASER_USER", //test done
	REMOVE_TASER_USER: "REMOVE_TASER_USER", // test done
	ADD_TASER_VACATION: "ADD_TASER_VACATION", //test done
	REMOVE_TASER_VACATION: "REMOVE_TASER_VACATION", //test done
	
    ADD_TASER_DAY_AT_WORK_USER: "ADD_TASER_DAY_AT_WORK_USER", //test done
    ADD_TASER_DAY_WITH_DESIDERATA_USER: "ADD_TASER_DAY_WITH_DESIDERATA_USER", //test done
	ADD_TASER_USER_PARTIALTIME: "ADD_TASER_USER_PARTIALTIME", //test done
    ADD_TASER_VACATION_SHAREDTASER: "ADD_TASER_VACATION_SHAREDTASER", //test done
    REMOVE_TASER_DAY_AT_WORK_USER: "REMOVE_TASER_DAY_AT_WORK_USER",  //test done
    REMOVE_TASER_DAY_WITH_DESIDERATA_USER: "REMOVE_TASER_DAY_WITH_DESIDERATA_USER",
	REMOVE_TASER_USER_PARTIALTIME: "REMOVE_TASER_USER_PARTIALTIME",  //test done
	REMOVE_TASER_VACATION_SHAREDTASER: "REMOVE_TASER_VACATION_SHAREDTASER", //test done
}

export default constants