function convertToRoman(num) {
    let roman="";
    let romanNumeral=["M", "CM", "D", "CD", "C", "XC","L","XL","X","IX","V","IV","I"];
    let numbers = [1000,900,500,400,100,90,50,40,10,9,5,4,1];
for(let x=0;x<numbers.length;x++){
    //console.log(x);
    while(num>=numbers[x]){
        roman += romanNumeral[x];
        num -=numbers[x];
    }
}

 return roman;
}

convertToRoman(36);
console.log(convertToRoman(36));