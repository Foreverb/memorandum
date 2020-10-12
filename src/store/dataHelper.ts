class DataHelper {
    localDataKey: string;
    itemId: string;
    constructor( localDataKey: string,itemId: string ) {
        this.localDataKey = localDataKey;
        this.itemId = itemId;
    }
    //读取localStorage里面的数据（查）
    readData(): any {
        let newData: any = [];
        const returnData: string | null = localStorage.getItem(this.localDataKey);
        if( returnData !== null ) {
            newData = JSON.parse(returnData);
        }
        return newData
    }
    //存储数据到localStorage中（存）
    saveData( data: Array<object> ): void {
        const str: string = JSON.stringify(data);
        localStorage.setItem(this.localDataKey,str);
    }   
    //增加一条数据放进localStorag中（增）
    addData( content: any ): number {
        const dataArr: any = this.readData();
        const newId = dataArr[dataArr.length-1] ? dataArr[dataArr.length-1][this.itemId]+1 : 0;
        dataArr[newId].push(content);
        localStorage.setItem(this.localDataKey,JSON.stringify(dataArr));
        return newId;
    }
    //删除一条localStorage里面的数据
    deleteData( index: number ): boolean {
        const arr = this.readData();
        const deleteId = arr.findIndex((ele: any)=>{
            return ele === index
        })
        if( deleteId > -1 ) {
            arr.splice(deleteId,1);
            localStorage.setItem(this.localDataKey,arr);
            return true
        }
        return false
    }
}
export default DataHelper;