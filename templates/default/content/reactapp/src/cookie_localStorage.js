export function add(x, y) {
    return x + y
}

export function mutiply(x, y) {
    return x * y
}


var phpcms_path = '/';
var cookie_pre = 'sYQDUGqqzH';
var cookie_domain = '';
var cookie_path = '/';
export function getcookie(name) {
    name = cookie_pre+name;
    var arg = name + "=";
    var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0;
    while(i < clen) {
        var j = i + alen;
        if(document.cookie.substring(i, j) == arg) return getcookieval(j);
        i = document.cookie.indexOf(" ", i) + 1;
        if(i == 0) break;
    }
    return null;
}

export function setcookie(name, value, days) {
    console.log(cookie_pre+name)
    name = cookie_pre+name;
    var secure = true;
    var expire = new Date();
    if(days==null || days==0) days=1;
    expire.setTime(expire.getTime() + 3600000*24*days);
    document.cookie = name + "=" + escape(value) + ("; path=" + cookie_path) + ((cookie_domain == '') ? "" : ("; domain=" + cookie_domain)) + ((secure == true) ? "; secure" : "") + ";expires="+expire.toGMTString();
}

export function delcookie(name) {
    var exp = new Date();
    exp.setTime (exp.getTime() - 1);
    var cval = getcookie(name);
    name = cookie_pre+name;
    document.cookie = name+"="+cval+";expires="+exp.toGMTString();
}

export function getcookieval(offset) {
    var endstr = document.cookie.indexOf (";", offset);
    if(endstr == -1)
        endstr = document.cookie.length;
    return unescape(document.cookie.substring(offset, endstr));
}
