[rewrite_local]
# 115生活App 获取 Cookies
^https:\/\/webapi\.115\.com\/user\/signin.*$ url script-request-header 115_get_cookie.js

[mitm]
hostname = webapi.115.com

// 115_get_cookie.js
const cookieName = '115生活';
const cookieKey = '115_cookie';
const cookieVal = $request.headers['Cookie'];

if (cookieVal) {
    const saved = $prefs.setValueForKey(cookieVal, cookieKey);
    if (saved) {
        $notify(cookieName, '获取Cookie成功 🎉', 'Cookie已保存: ' + cookieVal);
    } else {
        $notify(cookieName, '获取Cookie失败', '无法保存Cookie');
    }
} else {
    $notify(cookieName, '获取Cookie失败', '请求中未找到Cookie');
}

$done({});
