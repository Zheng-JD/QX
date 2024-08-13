// 115cookies.js
const cookieName = '115'
const cookieKey = 'chen_115_cookie'
const notifyKey = 'chen_115_cookie_notify'
const chen = init()
const cookieVal = $request.headers['Cookie']

if (cookieVal) {
  if (chen.setdata(cookieVal, cookieKey)) {
    const oldNotifyTime = chen.getdata(notifyKey)
    const currentTime = new Date().getTime()
    
    // 检查是否在最近5分钟内已经发送过通知
    if (!oldNotifyTime || currentTime - oldNotifyTime > 5 * 60 * 1000) {
      chen.msg(`${cookieName}`, '获取Cookie: 成功', '')
      chen.log(`[${cookieName}] 获取Cookie: 成功, cookie: ${cookieVal}`)
      
      // 更新最后通知时间
      chen.setdata(currentTime.toString(), notifyKey)
    } else {
      chen.log(`[${cookieName}] 获取Cookie: 成功, 但在5分钟内已经通知过，不再重复通知`)
    }
  }
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
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  post = (url, cb) => {
    if (isSurge()) {
      $httpClient.post(url, cb)
    }
    if (isQuanX()) {
      url.method = 'POST'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  done = (value = {}) => {
    $done(value)
  }
  return { isSurge, isQuanX, msg, log, getdata, setdata, get, post, done }
}
chen.done()
