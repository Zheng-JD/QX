// 脚本名称: 115App Cookie获取
// 脚本作者: Assistant
// 更新时间: 2024-05-09
// 脚本说明: 用于获取115App的cookies并存储

// 匹配115 API的URL
const url = 'https://my.115.com/proapi/3.0/index.php';

// 主函数
function get115Cookies() {
    if ($request && $request.method === 'GET') {
        const cookieValue = $request.headers['Cookie'] || $request.headers['cookie'];
        if (cookieValue) {
            const cookies = parseCookies(cookieValue);
            let needSave = false;
            let msg = '';

            // 检查并保存所需的cookie
            if (cookies.CID) {
                $persistentStore.write(cookies.CID, '115_CID');
                needSave = true;
                msg += 'CID ';
            }
            if (cookies.SEID) {
                $persistentStore.write(cookies.SEID, '115_SEID');
                needSave = true;
                msg += 'SEID ';
            }
            if (cookies.UID) {
                $persistentStore.write(cookies.UID, '115_UID');
                needSave = true;
                msg += 'UID ';
            }

            // 发送通知
            if (needSave) {
                $notification.post('115 Cookie获取成功', '', '已保存: ' + msg.trim());
            } else {
                $notification.post('115 Cookie获取失败', '', '请检查Cookie是否完整');
            }
        }
    }
    $done({});
}

// 辅助函数：解析cookie字符串
function parseCookies(cookieString) {
    const cookies = {};
    cookieString.split(';').forEach(pair => {
        const parts = pair.split('=');
        cookies[parts[0].trim()] = parts[1].trim();
    });
    return cookies;
}

// 执行主函数
get115Cookies();
