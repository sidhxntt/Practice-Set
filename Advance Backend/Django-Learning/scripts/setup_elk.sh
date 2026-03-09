#!/bin/bash

set -e

# Define color codes
GREEN="\033[1;32m"
YELLOW="\033[1;33m"
CYAN="\033[1;36m"
MAGENTA="\033[1;35m"
BOLD="\033[1m"
RESET="\033[0m"


# Step 1: Start Docker Compose container
echo -e "${CYAN}📦 Step 1: Starting Docker Compose...${RESET}"
docker compose up -d
sleep 10

# Step 2 & 3: Manual password/token steps
echo -e "\n${MAGENTA}🖥️  Step 2 & 3: In a new terminal, run the following to reset password and get Kibana token:${RESET}"
echo -e "${YELLOW}---------------------------------------------------------------------${RESET}"
echo -e "${GREEN}docker exec -it es01 /usr/share/elasticsearch/bin/elasticsearch-reset-password -u elastic${RESET}"
echo -e "${GREEN}docker exec -it es01 /usr/share/elasticsearch/bin/elasticsearch-create-enrollment-token -s kibana${RESET}"
echo -e "${YELLOW}---------------------------------------------------------------------${RESET}"
echo -e "${BOLD}⚠️  Save the generated password and token for later steps!${RESET}"
read -p "$(echo -e ${CYAN}Press ENTER once done...${RESET})"

# Step 4: Copy CA cert
echo -e "${CYAN}🔐 Step 4: Copying CA certificate...${RESET}"
docker cp es01:/usr/share/elasticsearch/config/certs/http_ca.crt .

# Step 5: Test Elasticsearch
echo -e "\n${CYAN}🧪 Step 5: Test Elasticsearch connection...${RESET}"
read -p "$(echo -e ${MAGENTA}Enter the 'elastic' password you just reset: ${RESET})" ELASTIC_PASSWORD
curl --cacert http_ca.crt -u "elastic:$ELASTIC_PASSWORD" https://localhost:9200 || true

# Step 6: Test Elasticsearch
echo -e "${YELLOW}📌 Then update settings.py with your latest elastic password:${RESET}"
cat <<EOF

${GREEN}ELASTICSEARCH_DSL = {
    'default': {
        'hosts': 'https://localhost:9200',
        'http_auth': ('elastic', '$ELASTIC_PASSWORD'),
        'ca_certs': os.path.join(BASE_DIR, 'http_ca.crt'),
    }
}${RESET}
EOF

read -p "$(echo -e ${CYAN}Press ENTER after updating your settings.py...${RESET})"

# Step 7: Index models
echo -e "${CYAN}🔄 Step 7: Indexing Django models...${RESET}"
pdm run elasti || echo -e "${YELLOW}⚠️  Make sure 'elasti' is defined in pyproject.toml${RESET}"

# Step 8: Filebeat.yml update
echo -e "${CYAN}📄 Step 8: Updating Filebeat config...${RESET}"
cat <<EOF > filebeat.yml
filebeat.inputs:
  - type: filestream
    enabled: true
    paths:
      - /logs/request_logs/*.log
      - /logs/error_logs/*.log
    parsers:
      - ndjson:
          target: ""
          add_error_key: true
          expand_keys: true

output.elasticsearch:
  hosts: ["https://es01:9200"]
  protocol: "https"
  ssl.verification_mode: "none"
  username: "elastic"
  password: "$ELASTIC_PASSWORD"

setup.kibana:
  host: "https://kib01:5601"
  protocol: "https"
  ssl.verification_mode: "none"
EOF

echo -e "${CYAN}♻️  Restarting Filebeat container...${RESET}"
docker compose restart filebeat

# Final output and Kibana info
echo -e "\n${BOLD}${GREEN}✅ All done! Elasticsearch + Kibana + Django integration is ready!${RESET}"
echo -e "${BOLD}${CYAN}🌐 Access Kibana at: ${YELLOW}http://localhost:5601${RESET}"

# Kibana verification code
echo -e "\n${CYAN}🔐 Retrieving Kibana verification code...${RESET}"
docker exec -it kib01 /usr/share/kibana/bin/kibana-verification-code || echo -e "${YELLOW}⚠️  Unable to fetch verification code — check logs using 'docker logs kib01'${RESET}"

# Reminder
echo -e "\n${BOLD}${MAGENTA}💡 1. In Kibana, go to: ${YELLOW}Management → Dev Tools → Index Management${MAGENTA} to explore indexed Django API models.${RESET}"
echo -e "\n${BOLD}${MAGENTA}💡 2. In Kibana, go to: ${YELLOW}Stack Management → Data Views${MAGENTA} and create data view by name filebeat-* and select @timestamp.${RESET}"
echo -e "\n${BOLD}${MAGENTA}💡 3. In Kibana, search Logs to see your logs, create dashboard using it.${RESET}"
