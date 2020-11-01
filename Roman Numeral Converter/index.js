function convertToRoman(num) {
    let roman="";
    //Roman numerals
    let romanNumeral=["M", "CM", "D", "CD", "C", "XC","L","XL","X","IX","V","IV","I"];
    //decimal value for each Roman numerals
    let numbers = [1000,900,500,400,100,90,50,40,10,9,5,4,1];
    // loop throught number
for(let x=0;x<numbers.length;x++){
    //console.log(x);
    //if the giving number is bigger than our decimal
    //add the equivalent roman numeral to result
    //substract its equal value from the giving number
    //repeat
    while(num>=numbers[x]){
        roman += romanNumeral[x];
        num -=numbers[x];
    }
}

 return roman;
}

convertToRoman(36);
console.log(convertToRoman(36));
