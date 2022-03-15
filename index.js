// function that will take two numbers and add them together//
function add(first_num, next_num) {
    return first_num + next_num;
}

// function that will take two numbers and subtract them together//
function subtract(first_num, next_num) {
    return first_num - next_num;
}

// function that will take two numbers and multiply them together//
function multiply(first_num, next_num) {
    return first_num * next_num;
}

// function that will take two numbers and divide them together//
function divide(first_num, next_num) {
    return first_num / next_num;
}

// creating variables for buttons on calculator and operands to funciton//

const numButtons = document.querySelectorAll('[data-number]')

const operandButtons = document.querySelectorAll('[data-operation]')

const equalsButton = document.querySelector('[data-equals]')

const clearButton = document.querySelector('[data-clear]')

const deleteButton = document.querySelector('[data-delete]')

const priorOperandText = document.querySelector('[data-prior-operand]')

const currentOperandText = document.querySelector('[data-current-operand]')

// Creating a class for calculator functionallity//

class Calculator {
    constructor(priorOperandText, currentOperandText) {
        this.priorOperandText = priorOperandText
        this.currentOperandText = currentOperandText
        this.clear()
    }
    // clears up any operations that have been inputted // 
    clear () {
        this.priorOperand = ''
        this.currentOperand = ''
        this.operation = undefined
    }
    delete () {
        // convert current digit to string so that it can be deleted with slice method//
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
    // convert inputed numbers to string to add more digits in current operand//
    addNumToOperand(number) {
        // only allow one decimal to be added into operand//
        if (number === '.' && this.currentOperand.includes('.')) 
        return

        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
    // pass the current operand as prior so that the next number can be included//
    selectOperator(operation) {
        // only allow operand buttons to be clicked once when first operand is passed//
        if (this.currentOperand === '')
        return
        // allow updated prior operand to be calculated if choosing to select more operands//
        if (this.priorOperand !== '') {
            this.calculate()
        }
        this.operation = operation
        this.priorOperand = this.currentOperand
        this.currentOperand = ''
    }
    // computs the current and prior operands, returning the result
    calculate() {
        let computation
        const priorVariable = parseFloat(this.priorOperand)
        const currentVariable = parseFloat(this.currentOperand)
        // prevent user from pressing equals button without numbers being inputed//
        if (isNaN(priorVariable) || isNaN(currentVariable))
        return
        // adding multiple if statements depending on the operand that is chosen//
        switch (this.operation) {
            case '+':
                computation = priorVariable + currentVariable
                break
            case '-':
                computation = priorVariable - currentVariable
                break
            case '*':
                computation = priorVariable * currentVariable
                break
            case '/':
                // return error message if user tries to divide by 0//
                if (currentVariable === 0) 
                this.error = "Error, can't divide by 0"
                // calculate normally//
                else computation = priorVariable / currentVariable
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.priorOperand = ''
    }
    // changes the current operator number & updates the prior operator//
    updateScreen() {
        //if the user tries to divide by 0...//
        if (this.error) {
            this.currentOperandText.innerText = this.error
        }
        this.currentOperandText.innerText = this.displayNum(this.currentOperand)
        // adds the operand symbol with prior operand for easier readibility //
        if (this.operation != null) {
            this.priorOperandText.innerText = `${this.displayNum(this.priorOperand)} ${this.operation}`
        } else {
            this.priorOperandText.innerText = ''
        }
    }
    // automatically inputs commas depending on how many digits are included//
    // Also be able to add a decimal prior to inputting any numbers onto current operator//
    displayNum(number) {
        const stringNum = number.toString()
        const intDigits = parseFloat(stringNum.split('.')[0])
        const decimalDigits = stringNum.split('.')[1]
        let intDisplay
        if (isNaN(intDigits)) {
            intDisplay = ''
        } else {
            intDisplay = intDigits.toLocaleString('en', {
            maximumFractionDigits: 0})
        }
        if (decimalDigits != null) {
            return `${intDisplay}.${decimalDigits}`
        } else {
            return intDisplay
        }
    }
}

// creating a function that allows use of current & prior operand//

const operator = new Calculator(priorOperandText, currentOperandText)

// creating accessability to number buttons onto display scree//
numButtons.forEach(button => {
    button.addEventListener('click', () => {
        operator.addNumToOperand(button.innerText)
        operator.updateScreen()
    })
})


// creating accessability to operand buttons onto display screen//
operandButtons.forEach(button => {
    button.addEventListener('click', () => {
        operator.selectOperator(button.innerText)
        operator.updateScreen()
    })
})


// creating accessability to calculate current & prior operands with equals button//
equalsButton.addEventListener('click', button => {
    operator.calculate()
    operator.updateScreen()
})


// creating accessability to clear any operations that have occurred and restart//
clearButton.addEventListener('click', button => {
    operator.clear()
    operator.updateScreen()
})

// creating accessability to delete last digit that was inputted onto the current //
//operand screen//

deleteButton.addEventListener('click', button => {
    operator.delete()
    operator.updateScreen()
})