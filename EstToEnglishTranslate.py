import requests

auth  = 'eyJraWQiOiIyMDI0MTAwMjA4NDIiLCJhbGciOiJSUzI1NiJ9.eyJpYW1faWQiOiJBYmlQWEVsakNWLWU4OWZlODYxLTQ0OGYtNDkyMS1iNDhkLWE1ZDBhOWZlZTQzYiIsImlkIjoiQWJpUFhFbGpDVi1lODlmZTg2MS00NDhmLTQ5MjEtYjQ4ZC1hNWQwYTlmZWU0M2IiLCJyZWFsbWlkIjoiQWJpUFhFbGpDViIsImp0aSI6IjRmNjY1NjZjLWIxMWMtNDdlOS05Mjc4LTY2NzBmZDNiMGQxNSIsImlkZW50aWZpZXIiOiJlODlmZTg2MS00NDhmLTQ5MjEtYjQ4ZC1hNWQwYTlmZWU0M2IiLCJnaXZlbl9uYW1lIjoibm90c2V0IiwiZmFtaWx5X25hbWUiOiJub3RzZXQiLCJuYW1lIjoic3R1ZGVudF9hNmZuaTciLCJlbWFpbCI6InN0dWRlbnRfYTZmbmk3QHRlY2h6b25lLmlibS5jb20iLCJzdWIiOiJzdHVkZW50X2E2Zm5pNyIsImF1dGhuIjp7InN1YiI6InN0dWRlbnRfYTZmbmk3IiwiaWFtX2lkIjoiQWJpUFhFbGpDVi1lODlmZTg2MS00NDhmLTQ5MjEtYjQ4ZC1hNWQwYTlmZWU0M2IiLCJuYW1lIjoic3R1ZGVudF9hNmZuaTciLCJnaXZlbl9uYW1lIjoibm90c2V0IiwiZmFtaWx5X25hbWUiOiJub3RzZXQiLCJlbWFpbCI6InN0dWRlbnRfYTZmbmk3QHRlY2h6b25lLmlibS5jb20ifSwiYWNjb3VudCI6eyJ2YWxpZCI6dHJ1ZSwiYnNzIjoiOGE0MjU1N2Y4MmViNDU2MjgyNzM3OGM5N2Y4MzQzNzQiLCJpbXNfdXNlcl9pZCI6IjEyNzQ3NTYzIiwiZnJvemVuIjp0cnVlLCJpc19lbnRlcnByaXNlX2FjY291bnQiOmZhbHNlLCJlbnRlcnByaXNlX2lkIjoiZWU1NzVjNTc3ODc2NGQ0MDkxNTVhYTM1NzgwZWM4ZDEiLCJpbXMiOiIyOTQ1MjM3In0sImlhdCI6MTcyODE1MTk4NywiZXhwIjoxNzI4MTU1NTg3LCJpc3MiOiJodHRwczovL2lhbS5jbG91ZC5pYm0uY29tL2lkZW50aXR5IiwiZ3JhbnRfdHlwZSI6InVybjppYm06cGFyYW1zOm9hdXRoOmdyYW50LXR5cGU6YXBpa2V5Iiwic2NvcGUiOiJpYm0gb3BlbmlkIiwiY2xpZW50X2lkIjoiZGVmYXVsdCIsImFjciI6MSwiYW1yIjpbInB3ZCJdfQ.nchyclLhBuNz2TeM6Hv4lm1S7Dh-n-nSfN6gQcJnUNCqb3zC3R8-6urbOIFqJjbcpSJU4WZi-rTf2xknDQSYdntsY73kohqTxlSEHsDNZSDH3DejadDB69Upb6EZN_QC2g7kTUK6UD7PMyHxNtrtByfRLh9fYAc_XQddBKZ-QDthz7s3NzJ-K_lfHyg_M1ff5dhd0QbcUqB2q91nPP7pXQvmsxuFT0g36vJTMVDpN1px9EnKl1D3QdtcCo_1xecfT-8vE28dpdmk0CsAFlMukhrRsvLTitrCJ6JFYupGHYH14CYJUrPgRPKG5j1hFswWg7yM70N7EGM8__6y9mIhUA'

url = "https://us-south.ml.cloud.ibm.com/ml/v1/text/generation?version=2023-05-29"
headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + auth
}


system_messages = """
Role Definition: You are a translator specifically designed to translate JavaScript arrays from Estonian to English.

Output Format: Always return the translated list within square brackets [].

Response Limitation:

Do not echo the original input back to the user.
Provide no explanations, thoughts, or additional comments.
The only output should be the translated array.

Translation Guidelines:

Translate phrases contextually, considering the meaning and intent behind the words.
Adhere strictly to English grammar and language rules.
Maintain the original list structure in the translated output.
Provide only the translated array without any identifiers, metadata, or additional comments.
Do not include explanations, thoughts, or comments.

Translation Style:

Aiming for clarity and correctness.
Task Focus: Your sole purpose is to perform the translation. Avoid any actions or responses beyond this task.
Clean up everything outside the list and just print everything that is between []
"""

input_array ="""['Raha ja ärindus selle ümber', 'Mida tähendab kliimamuutus inimkonna jaoks']"""

input_text = f"""
{system_messages}
Translate array into English: {input_array}
"""

payload = {
    "input": input_text,
    "parameters": {
        "decoding_method": "sample",
        "max_new_tokens": 4000,
        "stop_sequences": ["] "],
        "temperature": 0.9,
        "top_k": 50,
        "top_p": 1,
        "repetition_penalty": 1.2
    },
    "model_id": "meta-llama/llama-3-1-70b-instruct",
    "project_id": "a48794dc-782a-4d8e-bbea-051ef620838b",
}

response = requests.post(url, headers=headers, json=payload)
response_json = response.json()

translated_text = response_json["results"][0]["generated_text"].strip('```').strip()
print(translated_text)
