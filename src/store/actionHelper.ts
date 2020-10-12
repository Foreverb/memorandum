import ItemData from '@/model/itemData';
import DataHelper from "./dataHelper";
class ActionHelper {
    dataHelper: any;
    constructor() {
        this.dataHelper = new DataHelper("bookData","id")
    }
    filterType(id: number): string {
        const arr = ["工作","学习","生活"];
        return arr[id];
      }
    read(): any {
        const arr = this.dataHelper.readData();
        return arr;
    }
    save( data: Array<ItemData> ): void {
        this.dataHelper.saveData(data);
    }
    add( data: ItemData ): number {
        const dataArr = this.dataHelper.readData();
        const newId = dataArr[dataArr.length-1] ? dataArr[dataArr.length-1].indexId+1 : 0;
        dataArr.push(data);
        localStorage.setItem("bookData",JSON.stringify(dataArr));
        return newId;
    }
    delete( index: number ): boolean {
        const data = this.read();
        
        const deleteId = data.findIndex((i: any)=>{
            return i.indexId === index
        })
        if( deleteId > -1 ) {
            data.splice(deleteId,1);
            localStorage.setItem("bookData",JSON.stringify(data));
            return true;
        }
        return false
    }
}
export default ActionHelper;