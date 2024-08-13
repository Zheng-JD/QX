// 115_cookie.js

const cookieName = '115生活';
const cookieKey = '115_cookie';
const cookieVal = $request.headers['Cookie'];

if (cookieVal) {
    const saved = $prefs.setValueForKey(cookieVal, cookieKey);
    if (saved) {
        $notify(cookieName, '获取Cookie成功 🎉', cookieVal);
    } else {
        $notify(cookieName, '获取Cookie失败', '无法保存Cookie');
    }
} else {
    $notify(cookieName, '获取Cookie失败', '未找到Cookie');
}

$done({});
