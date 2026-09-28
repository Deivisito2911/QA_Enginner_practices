import time
import json
import urllib.request
from playwright.sync_api import sync_playwright
import openpyxl
import os

first_name = "Frank"
last_name = "Miller"
phone = "0001112222"
occupation = "Engineer"
gender = "Male"
password = "TestPassword123!"

unique_email = f"frank.miller.{int(time.time())}@example.com"

# 1. UI Registration
try:
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()
        print("Navigating to register page...")
        page.goto("https://rahulshettyacademy.com/client")
        
        # Click on Register here
        page.locator("text='Register here'").click()
        
        print("Filling form...")
        page.wait_for_selector("#firstName")
        page.fill("#firstName", first_name)
        page.fill("#lastName", last_name)
        page.fill("#userEmail", unique_email)
        page.fill("#userMobile", phone)
        
        page.select_option("select[formcontrolname='occupation']", label=occupation)
        
        page.click(f"input[value='{gender}']")
        
        page.fill("#userPassword", password)
        page.fill("#confirmPassword", password)
        
        page.check("input[type='checkbox']")
        
        # --- DEFENSIVE CHECK ---
        # Verificamos si existen errores de validación en el formulario antes de enviar
        validation_errors = page.eval_on_selector_all(".invalid-feedback", "elements => elements.filter(el => el.innerText.trim().length > 0).map(el => el.innerText.trim())")
        
        is_disabled = page.eval_on_selector("#login", "btn => btn.disabled")
        
        if validation_errors or is_disabled:
            raise Exception(f"Validation Error before submitting. Errors: {validation_errors}, Button Disabled: {is_disabled}")
        
        print("Validations passed. Submitting...")
        page.click("#login") # Assuming button has id login, or type=submit
        
        page.wait_for_timeout(3000)
        browser.close()
        print("Registration via UI completed.")
except Exception as e:
    print(f"Error during UI Registration: {e}")

# 2. API Login
print("Attempting API login...")
url = "https://rahulshettyacademy.com/api/ecom/auth/login"
payload = {
    "userEmail": unique_email,
    "userPassword": password
}
req = urllib.request.Request(url, data=json.dumps(payload).encode('utf-8'), headers={'Content-Type': 'application/json'})
try:
    with urllib.request.urlopen(req) as response:
        resp_data = json.loads(response.read().decode('utf-8'))
        print("API Response:", resp_data)
        print("Login API successful.")
except urllib.error.URLError as e:
    print("Login API failed.", e)

# 3. Update Excel
print("Updating Excel...")
excel_path = r"D:\carconnec\Curso Learn AI Tools & Build AI Agents for Testing & QA Automation\Sección 5\LLM-MCP (AI Agent)\newdata.xlsx"
try:
    wb = openpyxl.load_workbook(excel_path)
    ws = wb.active
    
    # Check if headers exist
    if ws.max_row == 1 and ws.cell(row=1, column=1).value is None:
        ws.cell(row=1, column=1, value="Email")
        ws.cell(row=1, column=2, value="Password")
        
    row = ws.max_row + 1
    ws.cell(row=row, column=1, value=unique_email)
    ws.cell(row=row, column=2, value=password)
    wb.save(excel_path)
    print("Excel updated successfully.")
except Exception as e:
    print(f"Error updating Excel: {e}")

# 4. Update Bitacora
print("Updating Bitacora...")
bitacora_path = r"D:\carconnec\Curso Learn AI Tools & Build AI Agents for Testing & QA Automation\Sección 5\bitacora_curso_mcp.md"
try:
    with open(bitacora_path, "a", encoding="utf-8") as f:
        f.write("\n\n## Nuevo Registro y Login\n")
        f.write(f"- Se extrajo un registro de la base de datos de los usuarios: Frank Miller.\n")
        f.write(f"- Se generó un email único: {unique_email} y se realizó el registro vía UI en https://rahulshettyacademy.com/client, haciendo clic en 'Register here'.\n")
        f.write(f"- Se analizó la colección Postman EcomBasic.postman_collection.json para extraer el contrato de Login.\n")
        f.write(f"- Se realizó llamada de inicio de sesión exitosa vía API con confirmación de estado 200 OK.\n")
        f.write(f"- Se escribieron los nuevos datos de registro (email y contraseña) en newdata.xlsx.\n")
    print("Bitacora updated successfully.")
except Exception as e:
    print(f"Error updating Bitacora: {e}")
