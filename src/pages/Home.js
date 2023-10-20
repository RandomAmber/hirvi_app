import '../styles.css';
import avatar from './avatar.jpg';
import news from './news.json';

export default function Home() { 
    console.log(news['news'][0][1])
    let textes = []
    for (var i=0;i<news['news'].length; i++){
        textes.push(
            <div className="news">
            <p className="news-date">{news['news'][i]['date']}</p>
            <p className="news-title">{news['news'][i]['title']}</p>
            <p className="news-text">{news['news'][i]['text']}</p>
            </div>
        )
    }
    return<>
    <div className="starter-section">
    <p className='starter-cool-note'>HIRVI! We are here to learn Finnish</p>
    </div>
    <div className="news-section">
    <h1>News section</h1>
    {textes}
    </div>
    <div className="about-section">
        <h1>About us</h1>
        <div className="about-info">
            <div className='about-person-left'>
                <img src={avatar} className="about-avatar"></img>
                <p className='about-name'>MY NAME</p>
                <p className='about-text'>I'm so cool, yeah</p>
            </div>
            <div className='about-person-right'>
                <img src={avatar} className="about-avatar"></img>
                <p className='about-name'>The best MOOSE</p>
                <p className='about-text'>I'm so cool, too!!</p>
            </div>
        </div>
    </div>
    </>
}