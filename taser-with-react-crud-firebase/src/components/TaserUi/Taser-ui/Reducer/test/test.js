const usersData =
{
    2020: [
        {
            "TYQj3Ir8DecOG2eyhyzY": [
                {
                    20201124: [
                        {
                            isRequired: "required",
                            name: "nCpr",
                            dayNumber: 20201124,
                            color: "",
                            vacOrDesId: "ZfvY5D6eC1I4vkL8DupT",
                            nature: "vacation",
                            userId: "TYQj3Ir8DecOG2eyhyzY"
                        }
                    ]
                },
                {
                    20201125: [
                        {
                            isRequired: "renfort",
                            dayNumber: 20201125,
                            name: "jPar",
                            vacOrDesId: "73J4F3YmPsA2D5Cjg85U",
                            color: "",
                            nature: "vacation",
                            userId: "TYQj3Ir8DecOG2eyhyzY"
                        }
                    ]
                },
                {
                    20201126: [
                        {
                            vacOrDesId: "rCfVqocRkqvGbcPEM1Oy",
                            name: "nPar",
                            dayNumber: 20201126,
                            isRequired: "renfort",
                            nature: "vacation",
                            color: "",
                            userId: "TYQj3Ir8DecOG2eyhyzY"
                        }
                    ]
                },
                {
                    20201202: [
                        {
                            userId: "TYQj3Ir8DecOG2eyhyzY",
                            dayNumber: 20201202,
                            name: "jPar",
                            vacOrDesId: "73J4F3YmPsA2D5Cjg85U",
                            nature: "vacation",
                            color: "",
                            isRequired: "renfort"
                        }
                    ]
                },
                {
                    2020120: [
                        {
                            nature: "vacation",
                            vacOrDesId: "rCfVqocRkqvGbcPEM1Oy",
                            name: "nPar",
                            dayNumber: 20201203,
                            isRequired: "renfort",
                            color: "",
                            userId: "TYQj3Ir8DecOG2eyhyzY"
                        }
                    ]
                },
                {
                    20201201: [
                        {
                            userId: "TYQj3Ir8DecOG2eyhyzY",
                            vacOrDesId: "YGHmb9fpCMYCwsUiUFmA",
                            dayNumber: 20201201,
                            nature: "vacation",
                            name: "jCpr",
                            color: "",
                            isRequired: "required"
                        }
                    ]
                }
            ]
        },
        {
            "Uuuuuuu": [
                {
                    20201124: [
                        {
                            isRequired: "required",
                            name: "nCpr",
                            dayNumber: 20201124,
                            color: "",
                            vacOrDesId: "ZfvY5D6eC1I4vkL8DupT",
                            nature: "vacation",
                            userId: "Uuuuuuu"
                        }
                    ]
                },
                {
                    20201125: [
                        {
                            isRequired: "renfort",
                            dayNumber: 20201125,
                            name: "jPar",
                            vacOrDesId: "73J4F3YmPsA2D5Cjg85U",
                            color: "",
                            nature: "vacation",
                            userId: "Uuuuuuu"
                        }
                    ]
                },
                {
                    20201126: [
                        {
                            vacOrDesId: "rCfVqocRkqvGbcPEM1Oy",
                            name: "nPar",
                            dayNumber: 20201126,
                            isRequired: "renfort",
                            nature: "vacation",
                            color: "",
                            userId: "Uuuuuuu"
                        }
                    ]
                },
                {
                    20201202: [
                        {
                            userId: "Uuuuuuu",
                            dayNumber: 20201202,
                            name: "jPar",
                            vacOrDesId: "73J4F3YmPsA2D5Cjg85U",
                            nature: "vacation",
                            color: "",
                            isRequired: "renfort"
                        }
                    ]
                },
                {
                    2020120: [
                        {
                            nature: "vacation",
                            vacOrDesId: "rCfVqocRkqvGbcPEM1Oy",
                            name: "nPar",
                            dayNumber: 20201203,
                            isRequired: "renfort",
                            color: "",
                            userId: "Uuuuuuu"
                        }
                    ]
                },
                {
                    20201201: [
                        {
                            userId: "Uuuuuuu",
                            vacOrDesId: "YGHmb9fpCMYCwsUiUFmA",
                            dayNumber: 20201201,
                            nature: "vacation",
                            name: "jCpr",
                            color: "",
                            isRequired: "required"
                        }
                    ]
                }
            ]
        }
    ],
    year: "2020"
}



const reducer = (acc, user) => {
    let days = Object.values(user)[0]
    let days2 = days.map(d => Object.values(d)[0][0])
    return acc.concat(days2)
}

const reducer2 = (acc, obj) => {
    let dayNumber = obj["dayNumber"]
    let vacName = obj["name"]
    if (!acc[dayNumber]) {
        acc[dayNumber] = []
    }
    acc[dayNumber].push(vacName)
    return (acc)
}

const reducer3 = (acc, day) => {
    let days = Object.values(day)[0]
    //let days2 = days.map( d => Object.values(d)[0][0])
    return acc.concat(days)
}

const renfort2 = [...usersData[usersData.year]]
const renfort3 = renfort2.reduce(reducer, [])
const renfort4 = renfort3.filter(d => d.isRequired === "renfort")
const renfort5 = renfort4.reduce(reducer2, {})
const renfort6 = Object.entries(renfort5).map(entry => {
    return ({
        [entry[0]]: entry[1].map(
            (vac, i) => ({ dayNumber: entry[0], userId: i, name: vac, isRequired: "renfort", nature: "vacation", color: "" })
        )
    })
})
const renfort7 = renfort6.reduce(reducer3, [])

const renfortCreateList = (data) => {
    const reducer = (acc, user) => {
        let days = Object.values(user)[0]
        let days2 = days.map(d => Object.values(d)[0][0])
        return acc.concat(days2)
    }

    const reducer2 = (acc, obj) => {
        let dayNumber = obj["dayNumber"]
        let vacName = obj["name"]
        if (!acc[dayNumber]) {
            acc[dayNumber] = []
        }
        acc[dayNumber].push(vacName)
        return (acc)
    }

    const reducer3 = (acc, day) => {
        let days = Object.values(day)[0]
        return acc.concat(days)
    }

    //const renfort2 = [...data[data.year]]
    const renfort3 = renfort2.reduce(reducer, [])
    const renfort4 = renfort3.filter(d => d.isRequired === "renfort")
    const renfort5 = renfort4.reduce(reducer2, {})
    const renfort6 = Object.entries(renfort5).map(entry => {
        return ({
            [entry[0]]: entry[1].map(
                (vac, i) => ({ dayNumber: entry[0], userId: i, name: vac, isRequired: "renfort", nature: "vacation", color: "" })
            )
        })
    })
    const renfort7 = renfort6.reduce(reducer3, [])
    return renfort7
}


console.log(JSON.stringify(renfortCreateList(renfort2), null, 2))