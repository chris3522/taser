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