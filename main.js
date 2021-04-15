
let totalExpenses = 0
let totalIncomes = 0
let total = 0

cont = 3

const Modal = {
    openIncome() {
        modalOverlay = document.querySelector('.modal-overlay').classList.add('active')
        modalIncome = document.querySelector('.modal-expense').classList.add('active', 'animate__animated', 'animate__fadeInDown')
    },
    openExpanse() {
        modalOverlay = document.querySelector('.modal-overlay').classList.add('active')
        modalExpanse = document.querySelector('.modal-income').classList.add('active', 'animate__animated', 'animate__fadeInDown')
    },
    close() {
        modalOverlay = document.querySelector('.modal-overlay').classList.remove('active')
        modalIncome = document.querySelector('.modal-income').classList.remove('active', 'animate__animated', 'animate__fadeInDown')
        modalExpanse = document.querySelector('.modal-expense').classList.remove('active', 'animate__animated', 'animate__fadeInDown')

        DOM.forms = {}


    }
}

const transactions = [{
    id: 1,
    description: 'Luz',
    amount: -50000,
    date: '2021/01/01',
}, {
    id: 2,
    description: 'Website',
    amount: 500000,
    date: '2021/01/01',

}, {
    id: 3,
    description: 'Internet',
    amount: -20000,
    date: '2021/01/01',

}]


const DOM = {


    forms: {},
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = this.innerHTMLTransaction(transaction)
        this.transactionsContainer.appendChild(tr)
    },
    innerHTMLTransaction(transaction) {

        cssClass = transaction.amount > 0 ? 'income' : 'expense'

        const amount = Utils.formatCurrency(transaction.amount)

        const html = `
            <td class="description">${transaction.description}</td>
            <td class="${cssClass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td><a href="#" onclick="DOM.deleteTransaction(${transaction.id})"><img src="assets/minus.svg" alt="Remover transação"></a></td>
        `

        return html
    },
    updateBalance() {

        expensesDisplay = document.querySelector('#expensesDisplay')
        incomesDisplay = document.querySelector('#incomesDisplay')
        totalDisplay = document.querySelector('#totalDisplay')

        expensesDisplay.innerText = Utils.formatCurrency(totalExpenses)
        incomesDisplay.innerText = Utils.formatCurrency(totalIncomes)
        totalDisplay.innerText = Utils.formatCurrency(total)
    },
    addIncome() {
        forms = {
            id: cont,
            description: document.querySelector('.description.income'),
            amount: document.querySelector('.amount.income'),
            date: document.querySelector('.date.income')
        }

        console.log(forms.description)

        if (forms.description.value == '') {

            description.classList.add('animate__animated','animate__shakeX')

            setTimeout(function() {
                description.classList.remove('animate__animated','animate__shakeX')
            },1500)
      
        } 
        if (forms.amount.value == '') {

            amount.classList.add('animate__animated','animate__shakeX')

            setTimeout(function() {
                amount.classList.remove('animate__animated','animate__shakeX')
            },1500)
      
        } 
        if (forms.date.value == '') {

            date.classList.add('animate__animated','animate__shakeX')

            setTimeout(function() {
                date.classList.remove('animate__animated','animate__shakeX')
            },1500)
      
        }

        if (forms.description.value != '' && forms.amount.value != '' && forms.date.value != '') {
            cont++

            transactions.push({
                id: this.id,
                description: forms.description.value,
                amount: forms.amount.value,
                date: forms.date.value
            })
            
            Utils.updateTransactions()

            forms.description.value = ''
            forms.amount.value = ''
            forms.date.value = ''

            Modal.close()
        }
    },
    addExpense() {
        forms = {
        id: cont,
        description: document.querySelector('.description.expense'),
        amount: document.querySelector('.amount.expense'),
        date: document.querySelector('.date.expense')
        }

        console.log(forms.description)

        if (forms.description.value == '') {

            forms.description.classList.add('animate__animated', 'animate__shakeX')
            setTimeout(function(){
                forms.description.classList.remove('animate__animated', 'animate__shakeX')
            },1500)
        }

        if (forms.amount.value == '') {
            forms.amount.classList.add('animate__animated', 'animate__shakeX')
            setTimeout(function(){
                forms.amount.classList.remove('animate__animated', 'animate__shakeX')
            },1500)
        }

        if (forms.date.value == '') {
            forms.date.classList.add('animate__animated', 'animate__shakeX')
            setTimeout(function(){
                forms.date.classList.remove('animate__animated', 'animate__shakeX')
            },1500)
        }

        
        if (forms.description.value != '' && forms.amount.value != '' && forms.date.value != '') {
            cont++

            transactions.push({
                id: this.id,
                description: forms.description.value,
                amount: `-${forms.amount.value}`,
                date: forms.date.value
            })
            
            Utils.updateTransactions()

            forms.description.value = ''
            forms.amount.value = ''
            forms.date.value = ''

            Modal.close()
        }


        
    },
    deleteTransaction(id) {
        for (var i = 0, j = transactions.length; i !== j; i++) {
            if (transactions[i].id === id) break;
        }
        transactions.splice(i, 1);

        Utils.updateTransactions()
    }
}

const Utils = {

    formatData(date) {
        date = String(date).replace(/-/g,'/')

        return date
    },

    formatCurrency(value){
        const signal = Number(value) < 0 ? '-' : '+'

        value = String(value).replace(/\D/g, '')

        value = Number(value) / 100

        value = value.toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL'
        })

        if (signal == '-') {
            return signal + value
        } else {
            return value
        }

        
    },
    updateTransactions() {

        totalExpenses = 0
        total = 0
        totalIncomes = 0

        tbody = document.querySelector('#data-table tbody')
        tbody.innerHTML = ''

        if (transactions.length == 0) {
            DOM.updateBalance()
        }

        transactions.forEach(function(transaction) {

            transaction.amount = String(transaction.amount).replace(',', '')
            transaction.amount = String(transaction.amount).replace('.', '')
            transaction.amount = Number(transaction.amount)


            if (transaction.amount < 0) {


                totalExpenses += Number(transaction.amount)
                total += Number(transaction.amount)


            } else {
                totalIncomes += Number(transaction.amount)
                total += Number(transaction.amount)
            }
        
            transaction.date = Utils.formatData(transaction.date)
            
            DOM.addTransaction(transaction)
            DOM.updateBalance()
        })
    }

}

transactions.forEach(function(transaction) {
    if (transaction.amount < 0) {
        totalExpenses += transaction.amount
        total += transaction.amount
    } else {
        totalIncomes += transaction.amount
        total += transaction.amount

    }
    DOM.addTransaction(transaction)
})

DOM.updateBalance()