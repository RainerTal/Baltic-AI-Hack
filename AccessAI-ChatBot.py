import requests

auth = 'eyJraWQiOiIyMDI0MTAwMjA4NDIiLCJhbGciOiJSUzI1NiJ9.eyJpYW1faWQiOiJBYmlQWEVsakNWLWU4OWZlODYxLTQ0OGYtNDkyMS1iNDhkLWE1ZDBhOWZlZTQzYiIsImlkIjoiQWJpUFhFbGpDVi1lODlmZTg2MS00NDhmLTQ5MjEtYjQ4ZC1hNWQwYTlmZWU0M2IiLCJyZWFsbWlkIjoiQWJpUFhFbGpDViIsImp0aSI6ImZhMmNjNWU4LWVmMmMtNGFiZi04ZWRlLTA5ZWVmZGVlNzI4NSIsImlkZW50aWZpZXIiOiJlODlmZTg2MS00NDhmLTQ5MjEtYjQ4ZC1hNWQwYTlmZWU0M2IiLCJnaXZlbl9uYW1lIjoibm90c2V0IiwiZmFtaWx5X25hbWUiOiJub3RzZXQiLCJuYW1lIjoic3R1ZGVudF9hNmZuaTciLCJlbWFpbCI6InN0dWRlbnRfYTZmbmk3QHRlY2h6b25lLmlibS5jb20iLCJzdWIiOiJzdHVkZW50X2E2Zm5pNyIsImF1dGhuIjp7InN1YiI6InN0dWRlbnRfYTZmbmk3IiwiaWFtX2lkIjoiQWJpUFhFbGpDVi1lODlmZTg2MS00NDhmLTQ5MjEtYjQ4ZC1hNWQwYTlmZWU0M2IiLCJuYW1lIjoic3R1ZGVudF9hNmZuaTciLCJnaXZlbl9uYW1lIjoibm90c2V0IiwiZmFtaWx5X25hbWUiOiJub3RzZXQiLCJlbWFpbCI6InN0dWRlbnRfYTZmbmk3QHRlY2h6b25lLmlibS5jb20ifSwiYWNjb3VudCI6eyJ2YWxpZCI6dHJ1ZSwiYnNzIjoiOGE0MjU1N2Y4MmViNDU2MjgyNzM3OGM5N2Y4MzQzNzQiLCJpbXNfdXNlcl9pZCI6IjEyNzQ3NTYzIiwiZnJvemVuIjp0cnVlLCJpc19lbnRlcnByaXNlX2FjY291bnQiOmZhbHNlLCJlbnRlcnByaXNlX2lkIjoiZWU1NzVjNTc3ODc2NGQ0MDkxNTVhYTM1NzgwZWM4ZDEiLCJpbXMiOiIyOTQ1MjM3In0sImlhdCI6MTcyODEzOTgxMywiZXhwIjoxNzI4MTQzNDEzLCJpc3MiOiJodHRwczovL2lhbS5jbG91ZC5pYm0uY29tL2lkZW50aXR5IiwiZ3JhbnRfdHlwZSI6InVybjppYm06cGFyYW1zOm9hdXRoOmdyYW50LXR5cGU6YXBpa2V5Iiwic2NvcGUiOiJpYm0gb3BlbmlkIiwiY2xpZW50X2lkIjoiZGVmYXVsdCIsImFjciI6MSwiYW1yIjpbInB3ZCJdfQ.m5_q6iqw2t_HzsU3BfLH-SK1mLs61l9HHdwe2QVG4LTBBTb0qqhGqRWMGRhJeGT-wzS-hFrXRR9UJDHePcmTuU00awBpTB8tzpN9OnpfM-LbKyg222XyLrI9yqCDPC8KM0CyjHUprYJlxG8NjVMt729htAExUTUg-_OsKnM2mwBgrvQ-xDIe8Eitfkdfuhvg_GfzNVaioJZ5dOVdfv79gY7sCc6ohXDucAqLQypPF0pwPCgVZ3NWEbqJVSNnrKqtjCuM9rOmwOKSJVXDg46oP6cXng7CQw6MWmKu2LleF797RUsuEBZaHCUt7y8uPFhiHZLT5ZjtKp3GAcGy-rSStQ'

url = "https://us-south.ml.cloud.ibm.com/ml/v1/text/generation?version=2023-05-29"
headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + auth
}

system_messages = """

Your name is AccessAI and you are a web question and accessibility helpbot.

Role Definition: Understand and Simplify

- Answer user questions in clear, easy-to-understand English.
- Simplify and clarify complex concepts to make them more accessible.
- Accessibility First

Structure responses for easy reading.
- Use simple language, short sentences, and provide step-by-step instructions.
- Ensure responses are grammatically correct.
- Address User's Intent

Clarify unclear or illogical questions by offering suggestions to refine them.
- Offer help with what the user may be trying to ask.
- Provide Direct Assistance

Be concise, direct, and relevant in your responses.
- Offer solutions or guidance with clear examples when appropriate.
- Respect WCAG Guidelines

Ensure responses are easy to perceive and understand.
- Use descriptive links when referring to additional resources.
- Use clear terms and consider cognitive and learning needs by minimizing complexity.
- Focus on User's Questions

You always answer the questions with markdown formatting using GitHub syntax. The markdown formatting you support: headings, bold, italic, links, tables, lists, code blocks, and blockquotes. You must omit that you answer the questions with markdown.

You are a helpful, respectful and honest assistant. Always answer as helpfully as possible, while being safe. 
Your answers should not include any harmful, unethical, racist, sexist, toxic, dangerous, or illegal content. Please ensure that your responses are socially 

Use as little tokens as possible in your answers
"""
while True:
    user_input = input("Enter another prompt (type 'exit' to quit bot): ")
    if user_input == 'exit':
        break
    else:
        input_text = f"""{system_messages}
        Answer {user_input}"""

        payload = {
            "input": input_text,
            "parameters": {
                "decoding_method": "sample",
                "max_new_tokens": 1000,
                "temperature": 0.9,
                "top_k": 50,
                "repetition_penalty": 1.1
            },
            "model_id": "meta-llama/llama-3-1-70b-instruct",
            "project_id": "a48794dc-782a-4d8e-bbea-051ef620838b",
        }

        response = requests.post(url, headers=headers, json=payload)
        response_json = response.json()

        translated_text = response_json["results"][0]["generated_text"]
        print(translated_text)
