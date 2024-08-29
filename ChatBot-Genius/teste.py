import openai
import os

api_key = os.environ.get("OPENAI_API_KEY")

response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "user", "content": "Diga olá em português."}
    ]
)

print(response['choices'][0]['message']['content'])
