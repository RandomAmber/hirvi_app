import smtplib

def mail(password, sent_to="strakovskaya.am@gmail.com"):

    message = "Your password is " + password

    gmail_user = "hirvi.website@gmail.com"
    gmail_app_password = "jqlq eids bztt aqbq"
    sent_from = "hirvi.website@gmail.com"
    email_text = message

    try:
        server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
        server.ehlo()
        server.login(gmail_user, gmail_app_password)
        server.sendmail(sent_from, sent_to, email_text)
        server.close()
        print('Email sent!')
        response = {"status":"OK"}
    except Exception as exception:
        print("Error: %s!\n\n" % exception)
        response = {"status":"ERROR"}
    return response

if __name__ == "__main__":
    mail()