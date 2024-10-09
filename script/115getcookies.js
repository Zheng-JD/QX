#!name=115 Cookie获取
#!desc=自动获取115的Cookie
#!author=Assistant
#!homepage=https://github.com/your_username/your_repo
#!icon=https://raw.githubusercontent.com/your_username/your_repo/main/115.png

[Script]
http-request https:\/\/my\.115\.com\/proapi\/3\.0\/index\.php script-path=https://raw.githubusercontent.com/Zheng-JD/X/refs/heads/main/script/115cookies.js, requires-body=true, tag=115Cookie获取

[MITM]
hostname = my.115.com

[Script]
# 115 Cookie获取
115_cookie = type=http-request, pattern=https:\/\/my\.115\.com\/proapi\/3\.0\/index\.php, script-path=https://raw.githubusercontent.com/Zheng-JD/X/refs/heads/main/script/115cookies.js, requires-body=true, tag=115Cookie获取
