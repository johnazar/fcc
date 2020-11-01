function telephoneCheck(str) {
    // use https://regex101.com/ to generate regexp
    let myreg = /^(1\s?)?(\d{3}|\(\d{3}\))[\-\s]?\d{3}[\-\s]?\d{4}$/;
    return myreg.test(str);
  }
  
  telephoneCheck("555-555-5555");
  