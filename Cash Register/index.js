const REGISTER_STATUS ={
  closed: 'CLOSED',
  insufficient_funds: 'INSUFFICIENT_FUNDS',
  open:'OPEN'
}
function checkCashRegister(price, cash, cid) {
    //cid change in drawer
  let cashRegister={status:'',change: cid};
  //console.log("CID",cid.length);
  // how mush change needed 
  const changeNeeded = parseFloat(cash-price).toFixed(2);
  //console.log("changeNeeded" , changeNeeded);
  const changeAvailable = getTotalCashRegisterChange(cid);
  //console.log("changeAvailable", changeAvailable);
  cashRegister.status = getCashRegisterStatus(changeNeeded,changeAvailable);
  //console.log(cashRegister.status);
  // in case we do not have insufficient_funds
  if(cashRegister.status == REGISTER_STATUS.insufficient_funds){
    cashRegister.change =[];
    //console.log(cashRegister);
    return cashRegister;
  }
  cashRegister.change = getChange(changeNeeded, cid);
  //console.log(cashRegister.change);
  if(changeNeeded>getTotalCashRegisterChange(cashRegister.change)){
    cashRegister.status = REGISTER_STATUS.insufficient_funds;
    cashRegister.change =[];
    
  }
  if(cashRegister.status == REGISTER_STATUS.closed){
    cashRegister.change =[...cid];
    //console.log(cashRegister);
    
  }



  return cashRegister;
  }

  //supplementary functions

  function getChange(changeNeeded, changeInDrawer){
    const change=[];
    const currencyDictionary = {
      "PENNY": 0.01,
      "NICKEL": 0.05,
      "DIME": 0.10,
      "QUARTER": 0.25,
      "ONE": 1.00,
      "FIVE": 5.00,
      "TEN": 10.00,
      "TWENTY": 20.00,
      "ONE HUNDRED": 100.00
    };
    console.log(changeInDrawer);
    for(let x = changeInDrawer.length-1 ; x >=0 ; x--){
      const coinName = changeInDrawer[x][0];
      const coinTotal = changeInDrawer[x][1];
      const coinValue = currencyDictionary[coinName];
      let coinAmount = (coinTotal/coinValue).toFixed(2);
      let coinToReturn = 0;

      while(changeNeeded>=coinValue && coinAmount >0){
        changeNeeded-= coinValue;
        changeNeeded= changeNeeded.toFixed(2);
        coinAmount--;
        coinToReturn++;
      }
      console.log(coinToReturn);
      if(coinToReturn>0){
        change.push([coinName,coinToReturn*coinValue])
      }

    }
    return change;

  }


  function getCashRegisterStatus(changeNeeded, changeAvailable){
    if(Number(changeNeeded)>Number(changeAvailable)){
      return REGISTER_STATUS.insufficient_funds;
    }
    if(Number(changeNeeded)<Number(changeAvailable)){
      return REGISTER_STATUS.open;
    }
    return REGISTER_STATUS.closed;

  }

  function getTotalCashRegisterChange(changeInDrawer){
    let total = 0;
    for (let change of changeInDrawer){
      let changeValue = change[1]; //["PENNY", 1.01], changeValue = 1.01
      total +=changeValue
    }
    return total.toFixed(2);

  }
  
  checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
