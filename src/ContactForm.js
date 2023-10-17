
export default function ContactForm(){
    return <>
    <form action="https://public.herotofu.com/v1/9ba962e0-6cd4-11ee-95be-07c35b4ecd07" method="post" accept-charset="UTF-8">
        <div>
            <p>Name</p>
            <input name="Name" id="name" type="text" autocomplete="off" className='name-area-contact' required />
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