import client from "prom-client";

// Collect default metrics (Prometheus instance to collect default metrics)
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({
  register: client.register
});

// Custom metric to track the request-response time (Histogram)
const reqResTime = new client.Histogram({
  name: "http_express_req_res_time",
  help: "This tells how much time is taken for a single req-res cycle.",
  labelNames: ['method', 'route', 'status_code'],
  buckets: [1, 50, 100, 200, 400, 500, 800, 1000, 2000] // Time intervals (milliseconds)
});

// Custom Counter: Total number of requests received
const totalRequests = new client.Counter({
  name: "http_requests_total",
  help: "Total number of requests received",
  labelNames: ['method', 'route', 'status_code']
});

// Custom Gauge: Number of in-progress requests
const inProgressRequests = new client.Gauge({
  name: "http_requests_in_progress",
  help: "Number of requests currently being processed",
  labelNames: ['method', 'route']
});

// Custom Summary: Measures request duration in quantiles (percentiles)
const requestDuration = new client.Summary({
  name: "http_request_duration_summary",
  help: "Request duration in quantiles",
  labelNames: ['method', 'route', 'status_code'],
  percentiles: [0.5, 0.9, 0.99] // 50th, 90th, and 99th percentile
});

export { client, reqResTime, totalRequests, inProgressRequests, requestDuration };