function stringAvatar(name: string) {
  const stringToColor = (str: string) => {
    if (str.length === 0) {
      return "#000000" // Default color if name is empty
    }

    let hash = 0
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash)
    }
    let color = "#"
    for (let j = 0; j < 3; j++) {
      const value = (hash >> (j * 8)) & 0xff
      color += ("00" + value.toString(16)).substr(-2)
    }
    return color
  }

  let children = ""
  if (name.length > 0) {
    children = `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`
  }

  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: children,
  }
}

export { stringAvatar }
