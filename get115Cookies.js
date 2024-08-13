```javascript
^https?:\/\/passportapi\.115\.com\/app\/1\.0\/web\/\w+\/login url script-response-body https://raw.githubusercontent.com/Zheng-JD/QX/main/get115Cookies.js

[rewrite_local]
^https?:\/\/passportapi\.115\.com\/app\/1\.0\/web\/\w+\/login url script-response-body get115Cookies.js

[mitm]
hostname = passportapi.115.com

[script]
get115Cookies.js = type=http-response,pattern=^https?:\/\/passportapi\.115\.com\/app\/1\.0\/web\/\w+\/login,requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/your_repo/get115Cookies.js
```
