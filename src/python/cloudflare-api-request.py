import requests

# Replace with your Cloudflare account ID and API key
auth = ("your-cloudflare-email", "your-cloudflare-api-key")
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + api_key
}

# Replace with the ID of the Transform rule you want to retrieve
transform_rule_id = "your-transform-rule-id"

url = f"https://api.cloudflare.com/client/v4/accounts/your-account-id/workers/transform/rules/{transform_rule_id}"

response = requests.get(url, headers=headers)

if response.status_code == 200:
    transform_rule = response.json()["result"]
    # Do something with the transform rule
else:
    print("Failed to retrieve transform rule. Response code:", response.status_code)
