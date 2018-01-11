//去左空格;
function ltrim(s){
    return s.replace(/(^\s*)/g, "");
}
//去右空格;
function rtrim(s){
    return s.replace(/(\s*$)/g, "");
}
//去左右空格;
export default function trim(s){
    return s.replace(/(^\s*)|(\s*$)/g, "").replace(/(^\")|(\"$)/g,"");
    // return s.replace(/(^\s*)|(\s*$)/g, "");
}

export function trimEnter(s){
    return s.replace(/\r/g, "").replace(/\n/g, "<br/>");
}