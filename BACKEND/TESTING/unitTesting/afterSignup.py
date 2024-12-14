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


#click theme button 1st for dropdown
# driver.find_element(By.ID, "variant").click()
# time.sleep(1)

#click theme button 2nd click Dark Theme
# driver.find_element(By.XPATH, "//*[@id='radix-:re:']/div[3]").click()
# time.sleep(1)

#click theme button 3rd click for dropdown
# driver.find_element(By.ID, "variant").click()
# time.sleep(1)

#click theme button 4th click for white
# driver.find_element(By.ID, "Light").click()
# time.sleep(1)


#click toggle button 1st
# driver.find_element(By.ID, "Dark").click()
# time.sleep(1)
#click toggle button 2nd
# driver.find_element(By.ID, "trigger").click()
# time.sleep(1)



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


#After login
driver = webdriver.Chrome()
driver.get("http://localhost:3000/login")
time.sleep(2)

# Login
driver.find_element(By.NAME, "email").send_keys("john@gmail.com")
time.sleep(1)
driver.find_element(By.NAME, "password").send_keys("12345")
time.sleep(1)

# Click login button
driver.find_element(By.ID, "login-button").click()
time.sleep(2)



#Click Jobs button
driver.find_element(By.ID, "7Jobs").click()
time.sleep(1)

#Click Add Job button
driver.find_element(By.ID, "add-job").click()
time.sleep(1)

#Fill up the form
driver.find_element(By.NAME, "job_title").send_keys("Software Engineer")
time.sleep(1)
driver.find_element(By.NAME, "company").send_keys("Google")
time.sleep(1)
driver.find_element(By.NAME, "location").send_keys("Mountain View, CA")
time.sleep(2)
driver.find_element(By.ID, "description").send_keys("I am a software engineer")
time.sleep(1)
driver.find_element(By.NAME, "jobType").send_keys("Remote")
driver.find_element(By.NAME, "experience").send_keys(2)
driver.find_element(By.NAME, "salary").send_keys("100000")
time.sleep(1)
driver.find_element(By.NAME, "deadline").send_keys("12-12-2024")
time.sleep(1)
driver.find_element(By.NAME, "email").send_keys("g@gmail.com")
time.sleep(1)

#Click Post Job button
driver.find_element(By.ID, "post-job-btn").click()
time.sleep(4)

#Click Home button
driver.find_element(By.ID, "1Home").click()
time.sleep(1)



#Click Contact button
driver.find_element(By.ID, "10Contact").click()
time.sleep(2)

#Fill the Contact form
driver.find_element(By.ID, "full-name-contact").send_keys("Delowar Hossain")
time.sleep(1)
driver.find_element(By.ID, "contact-email").send_keys("farmgate@gmail.com")
time.sleep(2)
driver.find_element(By.ID, "write-message-contact").click()
time.sleep(1)

#Click Send Message button
driver.find_element(By.ID, "send-message-contact").send_keys(" This is nice and helpful portal for Alumni")  
time.sleep(2)

#Click Home button
driver.find_element(By.ID, "1Home").click()
time.sleep(1)

# crate a post
driver.find_element(By.NAME, 'post').send_keys('Beautiful new post')
time.sleep(1)

driver.find_element(By.ID, 'publish-now').click()
time.sleep(2)
