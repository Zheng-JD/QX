/*
Quantumult X 脚本: 获取115生活app账号Cookies

Author: Zheng-JD
Github: https://github.com/Zheng-JD/QX
*/

const cookieName = '115生活';
const cookieKey = '115_cookie';

const url = $request.url;
const method = $request.method;
const headers = $request.headers;
const cookies = headers['Cookie'] || headers['cookie'];

if (cookies) {
    $prefs.setValueForKey(cookies, cookieKey);
    $notify(cookieName, 'Cookie获取成功', cookies);
    console.log(`${cookieName} 获取的Cookies: ${cookies}`);
} else {
    $notify(cookieName, 'Cookie获取失败', '无法获取Cookie');
}

$done({});
