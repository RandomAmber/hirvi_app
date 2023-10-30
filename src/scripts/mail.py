import smtplib, ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

ADMIN_MAIL = "hirvi.website@gmail.com"
PASSWORD = "jqlq eids bztt aqbq"


def send_email(text, email, html=None, subject=""):

    gmail_app_password = PASSWORD
    sent_from = ADMIN_MAIL
    sent_to = email

    message = MIMEMultipart('alternative')
    message['Subject'] = subject
    message['From'] = sent_from
    message['To'] = sent_to
    # Turn these into plain/html MIMEText objects
    part1 = MIMEText(text, "plain")
    if html:
        part2 = MIMEText(html, "html")

    # Add HTML/plain-text parts to MIMEMultipart message
    # The email client will try to render the last part first
    message.attach(part1)
    if html:
        message.attach(part2)
    try:
        server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
        server.ehlo()
        server.login(sent_from, gmail_app_password)
        server.sendmail(sent_from, sent_to, message.as_string())
        server.close()
        print('Email sent!')
        response = {"status":"OK"}
    except Exception as exception:
        print("Error: %s!\n\n" % exception)
        response = {"status":"ERROR"}
    return response

def send_registration_email(email, password, name):

    text = f"""
    Welcome to HIRVI!
    {name}, thank you for registration. Your password is {password}. Good luck with learning Finnish!
    """

    html = f"""\
    <html>
    <body>
        <p>Wellcome to Hirvi, {name}!<br>
        Your password is {password}<br>
        <a href="http://localhost:3000/login">Login</a>
        </p>
    </body>
    </html>
    """
    response = send_email(text=text, email=email, html=html, subject="Wellcome letter")
    return response

def send_restore_email(email, password, name):

    text = f"""
    Hi, {name}!
    You asked for your password.
    Your password is {password}.
    """

    html = f"""\
    <html>
    <body>
        <p>{text}</p>
    </body>
    </html>
    """

    response = send_email(text=text, email=email, html=html, subject="Hirvi: restore password.")
    return response

def contact(message, user='', mail=''):
    mail = mail if mail else ''
    return send_email(text='MAIL'+ mail + 'USER '+ user + '\n' + message, email=ADMIN_MAIL, html=None, subject="contact:"+user)

#if __name__ == "__main__":
#    sent_registration_email()