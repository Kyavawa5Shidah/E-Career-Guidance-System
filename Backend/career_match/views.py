from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
import requests

@csrf_exempt
def match_careers(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST method required"}, status=405)

    try:
        body = json.loads(request.body)
        interests = body.get("interests", "")
        skills = body.get("skills", "")
        education = body.get("education", "")
        preferences = body.get("preferences", "")

        user_input = (
            f"Interests: {interests}\n"
            f"Skills: {skills}\n"
            f"Education: {education}\n"
            f"Preferences: {preferences}\n"
            f"Suggest 5 careers."
        )

        url = "https://chatgpt-42.p.rapidapi.com/aitohuman"
        headers = {
            "content-type": "application/json",
            "X-RapidAPI-Key": "d29e95c83dmshd0023da6856f74bp145686jsnd72dc1831030",
            "X-RapidAPI-Host": "chatgpt-42.p.rapidapi.com"
        }

        payload = {"text": user_input}
        response = requests.post(url, json=payload, headers=headers)
        response_data = response.json()

        print("API Response:", response_data)

        result_list = response_data.get("result", [])

        # Check if result_list is a list with at least one string
        if isinstance(result_list, list) and len(result_list) > 0:
            raw_text = result_list[0]
            # Extract lines starting with career numbers
            careers = [
                line.strip(" .0123456789")
                for line in raw_text.split("\n")
                if any(line.strip().startswith(f"{i}.") for i in range(1, 6))
            ]
        else:
            careers = ["No career suggestions found."]

        return JsonResponse({"careers": careers}, safe=False)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

