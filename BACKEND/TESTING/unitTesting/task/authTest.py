from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time


driver = webdriver.Chrome()
driver.get("http://localhost:3000")
time.sleep(5)

# Click Signup
driver.find_element(By.ID, "signup").click()
time.sleep(5)
# Signup First
# Wait for input fields to load and interact with them
driver.find_element(By.NAME, "firstName").send_keys("Mr")

driver.find_element(By.NAME, "lastName").send_keys("John")
driver.find_element(By.NAME, "email").send_keys("john@gmail.com")
driver.find_element(By.NAME, "password").send_keys("12345")
driver.find_element(By.NAME, "confirmPassword").send_keys("12345")

# Click on Create Account button
driver.find_element(By.ID, "create-account").click()
time.sleep(5)

