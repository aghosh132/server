const jwt = require("jsonwebtoken")

const db = require('./db')







// userDetails = {

//   1000: { username: "anu", acno: 1000, password: "abc123", balance: 0, transactions: [] },
//   1001: { username: "abu", acno: 1001, password: "abc12", balance: 0, transactions: [] },
//   1002: { username: "sha", acno: 1002, password: "abc132", balance: 0, transactions: [] },
//   1003: { username: "subin", acno: 1003, password: "abc143", balance: 0, transactions: [] }
// }



register = (acno, uname, psw) => {
  //store the resolved output of findone in a variable user
  return db.User.findOne({ acno }).then(user => {
    // if acno present in db then get the object of that user else null response 
    if (user) {
      return {
        status: false,
        message: "user already present",
        statusCode: 404


      }
    }
    else {
      newUser = new db.User({
        username: uname,
        acno,
        password: psw,
        balance: 0,
        transactions: []

      })
      newUser.save()
      return {
        status: true,
        message: "registered",
        statusCode: 200
      }
    }
  }
  )
}

login = (acno, psw) => {
  return db.User.findOne({ acno, password: psw }).then(user => {
    if (user) {
      currentUser = user.username
      currentAcno = acno
      const token = jwt.sign({ acno }, "superkey1")
      return {
        status: true,
        message: "login success",
        statusCode: 200,
        currentAcno, currentUser, token

      }
    }
    else {
      return {
        status: false,
        message: "incorrect password or acountnumber",
        statusCode: 404


      }
    }
  }
  )






  // if (acno in userDetails) {
  //   if (psw == userDetails[acno]["password"]) {
  //     //store currentUser
  //     currentUser = userDetails[acno]["username"]
  //     currentAcno = acno
  //     //token create
  //     const token = jwt.sign({ acno }, "superkey1")
  //     return {
  //       status: true,
  //       message: "login success",
  //       statusCode: 200,
  //       currentAcno,
  //       currentUser, token
  //     }
  //   }
  //   else {
  //     return {
  //       status: false,
  //       message: "incorrect password",
  //       statusCode: 404


  //     }

  //   }
  // }
  // else {
  //   return {
  //     status: false,
  //     message: "user not registered",
  //     statusCode: 404


  //   }
  // }
}

deposit = (acno, psw, amnt) => {
  amount = parseInt(amnt)
  return db.User.findOne({ acno, password: psw }).then(user => {
    if (user) {
  user.balance += amount

      // add transaction data
      user.transactions.push(
        {
          Type: "Credit",
          Amount: amnt
        }
      )
      user.save()
      return {
        status: true,
        message: `your ac has been credited with amount ${amount} and the balance is ${user.balance}`,
        statusCode: 200
      }
    }
    else {
      return {
        status: false,
        message: "incorrect password or acno",
        statusCode: 404


      }
    }
  }
  )
}


withdrow = (acno, psw, amnt) => {
  amount = parseInt(amnt)
return db.User.findOne({acno,password:psw}).then(user=>{
  if (user) {
    if (user.balance >=amount) {
      if (user.balance -=amount) {
        
        // add transaction

        user.transactions.push(
          {
            Type: "Debit",
            Amount: amount
          }
        )
user.save()
        

        return {
          status: true,
          message: `your ac has been debited with amount ${amount} and the balance is ${user.balance}`,
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


})}

getTransaction = (acno) => {

  return db.User.findOne({acno}).then(user=>{
  return {
    status: true,
    transaction: user.transactions,
    statusCode: 200
  }
})}


deleteAcc =(acno)=>{

return db.User.deleteOne({acno}).then(user=>{
if (user) {
  return{
    status:true,
    message:"ac deleted",
    statusCode:200
  }
}
else{
  return{
    status:false,
    message:"ac not present",
    statusCode:401
  }
}

})

}

module.exports = {
  register, login, deposit, withdrow, getTransaction,deleteAcc
}

