export function stripStr(str) {
    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{}【 】‘；：”“'。，、？]")
    if (pattern.test(str)) {
        return false
    }
    return true



}