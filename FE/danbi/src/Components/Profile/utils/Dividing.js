export const dividing = (data) => {
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
            dividedData.push(data[i]);
        }

        if(dividedData.length === 8) {
            totalData.push(dividedData);
            dividedData = [];
        }

        if(totalData.length % 2 === 0 && data[i] === undefined){
            return totalData;
        }
        i++;
    }
}