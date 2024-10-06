import requests

auth = 'eyJraWQiOiIyMDI0MTAwMjA4NDIiLCJhbGciOiJSUzI1NiJ9.eyJpYW1faWQiOiJBYmlQWEVsakNWLWU4OWZlODYxLTQ0OGYtNDkyMS1iNDhkLWE1ZDBhOWZlZTQzYiIsImlkIjoiQWJpUFhFbGpDVi1lODlmZTg2MS00NDhmLTQ5MjEtYjQ4ZC1hNWQwYTlmZWU0M2IiLCJyZWFsbWlkIjoiQWJpUFhFbGpDViIsImp0aSI6ImNhOGFmZTNmLTE5YmUtNDU2NC04NTE1LWIyNGY5ZTliNDUwMSIsImlkZW50aWZpZXIiOiJlODlmZTg2MS00NDhmLTQ5MjEtYjQ4ZC1hNWQwYTlmZWU0M2IiLCJnaXZlbl9uYW1lIjoibm90c2V0IiwiZmFtaWx5X25hbWUiOiJub3RzZXQiLCJuYW1lIjoic3R1ZGVudF9hNmZuaTciLCJlbWFpbCI6InN0dWRlbnRfYTZmbmk3QHRlY2h6b25lLmlibS5jb20iLCJzdWIiOiJzdHVkZW50X2E2Zm5pNyIsImF1dGhuIjp7InN1YiI6InN0dWRlbnRfYTZmbmk3IiwiaWFtX2lkIjoiQWJpUFhFbGpDVi1lODlmZTg2MS00NDhmLTQ5MjEtYjQ4ZC1hNWQwYTlmZWU0M2IiLCJuYW1lIjoic3R1ZGVudF9hNmZuaTciLCJnaXZlbl9uYW1lIjoibm90c2V0IiwiZmFtaWx5X25hbWUiOiJub3RzZXQiLCJlbWFpbCI6InN0dWRlbnRfYTZmbmk3QHRlY2h6b25lLmlibS5jb20ifSwiYWNjb3VudCI6eyJ2YWxpZCI6dHJ1ZSwiYnNzIjoiOGE0MjU1N2Y4MmViNDU2MjgyNzM3OGM5N2Y4MzQzNzQiLCJpbXNfdXNlcl9pZCI6IjEyNzQ3NTYzIiwiZnJvemVuIjp0cnVlLCJpc19lbnRlcnByaXNlX2FjY291bnQiOmZhbHNlLCJlbnRlcnByaXNlX2lkIjoiZWU1NzVjNTc3ODc2NGQ0MDkxNTVhYTM1NzgwZWM4ZDEiLCJpbXMiOiIyOTQ1MjM3In0sImlhdCI6MTcyODE1MDQ0MywiZXhwIjoxNzI4MTU0MDQzLCJpc3MiOiJodHRwczovL2lhbS5jbG91ZC5pYm0uY29tL2lkZW50aXR5IiwiZ3JhbnRfdHlwZSI6InVybjppYm06cGFyYW1zOm9hdXRoOmdyYW50LXR5cGU6YXBpa2V5Iiwic2NvcGUiOiJpYm0gb3BlbmlkIiwiY2xpZW50X2lkIjoiZGVmYXVsdCIsImFjciI6MSwiYW1yIjpbInB3ZCJdfQ.ik6S0Q3qLXAbqvPe8oBVel8Y-H8oHQSYLy_EWv9ncXEHrK8oD8fXDxb12KqZ8-2pIlNHLvGOWLiCQmvqx9KvWTegrUSQJ8KclvHmt3vpiILVPw9pd_MqrxELiKCREEaba2IE1TPAxF4nsKCMHKfdIw-FqB948INRFsl8H9YuCbr89-zXROFa74zzv0T64vCzi9TNxcPO2MATt0p60PLPzDBkK0rrNrx1BTCXM9AMYXwi8lZuowtooobtxB55WxUQzl7vHtjQlH3kkPhf1K-0NWy-frcC4rB_x0jTwJkNW6GPRZYZ9LlErZyXxPl7H87UhXuzDOe8bbK18-AK_wO_Dg'

url = "https://us-south.ml.cloud.ibm.com/ml/v1/text/generation?version=2023-05-29"
headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + auth
}


system_messages = """
Role Definition: You are a text simplifier tasked with simplifying content from a web page.

Response Limitation:

Provide only the simplified text.
Do not include explanations, thoughts, or comments.
Avoid any jargon whatsoever in your output.

Output Format: Return only the simplified string.

Simplification Guidelines:

Make the text very easy to understand.
Use very simple words instead of difficult ones.
Keep sentences rather short and clear.
Give only the simplified text, without extra notes or comments.
Do not explain or add any thoughts.

Simplification Style:

Focus on clarity and correctness.
Your sole task is to perform this simplification.
"""

input_paragraph = """As globalization accelerates, the intricate interplay of cultural exchange, economic interdependence, and geopolitical dynamics has led to both unprecedented opportunities for collaboration and significant challenges in preserving local identities and addressing social inequalities."""

input_text = f"""
{system_messages}
Simplify this text a lot {input_paragraph}
"""

payload = {
    "input": input_text,
    "parameters": {
        "decoding_method": "sample",
        "max_new_tokens" : 200,
        "temperature": 0.9,
        "top_k": 50,
        "repetition_penalty": 1.12
    },
    "model_id": "meta-llama/llama-3-1-70b-instruct",
    "project_id": "a48794dc-782a-4d8e-bbea-051ef620838b",
}

response = requests.post(url, headers=headers, json=payload)
response_json = response.json()

simplified_text = response_json["results"][0]["generated_text"].strip()
print(simplified_text)
