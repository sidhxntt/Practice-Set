download:
	go mod download

race:
	go run -race main.go

dev:
	air

build:
	go build -o bin/app

test:
	go test ./...

lint:
	golangci-lint run

clean:
	rm -rf bin tmp

tidy :
	go mod tidy

schema-migrate:
	npx prisma migrate dev --name init

schema-validate:
	npx prisma validate

schema-format:
	npx prisma format

seed:
	npx prisma db seed
	
prisma-generate:
	npx prisma generate


# Ensure Go bin is in PATH
export PATH := $(PATH):$(HOME)/go/bin
SWAG := $(shell which swag)
.PHONY: swag swagger-install

swagger-install:
	@echo "Installing swag CLI..."
	go install github.com/swaggo/swag/cmd/swag@latest

swag:
	@if [ -z "$(SWAG)" ]; then \
		echo "swag not found, installing..."; \
		$(MAKE) swagger-install; \
	fi
	swag init
