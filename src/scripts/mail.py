import smtplib

ADMIN_MAIL = "hirvi.website@gmail.com"
PASSWORD = "jqlq eids bztt aqbq"


def send_email(message, email):
    gmail_user = ADMIN_MAIL
    gmail_app_password = PASSWORD
    sent_from = ADMIN_MAIL

    print(email + message)

    try:
        server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
        server.ehlo()
        server.login(gmail_user, gmail_app_password)
        server.sendmail(sent_from, email, message)
        server.close()
        print('Email sent!')
        response = {"status":"OK"}
    except Exception as exception:
        print("Error: %s!\n\n" % exception)
        response = {"status":"ERROR"}
    return response

def send_registration_email(email, password, name):

    message = f"""
    Welcome to HIRVI!
    {name}, thank you for registration. Your password is {password}. Good luck with learning Finnish!
    """

    response = send_email(message, email)
    return response

def send_restore_email(email, password, name):

    message = f"""
    Hi, {name}!
    You asked for your password.
    Your password is {password}.
    """

    response = send_email(message, email)
    return response

def contact(message, user=''):
    return send_email('USER '+ user + '\n' + message, ADMIN_MAIL)

#if __name__ == "__main__":
#    sent_registration_email()