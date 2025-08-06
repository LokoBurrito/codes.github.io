from flask import Flask, request, render_template, redirect, url_for, flash
import json
import os

app = Flask(__name__)
app.secret_key = "secure-key-change-this"

LOOT_FILE = "lootbox_keys.json"
REDEEMED_FILE = "redeemed_keys.json"

def load_loot():
    if not os.path.exists(LOOT_FILE):
        return {}
    with open(LOOT_FILE) as f:
        return json.load(f)

def save_loot(data):
    with open(LOOT_FILE, "w") as f:
        json.dump(data, f, indent=4)

def save_redeemed(code, reward):
    redeemed = {}
    if os.path.exists(REDEEMED_FILE):
        with open(REDEEMED_FILE) as f:
            redeemed = json.load(f)
    redeemed[code] = reward
    with open(REDEEMED_FILE, "w") as f:
        json.dump(redeemed, f, indent=4)

@app.route("/", methods=["GET", "POST"])
def index():
    message = None
    reward = None
    if request.method == "POST":
        code = request.form["code"].strip().upper()
        loot = load_loot()

        if code in loot:
            reward = loot.pop(code)
            save_loot(loot)
            save_redeemed(code, reward)
            message = f"🎉 Code valid! You received: {reward}"
        else:
            message = "❌ Invalid or already redeemed code."

    return render_template("index.html", message=message, reward=reward)

if __name__ == "__main__":
    app.run(debug=True)
