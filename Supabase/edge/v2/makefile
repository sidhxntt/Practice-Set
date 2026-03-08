PROJECT=v1

# -----------------
# Supabase core
# -----------------

start:
	supabase start

stop:
	supabase stop --project-id $(PROJECT)

restart:
	supabase stop --project-id $(PROJECT)
	supabase start

status:
	supabase status

reset:
	supabase db reset

push:
	supabase db push

pull:
	supabase db pull


# -----------------
# Migration
# -----------------

migration:
	supabase migration new $(name)

migrate-reset:
	supabase db reset

migrate-push:
	supabase db push


# -----------------
# Edge functions
# -----------------

new-fn:
	supabase functions new $(name)

serve-fn:
	supabase functions serve --no-verify-jwt

deploy-fn:
	supabase functions deploy $(name)

delete-fn:
	supabase functions delete $(name)

list-fn:
	supabase functions list


# -----------------
# Secrets
# -----------------

secrets-list:
	supabase secrets list

secrets-set:
	supabase secrets set $(key)=$(value)


# -----------------
# Docker helpers
# -----------------

docker-stop:
	docker stop $$(docker ps -q)

docker-clean:
	docker stop $$(docker ps -q)
	docker rm -f $$(docker ps -aq)

nuke:
	docker stop $$(docker ps -q)
	docker rm -f $$(docker ps -aq)
	supabase stop --all


# -----------------
# Open tools
# -----------------

studio:
	open http://127.0.0.1:54323

api:
	open http://127.0.0.1:54321

functions-url:
	echo http://127.0.0.1:54321/functions/v1