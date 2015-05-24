
export default function mmSS(ms) {
  let secs = parseInt(ms / 1000) % 60
  let min = parseInt(ms / 1000 / 60)
  ms %= 1000
  if (secs < 10) secs = '0' + secs
  if (ms < 10) ms = '00' + ms
  else if (ms < 100) ms = '0' + ms
  return `${min}:${secs}.${ms}s`
}

