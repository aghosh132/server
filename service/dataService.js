const jwt=require("jsonwebtoken")








userDetails = {

  1000: { username: "anu", acno: 1000, password: "abc123", balance: 0, transactions: [] },
  1001: { username: "abu", acno: 1001, password: "abc12", balance: 0, transactions: [] },
  1002: { username: "sha", acno: 1002, password: "abc132", balance: 0, transactions: [] },
  1003: { username: "subin", acno: 1003, password: "abc143", balance: 0, transactions: [] }
}



register = (acno, uname, psw) => {
  if (acno in userDetails) {
    return {
      status: false,
      message: "user already present",
      statusCode: 404


    }
  }
  else {
    userDetails[acno] = { username: uname, acno: acno, password: psw, balance: 0, transactions: [] }
    return {
      status: true,
      message: "registered",
      statusCode: 200
    }
  }
}


login = (acno, psw) => {

  if (acno in userDetails) {
    if (psw == userDetails[acno]["password"]) {
      //store currentUser
      currentUser = userDetails[acno]["username"]
      currentAcno = acno
//token create
const token=jwt.sign({acno},"superkey1")
      return {
        status: true,
        message: "login success",
        statusCode: 200,
        currentAcno,
        currentUser,token
      }
    }
    else {
      return {
        status: false,
        message: "incorrect password",
        statusCode: 404


      }

    }
  }
  else {
    return {
      status: false,
      message: "user not registered",
      statusCode: 404


    }
  }
}

deposit = (acno, psw, amnt) => {
  amount = parseInt(amnt)


  if (acno in userDetails) {
    if (psw == userDetails[acno]["password"]) {
      userDetails[acno]["balance"] += amount

      // add transaction data
      userDetails[acno]["transactions"].push(
        {
          Type: "Credit",
          Amount: amnt
        }
      )



      return {
        status: true,
        message: `your ac has been credited with amount ${amount} and the balance is ${userDetails[acno]["balance"]}`,
        statusCode: 200
      }

    }
    else {
      return {
        status: false,
        message: "incorrect password",
        statusCode: 404


      }
    }
  }
  return {
    status: false,
    message: "incorrect acno",
    statusCode: 404
  }
}


withdrow=(acno, psw, amnt)=> {
   amount = parseInt(amnt)

  if (acno in userDetails) {
    if (psw == userDetails[acno]["password"]) {
      if (amount <= userDetails[acno]["balance"]) {
        userDetails[acno]["balance"] -= amount
// add transaction

        userDetails[acno]["transactions"].push(
          {Type:"Debit",
        Amount:amount}
        )



        return {
          status: true,
          message: `your ac has been debited with amount ${amount} and the balance is ${userDetails[acno]["balance"]}`,
          statusCode: 200
        }
      }
      else {
        return {
          status: false,
          message: "insufficient balance",
          statusCode: 404
  
  
        }
      }
    }
    else {
      return {
        status: false,
        message: "incorrect password",
        statusCode: 404


      }
    }
  }
  return {
    status: false,
    message: "incorrect acno",
    statusCode: 404

  } 


}

getTransaction=(acno)=>{
  return{
    status:true,
    transaction:userDetails[acno].transactions,
    statusCode:200
  }
}
module.exports = {
  register, login, deposit,withdrow,getTransaction
}

