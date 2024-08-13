/*
115生活 签到脚本

[task_local]
1 0 * * * https://raw.githubusercontent.com/Zheng-JD/QX/main/115_task.js, tag=115生活, img-url=https://raw.githubusercontent.com/Orz-3/mini/master/Color/115.png, enabled=true
*/

const cookieName = '115生活'
const cookieKey = 'cookie_115'
const chen = init()
const cookieVal = chen.getdata(cookieKey)

sign()

function sign() {
  let url = {
    url: `https://webapi.115.com/user/sign`,
    headers: {
      Cookie: cookieVal
    }
  }
  chen.post(url, (error, response, data) => {
    chen.log(`${cookieName}, data: ${data}`)
    const result = JSON.parse(data)
    let subTitle = ``
    let detail = ``
    if (result.state == true) {
      subTitle = `签到结果: 成功`
      detail = `获得${result.data.coin}金币, 已连续签到${result.data.day}天`
    } else if (result.state == false) {
      subTitle = `签到结果: 重复`
      detail = `说明: ${result.msg}`
    } else {
      subTitle = `签到结果: 失败`
      detail = `说明: ${result.msg}`
    }
    chen.msg(cookieName, subTitle, detail)
    chen.done()
  })
}

function init() {
  isSurge = () => {
    return undefined === this.$httpClient ? false : true
  }
  isQuanX = () => {
    return undefined === this.$task ? false : true
  }
  getdata = (key) => {
    if (isSurge()) return $persistentStore.read(key)
    if (isQuanX()) return $prefs.valueForKey(key)
  }
  setdata = (key, val) => {
    if (isSurge()) return $persistentStore.write(key, val)
    if (isQuanX()) return $prefs.setValueForKey(key, val)
  }
  msg = (title, subtitle, body) => {
    if (isSurge()) $notification.post(title, subtitle, body)
    if (isQuanX()) $notify(title, subtitle, body)
  }
  log = (message) => console.log(message)
  get = (url, cb) => {
    if (isSurge()) {
      $httpClient.get(url, cb)
    }
    if (isQuanX()) {
      url.method = 'GET'
      $task.fetch(url).then((resp) => cb(null, resp, resp.body))
    }
  }
  post = (url, cb) => {
    if (isSurge()) {
      $httpClient.post(url, cb)
    }
    if (isQuanX()) {
      url.method = 'POST'
      $task.fetch(url).then((resp) => cb(null, resp, resp.body))
    }
  }
  done = (value = {}) => {
    $done(value)
  }
  return { isSurge, isQuanX, msg, log, getdata, setdata, get, post, done }
}

// 打印cookies
console.log('115生活 Cookies:', cookieVal)
