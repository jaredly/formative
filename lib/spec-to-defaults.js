
export default function specToDefaults(spec) {
  const res = {}
  Object.keys(spec).forEach(name => {
    if (spec[name].type === 'section') {
      res[name] = specToDefaults(spec[name].spec)
    } else {
      res[name] = spec[name].default
    }
  })
  return res
}

