package modules

import (
	crand "crypto/rand"
	"fmt"
	"math/big"
	"math/rand"
)

// Non-cryptographic randomness
func RandomNumberMath() {
	num := rand.Intn(5) + 1
	fmt.Println(num)
}

// Cryptographically secure randomness (recommended for security-sensitive applications as its more secure and accurate)
func RandomNumberMathWithCrypto() {
	num, err := crand.Int(crand.Reader, big.NewInt(5))
	if err != nil {
		panic(err) // handle appropriately in real code
	}

	fmt.Println(num.Int64() + 1)
}
