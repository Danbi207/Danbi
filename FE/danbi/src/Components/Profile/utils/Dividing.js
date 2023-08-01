export const splitIntoPairs = (data) => {
    const totalData = [];
    let dividedData = [];
    let i = 0;
    let flag = true;
    while(flag === true){
        if(data[i] === undefined){
            const now = 8 - dividedData.length;
            for(let j=0; j < now;j++){
                dividedData.push(0);
            }
        } else {
            console.log(data[i])
            dividedData.push(data[i]);
            console.log(dividedData);
        }

        if(dividedData.length === 8) {
            console.log(dividedData.length);
            totalData.push(dividedData);
            dividedData = [];
        }

        if(totalData.length % 2 === 0 && data[i] === undefined){
            return totalData;
        }

        i++;
    }

}