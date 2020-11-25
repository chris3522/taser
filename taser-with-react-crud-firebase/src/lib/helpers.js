export function slugify(string) {
  const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
  const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
  const p = new RegExp(a.split('').join('|'), 'g')

  return string.substring(0, string.indexOf("@")).toString().toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w-]+/g, '') // Remove all non-word characters
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}

export function closeTab(user, handleDisconnect) {
    const disconnected = {
        "connected": false,
    }

    const taserId = slugify(user.email)
    window.addEventListener("beforeunload", (ev) => {
            ev.preventDefault()
            handleDisconnect(taserId,disconnected)
            return null
    })


    return null
}

export function cleanup(taserId,handleDisconnect) {
    const disconnected = {
        "connected": false,
    }
    handleDisconnect(taserId,disconnected)
}

export const renfortCreateList = (data) => {
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
    const renfort3 = data.reduce(reducer, [])
    const renfort4 = renfort3
        .filter(d => d!==undefined)
        .filter(d => d.isRequired === "renfort")
    const renfort5 = renfort4.reduce(reducer2, {})
    const renfort6 = Object.entries(renfort5).map(entry => {
        return ({
            [entry[0]]: entry[1].map(
                (vac, i) => ({ dayNumber: parseInt(entry[0]), userId: i, name: vac, isRequired: "renfort", nature: "vacation", color: "" })
            )
        })
    })
    const renfort7 = renfort6.reduce(reducer3, [])
    return renfort7
}