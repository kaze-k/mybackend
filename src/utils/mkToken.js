// token
const mkToken = (lenth) => {
  lenth = lenth || 54
  let t = "ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890"
  let tlen = t.length
  let n = ""
  for (i = 0; i < lenth; i++) n += t.charAt(Math.floor(Math.random() * tlen));
  return n
}

module.exports = mkToken
