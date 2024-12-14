from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time


driver = webdriver.Chrome()


driver.get("http://localhost:3000/login")
time.sleep(5)

# Login
driver.find_element(By.NAME, "email").send_keys("john@gmail.com")
time.sleep(1)
driver.find_element(By.NAME, "password").send_keys("12345")
time.sleep(1)

# Click login button
driver.find_element(By.ID, "login-button").click()
time.sleep(3)


#Click Home button
driver.find_element(By.ID, "1Home").click()
time.sleep(1)

#Click Alumni List 
driver.find_element(By.ID, "4Alumni List").click()
time.sleep(2)

#click view profile button
driver.find_element(By.ID, "0view-profile").click()
time.sleep(2)

#click Message button
driver.find_element(By.ID, "message").click()
time.sleep(2)
#Events button
driver.find_element(By.ID, "6Events").click()
time.sleep(2)

#Click Jobs button
driver.find_element(By.ID, "7Jobs").click()
time.sleep(2)

#Click About Alumni button
driver.find_element(By.ID, "8About Alumni").click()
time.sleep(2)

#Click Committee button
driver.find_element(By.ID, "9Committee").click()
time.sleep(2)

#Click Contact button
driver.find_element(By.ID, "10Contact").click()
time.sleep(2)


#Click user button
driver.find_element(By.ID, "user").click()
time.sleep(1)

#click account button
driver.find_element(By.ID, "account").click()
time.sleep(1)

##Click Home button
driver.find_element(By.ID, "1Home").click()
time.sleep(1)

#Click user button
driver.find_element(By.ID, "user").click()
time.sleep(1)

#click logout button
driver.find_element(By.ID, "logout").click()
time.sleep(1)