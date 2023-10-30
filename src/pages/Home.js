import '../css/Home.css';
import avatar from './avatar.jpg';
import news_texts from './news.json';
import texts from "../text.json";

export default function Home() {

    let text = texts['Home']
    let language = localStorage.getItem('language');
    language = language ? language : 'en';
    language = JSON.parse(language)
    let news = news_texts[language]

    console.log(news[0][1])
    let textes = []
    for (var i=0;i<news.length; i++){
        textes.push(
            <div className="news">
            <p className="news-date">{news[i]['date']}</p>
            <p className="news-title">{news[i]['title']}</p>
            <p className="news-text">{news[i]['text']}</p>
            </div>
        )
    }
    return<>
    <div className="starter-section">
    <p className='starter-cool-note'>{text["starter"][language]}</p>
    </div>
    <div className="news-section">
    <h1 className="news-header">{text["news"][language]}</h1>
    {textes}
    </div>
    <div className="about-section">
        <h1 className="about-header">{text["about"][language]}</h1>
        <div className="about-info">
            <div className='about-person-left'>
                <img src={avatar} className="about-avatar"></img>
                <div className='about-text'>
                    <p className='about-name'>{text["name_anna"][language]}</p>
                    <p className='about-desc'>{text["desc_anna"][language]}</p>
                </div>
            </div>
            <div className='about-person-right'>
                <img src={avatar} className="about-avatar"></img>
                <div className='about-text'>
                <p className='about-name'>{text["name_vika"][language]}</p>
                <p className='about-desc'>{text["desc_vika"][language]}</p>
                </div>
            </div>
        </div>
    </div>
    </>
}