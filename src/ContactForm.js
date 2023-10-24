
export default function ContactForm(){
    return <>
    <form action="http://127.0.0.1:8000/contact/" method="post" accept-charset="UTF-8">
        <div>
            <p>Name</p>
            <input name="name" id="name" type="text" autocomplete="off" className='name-area-contact' required />
        </div>
        <p>Message</p>
        <div>
            <textarea name="message" className='text-area-contact' required>
            Dear Admins, 
            </textarea>
        </div>
        <div>
            <input type="submit" value="Submit" />
            <div className="input" aria-hidden="true">
            <input type="text" name="_gotcha" tabindex="-1" autocomplete="off" />
            </div>
        </div>
        </form>
        </>
}