
function toDayStart(ms) {
  const d = new Date(ms)
  return ms - ((
    (
      d.getHours() * 60 + d.getMinutes()
    ) * 60 + d.getSeconds()
  ) * 1000 + d.getMilliseconds())
}

function dayDiff(then, now) {
  const nt = toDayStart(now)
  const tt = toDayStart(then)
  return parseInt((nt - tt) / (24 * 60 * 60 * 1000))
}

export default function ago(time) {
  const ms = Date.now() - time
  if (ms < 30 * 1000) {
    return 'a few seconds ago'
  }
  if (ms < 2 * 60 * 1000) {
    return 'a minute ago'
  }
  if (ms < 10 * 60 * 1000) {
    return 'a few minutes ago'
  }
  if (ms < 60 * 60 * 1000) {
    return `${parseInt(ms / 60 / 1000)} minutes ago`
  }
  if (ms < 24 * 60 * 60 * 1000) {
    return `${parseInt(ms / 60 / 60 / 1000)} hours ago`
  }
  const days = dayDiff(time, Date.now())
  if (!days) return 'earlier today'
  if (days === 1) return 'yesterday'
  if (days < 7) return `${days} days ago`
  const weeks = parseInt(days / 7)
  if (weeks < 4) {
    return `${weeks} weeks ago`
  }
  const months = parseInt(weeks / 4)
  if (months < 12) {
    return `${months} months ago`
  }
  return new Date(time).toLocaleDateString()
}

