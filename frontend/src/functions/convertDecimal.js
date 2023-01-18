const convertDecimal = (num) => {
  
  let splitNumber = num.toString().split('.')
  let rejoinedNumber = splitNumber.join(',')
  
  return rejoinedNumber
}

export default convertDecimal;

