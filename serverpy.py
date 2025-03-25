import PyPDF2
from bs4 import BeautifulSoup
import requests
from selenium import webdriver
from selenium import webdriver
from bs4 import BeautifulSoup 
import google.generativeai as genai

def get_pdftotext():
    with open(r"C:\Users\Mohithsai Malla\OneDrive\Desktop\AI based IP Protection\AI based IP protection.pdf", 'rb') as file:
        reader = PyPDF2.PdfReader(file)
    
        s=''
        for page_num in range(len(reader.pages)):
            page = reader.pages[page_num]
            text = page.extract_text()
            print(f"Page {page_num + 1}:")
            if len(text)>2:
                s+=text
        return s

        




def webscrap():
    driver = webdriver.Chrome()


    driver.get('https://iwd.vizag.dev/')


    html = driver.page_source
    soup = BeautifulSoup(html, 'html.parser')

    page_text = soup.get_text(separator='\n', strip=True)

    print(page_text)


    driver.quit()

def find_similar_websites(input_text, google_api_key):
    """Finds websites similar to the input text by comparing embeddings."""
    
   
    search_results = google_search(input_text, google_api_key)
    
    
    input_embedding = get_bert_embedding(input_text)

    # Step 3: Scrape and compare websites with the input text
    for url in search_results:
        try:
            website_text = scrape_website(url)
            website_embedding = get_bert_embedding(website_text)
            similarity = cosine_similarity(input_embedding, website_embedding)[0][0]
            print(f"Website: {url}\nSimilarity Score: {similarity}\n")
        except Exception as e:
            print(f"Failed to process {url}: {e}")  



def get_answer(prompt, api_key="AIzaSyBGhy0MXzH9K7ryqcX653mm2AcJl9wRREo"): 
    prompt=get_pdftotext()
    prompt+="give me some queries to search similar ideas on google only give list of querys no other information"
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel('gemini-1.5-flash') 
    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        print(f"Error: {e}")
        return None

print(get_answer("explain_me_something"))

import os
from serpapi import GoogleSearch

def get_google_search_results(query, api_key="YOUR_SERPAPI_API_KEY"):  
    """
    Searches Google using SerpAPI and returns a list of URLs from the search results.

    Args:
        query: The search query string.
        api_key: Your SerpAPI API key.

    Returns:
        A list of URLs from the Google search results, or None if there was an error.
    """
    try:
        params = {
            "engine": "google",
            "q": query,
            "api_key": api_key
        }

        search = GoogleSearch(params)
        results = search.get_dict()

        urls = []
        if "organic_results" in results:
            for result in results["organic_results"]:
                if "link" in result:
                    urls.append(result["link"])

        return urls

    except Exception as e:
        print(f"Error: {e}")
        return None

def get_urls():
    search_query = get_pdftotext()
    api_key = "9b6cf6bb730abf3153809e04ad77b3e287d71b3c0a261754dc7131c559fc7ca3"  

    search_results = get_google_search_results(search_query, api_key)

    if search_results:
        print(f"URLs for '{search_query}':")
        s={}
        c=0
        for url in search_results:
            s[c]=url
            c+=1 
            print(url)
        return s
    

from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/": {"origins": ""}})


@app.route('/get_example', methods=['POST'])
def get_example():
    print("hii")
    print(request.files)
    
    file = request.files[''];
    file_path = "C:\\Users\\Mohithsai Malla\\OneDrive\\Desktop\\AI based IP Protection\\AI based IP protection.pdf"
    file.save(file_path)
    k=get_pdftotext(file_path)
    s=get_urls(k) 

    return jsonify({'message':s}),200


@app.route('/post_example', methods=['POST'])
def post_example():
    data = request.json
    return jsonify({'message': 'POST request received', 'data': data})

if __name__ == '__main__':
    app.run(port=5000)
