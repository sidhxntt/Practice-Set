class User {
    #bank_balance;
    #transactionHistory;

    constructor(name, age) {
        if (!name || !age) {
            throw new Error('Name and age are required');
        }
        if (typeof age !== 'number' || age < 0) {
            throw new Error('Age must be a positive number');
        }

        this.name = name;
        this.age = age;
        this.#bank_balance = 0;
        this.#transactionHistory = [];

        Object.defineProperty(this, 'atm', {
            get: () => this.#bank_balance,
            set: (amount) => {
                if (amount > 0 && !isNaN(amount)) {
                    this.#bank_balance += amount;
                    this.#transactionHistory.push({
                        type: 'deposit',
                        amount,
                        date: new Date(),
                        balance: this.#bank_balance
                    });
                } else {
                    throw new Error('Amount must be a positive number');
                }
            }
        });
    }

    withdraw(amount) {
        if (amount > 0 && !isNaN(amount)) {
            if (amount <= this.#bank_balance) {
                this.#bank_balance -= amount;
                this.#transactionHistory.push({
                    type: 'withdrawal',
                    amount,
                    date: new Date(),
                    balance: this.#bank_balance
                });
                return true;
            }
            throw new Error('Insufficient funds');
        }
        throw new Error('Amount must be a positive number');
    }

    getTransactionHistory() {
        return [...this.#transactionHistory];
    }

    getBalance() {
        return this.#bank_balance;
    }
}

class Admin extends User {
    #adminPrivileges;

    constructor(name, age, privileges = ['view', 'manage']) {
        super(name, age);
        this.isAdmin = true;
        this.#adminPrivileges = privileges;
    }

    toString() {
        return `Admin: ${this.name} (Age: ${this.age})`;
    }

    getPrivileges() {
        return [...this.#adminPrivileges];
    }

    addPrivilege(privilege) {
        if (!this.#adminPrivileges.includes(privilege)) {
            this.#adminPrivileges.push(privilege);
        }
    }

    viewUserDetails(user) {
        if (user instanceof User) {
            return {
                name: user.name,
                age: user.age,
                balance: user.getBalance(),
                transactions: user.getTransactionHistory()
            };
        }
        throw new Error('Invalid user');
    }
}

// Example usage:
try {
    // Regular user
    const user1 = new User('Siddhant', 21);
    user1.atm = 1000;
    console.log(`${user1.name}'s balance: ${user1.atm}`);
    user1.withdraw(500);
    console.log(`${user1.name}'s balance after withdrawal: ${user1.atm}`);
    console.log('Transaction history:', user1.getTransactionHistory());

    // Admin user
    const admin1 = new Admin('Pri', 23, ['view', 'manage', 'delete']);
    admin1.atm = 5000;
    console.log(admin1.toString());
    console.log('Admin privileges:', admin1.getPrivileges());
    console.log('User details viewed by admin:', admin1.viewUserDetails(user1));

} catch (error) {
    console.error('Error:', error.message);
}