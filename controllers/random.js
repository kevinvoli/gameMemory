exports.functions = class{
    static random(images,params=60){
        let verif_El = [];
        const output = [];
        for(let i = 0; i < images.length*2; i++){
            if(verif_El.length === images.length){
                verif_El = [];
            }
            let number = Math.floor(Math.random() * images.length);
            while(verif_El.includes(number)){
                number = Math.floor(Math.random() * images.length)
            }
            output.push(`<img src='/images/${images[number]}' style="height:${params}px;widht:${params}px">`);
            verif_El.push(number);
        }
        return output;
    }


    static setImage(images,number){
        let output = [];
        let s = 0;
        for(let i = 0; i < number; i++){
            if(s === images.length-1){
                s = 0;
            }
            output.push(images[s]);
            s++;
        }
        return output;
    }

    static gettimes(time){

        console.log("Time::",time)
        var h=  Math.floor(time/3600);
        time -= (h*3600)
        var m=  Math.floor(time/60);
        time -= m*60  
       var  s=  Math.floor(time);
       time -= s*1
       let temp = {
           heurs:h,
           minutes:m,
           seconds:s
       };


        return temp
    }

};