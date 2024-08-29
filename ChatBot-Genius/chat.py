import os
from flask import Flask, request, jsonify
import openai
from flask_cors import CORS  # Adicionando suporte a CORS

app = Flask(__name__)
CORS(app)  # Permitir solicitações de diferentes origens

# Defina sua chave da API do OpenAI aqui
api_key = os.environ.get("OPENAI_API_KEY")

def carregar_conteudos():
    conteudos = {}
    base_dir = "conteudos"
    
    for root, dirs, files in os.walk(base_dir):
        for file in files:
            if file.endswith(".txt"):
                file_path = os.path.join(root, file)
                with open(file_path, 'r', encoding='utf-8') as f:
                    conteudos[file] = f.read()
    return conteudos

def enviar_mensagem(mensagem, conteudos):
    nome_arquivo = 'transcricao_audio_video1.txt'
    contexto = conteudos.get(nome_arquivo, '')
    
    prompt = f"Baseado no seguinte conteúdo:\n{contexto}\n\nPergunta: {mensagem}\nResposta:"
    
    resposta = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user", "content": prompt}
        ]
    )
    return resposta['choices'][0]['message']['content']

@app.route('/chat', methods=['POST'])
def chat():
    dados = request.json
    mensagem = dados['message'].strip().lower()
    
    saudações = ["oi", "ola", "ola chat"]
    resposta_padrao = "Olá, sou o Genius, em que posso te ajudar?"

    if mensagem in saudações:
        resposta = resposta_padrao
    else:
        conteudos = carregar_conteudos()
        resposta = enviar_mensagem(mensagem, conteudos)
    
    return jsonify({"response": resposta})

if __name__ == '__main__':
    app.run(debug=True)
