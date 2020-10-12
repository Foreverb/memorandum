class ItemData {
  title: string;
  content: string;
  createTime: any;
  typeId: number;
  indexId: number;
  constructor(
    title = "",
    content = "",
    createTime = new Date(),
    typeId = -1,
    indexId = 0
  ) {
    this.title = title;
    this.content = content;
    this.createTime = this.getLocalTime(createTime);
    this.typeId = typeId;
    this.indexId = indexId;
  }
  getLocalTime(date: any) {
    const Y: string = date.getFullYear() + "-";

    const M: string =
      (date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1) + "-";

    const D: string = date.getDate() + " ";

    const h: string = date.getHours() + ":";

    const m: string = date.getMinutes() + ":";

    const s: string = date.getSeconds();

    const str: string = Y + M + D + h + m + s;

    return str;
  }
}

export default ItemData;
