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

.PHONY: supabase-migrate
supabase-migrate:
	@if [ ! -f ./supabase_migrate.sh ]; then \
		echo "supabase_migrate.sh not found"; exit 1; \
	fi
	@chmod +x ./supabase_migrate.sh
	@./supabase_migrate.sh