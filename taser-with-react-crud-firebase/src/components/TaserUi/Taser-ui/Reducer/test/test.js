const newData =   
[
  {
    Jq8mTXKlXwoxqO7SDvG: [
      {
        20201118: [
          {
            isRequired: "required",
            nature: "vacation",
            dayNumber: 20201118,
            userId: "1Jq8mTXKlXwoxqO7SDvG",
            vacOrDesId: "hyoe7tIhROXnNg6O9o8o",
            name: "jPar",
            color: ""
          }
        ]
      },
      {
        20201119: [
          {
            isRequired: "required",
            name: "nPar",
            nature: "vacation",
            vacOrDesId: "Kz79yIebmrs2t7D7UuJ6",
            userId: "1Jq8mTXKlXwoxqO7SDvG",
            dayNumber: 20201119,
            color: ""
          }
        ]
      },
      {
        20201121: [
          {
            color: "#32d2aa",
            name: "jour libre",
            dayNumber: 20201121,
            vacOrDesId: "m3HKjh3ocbK4cB6LeYUd",
            isRequired: "",
            userId: "1Jq8mTXKlXwoxqO7SDvG",
            nature: "desiderata"
          }
        ]
      }
    ]
  },
  {
    Jq8mTXKlXwoxqO7SDvG: [
      {
        20210113: [
          {
            userId: "1Jq8mTXKlXwoxqO7SDvG",
            name: "jPar",
            nature: "vacation",
            vacOrDesId: "hyoe7tIhROXnNg6O9o8o",
            color: "",
            isRequired: "required",
            dayNumber: 20210113
          }
        ]
      },
      {
        20210114: [
          {
            dayNumber: 20210114,
            vacOrDesId: "Kz79yIebmrs2t7D7UuJ6",
            color: "",
            isRequired: "required",
            userId: "1Jq8mTXKlXwoxqO7SDvG",
            nature: "vacation",
            name: "nPar"
          }
        ]
      }
    ]
  }
]

console.log(
    //newData.map(u => u[Object.keys(u)[0].toString()].map(u => u[parseInt(Object.keys(u)[0])]))
     //.map(u => u[parseInt(Object.keys(u)[0])])
   // .reduce((a, b) => a.concat(b))
    )

console.log(
    newData.filter(u => Object.keys(u)[0].toString()==="Jq8mTXKlXwoxqO7SDvG")
    .map(u => u[Object.keys(u)[0]].map(u => u[parseInt(Object.keys(u)[0])]))
     .reduce((a, b) => a.concat(b)).map(u=>u[0])
    //.map(u => u[parseInt(Object.keys(u)[0])]))
   // .map(u => u[parseInt(Object.keys(u)[0])])
    //.reduce((p,c)=> console.log(Object.keys(c)[0].toString()))
    //.reduce((prev, curr) => [...prev, ...curr[Object.keys(curr)[0].toString()]])    
    )