/**
 * @file 一些需求的代码样例，通常修改后进行使用
 * @author elf
 */
/**
 * 行转列，将 [{主键(pk)，数据项(key)，数据值(value)}] 重塑为符合表头的树状结构
 * @param data [主键，数据项，数据值]
 * @returns [{k1:{k2:v}}]
 */
export const rowToColumn = (data: { pk: string, key: string, value: string }[]) => {
    let resultMap = {}
    for (let item of data) {
        if (resultMap[item.pk] === undefined) resultMap[item.pk] = {}
        let cur = resultMap[item.pk]
        let keys = item.key.split("-")
        for (let i = 0; i < keys.length - 1; i++) {
            let key = keys[i]
            if (cur[key] === undefined) cur[key] = {}
            cur = cur[key]
        }
        cur[keys[keys.length - 1]] = item.value
    }

    //展平一级
    return Object.keys(resultMap).map(key => {
        return Object.assign({ "小区名称": key }, resultMap[key])
    })
}