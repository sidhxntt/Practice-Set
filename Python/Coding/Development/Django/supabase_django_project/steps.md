# STEPS
1. pdm init -n -> toml file copy -> pdm install.
2. change settings.py:
    1. database config, REST config, middlewares, **dont add app name before create it if u do so errors while creating the app.**
3. update .env and remove pgbounce from supabase connect url
