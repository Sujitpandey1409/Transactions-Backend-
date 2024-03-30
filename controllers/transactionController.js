const User = require('../models/User');
const Transactions = require('../models/Transactions')

const performTransaction = async(req,res)=>{
    const {lenderId, borrowerId, balance} = req.body
    try {
        if(!lenderId || !borrowerId || !balance){return res.status(400).json('id and balance required')}
        const lenderUser = await User.findOne({_id:lenderId})
        const borrowerUser = await User.findOne({_id:borrowerId})
        if(!lenderUser || !borrowerUser){return res.status(400).json('users not found')}
        if(Number(lenderUser.balance)<Number(balance)){return res.status(400).json('bad luck!"insufficient balance"')}
        lenderUser.balance = String(Number(lenderUser.balance)+Number(balance))
        borrowerUser.balance = String(Number(borrowerUser.balance)-Number(balance))
        console.log('balance',balance,'lenderUser.balance:',lenderUser.balance, borrowerUser.balance);
        
        await lenderUser.save()
        await borrowerUser.save()
        await Transactions.create({author:lenderId,name:lenderUser.name,email:lenderUser.email,balance:`-${balance}`})
        await Transactions.create({author:borrowerId,name:borrowerUser.name,email:borrowerUser.email,balance:`+${balance}`})
        res.status(200).json("Transaction successful")
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}
const fetchTransactions = async(req,res)=>{
    try {
        const transactions = await Transactions.find()
        if(!transactions){return res.status(400).json('no transactions yet')}
        return res.status(200).json(transactions)
    } catch (error) {
        console.log(error)
    }
}
const deleteTransaction = async(req,res)=>{
    try {
        const{id} = req.body
        const transaction = await Transactions.findByIdAndDelete(id)
        return res.status(200).json('history removed successfully')

    } catch (error) {
        res.status(500).json(error)
    }
}
module.exports = {performTransaction, fetchTransactions, deleteTransaction}
